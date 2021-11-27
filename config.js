const homedir = require('os').homedir();
const CONFIG_PATH = `${homedir}/.zendesk/config.json`;
const path = require("path");
const fs = require("fs");

var config = {};

async function loadConfig() {
    let loadedConfig = await loadConfigFromFile();
    if(!validateConfig(loadedConfig)) {
        console.log(`The configuration at ${CONFIG_PATH} is invalid or not existant! Please See below for format and add configs`);
        console.log(JSON.stringify(require('./mockconfig.json'), null, 2))
        process.exit();
    }

    config = loadedConfig;
    
}

async function setupConfigFromUser() {

}

function validateConfig(newConfig) {
    if(newConfig && newConfig.domain && (newConfig.auth && newConfig.auth.username && (newConfig.auth.token || newConfig.auth.password))) {
        return true;
    }

    return false;
}

// Returns loaded config if found, or undefined
async function loadConfigFromFile() {
    try {
        // const fullPath = path.resolve(CONFIG_PATH);
        return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    } catch(e) {
        return;
    }
}

function getConfig() {
    return config;
}


module.exports = {
    getConfig,
    loadConfig
}