const express = require('express');
const router = express.Router();
const axios = require('axios');
const APIKEY = process.env.YOUTUBE_API_KEY;

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/getVideosFromChannelByCategory', async (req, res) => {
    const { channelId, playlistId } = req.params;
    // Set up the base URL for the YouTube API
    const baseUrl = 'https://www.googleapis.com/youtube/v3/platlistItems';

    // Set up the API key and other parameters for the API request
    const params = {
        part: 'snippet',
        type: 'video',
        maxResults: 50,
        key: APIKEY,
        channelId: channelId,
        playlistId: playlistId
    };

    // Make the API request using Axios
    try {
        const response = await axios.get(`${baseUrl}/search`, { params });
        const videos = response.data.items;
        res.send({
            statusCode: 200,
            body: videos,
            isBase64Encoded: false,
            multiValueHeaders: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
    }
})
 

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/getVideosFromChannel', async (req, res) => {
    const { channelId } = req.params;
    // Set up the axios request
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
        part: 'snippet',
        type: 'video',
        channelId: channelId,
        maxResults: 50,
        order: 'date',
        key: APIKEY,
    }; 
    // Make the request and get the response data
    try {
        const response = await axios.get(baseUrl, { params });
        const data = response.data;
        res.send({
            statusCode: 200,
            body: data,
            isBase64Encoded: false,
            multiValueHeaders: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
    }
})

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/subscribeToChannel', async (req, res) => {
    const { channelId, accessToken } = req.params;
    // Set up the base URL for the YouTube API
    const baseUrl = 'https://www.googleapis.com/youtube/v3';

    // Set up the parameters for the API request
    const params = {
        part: 'snippet',
        key: APIKEY,
        maxResults: 20,
    };

    // Set up the request body
    const data = {
        snippet: {
            resourceId: {
                channelId: channelId
            }
        }
    };

    // Set up the headers for the API request
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    };

    // Make the API request using Axios
    try {
        const response = await axios.post(
            `${baseUrl}/subscriptions`,
            data,
            { params, headers }
        );

        res.send({
            statusCode: 200,
            body: `Subscribed to channel: ${response.data}`,
            isBase64Encoded: false,
            multiValueHeaders: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
    }
})

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/likeVideo', async (req, res) => {
    const { videoId, accessToken } = req.params;

    // Set up the base URL for the YouTube API
    const baseUrl = 'https://www.googleapis.com/youtube/v3';

    // Set up the parameters for the API request
    const params = {
        key: APIKEY
    };

    // Set up the request body
    const data = {
        id: videoId
    };

    // Set up the headers for the API request
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    };

    // Make the API request using Axios
    try {
        const response = await axios.post(
            `${baseUrl}/videos/rate`,
            data,
            { params, headers }
        );

        res.send({
            statusCode: 200,
            body: `Liked Video: ${response.data}`,
            isBase64Encoded: false,
            multiValueHeaders: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;