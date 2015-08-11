// Gruntfile.js
//
//

module.exports = function (grunt) {
  'use strict';

  var appConfig = {

    // Default Paths
    path: {
      src: 'src',
      dist: 'dist',
      tests: 'tests',
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
     * grunt-sass
     * Compile SCSS to CSS using node-sass
     ************************************/
    sass: {
      dev: {
        files: {
          '<%= path.src %>/css/build.css': '<%= path.src %>/scss/build.scss'
        }
      },
      build: {
        files: {
          '<%= path.dist %>/theme.css': '<%= path.src %>/scss/build.scss'
        }
      }
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
        files: 'examples/**/*.html',
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

    /************************************
     * grunt-bump
     * Bump package version, create tag, commit, push...
     ************************************/
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'], // for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }

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
  grunt.registerTask('build', ['clean', 'test', 'sass', 'cssmin', 'imagemin']);

  // Publish task
  grunt.registerTask('publish', ['build', 'bump']);
};
