#!/usr/bin/env node
'use strict';

var ip2 = require('../');
var path = require('path');
var request = require('request');
var program = require('commander');
var sysinfo = require('../bin/info');

program
  .version('0.2.5')
  .option('-v, --version', 'get version number')
  .option('-f, --force', 'overwrite file')

program
  .command('ls [dir]')
  //.alias('list')
  .description('list hosts')
  .action(function(dir) {
    ip2.hosts.list(dir);
  });

program
  .command('cat [hosts]')
  .description('print hosts contents')
  .action(function(hosts) {
    ip2.hosts.cat(hosts);
  });

program
  .command('add <file>')
  .description('add custom hosts to system')
  .action(function(file) {
    ip2.hosts.add(file, program.force);
  });

program
  .command('use <hosts>')
  .description('change system hosts to custom hosts')
  .action(function(hosts) {
    ip2.hosts.use(hosts);
  });

program
  .command('rm <hosts>')
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
  .command('init')
  .description('init hosts')
  .action(function() {
    ip2.hosts.init();
  });

// program
//   .command('get [url]')
//   .description('todo: get hosts from url')
//   .action(function(url) {
//     ip2.hosts.get(url);
//   });
//
// program
//   .command('who <ip|domain>')
//   .description('todo: whois for ip or domain')
//   .action(function(who) {
//     ip2.hosts.whois(who);
//   });

program
  .command('info')
  .description('output system & ip info')
  .option('-s, --system', 'output system info')
  .option('-l, --local', 'get local ip')
  .option('-i, --internet', 'get internet ip')
  .action(function(options) {
    var myinfo = new sysinfo(options);
    myinfo.show();
  }).on('--help', function() {
    //console.log('');
  });

program
  .command('help')
  .description('print this help')
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
  var ips = ip2.ip.localip();
  ips.forEach (function(ip) {
    console.log('  ' + ip);
  });
  example();
}

function example() {
  console.log();
  console.log('  Examples:');
  console.log();
  console.log('    ip2 -h        # print help');
  console.log('    ip2 ls        # list hosts');
  console.log('    ip2 info -h   # sub cmd help');
  console.log();
}
