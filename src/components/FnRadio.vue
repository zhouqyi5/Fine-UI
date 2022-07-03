<template>
  <label class="fn-radio" :class="{ 'is-checked': label == model }">
    <span class="fn-radio_input">
      <span
        class="fn-radio_inner"
        :style="{
          backgroundColor: label == model ? activeColor : '',
          borderColor: label == model ? activeColor : ''
        }"
      ></span>
      <input type="radio" class="fn-radio_original" :value="label" :name="name" v-model="model" />
    </span>
    <span class="fn-radio_label" :style="{ color: label == model ? activeColor : '' }">
      <slot></slot>
      <!-- 如果没有传值，就把label作为文本显示 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'FnRadio',
  props: {
    label: {
      type: [String, Number, Boolean],
      defualt: ''
    },
    modelValue: null,
    name: {
      type: String,
      defualt: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        // 触发父组件的input事件
        emit('update:modelValue', value)
      }
    })
    return { model }
  }
}
</script>
<style scoped lang="less">
.fn-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  .fn-radio_input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .fn-radio_inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }
    /* 原始input样式重置 */
    .fn-radio_original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0px;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .fn-radio_label {
    font-size: 14px;
    padding-left: 10px;
  }
}
/* 选中的样式 */
.fn-radio.is-checked {
  .fn-radio_input {
    .fn-radio_inner {
      border-color: #409eff;
      background-color: #409eff;
      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  .fn-radio_label {
    color: #409eff;
  }
}
</style>
