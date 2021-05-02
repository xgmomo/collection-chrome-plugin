<template>
  <el-dialog
    title="登录即注册"
    v-model="visible"
    width="70%"
    :before-close="
      () => {
        meHandleModal(false);
      }
    "
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :model="formValues"
      status-icon
      :rules="rules"
      ref="formValues"
      label-width="80px"
      class="login-form"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          size="mini"
          v-model="formValues.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          size="mini"
          type="password"
          v-model="formValues.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          size="mini"
          @click="
            () => {
              meHandleModal(false);
            }
          "
          >取 消</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="
            () => {
              onOk(formValues.userName, formValues.password);
            }
          "
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { rules, login } from "./login";
import { useStore } from "vuex";

export default {
  props: {
    // 弹框显示影藏
    visible: {
      default: false,
      type: Boolean,
    },
    // 弹框显示隐藏方法
    handleModal: {
      default: () => {
        return () => {
          return false;
        };
      },
      type: Function,
    },
  },
  data() {
    return {
      formValues: {
        userName: "",
        password: "",
      },
    };
  },
  setup(props) {
    const { handleModal } = props;
    const meHandleModal = (iShow) => {
      handleModal(iShow);
    };

    const store = useStore();

    const onOk = (userName, password) => {
      login(userName, password, store);
      meHandleModal(false);
    };
    return {
      meHandleModal,
      rules,
      onOk,
    };
  },
};
</script>