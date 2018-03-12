const createHbsGulpStream = (partials, dataObject, dataGlob, debug=false) => {
    console.time('hbs-parser-stream-total');

	console.time('hbs-parser-stream-require');
	const hb = require('gulp-hb');
	const hbsHelpers = require('./hbs-helpers');
	const cwd = process.cwd();
	const config = require('./../config');
	const path = require('path');
	const projectHbsHelpersPath = path.join(cwd, '/', config.global.src, config.global.resources, config.global.handlebarsHelper);
	const projectHbsHelpers = require(projectHbsHelpersPath);
    console.timeEnd('hbs-parser-stream-require');

    console.time('hbs-parser-stream-init');
	let hbStream = hb({ debug: debug })
		.helpers(hbsHelpers);
    console.timeEnd('hbs-parser-stream-init');

    console.time('hbs-parser-stream-helpers');
	if (projectHbsHelpers) {
		hbStream.helpers(projectHbsHelpers);
	}
    console.timeEnd('hbs-parser-stream-helpers');

    console.time('hbs-parser-stream-partials');
	if(partials) {
		hbStream.partials(partials);
	}
    console.timeEnd('hbs-parser-stream-partials');

    console.time('hbs-parser-stream-data-object');
	if(dataObject) {
		hbStream.data(dataObject);
	}
    console.timeEnd('hbs-parser-stream-data-object');

    console.time('hbs-parser-stream-data-glob');
	if(dataGlob) {
		hbStream.data(dataGlob);
	}
    console.timeEnd('hbs-parser-stream-data-glob');

    console.timeEnd('hbs-parser-stream-total');
	return hbStream;
};

const parsePartialData = (content, data={}, debug=false) => {
	const fm = require('front-matter');
	const frontMatterContent = fm(content);

	if (debug) {
		const colors = require('colors/safe');
		console.log(colors.green(`frontMatter: ${JSON.stringify(frontMatterContent)}`));
	}

	Object.assign(data, frontMatterContent.attributes);

	return data;
};

module.exports = {
	createHbsGulpStream: createHbsGulpStream,
	parsePartialData: parsePartialData
};
