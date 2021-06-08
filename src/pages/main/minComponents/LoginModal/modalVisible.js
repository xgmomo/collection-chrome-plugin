import { reactive } from "vue";

// 弹框
export const modalVisible = reactive({
    visible: false,
});
// 弹框显示隐藏
export const handleModal = (isShow) => {
    modalVisible.visible = isShow;
};