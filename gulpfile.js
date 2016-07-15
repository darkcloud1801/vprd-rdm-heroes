/**
 * Created by rdm0509 on 7/14/16.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var stream = require('webpack-stream');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

var path = {
    HTML: 'src/index.html',
    ALL: ['src/**/*.ts', 'src/**/*.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/build',
    DEST: 'dist'
};

gulp.task('clean', function(cb){
    return del(['dist/**/*']);
    cb();
});

gulp.task('build', ['clean'], function(callback) {
    //modify webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[build]", stats.toString({
            colors: true
        }));
        callback();
    });
});


gulp.task('webpack', [], function() {
    return gulp.src(path.ALL)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('watch', function() {
    gulp.watch(path.ALL, ['webpack']);
});

gulp.task('default', ['webpack-dev-server', 'watch']);


// //copy html and css files
// gulp.task('copy', ['clean'], function() {
//     return gulp.src([
//         'src/index.html',
//         'src/**/*.html',
//         'src/**/*.css'
//     ])
//         .pipe(gulp.dest('dist'));
// });
//
// //clean the dist folder
// gulp.task('clean', function(cb){
//     return del(['dist/**/*']);
//     cb();
// });
//
// // build javascript for deployment using webpack
// gulp.task('build', ['clean'], function(callback) {
//     //modify webpack config options
//     var myConfig = Object.create(webpackConfig);
//     myConfig.plugins = myConfig.plugins.concat(
//         new webpack.DefinePlugin({
//             "process.env": {
//                 // This has effect on the react lib size
//                 "NODE_ENV": JSON.stringify("production")
//             }
//         }),
//         new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.UglifyJsPlugin()
//     );
//     // run webpack
//     webpack(myConfig, function(err, stats) {
//         if(err) throw new gutil.PluginError("webpack:build", err);
//         gutil.log("[build]", stats.toString({
//             colors: true
//         }));
//         callback();
//     });
// });
//
// gulp.task('deploy',['clean', 'copy','build']);
//
// // modify some webpack config options
// var myDevConfig = Object.create(webpackConfig);
// myDevConfig.devtool = "sourcemap";
// myDevConfig.debug = true;
//
// // create a single instance of the compiler to allow caching
// var devCompiler = webpack(myDevConfig);
//
// gulp.task("build-dev", ['clean'], function(callback) {
//     // run webpack
//     devCompiler.run(function(err, stats) {
//         if(err) throw new gutil.PluginError("build-dev", err);
//         gutil.log("[build-dev]", stats.toString({
//             colors: true
//         }));
//         callback();
//     });
// });
//
// gulp.task("dev", ["copy","build-dev"])
//
// //run webpack dev server
// gulp.task("dev-server", function(callback) {
//     // modify some webpack config options
//     var myConfig = Object.create(webpackConfig);
//     myConfig.devtool = "source-map";
//     myConfig.debug = true;
//
//     // Start a webpack-dev-server
//     new WebpackDevServer(webpack(myConfig), {
//         contentBase: 'src',
//         //publicPath: "/" + myConfig.output.publicPath,
//         stats: {
//             colors: true
//         }
//     }).listen(8080, "localhost", function(err) {
//         if(err) throw new gutil.PluginError("webpack-dev-server", err);
//         gutil.log("[dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
//     });
// });
//
// gulp.task('default', ['dev-server']);