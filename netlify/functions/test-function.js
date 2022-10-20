const { schedule } = require('@netlify/functions')
const firebase = require('./firebase')
const taxa = require('./monitor.js')
var Twit = require("twit");
const util = require('./util.js')


const nossoBot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});



const handler = async function (event, context) {
    console.log("De hora em hora GMT entre 9:00 e 18:00 APENAS UMA VEZ ..." + new Date())

    let dadosAntigos = await firebase.getElement();
    console.log('dadosAntigosw', dadosAntigos)
    // recuperar informacao
    let taxas = await taxa();
    console.log('dadosNovos', taxas)

    let isOk = await firebase.setElement(taxas);

    var postTweet = "PREFIX-2025: " + taxas.ipca2025Pre + util.gerarDiferencaPercentual(dadosAntigos.ipca2025Pre, taxas.ipca2025Pre) + "\n" +
        "PREFIX-2029: " + taxas.ipca2029Pre + util.gerarDiferencaPercentual(dadosAntigos.ipca2029Pre, taxas.ipca2029Pre) + "\n" +
        "IPCA+2026: " + taxas.ipca2026 + util.gerarDiferencaPercentual(dadosAntigos.ipca2026, taxas.ipca2026) + "\n" +
        "IPCA+2035: " + taxas.ipca2035 + util.gerarDiferencaPercentual(dadosAntigos.ipca2035, taxas.ipca2035) + "\n" +
        "IPCA+2045: " + taxas.ipca2045 + util.gerarDiferencaPercentual(dadosAntigos.ipca2045, taxas.ipca2045);

    console.log('tweet vai ser:', postTweet)
    if (taxas.statusMercado == 'Fechado' && taxas.statusMercado !== 'Em manutenção') {

        nossoBot.post(
            'statuses/update',
            { status: postTweet },
            function (err, data, response) {
                if (err) {
                    console.log("ERRO:" + err);
                    return false;
                }
                console.log("Tweet postado com sucesso!\n");
            }
        )
    }
    console.log('Tweet enviado')



    return {
        statusCode: 200,
    };
};
module.exports.handler = schedule("* * * * *", handler);
//module.exports.handler = schedule("0 12-21 * * 1-5", handler); 
