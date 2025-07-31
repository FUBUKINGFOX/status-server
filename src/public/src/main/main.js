const {
    updateHardware,
    updateTimezone,
    updateTime,
    updateSummary,
    updateINFO
} = require("./function")

const { initChart , updateChart } = require("./charts")

//===========================
function init(){
    fetch("/api/hardware",{method:"GET"}).then((res_)=>{
        res_.json().then((res)=>{
            initChart(res)
            updateHardware(res)
            updateTimezone(res)
        })
    })
    fetch("/api/server_info",{method:"GET"}).then((res_)=>{
        res_.text().then((res)=>{
            updateINFO(res)
        })
    })
}

function update(){
    fetch("/api/status",{method:"GET"}).then((res_)=>{
        res_.json().then((res)=>{
            updateChart(res)
            updateTime(res)
            updateSummary(res)
        })
        
    })
}

init()
setInterval(update,1000)