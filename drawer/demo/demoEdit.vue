<template>
  <div class="drawer-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 父组件传参，字段名如下
      drawer_params: {},
      //
      ruleForm: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log('drawer_params', this.drawer_params)
  },
  methods: {
    // 提交
    confirm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            setTimeout(() => {
              resolve()
            }, 1000)
          } else {
            console.log('error submit!!')
            reject()
            return false
          }
        })
      })
    },

    // 取消
    cancel() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 100)
      })
    }
  }
}
</script>
