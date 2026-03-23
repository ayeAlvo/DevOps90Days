const fs = require('fs');
const path = require('path');

const logDir = '/app/logs';
const logFile = path.join(logDir, 'app.log');

class SimpleLogger {
  write(level, message) {
    const time = new Date().toISOString();
    const log = `[${time}] [${level.toUpperCase()}] ${message}`;

    console.log(log);

    try {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.appendFileSync(logFile, log + '\n');
    } catch (err) {
      console.error('Logger error:', err.message);
    }
  }

  info(msg) { this.write('info', msg); }
  error(msg) { this.write('error', msg); }
}

module.exports = new SimpleLogger();