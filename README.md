# Yeoman Display Template Generator
Yeoman generator that gives you a kick start for building Search Display Templates

# Installation
Run the following command to install the required packages and Yeoman display template generator:

```$ npm install -g gulp yo generator-displaytemplates```

# Usage
Once you installed the display templates generator, you just need to execute this command:

```$ yo displaytemplates```

The generator asks you for the following things:
- Project name
- Client ID
- Client Secret
- Site URL
- Skip install *(true or false)*: if you set this to true, the ``npm install`` command will be skipped. Be aware, if you do this, it will not install the dependencies.

# Configuration
At the moment the generator makes use of the **gulp-spsync** plugin created by Wictor Wilen. Go to the [gulp-spsync](gulp-spsync https://github.com/wictorwilen/gulp-spsync) repo to check out the configuration process on your SharePoint Online site.

The generator requires the following things in order to run your gulp tasks afterwards:
- **client_id**: this is the ID of your SharePoint add-in;
- **client_secret**: this is the secret of your SharePoint add-in;
- **site**: this is the site URL where your configured the SharePoint add-in.

# Development process
Once you completed all previous steps, you can start your development process.

## Display template samples
In the directory you will find a **sample** folder. This contains the following files which can be used to create new templates:
- **control_starter.html**: this is a starter control display template;
- **item_starter.html**: this is a starter item display template;
- **control_minimal.js**: this is a starter control JavaScript display template (this template does not require a HTML file);
- **item_minimal.js**: this is a starter item JavaScript display template (this template does not require a HTML file);

## Display template creation
Create your display templates in the following folder:
```
.
├── src/
│   └── _catalogs/
│       └── masterpage/
│           └── <your-project-name> (default: search-display-templates)/ 
│               └── Create all your files in this folder
```

## Upload, watch, publish
The following Gulp tasks are available:

**gulp**: this task uploads all the display templates to the masterpage gallery
```
$ gulp
```

**gulp set-metadata**: uploads all the files and sets the metadata for the files. Metadata has to be specified in the config.json file and contains sample data.
```
$ gulp set-metadata
```

**gulp set-metadata**: uploads all the files and sets the metadata for the files. Metadata has to be specified in the config.json file and contains sample data.
```
$ gulp set-metadata
```

**gulp publish**: uploads all the files, sets metadata and publishes each of the files.
```
$ gulp publish
```

**gulp watch**: watches for file changes, once a change happens, the file will get uploaded. 
```
$ gulp watch
```

**gulp watch-metadata**: watches for file changes, once a change happens, the file will get uploaded and metadata will get set.
```
$ gulp watch-metadata
```