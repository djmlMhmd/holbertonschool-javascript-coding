// importing http module that provides functionalities needed to create a HTTP server
const http = require('http');

// create a server app and manage incoming HTTP requests and responses
const app = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Set the response body
  res.end('Hello Holberton School!');
});

// Make server listen to incoming requests on a specific port
app.listen(1245);

module.exports = app;
