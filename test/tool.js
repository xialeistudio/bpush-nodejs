/**
 * Created by xialeistudio on 15/12/28.
 */
var tool = require('../common/tool');
require('should');

describe('tool', function () {
    it('httpRequest should return string', function (done) {
        var req = {
            host:'www.baidu.com',
            path:'/'
        };
        tool.httpRequest(req,null,false,true).then(function (data) {
            data.should.be.a.String();
            done();
        }).catch(done);
    });
    it('fullEncodeURIComponent should return encoded string', function () {
        tool.fullEncodeURIComponent('http://www.baidu.com?name=夏磊').should.be.equal('http%3A%2F%2Fwww.baidu.com%3Fname%3D%E5%A4%8F%E7%A3%8A');
    });
});