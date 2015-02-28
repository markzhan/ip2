'use strict';

var os = require('os');
var dns = require('dns');
var osname = require('os-name');
var ipgeo = require('./ipgeo.js');

exports = module.exports = new Info();

function Info() {

  this.localip = function() {
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

  this.internetip = function(ip) {
    ipgeo.ipgeo(ip);
  }

  this.ipcn = function(ip) {
    ipgeo.ipcn(ip);
  }

  this.domain_info = function(domain) {
    var adds;
    dns.resolve(domain, function (err, addresses) {
      //if (err) throw err;
      if (!err) {
        adds = addresses;
        //console.log('' + (addresses));
        //console.log('' + JSON.stringify(addresses));
        for (var x in addresses) { console.log(addresses[x]) }
      }
      dns.resolveCname(domain, function (err, addresses) {
        //if (err) throw err;
        if (!err) {
          if (typeof(addresses) == 'undefined') {
            console.log('CNAME: ' + 'undefined');
          } else {
            console.log('CNAME: ' + (addresses));
          }
        }
        dns.resolveNs(domain, function (err, addresses) {
          //if (err) throw err;
          if (!err) {
            //console.log('NS: ' + (addresses));
            for (var x in addresses) { console.log(addresses[x]) }
          }
          dns.resolveMx(domain, function (err, addresses) {
            //if (err) throw err;
            if (!err) {
              addresses.forEach(function (a) {
                console.log(a);
              });
            }
            // adds.forEach(function (a) {
            //   dns.reverse(a, function (err, domains) {
            //     if (err) {
            //       console.log('reverse for ' + a + ' failed: ' + err.message);
            //     } else {
            //       console.log('reverse for ' + a + ': ' + domains);
            //       //JSON.stringify(domains));
            //     }
            //   });
            // });
          });
        });
      });
    });
  }

  this.sysinfo = function() {
    var os_name = osname(os.platform(), os.release());
    console.log(os_name + ','
    , Math.round(os.totalmem()/1024/1024) + ' MB,'
    , Math.round(os.freemem()/1024/1024) + ' MB,'
    , Math.round(os.uptime()/3600/24) + 'days'
    );
    var lang = process.env.LANG ? process.env.LANG : '';
    var platform = process.platform;
    var user, shell = '';
    if (platform.substr(0,3) == 'win') {
      user = process.env.USERNAME;
      console.log(os.hostname(), user, platform, os.arch(), os.release(), lang);
    } else {
      user = process.env.USER;
      shell = process.env.SHELL;
      console.log(os.hostname(), user, shell, platform, os.arch(), os.release(), lang);
    }
  }

}
