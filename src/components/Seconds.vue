<template>
  <div class="seconds-container">
    <div class="seconds-container-wrap">
      <p class="seconds-container-wrap-title">京东秒杀</p>
      <count-down :time="'24'" />
    </div>

    <div class="seconds-container-menu">
      <div class="seconds-container-menu-item"
           v-for="(item,index) in secondsData"
           :key="index">
        <img class="seconds-container-menu-item-icon"
             :src="item.icon"
             alt="">
        <p class="seconds-container-menu-item-price">¥{{item.price}}</p>
        <p class="seconds-container-menu-item-oldpirce">¥{{item.oldPrice}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from '@c/CountDown.vue'

export default {
  props: {
    secondsData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  name: 'Seconds',
  components: {
    CountDown
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.seconds-container {
  display: flex;
  flex-direction: column;
  margin-left: px2rem(5);
  margin-top: px2rem(10);
  margin-bottom: px2rem(10);
  padding-left: px2rem(10);
  border-top-left-radius: px2rem(9);
  border-end-start-radius: px2rem(9);
  background: white;

  &-wrap {
    padding: px2rem(10);
    &-title {
      font-size: px2rem(20);
      display: inline-block;
      overflow: hidden;
    }
  }

  &-menu {
    display: flex;
    overflow-x: scroll;

    &-item {
      text-align: center;
      &-icon {
        width: px2rem(100);
        height: px2rem(100);
      }

      &-price {
        color: red;
        font-size: px2rem(20);
      }
      &-oldpirce {
        font-size: px2rem(15);
        text-decoration: line-through;
      }
    }
  }
}
</style>
