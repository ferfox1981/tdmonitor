const { schedule } = require('@netlify/functions')

const handler = async function(event, context) {
    console.log("De hora em hora GMT ..."+ new Date())

    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("7-14 * * 1-5", handler); 