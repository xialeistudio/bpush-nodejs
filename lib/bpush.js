/**
 * Created by xialeistudio on 2015/12/28.
 */
var
    tool = require('../common/tool')
    , config = require('../config')
    , process = require('process')
    , os = require('os')
    , querystring = require('querystring')
    , Promise = require('bluebird')
    , _ = require('underscore')
    , constant = require('../common/constant');

var apiMapping = {
    pushMsgToSingleDevice: {
        url: '/push/single_device',
        required: ['channel_id', 'msg']
    },
    pushMsgToAll: {
        url: '/push/all',
        required: ['msg']
    },
    pushMsgToTag: {
        url: '/push/tags',
        required: ['type', 'tag', 'msg']
    },
    queryMsgStatus: {
        url: '/report/query_msg_status',
        required: ['msg_id']
    },
    queryTags: {
        url: '/app/query_tags',
        required: []
    },
    createTag: {
        url: '/app/create_tag',
        required: ['tag']
    },
    deleteTag: {
        url: '/app/del_tag',
        required: ['tag']
    },
    addDevicesToTag: {
        url: '/tag/add_devices',
        required: ['tag', 'channel_ids']
    },
    removeDevicesFromTag: {
        url: '/tag/del_devices',
        required: ['tag', 'channel_ids']
    },
    deviceNumInTag: {
        url: '/tag/device_num',
        required: ['tag']
    },
    reportStaticDevice: {
        url: '/report/statistic_device',
        required: []
    }
};

var apis = {
    pushMsgToSingleDevice: 'pushMsgToSingleDevice',
    pushMsgToAll: 'pushMsgToAll',
    pushMsgToTag: 'pushMsgToTag',
    queryMsgStatus: 'queryMsgStatus',
    queryTags: 'queryTags',
    createTag: 'createTag',
    deleteTag: 'deleteTag',
    addDevicesToTag: 'addDevicesToTag',
    removeDevicesFromTag: 'removeDevicesFromTag',
    deviceNumInTag: 'deviceNumInTag',
    reportStaticDevice: 'reportStaticDevice'
};

/**
 * 发送请求
 * @param api
 * @param params
 * @param header
 * @param method
 * @returns {*}
 */
function sendRequest(api, params, header, method) {
    //检测api是否存在
    if (apis[api] === undefined) {
        return Promise.reject(new Error('api不存在,请检查'));
    }
    //参数检测
    var invalidField;
    var isValid = _.every(apiMapping[api].required, function (key) {
        if (params[key] === undefined) {
            invalidField = key;
            return false;
        }
        return true;
    });
    if (!isValid) {
        return Promise.reject(new Error('缺少请求参数[' + invalidField + ']'));
    }
    //检查config
    if (!config.ak || !config.sk) {
        return Promise.reject(new Error('请配置百度推送ak&sk'));
    }
    //准备请求
    var req = {
        host: 'api.tuisong.baidu.com',
        path: '/rest/3.0' + apiMapping[api].url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'User-Agent': 'BCCS_SDK/3.0 (' + os.type() + ') node/' + process.version
        },
        method: (method || 'POST').toUpperCase()
    };
    if (header) {
        _.mapObject(header, function (value, key) {
            req.headers[key] = value;
        });
    }
    if (req.method === 'GET') {
        req.path += '?' + querystring.stringify(params);
    }

    params.apikey = config.ak;
    params.timestamp = parseInt((new Date).getTime() / 1000);
    params.sign = tool.signBpush(req, params, config.sk);
    //发送请求
    var post = querystring.stringify(params);
    req.headers['Content-Length'] = post.length;
    return tool.httpRequest(req, post, true, true);
}


exports.sendRequest = sendRequest;
exports.apis = apis;
exports.constant = constant;
exports.config = config;