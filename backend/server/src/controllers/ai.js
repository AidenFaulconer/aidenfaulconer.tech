const express = require('express')
const router = express.Router()
const axios = require('axios')
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/gpt'
const { ChatGPTAPI, ChatGPTAPIBrowser } = import('chatgpt')

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/prompt', async (req, res) => {
  const { prompt } = req.body
  try {
    // Make the API request to chat with GPT-3
    const response = await axios.post(
      `${OPENAI_API_URL}`,
      {
        prompt,
        model: 'chat-gpt',
        temperature: 0.5,
      },
      {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    )
    console.log(JSON.stringify(response, null, 2))
    // Get the response from GPT-3
    const chatResponse = response.data.response

    res.send({
      status: 200,
      body: chatResponse,
    })
  } catch (error) {
    console.error(error)
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
router.post('/chat', async (req, res) => {
  const { prompt } = req.body
  try {
    const api = ChatGPTAPI({
      sessionToken: process.env.OPENAI_API_KEY,
    })

    await api.ensureAuth()

    // Make the API request to chat with GPT-3
    const response = await api.sendMessage(prompt)

    console.log(JSON.stringify(response, null, 2))
    // Get the response from GPT-3
    const chatResponse = response.data.response

    res.send({
      status: 200,
      body: chatResponse,
    })
  } catch (error) {
    console.error(error)
  }
})

const cheerio = require('cheerio')

const getRandomProxy = async () => {
  try {
    const response = await axios.get(
      'https://free-proxy-list.net/anonymous-proxy.html',
    )
    const proxies = []
    const $ = cheerio.load(response.data)
    $('table#proxylisttable tbody tr').each((i, tr) => {
      const ip = $(tr).find('td:nth-child(1)').text()
      const port = $(tr).find('td:nth-child(2)').text()
      proxies.push({ ip, port })
    })
    const proxy = proxies[Math.floor(Math.random() * proxies.length)]
    console.log(proxy)
    return proxy
  } catch (error) {
    console.log(error)
  }
}

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/chatbot', async (req, res) => {
  const { prompt } = req.body
  try {
    const api = new ChatGPTAPIBrowser({
      email: 'businesseducatedofficial@gmail.com',
      password: '5qqPEJKkTa5#',
      // proxyServer: await getRandomProxy(),
      isGoogleLogin: true,
    })

    await api.ensureAuth()

    // Make the API request to chat with GPT-3
    const response = await api.sendMessage(prompt)

    console.log(JSON.stringify(response, null, 2))
    // Get the response from GPT-3
    const chatResponse = response.data.response

    res.send({
      status: 200,
      body: chatResponse,
    })
  } catch (error) {
    console.error(error)
  }
})

//export router so the server can find this controller
module.exports = router

// extras to implement
// const dotenv = require("dotenv");
// dotenv.config();

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// });
// const openai = new OpenAIApi(configuration);

// const listModels = async () => {
//   const result = await openai.listModels();
//   return result.data;
// };

// const createCompletion = async (prompt) => {
//   let response = {};

//   try {
//     response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt,
//       max_tokens: 250,
//       temperature: 0
//     });
//     return response.data;
//   } catch (error) {
//     console.log("🚀 ~ file: openai.js:27 ~ createCompletion ~ error", error)
//     response.error = true;
//   }
//   return response
// };

// module.exports = {
//   listModels,
//   createCompletion
// };
