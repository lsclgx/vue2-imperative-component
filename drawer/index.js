import Vue from 'vue'
import cbcDrawer from './drawer'

/**
 * @param {string} title 名称
 * @param {object} subComponent 抽屉的子组件
 * @param {object|number} options 抽屉的参数对象
 * @param {object} params 子组件的参数对象
 * @returns {Promise<unknown>}
 */
const drawer = function(title, subComponent, options, params) {
  return new Promise((resolve, reject) => {
    const CbcDrawer_Constructor = Vue.extend(cbcDrawer)
    const instance = new CbcDrawer_Constructor({
      data() {
        return {
          SubComponent_Constructor: Vue.extend(subComponent),
          drawerParams: params,
          drawerOptions: {},
          title: title
        }
      },
      created() {
        const defaultOptions = {
          size: '500px',
          showConfirm: true,
          showCancel: true,
          appendToBody: false, // 因为都是手动添加到body内的，所以element的这个属性可以都是false，先不要修改了
          wrapperClosable: false, // 是否点击遮罩层关闭
          escClosable: false // 是否按esc关闭
        }
        if (Object.prototype.toString.call(options) === '[object String]') {
          this.drawerOptions = {
            size: options,
            showConfirm: true,
            showCancel: true,
            appendToBody: false, // 最外层抽屉必须为false，嵌套的抽屉必须为true
            wrapperClosable: false, // 是否点击遮罩层关闭
            escClosable: false // 是否按esc关闭
          }
        } else {
          this.drawerOptions = Object.assign({}, defaultOptions, options)
        }
      },
      methods: {
        // 调用子组件的confirm
        onConfirm() {
          const cf = instance.subInstance.confirm
          if (!cf || Object.prototype.toString.call(cf) !== '[object Function]') {
            instance.$destroy()
            document.body.removeChild(instance.$el)
            resolve()
            return
          }
          instance.confirmLoading = true
          cf().then(res => {
            instance.$destroy()
            document.body.removeChild(instance.$el)
            instance.confirmLoading = false
            resolve(res)
          }).catch(() => {
            instance.confirmLoading = false
          })
        },

        // 调用子组件的cancel
        onCancel() {
          const cc = instance.subInstance.cancel
          if (!cc || Object.prototype.toString.call(cc)!=='[object Function]') {
            instance.$destroy()
            document.body.removeChild(instance.$el)
            reject()
            return
          }
          instance.cancelLoading = true
          cc().then(res => {
            instance.$destroy()
            document.body.removeChild(instance.$el)
            instance.cancelLoading = false
            reject()
          }).catch(() => {
            instance.cancelLoading = false
          })
        }
      }
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.visible = true
  })
}

export default drawer
