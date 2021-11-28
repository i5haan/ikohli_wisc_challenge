const fs = require("fs");

var config = {};

function loadConfig(filePath) {
    let loadedConfig = loadConfigFromFile(filePath);
    if(!validateConfig(loadedConfig)) {
        console.log(`The configuration at ${filePath} is invalid or not existant! Please See below for format and add configs`);
        console.log(JSON.stringify(require('./mockconfig.json'), null, 2))
        process.exit();
    }

    config = loadedConfig;
    
}

function validateConfig(newConfig) {
    if(newConfig && newConfig.domain && (newConfig.auth && newConfig.auth.username && (newConfig.auth.token || newConfig.auth.password))) {
        return true;
    }

    return false;
}

// Returns loaded config if found, or undefined
function loadConfigFromFile(filePath) {
    try {
        // const fullPath = path.resolve(CONFIG_PATH);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
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