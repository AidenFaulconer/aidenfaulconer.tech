const axios = require('axios');
const cron = require('cron');


//AUTHORIZATION

async function getYoutubeAccessToken() {
    try {
        // Send a POST request to the YouTube token endpoint
        const response = await axios.post('https://accounts.google.com/o/oauth2/token', {
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SECRET',
            refresh_token: 'YOUR_REFRESH_TOKEN',
            grant_type: 'refresh_token',
        });
        
        // Return the access token from the response
        return response.data.access_token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function getTikTokAccessToken() {
    try {
        // Send a POST request to the TikTok token endpoint
        const response = await axios.post('https://api.tiktok.com/oauth2/token', {
            grant_type: 'client_credentials',
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SECRET',
        });

        // Return the access token from the response
        return response.data.access_token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function getVimeoAccessToken() {
    try {
        // Send a POST request to the Vimeo token endpoint
        const response = await axios.post('https://api.vimeo.com/oauth/authorize/client', {
            grant_type: 'client_credentials',
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SECRET',
        });

        // Return the access token from the response
        return response.data.access_token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function getRumbleAccessToken(){
    try{
        // Send a POST request to the Rumble token endpoint
        const response = await axios.post('https://api.rumble.com/v1/authentication/access_token', {
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SECRET',
            grant_type: 'client_credentials'
        });

        // Return the access token from the response
        return response.data.access_token;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//PUBLISHING
// Method for publishing a video to YouTube
async function postToYoutube() {
    try {
        // Get the video and description from Google Drive
        const { video, description } = await getVideoFromDrive();

        // Create a new FormData object to send the video and metadata
        const formData = new FormData();
        formData.append('video', video); // The video file
        formData.append('snippet', JSON.stringify({
            title: 'Video Title',
            description: description,
            // other video properties
        }));

        // Send a POST request to the YouTube API with the form data
        const response = await axios.post('https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status', formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${youtube_access_token}` // The access token for authenticating the request
            }
        });

        console.log("Video Published to YouTube");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Method for publishing a video to TikTok
async function postToTikTok() {
    try {
        // Get the video and description from Google Drive
        const { video, description } = await getVideoFromDrive();

        // Prepare the data for the request
        const data = {
            video: {
                file: video,
                title: "Video Title",
                caption: description
            }
        };

        // Send a POST request to the TikTok API with the video and metadata
        const response = await axios.post('https://api2.musical.ly/aweme/v1/aweme/post/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tiktok_access_token}`
            }
        });

        console.log("Video Published to TikTok");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Method for publishing a video to Rumble
async function postToRumble() {
    try {
        // Get the video and description from Google Drive
        const { video, description } = await getVideoFromDrive();

        // Prepare the data for the request
        const formData = new FormData();
        formData.append('file', video);
        formData.append('title', 'Video Title');
        formData.append('description', description);

        // Send a POST request to the Rumble API with the video and metadata
        const response = await axios.post('https://api.rumble.com/v1/videos', formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${rumble_access_token}`});
    } catch(error){
        console.log(error)
    }
}

// Method for publishing a video to Vimeo
async function postToVimeo() {
    try {
        // Get the video and description from Google Drive
        const { video, description } = await getVideoFromDrive();

        // Prepare the data for the request
        const data = {
            type: 'video',
            file: video,
            name: 'Video Title',
            description: description
        };

        // Send a POST request to the Vimeo API with the video and metadata
        const response = await axios.post('https://api.vimeo.com/videos', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${vimeo_access_token}`
            }
        });

        console.log("Video Published to Vimeo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//CRON JOB TO HANDLE POSTING

function schedulePost(postingSchedule) {
    try {
        // Create a new cron job
        const job = new cron.CronJob({
            cronTime: postingSchedule.time, // The schedule time from the JSON configuration
            onTick: async () => {
                // Get the video and description from Google Drive
                const { video, description } = await getVideoFromDrive(postingSchedule.postName);
                // Choose the platform based on the platform name
                switch(postingSchedule.platform) {
                    case "youtube":
                        await postToYoutube(video,description);
                        break;
                    case "tiktok":
                        await postToTikTok(video,description);
                        break;
                    case "rumble":
                        await postToRumble(video,description);
                        break;
                    case "vimeo":
                        await postToVimeo(video,description);
                        break;
                }
            },
            start: true, // Start the job immediately
            timeZone: 'UTC' // Set the time zone
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}
