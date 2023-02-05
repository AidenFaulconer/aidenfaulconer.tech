const { jsPDF } = require('jspdf')
const nodemailer = require('nodemailer')

// Googleapis
const { google } = require('googleapis')
const fs = require('fs')

// Pull out OAuth2 from googleapis
const OAuth2 = google.auth.OAuth2

const createTransporter = async () => {
  //connect us to the oauth playground
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  )

  // keep refreshing our token from https://developers.google.com/oauthplayground/
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_CLIENT_REFRESH_TOKEN,
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :( ' + err)
      }
      resolve(token)
    })
  })

  return nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    // host: process.env.MAIL_HOST || 'smtp.mail.yahoo.com',
    // port: 465,
    // port: 587,
    date: Date.now(),
    // html: ``,
    secure: false,
    debug: process.env.NODE_ENV === 'development',
    logger: true,
    // dkim: {
    //   domainName: process.env.DOMAIN_NAME,
    //   keySelector: 'dkim',
    //   privateKey: process.env.EMAIL_DKIM_PRIVATE_KEY,
    // },
    //TODO: this needs re-configuration
    tls: {
      rejectUnauthorized: process.env.NODE_ENV !== 'development',
    },
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_MAIL_P + '#',
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      refreshToken: accessToken,
    },
  })
}

const readImageFiles = (files) => {
  const images = []
  files.forEach((file) => {
    const { createReadStream } = file
    const stream = createReadStream(streamConfig)
    stream.on('data', (data) => images.push(data)) // transfer bye by byte in chunks
    stream.on('end', () => console.log('end :', Buffer.concat(file).toString()))
    stream.on('error', (err) => console.log('error :', err))
  })
  return images.map((file) => ({
    filename: `referencePhotos-${new Date().toDateString()}.jpg`,
    content: file,
    contentType: 'application/jpg',
  }))
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
const sendGmail = async (
  message,
  subject,
  to,
  from = process.env.GMAIL_ADDRESS,
  pdfContents = null,
  attachments = [],
) => {
  let report = null

  if (pdfContents) {
    report = Buffer.from(
      new jsPDF()
        .text(JSON.stringify(pdfContents, null, 2), 10, 10)
        .output('arraybuffer'),
    )
  }

  try {
    const mailOptions = {
      from,
      to,
      subject,
      text: message,
      // attachments: (report && [report, ...attachments]) || attachments,
      // report && {
      //   filename: `report-${new Date().toDateString()}.pdf`,
      //   content: report,
      //   contentType: 'application/pdf',
      // },
    }

    const emailTransporter = await createTransporter()
    return emailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        return err
      } else {
        // console.log(info)
        return info
        // return res.send({
        //   statusCode: 200,
        //   body: info,
        //   isBase64Encoded: false,
        //   multiValueHeaders: {
        //     'Content-Type': 'application/json',
        //   },
        // })
      }
    })
  } catch (error) {
    console.log(error)
    return error
  }
}

function loadEmailTemplate(templateName, values) {
  // Load the email template file
  const emailTemplate = fs.readFileSync(
    `../templates/${templateName}.html`,
    'utf8',
  )
  let emailHtml = emailTemplate

  // Replace the placeholder values with the provided values
  for (const [key, value] of Object.entries(values)) {
    emailHtml = emailHtml.replace(`{{${key}}}`, value)
  }

  return emailHtml
}

module.exports = { sendGmail, readImageFiles, loadEmailTemplate }
