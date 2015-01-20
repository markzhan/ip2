'use strict';

var os = require('os');
var util = require('util');

//exports = module.exports = new ip();

exports.localip = function() {
  var ips = [];
  var ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    var alias = 0;
    ifaces[dev].forEach(function(details){
      if (details.family == 'IPv4') {
        //console.log(dev + (alias?':'+alias:''), details.address);
        ips.push(dev + (alias?':'+alias:'') + ' ' + details.address);
        ++alias;
      }
    });
  }
  return ips;
};

exports.callback = function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var re = /\d+.\d+.\d+.\d+/;
    var ip = body.match(re);
    if (ip == null || ! util.isArray(ip)) {
      console.log('ip not found');
      process.exit(1);
    }
    if (process.env.LANG == 'zh_CN.UTF-8') {
      re = /来自：(.[^<]+)</;  // chinese info
    } else {
      re = /GeoIP:(.[^<]+)</;  // english info
    }
    var addr = '';
    var arr = body.match(re);
    if (util.isArray(arr) && arr.length > 1) {
      addr = arr[1].substr(0,50);
    }
    console.log("  %s  %s", ip[0], addr);
  } else {
    console.log(response.statusCode);
  }
};
