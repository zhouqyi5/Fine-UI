<!-- 按钮组件 -->
<template>
  <button class="fine-button ellipsis" :class="[size, type]">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'FineButton',
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>
<style scoped lang="less">
.fine-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  &:hover::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
  &:active::after {
    /* transform: translateY(-1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); */
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }
}

/* size：控制的大小 */
/* 特大按钮 */
.large {
  min-width: 142px;
  height: 60px;
  font-size: 20px;
  padding: 0 30px;
}
/* 默认按钮 */
.middle {
  min-width: 90px;
  height: 46px;
  font-size: 16px;
  padding: 0 20px;
}
/* 小型按钮 */
.small {
  min-width: 60px;
  height: 36px;
  font-size: 14px;
  padding: 0 12px;
}
/* 迷你按钮 */
.mini {
  min-width: 46px;
  height: 28px;
  font-size: 12px;
  padding: 0 6px;
}

/* type：控制的颜色类型 */
/* 颜色：默认灰白色 */
.default {
  border-color: lighten(@grayColor, 20%);
  color: @ShabColor;
}
/* 主要按钮 */
.primary {
  border-color: @fineColor;
  background: @fineColor;
  color: @whiteColor;
}
/* 成功按钮 */
.success {
  border-color: @sucColor;
  background: @sucColor;
  color: @whiteColor;
}

/* 信息按钮 */
.info {
  border-color: @grayColor;
  background: @grayColor;
  color: @whiteColor;
}
/* 警告按钮 */
.warning {
  border-color: @warnColor;
  background: @warnColor;
  color: @whiteColor;
}
/* 危险按钮 */
.danger {
  border-color: @dangerColor;
  background: @dangerColor;
  color: @whiteColor;
}
/* 朴素 绿色 */
.primary-plain {
  border-color: lighten(@fineColor, 30%);
  color: @fineColor;
  background: lighten(@fineColor, 55%);
}
.success-plain {
  border-color: lighten(@sucColor, 25%);
  color: @sucColor;
  background: lighten(@sucColor, 40%);
}
.info-plain {
  border-color: lighten(@grayColor, 20%);
  color: @grayColor;
  background: lighten(@grayColor, 35%);
}
.warning-plain {
  border-color: lighten(@warnColor, 15%);
  color: @warnColor;
  background: lighten(@warnColor, 25%);
}
.danger-plain {
  border-color: lighten(@dangerColor, 30%);
  color: @dangerColor;
  background: lighten(@dangerColor, 48%);
}
</style>
