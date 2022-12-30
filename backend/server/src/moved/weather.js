
const express = require('express');
const router = express.Router();
// ========================================================================== //
//      Search Weather
// ========================================================================== //
router.get('/weather', (req, res) => {
  const { query } = req;
  res.send(axios.get(
    `${process.env.NODE_ENV.APIURL}/data/2.5/weather?q=${query}&appid=${process.env.OPENWEATHERAPIKEY}`,
  )
    .then((data) => data))
    .catch((err) => err);
});

//export router so the server can find this controller
module.exports = router;