var gulp = require('gulp')
var plumber = require("gulp-plumber");
var sp = require('gulp-spsync-creds');
var settings = require('./settings');
var onError = function (err) {
    this.emit("end");
};

var mainFld = 'src';
var folder = './src/**/*.*';

/*
    Default task: uploads all the files to SharePoint
 */
gulp.task('default', function() {   
    return gulp.src(folder).pipe(
        sp.sync(settings.get())
    );
});

/*
    set-metadata task: uploads all the files to SharePoint and overwrites the metadata setting
 */
gulp.task('set-metadata', function() {
    var crntSettings = settings.get();
    crntSettings["update_metadata"] = true;
    
    return gulp.src(folder)
               .pipe(sp.sync(crntSettings));
});

/*
    publish task: uploads everything, sets metadata and publishes each file
 */
gulp.task('publish', function() {
    var crntSettings = settings.get();
    crntSettings["update_metadata"] = true;
    crntSettings["publish"] = true;
    
    return gulp.src(folder)
               .pipe(sp.sync(crntSettings));
});

/*
    watch task: this task can be used during the development process, it automatically uploads the files when changed
 */
gulp.task("watch", function() {
    var crntSettings = settings.get();
    crntSettings["cache"] = true;

    gulp.watch(folder, function (event) {
        gulp.src(event.path, { base: mainFld })
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sp.sync(crntSettings));
    });
});

/*
    watch task: this task can be used during the development process, it automatically uploads the files when changed and sets metadata
 */
gulp.task("watch-metadata", function(){
    var crntSettings = settings.get();
    crntSettings["update_metadata"] = true;
    crntSettings["cache"] = true;

    gulp.watch(folder, function (event) {
        gulp.src(event.path, { base: mainFld })
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sp.sync(crntSettings));
    });
});


/*
    download task: download the files for the specified folder
 */
gulp.task('download', function() {
    var crntSettings = settings.download();
    return sp.download(crntSettings).pipe(gulp.dest("src/" + crntSettings.startFolder));
});