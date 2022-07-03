<template>
  <div class="fn-switch" :class="{ 'is-checked': modelValue }" @click="handleClick">
    <span class="fn-switch_core" ref="core">
      <span class="fn-switch_button"></span>
    </span>
    <input type="checkbox" class="fn-switch_input" :name="name" ref="input" />
  </div>
</template>
<script>
import { ref, onMounted, nextTick } from 'vue'
export default {
  name: 'FnSwitch',
  props: {
    modelValue: {
      type: Boolean,
      defualt: false
    },
    activeColor: {
      type: String,
      defualt: ''
    },
    inactiveColor: {
      type: String,
      defualt: ''
    },
    name: {
      type: String,
      defualt: ''
    }
  },
  setup(props, { emit }) {
    const core = ref(null)
    const input = ref(null)
    const handleClick = () => {
      emit('update:modelValue', !props.modelValue)
      nextTick(() => {
        colorActive()
        // 控制checkbox的值,input值同步value值
        input.value.checked = props.modelValue
      }, 0)
    }
    function colorActive() {
      // 修改开关颜色
      if (props.activeColor || props.inactiveColor) {
        const color = !props.modelValue ? props.activeColor : props.inactiveColor
        core.value.style.borderColor = color
        core.value.style.backgroundColor = color
      }
    }
    onMounted(() => {
      colorActive()
      input.value.checked = props.modelValue
    })
    return { core, input, handleClick }
  }
}
</script>
<style scoped lang="less">
.fn-switch {
  display: inline-block;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  .fn-switch_core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .fn-switch_button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
/* 选中样式 */
.is-checked {
  .fn-switch_core {
    border-color: #409eff;
    background-color: #409eff;
    .fn-switch_button {
      transform: translateX(20px);
    }
  }
}
/* 隐藏input标签 */
.fn-switch_input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}
</style>
