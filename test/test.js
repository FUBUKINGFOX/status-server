const si = require('systeminformation');

let lastRx = 0;
let lastTx = 0;

async function monitorNetwork() {
    const netStats = await si.networkStats("Wi-Fi");
    //   console.log(netStats[1])
    const ifaceStats = netStats[0]; // 假設你只有一個主要網卡



    const rxSpeed = (ifaceStats.rx_sec) / 1024; // KB/sec
    const txSpeed = (ifaceStats.tx_sec) / 1024;

    console.log(`⬇ Download Speed: ${rxSpeed.toFixed(2)} KB/s`);
    console.log(`⬆ Upload Speed: ${txSpeed.toFixed(2)} KB/s`);


}

// 每秒更新一次
setInterval(monitorNetwork, 1000);
