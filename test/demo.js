import test from 'ava';
import {pumpFromString} from './helpers/pump';

test('simple variable', t => {
    const input = 'var test = "123";';
    const expected = 'var test="123";';

    const uglify = require('gulp-uglify');
    const tasks = [
        uglify()
    ];

    return pumpFromString(input, 'style.scss', tasks)
        .then(output => {
            const contents = output.contents.toString();
            t.is(contents, expected, 'Sass compiled as expected');
        });
});



import {lazypipeFromString} from './helpers/lazypipe';
import sass from '../pipes/sass';

test('bem element', t => {
    const input = '.test { &__headline { color: #fff; } }';
    const expected = '.test__headline {\n  color: #fff; }\n\n/*# sourceMappingURL=style.css.map */\n';

    return lazypipeFromString(input, 'style.scss', sass)
        .then(output => {
            const contents = output.contents.toString();
            t.is(contents, expected, 'Sass compiled as expected');
        });
});