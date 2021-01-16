const redis = require('redis-clients')([]);
 
//obtain normal redis client
const client = redis.client();

client.on("connect", function() {
  console.log("Redis is up");
})