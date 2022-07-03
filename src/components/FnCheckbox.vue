<template>
  <label class="fn-checkbox" :class="{ ' is-checked': model, 'is-disabled': disabled }">
    <span class="fn-checkbox_input">
      <span
        class="fn-checkbox_inner"
        :style="{
          backgroundColor: model ? activeColor : '',
          borderColor: model ? activeColor : ''
        }"
      ></span>
      <input
        type="checkbox"
        class="fn-checkbox_original"
        v-model="model"
        :value="label"
        :name="name"
        :disabled="disabled"
      />
    </span>
    <span class="fn-checkbox_label" :style="{ color: model ? activeColor : '' }">
      <slot></slot>
      <template v-if="!$slots.default">
        {{ label }}
      </template>
    </span>
  </label>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'FnCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
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
.fn-checkbox {
  display: inline-block;
  position: relative;
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  margin-right: 30px;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  .fn-checkbox_input {
    display: inline-block;
    position: relative;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
    vertical-align: middle;
    .fn-checkbox_inner {
      display: inline-block;
      position: relative;
      width: 14px;
      height: 14px;
      border-radius: 2px;
      box-sizing: border-box;
      border: 1px solid #dcdfe6;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s,
        cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        /* 这里使用边框实现对勾的样式 */
        content: '';
        border: 1px solid #ffffff;
        position: absolute;
        width: 3px;
        height: 7px;
        top: 1px;
        left: 4px;
        border-left: 0;
        border-top: 0;
        box-sizing: content-box;
        transform: rotate(45deg) scaleY(0);
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .fn-checkbox_original {
      position: absolute;
      width: 0;
      height: 0;
      left: 10px;
      margin: 0;
      opacity: 0;
      outline: none;
      z-index: -1;
    }
  }
  .fn-checkbox_label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}
/* 选中的样式 */
.fn-checkbox.is-checked {
  .fn-checkbox_input {
    .fn-checkbox_inner {
      background-color: #409eff;
      border-color: #409eff;
    }
    :after {
      transform: rotate(45deg) scaleY(1);
    }
  }
  .fn-checkbox_label {
    color: #409eff;
  }
}
/* 禁选状态 */
.fn-checkbox.is-disabled {
  .fn-checkbox_inner {
    background-color: #edf2fc;
    border-color: #dcdfe6;
    cursor: not-allowed;
  }
  span.fn-checkbox_label {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
