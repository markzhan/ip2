'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var util = require('util');

exports.list = function() {
  var files = fs.readdirSync(path.dirname(oshosts()));
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

exports.add = function(from) {
  var ret = checkfile(from);
  if (ret === true) {
    var name = path.basename(from, path.extname(from));
    var to = ip2file(name);
    if (! fs.existsSync(to)) {
      fs.writeFileSync(to, fs.readFileSync(from, {encoding: 'utf8'}));
      //fs.createReadStream(from).pipe(fs.createWriteStream(to));
      return true;
    } else {
      return name + ' exists';
    }
  } else {
    return ret;
  }
}

exports.use = function(name) {
  var from = ip2file(name);
  var ret = checkfile(from);
  if (ret === true) {
    try {
      clearmark();
      var osh = oshosts();
      var osh2 = osh + '.ip2'
      if (! fs.existsSync(osh2)) {
        fs.writeFileSync(osh2, fs.readFileSync(osh, {encoding: 'utf8'}));
      }
      fs.writeFileSync(osh, fs.readFileSync(from, {encoding: 'utf8'}));
      fs.renameSync(from, ip2mark(name));
      return true;
    }
    catch (e) {
      throw e;
    }
  } else {
    return ret;
  }
}

exports.del = function(name) {
  try {
    fs.unlinkSync(ip2file(name));
  }
  catch (e) {}
}

exports.reload = function() {
  try {
    var to = oshosts();
    var from = markfile();
    fs.writeFileSync(to, fs.readFileSync(from, {encoding: 'utf8'}));
  }
  catch (e) {}
}

exports.reset = function() {
  try {
    var to = oshosts();
    var from = to + '.ip2'
    fs.writeFileSync(to, fs.readFileSync(from, {encoding: 'utf8'}));
    clearmark();
  }
  catch (e) {throw e}
}


function oshosts() {
  if (os.platform().substr(0,3) == 'win') {
    return process.env.windir + '\\System32\\drivers\\etc\\hosts';
  } else {
    return '/etc/hosts';
  }
}

function ip2file(name) {
  return oshosts() + '.' + name + '.ip2';
}

function ip2mark(name) {
  return oshosts() + '.__' + name + '.ip2';
}

function checkfile(file) {
  if (fs.existsSync(file)) {
    var stat = fs.statSync(file);
    if (stat.isFile()) {
      if (stat.size > 0 && stat.size < (500 * 1024)) {
        return true;
      } else {
        return 'File size not match';
      }
    } else {
      return 'Invalid file';
    }
  } else {
    return 'File not exists';
  }
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
    var to = file.replace('__', '');
    fs.renameSync(file, to);
    //console.log(file, to);
  }
}
