'use strict';

var util = require('util');
var request = require('request');
var ipapi = require('../package.json');

exports = module.exports = new IpGeo();

function IpGeo() {

  this.ipgeo = function(ip) {
    var api = (typeof(ipapi.ipapi) == 'undefined')
    ? 'undefined' : ipapi.ipapi;
    switch (api) {
      case 'ip-api.com':
        return this.ipapi(ip);
      case 'ipinfo.io':
        return this.ipinfoio(ip);
      default:
        return console.log('api error: ' + api);
    }
  }

  this.ipcn = function(ip) {
    var url = 'http://ip.cn/';
    //var url = 'http://www.ip.cn/index.php?ip=';
    //url = (typeof(ip) == 'undefined') ? url : url + ip;
    var options = {
      url: url,
      headers: {
        'User-Agent':
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var re = /\d+\.\d+\.\d+\.\d+/;
        var ip = body.match(re);
        var addr, ca = '';
        if (util.isArray(ip)) {
          re = /GeoIP:(.[^<]+)</;  // english info
          addr = body.match(re);
          if (util.isArray(addr) && addr.length > 1) {
            addr = addr[1].substr(0,50);
          }
          if (process.env.LANG == 'zh_CN.UTF-8') {
            re = /来自：(.[^<]+)</;  // chinese info
            ca = body.match(re);
            if (util.isArray(ca) && ca.length > 1) {
              ca = ca[1].substr(0,30);
            }
          }
          ca = (ca) ? ca.trim() : '';
          addr = (addr) ? addr.trim() : '';
          console.log("IP: %s %s %s", ip[0], addr, ca);
        } else {
          console.log('ip not found');
        }
      } else {
        console.log('http error:', response.statusCode);
      }
    });
  }

  this.telize = function(ip) {
    var header = {
      url: 'http://www.telize.com/geoip/' + ip,
      headers: {
        'User-Agent':
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)'
      }
    }

    request(header, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        request(header, function (err, response, body) {
          if (err) throw err;
          var r = JSON.parse(body);
          console.log('IP: %s', r['ip']);
          console.log('%s, %s, %s', r['city'], r['region'], r['country']);
          console.log('UTC %s %s, %s %s, %s', r['offset'], r['timezone'], r['longitude'], r['latitude'], r['country_code']);
          console.log('ISP: %s', r['isp']);
          //for (var key in r) {console.log(" %s: %s", key, r[key]);}
          //console.log(r);
        });
      } else {
        console.log('http error:', response.statusCode);
      }
    });
  }

  this.ipinfoio = function(ip) {
    var ip = (typeof(ip) == 'undefined') ? '' : ip + '/';
    var options = {
      url: 'http://ipinfo.io/' + ip + 'json',
      headers: {
        'User-Agent':
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)'
      }
    }

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body.trim());
      } else {
        console.log('http error:', response.statusCode);
      }
    });
  }

  this.ipapi = function(ip) {
    var ip = (typeof(ip) == 'undefined') ? '' : '/' + ip;
    var options = {
      url: 'http://ip-api.com/json' + ip,
      headers: {
        'User-Agent':
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)'
      }
    }

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var r = JSON.parse(body);
        console.log('IP: %s', r['query']);
        console.log('ADDRESS: %s, %s, %s', r['city'], r['regionName'], r['country']);
        console.log('TIMEZONE: %s, LOCATION: %s %s, %s', r['timezone'], r['lon'], r['lat'], r['countryCode']);
        console.log('ISP: %s - %s', r['isp'], r['org']);
        //for (var key in r) {console.log(" %s: %s", key, r[key]);}
        //console.log(r);
      } else {
        console.log('http error:', response.statusCode);
      }
    });
  }

}
