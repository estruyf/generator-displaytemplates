var settings = (function () {
    var config = require('./config.json');
    
    return{
        checks: function () {
            if (typeof config.client_id === 'undefined') {
                throw "client_id is required in the configuration file"
            }
            if (typeof config.client_secret === 'undefined') {
                throw "client_secret is required in the configuration file"
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
                client_id: config.client_id,
                client_secret: config.client_secret,
                site: config.site,
                files_metadata: config.fileMetadata
            }
        },
        getWatch: function () {
            this.checks();
            return {
                client_id: config.client_id,
                client_secret: config.client_secret,
                site: config.site,
                watch: true,
                files_metadata: config.fileMetadata
            }
        }
    } 
})();

module.exports = settings;