var path = require('path'),
	gulp = require("gulp"),
	sass = require("gulp-sass"),
	ts = require("gulp-typescript"),
	plumber = require("gulp-plumber"),
	livereload = require("gulp-livereload"),
	autoprefixer = require("gulp-autoprefixer"),
	webpack = require('gulp-webpack'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	gulpUtil = require('gulp-util');

// file that changed
var changedFile = null;

var bSingleMode = false;

function plumber_config(done) {
  return {
    errorHandler: function (err) {
      done(err);
    }
  }
}
/*gulp.task("livereload", function(cb){
	return gulp.src(changedFile)
			.pipe(plumber())
			.pipe(livereload());
});*/

gulp.task('jsmin', function() {
	return gulp.src('*.bundle.js')
			.pipe(uglify().on('error', gulpUtil.log))
			.pipe(gulp.dest('./'));
});

gulp.task("livereload", function(cb){
	return gulp.src(changedFile)
			.pipe(plumber())
			.pipe(connect.reload());
});
gulp.task("sass", function(done) {
	return gulp.src(bSingleMode ? changedFile : '*.scss')
			.pipe(plumber(plumber_config(done)))
			.pipe(sass())
			.pipe(autoprefixer())
			.pipe(gulp.dest("./"));
});
/*gulp.task('ts', function(done) {
	return gulp.src(bSingleMode ? changedFile : '*.ts')
			// .pipe(plumber(plumber_config(done)))
			// .pipe(webpack())
			.pipe(ts({
				target: 'ES5',
				module: 'commonjs',
				noImplicitAny: true
			}))
			.pipe(gulp.dest("./"));
});*/
gulp.task('connect', function() {
	connect.server({
		port: 8090,
		livereload: true
	});
});
gulp.task('watch', ['sass', 'connect'], function() {
	// livereload.listen();
	var reloadWatcher = gulp.watch(['*.css', '*.js', '*.scss', '*.html']);
	reloadWatcher.on('change', function(file) {
		var tasks = ['livereload'],
			ext = path.extname(file.path);
		changedFile = file.path;
		switch(ext) {
			case '.scss':
				bSingleMode = true;
				tasks = ['sass'];
				break;
			default:
				bSingleMode = false;
		}
		gulp.start(tasks);
	});
});