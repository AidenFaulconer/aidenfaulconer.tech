exports.handler = async function (event, context, callback) {
  const res = (JSON.stringify({
    event, context, callback,
  }, null, 2));

  callback(null, {
    statusCode: 200,
    body: res,
    isBase64Encoded: false,
    multiValueHeaders: {
      'Content-Type': 'application/json',
    },
  });
};
