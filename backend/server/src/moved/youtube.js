import axios from 'axios';

const APIKEY = process.env.YOUTUBE_API_KEY;

export const getVideosFromChannelByCategory = async (channelId, playlistId) => {
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
    return videos;
  } catch (error) {
    console.error(error);
  }
}

export const extractVideos = (json) => {
  const items = json.items;
  const videos = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const video = {
      id: item.id.videoId,
      publishedAt: item.snippet.publishedAt,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
    };
    videos.push(video);
  }
  return videos;
}


export const getVideosFromChannel = async (channelId) => {
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
  console.info(process.env.YOUTUBE_API_KEY, APIKEY)
  // Make the request and get the response data
  try {
    const response = await axios.get(baseUrl, { params });
    console.info(response)
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}



async function subscribeToChannel(channelId, accessToken) {
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
    console.log('Subscribed to channel:', response.data);
  } catch (error) {
    console.error(error);
  }
}

async function likeVideo(videoId, accessToken) {
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
    console.log('Liked video:', response.data);
  } catch (error) {
    console.error(error);
  }
}
