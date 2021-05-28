<template>
  <el-dialog
    title="新增/编辑网址地址"
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
      ref="formRef"
      label-width="80px"
      class="login-form"
    >
      <el-form-item label="网址名称" prop="name">
        <el-input
          size="mini"
          v-model="formValues.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="正式环境" prop="prodUrl">
        <el-input
          size="mini"
          v-model="formValues.prodUrl"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="测试环境" prop="betaUrl">
        <el-input
          size="mini"
          v-model="formValues.betaUrl"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="开发环境" prop="localUrl">
        <el-input
          size="mini"
          v-model="formValues.localUrl"
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
              onOkState({
                name: formValues.name,
                prodUrl: formValues.prodUrl,
                betaUrl: formValues.betaUrl,
                localUrl: formValues.localUrl,
              });
            }
          "
          :loading="loading"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { computed, ref } from "vue";
import { rules } from "./form.js";
import { apiIdObj } from "./modalVisible";
import { useStore } from "vuex";

export default {
  props: {
    // 弹框显示影藏
    visible: Object,
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
        prodUrl: "http://#/",
        betaUrl: "http://#/",
        localUrl: "http://#/",
      },
    };
  },
  watch: {
    "visible.visible"(val) {
      if (val) {
        if (apiIdObj._id) {
          this.formValues.name = apiIdObj.name;
          this.formValues.prodUrl = apiIdObj.prodUrl;
          this.formValues.betaUrl = apiIdObj.betaUrl;
          this.formValues.localUrl = apiIdObj.localUrl;
        }
      } else {
        console.log(this.refs.formRef,'this.formRef')
        this.formValues = {
          name: "",
          prodUrl: "http://#/",
          betaUrl: "http://#/",
          localUrl: "http://#/",
        };
      }
    },
  },
  setup(props) {
    const { onOk } = props;
    const store = useStore();
    const formRef = ref();

    const onOkState = (formValues) => {
      formRef.value.validate((valid) => {
        if (valid) {
          onOk(formValues);
        } else {
          return false;
        }
      });
    };

    const loading = computed(() => {
      return store.state.loading;
    });

    return {
      formRef,
      rules,
      onOkState,
      loading,
    };
  },
};
</script>
