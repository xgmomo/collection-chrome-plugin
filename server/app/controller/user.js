'use strict';

const Controller = require("./base");

class LoginController extends Controller {
    async login() {
        const {
            ctx,
            service: {
                user,
            },
        } = this;

        const {
            request: { body },
        } = ctx;

        const { data, status, message } = await user.login(body);

        this.success({
            data,
            status,
            message,
        });
    }
}

module.exports = LoginController;
