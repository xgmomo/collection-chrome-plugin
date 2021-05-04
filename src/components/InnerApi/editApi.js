import { ElMessage } from "element-plus";
import {
    apiIdObj,
    handleModal,
} from "/@/minComponents/InnerApiEditModal/modalVisible";

export const editApi = async (store, formValues, get) => {
    const {
        name,
        prodUrl,
        betaUrl,
        localUrl,
    } = formValues;
    const condition = {
        name,
        prodUrl,
        betaUrl,
        localUrl,
        type:'inner' // 新增内部网址
    }
    if (apiIdObj && apiIdObj._id) {
        condition.apiId = apiIdObj._id;
    }
    if (apiIdObj && apiIdObj.websiteId) {
        condition.websiteId = apiIdObj.websiteId;
    }
    const editApiAxios = () => {
        return store.dispatch('apisModule/editApi', condition);
    }
    let res = await editApiAxios();
    handleModal(false);
    ElMessage({
        message: res.message,
        type: "success",
    });
    await get();
}

export const deleteApi = async (store, _id, get) => {
    const deleteApiAxios = () => {
        return store.dispatch('apisModule/deleteApi', {
            apiId: _id
        });
    }
    let res = await deleteApiAxios();
    ElMessage({
        message: res.message,
        type: "success",
    });
    await get();
}