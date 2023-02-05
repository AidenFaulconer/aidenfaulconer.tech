module.exports = [
  'strapi::errors',
  // 'strapi::security',
  {
    //for editor.js
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'script-src': ["'self'", 'editor.unlayer.com'],
          'frame-src': ["'self'", 'editor.unlayer.com'],
          'img-src': [
            '*',
            'businesseducated.com',
            '127.0.0.1',
            "'self'",
            'data:',
            'cdn.jsdelivr.net',
            'strapi.io',
            's3.amazonaws.com',
          ],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      header: '*',
      origin: [
        '*',
        'http://businesseducated.com:8000',
        'https://businesseducated.com:8000',
        'http://127.0.0.1:8000',
        'http://localhost:8000',
        'http://localhost:3169',
        'https://www.thunderclient.com',
        'localhost',
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
