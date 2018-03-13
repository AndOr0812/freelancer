const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
    gulp.src(['src/*','src/bin/*', 'src/routes/*','src/models/*','src/config/*'],  {base: './src/'})
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
);