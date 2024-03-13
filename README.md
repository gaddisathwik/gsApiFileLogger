# API Logger Library

The API Logger Library is a Node.js library that enables you to log API requests and responses with customizable logging levels and timestamps. This library is designed to simplify the process of monitoring and debugging API interactions in your Node.js applications.

## Features

- Log API requests and responses to a specified file.
- Customizable logging levels (e.g., info, warn, error).
- Timestamps for each log entry.
- Seamless integration with Node.js HTTP servers.

## Installation

To install the API Logger Library, use npm:

npm install api-logger-library


## Usage

Here's how you can integrate the API Logger Library into your Node.js application:

```javascript
const http = require('http');
const ApiLogger = require('api-logger-library');

const apiLogger = new ApiLogger('api.log');

const server = http.createServer((req, res) => {
  apiLogger.logRequest(req);

  res.on('finish', () => {
    apiLogger.logResponse(res);
  });

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
}); 
```


## Custom Logging Levels
You can specify custom logging levels using the setLogLevels method:

```javascript
apiLogger.setLogLevels(['info', 'warn', 'error', 'custom']);
apiLogger.log('custom', 'This is a custom log message');
apiLogger.log('info', 'This is an info log message');
apiLogger.log('warn', 'This is a warning log message');
apiLogger.log('error', 'This is an error log message');
```

## Configuration
You can configure the API Logger Library by adjusting the settings in the ApiLogger constructor:

logFilePath: The path to the log file where API requests and responses will be logged.

## License
This project is licensed under the ISC License. See the LICENSE file for details.

## Author
Sathwik Gaddi

## Acknowledgments
Node.js Community

## Support and Contact
For support or inquiries, please contact gaddisathwik@gmail.com.