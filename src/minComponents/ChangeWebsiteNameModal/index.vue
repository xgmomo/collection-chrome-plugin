<template>
  <el-dialog
    title="修改网站模块名称"
    v-model="visible.visible"
    width="70%"
    :before-close="
      () => {
        handleModal(false);
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
      <el-form-item label="模块名称" prop="name">
        <el-input
          size="mini"
          v-model="formValues.name"
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
              handleModal(false);
            }
          "
          >取 消</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="
            () => {
              onOkState(formValues.name);
            }
          "
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { rules } from "./form";
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
    onOk: {
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
        name: "",
      },
    };
  },
  setup(props) {
    const { onOk } = props;

    const onOkState = (name) => {
        if(!name){
            return
        }
      onOk(name);
    };
    return {
      rules,
      onOkState,
    };
  },
};
</script>