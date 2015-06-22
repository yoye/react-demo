var gulp = require('gulp');
var browserify = require('browserify');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rebaseUrls = require('gulp-css-rebase-urls');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

function scripts(watch) {
	var bundler, rebundle;
	bundler = browserify({
		entries: ['./src/js/main.js'],
		basedir: __dirname,
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: watch
	});

	if (watch) {
		bundler = watchify(bundler);
	}

	bundler.transform(reactify);

	rebundle = function() {
		var stream = bundler.bundle();
		stream = stream.pipe(source('bundle.js'));
		return stream.pipe(gulp.dest('./build/script'));
	};

	bundler.on('update', rebundle);
	return rebundle();
}

gulp.task('scripts', function() {
	scripts(true);
});

gulp.task('styles', function() {
	return gulp.src([
		'bower_components/bootstrap/less/bootstrap.less',
		'src/css/main.css'
		])
	.pipe(less())
	.pipe(rebaseUrls())
	.pipe(minifyCss())
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./build/css'));
});

gulp.task('default', ['styles', 'scripts']);