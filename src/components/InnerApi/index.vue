<template>
  <div class="api_title">{{ data.name }}</div>
  <div class="api_container">
    <div class="api_item_container" v-for="api in data.apis" :key="api._id">
      <div class="api_item_body">
        <div class="api_item_body_title">{{ api.name }}</div>
        <div class="api_item_body_icons">
          <i
            class="el-icon-edit"
            @click="
              () => {
                editApiHandleModal(true, { ...api, websiteId: data._id });
              }
            "
          />
          <i class="el-icon-delete" @click="deleteApi(api._id)" />
        </div>
        <div class="api_item_body_apis">
          <el-tooltip
            :visible-arrow="false"
            :content="api.prodUrl"
            placement="bottom"
            effect="light"
          >
            <a
              :href="api.prodUrl"
              >正式</a
            >
          </el-tooltip>
          <el-tooltip
            :visible-arrow="false"
            :content="api.betaUrl"
            placement="bottom"
            effect="light"
          >
            <a
              :href="api.betaUrl"
              >测试</a
            >
          </el-tooltip>
          <el-tooltip
            :visible-arrow="false"
            :content="api.localUrl"
            placement="bottom"
            effect="light"
          >
            <a
              :href="api.localUrl"
              >开发</a
            >
          </el-tooltip>
        </div>
      </div>
    </div>
    <div
      class="api_item_container plus_item_container"
      @click="
        () => {
          editApiHandleModal(true, { websiteId: data._id });
        }
      "
    >
      <div class="api_item_body plus_item">+</div>
    </div>
  </div>
  <InnerApiEditModal
    :handleModal="editApiHandleModal"
    :visible="editApiModalVisible"
    :onOk="editApi"
  />
</template>

<script>
import { useStore } from "vuex";
import InnerApiEditModal from "/@/minComponents/InnerApiEditModal/index.vue";
import {
  modalVisible as editApiModalVisible,
  handleModal as editApiHandleModal,
} from "/@/minComponents/InnerApiEditModal/modalVisible";
import {
  editApi as editApiFunction,
  deleteApi as deleteApiFunction,
} from "./editApi";

export default {
  props: {
    data: Object,
  },
  components: {
    InnerApiEditModal,
  },
  setup() {
    const store = useStore();
    const get = () => {
      store.dispatch("websiteModule/getWebsiteList");
    };

    // 新增修改网址地址
    const editApi = (formValues) => {
      editApiFunction(store, formValues, get);
    };
    // 删除网址
    const deleteApi = (_id) => {
      deleteApiFunction(store, _id, get);
    };

    return {
      editApiModalVisible,
      editApiHandleModal,
      editApi,
      deleteApi,
    };
  },
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>