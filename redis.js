const Redis = require("ioredis");


const redis = new Redis(process.env.REDIS_URL, {
    tls: {
      rejectUnauthorized: false
    }
  });

  exports.reqjson = function (key){
    redis.get(key, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log('JJ',result); 
          return result
        }
      }); 
  }