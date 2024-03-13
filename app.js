const http = require('http');
const ApiLogger = require('./filelogger');

const apiLogger = new ApiLogger('api.log');
apiLogger.setRouteConfig('/api/special', { logLevel: 'warn', logFormat: 'json' });
const server = http.createServer((req, res) => {
  apiLogger.logRequest(req);

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/api/special') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Success');
  } else if (req.url === '/notfound') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  } else {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
  
  apiLogger.logResponse(res, "message");
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});



