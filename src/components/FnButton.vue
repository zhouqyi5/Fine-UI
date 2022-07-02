<!-- 按钮组件 -->
<template>
  <button
    class="fn-button ellipsis"
    :class="[
      size,
      `fn-button-${type}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled
      }
    ]"
    :disabled="disabled"
  >
    <i v-if="icon" :class="`one-icon-${icon}`"></i>
    <span v-if="$slots.default"><slot></slot></span>
    <div class="mask" v-if="disabled"></div>
  </button>
</template>
<script>
export default {
  name: 'FnButton',
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: ''
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="less">
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.fn-button {
  display: inline-block;
  position: relative;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  /* 禁止元素的文字被选中 */
  -moz-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  /* font-size: 14px; */
  border-radius: 4px;
  &:hover,
  &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}

/* size：控制的大小 */
/* 特大按钮 */
.large {
  min-width: 142px;
  height: 60px;
  font-size: 26px;
  padding: 0 30px;
  i {
    font-size: 26px;
  }
}
/* 默认按钮 */
.middle {
  min-width: 90px;
  height: 46px;
  font-size: 16px;
  padding: 0 20px;
  i {
    font-size: 16px;
  }
}
/* 小型按钮 */
.small {
  min-width: 60px;
  height: 36px;
  font-size: 14px;
  padding: 0 12px;
  i {
    font-size: 14px;
  }
}
/* 迷你按钮 */
.mini {
  min-width: 46px;
  height: 28px;
  font-size: 12px;
  padding: 0 6px;
  i {
    font-size: 12px;
  }
}

/* type：控制的颜色类型 */
/* 颜色：默认灰白色 */
.fn-button-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  &:hover,
  &:focus {
    background: #66b1ff;
    background-color: #66b1ff;
    color: #fff;
  }
}
.fn-button-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  &:hover,
  &:focus {
    background: #85ce61;
    background-color: #85ce61;
    color: #fff;
  }
}
.fn-button-info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
  &:hover,
  &:focus {
    background: #a6a9ad;
    background-color: #a6a9ad;
    color: #fff;
  }
}
.fn-button-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  &:hover,
  &:focus {
    background: #ebb563;
    background-color: #ebb563;
    color: #fff;
  }
}
.fn-button-danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
  &:hover,
  &:focus {
    background: #f78989;
    background-color: #f78989;
    color: #fff;
  }
}
/* 朴素按钮样式 */
.fn-button.is-plain {
  &:hover,
  &:focus {
    background: #fff;
    border-color: #489eff;
    color: #409eff;
  }
}
.fn-button-primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  &:hover,
  &:focus {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
.fn-button-success.is-plain {
  color: #67c23a;
  background: #c2e7b0;
  &:hover,
  &:focus {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}
.fn-button-info.is-plain {
  color: #909399;
  background: #d3d4d6;
  &:hover,
  &:focus {
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}
.fn-button-warning.is-plain {
  color: #e6a23c;
  background: #f5dab1;
  &:hover,
  &:focus {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}
.fn-button-danger.is-plain {
  color: #f56c6c;
  background: #fbc4c4;
  &:hover,
  &:focus {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}
/* round属性 */
.fn-button.is-round {
  border-radius: 20px;
}
/* circle属性 */
.fn-button.is-circle {
  min-width: 36px;
  width: 36px;
  height: 36px;
  font-size: 16px;
  padding: 0;
  border-radius: 50%;
}
/* icon配套样式 */
.fn-button [class*='one-icon-'] + span {
  margin-left: 3px;
}
/* disabled禁用属性 */
.fn-button.is-disabled .mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  left: 0;
  top: 0;
  z-index: 100;
}
.fn-button.is-round .mask {
  border-radius: 20px;
}

.fn-button.is-circle .mask {
  border-radius: 50%;
}
.fn-button.is-disabled {
  cursor: no-drop;
}
</style>
