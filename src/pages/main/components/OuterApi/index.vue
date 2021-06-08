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
            changeNameHandleModal(true, dataItem._id, dataItem.name);
          }
        "
      >
        {{ dataItem.name }}
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
    <div class="api_container" id="outer_api_container_box">
      <div
        class="api_item_container"
        v-for="api in dataItem.apis"
        :key="api._id"
      >
        <div class="api_item_body">
          <div class="api_item_body_title">
            <el-tooltip
              :visible-arrow="false"
              :content="api.prodUrl"
              placement="bottom"
              effect="light"
            >
              <a target="_blank" :href="api.prodUrl">{{ api.name }}</a>
            </el-tooltip>
          </div>
          <div class="api_item_body_icons left">
            <i
              class="el-icon-edit"
              @click="
                () => {
                  editApiHandleModal(true, { ...api, websiteId: dataItem._id });
                }
              "
            />
          </div>
          <div class="api_item_body_icons right">
            <el-popconfirm
              title="是否删除？"
              confirmButtonText="确定"
              cancelButtonText="取消"
              @confirm="
                () => {
                  deleteApi(api._id, { websiteId: dataItem._id });
                }
              "
            >
              <template #reference>
                <i class="el-icon-delete" />
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
      <div
        class="api_item_container plus_item_container"
        @click="
          () => {
            editApiHandleModal(true, {
              websiteId: dataItem._id,
            });
          }
        "
      >
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
  <OuterApiEditModal
    :handleModal="editApiHandleModal"
    :visible="editApiModalVisible"
    :onOk="editApi"
  />
</template>

<script>
import { toRefs } from "vue";
import { useStore } from "vuex";
import ConfirmModal from "@/pages/main/minComponents/ConfirmModal/index.vue";
import {
  modalVisible,
  handleModal,
} from "@/pages/main/minComponents/ConfirmModal/modalVisible";
import ChangeWebsiteNameModal from "@/pages/main/minComponents/ChangeWebsiteNameModal/index.vue";
import {
  modalVisible as changeNameModalVisible,
  handleModal as changeNameHandleModal,
} from "@/pages/main/minComponents/ChangeWebsiteNameModal/visible";
import { addWebsite, deleteWebsite } from "./addAndDeleteWebsite";
import { changeName } from "./editWebsite";
import OuterApiEditModal from "@/pages/main/minComponents/OuterApiEditModal/index.vue";
import {
  modalVisible as editApiModalVisible,
  handleModal as editApiHandleModal,
} from "@/pages/main/minComponents/OuterApiEditModal/modalVisible";
import {
  editApi as editApiFunction,
  deleteApi as deleteApiFunction,
} from "./editApi";

export default {
  components: {
    ConfirmModal,
    ChangeWebsiteNameModal,
    OuterApiEditModal,
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
    // 新增修改网址地址
    const editApi = (name, prodUrl) => {
      editApiFunction(store, name, prodUrl, get);
    };
    // 删除网址
    const deleteApi = (_id, others) => {
      deleteApiFunction(store, _id, get, others);
    };

    return {
      handleModal,
      addModule,
      delModule,
      changeNameModalVisible,
      changeNameHandleModal,
      changeModuleName,
      editApiModalVisible,
      editApiHandleModal,
      editApi,
      deleteApi,
      ...toRefs(modalVisible),
    };
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
