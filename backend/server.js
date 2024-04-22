const { WebSocketServer, WebSocket } = require('ws')
const http = require('http')
// const express = require('express')
const uuidv4 = require('uuid').v4;

const server = http.createServer();
const sockserver = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

// Event types
const typesDef = {
    USER_EVENT: 'userevent',
    CONTENT_CHANGE: 'contentchange'
}

function broadcastMessage(json) {
    // We are sending the current data to all connected clients
    const data = JSON.stringify(json);
    console.log(data)
    for (let userId in clients) {
        let client = clients[userId];
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    };
}

function handleMessage(message, userId) {
    const dataFromClient = JSON.parse(message.toString());
    const json = { type: dataFromClient.type };
    if (dataFromClient.type === typesDef.USER_EVENT) {
        users[userId] = dataFromClient;
        userActivity.push(`${dataFromClient.username} joined to edit the document`);
        json.data = { users, userActivity };
    } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        editorContent = dataFromClient.content;
        json.data = { editorContent, userActivity };
    }
    broadcastMessage(json);
}

function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    const json = { type: typesDef.USER_EVENT };
    const username = users[userId]?.username || userId;
    userActivity.push(`${username} left the document`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    broadcastMessage(json);
}

sockserver.on('connection', ws => {
    console.log('New client connected!')
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log('Recieved a new connection');

    // Store the new connection and handle messages
    clients[userId] = ws;
    console.log(`${userId} connected.`);
    ws.on('message', (message) => handleMessage(message, userId));
    // User disconnected
    ws.on('close', () => handleDisconnect(userId));
})