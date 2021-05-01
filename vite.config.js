const { resolve } = require('path');
import vue from '@vitejs/plugin-vue'

export default {
    plugins: [vue()],
    alias: {
        "/@/": resolve(__dirname, "src"),
    },
    base: './', // 生产环境下的公共路径
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        '/api': {
            target: 'http://127.0.0.1:5001', // 后端服务实际地址
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}