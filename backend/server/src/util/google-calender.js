const { google } = require('googleapis')

// Pull out OAuth2 from googleapis
const OAuth2 = google.auth.OAuth2

const authenticate = async () => {
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

  return oauth2Client
}
//SHAPE OF DATA FOR EVENTDATA
// {
//   summary: string, // Title of the event
//   location: string, // Location of the event
//   description: string, // Description of the event
//   start: {
//     dateTime: string, // Start time of the event, in ISO 8601 format
//     timeZone: string, // Time zone of the start time
//   },
//   end: {
//     dateTime: string, // End time of the event, in ISO 8601 format
//     timeZone: string, // Time zone of the end time
//   },
//   recurrence: string[], // Recurrence rule for the event, if applicable
//   attendees: {
//     email: string, // Email address of the attendee
//     responseStatus: string, // Response status of the attendee
//   }[], // List of attendees
//   reminders: {
//     useDefault: boolean, // Use the default reminders for the calendar
//     overrides: {
//       method: string, // Method of the reminder (e.g., "email", "popup")
//       minutes: number, // Number of minutes before the event to send the reminder
//     }[], // List of overrides for the default reminders
//   }, // Reminders for the event
// }

// POST route for posting events to Google Calendar
const addToGoogleCalendar = async (
  eventData,
  calendarId = process.env.GOOGLE_CALENDER_ID,
) => {
  try {
    // Authenticate and initialize the Calendar API
    // await calendarClient.authorize()
    const calendar = google.calendar({
      version: 'v3',
      auth: await authenticate(),
    })

    // Create the event
    const response = await calendar.events.insert({
      calendarId,
      resource: eventData,
    })

    // Send a success response
    return {
      status: 200,
      message: 'Event successfully created in Google Calendar.',
      response: response.data,
    }
  } catch (error) {
    console.error(error)

    return {
      status: 500,
      message: 'An error occurred while creating the event.',
      error: error,
    }
  }
}

// GET route for getting events from Google Calendar
const getFromGoogleCalendar = async (
  startDate,
  endDate,
  calendarId = process.env.GOOGLE_CALENDER_ID,
) => {
  try {
    // Authenticate and initialize the Calendar API
    await calendarClient.authorize()
    const calendar = google.calendar({
      version: 'v3',
      auth: await authenticate(),
    })

    // Get the events
    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate,
      timeMax: endDate,
    })

    // Send a success response
    return {
      status: 200,
      message: 'Events successfully retrieved from Google Calendar.',
      response: response.data,
    }
  } catch (error) {
    console.error(error)

    return {
      status: 500,
      message: 'An error occurred while retrieving the events.',
      error: error,
    }
  }
}

// GET route for getting a list of unavailable dates
const getUnavailableDates = async (
  startDate,
  endDate,
  calendarId = process.env.GOOGLE_CALENDER_ID,
) => {
  try {
    // Authenticate and initialize the Calendar API
    await calendarClient.authorize()
    const calendar = google.calendar({
      version: 'v3',
      auth: await authenticate(),
    })

    // Get the events
    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate,
      timeMax: endDate,
    })

    // Extract the start dates of the events
    const eventDates = response.data.items.map((event) => event.start.date)

    // Send a success response with the unavailable dates
    return {
      status: 200,
      message: 'Unavailable dates successfully retrieved from Google Calendar.',
      data: eventDates,
    }
  } catch (error) {
    console.error(error)

    return {
      status: 500,
      message: 'An error occurred while retrieving the unavailable dates.',
      error: error,
    }
  }
}

module.exports = {
  addToGoogleCalendar,
  getFromGoogleCalendar,
  getUnavailableDates,
}
