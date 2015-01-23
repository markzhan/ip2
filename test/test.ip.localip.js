var ip = require('../lib/ip');
var should = require('should');

ip.localip().should.be.an.Array.and.should.not.have.length(0);
