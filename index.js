'use strict';


var parallel = require('./parallel');

var bus = module.exports = function() {
    this.events = {};
};

bus.prototype.on = function(event, action) {
    if(!this.events[event])  {
        this.events[event] = [];
    }
    this.events[event].push(action);
};

bus.prototype.off = function(event) {
    delete this.events[event];
};

bus.prototype.trigger = function(event, params, callback) {
    parallel(this.events[event], params, callback);
};
