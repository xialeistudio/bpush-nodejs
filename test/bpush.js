/**
 * Created by xialeistudio on 2015/12/28.
 */

var bpush = require('../lib/bpush')
    , constant = require('../common/constant')
    , _ = require('underscore');
require('should');

bpush.config.ak = '百度推送ak';
bpush.config.sk = '百度推送sk';
describe('bpush.js', function () {
    var msgIds = [];
    it.only('[pushSingleDevice] should have property response_params.msg_id', function (done) {
        var data = {
            channel_id: '5247517738736986629',
            msg: JSON.stringify({
                aps: {
                    alert: '你是呵呵SINGLE'
                }
            }),
            msg_type: constant.MSG_TYPE.NOTIFICATION,
            deploy_status: constant.DEPLOY_STATUS.DEVELOPMENT,
            device_type: constant.DEVICE_TYPE.IOS
        };
        bpush.sendRequest(bpush.apis.pushMsgToSingleDevice, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('msg_id');
            console.log('msgId:' + params.msg_id);
            done();
        }).catch(done);
    });
    it('[pushAll]  should have property response_params.msg_id', function (done) {
        var data = {
            msg: JSON.stringify({
                aps: {
                    alert: '你是呵呵ALL'
                }
            }),
            msg_type: constant.MSG_TYPE.NOTIFICATION,
            deploy_status: constant.DEPLOY_STATUS.DEVELOPMENT,
            device_type: constant.DEVICE_TYPE.IOS
        };
        bpush.sendRequest(bpush.apis.pushMsgToAll, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('msg_id');
            console.log('msgId:' + params.msg_id);
            done();
        }).catch(done);
    });
    it('[pushTag] should have property response_params.msg_id', function (done) {
        var data = {
            msg: JSON.stringify({
                aps: {
                    alert: '你是呵呵TAG'
                }
            }),
            type: 1,
            tag: 'test',
            msg_type: constant.MSG_TYPE.NOTIFICATION,
            deploy_status: constant.DEPLOY_STATUS.DEVELOPMENT,
            device_type: constant.DEVICE_TYPE.IOS
        };
        bpush.sendRequest(bpush.apis.pushMsgToTag, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('msg_id');
            console.log('msgId:' + params.msg_id);
            done();
        }).catch(done);
    });
    it('[queryMsgStatus] should have property response_params.total_num', function (done) {
        var data = {
            msg_id: '1941363116520998932'
        };
        bpush.sendRequest(bpush.apis.queryMsgStatus, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('total_num');
            done();
        }).catch(done);
    });
    it('[queryTags]  should have property response_params.total_num', function (done) {
        var data = {};
        bpush.sendRequest(bpush.apis.queryTags, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('total_num');
            done();
        }).catch(done);
    });

    it('[createTag]  should have property response_params.tag', function (done) {
        var data = {
            tag: 'testtag'
        };
        bpush.sendRequest(bpush.apis.createTag, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('tag');
            done();
        }).catch(done);
    });
    it('[deleteTag] should have property response_params.tag', function (done) {
        var data = {
            tag: 'testtag'
        };
        bpush.sendRequest(bpush.apis.deleteTag, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('tag');
            done();
        }).catch(done);
    });
    it('[addDevicesToTag] should have property response_params.result', function (done) {
        var data = {
            tag: 'testtag',
            channel_ids: JSON.stringify([5247517738736986629])
        };
        bpush.sendRequest(bpush.apis.addDevicesToTag, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('result');
            done();
        }).catch(done);
    });
    it('[removeDevicesFromTag] should have property response_params.result', function (done) {
        var data = {
            tag: 'testtag',
            channel_ids: JSON.stringify([5247517738736986629])
        };
        bpush.sendRequest(bpush.apis.removeDevicesFromTag, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('result');
            done();
        }).catch(done);
    });
    it('[deviceNumInTag] should have property response_params.device_num', function (done) {
        var data = {
            tag: 'testtag'
        };
        bpush.sendRequest(bpush.apis.deviceNumInTag, data).then(function (data) {
            console.log(data);
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('device_num');
            done();
        }).catch(done);
    });
    it('[reportStaticDevice] should have property response_params.total_num', function (done) {
        var data = {
        };
        bpush.sendRequest(bpush.apis.reportStaticDevice, data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            var params = data.response_params;
            params.should.have.property('total_num');
            done();
        }).catch(done);
    });

});