# How to avoid multiple copies of React. Part 2 of 2: Solution

This is the second part of two parts tutorial showing why and how to avoid multiple copies of React library in the project set up with webpack and npm dependencies.

Warning! The way `ref` attribute is used in this example is not advisable. It is used in this way only to showcase a problem of multiple copies of React. Read more in the [Explanations](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/#explanations) section in the first part of this tutorial.

## Solution

Taking the project from the [first part](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2) of the tutorial as a starting point, these are the steps to set up a single source of React library.

### FormComponent project

- Declare React and ReactDOM dependencies as external ones in [webpack.config.js](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part2of2/FormComponent/webpack.config.js) (this will remove them from the compiled bundle):
    ```javascript
    (...)
    externals: {
        "react": "React",
        "react-dom": 'ReactDOM'
    },
    (...)
    ```
- We do not need `ReactDOM` dependency in this project - this was added for sake of clarity about exact names (in case you need it it in your project)
- Put React and ReactDOM in `devDependencies` (see [package.json](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part2of2/FormComponent/package.json))

### MainApplication project
- Add `react` and `react-dom` dependencies to `vendor` attribute in [webpack.config.js](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part2of2/MainApplication/webpack.config.js) - this will make them available in the `vendor.bundle.js`:
    ```javascript
    (...)
    vendor: ["react", "react-dom", "PubSub-js"]
    (...)
    ```
- At this point of time, even thought they will be bundled in the `vendor.bundle.js`, they are not available outside of the [main application](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part2of2/MainApplication). To make this work, we have to configure [expose-loader plugin](https://www.npmjs.com/package/expose-loader).
- Open console in `<this project>/MainApplication` and run:
    - `npm install expose-loader --save-dev` to add a new dependency to this plugin
- Add `expose-loader` configuration in [webpack.config.js](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part2of2/MainApplication/webpack.config.js):
    ```javascript
    (...)
    {
        test: require.resolve("react"),
        loader: "expose-loader?React"
    },
    {
        test: require.resolve("react-dom"),
        loader: "expose-loader?ReactDOM"
    }
    (...)
    ```
- Open console in `<this project>/FormComponent` and run:
    - `npm install` to install all required dependencies
    - `webpack` to create a bundle
- Open console in `<this project>/MainApplication` and run:
    - `npm install` to install all required dependencies
    - `webpack` to create a bundle
- Open `<this project>/MainApplication/index.html` in a browser (with visible javascript console)
- There are no errors in the javascript console right now. The form can be submitted with no errors.

## Size of files

Note the size of the files. In case our application consists of multiple React modules, avoiding libraries duplication by extracting React libraries to a `vendor.bundle.js` can significantly minimize the size of javacript files to download in a browser.

|                           | Part 1 of 2 | Part 2 of 2 | Part 1 of 2 | Part 2 of 2 |
|--------------------------:|:-----------:|:-----------:|:-----------:|:-----------:|
|                           |  unminified |  unminified |   minified  |   minified  |
| mainApplication-bundle.js |    769 KB   |     5 KB    |    231 KB   |     2 KB    |
|   formComponent-bundle.js |    151 KB   |     7 KB    |    45 KB    |     2 KB    |
|          vendor.bundle.js |    13 KB    |    779 KB   |     3 KB    |    232 KB   |

The minified version was achieved with the following plugin set up in `webpack.config.js` files:
```javascript
new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
})
``` 