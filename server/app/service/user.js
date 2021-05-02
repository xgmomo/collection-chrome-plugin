"use strict";

const Service = require("egg").Service;

class User extends Service {
    // 登录
    async login(condition) {
        const { ctx, service } = this;
        const { password: _password, userName } = condition;

        const Users = ctx.model.User;
        const user = await Users.findOne({ userName });

        if (user) {
            const { password } = user;
            // 比较密码是否相同 _password：用户输入的密码
            const verifyPwd = await ctx.compare(_password, password);
            if (verifyPwd) {
                // 获取用户，生成 token
                const token = await service.token.generateToken({
                    _id: user._id,
                    account: condition,
                });
                const data = {
                    token,
                    _id: user._id,
                };

                return {
                    data,
                    status: 200,
                    message: "登录成功",
                };
            }
            return {
                data: null,
                status: 4001,
                message: "密码错误",
            };
        } else {
            return this.register(condition);
        }
    }
    // 注册
    async register(params) {
        const { ctx, service } = this;
        const { userName, password } = params;

        // 如果用户已经存在，就不需要重新注册了
        const Users = ctx.model.User;
        let user = await Users.findOne({
            userName,
        });

        if (user && user.length > 0) {
            ctx.throw(400, "用户已经存在");
            return;
        }

        // 密码加密
        const newPassword = await ctx.genHash(password);
        user = await Users.create({
            ...params,
            password: newPassword,
        });

        const token = await service.token.generateToken({
            _id: user._id,
            account: params,
        });

        const data = {
            token,
            _id: user._id,
        };

        return {
            data,
            status: 200,
            message: "注册成功",
        };
    }
    // 权限校验
    async generateToken(data) {
        const { ctx } = this;
        return ctx.app.jwt.sign(
            {
                data,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
            },
            ctx.app.config.jwt.secret
        );
    }
}

module.exports = User;