<template>
  <div class="api_title">{{ data.name }}</div>
  <div class="api_container">
    <div class="api_item_container" v-for="api in data.apis" :key="api._id">
      <el-dropdown trigger="contextmenu">
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
          <el-popconfirm
              title="是否删除？"
              confirmButtonText="确定"
              cancelButtonText="取消"
              @confirm="
                () => {
                  deleteApi(api._id);
                }
              "
            >
              <template #reference>
                <i class="el-icon-delete" />
              </template>
            </el-popconfirm>
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
              target="_blank"
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
              target="_blank"
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
              target="_blank"
              >开发</a
            >
          </el-tooltip>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
      
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
import { ElMessage } from 'element-plus';
import InnerApiEditModal from "@/pages/main/minComponents/InnerApiEditModal/index.vue";
import {
  modalVisible as editApiModalVisible,
  handleModal as editApiHandleModal,
} from "@/pages/main/minComponents/InnerApiEditModal/modalVisible";
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
      if(!localStorage.collectionChromeToken){
        ElMessage({
            message:'请先登录哟',
            type: 'error'
        });
        return;
      }
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