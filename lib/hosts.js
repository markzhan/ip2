'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var util = require('util');

function oshosts() {
  if (os.platform().substr(0,3) == 'win') {
    return process.env.windir + '\\System32\\drivers\\etc\\hosts';
  } else {
    return '/etc/hosts';
  }
}

function inhosts() {
  var dir = path.dirname(require.main.filename);
  if (dir.indexOf('bin') < 0) {
    dir = dir + path.sep + '.hosts';
  } else {
    dir = dir.replace('bin', '') + '.hosts';
  }
  return dir;
}

function ip2file(name) {
  return oshosts() + '.' + name + '.ip2';
}

function ip2mark(name) {
  return oshosts() + '.__' + name + '.ip2';
}


exports.list = function(dir) {
  if (typeof(dir) == "undefined") {
    listHosts(path.dirname(oshosts()));
  } else if (dir == '-') {
    listHosts(inhosts());
  } else {
    listHosts(dir);
  }
}

exports.cat = function(hosts) {
  if (typeof(hosts) == 'undefined') {
    fs.createReadStream(oshosts()).pipe(process.stdout);
  } else {
    var file = ip2file(hosts);
    if (! fs.existsSync(file)) {
      file = ip2mark(hosts);
      if (! fs.existsSync(file)) {
        file = path.join(inhosts(), 'hosts.' + hosts + '.ip2');
      }
    }
    var ret = checkfile(file, 'cat');
    if (ret === true) {
      fs.createReadStream(file).pipe(process.stdout);
      //var contents = fs.readFileSync(file, 'utf-8');
      //process.stdout.write(contents);
    } else {
      console.log(ret);
    }
  }
}

exports.add = function(from, force) {
  var ret = checkfile(from, 'add');
  if (ret === true) {
    try {
      addhosts(from, force);
    } catch (e) {
      console.log('permission denied');
    }
  } else {
    console.log(ret);
  }
}

exports.use = function(name) {
  //console.log(ip2mark(name), markfile());
  if (ip2mark(name) == markfile()) {
    console.log(name, 'is using');
    return;
  }
  var ret = checkfile(ip2file(name));
  if (ret === true) {
    try {
      clearmark();
      usehosts(name);
    } catch (e) {
      console.log('permission denied');
    }
  } else {
    console.log(ret);
  }
}

exports.del = function(name) {
  if (ip2mark(name) == markfile()) {
    console.log(name, 'is using');
    return;
  }
  var file = ip2file(name);
  var ret = checkfile(file, 'cat');
  if (ret === true) {
    try {
      fs.unlinkSync(file);
    } catch (e) {
      console.log('permission denied');
    }
  } else {
    console.log(ret);
  }
}

exports.reload = function() {
  try {
    var to = oshosts();
    var from = markfile();
    if (fs.existsSync(from)) {
      fs.writeFileSync(to, fs.readFileSync(from, {encoding: 'utf8'}));
    }
  } catch (e) {
    console.log('permission denied');
  }
}

exports.reset = function() {
  try {
    var to = oshosts();
    var from = to + '.ip2'
    if (fs.existsSync(from)) {
      fs.writeFileSync(to, fs.readFileSync(from, {encoding: 'utf8'}));
      clearmark();
    } else {
      console.log('Run: sudo ip2 init');
    }
  } catch (e) {
    console.log('permission denied');
  }
}

exports.init = function() {
  var osh = oshosts();
  var osh2 = osh + '.ip2';
  try {
    if (! fs.existsSync(osh2)) {
      fs.writeFileSync(osh2, fs.readFileSync(osh, {encoding: 'utf8'}));
    }
    ip2hosts(inhosts(), true);
  } catch (e) {
    console.log('permission denied');
  }
}

exports.get = function(url) {
  console.log('get',url);
}

exports.whois = function(who) {
  console.log('whois', who);
}


function markfile() {
  var ret = '';
  var hfile = oshosts();
  var hpath = path.dirname(hfile);
  var files = fs.readdirSync(hpath);
  files.forEach (function(file) {
    if (path.extname(file) === '.ip2' && file.substr(0, 8) === 'hosts.__') {
      ret = path.join(hpath, file);
      return ret;
    }
  });
  return ret;
}

function clearmark() {
  var file = markfile();
  if (fs.existsSync(file)) {
    fs.renameSync(file, file.replace('__', ''));
  }
}

/**
 * Switch hosts to custom
 */
function usehosts(name) {
  var osh = oshosts();
  var from = ip2file(name);
  fs.writeFileSync(osh, fs.readFileSync(from, {encoding: 'utf8'}));
  fs.renameSync(from, ip2mark(name));
}

/**
 * Copy hosts to system directory
 */
function ip2hosts(dir, force) {
  try {
    var files = fs.readdirSync(dir);
  } catch (e) {
    console.log('no such directory');
    return;
  }
  files.forEach (function(file) {
    addhosts(path.join(dir, file), force);
  });
}

function addhosts(from, force) {
  var ret = checkfile(from, 'add');
  var to = '';
  if (ret === true) {
    var name = path.basename(from, path.extname(from));
    name = name.replace('hosts.', '');
    if (fs.existsSync(ip2mark(name))) {
      to = ip2mark(name);
    } else {
      to = ip2file(name);
    }
    if (force || ! fs.existsSync(to)) {
      //fs.createReadStream(from).pipe(fs.createWriteStream(to));
      fs.writeFileSync(to, fs.readFileSync(from, 'utf8'));
      console.log(name + ' is ready');
    } else {
      console.log(name + ' exists');
    }
  } else {
    console.log(ret);
  }
}

/**
 * List hosts in the directory
 */
function listHosts(dir) {
  try {
    var files = fs.readdirSync(dir);
  } catch (e) {
    console.log('no such directory');
    return;
  }
  files.forEach (function(file) {
    var name = file.match(/^hosts.(.+).ip2$/);
    if (util.isArray(name) && name.length > 1) {
      if (name[1].substr(0,2) == '__') {
        console.log('> ' + name[1].substr(2));
      } else {
        console.log('  ' + name[1]);
      }
    }
  });
}

/**
 * Check the hosts file is standard
 */
function checkfile(file, mode) {
  if (fs.existsSync(file)) {
    var stat = fs.statSync(file);
    if (stat.isFile()) {
      if (stat.size == 0 || stat.size > (500 * 1024)) {
        return('file size error');
      } else if (typeof(mode) == 'string') {
        var name = path.basename(file);
        switch (mode) {
          case 'add':
            if (name.substr(0,1) == '_') {
              return('file name error');
            }
            break;
          case 'cat':
            name = name.match(/^hosts.(.+).ip2$/);
            if (! util.isArray(name) || name.length < 2) {
              return('file name error');
            }
            break;
          default:
            return true;
        }
      }
      return true;
    } else if (stat.isDirectory()) {
      return(file + ' is a directory');
    } else {
      return('invalid file');
    }
  } else {
    return('no such hosts file');
  }
}
