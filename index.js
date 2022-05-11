var Twit = require("twit");
const taxa = require('./monitor.js')
const cron = require('node-cron');

require("dotenv").config();

const nossoBot = new Twit({
   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token: process.env.ACCESS_TOKEN,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   timeout_ms: 60 * 1000
});


async function acaoDoNossoBot() {
  
// Cuidado ao postar tweets repetidos
// increase 📈
// decrease 📉

   let taxas = await taxa();

   var postTweet = "📉 PREFIX-2025: "+ taxas.ipca2025Pre+"\n"+
                   "📉 PREFIX-2029: "+ taxas.ipca2029Pre+"\n"+
                   "📉 IPCA+2026: "+ taxas.ipca2026+"\n"+
                   "📉 IPCA+2035: "+ taxas.ipca2035+"\n"+
                   "📉 IPCA+2045: "+ taxas.ipca2045;

      console.log('ticks: '+new Date().toString())
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

// Schedule tasks to be run on the server.
//cron.schedule('0 10-17 * * 1-5', function() {
   acaoDoNossoBot();
 //});

// 10 segundos
//setInterval(acaoDoNossoBot, 100000);