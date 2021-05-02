'use strict';

module.exports = (app) => {
  const { controller, router } = app;
  const userRouter = router.namespace("/api/user/"); // 接口命名 空间

  const { user } = controller;

  userRouter.post("login", user.login); // 登录
};

