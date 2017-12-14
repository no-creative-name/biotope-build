const gulp = require('gulp');
const change = require('gulp-change');
const rename = require('gulp-rename');
const colors = require('colors/safe');

const config = require('./../config');

gulp.task('migrate', function () {
	return gulp
		.src(config.global.src + '/**/*.html')
		.pipe(change(migrateHbs))
		// .pipe(rename({extname: ".hbs"}))
		.pipe(gulp.dest(config.global.src));
});

const migrateHbs = function (content) {
	let newContent = content;

	newContent = _migrateSimpleIncludes(newContent);
	newContent = _migrateComplexIncludes(newContent);

	if(content !== newContent) {
		console.log(colors.yellow(`migrateHbs: Changed content in ${this.fname}`));

		if(config.global.debug) {
			console.log(newContent);
		}
	}

	return config.migrate.dry ? content : newContent;
};


const _migrateSimpleIncludes = function (content) {
	const simpleIncludesWithoutVariables = {
		regex: /\{\{= *ftf\.include\( *"(\.\/)?(.*)\.html" *\) *\}\}/g,
		substitute: `{{include '$2'}}`
	};

	return content.replace(simpleIncludesWithoutVariables.regex, simpleIncludesWithoutVariables.substitute);
};

const _migrateComplexIncludes = function (content) {
	const complexIncludesWithVariables = {
		regex: /\{\{= *ftf\.include\( *"(\.\/)?(.*)\.html"([ ,]*(\{.*\}))? *\) *\}\}/g,
		substitute: `{{include '$2' frontendFrameworkMigration='$4'}}`
	};

	return content;
};
