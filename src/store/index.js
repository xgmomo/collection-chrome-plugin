import { createStore } from 'vuex';
import userModule from './user';
import websiteModule from './website';

const store = createStore({
    modules: {
        userModule,
        websiteModule,
    }
})

export default store;