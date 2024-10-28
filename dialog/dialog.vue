<template>
  <el-dialog
    :title="title"
    :width="dialogOptions.size"
    :append-to-body="dialogOptions.appendToBody"
    :close-on-click-modal="dialogOptions.wrapperClosable"
    :close-on-press-escape="dialogOptions.escClosable"
    :show-close="false"
    :custom-class="'my-cbc-dialog'"
    :visible.sync="visible"
    direction="rtl">
    <div :id="asyncId" class="my-cbc-dialog-container" style="padding: 0px 5px 20px;">
    </div>
    <el-row class="footer" v-if="dialogOptions.showConfirm || dialogOptions.showCancel">
      <el-button size="small" type="default" @click="onCancel" :loading="cancelLoading">{{ !dialogOptions.showConfirm ? '关 闭' : '取 消' }}</el-button>
      <el-button size="small" type="primary" v-if="dialogOptions.showConfirm" @click="onConfirm" :loading="confirmLoading">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'CbcDialog',
  data() {
    return {
      visible: false,
      subInstance: {},
      confirmLoading: false,
      cancelLoading: false,
      asyncId: 'my-cbc-dialog-container'
    }
  },
  methods: {
    onConfirm() {},
    onCancel() {}
  },
  created() {
    this.asyncId = this.asyncId + '_' + Math.round(Math.random()*1000000)
  },
  mounted() {
    // console.log('subComponent_Constructor', this.subComponent_Constructor)
    const _this = this
    const subInstance = new this.subComponent_Constructor({
      data() {
        return {
          dialog_params: _this.dialogParams
        }
      },
      methods: {
      }
    })
    // vue2.7可以这样写，vue2.6这样写报错找不到元素，需要先获取一下dom，再给$mount传dom
    // subInstance.$mount('#'+this.asyncId)
    const dom = document.querySelector('#' + this.asyncId)
    subInstance.$mount(dom)
    this.subInstance = subInstance
    this.$nextTick(() => {
      setTimeout(() => {
        document.querySelector('#' + this.asyncId).appendChild(this.subInstance.$el)
      }, 100)
    })
  }
}
</script>

<style scoped>
.my-cbc-dialog {
  position: relative;
}
.footer {
  width: calc(100% - 20px);
  position: absolute;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
  box-sizing: border-box;
  /*border-top: 1px solid #e2e9ee;*/
}
</style>
<style>
.my-cbc-dialog .el-dialog__body {
  padding: 20px 10px 50px;
}
.my-cbc-dialog .el-dialog__header {
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid #e2e9ee;
  font-weight: bold;
  font-size: 18px;
  color: #333;
}
.my-cbc-dialog .el-dialog__body::-webkit-scrollbar-track-piece {
  width: 6px!important;
  background: transparent!important;
}
.my-cbc-dialog .el-dialog__body::-webkit-scrollbar {
  width: 6px!important;
  background: transparent!important;
}
.my-cbc-dialog .el-dialog__body::-webkit-scrollbar-thumb {
  width: 6px!important;
  background: transparent!important;
}
.my-cbc-dialog .el-dialog__body:hover::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #999!important;
}
</style>
