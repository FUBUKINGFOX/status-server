let disk_totle = 0
function updateTimezone(res){
    document.getElementById("time-zone").innerHTML = res.timezone
}

function updateHardware(res){
    document.getElementById("os-name").innerHTML = res.os_type
    document.getElementById("os-type").innerHTML = res.os_machine
    document.getElementById("cpu-name").innerHTML = res.cpu
    document.getElementById("cpu-counts").innerHTML = res.cpus
    document.getElementById("ram-counts").innerHTML = res.ram
    document.getElementById("disk-total").innerHTML = res.disk_total
    disk_totle = res.disk_total
}

function updateSummary(res){
    
    document.getElementById("cpu-summary").innerHTML = res.summary.cpu
    document.getElementById("ram-summary").innerHTML = res.summary.ram
    document.getElementById("net-summary-upload").innerHTML = res.summary.net_upload
    document.getElementById("net-summary-download").innerHTML = res.summary.net_download
    document.getElementById("disk-summary").innerHTML = Math.round(res.summary.disk / disk_totle * 10000) / 100
}

function updateTime(res){
    document.getElementById("server-time").innerHTML = res.status[res.status.length - 1].time_stamp
}

function updateINFO(res){
    res = res.replaceAll("\n","<br/>")
    new Typed('#server-info-text-content', {
        strings: [res],
        typeSpeed: 30
    });
}

module.exports.updateTimezone = updateTimezone
module.exports.updateHardware = updateHardware
module.exports.updateSummary = updateSummary
module.exports.updateTime = updateTime
module.exports.updateINFO = updateINFO