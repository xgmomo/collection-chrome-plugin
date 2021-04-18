<template>
  <div class="outer_api_container" v-for="dataItem in data" :key="dataItem.id">
    <div class="api_title">
      {{ dataItem.title }} <i class="el-icon-delete" />
      <div class="plus_custom_btn" title="新增自定义网址模块">+</div>
    </div>
    <div class="api_container">
      <div class="api_item_container" v-for="api in dataItem.apis" :key="api.id">
        <div class="api_item_body">
          <div class="api_item_body_title">{{ api.name }}</div>
          <div class="api_item_body_icons">
            <i class="el-icon-edit" />
            <i class="el-icon-delete" />
          </div>
        </div>
      </div>
      <div class="api_item_container plus_item_container">
        <div class="api_item_body plus_item">+</div>
      </div>
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
      console.log(props.data, "1");
    });
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
