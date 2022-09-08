const { schedule } = require('@netlify/functions')

const handler = async function(event, context) {
    console.log("De hora em hora GMT entre 9 e 17..."+ new Date())

    return {
        statusCode: 200,
    };
};

module.exports.handler = schedule("6-14 * * * 1-5", handler); 