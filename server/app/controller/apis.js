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
        } = body;

        const condition = {
            userId: _id,
            prodUrl,
            websiteId,
            name,
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
            apiId
        } = body;

        const { data, status, message } = await apis.deleteApi(apiId);

        this.success({
            data, 
            status,
            message
        })
    }
}

module.exports = ApisController;