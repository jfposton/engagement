var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var jade = require('gulp-jade');
var locals = require('./model.js');
var bower = require('gulp-bower');
var compressor = require('node-minify');

function compile(file) {
    "use strict";
    gulp.src('./views/' + file + '.jade')
        .pipe(jade({
            locals: locals(file)
        }))
        .pipe(gulp.dest('./public'));
}

function minifyJs(file) {
    // Using Google Closure
    new compressor.minify({
        type: 'gcc',
        fileIn: 'public/javascripts/' + file + '.js',
        fileOut: 'public/javascripts/' + file + '.min.js',
        callback: function(err){
            console.log(err);
        }
    });
}

function minifyCss(file) {
    // Using YUI Compressor for CSS
    new compressor.minify({
        type: 'yui-css',
        fileIn: 'public/stylesheets/' + file + '.css',
        fileOut: 'public/stylesheets/' + file + '.min.css',
        callback: function(err){
            console.log(err);
        }
    });
}


gulp.task('default', ['tests']);
gulp.task('postinstall', ['bower', 'compile-jade', 'minify-js', 'minify-css']);

gulp.task('tests', function () {
    "use strict";
    return gulp.src('spec/**/*.js').pipe(jasmine());
});

gulp.task('bower', function() {
    return bower({cmd: 'update'});
});

gulp.task('compile-jade', function () {
    "use strict";
    // Compiled templates should always be ready for production
    var originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    compile('story');
    compile('bride');
    compile('groom');
    compile('bridalParty');
    compile('groomsmen');
    compile('weddinginfo');
    compile('gallery');
    compile('credits');
    process.env.NODE_ENV = originalEnv;
});

gulp.task('minify-js', function() {
    "use strict";
    minifyJs('map');
    minifyJs('site');
});

gulp.task('minify-css', function() {
    "use strict";
    minifyCss('photos');
    minifyCss('site');
});
