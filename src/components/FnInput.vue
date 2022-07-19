<template>
  <div class="fn-input" :class="{ 'fn-input_suffix': showSuffix }">
    <input
      class="fn-input_inner"
      :class="{ 'is-disabled': disabled }"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
      :value="modelValue"
      @input="handleInput"
      :disabled="disabled"
    />
    <span class="fn-input_suffix" v-if="showSuffix">
      <!-- 清空按钮 -->
      <i class="icon fine-close-bold" v-if="clearable && modelValue" @click="clear"></i>
      <!-- 查看密码按钮 -->
      <i
        class="icon fine-browse"
        v-if="showPassword && type == 'password'"
        @click="handlePassword"
      ></i>
    </span>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
export default {
  name: 'FnInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    // input类型：text与password可选
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    // 禁选控件
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    // 右侧清除内容控件
    clearable: {
      type: Boolean,
      default: false
    },
    // 密码显示隐藏控件
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    function handleInput(e) {
      emit('update:modelValue', e.target.value)
    }

    const showSuffix = computed(() => {
      return props.clearable || props.showPassword
    })

    const clear = () => {
      emit('update:modelValue', '')
    }
    const passwordVisible = ref(false)
    const handlePassword = () => {
      passwordVisible.value = !passwordVisible.value
    }
    return { handleInput, showSuffix, clear, passwordVisible, handlePassword }
  }
}
</script>
<style scoped lang="less">
.fn-input {
  width: 50%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .fn-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;
    &:hover,
    &:focus {
      outline: none;
      border-color: #05c364;
    }
    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
/* 后面加suffix的意思是后面如果有后缀的话，触发该样式 */
.fn-input_suffix {
  .fn-input_inner {
    padding-right: 30px;
  }
  .fn-input_suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>
