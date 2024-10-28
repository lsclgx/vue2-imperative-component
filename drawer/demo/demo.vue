<template>
  <div class="container">
    <el-button type="primary" @click="showDrawer">点击</el-button>
  </div>
</template>

<script>
// 可以在mainjs全局引入
import drawer from '../index'
import edit from './demoEdit'
export default {
  methods: {
    showDrawer() {
      // options默认以下配置，没有改动可以直接传空，如       drawer('添加', edit, {}, params)
      // 如果只配置宽度，可以设置为number类型，如           drawer('添加', edit, 800, params)
      // 哪个配置有改动可以只写那个配置，不用都写，如         drawer('添加', edit, { showConfirm: false }, params)

      // const options = {
      //   size: 500,
      //   showConfirm: true,
      //   showCancel: true
      // }

      // 父组件给子组件传的参数，包裹在params内
      const params = {
        a: 1
      }
      drawer('添加', edit, {}, params).then(res => {
        // 点击提交并且成功。有自定义需求的可以去改indexjs中的footer，比如加插槽等
        console.log('点击提交并且成功', res)
      }).catch(() => {
        // 点击取消/关闭并且成功
        console.log('点击取消/关闭并且成功')
      })
    }
  }
}
</script>
