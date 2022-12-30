
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
router.get('/reversegeocode', (req, res) => {
  const { params: { location, language } } = req;
  res.send(axios(process.env.RGEOCODEURL, {
    method: 'get',
    headers: {
      ...commonHeaders,
      'x-rapidapi-host': process.env.RGEOCODEHOST,
      'x-rapidapi-key': process.env.RGEOCODEKEY,
    },
    params: {
      location, /** : `${lat},${lon}`, */
      language,
    },
    body: {
      code: 'US',
    },
  })
    .then((data) => data))
    .catch((err) => err);
});

//export router so the server can find this controller
module.exports = router;