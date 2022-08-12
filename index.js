var Twit = require("twit");
const taxa = require('./monitor.js')
const firebase = require('./firebase')
const util = require('./util.js')


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
   // informacao de taxas antiga
   //let dadosAntigos = JSON.parse(await redisConn.reqjson('taxas'));
   //console.log('dadosAntigosw',dadosAntigos)
   // recuperar informacao
   let taxas = await taxa();

   //let isOk = await redisConn.savejson('taxas', JSON.stringify(taxas));
   
   
   //const iguais = util.comparaDiferenca(dadosAntigos,taxas)

      
   var postTweet = "📉 PREFIX-2025: "+ taxas.ipca2025Pre+"\n"+
                   "📉 PREFIX-2029: "+ taxas.ipca2029Pre+"\n"+
                   "📉 IPCA+2026: "+ taxas.ipca2026+"\n"+
                   "📉 IPCA+2035: "+ taxas.ipca2035+"\n"+
                   "📉 IPCA+2045: "+ taxas.ipca2045+"\n";
                   //"📉 IPCA+JurosSem2032: "+taxas.ipca2032JurosSem;

      console.log('ticks dados novos: '+new Date().toString())
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
