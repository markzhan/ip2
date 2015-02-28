#!/usr/bin/env node
'use strict';

var ip2 = require('../');
var program = require('commander');
var config = require('../package.json');

program
  .version(config.version)
  .option('-v, --version', 'get version number')
  .option('-f, --force', 'overwrite file')
  .option('-l, --local', 'get local ip')
  .option('-s, --system', 'get system info')
  .option('-i, --internet', 'get internet ip info')
  .option('-c, --chinese', 'output geo ip in chinese')

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
  //.alias('del')
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

// program
//   .command('info [ip|domain]')
//   .description('output ip, domain, system info')
//   .option('-s, --system', 'output system info')
//   .option('-l, --local', 'get local ip')
//   .option('-i, --internet', 'get internet ip')
//   .option('-d, --detail', 'get details for domain')
//   .action(function(ipdomain, options) {
//     var addr = (typeof(ipdomain) == "undefined") ? '' : ipdomain;
//     var myinfo = new sysinfo(addr, options);
//     myinfo.show();
//   }).on('--help', function() {
//     //console.log('');
//   });

program
  .command('*')
  .description('ip utilities')
  .action(function(env, options){
    //console.log('deploying %s', env);
    var ret = ip2.ip.iptools(env, options);
    if (! ret) {
      example();
    }
});

program
  .command('help')
  .description('help & example')
  .action(function() {
    program.outputHelp();
    //program.help();
    example();
});

program.parse(process.argv);
//console.log(' args: %j', program.args);

if (process.argv.length == 2) {
  console.log();
  localip('');
  //example();
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    ip2 ls                # list hosts');
  console.log('    ip2 help              # help & example');
  console.log('    ip2 -lis              # ip & system info');
  console.log('    ip2 qq.com            # get dns information');
  console.log('    ip2 8.8.8.8           # get ip geo information');
  console.log('    ip2 192.168.1.110/26  # CIDR subnet information');
  console.log('');
}

if (program.local) localip('');
if (program.system) ip2.info.sysinfo();
if (program.internet) ip2.info.internetip();
if (program.chinese && process.argv.length == 3) ip2.info.ipcn();

function localip(margin) {
  margin = (typeof(margin) == 'undefined') ? '' : margin;
  var ips = ip2.info.localip();
  ips.forEach (function(ip) {
    console.log(margin + ip);
  });
}

function example() {
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    ip2 ls        # list hosts');
  console.log('    ip2 -h        # print help');
  console.log('    ip2 -lis      # ip & system info');
  console.log('    ip2 qq.com    # get dns information');
  console.log('    ip2 8.8.8.8   # get ip geo location');
  console.log('');
  console.log('    ip2 24           # 255.255.255.0');
  console.log('    ip2 127.0.0.1    # ipv4 to long');
  console.log('    ip2 2130706433   # long to ipv4');
  console.log("    ip2 '! 255.255.255.0'  # 0.0.0.255");
  console.log("    ip2 '192.168.1.134 or 0.0.0.255'  # 192.168.1.255");
  console.log("    ip2 '192.168.1.134 mask 255.255.255.0'  # 192.168.1.0");
  console.log("    ip2 '192.168.1.134 subnet 255.255.255.192'  # subnet information");
  console.log('    ip2 192.168.1.134/26  # CIDR subnet, same as previous');
  console.log('');
}
