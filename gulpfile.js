const gulp = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const webserver = require('gulp-webserver');
const stylus = require('gulp-stylus');
const ghPages = require('gulp-gh-pages');

const paths = {
  dist: 'dist',
  images: 'assets/images',
  stylesheets: ['assets/stylesheets', 'assets/stylesheets/vendor'],
  javascripts: ['assets/javascripts', 'assets/javascripts/vendor'],
  templates: {
    includes: '_includes/**',
    layouts: '_layouts/**',
    mixins: '_mixins/**',
    site: '_site/**',
  },
};

gulp.task('clean:images', () => {
  return del(`${paths.dist}/${paths.images}`);
});

gulp.task('clean:stylesheets', () => {
  return del(`${paths.dist}/${paths.stylesheets[0]}`);
});

gulp.task('clean:javascripts', () => {
  return del(`${paths.dist}/${paths.javascripts[0]}`);
});

gulp.task('clean:templates', () => {
  return del(`${paths.dist}/**.html`);
});

gulp.task('images', ['clean:images'], () => {
  return gulp.src(`${paths.images}/**`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${paths.dist}/${paths.images}`));
});

gulp.task('minify', ['clean:stylesheets'], () => {
  paths.stylesheets.forEach(path => {
    gulp.src(`${path}/**.styl`)
      .pipe(stylus({
        'include css': true,
        compress: true,
      }))
      .pipe(gulp.dest(`${paths.dist}/${path}`));
  });
});

gulp.task('templates', ['clean:templates'], () => {
  return gulp.src([`${paths.templates.site}.pug`, `${paths.templates.site}/*.pug`])
    .pipe(pug())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('uglify', ['clean:javascripts'], () => {
  paths.javascripts.forEach(path => {
    gulp.src(`${path}/**.js`)
      .pipe(uglify())
      .pipe(gulp.dest(`${paths.dist}/${path}`));
  });
});

gulp.task('watch:images', () => {
  return gulp.watch(`${paths.images}/**`, ['images']);
});

gulp.task('watch:minify', () => {
  return gulp.watch(paths.stylesheets.map(path => `${path}/**`), ['minify']);
});

gulp.task('watch:templates', () => {
  return gulp.watch(Object.values(paths.templates), ['templates']);
});

gulp.task('watch:uglify', () => {
  return gulp.watch(paths.javascripts.map(path => `${path}/**.js`), ['uglify']);
});

gulp.task('watch', ['watch:images', 'watch:minify', 'watch:templates', 'watch:uglify']);

gulp.task('serve', ['watch', 'dist'], () => {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      port: process.env.PORT || '8080',
      host: process.env.IP || 'localhost',
    }));
});

gulp.task('dist', ['images', 'minify', 'templates', 'uglify']);

gulp.task('deploy', ['dist'], () => {
  return gulp.src(`${paths.dist}/**`)
    .pipe(ghPages({
      branch: 'master',
    }));
});
