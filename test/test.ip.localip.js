var ip2 = require('../');
var should = require('should');

ip2.info.localip().should.be.an.Array.and.should.not.have.length(0);
