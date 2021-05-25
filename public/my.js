let default_url = 'http://www.zhuyuyi.cn:7000/api' // : 'http://localhost:7001/api'
// let default_url = 'http://localhost:7001/api' // : 'http://localhost:7001/api'

axios.defaults.baseURL = default_url;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
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

function save(params, api) {
    if (localStorage.collectionChromeToken) {
        let apiObj = {
            name: api.title,
            prodUrl: api.url,
            index: 1, // 代表是第一个outer
            type: 'outer'
        };
        axios.post('/apis/editApi', apiObj, {
            headers: {
                'x-auth-token': localStorage.collectionChromeToken
            }
        }).then((response) => {
            alert('收藏成功')
            console.log(response);
        }).catch((err) => {
            alert('收藏报错')
            console.log(err)
        })
    } else {
        alert('亲，先登录插件再收藏哟^_^');
    }
}
// 收藏网址
let saveApi = chrome.contextMenus.create({
    'title': '收藏该网址',
    'onclick': save,
    'documentUrlPatterns': ['http://*/*', 'https://*/*']
});