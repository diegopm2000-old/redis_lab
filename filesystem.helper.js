// filesystem.helper.js

const fs = require('fs');
const path = require('path');
const fileType = require('file-type');

const log = require('./log.helper');
const memHelper = require('./mem.helper');

const File = require('./file.entity');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const moduleName = '[ FileSystem Helper]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function load(filepath) {
  return new Promise((resolve, reject) => {
    try {
      log.debug(`${moduleName}:${load.name} (IN) --> filepath: ${filepath}`);
      const data = fs.readFileSync(filepath);
      log.debug(`${moduleName}:${load.name} (MID) --> file loaded with length: ${data.length / 100} (KBytes)`);
      memHelper.memoryUsageTrace(moduleName, load.name);

      const fileProperties = {
        data,
        name: path.basename(filepath),
        type: fileType(data),
      };

      const fileLoaded = new File(fileProperties);

      log.debug(`${moduleName}:${load.name} (OUT) --> fileLoaded: ${fileLoaded.trace()}`);
      resolve(fileLoaded);
    } catch (error) {
      log.error(`${moduleName}:${load.name} (ERROR) --> error: ${error.message}`);
      reject(error);
    }
  });
}

async function save(folderOUT, file) {
  return new Promise((resolve, reject) => {
    log.debug(`${moduleName}:${save.name} (IN) --> folderOUT: ${folderOUT}, file: ${file.trace()}`);

    const fileOutPathFile = `${folderOUT}/${file.name}`;

    fs.writeFile(fileOutPathFile, file.data, (err) => {
      if (err) {
        log.error(`${moduleName}:${save.name} (ERROR) --> error: ${err.message}`);
        reject(err);
      }
      log.debug(`${moduleName}:${save.name} (OUT) --> file saved OK!`);
      resolve(true);
    });
  });
}

module.exports = {
  load,
  save,
};
