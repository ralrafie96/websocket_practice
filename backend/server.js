const { WebSocketServer } = require('ws')
const express = require('express')

const webserver = express()
    .use((req, res) =>
        res.sendFile('/websocket-client.html', { root: __dirname })
    )
    .listen(3000, () => console.log(`Listening on ${3000}`))

const sockserver = new WebSocketServer({ port: 443 })