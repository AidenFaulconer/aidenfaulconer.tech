import axios from 'axios';

const LOOM_API_URL = 'https://api.loom.com/api';

async function createBooking(date) {
  try {
    // Set the date and time for the booking
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 minutes

    // Set the booking data
    const bookingData = {
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      duration: 30,
      title: 'My Booking',
      description: 'This is a test booking',
      attendees: [
        {
          email: 'attendee1@example.com',
          first_name: 'Attendee',
          last_name: 'One',
        },
        {
          email: 'attendee2@example.com',
          first_name: 'Attendee',
          last_name: 'Two',
        },
      ],
    };

    // Make the API request to create the booking
    const response = await axios.post(`${process.env.LOOM_API_URL}/bookings`,bookingData);
    return response;
  } catch (err){
    console.error(err)
  }
}
