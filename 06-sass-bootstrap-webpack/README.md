# SASS + Bootstrap on Webpack

This is a simple example of using SASS CSS preprocessor with Bootstrap on Webpack. It was built as a continuation of [this tutorial](https://github.com/bkaminnski/react/tree/master/01-from-0-to-react-in-15-minutes).

## First step: SASS

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

## Second step: Bootstrap (CSS only)

Now, we will add Bootstrap to the project, it will be SASS version of Bootstrap:

- install runtime dependency to Bootstrap (we are using version 3 in this example, at this point of time Bootstrap 4 is still in alpha stage): `npm install bootstrap-sass --save`,
- install compile time dependencies: `npm install url-loader file-loader --save-dev`,
- configure a sequence of loaders for Bootstrap related files in [webpack.config.js](https://github.com/bkaminnski/react/blob/master/06-sass-bootstrap-webpack/webpack.config.js): 
    ```javascript
    (...)
    {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
        test: /\.ttf$/,
        loader: "file-loader"
    },
    {
        test: /\.eot$/,
        loader: "file-loader"
    },
    {
        test: /\.svg$/,
        loader: "file-loader"
    }
    (...)
    ```
- import Bootstrap style sheet in [style.scss](https://github.com/bkaminnski/react/blob/master/06-sass-bootstrap-webpack/style.scss):
    ```css
    $icon-font-path: '~bootstrap-sass/assets/fonts/bootstrap/';
    @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";
    ```
- add Bootstrap components do demonstrate that Bootstrap style sheet was loaded (see [Message.jsx](https://github.com/bkaminnski/react/blob/master/06-sass-bootstrap-webpack/Message.jsx)); note that CSS class has to be specified in `className` attribute in react component (and not `class` attribute as in a regular HTML)
- now, the *Dropdown* is visible, however it's not fully working yet - this is because we need to add Bootstrap javascript to the project

## Third (final) step: Bootstrap with javascript (lame approach)

To fully function, Bootstrap requires its javascript library (which requires jquery). This solution is probably not the most *professional* one, as it skips webpack and npm dependencies. On the positive side however, it worked in my case and it's also simple:

- copy `<this project location>/node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js` (this location became available after running `npm install bootstrap-sass --save`) into `<this project location>/libs/bootstrap.min.js`
- download `jquery.min.js` into `<this project location>/libs/jquery.min.js`
- add these imports to the [index.html](https://github.com/bkaminnski/react/blob/master/06-sass-bootstrap-webpack/index.html) (the order of imports is important):
    ```html
    <script src="libs/jquery.min.js"></script>
    <script src="libs/bootstrap.min.js"></script>
    ```
- click on the *Dropdown* to see, that it is now working

I tried more elaborate solution, with bundling `bootstrap.js` by webpack. This approach failed, because Bootstrap could not get access to jquery. I went astray using [imports-loader](https://www.npmjs.com/package/imports-loader) and budling `bootstrap.js` in different ways - but with no luck. 

**In case you know the right solution, please let me know!** (twitt me at @bkaminnski ([shortcut here](https://twitter.com/intent/tweet?text=@bkaminnski )) or send me an e-mail bartosz.kaminski[at]zoho.com - thank you!)

# Explanations

- [this tutorial](https://scotch.io/tutorials/getting-started-with-sass) gives a nice introduction into the SASS preprocessor
- `node-sass` dependency, quoting after https://www.npmjs.com/package/node-sass:
    > Node-sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass. It allows you to natively compile .scss files to css at incredible speed.
- loaders (`[ 'style-loader', 'css-loader', 'sass-loader' ]`) are executed starting from the last one declared, so that the final loader returns javascript (have a look at [this post](https://medium.com/@ericclemmons/3-ways-to-define-webpack-loaders-f2017c57dd21) for more information)
- more on `sass-loader` can be found in the description in [this github project](https://github.com/webpack-contrib/sass-loader)
- `url-loader`, after [this github project](https://github.com/webpack-contrib/url-loader):
    > The url-loader works like the file-loader, but can return a data URL if the file is smaller than a byte limit.
    > If the file is greater than the limit (in bytes) the file-loader is used.
- `file-loader`, makes required files available in a browser with the name of the file being an MD5 hash of its content
- a `~` character in Bootstrap import `@import "~bootstrap-sass/...` denotes a module (`bootstrap-sass` in this case); provided there was no `~` sign, this would be relative disk location (have a look [here (section *Imports*)](https://github.com/webpack-contrib/sass-loader) for more details)
