import axios from 'axios';
import setAxios from '@/pages/main/axios';

setAxios();

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