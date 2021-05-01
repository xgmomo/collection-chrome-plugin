<template>
  <div class="outer_api_container" v-for="dataItem in data" :key="dataItem.id">
    <div class="api_title">
      {{ dataItem.title }}
      <el-popconfirm
        title="是否删除？"
        confirmButtonText="确定"
        cancelButtonText="取消"
        @confirm="() => {delModule(dataItem.id)}"
      >
        <template #reference>
          <i class="el-icon-delete" />
        </template>
      </el-popconfirm>
      <div
        class="plus_custom_btn"
        title="新增自定义网址模块"
        @click="
          () => {
            handleModal(true);
          }
        "
      >
        +
      </div>
    </div>
    <div class="api_container">
      <div
        class="api_item_container"
        v-for="api in dataItem.apis"
        :key="api.id"
      >
        <div class="api_item_body">
          <div class="api_item_body_title">{{ api.name }}</div>
          <div class="api_item_body_icons">
            <i class="el-icon-edit" />
            <el-popconfirm
              title="是否删除？"
              confirmButtonText="确定"
              cancelButtonText="取消"
            >
              <template #reference>
                <i class="el-icon-delete" />
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
      <div class="api_item_container plus_item_container">
        <div class="api_item_body plus_item">+</div>
      </div>
    </div>
  </div>
  <ConfirmModal
    :handleModal="handleModal"
    :visible="visible"
    :content="'是否要添加自定义网址模块？'"
    :onOk="addModule"
  />
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import ConfirmModal from "/@/minComponents/ConfirmModal/index.vue";

export default {
  components: {
    ConfirmModal,
  },
  props: {
    data: Array,
  },
  setup(props) {
    // 弹框
    const modalVisible = reactive({
      visible: false,
    });
    // 弹框显示隐藏
    const handleModal = (isShow) => {
      modalVisible.visible = isShow;
    };
    // 添加网址模块弹框中
    const addModule = () => {
      handleModal(false);
    };
    // 删除网址模块
    const delModule = (id) => {
      console.log(id)
    };

    return {
      handleModal,
      addModule,
      delModule,
      ...toRefs(modalVisible),
    };
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
