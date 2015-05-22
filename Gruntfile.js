module.exports = function (grunt) {
    grunt.initConfig({
        pkg: {
            name: "toast-to-poston"
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/*.js',
                dest: 'js/<%= pkg.name %>.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['jshint']);
};
