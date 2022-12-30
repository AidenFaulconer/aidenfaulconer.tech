//run this
import fs from 'fs';
import http2 from 'http2';
// import { createHandler } from 'graphql-http/lib/use/node';

// Create a HTTP/2 server using the handler on `/graphql`

const server = (handler) => http2.createSecureServer(
  {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem'),
  },
  (req, res) => {
    if (req.url.startsWith('/graphql')) {
      handler(req, res);
    } else {
      res.writeHead(404).end();
    }
  },
);

module.exports = server

//use like this
// server.listen(4000);
// console.log('Listening to port 4000');

//if using graphql pass a handler like follows
// Create the GraphQL over HTTP Node request handler
// const handler = createHandler({ schema });
//server(handler);

//generate a cert as follows
// $ openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \ -keyout localhost-privkey.pem -out localhost-cert.pem