import axios from 'axios';
import { ElMessage } from 'element-plus';

const ENV = import.meta.env.VITE_APP_ENV;

const setAxios = () => {
    const default_url = ENV === 'production' ? 'http://www.zhuyuyi.cn:7001/api' : 'http://localhost:7001/api'

    // 对axios进行二次封装
    // 设置默认URL
    axios.defaults.baseURL = default_url;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    axios.defaults.headers['x-auth-token'] = window.localStorage.collectionChromeToken || '';
    axios.defaults.timeout = 20000;

    // 设置请求拦截器
    axios.interceptors.request.use(
        config => {
            config.transformRequest = [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // 设置相应拦截器
    axios.interceptors.response.use(
        function (response) {
            let response_data = response.data || {};
            let success_status_list = [200, '200'];

            if ('status' in response_data) {
                // 请求的数据没异常
                if (success_status_list.indexOf(response_data.status) > -1) {
                    return response_data;
                } else {
                    ElMessage({
                        message: response_data.message,
                        type: 'error',
                    });
                    return Promise.reject(response_data.message);
                }
            } else {
                return response_data;
            }
        },
        error => {
            ElMessage({
                message: error.message,
                type: 'error'
            });
            return Promise.reject(error);
        }
    );
}

export default setAxios