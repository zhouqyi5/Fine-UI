<!-- 复选框组件 -->
<template>
  <div class="fine-checkbox" @click="changeChecked()">
    <!-- 选中 -->
    <i v-if="checked" class="iconfont icon-checked"></i>
    <!-- 未选中 -->
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- $slots.default 表示如果有内容就显示html结构 没有内容就直接去除html结构 -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
// v-midel ====> :modelValue + @update:modelValue 语法糖
export default {
  name: 'FineCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      // 使用emit通知父组件数据的改变
      emit('update:modelValue', checked.value)
      emit('change', checked.value)
    }
    // 通过侦听器，获取到父组件传递的数据，给checked数据
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue
      }
    )
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.fine-checkbox {
  display: inline-block;
  margin-right: 2px;
  cursor: pointer;
  .icon-checked {
    color: #fff;
    background-color: @fineColor;
    /* ~ span {
      color: @fineColor;
    } */
  }
  /* i {
    position: relative;
    top: 1px;
  } */
  span {
    margin-left: 3px;
  }
}
</style>
