const gulp = require('gulp');
const config = require('./../config');

gulp.task('image:resources:dist', function (cb) {

	if (config.global.tasks.image) {

		const pathHelper = require('./../lib/path-helpers');
		const imagePipe = require('./../pipes/image');

		imagePipe.minifyAll(
			pathHelper.join(config.global.dist, 'resources', 'img', '**', '*.*'),
			pathHelper.join(config.global.dist, 'resources', 'img'),
			config,
			cb
		);

	} else {
		// Show disabled message only once here (not again in component task)
		const colors = require('colors/safe');
		console.log(colors.yellow('image compressor disabled'));
	}
});

gulp.task('image:component:dist', function () {

	if (config.global.tasks.image) {

		const pathHelper = require('./../lib/path-helpers');
		const imagePipe = require('./../pipes/image');

		imagePipe.minifyAll(
			pathHelper.join(config.global.src, 'components', '*', 'img', '**', '*.*'),
			pathHelper.join(config.global.dist, 'resources'),
			config,
			cb
		);

	}
});
