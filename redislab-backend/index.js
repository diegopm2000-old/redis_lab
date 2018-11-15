// index.js

const log = require('./log.helper');

const fileService = require('./file.service');
const redisHelper = require('./redis.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const moduleName = '[Index]';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function initRedis() {
  const options = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    return_buffers: true, // the replies will be sent to callbacks as Buffers instead of Strings
  };

  log.debug(`${moduleName}:${initRedis.name} (IN) --> options: ${JSON.stringify(options)}`);
  redisHelper.init(options);

  log.debug(`${moduleName}:${initRedis.name} (OUT) --> Redis Helper initialized OK!`);
}

function start() {
  // 1. Init Redis System
  initRedis();
  const folderIN = '../files/filesIN';
  const folderOUT = '../files/filesOUT';
  const testFiles = [
    { originFile: 'prueba.txt' },
    { originFile: 'index.js' },
    // { originFile: 'CleanArchitecture.pdf' },
    // { originFile: 'SoapUI-x64-5.4.0.sh' },
    // { originFile: 'ubuntu-18.04.1-desktop-amd64.iso' },
  ];
  const index = 3;
  // 2. Prepare origin file and name of destination file
  const originpathFile = `${folderIN}/${testFiles[index].originFile}`;
  // 3. Load File from filesystem
  fileService.getFile(originpathFile)
    .then(() => fileService.getFile(originpathFile))
    .then(result => fileService.setFile(folderOUT, result))
    .then(() => log.debug('All operations completed with Success'))
    .catch((error) => {
      log.error(`${moduleName}:${start.name} (ERROR) --> ${error.stack}`);
    });
}

// //////////////////////////////////////////////////////////////////////////////
// INIT
// //////////////////////////////////////////////////////////////////////////////

start();
