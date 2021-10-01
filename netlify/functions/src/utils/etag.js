const crypto = require('crypto');

const etag = (req, html) => {
  const hash = crypto.createHash('sha256').update(html);

  // Use the x-no-compression header to establish a new etag.
  if (req.headers['x-no-compression']) {
    console.log('Requested without compression, updating etag...');
    hash.update('x-no-compression');
  }

  return hash.digest('hex');
};

module.exports = etag;
