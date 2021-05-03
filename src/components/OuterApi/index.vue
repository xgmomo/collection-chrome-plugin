<template>
  <div
    class="outer_api_container"
    v-for="(dataItem, index) in data"
    :key="dataItem._id"
  >
    <div class="api_title">
      <span
        class="api_title_span"
        @click="
          () => {
            changeNameHandleModal(true, dataItem._id);
          }
        "
      >
        {{ dataItem.name }} {{ index + 1 }}
      </span>
      <el-popconfirm
        v-if="index > 0"
        title="是否删除？"
        confirmButtonText="确定"
        cancelButtonText="取消"
        @confirm="
          () => {
            delModule(dataItem._id);
          }
        "
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
        :key="api._id"
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
  <ChangeWebsiteNameModal
    :handleModal="changeNameHandleModal"
    :visible="changeNameModalVisible"
    :onOk="changeModuleName"
  />
</template>

<script>
import { toRefs } from "vue";
import { useStore } from "vuex";
import ConfirmModal from "/@/minComponents/ConfirmModal/index.vue";
import ChangeWebsiteNameModal from "/@/minComponents/ChangeWebsiteNameModal/index.vue";
import {
  modalVisible,
  handleModal,
} from "/@/minComponents/ConfirmModal/modalVisible";
import { addWebsite, deleteWebsite } from "./addAndDeleteWebsite";
import {
  modalVisible as changeNameModalVisible,
  handleModal as changeNameHandleModal,
  changeName,
} from "./editWebsite";

export default {
  components: {
    ConfirmModal,
    ChangeWebsiteNameModal,
  },
  props: {
    data: Array,
  },
  setup() {
    const store = useStore();
    const get = () => {
      store.dispatch("websiteModule/getWebsiteList");
    };
    // 添加网址模块弹框中
    const addModule = () => {
      addWebsite(store, handleModal, get);
    };
    // 删除网址模块
    const delModule = (_id) => {
      deleteWebsite(store, _id, get);
    };
    // 修改网址模块名称
    const changeModuleName = (name) => {
      changeName(store, name, get);
    };

    return {
      handleModal,
      addModule,
      delModule,
      changeNameModalVisible,
      changeNameHandleModal,
      changeModuleName,
      ...toRefs(modalVisible),
    };
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
