var Twit = require("twit");
const taxa = require('./monitor.js')
var firebase = require('firebase')


require("dotenv").config();

var firebaseConfig = {
   apiKey: "AIzaSyDAiOXfQSoe3B0yNiEO4qiMLqRgLpeM9mY",
   authDomain: "",
   databaseURL: "https://react-my-burguer-ab0fe.firebaseio.com/",
   projectId: "react-my-burguer-ab0fe",
   storageBucket: "",
   messagingSenderId: "",
   appId: ""
 }

const nossoBot = new Twit({
   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token: process.env.ACCESS_TOKEN,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   timeout_ms: 60 * 1000
});


async function acaoDoNossoBot() {
   console.log('aaaaa');
   firebase.initializeApp(firebaseConfig)
   let database = firebase.database()
   try{
      var ref = database.ref("/orders/");
      ref.on("value", function (snapshot) {
        console.log(snapshot.val());
      });
   }catch (err) {
    console.log(err);
  }

// Cuidado ao postar tweets repetidos
// increase 📈
// decrease 📉

   let taxas = await taxa();

   var postTweet = "📉 ccPREFIX-2025: "+ taxas.ipca2025Pre+"\n"+
                   "📉 PREFIX-2029: "+ taxas.ipca2029Pre+"\n"+
                   "📉 IPCA+2026: "+ taxas.ipca2026+"\n"+
                   "📉 IPCA+2035: "+ taxas.ipca2035+"\n"+
                   "📉 IPCA+2045: "+ taxas.ipca2045;

      console.log('ticks ainda redis: '+new Date().toString())
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
