// file.service.js

const perf = require('execution-time')();

const log = require('./log.helper');
const redisHelper = require('./redis.helper');
const fileSystemHelper = require('./filesystem.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const moduleName = '[ File Service]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getFile(filepath) {
  log.info(`${moduleName}:${getFile.name} (IN) --> filepath: ${filepath}`);
  perf.start();

  let resultFile;

  // First check if the file is stored in redis
  const fileFromRedis = await redisHelper.load(filepath);

  if (fileFromRedis === null) {
    log.debug(`${moduleName}:${getFile.name} (MID) --> File NOT FOUND in REDIS...loading from disk`);
    resultFile = await fileSystemHelper.load(filepath);
    // Saves file to Redis Cache
    // TODO
  } else {
    log.debug(`${moduleName}:${getFile.name} (MID) --> File FOUND in REDIS`);
    resultFile = fileFromRedis;
  }

  const resultTime = perf.stop();
  log.debug(`${moduleName}:${getFile.name} (OUT) --> resultFile: ${resultFile.trace()}`);
  log.info(`${moduleName}:${getFile.name} (TIME) --> File loaded in ${resultTime.time} ms`);

  return resultFile;
}

async function setFile(folderOUT, file) {
  log.debug(`${moduleName}:${setFile.name} (IN) --> folderOUT: ${folderOUT}, file: ${file.trace()}`);

  const result = await fileSystemHelper.save(folderOUT, file);

  log.debug(`${moduleName}:${setFile.name} (OUT) --> result: ${result}`);
  return result;
}

module.exports = {
  getFile,
  setFile,
};
