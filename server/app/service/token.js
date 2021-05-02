/*
 * @Author: 朱育仪 
 * @Date: 2021-02-22 15:55:39 
 * @Last Modified by: 朱育仪 
 * @Last Modified time: 2021-02-22 15:55:39 
 * @Description: token
 */

'use strict';

const Service = require('egg').Service;

class TokenService extends Service {
    /**
     * 将用户信息写入token
     * @param  {obj} data {
     *   id:123
     * }
     * @return {obj}  {
     *   data:{},
     *   exp: 过期时间
     * }
     */
    async generateToken(data) {
        const {ctx} = this;
        return ctx.app.jwt.sign(
            {
                data,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
            },
            ctx.app.config.jwt.secret
        );
    }
}

module.exports = TokenService;