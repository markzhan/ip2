var ip2 = require('../');
var should = require('should');

//ip2.ip.localip().should.not.have.length(0);
ip2.ip.localip().should.be.an.Array.and.should.not.have.length(0);
