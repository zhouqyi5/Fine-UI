<!-- 分页组件 -->
<template>
  <div class="fn-pagination">
    <a @click="changePager(fineCurrentPage - 1)" v-if="fineCurrentPage > 1" href="javascript:;"
      >上一页</a
    >
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      @click="changePager(i)"
      href="javascript:;"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active: i === fineCurrentPage }"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      @click="changePager(fineCurrentPage + 1)"
      v-if="fineCurrentPage < pager.pageCount"
      href="javascript:;"
      >下一页</a
    >
    <a v-else href="javascript:;" class="disabled">下一页</a>
    <!-- 输入跳转 -->
    <span class="fn-skip" v-if="skipName === true">
      <input
        type="text"
        v-model="skipData"
        class="fn-skip-data"
        :placeholder="`${fineCurrentPage}` + '/' + promptData"
        @keyup.enter="skip"
      />
      <span class="fn-skip-to" @click="skip">跳转</span>
    </span>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue'
import Message from '@/components/Message'
export default {
  name: 'FnPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    // 是否显示导航跳转
    skipName: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const count = 5 // 按钮个数
    const fineCurrentPage = ref(1) // 当前显示的第几页
    // 总页数 = 总条数 / 每条页数 向上取整
    const fineTotal = ref(props.total) // 总条数
    const finePageSize = ref(props.pageSize) // 每页条数
    // 重点：根据上述数据得到（总页数，起始页码，结束页码，按钮数组）

    const pager = computed(() => {
      // 计算总页数 = 总条数 / 每条页数 向上取整
      const pageCount = Math.ceil(fineTotal.value / finePageSize.value)
      // 按钮个数和当前页码 ===> 起始按钮，结束按钮，按钮数组
      // 计算起始页码和结束页码
      // 1. 理想情况根据当前页码，和按钮个数可得到
      const offset = Math.floor(count / 2)
      let start = fineCurrentPage.value - offset
      let end = start + count - 1
      // 2 如果起始页码小于1了，需要重新计算
      if (start < 1) {
        start = 1
        end = start + count - 1 > pageCount ? pageCount : start + count - 1
      }
      // 3 如果结束页码大于总页数，需要重新计算
      if (end > pageCount) {
        end = pageCount
        start = end - count + 1 < 1 ? 1 : end - count + 1
      }
      // 处理完毕start和end得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      // 提供返回的计算属性
      return { pageCount, btnArr, start, end }
    })

    const promptData = Math.ceil(fineTotal.value / finePageSize.value)
    // 跳转至
    const skipData = ref()
    const skip = () => {
      if (
        !skipData.value ||
        !Number(skipData.value) ||
        Number(skipData.value) < 1 ||
        Number(skipData.value) > Math.ceil(fineTotal.value / finePageSize.value)
      ) {
        return (skipData.value =
          '' || Message({ type: 'warn', text: '页码值错误，请重试！', duration: '1500' }))
      }
      fineCurrentPage.value = Number(skipData.value)
      emit('current-change', skipData.value)
      skipData.value = ''
    }

    // 监听props数据的变化，然后更新组件内部数据
    watch(
      props,
      () => {
        fineTotal.value = props.total
        fineCurrentPage.value = props.currentPage
        finePageSize.value = props.pageSize
      },
      { immediate: true }
    )

    // 切换分页的函数
    const changePager = (page) => {
      fineCurrentPage.value = page
      emit('current-change', page)
      skipData.value = ''
    }

    return { pager, fineCurrentPage, changePager, promptData, skipData, skip }
  }
}
</script>
<style scoped lang="less">
.fn-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: #fff;
      background-color: #05c364;
    }
    &.active {
      background: #05c364;
      color: #fff;
      border-color: #05c364;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }

  /* 跳转样式 */
  .fn-skip {
    float: left;
    display: flex;
    justify-content: center;
    visibility: ;
    &-data {
      width: 60px;
      font-size: 12px;
      text-align: center;
      border: 1px solid #e4e4e4;
      background-color: rgba(0, 0, 0, 0);
      border-radius: 4px;
      margin-right: 10px;
      /* 边框颜色过度 */
      transition: border-color 0.1s cubic-bezier(0.645, 045, 0.355, 1);
      &:hover,
      &:focus {
        outline: none;
        border-color: #05c364;
      }
    }
    &-to {
      width: 50px;
      line-height: 31px;
      text-align: center;
      border-radius: 4px;
      color: #fff;
      background-color: #05c364;
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      &:active {
        transform: translateY(-2px);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
