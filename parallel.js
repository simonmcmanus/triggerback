'use strict';

/**
    Custom implementation of Parallel that runs all function regardles of errors.

 * @param  {array}   gets
 * @param  {Function} callback
 */
module.exports = function (gets, params, callback) {

    if (!gets) {
        callback && callback(null, null);
        return;
    }
    var counter = 0;
    var buildOutput = function () {
        counter++;
        if (counter === gets.length) {
            callback && callback(null, null);
        }
    };


    gets.forEach(function(getter) {
        getter(params, buildOutput);
    });
};