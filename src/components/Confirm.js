import { createVNode, render } from 'vue'
import FnConfirm from '@/components/FnConfirm'
const div = document.createElement('div')
div.setAttribute('class', 'fine-confirm-container')
document.body.appendChild(div)

// 该组件需要返回 promise 对象 点取消与确认都要销毁组件
export default ({ title, text }) => {
  // 渲染组件
  // 1 导入消息提示组件
  // 2 将导入的消息提示租价编译为虚拟节点(dom节点)
  // vue 提供的 createVnode()函数 能将组件解析为节点 createVNode(组件，参数属性对象（props）)
  return new Promise((resolve, reject) => {
    const cancelCallback = () => {
      render(null, div)
      // reject(new Error('点击取消'))
    }
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    const vnode = createVNode(FnConfirm, { title, text, cancelCallback, submitCallback })
    // 3 准备一个装载消息提示组件的容器
    // 4 将虚拟节点渲染在容器中
    render(vnode, div)
  })
}
