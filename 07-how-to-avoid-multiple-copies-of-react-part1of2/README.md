# How to avoid multiple copies of React. Part 1 of 2: Problem

This is the first part of two parts tutorial showing why and how to avoid multiple copies of React library in the project set up with webpack and npm dependencies.

Warning! The way `ref` attribute is used in this example is not advisable. It is used in this way only to showcase a problem of multiple copies of React. Read more in the [Explanations](#explanations) section below.

## Problematic scenario

This tutorial is related to a case, in which there is a React application making use of another React module. In such case it is required that React library is loaded only once. In this part of the tutorial, we will have a look at a particular scenario in which this issue arises, and React displays an error message in the javascript console. In [the second part](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part2of2) of this tutorial, we will have a look at how to solve this problem. 

## Project setup

In order to showcase the problematic scenario, we will run the [MainApplication](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/MainApplication) React project, which makes use of a [FormComponent](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/FormComponent). In this example, both modules declare React as their runtime dependency (have a look [here](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/MainApplication/package.json) and [here](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/FormComponent/package.json)). 

## How to run this example

- Open console in `<this project>/FormComponent` and run:
    - `npm install` to install all required dependencies
    - `webpack` to create a bundle
- Open console in `<this project>/MainApplication` and run:
    - `npm install` to install all required dependencies
    - `webpack` to create a bundle
- Open `<this project>/MainApplication/index.html` in a browser (with visible javascript console)

## Symptoms

- You should see the following message in the console:
    > Error: addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded (details: [https://fb.me/react-refs-must-have-owner](https://fb.me/react-refs-must-have-owner)).
- Form submit will end up with the following message in the console:
    > TypeError: this.refs.item is undefined

<a name="explanations"></a>

## Explanations

- The [form component](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/FormComponent/src/FormComponent.jsx) exposed in the [FormComponent](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/FormComponent) project uses `ref` attribute. Please note, that this is an *imperative* programming style and is not recommended by facebook (read more about `refs` [here](https://facebook.github.io/react/docs/refs-and-the-dom.html)). Forms should be handled in a way, in which `<input ... />` state always reflects the component state (read more about handling forms [here](http://reactjs.cn/react/docs/forms.html)). To accomplish this you should use [controlled components](http://reactjs.cn/react/docs/forms.html#controlled-components) with `handleChange` callbacks. 
- The `ref` attribute was used here because with its usage the problem of multiple copies of React is noticeable. What's worse, the way `ref` was used in this example is deprecated (React is now in 15.5.4 version). Instead of *string* reference, we should use a *callback* (read [here](https://facebook.github.io/react/docs/refs-and-the-dom.html#legacy-api-string-refs) to find out more). However, switching to the *callback* approach would once again mask the problem of having multiple Reacts.
- Unfortunately React does not detect *multiple Reacts scenario* on its own. 
- The way the *other* React component ([form component](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/FormComponent/src/FormComponent.jsx)) is attached to the [main application](https://github.com/bkaminnski/react/tree/master/07-how-to-avoid-multiple-copies-of-react-part1of2/MainApplication/src/MainApplication.jsx) in this example is via a [PubSubJS](https://www.npmjs.com/package/pubsub-js) library (showcased in [this tutorial](https://github.com/bkaminnski/react/tree/master/04-react-with-pubsub-js)). This approach was also chosen to implement a Composite UI pattern in [this tutorial](https://github.com/bkaminnski/react/tree/master/05-introducing-composite-ui).