import ws from "ws";
import app from ".";
import { createServer } from "http";
import { User } from "./models/User.model";

import crypto from "crypto"



const server = createServer(app);

import axios from "axios";
import redisClient from "./config/redisDB";

let a = 0;
const webSocketServer = new ws.Server({
  server,
});

function trueOrNot() {
  if (a == 0) {
    a++;
    return 21;
  } else {
    a = 0;
    return 20;
  }
}

async function fetchDataFromBackend() {
  const options = {
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${trueOrNot()}&precision=3`,
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-N1hNhA5dNyLhDHWRjhiTP9XZ",
    },
  };
 return axios.request(options).then(function ({ data }) {
    return data.map((crypto: any) => {
      return {
        // id:crypto.id,
        // symbol:crypto.symbol,
        name: crypto.name,
        price: `$${crypto.current_price}`,
        // marketCap:crypto.market_cap,
        // lastUpdated:crypto.last_updated
      };
    });
  });
}

interface I_CustomWebSocket extends ws{
    id:string
}



let socketStore=new Map();
webSocketServer.on("connection", (socket, req) => {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    (socket as I_CustomWebSocket).id=uniqueId;
    socketStore.set(uniqueId,socket);

  console.log("User Connected");
  User.on("createAlert", (...args) => {
    socket.send(args[0].toString());
  });
  socket.on("close", (code, reason) => {
    socketStore.delete(uniqueId);
    console.log("user disconnected");
  });
  webSocketServer.on("error", (err) => {
    socketStore.clear();
    console.log(err);
  });
});

// Function to send data to all connected clients
const sendDataToClients = (data:[]) => {
  webSocketServer.clients.forEach((client) => {
    console.log((client as I_CustomWebSocket).id);
    

    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Function to fetch data and send it through WebSocket
const fetchDataAndSend = async () => {
  const data = await fetchDataFromBackend();
  
  if (data) {

    sendDataToClients(data);
  }
};

// Schedule fetchDataAndSend to run every 20 seconds
// setInterval(fetchDataAndSend, 10000);
export default server;
