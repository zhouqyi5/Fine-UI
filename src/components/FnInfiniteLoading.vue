<!-- 无限加载组件 -->
<template>
  <div class="fn-infinite-loading target" ref="target">
    <div class="fn-loading" v-if="loading">
      <span class="fn-loading_text">加载中...</span>
    </div>
    <div class="fn-none" v-if="finished">
      <span class="fn-none_text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'FnInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const target = ref(null)
    onMounted(() => {
      // 构建观察器
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          // 目标元素与根元素相交
          if (isIntersecting) {
            // console.log('进入可视区啦啦啦')
            // 触发加载条件：请求加载完成，数据加载完毕
            if (!props.loading && !props.finished) {
              emit('infinite')
            }
          }
        },
        {
          threshold: 0.01 // 相交距离
        }
      )
      // 组件销毁前停止监听
      destroyed(observer)
      // 观察目标元素
      observer.observe(target.value)
    })

    const destroyed = (observer) => {
      onBeforeUnmount(() => {
        observer.disconnect()
      })
    }

    return { target }
  }
}
</script>

<style scoped lang="less">
.fn-infinite-loading {
  .fn-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    &_text {
      color: #999;
      font-size: 16px;
    }
  }
  .fn-none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    &fn-none_text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
