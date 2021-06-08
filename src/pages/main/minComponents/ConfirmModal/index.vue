<template>
  <div class="confirm-modal">
    <el-dialog
      title="提示"
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
      <span>{{ content }}</span>
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
          <el-button size="mini" type="primary" @click="onOk">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
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
    // 内容
    content: {
      default: "",
      type: String,
    },
  },
  setup(props) {
    const { handleModal } = props;
    const meHandleModal = (iShow) => {
      handleModal(iShow);
    };
    return {
      meHandleModal,
    };
  },
};
</script>
<style lang="less">
.confirm-modal {
  .el-dialog__body {
    padding: 2px 20px;
  }
}
</style>