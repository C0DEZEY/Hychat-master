
const { count } = require('console');
const express = require('express')
const app2 = express()
const server = require('http').createServer(app2);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(message)
        client.send(message);
      }
    });
    
  });
});

app2.get('/', (req, res) => res.send('Hello World!'))

server.listen(8080, () => console.log(`Lisening on port :8080`))