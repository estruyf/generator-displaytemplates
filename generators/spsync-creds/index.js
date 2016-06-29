var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');
var inquirer = require('inquirer');

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
        
        this.option('site', {
            type: String,
            desc: 'SharePoint site URL',
            required: true
        });
        
        this.option('username', {
            type: String,
            desc: 'Username',
            required: true
        });
        
        this.option('password', {
            type: String,
            desc: 'Password',
            required: true
        });
        
        this.option('download', {
            type: Boolean,
            desc: 'Download files after install?',
            required: true
        });
        
        this.genConfig = {};
    },
    
    prompting: {
        askFor: function () {
            var done = this.async();
                        
            var prompts = [
                {
                    name: 'username',
                    message: 'Username:',
                    default: null,
                    when: this.options.username === undefined,
                    type: 'input'
                },
                {
                    name: 'password',
                    message: 'Password:',
                    default: null,
                    when: this.options.password === undefined,
                    type: 'password'
                },
                {
                    name: 'download',
                    message: 'Download files after installation?',
                    default: true,
                    type: 'confirm'
                }
            ];

            inquirer.prompt(prompts).then(function(responses) {
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
                if (!configJson['username']) {
                    configJson['username'] = this.genConfig.username;
                }
                if (!configJson['password']) {
                    configJson['password'] = this.genConfig.password;
                }
                if (!configJson['site']) {
                    configJson['site'] = this.genConfig.site;
                }
                if (!configJson['location']) {
                    configJson['location'] = "_catalogs/masterpage/" + this.genConfig.projectInternalName;
                }

                // Overwrite the existing config.json
                this.log(chalk.green('Adding your configuration to the config.json file'));
                this.fs.writeJSON(this.destinationPath('config.json'), configJson);
            }
            
            done();
        }
    },
    
    install: function() {
        // Run npm installer?
        if (this.genConfig['download']) {
            this.spawnCommand('gulp', ['download']);
        }
    }
});