'use strict';

var sinon = require('sinon');
var should = require('should');

var TriggerBack = require('../index');

describe('Given a triggerback bus', function() {
    var bus;

    var spy1;
    var spy2;
    var callbackSpy;
    var emptyFunc;

    beforeEach(function() {
        bus = new TriggerBack();

        emptyFunc = function(params, next) {
            next();
        };

        spy1 = sinon.spy(emptyFunc);
        spy2 = sinon.spy(emptyFunc);
        callbackSpy = sinon.spy();

    });


    describe('Given some functions bound to an event ("wg")', function() {

        beforeEach(function() {
            bus.on('wg', spy1);
            bus.on('wg', emptyFunc);
            bus.on('wg', spy2);
        });

        describe('when the event is triggered', function() {

            var params;

            beforeEach(function() {
                params = {
                    bacon: true
                };
                bus.trigger('wg', params, callbackSpy);
            });

            it('should call the first event handler', function() {
                spy1.callCount.should.equal(1);
            });

            it('should pass the params to the first events handler', function() {
                spy1.args[0][0].should.equal(params);
            });

            it('should call the last event handler.', function() {
                spy2.callCount.should.equal(1);
            });

            it('should pass the params to the last events handler', function() {
                spy1.args[0][0].should.equal(params);
            });


            it('should call the final callback last.', function() {
                callbackSpy.callCount.should.equal(1);
            });

            it('should pass the final callback two null params', function() {
                callbackSpy.args[0].should.eql([null, null]);
            });
        });
    });

    describe('When an events is triggered which there are no events', function() {

        beforeEach(function() {
            bus.trigger('wg', {}, callbackSpy);
        });

        it('should call the final callback.', function() {
            callbackSpy.callCount.should.equal(1);
        });

        it('should pass the final callback two null params', function() {
            callbackSpy.args[0].should.eql([null, null]);
        });
    });
});