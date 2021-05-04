'use strict';

module.exports = (app) => {
    const { controller, router, middleware } = app;
    const adminAuth = middleware.auth(); // 登录控制
    const _router = router.namespace("/api/apis/"); // 接口命名 空间

    const { apis } = controller;

    _router.post("editApi", adminAuth, apis.editApi);
    _router.post("deleteApi", adminAuth, apis.deleteApi);
};