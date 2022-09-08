const { schedule } = require('@netlify/functions')

const handler = async function(event, context) {
    console.log("De hora em hora GMT entre 9 e 17 APENAS UMA VEZ ..."+ new Date())

    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("1 9-14 * * 1-5", handler); 