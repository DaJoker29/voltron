module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
      },
      dev: {
        options: {
          outputStyle: 'expanded',
        },
        files: {
          'assets/style.css': ['lib/styles/style.scss'],
        },
      },
      prod: {
        options: {
          outputStyle: 'compressed',
        },
        files: {
          'assets/style.css': ['lib/styles/style.scss'],
        },
      },
    },
    postcss: {
      options: {
        map: true,
      },
      dev: {
        options: {
          processors: [
            require('postcss-normalize')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
          ],
        },
        src: 'assets/style.css',
      },
      prod: {
        options: {
          processors: [
            require('postcss-normalize')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')(),
          ],
        },
        src: 'assets/style.css',
      },
    },
    eslint: {
      target: ['lib/scripts/**/*.js'],
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: 'assets/scripts.js.map',
      },
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
        },
        files: {
          'assets/scripts.js': ['lib/scripts/**/*.js'],
        },
      },
      prod: {
        options: {
          compress: true,
          mangle: true,
        },
        files: {
          'assets/scripts.js': ['lib/scripts/**/*.js'],
        },
      },
    },
    copy: {
      img: {
        files: [
          {
            expand: true,
            cwd: 'lib/images/',
            src: '**',
            dest: 'assets/images/',
            flatten: true,
          },
        ],
      },
    },
    clean: ['assets'],
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'lib/styles/**/*.scss',
        tasks: ['sass:dev', 'postcss'],
      },
      js: {
        files: 'lib/scripts/*.js',
        tasks: ['eslint', 'uglify:dev'],
      },
    },
  });

  grunt.registerTask('dev', [
    'clean',
    'copy',
    'sass:dev',
    'postcss:dev',
    'eslint',
    'uglify:dev',
  ]);
  grunt.registerTask('prod', [
    'clean',
    'copy',
    'sass:prod',
    'postcss:prod',
    'eslint',
    'uglify:prod',
  ]);
  grunt.registerTask('default', ['dev', 'watch']);
};
