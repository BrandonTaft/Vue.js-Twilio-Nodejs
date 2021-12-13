const scheduler = require('./src/scheduler');
const config = require('./config/Config');
const server = require('./server');

scheduler.start();
server.listen(config.APP_PORT, () => {
    console.log("Server Is Running on ", config.APP_PORT)
  });