const { spawn } = require('child_process')
const axios = require('axios')
//consider this list of other public sources aswell...
// Clearbit (https://clearbit.com/)
// Hunter.io (https://hunter.io/)
// Anymail Finder (https://anymailfinder.com/)
// Email Hunter (https://emailhunter.co/)
// Snov.io (https://snov.io/)
// FindThatLead (https://findthat.lead/)
// LeadLeaper (https://leadleaper.com/)
// VoilaNorbert (https://www.voilanorbert.com/)
// FindEmails (https://findemails.com/)
// GetProspect (https://getprospect.com/)
// Hunter Email Extractor (https://chrome.google.com/webstore/detail/hunter-email-extractor/jbdjndcbgbdcjnlmhnjekijehhlpejnb)
// Email Extractor (https://email-extractor.app/)
// FindThatEmail (https://findthat.email/)
// Prospect.io (https://prospect.io/)
// FindThat (https://findthat.email/)
// FindThatAddress (https://findthat.address/)
// FindThatPhone (https://findthatphone/)

async function scrapeEmailsAndPhoneNumbers() {
  try {
    // Scrape emails and phone numbers from a public online database
    const emails = await scrapeEmails()
    const phoneNumbers = await scrapePhoneNumbers()

    // Use the postToSpreadsheet method to store the results
    postToSpreadsheet({
      emails: emails,
      phoneNumbers: phoneNumbers,
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getEmailFromClearbit(domain) {
  try {
    const response = await axios.get(
      `https://person.clearbit.com/v2/combined/find?email=${domain}`,
      {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,
        },
      },
    )
    return response.data.email
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getPhoneNumberFromClearbit(domain) {
  try {
    const response = await axios.get(
      `https://person.clearbit.com/v2/combined/find?domain=${domain}`,
      {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,
        },
      },
    )
    return response.data.phone
  } catch (error) {
    console.error(error)
    throw error
  }
}

//for running the bot
function runEmailPhoneScrape(siteLinks) {
  return new Promise((resolve, reject) => {
    // Create a string containing the site links to pass to the Python script
    const siteLinksString = siteLinks.join(' ')
    // Run the Python script and pass in the site links as an argument
    const pythonProcess = spawn('python', [
      'email_phone_scraper.py',
      siteLinksString,
    ])
    let data = ''
    pythonProcess.stdout.on('data', (chunk) => {
      data += chunk
    })
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Failed to run the python script. Error Code: ${code}`)
      } else {
        try {
          const output = JSON.parse(data)
          resolve(output)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
