const path = require('path');
const config = require('./../config');

module.exports = {
	join: (...args) => {
		return path.join(config.path.useCwdInPathJoin ? config.global.cwd : '', ...args);
	}
};
