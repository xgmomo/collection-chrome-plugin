import { reactive } from 'vue';

export const checkName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("名称不能为空"));
    }
    callback()
};

export const checkApi = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("网址不能为空"));
    }
    callback()
};

// 登录form规则
export const rules = reactive({
    name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
    prodUrl: [{ required: true, message: '网址不能为空', trigger: 'blur' }],
    betaUrl: [{ required: true, message: '网址不能为空', trigger: 'blur' }],
    localUrl: [{ required: true, message: '网址不能为空', trigger: 'blur' }]
});
