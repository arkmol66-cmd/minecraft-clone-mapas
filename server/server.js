const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket server listening on ws://localhost:8080');

let clients = new Set();

wss.on('connection', function connection(ws){
  clients.add(ws);
  console.log('Cliente conectado, total:', clients.size);

  ws.on('message', function incoming(message){
    // repassar para outros clientes
    for(const c of clients){
      if(c !== ws && c.readyState === WebSocket.OPEN){
        c.send(message);
      }
    }
  });

  ws.on('close', ()=> {
    clients.delete(ws);
    console.log('Cliente desconectado, total:', clients.size);
  });
});
