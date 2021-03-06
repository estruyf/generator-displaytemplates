var gulp = require('gulp');
var watch = require('gulp-watch');
var sp = require('gulp-spsync');
var settings = require('./settings');

var folder = 'src/**/*.*';

/*
    Default task: uploads all the files to SharePoint
 */
gulp.task('default', function() {
    return gulp.src(folder)
               .pipe(sp(settings.get()));
});

/*
    set-metadata task: uploads all the files to SharePoint and overwrites the metadata setting
 */
gulp.task('set-metadata', function() {
    var crntSettings = settings.get();
    crntSettings["update_metadata"] = true;
    
    return gulp.src(folder)
               .pipe(sp(crntSettings));
});

/*
    publish task: uploads everything, sets metadata and publishes each file
 */
gulp.task('publish', function() {
    var crntSettings = settings.get();
    crntSettings["update_metadata"] = true;
    crntSettings["publish"] = true;
    
    return gulp.src(folder)
               .pipe(sp(crntSettings));
});

/*
    watch task: this task can be used during the development process, it automatically uploads the files when changed
 */
gulp.task("watch", function(){    
    return gulp.src(folder)
               .pipe(watch(folder))
               .pipe(sp(settings.getWatch()));
});

/*
    watch task: this task can be used during the development process, it automatically uploads the files when changed and sets metadata
 */
gulp.task("watch-metadata", function(){
    var crntSettings = settings.getWatch();
    crntSettings["update_metadata"] = true;
        
    return gulp.src(folder)
               .pipe(watch(folder))
               .pipe(sp(crntSettings));
});

