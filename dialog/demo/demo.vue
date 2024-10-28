<template>
  <div class="container">
    <el-button type="primary" @click="showDialog">点击</el-button>
  </div>
</template>

<script>
// 可以在mainjs全局引入
import dialog from '../index'
import edit from './demoEdit'
export default {
  methods: {
    showDialog() {
      // options默认以下配置，没有改动可以直接传空，如       dialog('添加', edit, {}, params)
      // 只写size可以传字符串，支持像素和百分比，'500px'和'50%'如       dialog('添加', edit, '800px', params)
      // 哪个配置有改动可以只写那个配置，不用都写，如         dialog('添加', edit, { showConfirm: false }, params)

      // const options = {
      //   size: '500px',
      //   showConfirm: true,
      //   showCancel: true
      // }

      // 父组件给子组件传的参数，包裹在params内
      const params = {
        a: 1
      }
      dialog('添加', edit, {}, params).then(res => {
        // 点击提交并且成功。有自定义需求的可以去改indexjs中的footer，比如加插槽等
        console.log('点击提交并且成功', res)
      }).catch(err => {
        // 点击取消/关闭并且成功
        console.log('点击取消/关闭并且成功')
      })
    }
  }
}
</script>
