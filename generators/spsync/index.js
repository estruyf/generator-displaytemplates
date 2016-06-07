var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
    // The name constructor is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);        
        
        // Next, add your custom code
        this.option('name', {
            type: String,
            desc: 'Title of the Office Add-in',
            required: false
        });
        
        this.option('client_id', {
            type: String,
            desc: 'SharePoint add-in client id',
            required: true
        });
        
        this.option('client_secret', {
            type: String,
            desc: 'SharePoint add-in secret',
            required: true
        });
        
        this.option('site', {
            type: String,
            desc: 'SharePoint site URL',
            required: true
        });
        
        this.genConfig = {};
    },
    
    prompting: {
        askFor: function () {
            var done = this.async();
            
            var prompts = [
                {
                    name: 'client_id',
                    message: 'What is your SharePoint add-in client id?',
                    default: null, //00000000-0000-0000-0000-000000000000
                    when: this.options.client_id === undefined
                },
                {
                    name: 'client_secret',
                    message: 'What is your SharePoint add-in secret?',
                    default: null,
                    when: this.options.client_secret === undefined
                }
            ];
            
            this.prompt(prompts, function(responses){
                this.genConfig = extend(this.genConfig, this.options);
                this.genConfig = extend(this.genConfig, responses);
                done();
            }.bind(this));
        }
    },
    
    writing: {
        app: function() {
            var done = this.async();
            
            // create common assets
            this.fs.copyTpl(this.templatePath('_gulpfile.js'),
                            this.destinationPath('gulpfile.js'));
            this.fs.copyTpl(this.templatePath('_package.json'),
                            this.destinationPath('package.json')); 
            this.fs.copyTpl(this.templatePath('settings.js'),
                            this.destinationPath('settings.js')); 
                            
            // Create and update the config file with the required properties
            var pathToConfigJson = this.templatePath('../../app/templates/config.json');
            if (this.fs.exists(pathToConfigJson)) {
                // Load config.json file
                var configJson = this.fs.readJSON(pathToConfigJson, 'utf8');
                
                // Set the required properties
                if (!configJson['client_id']) {
                    configJson['client_id'] = this.genConfig.client_id;
                }
                if (!configJson['client_secret']) {
                    configJson['client_secret'] = this.genConfig.client_secret;
                }
                if (!configJson['site']) {
                    configJson['site'] = this.genConfig.site;
                }

                // Overwrite the existing config.json
                this.log(chalk.green('Adding your configuration to the config.json file'));
                this.fs.writeJSON(this.destinationPath('config.json'), configJson);
            }
            
            done();
        }
    }
});