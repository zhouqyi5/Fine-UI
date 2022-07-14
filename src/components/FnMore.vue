<!-- 查看更多 -->
<template>
  <span class="fn-path">
    <RouterLink :to="path" class="fn-more">
      <span>查看更多</span>
      <i class="icon fine-arrow-right-bold"></i>
    </RouterLink>
  </span>
</template>

<script>
export default {
  name: 'FnMore',
  props: {
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped lang="less">
.fn-more {
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 2px;
    color: #6e6e6e;
  }
  i {
    font-size: 16px;
    vertical-align: middle;
    position: relative;
    border-radius: 50%;
  }
  &:hover {
    cursor: pointer;
    span {
      color: #05c364;
    }
    i {
      background-color: #05c364;
      color: #fff;
    }
  }
}
</style>
