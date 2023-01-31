<template>
  <div class="tool-bar">
    <div
      class="tool-bar-item"
      @click="clickBarItem(item, index)"
      v-for="(item, index) in toolBarData"
      :key="index"
    >
      <img
        class="tool-bar-item-img"
        :src="[index === selectedInex ? item.hIcon : item.nIcon]"
      />
      <p
        class="tool-bar-item-name"
        :class="{ 'tool-bar-item-name-h': selectedInex === index }"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toolBar',
  data: function () {
    return {
      selectedInex: 0,
      // tab 按钮数据源
      toolBarData: [
        {
          nIcon: require('@img/home-n.svg'),
          hIcon: require('@img/home-h.svg'),
          name: '首页',
          componentsName: 'home'
        },
        {
          nIcon: require('@img/shopping-n.svg'),
          hIcon: require('@img/shopping-h.svg'),
          name: '购物车',
          componentsName: 'shopping'
        },
        {
          nIcon: require('@img/my-n.svg'),
          hIcon: require('@img/my-h.svg'),
          name: '我的',
          componentsName: 'mine'
        }
      ]
    }
  },
  methods: {
    clickBarItem (item, index) {
      this.selectedInex = index
      this.$emit('toolBarItemSelected', item.componentsName)
    },
    selectComponentAtIndex (index) {
      if (index >= this.toolBarData.length || index === undefined) {
        return
      }
      this.clickBarItem(this.toolBarData[index], index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";

.tool-bar {
  // position: fixed;
  // bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: px2rem(64);
  width: 100%;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-img {
      width: px2rem(30);
      height: px2rem(30);
      align-self: center;
    }

    &-name {
      padding-top: px2rem(5);
      font-size: px2rem(14);
      line-height: px2rem(14);
      color: black;
      &-h {
        color: red;
      }
    }
  }
}
</style>
