#triggerback

A very simple event bus whose trigger function accepts a callback.

Think of a mashup between async.parallel and Backbone.events.trigger.

The intentions being to reduce the number of events triggered while still maintaining loose coupling between components.

##API

###on(eventName, actionFunction)

Bind a function to an event. Note that the function needs to expect params as the first param, and callback as the second. See the examples below.

###trigger(eventName, params, callback)

Run all functions bound to the event in parallel passing the params as the first arg. When all functions are complete fire the callback.

###off(eventName)

Removes all functions bound to the event. This may be a terrible idea, im not actually using it yet and this was the simplist implementation :)

Also there are no tests against .off

##Example Usage

```js
    var TriggerBack = require('triggerback');
    var bus = new TriggerBack();

    bus.on('bacon', function(params, next) {
        setTimeout(next, 60);
    });

    bus.on('bacon', function(params, next) {
       setTimeout(next, 30);
    });

    bus.trigger('bacon', {toast: true}, function() {
        console.log('90 ms later');
    });

