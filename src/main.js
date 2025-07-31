const fs = require("node:fs")
const https = require("https")
const http = require("http")
const express = require('express')
const { load_config, get_cfg_value } = require("./bin/config_loader")
const { log_info } = require('./bin/logger')
load_config("./config")
const { get_hardware, get_status, get_summary} = require("./bin/status")

const HTTP_PORT = get_cfg_value("server","server","HTTP_PORT",80)
const enable_TSL = get_cfg_value("server","server","enable_TSL",false)
const HTTPS_PORT = get_cfg_value("server","server","HTTPS_PORT",443)
const HOST = get_cfg_value("server","server","HOST","127.0.0.1")

const app = express()
app.use(express.static('public'))


//==========================API
app.get("/api/server_info", (req,res) => {
    fs.readFile("./data/server_info.txt","utf-8",(err,server_info)=>{
        res.status(200).send(server_info)
    })
})

app.get("/api/status", (req,res) => {
    res.status(200).json({
        status: get_status(),
        summary: get_summary()
    })
})

app.get("/api/hardware", (req,res) => {
    res.status(200).json(get_hardware())
})
//==========================WEB-PAGE
app.get("/", (req,res) => {
    res.status(200).sendFile('./pages/main.html',{root:__dirname})
})
//==========================ERROR-Handler
app.use((req, res, next) => {
  res.status(404).sendFile('./pages/notfound.html',{root:__dirname})
})

if(enable_TSL){
    const key = fs.readFileSync("./cert/server.key","utf-8")
    const cert = fs.readFileSync("./cert/server.crt","utf-8")
    const httpsServer = https.createServer({cert:cert,key:key},app)
    httpsServer.listen(HTTPS_PORT,HOST, () => {
        log_info(undefined,"server",`HTTPS Server is running on https://${HOST}:${HTTPS_PORT}`)
    })
}

const httpServer = http.createServer(app)
httpServer.listen(HTTP_PORT,HOST, () => {
    log_info(undefined,"server",`HTTP Server is running on http://${HOST}:${HTTP_PORT}`)
})