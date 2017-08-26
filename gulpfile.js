var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var pug = require('gulp-pug');
var locals = require('./model.js');
var bower = require('gulp-bower');

function compile(file) {
    "use strict";
    gulp.src('./views/' + file + '.pug')
        .pipe(pug({
            locals: locals(file)
        }))
        .pipe(gulp.dest('./public'));
}

gulp.task('default', ['tests']);
gulp.task('postinstall', ['bower', 'compile-templates']);

gulp.task('tests', function () {
    "use strict";
    return gulp.src('spec/**/*.js').pipe(jasmine());
});

gulp.task('bower', function() {
    return bower({cmd: 'update'});
});

gulp.task('compile-templates', function () {
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
