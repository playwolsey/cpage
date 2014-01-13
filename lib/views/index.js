var http = require('http')
  , res = http.ServerResponse.prototype;

var express = require('express');

res.route = function(template, opts, layout, mobile_view) {//{{{
  layout = layout || 'layout.jade';
  this.render(layout, opts);
};//}}}
