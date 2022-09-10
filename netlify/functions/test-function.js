const { schedule } = require('@netlify/functions')

const handler = async function(event, context) {
    console.log("De hora em hora GMT entre 9:00 e 18:00 APENAS UMA VEZ ..."+ new Date())

    return {
        statusCode: 200,
    };
};
module.exports.handler = schedule("0 12-21 * * 1-5", handler); 
// o de amanha ->>module.exports.handler = schedule("0 13-22 * * 1-5", handler); 