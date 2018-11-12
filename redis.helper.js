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

    client.get(filepath, (err, reply) => {
      if (err != null) {
        log.debug(`${moduleName}:${load.name} (ERROR) --> error: ${err.message}`);
        reject(err);
      }
      if (reply != null) {
        log.debug(`${moduleName}:${load.name} (OUT) --> reply: null`);
      } else {
        log.debug(`${moduleName}:${load.name} (OUT) --> reply: ${reply}`);
      }
      resolve(reply);
    });
  });
}

function save(filepath, file) {
  return new Promise((resolve, reject) => {
    try {
      log.debug(`${moduleName}:${save.name} (IN) --> filepath: ${filepath}, file: ${file.trace()}`);

      client.set(file.name, file);

      log.debug(`${moduleName}:${save.name} (OUT) --> OK`);
      resolve(true);
    } catch (err) {
      log.debug(`${moduleName}:${load.name} (ERROR) --> error: ${err.message}`);
      reject(err);
    }
  });
}

module.exports = {
  init,
  load,
  save,
};

