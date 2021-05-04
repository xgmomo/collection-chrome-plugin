/*
 * @Author: 朱育仪 
 * @Date: 2021-02-24 19:01:37 
 * @Last Modified by: 朱育仪 
 * @Last Modified time: 2021-02-24 19:01:37 
 * @Description: 系统鉴权
 */

'use strict';
module.exports = () => {
    return async function (ctx, next) {
        const { app, helper } = ctx;
        const { jwt, config } = app;

        const token = helper.getQueryToken(ctx);

        try {
            if (token) {
                //  jwt return obj
                //  { data: {_id:xxx,roles:['xxxx'],account:[]}, exp: 1578728991, iat: 1578124191 }
                const { data, exp } = await jwt.verify(token, config.jwt.secret);
                if (data) {
                    // console.log('data', data)
                    if (exp * 1000 - helper.nowTimestamp() > 0) {
                        ctx.user = data;
                        await next();
                    } else {
                        ctx.helper.ctxJSON({ ctx, status: 401 });
                    }
                }
            } else {
                ctx.helper.ctxJSON({ ctx, status: 401 });
            }
            // console.log("---token verify--->", data);
        } catch (err) {
            ctx.logger.info(
                'token verify Error 111111111111111111111111',
                err.message
            );
            ctx.helper.ctxJSON({ ctx, status: 500 })
            ctx.logger.info('token verify Error', err.message);
            // ctx.helper.ctxJSON({ctx, status: 500});
        }
    };
};