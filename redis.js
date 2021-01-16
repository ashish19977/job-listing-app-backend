
class RedisConn {

  static establishConn(){
    try{

      this.CLIENT = require('redis').createClient(process.env.REDIS_URL)
    
      this.CLIENT.on("connect", function() {
        console.log("Redis is up");
      })  
    }catch(e){
      console.error('Redis con error : ', e)
    }      
  }

  static getClient(){
    return this.CLIENT
  }

}

module.exports =  RedisConn