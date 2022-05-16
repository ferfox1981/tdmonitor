   var Twit = require("twit");
const taxa = require('./monitor.js')

var redis = require('redis');

require("dotenv").config();

const nossoBot = new Twit({
   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token: process.env.ACCESS_TOKEN,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   timeout_ms: 60 * 1000
});
/*
const client = redis.createClient({
   host: process.env.REDIS_HOST,
   port: 13710,
   password: process.env.REDIS_PW,
   socket: {
      tls: true,
      rejectUnauthorized: false
    }
});

*/
const client = redis.createClient({url: process.env.REDIS_URL});

async function acaoDoNossoBot() {
  
   
   client.get('jsondata', (err, reply) => {
      if (err) throw err;
      console.log(reply);
  });


// Cuidado ao postar tweets repetidos
// increase 📈
// decrease 📉

   let taxas = await taxa();

   var postTweet = "📉 PREFIX-2025: "+ taxas.ipca2025Pre+"\n"+
                   "📉 PREFIX-2029: "+ taxas.ipca2029Pre+"\n"+
                   "📉 IPCA+2026: "+ taxas.ipca2026+"\n"+
                   "📉 IPCA+2035: "+ taxas.ipca2035+"\n"+
                   "📉 IPCA+2045: "+ taxas.ipca2045;

      console.log('ticks redis: '+a+" "+new Date().toString())
      if(taxas.statusMercado !== 'Fechado' && taxas.statusMercado !== 'Em manutenção') {              
                   
         nossoBot.post(
            'statuses/update',
            {status: postTweet},
            function (err, data, response) {
               if (err) {
                  console.log("ERRO:" + err);
                  return false;
               }
               console.log("Tweet postado com sucesso!\n");
            }
         )
      }   
}
// ...

   acaoDoNossoBot();
