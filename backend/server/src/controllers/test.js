const express = require('express');
const router = express.Router();

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/1', (req, res) => {
  const { body, headers, readable, rawTrailers, socket, secure, subdomains, statusMessage, complete, fresh, ip, method, originalUrl, params, protocol, query} = req;

  res.write(JSON.stringify({
    message: 'you sent this information',
    body,
    headers,
    complete,
    fresh,
    ip,
    method,
    originalUrl,
    params,
    protocol,
    query,
    rawTrailers,
    readable,
    secure,
    // socket,
    subdomains,
    statusMessage,
  }, null, 2));
});

router.get('/2', (req, res) => {
  const {
    body, headers, readable, rawTrailers, socket, secure, subdomains, statusMessage, complete, fresh, ip, method, originalUrl, params, protocol, query,
  } = req;

  res.write(
    JSON.stringify({message: 'hey, you said hi!',}, null, 2)
    ); 
});

//export router so the server can find this controller
module.exports = router;