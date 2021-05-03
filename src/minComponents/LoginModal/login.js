import { reactive } from 'vue';
import { ElMessage } from 'element-plus'

export const checkUserName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("用户名不能为空"));
    }
    callback()
};
export const validatePassword = (rule, value, callback) => {
    if (!value || value === "") {
        callback(new Error("请输入密码"));
    }
    callback()
};

// 登录form规则
export const rules = reactive({
    userName: [{ validator: checkUserName, trigger: "blur" }],
    password: [{ validator: validatePassword, trigger: "blur" }],
});

// 登录
export const login = (userName, password, store) => {
    store.dispatch('userModule/login', {
        userName,
        password
    }).then((res) => {
        const {
            message,
            data = {}
        } = res;
        const {
            token,
        } = data;

        localStorage.collectionChromeToken = token;
        localStorage.userName = userName;

        store.dispatch("websiteModule/getWebsiteList");

        ElMessage.success({
            message,
            type: 'success'
        });
    })
}
