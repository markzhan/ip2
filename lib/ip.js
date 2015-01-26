'use strict';

var os = require('os');
var ip = require('ip');
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
  //http://www.ip.cn/index.php?ip=184.168.221.62
  var options = {
    url: 'http://ip.cn',
    headers: {
      'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:16.0) Gecko/20100101 Firefox/16.0'
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
        console.log("%s %s %s", ip[0], addr.trim(), ca.trim());
      } else {
        console.log('ip not found');
      }
    } else {
      console.log('Error:', response.statusCode);
    }
  });
}

exports.iptools = function(env) {
  var regs = [
  {id: 'long', re: /^\d{3,}$/},
  {id: 'prefix', re: /^\d{1,2}$/},
  {id: 'ip', re: /^\d+\.\d+\.\d+\.\d+$/},
  {id: 'nip', re: /^!\s?(\d+\.\d+\.\d+\.\d+$)/},
  {id: 'cidr', re: /^\d+\.\d+\.\d+\.\d+\/\d{1,2}$/},
  {id: 'or', re: /^(\d+\.\d+\.\d+\.\d+)\s?or\s?(\d+\.\d+\.\d+\.\d+)$/i},
  {id: 'mask', re: /^(\d+\.\d+\.\d+\.\d+)\s?mask\s?(\d+\.\d+\.\d+\.\d+)$/i},
  {id: 'subnet', re: /^(\d+\.\d+\.\d+\.\d+)\s?subnet\s?(\d+\.\d+\.\d+\.\d+)$/i},
  ];
  var id, ret = '';
  for (var i=0; i<regs.length; i++) {
    ret = env.match(regs[i].re);
    if (ret) {
      id = regs[i].id;
      break;
    }
  }
  if (ret) {
    if (id === 'long') {
      var ipaddr = ip.fromLong(ret[0]);
      console.log(ip.isPrivate(ipaddr) ? 'Private IP:' : '', ipaddr);
    } else if (id === 'ip') {
      console.log(ip.isPrivate(ret[0]) ? 'Private IP:' : '', ip.toLong(ret[0]));
    } else if (id === 'nip') {
      console.log(ip.not(ret[1]));
    } else if (id === 'cidr') {
      subnet(ip.cidrSubnet(ret[0]));
    } else if (id === 'prefix') {
      console.log(ip.fromPrefixLen(ret[0]));
    } else if (id === 'or') {
      console.log(ip.or(ret[1], ret[2]));
    } else if (id === 'mask') {
      console.log(ip.mask(ret[1], ret[2]));
    } else if (id === 'subnet') {
      subnet(ip.subnet(ret[1], ret[2]));
    }
  }
  //console.log(id, ret);
  return ret;
}

function subnet(info) {
  console.log('Network IP: %s', info['networkAddress']);
  console.log('  Start IP: %s', info['firstAddress']);
  console.log('    End IP: %s', info['lastAddress']);
  console.log(' Broadcast: %s', info['broadcastAddress']);
  console.log('   Netmask: %s / %s', info['subnetMask'], info['subnetMaskLength']);
  console.log('     Hosts: %s (%s)', info['numHosts'], info['length']);
  //console.log('    Length: %s', info['length']);
}
