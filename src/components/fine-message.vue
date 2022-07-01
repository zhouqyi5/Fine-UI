<!-- 消息提示组件 -->
<template>
  <Transition name="action">
    <div class="fine-message" :style="style[type]" v-show="visible">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{ text }}</span>
    </div>
  </Transition>
</template>
<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'FineMessage',
  props: {
    type: {
      // 样式
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'success'
    },
    text: {
      // 提示文字
      type: String,
      default: '消息提示'
    }
  },
  setup() {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      success: {
        // 成功的样式
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      },
      warn: {
        // 警告的样式
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        // 失败的样式
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      }
    }
    // 控制元素显示隐藏
    const visible = ref(false)
    onMounted(() => {
      // 组件创建完毕的时候显示元素
      visible.value = true
    })
    return { style, visible }
  }
}
</script>
<style scoped lang="less">
/* 淡入淡出动画 */
.action {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.fine-message {
  min-width: 200px;
  position: fixed;
  left: 50%;
  top: 15%;
  color: #999;
  padding: 15px;
  text-align: center;
  transform: translateX(-50%);
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  z-index: 9999;
  cursor: not-allowed;
  i {
    margin-right: 5px;
    top: -1px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
