import ws from "ws";
import app from ".";
import { createServer } from "http";
import { User } from "./models/User.model";

import crypto from "crypto";

const server = createServer(app);

import axios from "axios";
import redisClient from "./config/redisDB";
import { verifyToken } from "./helpers/verifyToken";
import { ObjectId, Types } from "mongoose";

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

interface I_CustomWebSocket extends ws {
  // id:string,
  user: {
    email: string;
    _id: Types.ObjectId;
    name: string;
  };
}

let socketStore = new Map();

async function getUser(str: string, tokenType: "cookie" | "query") {
  let token: string | null;

  if (tokenType == "cookie") {
    token = str.split(";")[0].split("token=")[1];
  } else if (tokenType == "query") {
    token = str.split("/?cookie=")[1];
  } else {
    token = null;
  }

  if (!token) {
    return null;
  }

  const userData = await verifyToken(token);

  const user = await User.findOne({ _id: userData?.userId });

  if (!user) {
    return null;
  }
  return user;
}

webSocketServer.on("connection", async (socket, req) => {
  let user;
  if (req.headers?.cookie) {
    user = await getUser(req.headers?.cookie, "cookie");
  } else if (req.url) {
    user = await getUser(req?.url, "query");
  }

  if (!user) {
    socket.send("Make a login");
    return socket.close();
  }

  const uniqueId = user.id;
  (socket as I_CustomWebSocket).user = user;

  socketStore.set(uniqueId, socket);
  socket.send("user connected");
  User.on("createAlert", async (...args) => {
    const alert = JSON.parse(args[0]);
    //  await  redisClient.lPush({})

    socket.send(JSON.stringify(alert));
  });

  socket.on("close", (code, reason) => {
    socketStore.delete(uniqueId);
    console.log("user disconnected");
  });

  webSocketServer.on("error", (err) => {
    socketStore.clear();
    console.log(err);
  });

  // console.log(socketStore.keys(),  socket.eventNames());
});

// Function to send data to all connected clients
const sendDataToClients = (data: []) => {
  webSocketServer.clients.forEach((client) => {
    // const key=((client as I_CustomWebSocket).user._id.toString());

    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Function to fetch data and send it through WebSocket
const fetchDataAndSend = async () => {
  const data = await fetchDataFromBackend();
  console.log(data);
  if (data) {
    sendDataToClients(data);
  }
};

// Schedule fetchDataAndSend to run every 20 seconds
setInterval(fetchDataAndSend, 2000000);
export default server;
