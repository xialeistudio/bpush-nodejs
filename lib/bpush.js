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
    , _ = require('underscore');

var apiMapping = {
    pushMsgToSingleDevice: {
        url: '/push/single_device',
        required: ['channel_id', 'msg']
    }
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
    if (apiMapping[api] === undefined) {
        return Promise.reject(new Error('api不存在,请检查'));
    }
    //参数检测
    var isValid = _.every(apiMapping[api].required, function (key) {
        return params[key] !== undefined;
    });
    if (!isValid) {
        return Promise.reject(new Error('缺少请求参数'));
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

/**
 * 配置
 * @param key
 * @param value
 */
function setConfig(key, value) {
    config[key] = value;
}
exports.sendRequest = sendRequest;
exports.setConfig = setConfig;
exports.apis = {
    pushMsgToSingleDevice: 'pushMsgToSingleDevice'
};