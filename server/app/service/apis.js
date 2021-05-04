"use strict";

const Service = require("egg").Service;
const mongoose = require("mongoose");

class Apis extends Service {
    // 新增和编辑
    async editApi(condition, _id) {
        const {
            ctx,
            service: {
                website,
            },
        } = this;
        const Apis = ctx.model.Apis;
        let apiData;

        if (_id) {
            apiData = await Apis.findByIdAndUpdate({
                _id
            }, condition)
        } else {
            let length = 0
            let apis = [];
            if (condition.index) {
                // 这里表示右键收藏
                let obj = await website.get({
                    userId: condition.userId,
                    index: condition.index
                })
                let _website = obj.data
                if (_website && _website.length > 0) {
                    apis = await this.getApis({
                        websiteId: _website[0]._id
                    });
                    if (apis) {
                        length = apis.length;
                    }
                    console.log(_website[0]._id, '_website[0]._id')
                    apiData = await Apis.create({
                        ...condition,
                        websiteId: _website[0]._id,
                        index: length
                    })
                }
            } else {
                // 这里是手动新增
                apis = await this.getApis({
                    websiteId: condition.websiteId
                });
                if (apis) {
                    length = apis.length;
                }
                apiData = await Apis.create({
                    ...condition,
                    index: length
                })
            }
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