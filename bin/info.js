'use strict';

var os = require('os');
var util = require('util');
var ip = require('../lib/ip');

exports = module.exports = Info;

function Info(options) {

  this.op = options;

  this.sysinfo = function() {
    var lang = process.env.LANG ? process.env.LANG : '';
    console.log(os.hostname(), process.env.USER, process.env.SHELL
    , process.platform, os.arch(), os.release() + ';'
    , Math.round(os.uptime()/3600/24) + 'days,'
    , os.totalmem()/1024/1024/1024 + 'GB,'
    , Math.round(os.freemem()/1024/1024) + 'MB;'
    , lang
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
