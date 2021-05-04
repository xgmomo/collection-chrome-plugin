import { reactive } from "vue";

export const modalVisible = reactive({
    visible: false
})

export const handleModal = (isShow, api) => {
    modalVisible.visible = isShow;
    if (api) {
        apiIdObj = {
            ...api
        }
    }
}

export let apiIdObj = reactive({
    _id: '',
})

