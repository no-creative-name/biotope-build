const gulp = require('gulp');
const config = require('./../config');
const path = require('path');
const browserifySourcePatterns = [
    path.join(config.global.cwd, config.global.src, config.global.resources, '**', '*.ts'),
    path.join(config.global.cwd, config.global.src, config.global.components, '**', 'index.ts')
];

gulp.task('browserify', function (cb) {

    if (config.global.tasks.browserify) {
        const tap = require('gulp-tap');
        const browserify = require('browserify');
        const tsify = require('tsify');
        const babelify = require('babelify');
        // const buffer = require('gulp-buffer');

        return gulp.src(browserifySourcePatterns, {read: false}) // no need of reading file because browserify does.
            .pipe(tap(function (file) {
                // transform file objects using gulp-tap plugin
                console.log('bundling ' + file.path);

                // replace file contents with browserify's bundle stream
                file.contents = browserify(file.path, {debug: true})
                    .plugin(tsify, { target: 'es6' })
                    .transform(babelify, {
                        extensions: [ '.tsx', '.ts' ]
                    })
                    .bundle();
            }))
            // .pipe(buffer()) // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
            .pipe(gulp.dest('dest'));



        // const path = require('path');
        // const pump = require('pump');
        // const uglifyConfig = require('./../pumps/uglify');
        // const promises = [];
        //
        // config.uglify.folders.forEach((folder) => {
        //     const srcArray = [
        //         path.join(config.global.dev, config.global.resources, folder, '/**/*.js')
        //     ];
        //
        //     config.uglify.ignoreList.forEach((ignorePath) => {
        //         srcArray.push('!' + path.join(config.global.dev, ignorePath));
        //     });
        //
        //     const targetPath = path.join(config.global.dist, config.global.resources, folder);
        //     const uglifyPump = uglifyConfig.defaultPump(config);
        //     uglifyPump.unshift(gulp.src(srcArray));
        //     uglifyPump.push(gulp.dest(targetPath));
        //
        //     promises.push(new Promise((resolve, reject) => {
        //         pump(uglifyPump, function(err) {
        //             if(!err){
        //                 resolve();
        //             }else{
        //                 reject(err);
        //             }
        //         });
        //     }));
        // });
        //
        // Promise.all(promises).then(() => {
        //     cb();
        // });

        // const browserify = require('browserify')
        // const scssify = require('scssify')
        // browserify('entry.js')
        //     .transform(scssify, {
        //         // Disable/enable <style> injection; true by default
        //         autoInject: true,
        //
        //         // Useful for debugging; adds data-href="src/foo.scss" to <style> tags
        //         autoInject: 'verbose',
        //
        //         // This can be an object too
        //         autoInject: {
        //             verbose: false,
        //
        //             // If true the <style> tag will be prepended to the <head>
        //             prepend: false
        //         },
        //
        //         // require('./MyComponent.scss') === '.MyComponent{color:red;background:blue}'
        //         // autoInject: false, will also enable this
        //         // pre 1.x.x, this is enabled by default
        //         export: false,
        //
        //         // Pass options to the compiler, check the node-sass project for more details
        //         sass: {
        //             // See the relevant node-sass documentation
        //             importer: 'custom-importers.js',
        //
        //             // This will let the importer state be reset if scssify
        //             // is called several times within the same process, e.g. by factor-bundle
        //             // should export a factory function (which returns an importer function)
        //             // overrides opt.sass.importer
        //             importerFactory: 'custom-importer-factory.js',
        //
        //             // Enable both of these to get source maps working
        //             // "browserify --debug" will also enable css sourcemaps
        //             sourceMapEmbed: true,
        //             sourceMapContents: true,
        //
        //             // This is the default only when opt.sass is undefined
        //             outputStyle: 'compressed'
        //         },
        //
        //         // Configure postcss plugins too!
        //         // postcss is a "soft" dependency so you may need to install it yourself
        //         postcss: {
        //             autoprefixer: {
        //                 browsers: ['last 2 versions']
        //             }
        //         }
        //     })
        //     .bundle()

    } else {
        const colors = require('colors/safe');
        console.log(colors.yellow('browserify disabled'));
        cb();
    }
});