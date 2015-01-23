[![Build Status](https://api.travis-ci.org/markzhan/ip2.svg)](http://travis-ci.org/markzhan/ip2)
[![NPM Version](http://img.shields.io/npm/v/ip2.svg?style=flat)](https://www.npmjs.org/package/ip2)
[![NPM Downloads](https://img.shields.io/npm/dm/ip2.svg?style=flat)](https://www.npmjs.org/package/ip2)

# ip2

Another ip address & hosts tools.

## Installation
```
$ npm i -g ip2
# or
$ sudo npm i -g ip2
```

## Example
```
$ ip2 -h
$ ip2 info -h
$ ip2 info -li

$ ip2 ls
$ ip2 cat
$ sudo ip2 add google.txt
$ sudo ip2 use google

NOTICE: The sudo is must be used when you operating the hosts file.
```

## Usage
```
Usage: ip2 [options] [command]

  Commands:

    ls [dir]         list hosts
    cat [hosts]      print hosts contents
    add <file|dir>   add custom hosts to system
    use <hosts>      change system hosts to custom hosts
    rm <hosts>       delete one custom hosts file
    reload           reload used hosts
    reset            reset hosts
    init             init hosts
    info [options]   output system & ip info
    help             print help
    *                undefined

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -v, --version   get version number
    -f, --force     overwrite file
```

## Hosts file

* [alsohosts](https://github.com/alsotang/alsohosts)
* [smarthosts](https://code.google.com/p/smarthosts/)
* [google hosts](http://code.google.com/p/googlehosts/)
* [google-hosts](https://github.com/txthinking/google-hosts)
* [williamlong](http://www.williamlong.info/archives/3983.html)

## Release History
See the [CHANGELOG](CHANGELOG.md).

## License

This project is available under the MIT license. See [LICENSE](LICENSE) for details.
