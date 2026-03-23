const fs = require('fs');
const path = require('path');

class SimpleLogger {
  write(level, message) {
    const time = new Date().toISOString();
    const log = `[${time}] [${level.toUpperCase()}] ${message}`;
    console.log(log);

    const logPath = path.join('/app/logs', 'app.log');
    fs.appendFileSync(logPath, log + '\n');
  }

  info(msg) { this.write('info', msg); }
  error(msg) { this.write('error', msg); }
}

module.exports = new SimpleLogger();