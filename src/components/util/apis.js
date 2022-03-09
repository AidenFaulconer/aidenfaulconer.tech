import axios from 'axios';
import { graphql, useStaticQuery } from 'gatsby';
import { useStore } from '../../store/store';
// ========================================================================== //
// geolocation and other apis
// ========================================================================== //

// frustrating fix for axios **fuck you axios** or use new URLSearchParams(obj).toString()
const serialize = (obj) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
};
// axios is shit tldr: https://github.com/axios/axios/issues/1195
// let params = new URLSearchParams();for params
// use params instead of body... becauase... logic apparently

export const commonHeaders = {
  // 'Content-Type': 'application/json',
  // 'content-type': 'application/x-www-form-urlencoded',//default
  // Accept: 'application/json, text/plain, */*',
  Accept: 'application/json, text/plain, */*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'cache-control': 'no-cache',
  // 'sec-fetch-dest': 'empty',
  // 'sec-fetch-mode': 'cors',
  // 'sec-fetch-site': 'same-site',
  pragma: 'no-cache',
  usequerystring: 'true',
};
// use in auth param in request
// export const authorizeApp = async () => `Bearer ${new google.auth.JWT({
//   email: process.env.NODE_ENV.GOOGLESERVICEACCOUNTAIDEN,
//   key: process.env.NODE_ENV.GOOGLESERVICEACCOUNTAIDENPRIVATEKEY,
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// }).authorize()}`;
// use as headers: {Authorization: 'Bearer JWT'}

// google sheets post
export const postToSpreadsheeets = async (data) => axios.post({
  url: `${process.env.GOOGLESPREADSHEETSURL}/${process.env.GOOGLESPREADSHEETID}/values/A57:append`,
  headers: {
    accept: '*/*',
    userAgent: '*',
  },
  query: {
    valueInputOption: 'RAW',
    includeGridData: true,
    key: '',
    insertDataOption: 'RAW',
    responseDAteTimeRenderOption: 'SERIAL_NUMBER',
  },
  body: {
    // range: 'A57:A59',
    // majorDimension: 'COLUMN', // READ MORE AT https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values#dimension
    // values: ['james is a nicesmellingbutthead', 'ASDFASDFASDF', 'asdfasdfasdf'],
    data,
  },
});
export const searchWeather = async (loc) => axios.get(
  `${process.env.NODE_ENV.APIURL}/data/2.5/weather?q=${loc}&appid=${process.env.OPENWEATHERAPIKEY}`,
);
export const sendSms = async ({ message, recipient }) => {
  console.log(message, recipient);
  return axios.request({
    method: 'POST',
    url: process.env.SMSSENDURL,
    headers: {
      ...commonHeaders,
      'x-rapidapi-host': process.env.SMSHOST,
      'x-rapidapi-key': process.env.RAPIDAPIKEY,
    },
    data: new URLSearchParams({
      username: process.env.CLICKSENDUSERNAME,
      key: process.env.CLICKSENDAPIKEY,
      schedule: '1377959755',
      senderid: 'AJ Garden Care',
      message,
      sms: `+${recipient}`,
    }).toString(),
  });
};

export const sendContactForm = async ({ message, recipient }) => {
  const contactFormData = useStore((state) => state.contactForm);
  return axios.request({
    method: 'POST',
    url: process.env.SMSSENDURL,
    headers: {
      ...commonHeaders,
      'x-rapidapi-host': process.env.SMSHOST,
      'x-rapidapi-key': process.env.RAPIDAPIKEY,
    },
    data: new URLSearchParams({
      username: process.env.CLICKSENDUSERNAME,
      key: process.env.CLICKSENDAPIKEY,
      schedule: '1377959755',
      senderid: 'AJ Garden Care',
      message,
      sms: `+${recipient}`,
    }).toString(),
  });
};
export const sendBookingForm = async ({ message, recipient }) => {
  const bookingFormData = useStore((state) => state.bookingForm);

  console.log(message, recipient);
  return axios.request({
    method: 'POST',
    url: process.env.SMSSENDURL,
    headers: {
      ...commonHeaders,
      'x-rapidapi-host': process.env.SMSHOST,
      'x-rapidapi-key': process.env.RAPIDAPIKEY,
    },
    data: new URLSearchParams({
      username: process.env.CLICKSENDUSERNAME,
      key: process.env.CLICKSENDAPIKEY,
      schedule: '1377959755',
      senderid: 'AJ Garden Care',
      message,
      sms: `+${recipient}`,
    }).toString(),
  });
};

// rapidapi
// fetch('https://inteltech.p.rapidapi.com/send.php', {
//   headers: {
//     accept: 'application/json, text/plain, */*',
//     'accept-language': 'en-US,en;q=0.9',
//     'cache-control': 'no-cache',
//     'content-type': 'application/x-www-form-urlencoded',
//     expires: '0',
//     pragma: 'no-cache',
//     'sec-ch-ua': '"Microsoft Edge";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"Windows"',
//     'sec-fetch-dest': 'empty',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'same-site',
//     usequerystring: 'true',
//     'x-rapidapi-host': 'inteltech.p.rapidapi.com',
//     'x-rapidapi-key': '02205cebf5msh7dfde80a40b1478p19f9fajsna9c5b4a50f76',
//     'x-rapidapi-ua': 'RapidAPI-Playground',
//   },
//   referrer: 'https://rapidapi.com/',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: 'username=aidenf09%40gmail.com&key=005A2016-EB97-7526-81BF-BD78DA52CA22&return=http%3A%2F%2Fyourwebsite.com&schedule=1377959755&senderid=MyCompany&message=tesgasdfasdfasdf&sms=%2B61475565709',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'omit',
// });

// ours
// "access-control-allow-credentials": "true",
// "access-control-allow-headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
// fetch('https://inteltech.p.rapidapi.com/send.php', {
//   headers: {
//     accept: 'application/json, text/plain, */*',
//     'accept-language': 'en-US,en;q=0.9',
//     'access-control-allow-credentials': 'true',
//     'access-control-allow-headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
//     'access-control-allow-methods': 'GET,PUT,POST,DELETE,OPTIONS',
//     'access-control-allow-origin': '*',
//     'cache-control': 'no-cache',
//     'content-type': 'application/x-www-form-urlencoded',
//     pragma: 'no-cache',
//     'sec-ch-ua': '"Microsoft Edge";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"Windows"',
//     'sec-fetch-dest': 'empty',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'cross-site',
//     usequerystring: 'true',
//     'x-rapidapi-host': 'https://inteltech.p.rapidapi.com',
//     'x-rapidapi-key': '02205cebf5msh7dfde80a40b1478p19f9fajsnaa9c5b4a50f76',
//   },
//   referrer: 'http://localhost:8000/',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   // body: 'username=aidenf09%40gmail.com&key=005A2016-EB97-7526-81BF-BD78DA52CA22&schedule=1377959755&senderid=AJ+Garden+Care&message=%0A++++++-------------------------%0A++++++0+has+booked+a+Mulching+service+for+undefined.%0A++++++-------------------------%0A++++++working+space+is+0+metres+squared.%0A++++++-------------------------%0A++++++at+location%3A+0%2C+zip%3A+0%2C+state%3A+0%0A++++++-------------------------%0A++++++they+can+be+contacted+via%0A++++++name%3A+0%0A++++++phone%3A+0%0A++++++email%3A+0%0A++++++-------------------------%0A++++++availible+on%3A+0%0A++++++-------------------------%0A++++++timestamp%3A+9%2F16%2F2021+11%3A08%3A33+PM%0A++++++&sms=%2B61475565709',
//   body: 'username=aidenf09%40gmail.com&key=005A2016-EB97-7526-81BF-BD78DA52CA22&return=http%3A%2F%2Fyourwebsite.com&schedule=1377959755&senderid=MyCompany&message=tesgasdfasdfasdf&sms=%2B61475565709',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'omit',
// });

export const reverseGeocode = async (lat, lon) => axios(process.env.RGEOCODEURL, {
  method: 'get',
  headers: {
    ...commonHeaders,
    'x-rapidapi-host': process.env.RGEOCODEHOST,
    'x-rapidapi-key': process.env.RGEOCODEKEY,
  },
  params: {
    location: `${lat},${lon}`,
    language: 'en',
  },
  body: {
    code: 'US',
  },
});
export const queryGeoDB = async (loc) => axios.get({
  url: '',
  headers: {
    ...commonHeaders,
  },
});
export const queryUserIpInformation = async () => axios.get({
  url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
  headers: {
    ...commonHeaders,
    'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.NODE_ENV.RAPIDAPIKEY}`,
  },
});
export const searchForecast = async (loc) => axios.get(
  `${process.env.NODE_ENV.APIURL}/data/2.5/forecast?q=${loc}&appid=${process.env.OPENWEATHERAPIKEY}`,
);
export const getLocationByLatyLng = async (lat, lng) => axios.get(
  `${process.env.GOOGLEMAPAPIURL}?latlng=${lat},${lng}&key=${process.env.GOOGLEAPIKEY}`,
);
