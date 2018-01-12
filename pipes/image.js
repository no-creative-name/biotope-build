module.exports = {
	default: (source, target, config) => {
		return () => {
			const gulp = require('gulp');
			const image = require('gulp-imagemin');
			const imageOptimizers = [
				image.gifsicle(),
				image.jpegtran(),
				image.optipng(),
				image.svgo()
			];

			return gulp.src(source)
				.pipe(image(
					imageOptimizers,
					config.image
				))
				.pipe(gulp.dest(target));

		};
	}
};
