const cpu_chart_ctx = document.getElementById("CPU-Chart").getContext('2d')
const ram_chart_ctx = document.getElementById("RAM-Chart").getContext('2d')
const net_chart_ctx = document.getElementById("NET-Chart").getContext('2d')

const cpu_summary_chart_ctx = document.getElementById("cpu-summary-chart").getContext('2d')
const ram_summary_chart_ctx = document.getElementById("ram-summary-chart").getContext('2d')
const disk_summary_chart_ctx = document.getElementById("disk-summary-chart").getContext('2d')

const dataset_L = Array(28).fill("")
dataset_L.push("now")
dataset_L.unshift("30s")

Charts = {}

let disk_total = 0
let ram_total = 0 


function initChart(res){
    disk_total = res.disk_total
    ram_total = res.ram
    let data;
    let config;

    data = {
        labels: dataset_L,
        datasets: [
            {
                label: 'CPU',
                fill: true,
                backgroundColor: "rgba(0, 119, 255, 0.4)",
                borderColor: "rgba(0, 119, 255,0.7)",
                data: [],
            }
        ]
    }
    config = {
        type: 'line',
        data: data,
        options: {
            aspectRatio:6.5,
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x:{
                    grid:{color:'rgba(132, 132, 132, 0.65)', drawTicks: false,},
                },
                y: {
                    grid:{color:'rgba(132, 132, 132, 0.65)',},
                    max:100,
                    min:0,
                    display: true,
                    title: {
                        display: true,
                        text: ''
                    },
                    ticks:{
                        color:'rgba(0, 183, 255, 0.9)',
                        callback: function (value, index, ticks) {
                        return  value + '%';
                        }
                    }
                }
            }
        },
    }
    const cpu_chart = new Chart(cpu_chart_ctx, config)

    data = {
        labels: dataset_L,
        datasets: [
            {
                label: 'RAM',
                fill: true,
                backgroundColor: "rgba(255, 115, 0, 0.4)",
                borderColor: "rgba(255, 115, 0,0.7)",
                data: [],
            }
        ]
    }
    config = {
        type: 'line',
        data: data,
        options: {
            aspectRatio:6.5,
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x:{
                    grid:{color:'rgba(132, 132, 132, 0.65)', drawTicks: false,},
                },
                y: {
                    grid:{color:'rgba(132, 132, 132, 0.65)',},
                    max: res.ram,
                    min:0,
                    display: true,
                    title: {
                        display: true,
                        text: ''
                    },
                    ticks:{
                        color:'rgba(255, 132, 0, 0.9)',
                        callback: function (value, index, ticks) {
                        return  value + 'G';
                        }
                    }
                }
            }
        },
    }
    const ram_chart = new Chart(ram_chart_ctx, config)

    data = {
        labels: dataset_L,
        datasets: [
            {
                label: '上傳',
                fill: true,
                backgroundColor: "rgba(26, 255, 0, 0.4)",
                borderColor: "rgba(26, 255, 0, 0.7)",
                data: [],
                borderDash: [5, 5],
            },
            {
                label: '下載',
                fill: true,
                backgroundColor: "rgba(26, 255, 0, 0.4)",
                borderColor: "rgba(26, 255, 0, 0.7)",
                data: [],
            }
        ]
    }
    config = {
        type: 'line',
        data: data,
        options: {
            aspectRatio:6.5,
            plugins: {
                legend: {
                    align:"end",
                    display: true
                }
            },
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x:{
                    grid:{color:'rgba(132, 132, 132, 0.65)', drawTicks: false,},
                },
                y: {
                    grid:{color:'rgba(132, 132, 132, 0.65)',},
                    min:0,
                    display: true,
                    title: {
                        display: true,
                        text: ''
                    },
                    ticks:{
                        color:'rgba(0, 255, 8, 0.9)',
                        callback: function (value, index, ticks) {
                        return  value + 'MB/s';
                        }
                    }
                }
            }
        },
    }
    const net_chart = new Chart(net_chart_ctx, config)

    data = {
        labels: ["使用中", "閒置中"],
        datasets: [
            {
                label: '效能百分比',
                data: [0, 100],
                backgroundColor: ["rgba(0, 119, 255,0.7)", "rgba(64, 255, 0, 0.7)"],
            },
        ]
    }
    config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                }
            }
        },
    }
    const cpu_summary_chart = new Chart(cpu_summary_chart_ctx, config)

    data = {
        labels: ["使用中", "待命中"],
        datasets: [
            {
                label: 'RAM 使用量',
                data: [0, 100],
                backgroundColor: ["rgba(255, 140, 0, 0.7)", "rgba(64, 255, 0, 0.7)"],
            },
        ]
    }
    config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                }
            }
        },
    }
    const ram_summary_chart = new Chart(ram_summary_chart_ctx, config)

    data = {
        labels: ["使用中", "可使用"],
        datasets: [
            {
                label: '儲存空間 使用量',
                data: [0, 100],
                backgroundColor: ["rgba(251, 0, 255, 0.7)", "rgba(64, 255, 0, 0.7)"],
            },
        ]
    }
    config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                }
            }
        },
    }
    const disk_summary_chart = new Chart(disk_summary_chart_ctx, config)

    Charts = {
        cpu_chart:cpu_chart,
        ram_chart:ram_chart,
        net_chart:net_chart,
        cpu_summary_chart:cpu_summary_chart,
        ram_summary_chart:ram_summary_chart,
        disk_summary_chart:disk_summary_chart,
    }
}

function updateChart(res){
    // const time_stamp = []
    const cpu = []
    const ram = []
    const net_upload = []
    const net_download = []
    for(const i of res.status){
        // time_stamp.push(i.time_stamp)
        cpu.push(i.cpu)
        ram.push(i.ram)
        net_upload.push(i.net_upload)
        net_download.push(i.net_download)
    }

    Charts.cpu_chart.data.datasets[0].data = cpu

    Charts.ram_chart.data.datasets[0].data = ram

    Charts.net_chart.data.datasets[0].data = net_upload
    Charts.net_chart.data.datasets[1].data = net_download

    Charts.cpu_summary_chart.data.datasets[0].data = [res.summary.cpu, 100 - res.summary.cpu]

    Charts.ram_summary_chart.data.datasets[0].data = [res.summary.ram, ram_total - res.summary.ram]

    Charts.disk_summary_chart.data.datasets[0].data = [res.summary.disk, disk_total - res.summary.disk]
    
    for(const i in Charts){
        Charts[i].update("none")
    }
}


module.exports.initChart = initChart
module.exports.updateChart = updateChart