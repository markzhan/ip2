'use strict';

var os = require('os');
var util = require('util');
var ip = require('../lib/ip');

exports = module.exports = Info;

function Info(options) {

  this.op = options;

  this.sysinfo = function() {
    var lang = process.env.LANG ? process.env.LANG : '';
    var platform = process.platform;
    var user, shell = '';
    if (platform.substr(0,3) == 'win') {
      user = process.env.USERNAME;
    } else {
      user = process.env.USER;
      shell = process.env.SHELL;
    }
    console.log(os.hostname(), user, shell
    , platform, os.arch(), os.release() + ','
    , Math.round(os.totalmem()/1024/1024) + ' MB,'
    , Math.round(os.freemem()/1024/1024) + ' MB,'
    , Math.round(os.uptime()/3600/24) + 'days'
    //, lang
    );
  }

  this.localip = function() {
    var ips = ip.localip();
    ips.forEach (function(ip) {
      console.log('' + ip);
    });
  }

  this.show = function() {
    if (this.op.internet || this.op.local || this.op.system) {
      if (this.op.system) this.sysinfo();
      if (this.op.local) this.localip();
      if (this.op.internet) ip.internetip();
    } else {
      this.localip();
    }
  }
}
