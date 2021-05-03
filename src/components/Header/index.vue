<template>
  <header class="header">
    <div class="header_container">
      <i class="el-icon-star-on"></i>
      <div class="title">收藏夹</div>
    </div>
    <div class="config_container">
      <el-button
        v-if="!userName"
        size="mini"
        @click="
          () => {
            handleModal(true);
          }
        "
      >
        登录
      </el-button>
      <el-popconfirm
        v-else
        title="确定退出登录吗？"
        confirmButtonText="确定"
        cancelButtonText="取消"
        @confirm="logout"
      >
        <template #reference>
          <el-button size="mini">
            {{ userName }}
          </el-button>
        </template>
      </el-popconfirm>
    </div>
  </header>
  <LoginModal :handleModal="handleModal" :visible="visible" />
</template>

<script>
import { computed, toRefs } from "vue";
import {
  modalVisible,
  handleModal,
} from "/@/minComponents/LoginModal/modalVisible";
import LoginModal from "/@/minComponents/LoginModal/index.vue";
import { useStore } from "vuex";

export default {
  components: {
    LoginModal,
  },
  setup() {
    const store = useStore();
    const userName = computed(() => {
      return store.state.userModule.userName;
    });

    const logout = () => {
      localStorage.userName = "";
      localStorage.collectionChromeToken = "";
      store.commit("userModule/setId", "");
      store.commit("userModule/setUserInfo", "");
    };

    return {
      handleModal,
      userName,
      logout,
      ...toRefs(modalVisible),
    };
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
