var path        = require('path');
var del         = require('del');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babelify    = require('babelify');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var less        = require('gulp-less');
var minifycss   = require('gulp-minify-css');
var concat      = require('gulp-concat');
var eslint      = require('gulp-eslint');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var livereload  = require('gulp-livereload');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var sh          = require('shelljs');

var debug = false;

// compile less
gulp.task('less', function() {
  return gulp.src('src/less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'src/less') ]
    }))
    .pipe(minifycss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('www'));
});

// clean www folder
gulp.task('clean', function() { return del(['www']); });

gulp.task('copy-index', function() {
  return gulp.src('src/index.html')
      .pipe(gulp.dest('www'));
});

gulp.task('copy-fonts', function() {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('www/fonts'));
});

gulp.task('copy-lib', function() {
  return gulp.src('src/lib/**/*').pipe(gulp.dest('www/lib'));
});

// lint javascript
gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .on('error', gutil.log);
});

var b = browserify({
  entries: 'src/app.js',
  transform: [babelify],
  debug: debug
});

// bundle javascript
function bundle() {
  if (debug) {

    return b.bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./www'));
  } else {
    return b.bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./www'));
  }
}

gulp.task('bundle', bundle);

// main build task
gulp.task('build', gulp.series(
  'lint',
  'clean',
  gulp.parallel(bundle, 'less', 'copy-index', 'copy-fonts', 'copy-lib')
));

// development task
gulp.task('watch', function() {
  gutil.log(gutil.colors.blue('Please wait for first bundle to complete'));
  debug = true;
  b.on('update', bundle);
  b.on('log', gutil.log);
  b = watchify(b);
  bundle();

  livereload.listen();

  gulp.watch('www/**/*', {}).on('change', livereload.changed);

  gulp.watch('src/index.html', gulp.parallel('copy-index'));
  gulp.watch('src/fonts/**/*', gulp.parallel('copy-fonts'));
  gulp.watch('src/lib/**/*', gulp.parallel('copy-lib'));

  gulp.watch('src/**/*.less', gulp.parallel('less'));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    throw new Error('git is not installed');
  }
  done();
});
