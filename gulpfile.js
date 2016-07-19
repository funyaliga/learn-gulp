var gulp = require('gulp')
  , os = require('os')
  , fileinclude = require('gulp-file-include') // https://github.com/coderhaoxin/gulp-file-include
  , gulpOpen = require('gulp-open')
  , connect = require('gulp-connect')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , minifycss = require('gulp-minify-css')
  // , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify') // 压缩js
  , rename = require('gulp-rename')
  , concat = require('gulp-concat')
  , notify = require('gulp-notify')
  , tingpng = require('gulp-tinypng')
  , spriter = require('gulp-css-spriter')
  , cache = require('gulp-cache')
  , livereload = require('gulp-livereload')
  , webpack = require('gulp-webpack')
  , webpackConfig = require('./webpack.config.js')
  , named = require('vinyl-named')
  ;

var port = 3000;

var host = {
	path: 'dist/',
	port: port,
	html: 'index.html'
};

var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

var paths = {
	html: {
		src: './src/app/*.html',
		dist: './dist',
	},
	sass: {
		src: './src/css/*.scss',
		dist: './dist/css',
	},
	libjs: {
		src: 'src/js/lib/*.js',
		dist: './dist/js/lib',
	},
	js: {
		src: 'src/js/*.js',
		dist: './dist/js',
	},
	img: {
		src: 'src/img/*.{png,jpg}',
		dist: './dist/img',
	},
};

//用于在html文件中直接include文件
gulp.task('html', function () {
	livereload.listen();
	return gulp.src(paths.html.src)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(paths.html.dist))
		.pipe(livereload({
			port: port
		}))
		// .pipe(connect.reload())
});

gulp.task('sass', function () {
	livereload.listen();
	return gulp.src(paths.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios >= 6', 'android >= 2.3'],
			// last 2 versions: 主流浏览器的最新两个版本
			// > 5%: 全球统计有超过5%的使用率
			cascade: true, //是否美化属性值 默认：true
			remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(paths.sass.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
		.pipe(gulp.dest(paths.sass.dist))
		.pipe(livereload({
			port: port
		}))
});

gulp.task('libjs', function(){
	return gulp.src(paths.libjs.src)
		.pipe(cache(gulp.dest(paths.libjs.dist)))
})

// gulp.task('js', function() {
// 	livereload.listen();
// 	return gulp.src(paths.js.src)
// 		.pipe(concat('site.js')) // 合并成site.js
// 		.pipe(gulp.dest(paths.js.dist)) // 设置生成文件的路径
// 		.pipe(rename({suffix: '.min'})) //重命名min
// 		.pipe(uglify()) //压缩
// 		.pipe(gulp.dest(paths.js.dist)) //压缩文件路径
// 		.pipe(livereload({
// 			port: port
// 		}))
// });

gulp.task('js', function(){
	livereload.listen();
	// webpack(webpackConfig).pipe(gulp.dest(paths.js.dist));
	return gulp.src(paths.js.src)
		.pipe(named())
		// .pipe(webpack(webpackConfig2()))
		.pipe(webpack(Object.create(webpackConfig)))
		.pipe(gulp.dest(paths.js.dist))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify()) //压缩
		.pipe(gulp.dest(paths.js.dist))
		.pipe(livereload({
			port: port
		}))
});

gulp.task('img', function () {
	return gulp.src(paths.img.src)
		.pipe(cache(tingpng('0vyowUjixfLqIyRuC5lCPVuL8M0DUqFj')))
		.pipe(gulp.dest(paths.img.dist))
});

gulp.task('connect', function () {
	console.log('connect------------');
	connect.server({
		root: host.path,
		port: host.port,
		livereload: true
	});
});

gulp.task('open', function () {
	return gulp.src('./gulpfile.js')
		.pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000'
        }))
});

gulp.task('message', function(){
	console.log('It works!!');
});

gulp.task('watch:html', function () {
	gulp.watch(paths.html.src, gulp.series('html'));
});
gulp.task('watch:sass', function () {
	gulp.watch(paths.sass.src, gulp.series('sass'));
});

gulp.task('watch:js', function () {
	gulp.watch([paths.js.src, 'src/js/ui/*.js'], gulp.series('js'));
});
gulp.task('watch:img', function () {
	gulp.watch(paths.img.src, gulp.series('img'));
});

gulp.task('watch', gulp.parallel('watch:html', 'watch:sass', 'watch:js', 'watch:img'));


gulp.task('default', gulp.series('html', 'sass', 'libjs', 'js', 'img'));

gulp.task('dev', gulp.series(
	'html', 'sass', 'libjs', 'js', 'img', 
	gulp.parallel(
		'watch', 'connect', 'open'
	)
));
