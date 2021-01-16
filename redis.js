//default redis conf
// const redis = require('redis-clients')([]);
 
// const client = redis.client();
const client = require('redis').createClient(process.env.REDIS_URL);

client.on("connect", function() {
  console.log("Redis is up");
})