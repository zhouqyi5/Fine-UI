<!-- 确认框组件 -->
<template>
  <div class="fn-confirm" :class="{ fade }">
    <div class="fn-confirm_wrapper" :class="{ fade }">
      <div class="fn-confirm_header">
        <h3>{{ title }}</h3>
        <a @click="cancel" href="JavaScript:;" class="icon fine-close-bold"></a>
      </div>
      <div class="fn-confirm_body">
        <i class="icon fine-help-filling"></i>
        <span>{{ text }}</span>
      </div>
      <div class="fn-confirm_footer">
        <Fn-button @click="cancel" size="small" type="info">取消</Fn-button>
        <Fn-button @click="submit" size="small" type="primary">确认</Fn-button>
      </div>
    </div>
  </div>
</template>
<script>
import FnButton from '@/components/FnButton'
import { ref, onMounted } from 'vue'
export default {
  name: 'FnConfirm',
  components: { FnButton },
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    text: {
      type: String,
      default: '是否确认该操作？'
    },
    cancelCallback: {
      type: Function
    },
    submitCallback: {
      type: Function
    }
  },
  setup(props) {
    // 确认框默认隐藏
    const fade = ref(false)
    // 组件渲染完毕之后
    onMounted(() => {
      // 过度效果需要创建完成后延迟一会加上才有效
      setTimeout(() => {
        fade.value = true
      }, 0)
    })
    // 关闭
    const cancel = () => {
      // fade.value = false
      props.cancelCallback()
    }
    // 确认
    const submit = () => {
      // fade.value = false
      props.submitCallback()
    }

    return { fade, cancel, submit }
  }
}
</script>
<style scoped lang="less">
.fn-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  /* 动画 */
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .fn-confirm_wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    /* 动画 */
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .fn-confirm_header,
    .fn-confirm_footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .fn-confirm_header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: rgb(0, 0, 0);
        }
      }
    }
    .fn-confirm_body {
      padding: 20px 40px;
      font-size: 16px;
      .fine-help-filling {
        color: #ff9664;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .fn-confirm_footer {
      text-align: center;
      margin: 20px;
      :deep(.fn-button:first-child) {
        margin-right: 30px;
      }
    }
  }
}
</style>
