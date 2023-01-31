<template>
  <div class="buy">
    <navigation-bar />
    <div class="buy-item">
      <img class="buy-item-img" :src="goodsItem.img" alt="" />
      <div class="buy-item-content">
        <p class="buy-item-content-desc">{{ goodsItem.name }}</p>
        <span class="buy-item-content-price">¥{{ goodsItem.price }}</span>
      </div>
    </div>

    <ul class="buy-types">
      <li
        class="buy-types-item"
        v-for="(item, index) in buyTypes"
        :key="index"
        @click="buyItemClick(item)"
      >
        <div class="buy-types-item-container">
          <img class="buy-types-item-container-img" :src="item.icon" alt="" />
          <div class="buy-types-item-container-content">
            <p class="buy-types-item-container-content-title">
              {{ item.title }}
            </p>
            <p class="buy-types-item-container-content-desc">
              {{ item.desc }}
            </p>
          </div>
          <img
            class="buy-types-item-container-select-icon"
            :src="
              currentSelectedType.type === item.type
                ? require('@img/check.svg')
                : require('@img/no-check.svg')
            "
            alt=""
          />
        </div>
      </li>
    </ul>

    <button class="buy-button">立即购买</button>
  </div>
</template>
<script>
import NavigationBar from '@c/NavigationBar'

export default {
  props: {},
  components: {
    NavigationBar
  },
  name: 'Buy',
  data: function () {
    return {
      buyTypes: [
        {
          icon: require('@img/alipay.svg'),
          title: '支付宝支付',
          desc: '数亿用户都在用，安全可托付',
          type: 1
        },
        {
          icon: require('@img/weichat.png'),
          title: '微信支付',
          desc: '亿万用户选择，更快更安全',
          type: 2
        }
      ],
      currentSelectedType: {
        icon: require('@img/alipay.svg'),
        title: '支付宝支付',
        desc: '数亿用户都在用，安全可托付',
        type: 1
      },
      goodsItem: {}
    }
  },
  created () {
    this.goodsItem = this.$route.params.goodsItem
  },
  methods: {
    buyItemClick (item) {
      this.currentSelectedType = item
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.buy {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(156, 153, 153, 0.1);

  &-item {
    background: white;
    display: flex;
    width: 100%;
    padding: px2rem(20) px2rem(10);
    //这里因为设置了padding ,100%后会超出屏幕，设置box-sizing保持宽度不变
    box-sizing: border-box;
    &-img {
      width: px2rem(112);
      height: px2rem(112);
      border: solid 1px lightgray;
    }

    &-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: px2rem(112);
      padding: 0 px2rem(10);
      overflow: hidden;

      &-desc {
        font-size: px2rem(16);
        // padding-right: px2rem(20);
        // width: 100%;
      }
      //如何左下角对齐呢
      &-price {
        color: red;
        font-size: px2rem(17);
      }
    }
  }

  &-types {
    width: 100%;
    padding-top: px2rem(20);

    &-item {
      width: 100%;
      background: white;
      &-container {
        display: flex;
        height: px2rem(80);
        align-items: center;
        padding: 0 px2rem(10);

        &-img {
          width: px2rem(33);
          height: px2rem(33);
        }

        &-content {
          text-align: left center;
          width: 100%;
          padding-left: px2rem(10);
          &-title {
            font-size: px2rem(16);
            line-height: px2rem(20);
          }
          &-desc {
            font-size: px2rem(16);
            color: lightgray;
            line-height: px2rem(20);
          }
        }

        &-select-icon {
          align-self: center;
          text-align: right;
          width: px2rem(17);
          height: px2rem(17);
        }
      }
    }
  }

  // &-bottom {
  //   // width: 100%;
  //   padding: px2rem(60) px2rem(20);
  &-button {
    position: absolute;
    bottom: px2rem(60);
    width: 90%;
    font-size: px2rem(18);
    background: red;
    height: px2rem(60);
    color: white;
    margin-left: 5%;
  }
  // }
}
</style>
