const { schedule } = require('@netlify/functions')
const firebase = require('./firebase')
const taxa = require('./monitor.js')
var Twit = require("twit");
 
const nossoBot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
 });



const handler = async function(event, context) {
    console.log("De hora em hora GMT entre 9:00 e 18:00 APENAS UMA VEZ ..."+ new Date())
    
    let dadosAntigos = await firebase.getElement();
    console.log('dadosAntigosw',dadosAntigos)
       // recuperar informacao
    let taxas = await taxa();
    console.log('dadosNovos',taxas)


    return {
        statusCode: 200,
    };
};
module.exports.handler = schedule("* * * * *", handler); 
//module.exports.handler = schedule("0 12-21 * * 1-5", handler); 
