### 简介
#### 基于vue2+element-ui的命令式组件.
element-ui提供的弹窗和抽屉组件是以模板形式来写的。在vue2的选项式API的氛围中，一个弹窗的使用即使二次封装，也需要在script中引入组件，在components中声明，在template中写上组件名，并且在data中定义visible控制显示隐藏、params传参、绑定事件等，还需要在methods中定义这些方法和修改这些变量。

组件封装就是为了基于业务抽离出公共部分，不再需要写大量重复代码。弹窗和抽屉这两种场景很适合使用命令式组件去简化开发。将element-ui的弹窗和抽屉组件二次封装为命令式组件，使用时只需调用一个方法即可打开并传参，并可以在回调中处理子父传值等，父子组件都只需要考虑业务编写，无需考虑太多组件间的处理。

### 使用
在demo中有使用示例

#### 父组件
    // 封装的弹窗组件，可以在mainjs全局引入
    import dialog from '../index'
    // 引入子组件，无需在components中声明，只需在打开时传入方法
    import edit from './demoEdit'

// 第三个参数options默认以下配置，没有改动可以直接传空，如
// dialog('添加', edit, {}, params)

// 只写size可以传字符串，支持像素和百分比，'500px'和'50%'，如
// dialog('添加', edit, '800px', params)

// 哪个配置有改动可以只写那个配置，不用都写，如
// dialog('添加', edit, { showConfirm: false }, params)

// const options = {
//   size: '500px',
//   showConfirm: true,
//   showCancel: true
// }

      // 父组件给子组件传的参数，包裹在params内
      const params = {
        a: 1
      }
      // 方法的调用
      dialog('添加', edit, {}, params).then(res => {
        // 点击提交并且成功。有自定义需求的可以去改indexjs中的footer，比如加插槽等
        console.log('点击提交并且成功', res)
      }).catch(err => {
        // 点击取消/关闭并且成功
        console.log('点击取消/关闭并且成功')
      })

#### 子组件
如下，是子组件模板，其中data中的dialog_params是父组件给子组件的传参params，methods中的confirm和cancel是底部的确认和取消按钮，在父组件的回调中可以获取这里传的参数

    <template>
      <div class="dialog-container">
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
          dialog_params: {},
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
        console.log('dialog_params', this.dialog_params)
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
            }, 1000)
          })
        }
      }
    }
    </script>



