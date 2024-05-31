import { _config } from "./config/config";
import connectDB from "./config/db";
import redisClient from "./config/redisDB";
import server from "./socketServer";

const port = _config.PORT;

async function runServer() {

  try {
  await  connectDB();

  redisClient.connect().then(()=>{
    console.log("Redis Connected");
  
   }).catch((err:unknown)=>{
    console.log(err);
    process.exit(1);
  })


  } catch (error) {
    console.log(error);
    process.exit(1)    
  }

  server.listen(port, function () {
    console.log(`Server is listeing on port ${port}`);
  });
}

runServer();
