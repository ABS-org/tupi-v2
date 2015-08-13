// Gruntfile.js
//
//

module.exports = function (grunt) {
  'use strict';

  var appConfig = {

    // Default Paths
    path: {
      bower: 'bower_components',
      files: 'files',
      images: 'img',
      tests: 'tests'
    },

    /************************************
     * grunt-contrib-copy
     * Clean files and folders
     ************************************/
    copy: {
      main: {
        files: [{ // Bower - JQuery
          expand: true,
          cwd: '<%= path.bower %>/',
          src: 'jquery/dist/jquery.js',
          dest: 'js/'
        }, { // Bower - Boostrap JS
          expand: true,
          cwd: '<%= path.bower %>/',
          src: 'bootstrap/dist/js/bootstrap.js',
          dest: 'js/'
        }, { // Bower - Boostrap CSS
          expand: true,
          cwd: '<%= path.bower %>/',
          src: ['bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/fonts/*'],
          dest: 'css/'
        }, { // Bower - Tupi
          expand: true,
          cwd: '<%= path.bower %>/',
          src: 'tupi2/dist/**',
          dest: 'css/',
        }]
      },
    },

    /************************************
     * grunt-contrib-watch
     * Watch Files
     ************************************/
    watch: {
      website: {
        files: ['css/**/*.css', 'js/**/*.js', 'index.html'],
        options: {
          livereload: true,
        },
      }
    },

    /************************************
     * grunt-contrib-connect
     * Start a connect web server
     ************************************/
    connect: {
      server: {
        options: {
          port: 9001,
          open: true,
          livereload: true
        }
      }
    },

  };

  // Init grunt configurations
  grunt.initConfig(appConfig);

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  // Server task
  grunt.registerTask('server', ['connect', 'watch']);

  // Default task
  grunt.registerTask('default', ['copy', 'server']);
};
