
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
router.post('/recaptcha', async (req, res) => {
    if (req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captacha === null)
        return res.json({ success: false, msg: 'Please select captcha' });


    // verify url
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //  request to verify url
    const body = await fetch(verifyUrl).then(res => res.json());


    // if captcha not verified 
    if (body.success !== undefined && !body.success)
        return res.json({ success: false, msg: 'captcha failed' });

    // if captcha verified 
    return res.send({
            statusCode: 200,
            body: 'captcha verified',
            isBase64Encoded: false,
            multiValueHeaders: {
                'Content-Type': 'application/json',
            },
        });
});

//export router so the server can find this controller
module.exports = router;