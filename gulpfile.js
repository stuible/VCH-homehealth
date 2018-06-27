var gulp = require('gulp');
var shell = require('gulp-shell');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const child = require('child_process');
const gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


const cssFiles = '_css/**/*.?(s)css';
const jsFiles = '_js/';
const siteRoot = '_site';

var jsSources = [
    jsFiles + 'barba.js',
    jsFiles + 'modules.js',
    jsFiles + 'module.js',
    jsFiles + 'branching.js',
    jsFiles + 'case-study.js',
    jsFiles + 'more.js',
    jsFiles + 'background.js'
];

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll serve']));
// If you don't use bundle:
// gulp.task('build', shell.task(['jekyll serve']));
// If you use  Windows Subsystem for Linux (thanks @SamuliAlajarvela):
// gulp.task('build', shell.task(['bundle exec jekyll serve --force_polling']));

//CSS Concatonation
gulp.task('css', () => {
    gulp.src(cssFiles)
        .pipe(sass({utputStyle: 'nested'}))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
          browsers: ['last 99 versions'],
          cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(rename('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('css'))
  });

gulp.task('js', () => {
    gulp.src(jsSources)
        .pipe(concat('homehealth.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('homehealth.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
  });


gulp.task('jekyll', () => {
    const jekyll = child.spawn('jekyll', ['build',
      '--watch',
      '--incremental',
      '--drafts'
    ]);
  
    const jekyllLogger = (buffer) => {
      buffer.toString()
        .split(/\n/)
        .forEach((message) => gutil.log('Jekyll: ' + message));
    };
  
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
  });

  gulp.task('serve', () => {
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