'use strict';

var os = require('os');
var util = require('util');
var request = require('request');

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
}

exports.internetip = function() {
  var options = {
    url: 'http://ip.cn',
    headers: {
      'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:16.0) Gecko/20100101 Firefox/16.0'
    }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var re = /\d+.\d+.\d+.\d+/;
      var ip = body.match(re);
      if (util.isArray(ip)) {
        if (process.env.LANG == 'zh_CN.UTF-8') {
          re = /来自：(.[^<]+)</;  // chinese info
        } else {
          re = /GeoIP:(.[^<]+)</;  // english info
        }
        var addr = body.match(re);
        if (util.isArray(addr) && addr.length > 1) {
          addr = addr[1].substr(0,50);
        }
        console.log("IP: %s  %s", ip[0], addr);
      } else {
        console.log('ip not found');
      }
    } else {
      console.log(response.statusCode);
    }
  });
}
