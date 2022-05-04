var Twit = require("twit");
const taxa = require('./monitor.js')

require("dotenv").config();
/*
const nossoBot = new Twit({
   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token: process.env.ACCESS_TOKEN,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   timeout_ms: 60 * 1000
});
*/

const nossoBot = new Twit({
   consumer_key: '527kTJH1fEmO7APnGv9p6XvQb',
   consumer_secret: 'kRydFpUQ66IBO3LLmnnCxaDP3eEkvRiz2eWxCEYQJIxJcp5OTs',
   access_token: '1511162557826052098-dXg413CYPf2kGWP7oJo9iyZLOVr4c1',
   access_token_secret: '452WKET9XZQdouxgxjbjO92B8T8UjmeYxVXpof45aZaGB',
   timeout_ms: 60 * 1000
});

async function acaoDoNossoBot() {
    //console.log( await taxa())
// Cuidado ao postar tweets repetidos
// increase 📈
// decrease 📉

   let taxas = await taxa();

   var postTweet = "📉 PREFIX-2025: "+ taxas.ipca2025Pre+"\n"+
                   "📉 PREFIX-2029: "+ taxas.ipca2029Pre+"\n"+
                   "📉 IPCA+2026: "+ taxas.ipca2026+"\n"+
                   "📉 IPCA+2035: "+ taxas.ipca2035+"\n"+
                   "📉 IPCA+2045: "+ taxas.ipca2045;
                 //  replace(/,/g, '.')
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
acaoDoNossoBot();
// 10 segundos
//setInterval(acaoDoNossoBot, 10000);