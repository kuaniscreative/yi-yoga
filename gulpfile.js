const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("gulp-cssnano");
const sourcemaps = require("gulp-sourcemaps");
const changed = require("gulp-changed");
const plumber = require("gulp-plumber");

const src = {
    css: "./src/style/"
};

const dest = {
    css: "./src"
};

gulp.task("make:css", () => {
    let plugins = [
        autoprefixer({
            cascade: false
        })
    ];
    return gulp
        .src(`${src.css}**/*.scss`)
        .pipe(plumber())
        .pipe(changed(`${src.css}**/*.scss`))
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(plugins))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.css));
});

gulp.task("watch", () => {
    gulp.watch(`${src.css}**/*.scss`, gulp.series("make:css"));
});

gulp.task("default", gulp.series("make:css", "watch"));
