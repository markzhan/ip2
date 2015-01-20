#!/usr/bin/env node
'use strict';

var ip2 = require('../');
var path = require('path');
var request = require('request');
var program = require('commander');

program
  .version('0.1.5')
  .option('-v, --version', 'get version')
  .option('-l, --local', 'output local ip')
  .option('-i, --internet', 'output internet ip');

program
.command('ls')
.alias('list')
.description('list all hosts')
.action(function() {
  ip2.hosts.list();
});

program
.command('add <file>')
.description('add one custom hosts file')
.action(function(file) {
  var ret = ip2.hosts.add(file);
  if (ret !== true) {
    console.log(ret);
  }
});

program
.command('use <hosts>')
.description('change system hosts to hosts')
.action(function(hosts) {
  var ret = ip2.hosts.use(hosts);
  if (ret !== true) {
    console.log(ret);
  }
});

program
.command('del <hosts>')
.description('delete one custom hosts file')
.action(function(hosts) {
  ip2.hosts.del(hosts);
});

program
.command('reload')
.description('reload used hosts')
.action(function() {
  ip2.hosts.reload();
});

program
.command('reset')
.description('reset hosts')
.action(function() {
  ip2.hosts.reset();
});

program
.command('help')
.description('print help')
.action(function() {
  program.help();
});

program
.command('*')
.action(function(env){
  //console.log('deploying "%s"', env);
  program.outputHelp();
  example();
});

program.parse(process.argv);
//console.log(' args: %j', program.args);

if (process.argv.length == 2) {
  console.log();
  localip();
  example();
}

if (program.local) {
  localip();
}

if (program.internet) {
  var options = {
    url: 'http://ip.cn',
    headers: {
      'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:16.0) Gecko/20100101 Firefox/16.0'
    }
  };
  request(options, ip2.ip.callback);
}


function localip() {
  var ips = ip2.ip.localip();
  ips.forEach (function(ip) {
    console.log('  ' + ip);
  });
}

function example() {
  console.log();
  console.log('  Examples:');
  console.log();
  console.log('    ip2 -h     # print help');
  console.log('    ip2 list   # list all hosts');
  console.log();
}
