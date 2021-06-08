import { ElMessage } from "element-plus";
import { apiIdObj } from '@/pages/main/minComponents/OuterApiEditModal/modalVisible';
import {
    handleModal,
} from "@/pages/main/minComponents/OuterApiEditModal/modalVisible";

export const editApi = async (store, name, prodUrl, get) => {
    const condition = {
        name,
        prodUrl,
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

export const deleteApi = async (store, _id, get, others) => {
    const deleteApiAxios = () => {
        return store.dispatch('apisModule/deleteApi', {
            apiId: _id,
            websiteId: others.websiteId,
        });
    }
    let res = await deleteApiAxios();
    ElMessage({
        message: res.message,
        type: "success",
    });
    await get();
}
