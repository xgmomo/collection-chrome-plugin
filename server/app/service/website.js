"use strict";

const Service = require("egg").Service;

class Website extends Service {

    async edit(type, userId, id, options) {
        const { ctx } = this;
        const Website = ctx.model.Website;
        let website;
        if (!id) {
            const condition = {
                type,
                userId,
            }
            if (type === 'inner') {
                condition.name = '内部网址';
            } else {
                condition.name = '自定义网址';
            }
            website = await Website.create(condition);
            return {
                data: website,
                status: 200,
                message: "创建成功",
            };
        }
        website = await Website.findOneAndUpdate({
            _id: id
        }, {
            name: options.name
        })

        return {
            data: website,
            status: 200,
            message: "创建成功",
        };
    }
    async delete(_id) {
        const { ctx } = this;
        const Website = ctx.model.Website;
        const data = await Website.findByIdAndDelete({
            _id
        });
        return {
            data,
            status: 200,
            message: "删除成功",
        };
    }
    async get(condition) {
        const { ctx } = this;
        const Website = ctx.model.Website;
        const data = await Website.find(condition);

        return {
            data,
            status: 200,
            message: "创建成功",
        };
    }
}

module.exports = Website;