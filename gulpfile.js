'use  strict'


/**
gulp的作用
1、less编译、压缩、合并
2、js合并 压缩 混淆
3、图片复制
4、html压缩

**/

//在gulpfile中先载入gulp
var  gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
//1、less编译、压缩、合并
gulp.task('style',function(){
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({stream:true}));
});
//2、js合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/script'))
	.pipe(browserSync.reload({stream:true}));
});
//3、图片复制
gulp.task('image',function () {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));
	// body...
});
//4、html压缩
gulp.task('html',function () {
	// body...
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});

var browserSync=require('browser-sync');

gulp.task('server',function () {
	browserSync({
		server: {
		baseDir:['dist']
	},
}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});



