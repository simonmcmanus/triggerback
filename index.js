'use strict';


var parallel = require('./parallel');

var bus = module.exports = function(debug) {
    this.events = {};
    this.debug = debug || false;
};

bus.prototype.on = function(event, action) {
    if(!this.events[event])  {
        this.events[event] = [];
    }
    this.events[event].push(action);
};

bus.prototype.off = function(event) {
    if(this.debug) {
        console.log('off ', event);
    }
    delete this.events[event];
};

bus.prototype.trigger = function(event, params, callback) {
    if(this.debug) {
        console.log('fired',event, this.events[event], params);
    }
    parallel(this.events[event], params, callback);
};
