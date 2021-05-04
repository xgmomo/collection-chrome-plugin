import { createStore } from 'vuex';
import userModule from './user';
import websiteModule from './website';
import apisModule from './apis';

const store = createStore({
    state: {
        loading: false
    },
    modules: {
        userModule,
        websiteModule,
        apisModule,
    }
})

store.subscribeAction({
    before: (action, state) => {
        state.loading = true;
        // console.log(`before action ${action.type}`)
    },
    after: (action, state) => {
        state.loading = false;
        // console.log(`after action ${action.type}`)
    }
})

export default store;