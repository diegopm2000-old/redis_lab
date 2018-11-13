// file.service.js

const perf = require('execution-time')();

const log = require('./log.helper');
const File = require('./file.entity');
const redisHelper = require('./redis.helper');
const fileSystemHelper = require('./filesystem.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const moduleName = '[ File Service]';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function buildFile(reply) {
  // console.log(`entrando en buildFile con reply: ${JSON.stringify(reply)}`);
  // const objReply = JSON.parse(reply);
  const fileProperties = {
    data: reply.data,
    name: reply.name,
    type: JSON.parse(reply.type),
  };
  const resultFile = new File(fileProperties);

  return resultFile;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getFile(filepath) {
  log.info(`${moduleName}:${getFile.name} (IN) --> filepath: ${filepath}`);
  perf.start();

  let resultFile;
  let foundInRedis = false;

  // First check if the file is stored in redis
  const reply = await redisHelper.load(filepath);

  if (reply === null) {
    foundInRedis = false;
    log.debug(`--------------- ${moduleName}:${getFile.name} (MID) --> File NOT FOUND in REDIS...loading from disk`);
    resultFile = await fileSystemHelper.load(filepath);
    // Saves file to Redis Cache
    await redisHelper.save(filepath, resultFile);
  } else {
    foundInRedis = true;
    log.debug(`*************** ${moduleName}:${getFile.name} (MID) --> File FOUND in REDIS`);
    resultFile = buildFile(reply);
  }

  const resultTime = perf.stop();
  log.debug(`${moduleName}:${getFile.name} (OUT) --> resultFile: ${resultFile.trace()}`);
  if (foundInRedis) {
    log.info(`${moduleName}:${getFile.name} (TIME) --> File loaded FROM REDIS in ${resultTime.time} ms`);
  } else {
    log.info(`${moduleName}:${getFile.name} (TIME) --> File loaded FROM DISK in ${resultTime.time} ms`);
  }

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
