import { reactive } from 'vue';

export const checkName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("名称不能为空"));
    }
    callback()
};

// 登录form规则
export const rules = reactive({
    // name: [{ validator: checkName, trigger: "blur" }],
    name:[{ required: true, message: '名称不能为空', trigger: 'blur' },]
});
