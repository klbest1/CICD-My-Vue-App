<template>
  <div
    class="navigation-bar z-index-heigh"
    :style="navigationStyle"
    :class="{ 'navigation-bar-bottom': showDefalut }"
  >
    <div class="navigation-bar-left" @click="leftClick">
      <img
        v-if="showDefalut && showBack"
        class="navigation-bar-left-icon"
        src="@img/back.svg"
        alt=""
      />
      <!-- 插槽名字 要注意没有冒号 -->
      <slot name="left"></slot>
    </div>
    <!-- 不知为何 用类表示时 flex-grow:1 不起作用 -->
    <div class="navigation-bar-center" :style="{ 'flex-grow': 1 }">
      <p v-if="showDefalut" class="navigation-bar-center-title">
        {{ NaviTitle }}
      </p>
      <slot name="center"></slot>
    </div>
    <div class="navigation-bar-right">
      <img v-if="showDefalut" class="navigation-bar-right-icon" src="" alt="" />
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    NaviTitle: {
      type: String,
      default: ''
    },
    showDefalut: {
      type: Boolean,
      default: true
    },
    showBack: {
      type: Boolean,
      default: true
    },
    navigationStyle: {
      type: Object,
      default: function () {
        return { background: 'white', postion: 'fixed' }
      }
    }
  },
  methods: {
    leftClick () {
      this.$emit('leftClick', '')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";

.navigation-bar {
  display: flex;
  justify-content: space-between;
  height: px2rem(44);
  width: 100%;

  &-bottom {
    border-bottom: 1px solid rgb(185, 182, 182);
  }
  //只能通过全部类名，才能使用逗号表达式
  .navigation-bar-left,
  .navigation-bar-right {
    //交叉轴居中
    display: flex;
    padding: 0 px2rem(5);
    width: px2rem(30);
    //img直接指定 100%就能正常显示，不然会被拉伸到全部
    img {
      align-self: center;
      width: 100%;
      //height: px2rem(30);
    }
  }

  .navigation-bar-center {
    display: flex;
    flex-flow: 1;

    &-title {
      // text-align: center;
      margin: 0 auto;
      align-self: center;
      font-size: px2rem(24);
      height: px2rem(44);
      line-height: px2rem(44);
    }
  }
}
</style>
