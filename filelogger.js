const fs = require('fs');
const path = require('path');

class ApiLogger {
  constructor(logFilePath) {
    this.logFilePath = logFilePath;
    this.defaultLogLevels = {
      info: [200, 201, 204], // Default log levels for 2xx status codes
      warn: [400, 401, 403, 404], // Default log levels for 4xx status codes
      error: [500, 502, 503], // Default log levels for 5xx status codes
    };
    this.routeConfigs = {};
  }

  setDefaultLogLevels(levels) {
    this.defaultLogLevels = levels;
  }

  setRouteConfig(route, config) {
    this.routeConfigs[route] = config;
  }

  logRequest(req) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${req.method} ${req.url}`;
    this.appendLog(logMessage);
  }

  logResponse(res, route) {
    console.log(route)
    const timestamp = new Date().toISOString();
    const logLevel = this.getLogLevelForResponse(res, route);
    console.log(logLevel)
    const logMessage = `[${timestamp}] [${logLevel.toUpperCase()}] Response sent with status ${res.statusCode}`;
    this.appendLog(logMessage);
  }

  getLogLevelForResponse(res, route) {
    console.log(this.routeConfigs)
    if (this.routeConfigs[route] && this.routeConfigs[route].logLevel) {

        console.log("came here")
      return this.routeConfigs[route].logLevel;
    }

    for (const level in this.defaultLogLevels) {
      if (this.defaultLogLevels[level].includes(res.statusCode)) {
        return level;
      }
    }

    return 'info'; // Default to 'info' for unknown status codes
  }

  appendLog(message) {
    fs.appendFile(this.logFilePath, message + '\n', (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }
}

module.exports = ApiLogger;
