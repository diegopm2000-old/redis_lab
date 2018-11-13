// redis.helper.js

const redis = require('redis');

const log = require('./log.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const moduleName = '[ Redis Helper]';

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

let options;
let client;

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function init(optionsIN) {
  log.debug(`${moduleName}:${init.name} (IN) --> optionsIN: ${JSON.stringify(optionsIN)}`);
  options = optionsIN;
  client = redis.createClient(options);

  client.on('error', (err) => {
    log.error(`Error ${err}`);
  });

  log.debug(`${moduleName}:${init.name} (OUT) --> Redis initialized OK!`);
}

function load(filepath) {
  return new Promise((resolve, reject) => {
    log.debug(`${moduleName}:${load.name} (IN) --> filepath: ${filepath}`);

    client.hgetall(filepath, (err, reply) => {
      if (err != null) {
        log.debug(`${moduleName}:${load.name} (ERROR) --> error: ${err.message}`);
        reject(err);
      }
      if (reply == null) {
        log.debug(`${moduleName}:${load.name} (OUT) --> reply: null`);
        resolve(reply);
      } else {
        log.debug(`${moduleName}:${load.name} (OUT) --> reply: <<reply>>`);
        resolve(reply);
      }
    });
  });
}

function save(filepath, file) {
  return new Promise((resolve, reject) => {
    try {
      log.debug(`${moduleName}:${save.name} (IN) --> filepath: ${filepath}, file: ${file.trace()}`);

      client.hset(filepath, 'name', file.name);
      client.hset(filepath, 'type', JSON.stringify(file.type));
      client.hset(filepath, 'data', file.data);

      resolve(true);
    } catch (err) {
      log.debug(`${moduleName}:${save.name} (ERROR) --> error: ${err.message}`);
      reject(err);
    }
  });
}

module.exports = {
  init,
  load,
  save,
};
