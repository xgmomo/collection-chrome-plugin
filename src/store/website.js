import axios from 'axios';

const userModule = {
    namespaced: true,
    state: () => {
        return {
            data: {
                inner: {
                    name: '内部网址',
                    apis: []
                },
                outer: [
                    {
                        name: '自定义网址',
                        apis: []
                    }
                ]
            }, // 网址导航数据
        }
    },
    mutations: {
        setData(state, data) {
            state.data = data;
        }
    },
    actions: {
        getWebsiteList({ commit }, params) {
            return axios.post('/website/get', params).then((res) => {
                const {
                    data = []
                } = res;

                let inner = {};
                let outer = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (!item.apis) {
                        item.apis = []
                    }
                    if (item.type === 'inner') {
                        inner = item;
                    } else {
                        outer.push(item)
                    }
                }
                console.log(outer)
                commit('setData', { inner, outer });
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

export default userModule