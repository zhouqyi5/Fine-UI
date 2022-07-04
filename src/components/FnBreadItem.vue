<!-- 面包屑组件-高级级(两个组件配合使用) -->
<template>
  <div class="fn-bread-item">
    <RouterLink :to="to" v-if="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'FnBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
