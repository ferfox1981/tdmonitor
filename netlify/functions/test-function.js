const handler = async function(event, context) {
    console.log("FODA-SE"+ new Date())

    return {
        statusCode: 200,
    };
};

module.exports.handler = handler;