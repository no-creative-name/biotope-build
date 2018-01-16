const gulp = require('gulp');
const config = require('./../config');

gulp.task('image:resources:dist', function (cb) {

	if (config.global.tasks.image) {

		const path = require('path');
		const imagePipe = require('./../pipes/image');

		imagePipe.minifyAll(
			[
				path.join(config.global.cwd, config.global.dist, 'resources', 'img', '**', '*.*'),
				'!' + path.join('**', 'README.md')
			],
			path.join(config.global.cwd, config.global.dist, 'resources', 'img'),
			config,
			cb
		);

	} else {
		// Show disabled message only once here (not again in component task)
		const colors = require('colors/safe');
		console.log(colors.yellow('image compressor disabled'));
	}
});

gulp.task('image:component:dist', function (cb) {

	if (config.global.tasks.image) {

		const path = require('path');
		const imagePipe = require('./../pipes/image');

		imagePipe.minifyAll(
			[
				path.join(config.global.cwd, config.global.src, 'components', '*', 'img', '**', '*.*'),
				'!' + path.join('**', 'README.md')
			],
			path.join(config.global.cwd, config.global.dist, 'resources'),
			config,
			cb
		);

	}
});
