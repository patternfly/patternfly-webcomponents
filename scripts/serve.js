const config = require('./util/esdevconfig.json');
const { server } = require('./util/createServer');

console.log(`es-dev-server running on http://localhost:${config.port}`);
server.listen(config.port);