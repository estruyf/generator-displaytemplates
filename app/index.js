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
        
        this.option('skip-install', {
            type: Boolean,
            required: false,
            defaults: false,
            desc: 'Skip running NPM package manager at the end.'
        });
    },
    
    initializing: function(){
        this.log(yosay('Welcome to the ' +
            chalk.red('Display Templates Template') +
        ' generator.'+
        '! Let\'s create a new project.'));

        // generator configuration
        this.genConfig = {};
    },
    
    prompting: {
        askFor: function () {
            var done = this.async();
            
            var prompts = [{
                name: 'name',
                message: 'Project name',
                default: 'Search Display Templates',
                when: this.options.name === undefined
            },
            {
                name: 'skip-install',
                message: 'Skip install?',
                default: false,
                when: this.options.name === undefined
            }];
            
            this.prompt(prompts, function(responses){
                this.genConfig = extend(this.genConfig, this.options);
                this.genConfig = extend(this.genConfig, responses);
                done();
            }.bind(this));
        }
    },
    
    configuring: function(){
        // take name submitted and strip everything out non-alphanumeric or space
        var projectName = this.genConfig.name;
        projectName = projectName.replace(/[^\w\s\-]/g, '');
        projectName = projectName.replace(/\s{2,}/g, ' ');
        projectName = projectName.trim();

        // add the result of the question to the generator configuration object
        this.genConfig.projectInternalName = projectName.toLowerCase().replace(/ /g, '-');
        this.genConfig.projectDisplayName = projectName;
        this.genConfig.rootPath = this.genConfig['root-path'];
    },
    
    writing: {
        app: function() {
            // helper function to build path to the file off root path
            this._parseTargetPath = function(file){
                return path.join(this.genConfig['root-path'], file);
            };
            
            var done = this.async();
            
            // create common assets
            this.fs.copyTpl(this.templatePath('_gulpfile.js'),
                            this.destinationPath('gulpfile.js'));
            this.fs.copyTpl(this.templatePath('_package.json'),
                            this.destinationPath('package.json')); 
            this.fs.copyTpl(this.templatePath('settings.js'),
                            this.destinationPath('settings.js')); 
                            
            // Create sample files
            this.fs.copyTpl(this.templatePath('sample/control_minimal.js'),
                            this.destinationPath('sample/control_minimal.js'));  
            this.fs.copyTpl(this.templatePath('sample/item_minimal.js'),
                            this.destinationPath('sample/item_minimal.js'));
            this.fs.copyTpl(this.templatePath('sample/control_starter.html'),     
                            this.destinationPath('sample/control_starter.html'));
            this.fs.copyTpl(this.templatePath('sample/item_starter.html'),
                            this.destinationPath('sample/item_starter.html'));
                            
            // Create folder structure
            mkdirp(this.destinationPath() + '/src/_catalogs/masterpage/' + this.genConfig.projectInternalName, function (err) {
                if (!err) {
                    // Folder created
                }
            });
            
            done();
        }
    },
    
    install: function() {
        // Run npm installer?
        if (!this.genConfig['skip-install']) {
            this.npmInstall();
        }
    }
});