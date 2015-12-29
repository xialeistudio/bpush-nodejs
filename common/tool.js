/**
 * Created by xialeistudio on 15/12/28.
 */
var Promise = require('bluebird')
    , http = require('http')
    , https = require('https')
    , querystring = require('querystring')
    , _ = require('underscore')
    , crypto = require('crypto');
/**
 * HTTP请求
 * @param req 请求
 * @param data POST数据
 * @param isPost 是否POST请求
 * @param isHttps 是否HTTPS请求
 * @returns {Promise}
 */
function httpRequest(req, data, isPost, isHttps) {
    return new Promise(function (resolve, reject) {
        var request = (isHttps ? https : http).request(req, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                return resolve(body);
            });
        });
        request.on('error', function (e) {
            return reject(e);
        });
        if (isPost) {
            request.write(data);
        }
        request.end();
    });
}

/**
 * 兼容PHP urlencode
 * @param str
 * @returns {string}
 */
function fullEncodeURIComponent(str) {
    var rv = encodeURIComponent(str).replace(/[!'()*~]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
    return rv.replace(/\%20/g, '+');
}

/**
 * 对百度推送请求进行签名
 * @param reqParams
 * @param postParams post表单内容
 * @param secretKey 开发者中心的SK
 * @returns {*}
 */
function signBpush(reqParams, postParams, secretKey) {
    var basekey;
    var method = reqParams.method.toUpperCase();
    var baseurl = 'https://' + reqParams.host + reqParams.path;
    var query = reqParams.query || false;
    var param = {};
    var paramStr = '';

    if (query) {
        query = querystring.parse(query);
        _.mapObject(query, function (value, key) {
            param[key] = value;
        });
    }

    if (postParams) {
        _.mapObject(postParams, function (value, key) {
            param[key] = value;
        });
    }

    var keys = Object.keys(param).sort();

    keys.forEach(function (key) {
        paramStr += key + "=" + param[key];
    });

    basekey = method + baseurl + paramStr + secretKey;


    var md5 = crypto.createHash('md5');

    basekey = fullEncodeURIComponent(basekey);

    md5.update(basekey);

    return md5.digest('hex');
}

exports.httpRequest = httpRequest;
exports.fullEncodeURIComponent = fullEncodeURIComponent;
exports.signBpush = signBpush;