/**
 * Created by xialeistudio on 2015/12/28.
 */

var bpush = require('../lib/bpush')
    , constant = require('../common/constant')
    , _ = require('underscore');
require('should');

describe('bpush.js', function () {
    it('should return a object that contain request_id', function (done) {
        bpush.setConfig('ak','百度推送ak');
        bpush.setConfig('sk','百度推送sk');
        bpush.setConfig('deploy_status',constant.DEPLOY_STATUS.DEVELOPMENT);
        var data = {
            channel_id: '5247517738736986629',
            msg: JSON.stringify({
                aps: {
                    alert: 'hello, this message from baidu push service'
                }
            }),
            msg_type:constant.MSG_TYPE.NOTIFICATION,
            deploy_status:constant.DEPLOY_STATUS.DEVELOPMENT,
            device_type:constant.DEVICE_TYPE.IOS
        };
        bpush.sendRequest(bpush.apis.pushMsgToSingleDevice,data).then(function (data) {
            data = JSON.parse(data);
            data.should.have.property('response_params');
            done();
        }).catch(done);
    });
});