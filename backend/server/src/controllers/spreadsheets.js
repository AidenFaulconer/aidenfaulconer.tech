
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
router.post('/api/spreadsheets', async (req, res) => {
  const { body } = req;
  const data = await axios.post({
    url: `${process.env.GOOGLESPREADSHEETSURL}/${process.env.GOOGLESPREADSHEETID}/values/A57:append`,
    headers: {
      accept: '*/*',
      userAgent: '*',
    },
    query: {
      valueInputOption: 'RAW',
      includeGridData: true,
      key: '',
      insertDataOption: 'RAW',
      responseDAteTimeRenderOption: 'SERIAL_NUMBER',
    },
    // range: 'A57:A59',
    // majorDimension: 'COLUMN', // READ MORE AT https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values#dimension
    // values: ['james is a nicesmellingbutthead', 'ASDFASDFASDF', 'asdfasdfasdf'],
    body,
  }).catch((err) => err);

   return res.send({
    status: 200,
    body: data,
  });
});

//export router so the server can find this controller
module.exports = router;