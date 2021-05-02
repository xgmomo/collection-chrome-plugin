/*
 * @Author: 朱育仪 
 * @Date: 2021-01-22 14:25:02 
 * @Last Modified by: 朱育仪 
 * @Last Modified time: 2021-01-22 14:25:02 
 */

'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    /**
     * 正确返回请求json
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    async success({data = null, status = 200, message}) {
        const {ctx} = this;
        ctx.helper.ctxJSON({ctx, data, status, message});
    }

    async error({data = null, status = 400, message}) {
        const {ctx} = this;
        ctx.helper.ctxJSON({ctx, data, status, message});
    }
}

module.exports = BaseController;