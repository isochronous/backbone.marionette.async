(function (root, factory) {
  if (typeof exports === 'object') {

    var jquery = require('jquery');
    var underscore = require('underscore');
    var backbone = require('backbone');
    var marionette = require('marionette');

    module.exports = factory(jquery, underscore, backbone, marionette);

  } else if (typeof define === 'function' && define.amd) {

    define(['jquery', 'underscore', 'backbone', 'marionette'], factory);

  }
}(this, function ($, _, Backbone, Marionette) {

  //= async.js
  return Backbone.Marionette.Async;

}));
