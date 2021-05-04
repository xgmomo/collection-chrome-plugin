"use strict";

const Service = require("egg").Service;

class Apis extends Service {
    // 新增和编辑
    async editApi(condition, _id) {
        const { ctx } = this;
        const Apis = ctx.model.Apis;
        let apiData;

        if (_id) {
            apiData = await Apis.findByIdAndUpdate({
                _id
            }, condition)
        } else {
            let apis = await this.getApis({
                websiteId: condition.websiteId
            });
            let length = 0 
            if(apis){
                length = apis.length;
            }

            apiData = await Apis.create({
                ...condition,
                index: length
            })
        }

        return {
            data: apiData,
            status: 200,
            message: '操作成功'
        }
    }
    // 删除一个网址
    async deleteApi(_id) {
        const { ctx } = this;
        const Apis = ctx.model.Apis;
        const data = await Apis.findByIdAndDelete({
            _id
        })
        return {
            data,
            status: 200,
            message: '删除成功'
        }
    }
    // 获取
    async getApis(condition) {
        const { ctx } = this;
        const Apis = ctx.model.Apis;
        const data = await Apis.find(condition);
        return data;
    }
}

module.exports = Apis