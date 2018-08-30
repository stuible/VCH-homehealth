var gulp = require('gulp');
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var child = require('child_process');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var stripDebug = require('gulp-strip-debug');


var cssFiles = '_css/**/*.?(s)css';
var jsFiles = '_js/';
var imageFiles = '_image/**/**/*.*';
var siteRoot = '_site';

var jsSources = [
    jsFiles + 'menu.js',
    jsFiles + 'barba.js',
    jsFiles + 'cookies.js',
    jsFiles + 'modules.js',
    jsFiles + 'module.js',
    jsFiles + 'branching.js',
    jsFiles + 'case-study.js',
    jsFiles + 'more.js',
    jsFiles + 'glossary.js',
    jsFiles + 'resources.js',
    jsFiles + 'background.js'
];

//CSS Concatonation and Minification
gulp.task('css', function() {
    gulp.src(cssFiles)
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
          browsers: ['last 99 versions'],
          cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(rename('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('css'));
  });

//JS Concatonations and Minification
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('homehealth.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('homehealth.min.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('js'));
  });


gulp.task('jekyll', function() {
    var jekyll = child.spawn('jekyll', ['build',
      '--watch',
      '--incremental',
      '--drafts',
      // '--config deploy.config.yml',
    ]);
  
    var jekyllLogger = function(buffer) {
      buffer.toString()
        .split(/\n/)
        .forEach(function(message){ gutil.log('Jekyll: ' + message);});
    };
  
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
  });

  gulp.task('jekyll-full', function() {
    var jekyll = child.spawn('jekyll', ['build',
      '--drafts',
    ]);
  
    var jekyllLogger = function(buffer) {
      buffer.toString()
        .split(/\n/)
        .forEach(function(message){ gutil.log('Jekyll: ' + message);});
    };
  
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
  });

  gulp.task('jekyll-deploy', function() {
    var jekyll = child.spawn('jekyll', ['build',
      // '--watch',
      // '--incremental',
      // '--drafts',
      '--config',
      'deploy.config.yml',
      '--destination',
      '_deploy'
    ]);
  
    var jekyllLogger = function(buffer) {
      buffer.toString()
        .split(/\n/)
        .forEach(function(message){ gutil.log('Jekyll: ' + message);});
    };
  
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
  });

  gulp.task('serve', function() {
    browserSync.init({
      files: [siteRoot + '/**'],
      port: 4000,
      server: {
        baseDir: siteRoot
      }
    });
    gulp.watch(cssFiles, ['css']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(['_plugins/**/*.rb'], ['jekyll-full', 'jekyll']);
    
  });
  

gulp.task('default', ['css', 'js', 'jekyll', 'serve']);
gulp.task('deploy', ['css', 'js', 'jekyll-deploy']);