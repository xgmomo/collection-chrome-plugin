'use strict';

const Controller = require("./base");

class WebsiteController extends Controller {
    async edit() {
        const {
            ctx,
            service: {
                website,
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
            name,
            _id: websiteId
        } = body;

        const { data, status, message } = await website.edit(type, _id, websiteId,{
            name
        });

        this.success({
            data,
            status,
            message,
        });
    }
    async delete() {
        const {
            ctx,
            service: {
                website,
            },
        } = this;
        const {
            request: { body },
        } = ctx;

        const { data, status, message } = await website.delete(body._id);

        this.success({
            data,
            status,
            message,
        });
    }
    async get() {
        const {
            ctx,
            service: {
                website,
            },
        } = this;
        const {
            request: { body },
            user: { _id },
        } = ctx;

        const { data, status, message } = await website.get({ ...body, userId: _id });

        this.success({
            data,
            status,
            message,
        });
    }
}

module.exports = WebsiteController;
