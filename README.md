[![Build Status](https://api.travis-ci.org/markzhan/ip2.svg)](http://travis-ci.org/markzhan/ip2)
[![NPM Version](http://img.shields.io/npm/v/ip2.svg?style=flat)](https://www.npmjs.org/package/ip2)
[![NPM Downloads](https://img.shields.io/npm/dm/ip2.svg?style=flat)](https://www.npmjs.org/package/ip2)

# ip2

Another ip address & hosts tools

## Installation
```
$ npm install -g ip2
# or mac
$ sudo npm i -g ip2
```

## Example
```
$ ip2 ls
$ ip2 -li
$ sudo ip2 add abc.txt
$ sudo ip2 use abc
```

## Usage
```
Usage: ip2 [options] [command]

  Commands:

    ls              list all hosts
    add <path>      add one custom hosts file
    use <hosts>     change system hosts to hosts
    del <hosts>     delete one custom hosts file
    reload          reload used hosts
    reset           reset hosts
    help            print help

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -v, --version   get version
    -l, --local     output local ip
    -i, --internet  output internet ip
```

## Hosts file

* [alsohosts](https://github.com/alsotang/alsohosts)
* [smarthosts](https://code.google.com/p/smarthosts/)
* [google hosts](http://code.google.com/p/googlehosts/)
* [google-hosts](https://github.com/txthinking/google-hosts)
* [williamlong](http://www.williamlong.info/archives/3983.html)

## License

This project is available under the MIT license. See LICENSE for details.
