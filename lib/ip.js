'use strict';

var ip = require('ip');
var info = require('./info.js');

exports.iptools = function(env, options) {
  var regs = [
  {id: 'long', re: /^\d{3,}$/},
  {id: 'prefix', re: /^\d{1,2}$/},
  {id: 'ip', re: /^\d+\.\d+\.\d+\.\d+$/},
  {id: 'nip', re: /^!\s?(\d+\.\d+\.\d+\.\d+$)/},
  {id: 'cidr', re: /^\d+\.\d+\.\d+\.\d+\/\d{1,2}$/},
  {id: 'or', re: /^(\d+\.\d+\.\d+\.\d+)\s?or\s?(\d+\.\d+\.\d+\.\d+)$/i},
  {id: 'mask', re: /^(\d+\.\d+\.\d+\.\d+)\s?mask\s?(\d+\.\d+\.\d+\.\d+)$/i},
  {id: 'subnet', re: /^(\d+\.\d+\.\d+\.\d+)\s?subnet\s?(\d+\.\d+\.\d+\.\d+)$/i},
  {id: 'domain', re: /^(\w+\.)?(\w+\.)?\w+\.\w{2,6}$/},
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
      console.log(ip.isPrivate(ipaddr) ? 'Private IP:' : 'IP:', ipaddr);
    } else if (id === 'ip') {
      if (ip.isPrivate(ret[0])) {
        console.log('Private IP:', ip.toLong(ret[0]));
      } else {
        console.log('IP2LONG: ' + ip.toLong(ret[0]));
        info.internetip(ret[0]);
        if (options.parent.chinese) {
          info.ipcn(ret[0])
        }
      }
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
    } else if (id === 'domain') {
      info.domain_info(ret[0]);
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
}
