const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    styles: {
        source: 'scss/**/*.scss',
        destination: 'css'
    }
};

// -- Build
gulp.task('build', () =>
    gulp.src(paths.styles.source)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.destination))
);

// -- Watch
gulp.task('watch',  () =>
    gulp.watch(paths.styles.source, ['build'])
);

// -- Serve
gulp.task('serve', ['build'], () => {
    browserSync.init({
        server: { baseDir: '.' }
    });

    gulp.watch(`${paths.styles.destination}/*.css`, browserSync.reload());
});

gulp.task('default', ['serve', 'watch'])
