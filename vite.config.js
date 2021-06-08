import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default (_) =>
  defineConfig({
    open: false,
    base: "./",
    build: {
      assetsInlineLimit: "1000000", // 不让woff字体类文件单独打出来
      chunkSizeWarningLimit: '1000', // 设置单文件 超过1M警告
      rollupOptions: { // 多页面打包配置
        input: {
          background: resolve(__dirname, "background.html"),
          main: resolve(__dirname, "main.html"),
        },
        output: { // 输入的文件格式
          assetFileNames: "static/css/[name].css",
          chunkFileNames: "static/js/[name].js",
          entryFileNames: "static/js/[name].js",
        },
      },
    },
    resolve: {
      alias: { // alias
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
    ],
    server: {
      proxy: {
        "/api": {
          target: "",
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
      },
    },
  });
