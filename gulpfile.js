var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var jade = require('gulp-jade');
var locals = require('./model.js');
var bower = require('gulp-bower');

function compile(file) {
    "use strict";
    gulp.src('./views/' + file + '.jade')
        .pipe(jade({
            locals: locals(file)
        }))
        .pipe(gulp.dest('./public'));
}


gulp.task('default', ['tests']);
gulp.task('postinstall', ['bower', 'compile-jade']);

gulp.task('tests', function () {
    "use strict";
    return gulp.src('spec/**/*.js').pipe(jasmine());
});

gulp.task('bower', function() {
    return bower({cmd: 'update'});
});

gulp.task('compile-jade', function () {
    "use strict";
    if (process.env.TRAVIS === 'true' && process.env.TRAVIS_BRANCH == 'master') {
        process.env.NODE_ENV = 'production';
    }
    compile('story');
    compile('bride');
    compile('groom');
    compile('bridalParty');
    compile('groomsmen');
    compile('weddinginfo');
    compile('gallery');
});
