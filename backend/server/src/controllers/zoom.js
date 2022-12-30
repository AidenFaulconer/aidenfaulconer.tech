const axios = require('axios');
const { Validator } = require('jsonschema');
const express = require('express');
const router = express.Router();

const schema = {
  title: 'ZoomMeetingCreater',
  type: 'object',
  properties: {
    meetingStart: { type: 'string', format: 'date-time' },
    meetingDuration: { type: 'integer', minimum: 1 },
    meetingTopic: { type: 'string' },
  },
  required: ['meetingStart', 'meetingDuration', 'meetingTopic'],
};

const validatePayload = (payload) => {
  const v = new Validator();
  const result = v.validate(payload, schema);
  return { valid: result.valid, errors: result.errors.map((error) => `${error.property}: ${error.message}`) };
};



const { ZOOM_AUTH_URI, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_CREATE_MEETING_URI } = process.env;

const postRequest = (config, payload = {}) => {
  const options = { ...config, data: payload };

  return axios(options);
};

const requestAccessToken = async () => {
  const config = {
    method: 'POST',
    url: ZOOM_AUTH_URI,
    auth: {
      username: ZOOM_CLIENT_ID,
      password: ZOOM_CLIENT_SECRET,
    },
  };

  const { data: { access_token } } = await postRequest(config);
  return access_token;
};

const processRequest = async (payload) => {
  const accessToken = await requestAccessToken(payload);
  const meetingInformation = await createMeeting(accessToken, payload);
  console.log('[MEETING INFO]', meetingInformation);
  return { meetingInformation };
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/create-meeting', async (req, res) => {
  const { accessToken, payload } = req.body
  const config = {
    method: 'POST',
    url: ZOOM_CREATE_MEETING_URI,
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const meetingParams = {
    start_time: payload.meetingStart,
    topic: payload.meetingTopic,
    duration: payload.meetingDuration,
    type: 2,
    default_password: false,
  };

  const { data: { join_url } } = await postRequest(config, meetingParams);
   res.send({
        statusCode: 200,
        body: JSON.stringify(join_url),
        isBase64Encoded: false,
        multiValueHeaders: {
            'Content-Type': 'application/json',
        },
    }); 
})

module.exports = router;

// exports.handler = async (event, context) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//   };
//   console.log('[EVENT]', event);

//   const { body } = event;
//   let statusCode = 200;
//   let success = true;
//   let message = 'success';
//   let data = null;

//   try {
//     const payload = JSON.parse(body);
//     const { valid, errors } = validatePayload(payload);
//     if (valid) {
//       data = await processRequest(payload);
//       console.log('[SUCCESS]', data);
//     } else {
//       statusCode = 422;
//       success = false;
//       message = `Params validated with JSON-schema. ${errors.join(' ; ')}`;
//       console.warn(message);
//     }
//   } catch (error) {
//     console.warn(error, { event, context });
//     success = false;
//     ({ message } = error);
//     statusCode = error.statusCode || 500;
//   }


//   return {
//     statusCode,
//     headers,
//     body: JSON.stringify({
//       success,
//       message,
//       data,
//     }),
//   };
// };