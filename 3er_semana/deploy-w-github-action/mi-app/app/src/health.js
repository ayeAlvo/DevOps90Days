function checkHealth() {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "App running"
  };
}

module.exports = { checkHealth };