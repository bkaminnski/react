# SASS + Bootstrap on Webpack

This is a simple example of using SAAS CSS preprocessor with Bootstrap on Webpack.

## First: SASS

What we need in addition to the setup presented in [this tutorial](https://github.com/bkaminnski/react/tree/master/01-from-0-to-react-in-15-minutes), is to:

- install compile time dependencies: `npm install style-loader css-loader sass-loader node-sass --save-dev`,
- configure a sequence of loaders for `.scss` files in [webpack.config.js](https://github.com/bkaminnski/react/blob/master/06-sass-bootstrap-webpack/webpack.config.js): 
    ```javascript
    (...)
    {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }
    (...)
    ```
- add [style.scss](https://github.com/bkaminnski/react/blob/master/06-sass-bootstrap-webpack/style.scss) to the project:
    ```css
    $background_color: #bbbbbb;

    body {
        background-color: $background_color;
    }
    ```
- attach style sheet to the main entry point of the application, [app.js](https://github.com/bkaminnski/react/blob/master/06-sass-bootstrap-webpack/app.js):
    ```javascript
    require('./style.scss');
    ```

# Explanations

- [this tutorial](https://scotch.io/tutorials/getting-started-with-sass) gives a nice introduction into the SASS preprocessor
- `node-sass` dependency, quoting after https://www.npmjs.com/package/node-sass:
    > Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass. It allows you to natively compile .scss files to css at incredible speed.
- loaders (`[ 'style-loader', 'css-loader', 'sass-loader' ]`) are executed starting from the last one declared, so that the final loader returns javascript (have a look at [this post](https://medium.com/@ericclemmons/3-ways-to-define-webpack-loaders-f2017c57dd21) for more information)
- more on `sass-loader` can be found in the description in [this github project](https://github.com/webpack-contrib/sass-loader)
