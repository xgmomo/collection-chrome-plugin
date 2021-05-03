'use strict';

module.exports = (app) => {
    const { controller, router, middleware } = app;
    const adminAuth = middleware.auth(); // 登录控制
    const _router = router.namespace("/api/website/"); // 接口命名 空间

    const { website } = controller;

    _router.post("edit", adminAuth, website.edit);
    _router.post("delete", adminAuth, website.delete);
    _router.post("get", adminAuth, website.get);
};