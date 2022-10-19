const { schedule } = require('@netlify/functions')
//const firebase = require('../../firebase')

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
    
    //let dadosAntigos = await firebase.getElement();
   //console.log('dadosAntigosw',dadosAntigos)



    return {
        statusCode: 200,
    };
};
module.exports.handler = schedule("0 12-21 * * 1-5", handler); 
// o de amanha ->>module.exports.handler = schedule("0 13-22 * * 1-5", handler); 