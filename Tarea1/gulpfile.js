const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const copy = require('gulp-copy');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('styles', () => {
    return gulp.src('src/assets/styles/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(replace('styles/style.css', 'assets/styles/styles.min.css'))
        .pipe(replace('scripts/main.js', 'assets/scripts/main.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    return gulp.src('src/**/*.js')
    .pipe(replace('data/data.json', 'assets/data/data.json'))
    .pipe(gulp.dest('dist/assets'));
})

gulp.task('copy-images', () => {
    return gulp.src('src/assets/images/**/*')
        .pipe(copy('dist/assets', { prefix: 2 }));
});

gulp.task('scripts', () => {
    return gulp.src('src/scripts/**/*.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy-data', () => {
    return gulp.src('src/data/**/*.json')
        .pipe(copy('dist/assets', { prefix: 1 }));
});

gulp.task('build', gulp.series('styles', 'html', 'copy-images', 'scripts', 'copy-data', 'js'));

gulp.task('default', gulp.series('build'));
