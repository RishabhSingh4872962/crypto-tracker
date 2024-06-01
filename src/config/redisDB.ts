import { createClient } from "redis";
import { _config } from "./config";

const redisClient= createClient({
    // url:"redis-19431.c212.ap-south-1-1.ec2.redns.redis-cloud.com:19431"
    password:_config.redis_password,
    socket: {
        host: _config.redis_hostname,
        port: Number(_config.redis_port) || 19431
    }
});


redisClient.on('error', err => console.log('Redis Client Error', err));

export default redisClient