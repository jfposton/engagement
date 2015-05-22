module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/*.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html':'index.html'
                }
            }
        },
        jshint: {
            sitejs: "js/*.js"
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
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
                    {expand: false, src: ['favicon.ico', '.bowerrc', 'bower.json'], dest: 'dist/'}
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
                    {src: ['dist/**'], dest: ''}
                ]
            }
        }
    });

    var npmTasks = [
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-contrib-htmlmin',
        'grunt-contrib-cssmin',
        'grunt-contrib-compress',
        'grunt-contrib-copy'
    ]

    for(i = 0; i < npmTasks.length; i++) {
        grunt.loadNpmTasks(npmTasks[i]);
    }

    // Default task(s).
    grunt.registerTask('QA', ['jshint']);
    grunt.registerTask('build', ['uglify', 'htmlmin', 'cssmin', 'copy']);
    grunt.registerTask('deploy', ['build', 'compress']);
};
