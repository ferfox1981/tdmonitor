const { schedule } = require('@netlify/functions')

const handler = async function(event, context) {
    console.log("De hora em hora..."+ new Date())

    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("@hourly", handler); 