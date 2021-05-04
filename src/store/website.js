import axios from 'axios';

const websiteModule = {
    namespaced: true,
    state: () => {
        return {
            list: [], // 原始数据
            // data: {
            //     inner: {
            //         name: '内部网址',
            //         apis: []
            //     },
            //     outer: [
            //         {
            //             name: '自定义网址',
            //             apis: []
            //         }
            //     ]
            // }, // 网址导航数据 示例
        }
    },
    mutations: {
        setData(state, data) {
            state.list = data;
        }
    },
    getters: {
        filterList: state => {
            let inner = {};
            let outer = [];
            for (let i = 0; i < state.list.length; i++) {
                const item = state.list[i];
                if (!item.apis) {
                    item.apis = []
                }
                if (item.type === 'inner') {
                    inner = item;
                } else {
                    outer.push(item)
                }
            }
            console.log(inner,'inner')
            return {
                inner,
                outer,
            }
        }
    },
    actions: {
        getWebsiteList({ commit }, params) {
            return axios.post('/website/get', params).then((res) => {
                const {
                    data = []
                } = res;


                commit('setData', data);
                return res;
            })
        },
        // 新增网址模块
        addCustomWebsite({ commit }, params) {
            return axios.post('/website/edit', params).then((res) => {
                return res;
            })
        },
        // 删除
        deleteCustomWebsite({ commit }, params) {
            return axios.post('/website/delete', params).then((res) => {
                return res;
            })
        }
    }
}

export default websiteModule