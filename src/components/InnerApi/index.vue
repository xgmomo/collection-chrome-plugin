<template>
  <div class="api_title">内部网址</div>
  <div class="api_container">
    <div class="api_item_container">
      <div class="api_item_body" v-for="api in data" :key="api.id">
        <div class="api_item_body_title">{{ api.name }}</div>
        <div class="api_item_body_icons">
          <i class="el-icon-edit" />
          <i class="el-icon-delete" />
        </div>
        <div class="api_item_body_apis">
          <el-tooltip
            :visible-arrow="false"
            :content="api.buildUrl"
            placement="bottom"
            effect="light"
          >
            <a>正式</a>
          </el-tooltip>
          <el-tooltip
            :visible-arrow="false"
            :content="api.betaUrl"
            placement="bottom"
            effect="light"
          >
            <a>测试</a>
          </el-tooltip>
          <el-tooltip
            :visible-arrow="false"
            :content="api.devUrl"
            placement="bottom"
            effect="light"
          >
            <a>开发</a>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="api_item_container plus_item_container">
      <div class="api_item_body plus_item">+</div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  props: {
    data: Array,
  },
  setup(props) {
    onMounted(() => {
    //   console.log(props.data, "1");
    });
  },
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>