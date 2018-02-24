const gulp = require('gulp');
const config = require('./../config');

gulp.task('nsp', function (cb) {

	if (config.global.tasks.nsp || true) {
		const nsp = require('gulp-nsp');
		const path = require('path');

		console.log('Check nsp = ' + path.join(__dirname, 'package.json'));

		nsp({
			package: path.join(__dirname, 'package.json')
		}, cb);
	} else {
		const colors = require('colors/safe');
		console.log(colors.yellow('nsp disabled'));
		cb();
	}

});
