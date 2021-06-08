import { ElMessage } from "element-plus";

export const addWebsite = async (store, handleModal, get) => {
    const add = () => {
        return store.dispatch("websiteModule/addCustomWebsite");
    };

    let res = await add();
    handleModal(false);
    ElMessage({
        message: res.message,
        type: "success",
    });
    await get();
}

export const deleteWebsite = async (store, _id, get) => {
    const del = () => {
        return store.dispatch("websiteModule/deleteCustomWebsite", { _id });
    };
    let res = await del();
    ElMessage({
        message: res.message,
        type: "success",
    });
    await get();
};
