const axios = require('axios')

//gets most recent upload
async function getVideoFromDrive() {
  try {
    // Get the list of files in the user's Google Drive
    const {
      data: { files },
    } = await axios.get('https://www.googleapis.com/drive/v3/files', {
      params: {
        orderBy: 'createdTime desc', // Order the files by the time they were created
        mimeType: 'video/*', // Only get video files
        q: `mimeType='application/json' and trashed = false`,
        maxResults: 1000,
      },
      headers: {
        Authorization: `Bearer ${access_token}`, // The access token for authenticating the request
      },
    })

    if (!files) {
      throw new Error('No files found')
    }

    // Find the most recent video file and associated JSON file
    let videoFile, jsonFile
    for (const file of files) {
      if (file.mimeType.startsWith('video/')) {
        videoFile = file
        // Search for the associated JSON file with the same name
        const jsonFiles = files.filter((f) => f.name === `${file.name}.json`)
        if (jsonFiles.length > 0) {
          jsonFile = jsonFiles[0]
          break
        }
      }
    }

    if (!videoFile) {
      throw new Error('No video file found')
    }

    if (!jsonFile) {
      throw new Error('No associated json file found')
    }

    // Get the video file from google drive
    const videoResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${videoFile.id}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        responseType: 'stream',
      },
    )

    // Get the json file from google drive
    const jsonResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${jsonFile.id}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    // Create the description template
    let description = ''
    for (let key in jsonResponse.data) {
      let value = jsonResponse.data[key]
      description = description.replace(`{{${key}}}`, value)
    }

    // Return the video file and the associated description
    return {
      video: videoResponse.data,
      description,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

//gets content by postName
async function getVideoFromDrive(postName) {
  try {
    // Get the list of files in the user's Google Drive
    const {
      data: { files },
    } = await axios.get('https://www.googleapis.com/drive/v3/files', {
      params: {
        q: `mimeType='application/json' and trashed = false and name='${postName}.json'`,
        maxResults: 1000,
      },
      headers: {
        Authorization: `Bearer ${access_token}`, // The access token for authenticating the request
      },
    })
    if (!files) {
      throw new Error('No files found')
    }

    let jsonFile = files[0]
    if (!jsonFile) {
      throw new Error('No json file found')
    }

    // Get the json file from google drive
    const jsonResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${jsonFile.id}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    // Create the description template
    let description = ''
    for (let key in jsonResponse.data) {
      let value = jsonResponse.data[key]
      description = description.replace(`{{${key}}}`, value)
    }
    // Get the video file from google drive
    const videoResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${jsonResponse.data.videoId}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        responseType: 'stream',
      },
    )
    return {
      video: videoResponse.data,
      description,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
