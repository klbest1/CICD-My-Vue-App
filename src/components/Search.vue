<template>
  <div class="search" :style="bgColor">
    <img class="search-icon" :src="searchIcon" />
    <span class="search-title" :style="hintColor">点击搜索商品内容</span>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: Object,
      default: function () {
        return {
          background: 'white'
        }
      }
    },
    hintColor: {
      type: Object,
      default: function () {
        return {
          color: 'grey'
        }
      }
    },
    searchIcon: {
      type: String,
      default: require('@img/search.svg')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";

.search {
  width: 100%;
  border-radius: px2rem(20);
  display: flex;
  align-items: center;
  padding: 0 px2rem(20);
  margin: px2rem(5) px2rem(10);

  &-icon {
    width: px2rem(30);
  }

  &-title {
    margin-left: px2rem(5);
    font-size: px2rem(13);
  }
}
</style>
