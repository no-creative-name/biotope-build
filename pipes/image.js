const gulp = require('gulp');

module.exports = {
	minifyAll: (source, target, config, cb) => {
		const pump = require('pump');
		const image = require('gulp-imagemin');

		pump([
			gulp.src(source),
			image([
				image.gifsicle(),
				image.jpegtran(),
				image.optipng(),
				image.svgo()
			], config.image),
			gulp.dest(target)
		], cb);
	}
};
