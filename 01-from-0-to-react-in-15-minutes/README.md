# From 0 to react in 15 minutes

This tutorial was based on [this blog post](https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html) and [this youtube screencast](https://www.youtube.com/watch?v=w5TupxbnnrM).

At the end, you will have a simplistic react project written in ES2015, transpiled by babel, bundled with webpack.

## Install software

- https://code.visualstudio.com/
- https://nodejs.org/en/ (it was 4.6.1 LTS at the moment of writing this tutorial)

## Create a project

### From scratch

- Start console in a new folder for the project.
- Run `npm init`, set name to: `app`, entry point: `app.js`, press `enter` to apply default values for others.
- Install required dependencies:
    - `npm install react react-dom --save`,
    - `npm install babel-loader babel-core babel-preset-es2015 babel-preset-react webpack --save-dev`,
    - `npm install webpack-dev-server -g`.

Now continue to the **Create files** section below.

### Based on this git project

- Clone this git project `git clone https://github.com/bkaminnski/react.git`
- Start console in `01-from-0-to-react-in-15-minutes` folder.
- Run `npm install` to download dependencies based on `package.json` file.

Now continue to the **Run the project** section below.

## Create files

Type `code .` to open Visual Studio Code. We will need `index.html` as an entry page for the app,
```
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>React app</title>
  </head>
  <body>
    <div id="helloWorld"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

and `app.js` as the main script of application.
```
import HelloWorld from './HelloWorld.jsx';
```

The `HelloWorld.jsx` will be our first component.
```
import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

export default class HelloWorld extends React.Component {
  render() {
    return <Message title="React app says:">Hello World!</Message>
  }
}

ReactDOM.render(<HelloWorld/>, document.getElementById('helloWorld'));
```

It depends on another component, a `Message` in the `Message.jsx` file.
```
import React from 'react';

export default class Message extends React.Component {
  render() {
    return <div>
        <div>{this.props.title}</div>
        <div>{this.props.children}</div>
    </div>
  }
}
```

Before runnig the project, we need a webpack configuration in `webpack.config.js` file.
```
module.exports = {
  entry: './app.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
```

## Run the project

There is a couple of ways to run the project. Type:
- `webpack-dev-server --progress --colors` to start webpack server and open [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/) in a browser.
- `webpack` just to compile the project into a single `bundle.js` file.
- `webpack --progress --watch` to compile the project into a single file and keep watching for changes in the project.

## Explanations

- Parameters used in `npm install`:
    - `--save` for runtime dependencies, they go to the `"dependencies"` section in `package.json`
    - `--save-dev` for compilation time dependencies, they go to the `"devDependencies"` section in `package.json`
- `.jsx` extension:
    - lets you use HTML-like notation in javascript files (thought it's neither a string nor HTML)
    - for example here: `ReactDOM.render(<HelloWorld/>, document.getElementById('helloWorld'));`
- `default export` in class declaration
    - there can be at most one *default* export
    - [here](http://stackoverflow.com/questions/31852933/why-es6-react-component-works-only-with-export-default) comes a detailed explanation
- ES2015, or ECMAScript 2015, or ECMAScript 6th edition
    - to use it, we had to set a `es2015` preset for babel in webpack configuration (`webpack.config.js`)