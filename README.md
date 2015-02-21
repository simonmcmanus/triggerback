Event bus which provides a callback for trigger.

A very simple event bus, main reason for writing was that I wanted to fire a callback after all of the functions bound to the event had completed.

Think of a mashup between async.parallel and Backbone.events.trigger.

#API

##on(eventName, actionFunction)

Bind a function to an event. Note that the function needs to expect params as the first param, and callback as the second. See the examples below.

##trigger(eventName, params, callback)

Run all functions in parallel bound to the event passing the params as the first param. When all functions are complete the callback will run.

##off(eventName)

Removes all functions bound to the event. This may be a terrible idea, im not actually using it yet and this was the simplist implementation :)

Also there are no tests against .off

#Example Usage

```js
    var E = require('./index');
    var bus = new E();

    bus.on('bacon', function(params, next) {
        setTimeout(next, 60);
    });

    bus.on('bacon', function(params, next) {
       setTimeout(next, 30);
    });

    bus.trigger('bacon', {toast: true}, function() {
        console.log('90 ms later');
    });

```js
