#百度推送NodeJS SDK
##运行前配置
更改 `config.js` 中的ak,sk配置
##api列表
+ pushSingleDevice   
功能:推送单一设备
请求参数:
`
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
`