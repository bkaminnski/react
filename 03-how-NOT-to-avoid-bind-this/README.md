# How NOT to avoid .bind(this); (a few words about experimental features)

It was a few times while going through different react examples, that I found the following structure used within a react component: `someMethod = (e) => { ... }}`. None of these examples worked in a setup (dependencies wise) presented in [this](https://github.com/bkaminnski/react/tree/master/01-from-0-to-react-in-15-minutes) tutorial. The code would't even com(trans)pile. More or less this was the output after running `webpack` command:

```
Module build failed: SyntaxError: WithoutBind.jsx: Unexpected token (18:12)

  16 |     }
  17 | 
> 18 |     onClick = (e) => {
     |             ^
  19 |         alert(this.state.message);
  20 |     }
  21 | }
```

It took me a while to realise that babel was missing some feature. One which seemed to be included in stage-0. And even stage-2.

## Solution (kind of)

In addition to all the dependencies in [this](https://github.com/bkaminnski/react/tree/master/01-from-0-to-react-in-15-minutes) tutorial, I installed `stage-2` dependency: `npm install babel-preset-stage-2 --save-dev`. I also added `stage-2` preset in [webpack.config.js](): `presets: ['es2015', 'react', 'stage-2']`. Now that the code was running fine, it was the time to understand why this `... = () => {...}` syntax was introduced at all.

## Problem description

1. You bind a method to an event in `render()`, like here: `<div onClick={this.onClick}>click me!</div>` (see [WithBind.jsx]()).
2. The method `onClick(e)` refers to `this`, like here: `alert(this.state.message);`
3. Unless you bind the `onClick(e)` method to `this` object, the code will not work, and you will see something similar in the console: `bundle.js:118 Uncaught TypeError: Cannot read property 'state' of null`.
4. The solution is to add this line in the constructor of the class `this.onClick = this.onClick.bind(this);`.

## .bind(this)

You can find a full explanation in [this article](https://babeljs.io/blog/2015/06/07/react-on-es6-plus). Long story short, this `.bind(this);` was not necessary back in ECMAScript5, in which you had to create a react class using `React.createClass` method. In ES6, your class can now *extend* a react `Component` class, like here: `class WithBind extends React.Component { ...`. And in *this* case, some kind of magic binding is missing, which forces us to address this *missing-this-reference-issue* ourselves.

BTW - [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) you can read more about `bind()` function itself. 

## Experimental part and sad news

Now, we *do* realise, that this additional line, this binding in the constructor is ugly, unnecessary, boilerplate code. And we'd like to remove it. Which brings us to the `... = () => {...}` syntax. Have a look at the [WithoutBind.jsx]() to see how it looks like. And it looks quite nice, the problem is that even though it *was* present in stage-2, it is now missing in stage-3. Which brings us to a short explanation of what these *stages* actually mean.

For a complete reference, please have a look at [this online book](https://leanpub.com/exploring-es2016-es2017/read), *Exploring ES2016 and ES2017* by Axel Rauschmayer. Here let me quote, what particular stages mean.

> Stage 0: strawman. (It is a) free-form way of submitting ideas for evolving ECMAScript.

> Stage 1: proposal. (Is a) formal proposal for the feature

> Stage 2: draft. A first version of what will be in the specification.

> Stage 3: candidate. The proposal is mostly finished and now needs feedback from implementations and users to progress further.

> Stage 4: finished. The proposal is ready to be included in the standard.

As of now, 24th of October 2016, [babel-preset-stage-3](https://www.npmjs.com/package/babel-preset-stage-3) is the latest preset available in `npm`. And the new `... = () => {...}` syntax appears to be missing here.

## No big deal, after all

Since I don't like having this additional line in the constructor, and it looks like new syntax has not made it into the candidate stage, for now, I will just go with an inlined version of my initial approach. And maybe one day I will try other possible approaches described [here](http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html). Nevertheless, this whole learning process was quite fun.