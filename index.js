var Twit = require("twit");
const taxa = require('./monitor.js')

var redis = require('redis');

require("dotenv").config();

if(!process.env.REDIS_URL)
   console.log('URL Redis Inválida')
else
   console.log('URL Redis válida')

const nossoBot = new Twit({
   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token: process.env.ACCESS_TOKEN,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   timeout_ms: 60 * 1000
});

const options = {
   url: process.env.REDIS_URL,
   enable_offline_queue: true,
   no_ready_check: true,
   retry_strategy: (options) => {
     if (options.error && options.error.code === 'ECONNREFUSED') {
       return new Error('The server refused the connection');
     }
     if (options.total_retry_time > 1000 * 60 * 60) {
       return new Error('Retry time exhausted');
     }
     if (options.attempt > 10) {
       return undefined;
     }
     // reconnect after
     return Math.min(options.attempt * 100, 3000);
   }
 };

//const client = redis.createClient({url: process.env.REDIS_URL});

async function acaoDoNossoBot() {
   console.log('zzzzz');
  /* 
   const client = redis.createClient(
   process.env.REDIS_URL,   
   options
   );
  

  let a
   
   await client.get('jsondata', (err, reply) => {
      if (err) throw err;
      console.log('AAAAAAAAHHHHHHHHHHHH',reply);
  });
*/

(async () => {
   const client = redis.createClient(process.env.REDIS_URL, options);
   client.auth(process.env.REDIS_PW);
   client.on('error', (err) => console.log('Redis Client Error', err));
 
   await client.connect();
 
   await client.set('key', 'PAPAPAPAAP');
   const value = await client.get('key');
 })();

// Cuidado ao postar tweets repetidos
// increase 📈
// decrease 📉

   let taxas = await taxa();

   var postTweet = "📉 PREFIX-2025: "+ taxas.ipca2025Pre+"\n"+
                   "📉 PREFIX-2029: "+ taxas.ipca2029Pre+"\n"+
                   "📉 IPCA+2026: "+ taxas.ipca2026+"\n"+
                   "📉 IPCA+2035: "+ taxas.ipca2035+"\n"+
                   "📉 IPCA+2045: "+ taxas.ipca2045;

      console.log('ticks redis: '+new Date().toString())
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
