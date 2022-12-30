import API from './api';

const getDurationInMinutes = (start, end) => Math.abs((new Date(end)) - (new Date(start))) / 60000;

export const meeting = {
  async create({ start, end, topic }) {
    const payload = {
      meetingStart: start,
      meetingDuration: getDurationInMinutes(start, end),
      meetingTopic: topic,
    };
    const {
      success,
      message,
      data: { meetingInformation },
    } = await API.post(process.env.MEETING_ENDPOINT, payload);

    return { success, message, meetingInformation };
  },
};