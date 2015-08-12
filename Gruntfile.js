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

    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    /************************************
     * grunt-contrib-clean
     * Clean files and folders
     ************************************/
    clean: {
      dist: ['<%= path.dist %>']
    },

    /************************************
     * grunt-contrib-copy
     * Clean files and folders
     ************************************/
    copy: {
      main: {
        files: [{// Bower - JQuery
          expand: true,
          flatten: true,
          src: '<%= path.bower %>/jquery/jquery.js',
          dest: 'js/'
        }, { // Bower - Boostrap JS
          expand: true,
          flatten: true,
          src: '<%= path.bower %>/bootstrap/dist/js/bootstrap.js',
          dest: 'js/'
        }, { // Bower - Boostrap CSS
          expand: true,
          flatten: true,
          src: '<%= path.bower %>/bootstrap/dist/css/bootstrap.css',
          dest: 'css/'
        }, { // Bower - Boostrap FONTS
          expand: true,
          flatten: true,
          src: '<%= path.bower %>/bootstrap/dist/fonts/*',
          dest: 'fonts/',
        }]
      },
    },

    /************************************
     * grunt-contrib-jshint
     * Validate files with JSHint
     ************************************/
    jshint: {
      options: {
        jshintrc: '<%= path.tests %>/.jshintrc'
      },
      all: ['Gruntfile.js', 'js/**/*.js']
    },

    /************************************
     * grunt-contrib-csslint
     * Lint CSS files
     ************************************/
    csslint: {
      options: {
        csslintrc: '<%= path.tests %>/.csslintrc'
      },
      strict: {
        src: ['<%= path.src %>/css/**/*.css']
      }
    },

    /************************************
     * grunt-contrib-cssmin
     * Minify CSS files
     ************************************/
    cssmin: {
      target: {
        files: {
          '<%= path.dist %>/theme.min.css': ['<%= path.dist %>/theme.css']
        }
      }
    },

    /************************************
     * grunt-contrib-imagemin
     * Min Image files
     ************************************/
    imagemin: { // Task
      dynamic: { // Another target
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: '<%= path.src %>/assets', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
          dest: '<%= path.dist %>' // Destination path prefix
        }]
      }
    },

    /************************************
     * grunt-contrib-watch
     * Watch Files
     ************************************/
    watch: {
      styles: {
        files: '<%= path.src %>/**/*.scss',
        tasks: ['sass:dev'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: '<%= path.examples %>/**/*.html',
        options: {
          livereload: true,
        },
      },
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

  // Test task
  grunt.registerTask('test', ['jshint', 'csslint']);

  // Server task
  grunt.registerTask('server', ['connect', 'watch']);

  // Default task
  grunt.registerTask('default', ['test', 'server']);

  // Build task
  grunt.registerTask('build', ['test', 'copy', 'cssmin', 'imagemin']);
};
