import { reactive } from 'vue';

export const modalVisible = reactive({
    visible: false
});

export const websiteId = reactive({
    _id: '',
    name: '',
})

export const handleModal = (isShow, id, name) => {
    modalVisible.visible = isShow;
    if (id) {
        websiteId._id = id;
        websiteId.name = name;
    }
}
