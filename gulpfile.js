const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
// const uncss = require('gulp-uncss');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const smartgrid = require('smart-grid');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

function styles(){
   return  gulp.src('./src/css/styles.less')
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(less())
        // .pipe(concat('style.css'))
        // .pipe(uncss({
        //     html: ['./src/index.html']
        // }))
        .pipe(gcmq())
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.1%'],
            cascade: false
        }))
        .pipe(gulpif(isProd, cleanCSS({
            level: 2    
        })))
        .pipe(gulpif(isDev,sourcemaps.write()))
        .pipe(gulp.dest('./build/css'))
        .pipe(gulpif(isSync, browserSync.stream()));
}
function img(){
    return  gulp.src('./src/img/**/*')
         .pipe(gulp.dest('./build/img'))
 }
 function phpScripts(){
     return  gulp.src('./src/api/*')
          .pipe(gulp.dest('./build/api'))
  }
 function scripts(){
     return  gulp.src([
            './src/js/vendors/jquery-3.6.0.min.js',
            './src/js/vendors/*.js',
            './src/js/script.js'
            ])
            .pipe(concat('all.min.js'))
            .pipe(gulp.dest('./build/js'))
  }
 function html(){
    return  gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
 }
function clear(){
    return del('./build/*');
}
 
function watch(){
    if(isSync){
        browserSync.init({
            server: {
                baseDir: "./build/"
            }
        });
    }
    gulp.watch('./src/**/*', gulp.parallel(styles, img, phpScripts, html, scripts));
}

function grid(done){
    let settings = { 
        columns: 24,
        offset: "10px",
        container: {
            maxWidth: "950px",
            fields: "30px"
        },
        breakPoints:{
            md: {
                width: "920px",
                fields: "15px"
            },
            sm: {
                width: "720px"
            },
            xs: {
                width: "576px"
            }
        }
    };

    smartgrid('./src/css', settings);
    done();

}

  let build = gulp.series(clear,
    gulp.parallel(styles, img, phpScripts, html, scripts)
    );

    

gulp.task('watch', gulp.series(build, watch));  
gulp.task('build', build);
gulp.task('grid', grid);
