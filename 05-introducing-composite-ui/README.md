# Introducing composite UI (with coarse-grained events)

## Introduction

The idea behind a composite UI is to provide an experience of a single application, which is in fact a seamless composition of multiple smaller ones. Let's call them microservices. Instead of/Besides slicing the application into layers, we are applying vertical decomposition. Each such vertical slice has its own UI, which communicates only with its own back-end, which in turn talks to its own database (no, there is no single, shared database). The overall idea is to apply a Single Responsibility Principle on the service level, aiming for a system with loosely coupled components. Most important communication between services is handled in a publish/subscribe messaging style on the front end.

## Example

In this example we are focusing on basics of such approach. There is no real back-end, all calls to the server are fake. The composition is also far from a *seamless* one - mastering CSS is definitely not the point of this exercise. The list of available composable services is hardcoded, we do not have any service discovery on this stage.

The idea for the application is to present a list of links. The concept is similar to the [pocket](http://getpocket.com/) app (btw, highly recommended). In our example, each link is composed of *link fragments*. Each *link fragment* comes from a different *slice*, which resides in a separate service. Each link is composed of:

1. a URL - from the main [Links]() service,
2. a description - from the [Description]() service (slice),
3. keywords - from the [Keywords]() service (slice). 

Please note, that even though it is not covered by this example, each such service is supposed to have a completely separate database. This means that information about all the links is spread across different services. What you would normally place in a single entity, is now decomposed into different *slices*. Each *slice* contains only some subset of link data, and ultimately (not covered by this example) encapsulates its distinctive behaviour.

## Coarse-grained events

Communication between applications is based on coarse-grained events. The assumption is that the number of links is substantial. Therefore, each slice batch-loads a complete set of data (paging/filtering is skipped in this example). This means that *Description* slice loads descriptions for all of the links it knows of. After all descriptions are loaded, they are published in a single `uiEvent.linksSlice.wasLoaded` event. It works the same way for *Keywords*. Slice data received by *Links* service is merged with *urls* owned by *Links* application and presented on the screen. What is worth noticing is that events published by *Description* and *Keywords* contain UI components ready for displaying on the screen. The *Links* service does not care how exactly description data or keywords data should be presented.

## Running the example

The project in github already contains compiled `*-bundle.js` files, therefore it can be run just by opening `index.html` in the browser.

To run the example and to be able to modify the project to see your changes, open three consoles.
1. In the first console, go to the `Description` folder and run `webpack --progress --watch`. This will compile the project and will put the resulting `description-bundle.js` file into the `Links` folder. Moreover, each change will cause hot recompile of the project. Webpack server running from the `Links` folder will pick it up after a *refresh* in a browser. 
1. In the second console, go to the `Keywords` folder and also run `webpack --progress --watch`. This will have a similar effect as described above.
1. In the third console, go to `Links` folder and run `webpack-dev-server --progress --colors` to start webpack server. Note that it will be only listening to changes in the `Links` project, as all the others are loaded indirectly.

## Service discovery

As mentioned earlier, no service discovery is covered by this example. This is however quite important aspect of the *composite UI* approach, hence the section here.

All *UI* layers of each service are linked together in the main service, in the `index.html` file.

```html
    <script src="links-bundle.js"></script>
    <script src="description-bundle.js"></script>
    <script src="keywords-bundle.js"></script>
```

Even though it looks static, please remember that the `index.html` file itself might be assembled on the server side. And any kind of service discovery mechanism might be applied there. This could be as simple as broadcasting information about availability of each composable service after its successful deployment. The main application could collect such events and use them to build the `index.html` presented above. Regardless of how exactly this is implemented, the point is that all services remain highly decoupled from each other. Their knowledge about each other is reduced to minimum.

A small variation of the discussed solution would be to attach the compiled `*-bundle.js` files dynamically from the browser in the runtime. I haven't tried this yet, however [this stackoverflow answer](http://stackoverflow.com/a/950146) and [this article](http://unixpapa.com/js/dyna.html) seem to provide quite nice and detailed explanation on how this could be done.

## Explanations

1. Entry scripts for each service are: `links.js`, `description.js`, `keywords.js`.
1. `LinksStateBuilder` calls `LinksClient` which returns a `Promise` with (fake in this example) response from the server. `LinksStateBuilder` stores `Links` service proprietary data (urls) and fragments coming from slices in a way, which does not require any particular call to finish before another. We have to remember, that each communication is taking place asynchronously and we should not make any assumptions with regard to the order in which responses arrive.
1. Each slice publishes its data with a `priority` attribute. This allows for reliable ordering of link fragments - they will be always displayed in the same, appropriate order (url, keywords, description in our case).
1. The `PubSub-js` library is linked in `index.html` before any other script. Thanks to this, `PubSub` object is available in each module without having to explicitly import `PubSub` dependency. What is even more important, `PubSub` becomes a singleton, the same instance is available in each service. In case each react application would import `PubSub` separately, each service would be operating on a separate instance of `PubSub` object, which would prevent it from being used as a shared pub/sub bus. 
    - As you can see, `PubSub` library was downloaded manually and placed inside a `lib/` folder. It is also possible to bundle it inside `links-bundle.js` file. For this to happen, you would have to make it another entry point in `webpack.config.js`: `entry: ['./lib/pubsub.js', './src/links.js'],`. In such case, it must not be mentioned in the `index.html` file. 