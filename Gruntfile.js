module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/*.js',
                dest: 'dist/js/site.min.js'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },
        jshint: {
            sitejs: "js/*.js"
        },
        cssmin: {
            options: {
                shorthandCompacting: false
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['resources/**'], dest: 'dist/'},
                    {expand: false, src: ['favicon.ico'], dest: 'dist/'},
                    {expand: false, src: ['bower.json'], dest: 'dist/'},
                    {expand: false, src: ['setup.sh'], dest: 'dist/'}
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'toast-to-poston-<%= pkg.version %>.zip',
                    mode: 'zip'
                },
                files: [
                    {expand: true, cwd: 'dist/', src: ['**'], dest: ''},
                ]
            }
        },
    });

    var npmTasks = [
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-contrib-htmlmin',
        'grunt-contrib-cssmin',
        'grunt-contrib-compress',
        'grunt-contrib-copy',
        'grunt-remove'
    ], i = 0;
    for (i; i < npmTasks.length; i = i + 1) {
        grunt.loadNpmTasks(npmTasks[i]);
    }

    // Default task(s).
    grunt.registerTask('QA', ['jshint']);
    grunt.registerTask('build', ['uglify', 'htmlmin', 'cssmin', 'copy']);
    grunt.registerTask('deploy', ['build', 'compress']);
};
