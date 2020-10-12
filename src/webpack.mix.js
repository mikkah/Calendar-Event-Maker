const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.options({
    hmrOptions: {
        host: 'localhost', // Docker binds to 0.0.0.0
        port: 8088,
    },
});

mix.webpackConfig({
    output: {
        publicPath: "http://localhost:8088/"
    }
})

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ])
      