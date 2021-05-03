import { reactive } from 'vue';
import { ElMessage } from "element-plus";

export const modalVisible = reactive({
    visible: false
});

const websiteId = reactive({
    _id: ''
})

export const handleModal = (isShow, id) => {
    modalVisible.visible = isShow;
    if (id) {
        websiteId._id = id;
    }
}

// 修改名称
export const changeName = async (store, name) => {
    const change = () => {
        return store.dispatch('websiteModule/addCustomWebsite', { name, _id: websiteId._id })
    }
    const res = await change();
    ElMessage({
        message: res.message,
        type: "success",
    });
    handleModal(false);

    await store.dispatch('websiteModule/getWebsiteList');
}
