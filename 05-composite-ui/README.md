# Introducing composite UI (with coarse-grained events)

## Introduction

The idea behind a composite UI is to provide an experience of a single application, which is in fact a seamless composition of multiple smaller ones. Let's call them microservices. A very important aspect of such approach is limiting communication in the back-end side of such system. Instead of/Besides slicing the application into layers, we are applying vertical decomposition. Each such vertical slice has its own UI, which communicates only with its own back-end, which in turn talks to its own database (no, there is no single, shared database). The overall idea is to apply a Single Responsibility Principle on the service level, aiming for a system with loosely coupled components. Most important communication between services is handled in a publish/subscribe messaging style on the front end.

## Example

In this example we are focusing on basics of such approach. There is no real back-end, all calls to the server are fake. The composition is also far from a *seamless* one - mastering CSS is definitely *not* the point of this excercise. The list of available composable services is hardcoded, we do not have any service discovery on this stage.

Please note, that even though it is not covered by this example, each such service is supposed to have a completely separate database. This means that information about all the links is spread accross different services. What you would normally place in a single entity, is now decomposed into different *slices*. Each *slice* contains only some subset of link data, and ultimately (not covered by this example) encapsulates its distinctive behaviour.

The main application, [Links](), is a list of links, like a [pocket](http://getpocket.com/) app (btw, highly recommended). Each link is composed of *link fragments*. Each *link fragment* comes from a different *slice*, which is a separate app. In this examples, each link is composed of:

1. A URL - from the main [Links]() application.
2. A description - from the [Description]() application.
3. A list of keywords - from the [Keywords]() application. 


## Structure of projects

The structure of each project is flat. The point of this example is to really focus on *UI composition* aspects only. Packaging is kept as simple as possible.  

To run the example, open three consoles.
1. In the first console, go to `Description` folder and run `webpack --progress --watch`. This will compile the project and will put the resulting `description-bundle.js` file into the `Links` folder. Moreover, each change will cause hot recompile of the project. Webpack server running from the `Links` folder will pick it up after a *refresh* in a browser. 
1. In the second console, go to `Keywords` folder and also run `webpack --progress --watch`. This will have a similar effect as described above.
1. In the third console, go to `Links` folder and run `webpack-dev-server --progress --colors` to start webpack server. Note that it will be only listening to changes in the `Links` project, as all the others are loaded indirectly.