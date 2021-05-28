'use strict';

const Controller = require("./base");

class ApisController extends Controller {
    async editApi() {
        const {
            ctx,
            service: {
                apis,
            },
        } = this;

        const {
            request: { body },
            user: {
                _id
            }
        } = ctx;

        const {
            type = 'outer',
            prodUrl,
            websiteId,
            apiId,
            name,
            index,
        } = body;

        const condition = {
            userId: _id,
            prodUrl,
            websiteId,
            name,
        }
        if (Number(index) === 1) {
            condition.index = Number(index)
        }

        let finalData;

        if (type === 'inner') {
            const {
                betaUrl,
                localUrl,
            } = body;
            condition.betaUrl = betaUrl;
            condition.localUrl = localUrl;
            finalData = await apis.editApi(condition, apiId);
        } else {
            finalData = await apis.editApi(condition, apiId);
        }

        const {
            data,
            status,
            message
        } = finalData;

        this.success({
            data,
            status,
            message
        })
    }
    async deleteApi() {
        const {
            ctx,
            service: {
                apis,
            },
        } = this;

        const {
            request: { body },
        } = ctx;

        const {
            apiId,
            websiteId,
        } = body;

        const { data, status, message } = await apis.deleteApi(apiId);
        let list = await apis.getApis({
            websiteId
        })
        try {
            if (list && list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    await apis.updateIndex({
                        _id: list[i]._id
                    }, {
                        index: i
                    })
                }
            }
        } catch (err) {
            console.log(err)
            this.error({
                status: 500,
                message: '添加索引出错'
            })
        }

        this.success({
            data,
            status,
            message
        })
    }
}

module.exports = ApisController;