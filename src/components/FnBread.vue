<!-- 面包屑组件 -->
<script>
import { h } from 'vue'
export default {
  name: 'FnBread',
  render() {
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < items.length - 1) {
        dymanicItems.push(h('i', { class: 'icon fine-arrow-double-right' }))
      }
    })
    return h('div', { class: 'fn-bread' }, dymanicItems)
  }
}
</script>

<style lang="less">
.fn-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: #05c364;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
