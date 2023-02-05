const express = require('express')
const router = express.Router()

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
// router.get('/maps', (req, res) => {
//   const { body: { lat, lng } } = req;
//   res.send(axios.get(
//     `${process.env.GOOGLEMAPAPIURL}?latlng=${lat},${lng}&key=${process.env.GOOGLEAPIKEY}`,
//   ).then((data) => data)).catch((err) => err);
// });
router.get('/getRoute', async (req, res) => {
  const params = req.url.split('?')[1].split('&')
  const from = params[0].split('=')[1]
  const to = params[1].split('=')[1]
  console.log(from, to)
  axios
    .get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&key=${API_KEY}&sensor=false&alternatives=true`,
    )
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
})

//export router so the server can find this controller
module.exports = router
