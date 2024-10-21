const NodeCache = require('node-cache');

const cacheInstance = new NodeCache({ stdTTL: 600 });
module.exports = {
    cacheInstance
  };