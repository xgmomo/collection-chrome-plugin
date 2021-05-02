import { createStore } from 'vuex';
import userModule from './user';

const store = createStore({
    modules: {
        userModule
    }
})

export default store;