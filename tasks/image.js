const gulp = require('gulp');

gulp.task('image:resources:dist', function () {

	if (config.global.tasks.image) {

		const mergeStream = require('merge-stream');
		const config = require('./../config');
		const imagePipe = require('./../pipes/image');

		return mergeStream(config.global.resources.map( function(currentResource) {
			return imagePipe.default(
				config.global.dist + currentResource + '/img/**/*.*',
				gulp.dest(config.global.dist + currentResource + '/img/'),
				config
			);
		}));

	} else {
		const colors = require('colors/safe');
		console.log(colors.yellow('image compressor disabled'));
	}
});

gulp.task('image:component:dist', function () {

	if (config.global.tasks.image) {

		const mergeStream = require('merge-stream');
		const config = require('./../config');
		const imagePipe = require('./../pipes/image');

		return mergeStream(config.global.resources.map(function (currentResource) {
			return mergeStream(config.global.components.map(function (currentComponent) {
				return imagePipe.default(
					config.global.src + currentComponent + '/*/img/**/*.*',
					config.global.dist + currentResource + currentComponent,
					config
				);
			}));
		}));
	}
});
