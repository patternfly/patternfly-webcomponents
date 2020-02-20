// https://github.com/open-wc/open-wc/tree/master/packages/es-dev-server
const config = require('./util/esdevconfig.json');
const { server } = require('./util/createServer');

console.log(`es-dev-server running on http://localhost:${config.port}/docs`);
server.listen(config.port);