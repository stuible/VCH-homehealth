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
// const imagemin = require('gulp-imagemin');
// var gm = require('gulp-gm');
// var newer = require('gulp-newer');


var cssFiles = '_css/**/*.?(s)css';
var jsFiles = '_js/';
var imageFiles = '_image/**/**/*.*';
var siteRoot = '_site';

var jsSources = [
    jsFiles + 'barba.js',
    jsFiles + 'cookies.js',
    jsFiles + 'modules.js',
    jsFiles + 'module.js',
    jsFiles + 'branching.js',
    jsFiles + 'case-study.js',
    jsFiles + 'more.js',
    jsFiles + 'background.js'
];

// Task for building blog when something changed:
//gulp.task('build', shell.task(['bundle exec jekyll serve --config _config.yml,dev.config.yml']));
// If you don't use bundle:
// gulp.task('build', shell.task(['jekyll serve']));
// If you use  Windows Subsystem for Linux (thanks @SamuliAlajarvela):
// gulp.task('build', shell.task(['bundle exec jekyll serve --force_polling']));

//CSS Concatonation
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

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('homehealth.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('homehealth.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
  });

// gulp.task('images', () =>
//   gulp.src(imageFiles)
//   .pipe(newer('image'))
//   .pipe(gm(function(gmfile) {
//     gmfile.setFormat('jpg').quality(90);
//     return gmfile.resize(2000, 2000);
//   }))
//   .pipe(imagemin())
// 		.pipe(gulp.dest('image'))
// );


gulp.task('jekyll', function() {
    var jekyll = child.spawn('jekyll', ['build',
      '--watch',
      '--incremental',
      '--drafts',
      // '--config _config.yml,dev.config.yml'
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
  });
  

gulp.task('default', ['css', 'js', 'jekyll', 'serve']);