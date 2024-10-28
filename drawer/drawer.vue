<template>
  <el-drawer
    :title="title"
    :size="drawerOptions.size"
    :append-to-body="drawerOptions.appendToBody"
    :wrapperClosable="drawerOptions.wrapperClosable"
    :close-on-press-escape="drawerOptions.escClosable"
    :show-close="false"
    :custom-class="'my-cbc-drawer'"
    :visible.sync="visible"
    direction="rtl">
<!--    <div>-->
      <div :id="asyncId" class="my-cbc-drawer-container" style="padding: 15px 15px 75px 15px;">
      </div>
      <el-row class="footer" v-if="drawerOptions.showConfirm || drawerOptions.showCancel">
        <el-button :type="!drawerOptions.showConfirm ? 'default' : 'default'" @click="onCancel" :loading="cancelLoading">{{ !drawerOptions.showConfirm ? '关 闭' : '取 消' }}</el-button>
        <el-button type="primary" v-if="drawerOptions.showConfirm" @click="onConfirm" :loading="confirmLoading">确 定</el-button>
      </el-row>
<!--    </div>-->
  </el-drawer>
</template>

<script>
export default {
  name: 'CbcDrawer',
  data() {
    return {
      visible: false,
      subInstance: {},
      confirmLoading: false,
      cancelLoading: false,
      asyncId: 'my-cbc-drawer-container'
    }
  },
  methods: {
    onConfirm() {},
    onCancel() {}
  },
  created() {
    this.asyncId = this.asyncId + '_' + Math.round(Math.random() * 1000000)
  },
  mounted() {
    // console.log('subComponent_Constructor', this.subComponent_Constructor)
    const _this = this
    const subInstance = new this.SubComponent_Constructor({
      data() {
        return {
          drawer_params: _this.drawerParams
        }
      },
      methods: {
      }
    })
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
.my-cbc-drawer {
  position: relative;
}
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid #e2e9ee;
}
.el-button {
  flex-grow: 1;
}
</style>
<style>
 .my-cbc-drawer .el-select, .my-cbc-drawer .el-input, .my-cbc-drawer .el-date-editor {
  width: 100%!important;
}
.my-cbc-drawer header {
  margin: 0;
  padding: 15px;
  border-bottom: 1px solid #e2e9ee;
  font-weight: bold;
  font-size: 18px;
  color: #333;
}
.my-cbc-drawer header span {
  outline: none;
}
.my-cbc-drawer .el-drawer__body {
  height: 100%;
  overflow-y: auto;
}
.my-cbc-drawer .el-drawer__body::-webkit-scrollbar-track-piece {
  width: 6px!important;
  background: transparent!important;
}
.my-cbc-drawer .el-drawer__body::-webkit-scrollbar {
  width: 6px!important;
  background: transparent!important;
}
.my-cbc-drawer .el-drawer__body::-webkit-scrollbar-thumb {
  width: 6px!important;
  background: transparent!important;
}
.my-cbc-drawer .el-drawer__body:hover::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #999!important;
}
</style>
