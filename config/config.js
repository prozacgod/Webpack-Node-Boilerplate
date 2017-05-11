/*
  NOTE: Config settings are in:

  config.default.js -> inside git repo
  config.local.js -> outside of git
  config.env.js -> ENV variables

  No need to change this file for config settings
*/
var debug = require('debug')('config');

function fromEnvironment(mapping) {
  var envMap = {};
  for (var key in mapping) {
    if (mapping[key] in process.env) {
      envMap[key] = process.env[mapping[key]];
    }
  }
  return envMap;
}

// updates values to known whitelisted or validated settings
function realizeConfig(config) {
  var result = Object.assign({}, config);

  if ((typeof(result.debug) === 'string') && (result.debug.toLowerCase() === 'true')) {
    result.debug = true;
  }

  if (result.debug !== true) {
    result.debug = false;
  }

  return result;
}

// load local config settings
var configLocal = {};
try {
  configLocal = require('./config.local.js');
} catch (e) {
  debug('local config missing.');
}

// load environment settings
var envMappings = {};
try {
  envMappings = require('./config.env.js');
} catch(e) {
  debug('no environment mappings.');
}

var configEnvironment = fromEnvironment(envMappings);

// load default settings
var configDefault = require('./config.default.js');

// compose final
var finalConfig = realizeConfig(Object.assign({}, configDefault, configLocal, configEnvironment));

require('debug')('config:settings')('ismain', finalConfig);

module.exports = finalConfig;
