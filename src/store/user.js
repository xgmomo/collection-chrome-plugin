import axios from 'axios';

const userModule = {
    namespaced: true,
    state: () => {
        return {
            _id: '', // 用户id
            userName: '', // 用户名
        }
    },
    mutations: {
        setId(state, _id) {
            state._id = _id;
        },
        setUserInfo(state, userName) {
            state.userName = userName;
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
                commit('setUserInfo', params.userName)
                return res;
            })
        }
    }
}

export default userModule