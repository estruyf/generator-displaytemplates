var settings = (function () {
    var config = require('./config.json');
    
    return{
        checks: function () {
            if (typeof config.username === 'undefined') {
                throw "username is required in the configuration file"
            }
            if (typeof config.password === 'undefined') {
                throw "password is required in the configuration file"
            }
            if (typeof config.site === 'undefined') {
                throw "site is required in the configuration file"
            }
            if (typeof config.fileMetadata === 'undefined') {
                config.fileMetadata = [];
            }
        },
        get: function () {
            this.checks();
            return {
                username: config.username,
                password: config.password,
                site: config.site,
                files_metadata: config.fileMetadata
            }
        },
        download: function () {
            if (typeof config.location === 'undefined') {
                throw "location is required in the configuration file"
            }
            this.checks();
            return {
                username: config.username,
                password: config.password,
                site: config.site,
                startFolder: config.location
            }
        }       
    } 
})();

module.exports = settings;