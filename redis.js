const Redis = require("ioredis");


const redis = new Redis(process.env.REDIS_URL, {
    tls: {
      rejectUnauthorized: false
    }
  });

  exports.reqjson = async function (key){
    return redis.get(key, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          return result
        }
      }); 
  }

  exports.savejson = async function (key, value){      
    return redis.set(key, value, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          return result
        }
      }); 
  }  