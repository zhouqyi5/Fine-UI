<!-- 对话框组件 -->
<template>
  <transition name="dialog-action">
    <div class="fn-dialog" @click.self="closeDialog()" v-show="visible" :class="{ fade }">
      <div class="fn-dialog_wrapper" :style="{ width: width, marginTop: top }" :class="{ fade }">
        <div class="fn-dialog_header">
          <slot name="title">
            <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
            <span class="fn-dialog_title">
              {{ title }}
            </span>
          </slot>
          <span class="fn-dialog_close" @click="closeDialog()">
            <i class="iconfont icon-close-new"></i>
          </span>
        </div>
        <div class="fn-dialog_body"><slot /></div>
        <div class="fn-dialog_footer">
          <slot name="footer" v-if="$slots.footer" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'FnDialog',
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    width: {
      type: String,
      default: '30%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    // 组件的显示隐藏
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const fade = ref(false)
    // fade 的值为true时打开，否则关闭组件，就是fade的值
    watch(
      () => props.visible,
      () => {
        setTimeout(() => {
          // 结构和样式同时加上无过度效果，需要些延时
          fade.value = props.visible
        }, 0)
      },
      { immediate: true }
    )
    // 自己关闭对话框，修改父组件数据状态
    const closeDialog = () => {
      emit('update:visible', false)
    }

    return { fade, closeDialog }
  }
}
</script>
<!-- vue3.x v-model:visible ====> 语法糖 :visible + @update:visible -->
<style scoped lang="less">
.fn-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 888;
  background-color: rgba(0, 0, 0, 0.5);
  &.fade {
    transition: all 0.5s;
    background: rgba(0, 0, 0, 0.5);
  }
  &_wrapper {
    width: 30%;
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0, 1px, 3px, rgbs(0, 0, 0, 0.3);
    box-sizing: border-box;
    transform: translateY(50%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translateY(0);
      opacity: 1;
    }
    .fn-dialog_header {
      padding: 20px 20px 10px;
      .fn-dialog_title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .fn-dialog_close {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .icon-close-new {
          margin-top: 2px;
          color: #303133;
          &:hover {
            color: #eb0a23;
          }
        }
      }
    }
    .fn-dialog_body {
      padding: 30px 20px;
      color: #606266;
      font-size: 16px;
      word-break: break-all;
    }
    .fn-dialog_footer {
      padding: 10px 20px 20px;
      text-align: center;
      box-sizing: border-box;
      :deep(.fn-button:first-child) {
        margin-right: 20px;
      }
    }
  }
}
.dialog-action-enter-active {
  animation: action 0.4s;
}
.dialog-action-leave-active {
  animation: action 0.4s reverse;
}
@keyframes action {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
