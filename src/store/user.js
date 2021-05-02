import axios from 'axios';

const userModule = {
    namespaced: true,
    state: () => {
        return {
            _id: '', // 用户id
        }
    },
    mutations: {
        setId(state, _id) {
            state._id = _id;
        }
    },
    actions: {
        login({ commit }, params) {
            return axios.post('/user/login', params).then((res) => {
                const {
                    data = {}
                } = res;
                const {
                    _id
                } = data;
                commit('setId', _id);
                return res;
            })
        }
    }
}

export default userModule