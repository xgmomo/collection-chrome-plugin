import { ElMessage } from "element-plus";
import {
    websiteId,
    handleModal,
} from '/@/minComponents/ChangeWebsiteNameModal/visible';

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
