const fs = require("node:fs")
const os = require("node:os")
const si = require('systeminformation');
const {get_cfg_value} = require("./config_loader")

const data = JSON.parse(fs.readFileSync("./data/status.json","utf-8"))
const data_summary = JSON.parse(fs.readFileSync("./data/summary.json","utf-8"))

function to_fix(number,index){
    return Math.round(number * (10**index)) / 10**index
}

async function update_status(data, data_summary){

    const iface = get_cfg_value("monitor","monitor","network_interface",undefined)
    const netStats = await si.networkStats(iface)
    const ifaceStats = netStats[0]
    const rxSpeed = (ifaceStats.rx_sec) / (1024**2)
    const txSpeed = (ifaceStats.tx_sec) / (1024**2)
    

    const net_upload = to_fix(txSpeed, 2)
    const net_download = to_fix(rxSpeed, 2)
    const cpu =  await si.currentLoad()
    const ram = to_fix((os.totalmem() - os.freemem()) / (1024**3), 2)
    if(data.length >= 3600){
        data.shift()
    }
    data.push({
        time_stamp: new Date().toLocaleTimeString("zh-TW"),
        cpu: to_fix(cpu.currentLoad, 2),
        ram: ram,
        net_upload: net_upload,
        net_download: net_download
    })
    fs.writeFileSync("./data/status.json",JSON.stringify(data),"utf-8")
    //======================
    const disk_stats = fs.statfsSync("/")
    const usedSpace = to_fix(((disk_stats.blocks - disk_stats.bfree) * disk_stats.bsize) / (1024**3), 2)
    let cpu_T = 0
    let ram_T = 0
    let net_upload_T = 0
    let net_download_T = 0
    for(const i of data){
        cpu_T += i.cpu
        ram_T += i.ram
        net_upload_T += i.net_upload
        net_download_T += i.net_download
    }
    const L = data.length
    data_summary.cpu = to_fix(cpu_T / L, 2)
    data_summary.ram = to_fix(ram_T / L, 2)
    data_summary.net_upload = to_fix(net_upload_T / L, 2)
    data_summary.net_download = to_fix(net_download_T / L, 2)
    data_summary.disk = usedSpace
    fs.writeFileSync("./data/summary.json",JSON.stringify(data_summary),"utf-8")

}

function get_hardware(){
    const cpu = os.cpus()[0].model
    const cpu_counts = os.cpus().length
    const ram = Math.round((os.totalmem() / (1024**3)))
    const os_type = os.type()
    const os_machine = os.machine()

    const disk_stats = fs.statfsSync("/")
    const totalSpace = Math.round((disk_stats.blocks * disk_stats.bsize) / (1024**3))
    

    return {
        cpu: cpu,
        cpus: cpu_counts,
        ram: ram,
        os_type: os_type,
        os_machine: os_machine,
        disk_total: totalSpace,
        timezone: si.time().timezoneName
    }
}

function get_status(){
    return data.slice(-30)
}

function get_summary(){
    return data_summary
}

setInterval(update_status, 1000, data, data_summary)
module.exports.get_hardware = get_hardware
module.exports.get_status = get_status
module.exports.get_summary = get_summary