import axios from 'axios';

const apisModule = {
    namespaced: true,
    state: () => {
        return {

        }
    },
    mutations: {
        
    },
    actions: {
        // 新增编辑网址
        editApi({ commit }, params) {
            return axios.post('/apis/editApi', params).then((res) => {
                return res;
            })
        },
        // 删除
        deleteApi({ commit }, params) {
            return axios.post('/apis/deleteApi', params).then((res) => {
                return res;
            })
        }
    }
}

export default apisModule