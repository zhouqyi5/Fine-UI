// 提供一个能够显示 提示组件 的函数
// 该函数将来能够导入直接使用，也能挂在vue实例原型上
// 使用方法：
//   导入：import message From 'Message.js
//   使用： Message({ type: 'error', text: '提示信息' })
// 如果是在实例原型上： this.$message({type: 'error', text: '提示信息'})
import { createVNode, render } from 'vue'
import FineMessage from '@/components/fine-message'
const div = document.createElement('div')
div.setAttribute('class', 'fine-message-container')
document.body.appendChild(div)

// 定时器标识
let timer = null
export default ({ type, text, duration = 2000 }) => {
  // 渲染组件
  // 1 导入消息提示组件
  // 2 将导入的消息提示租价编译为虚拟节点(dom节点)
  // vue 提供的 createVnode()函数 能将组件解析为节点 createVNode(组件，参数属性对象（props）)
  const vnode = createVNode(FineMessage, { type, text, duration })
  // 3 准备一个装载消息提示组件的容器
  // 4 将虚拟节点渲染在容器中
  render(vnode, div)

  // 5 一定时间后销毁组件
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, duration)
}
