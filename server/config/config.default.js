'use strict';

const path = require("path");
const momentZHFuc = require("./../app/utils/utils");

module.exports = appInfo => {

  const config = exports = {};

  config.appName = "collection-chrome-plugin-backend";

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1619946920851_843';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.mongoose = {
    dbName: `${config.appName}`,
    host: "127.0.0.1",
    port: "27017",
    backupFolder: path.join(appInfo.baseDir, "database/mongodb"),
    url: `mongodb://127.0.0.1/${config.appName}`,
    options: {
      useFindAndModify: false,
      useUnifiedTopology: true
    },
  };

  momentZHFuc.setZH(); // 设置moment中文

  // socket.io
  config.io = {
    init: {
    }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  }

  return {
    ...config,
  };
};
