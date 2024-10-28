import cbcDialog from "./dialog";

/**
 *
 * @param {string} title 名称
 * @param {object} subComponent 抽屉的子组件
 * @param {object|number} options 抽屉的参数对象
 * @param {object} params 子组件的参数对象
 * @returns {Promise<unknown>}
 */
const dialog = function (title, subComponent, options, params) {
  return new Promise((resolve, reject) => {
    const cbcDialog_Constructor = Vue.extend(cbcDialog)
    const instance = new cbcDialog_Constructor({
      data() {
        return {
          subComponent_Constructor: Vue.extend(subComponent),
          dialogParams: params,
          dialogOptions: {},
          title: title,
        }
      },
      created() {
        const defaultOptions = {
          size: '50%', // 宽度
          showConfirm: true,
          showCancel: true,
          appendToBody: false, // 因为都是手动添加到body内的，所以element的这个属性可以都是false，先不要修改了
          wrapperClosable: false, // 是否点击遮罩层关闭
          escClosable: false // 是否按esc关闭
        }
        if(Object.prototype.toString.call(options) === '[object String]') {
          this.dialogOptions = {
            size: options,
            showConfirm: true,
            showCancel: true,
            appendToBody: false, // 最外层抽屉必须为false，嵌套的抽屉必须为true
            wrapperClosable: false, // 是否点击遮罩层关闭
            escClosable: false // 是否按esc关闭
          }
        }else {
          this.dialogOptions = Object.assign({}, defaultOptions, options)
        }
      },
      methods: {
        // 调用子组件的confirm
        onConfirm() {
          const cf = instance.subInstance.confirm
          if(!cf || Object.prototype.toString.call(cf)!=='[object Function]') {
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
          }).catch(err => {
            instance.confirmLoading = false
          })
        },

        // 调用子组件的cancel
        onCancel() {
          const cc = instance.subInstance.cancel
          if(!cc || Object.prototype.toString.call(cc)!=='[object Function]') {
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
          }).catch(err => {
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

export default dialog
