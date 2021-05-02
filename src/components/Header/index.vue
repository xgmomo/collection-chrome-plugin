<template>
  <header class="header">
    <div class="header_container">
      <i class="el-icon-star-on"></i>
      <div class="title">收藏夹</div>
    </div>
    <div class="config_container">
      <el-button
        v-if="!_id"
        size="mini"
        @click="
          () => {
            handleModal(true);
          }
        "
      >
        登录
      </el-button>
      <el-button
        v-else
        size="mini"
      >
        欢迎你
      </el-button>
    </div>
  </header>
  <LoginModal :handleModal="handleModal" :visible="visible" />
</template>

<script>
import { toRefs } from "vue";
import { useStore } from "vuex";
import {
  modalVisible,
  handleModal,
} from "/@/minComponents/LoginModal/modalVisible";
import LoginModal from "/@/minComponents/LoginModal/index.vue";

export default {
  components: {
    LoginModal,
  },
  setup() {
    const store = useStore();
    const userModule = store.state.userModule;
    
    return {
      handleModal,
      ...toRefs(userModule),
      ...toRefs(modalVisible),
    };
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
