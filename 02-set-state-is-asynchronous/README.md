# setState() is asynchronous

This project demostrates an asynchronous nature of `setState()` react method. It was created to practice an example presented in [this blog post](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.vh2fxihan).

## Scenario

After a new item is submitted, the state of the component is updated via a call to the `setState()` method. The requirement is that once a new state is set in the component, we have to notify all interested parties about the new state. In this simple showcase, this is implemented in the `notifyAboutNewState()` method, which currently just logs the current state in the console. 

## A bug and a fix

The *buggy* implementation assumes that `setState()` works in a synchronous way, and calls the `notifyAboutNewState()` method sequentially, as the next step. The *fixed* implementation is adjusted, so that the `notifyAboutNewState()` method is called only after a call to `setState()` is really finished.

## Explanation

In the *buggy* case, due to the asynchronous nature of the `setState()` method, react processing does not finish before a subsequent, separate call to the `notifyAboutNewState()` method is made. Therefore `notifyAboutNewState()` operates on a stale state.