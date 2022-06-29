<template>
  <div class="fine-search">
    <div class="search-text">
      <input
        type="text"
        v-model.trim="searchText"
        :class="{ active: focusShow === true }"
        :placeholder="placeholder"
        @keyup.enter="changeSearch"
      />
      <span class="search-close" v-if="clearable" @click="closeSearch">取消</span>
    </div>
    <div class="search-search" @click="changeSearch">搜索</div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'FineSearch',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    closeShow: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const searchText = ref()
    const clearable = ref(props.closeShow)
    const closeSearch = ($event) => {
      emit('closeSearch', $event)
      searchText.value = ''
      clearable.value = false
    }
    const changeSearch = () => {
      emit('update:modelValue', searchText.value)
      emit('search', searchText.value)
      searchText.value = ''
      clearable.value = false
    }
    watch(
      () => searchText.value,
      () => {
        if (props.closeShow && searchText.value) {
          clearable.value = true
        } else {
          clearable.value = false
        }
      },
      { immediate: true }
    )
    return { searchText, clearable, closeSearch, changeSearch }
  }
}
</script>

<style scoped lang="less">
.fine-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 44px;
  border-radius: 4px;
  background-color: rgb(230, 230, 230);
  .search-text {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    flex: 8;
    margin: 2px 2px 2px 5px;
    input[type='text'] {
      width: 100%;
      height: 100%;
      padding-left: 5px;
      border-radius: 6px;
      background-color: rgb(245, 245, 245);
      &:focus {
        background-color: #ffffff;
      }
    }
    .search-close {
      position: absolute;
      right: 5px;
      padding: 3px;
      cursor: pointer;
      border-radius: 6px;
      background-color: rgb(225, 225, 225);
    }
  }
  .search-search {
    width: 60px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin: 2px 5px 2px 2px;
    background-color: rgb(245, 245, 245);
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      background-color: #ffffff;
    }
  }
}
</style>
