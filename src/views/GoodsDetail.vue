<template>
  <div class="goodsDetail">
    <navigation-bar
      :showBack="false"
      :showDefalut="false"
      @leftClick="leftClick"
      :navigationStyle="naviBgColor"
    >
      <template v-slot:left>
        <div class="goodsDetail-navi-left">
          <img
            class="goodsDetail-navi-black"
            src="@img/back-2.svg"
            :style="{ opacity: naviLeftBlackOpacity }"
          />
          <img
            class="goodsDetail-navi-white"
            src="@img/back-white.svg"
            :style="{ opacity: naviLeftWhiteOpacity }"
          />
        </div>
      </template>

      <template v-slot:center>
        <div class="goodsDetail-navi-center">
          <p
            class="goodsDetail-navi-center-title"
            :style="{ opacity: naviLeftWhiteOpacity }"
          >
            商品详情
          </p>
        </div>
      </template>
    </navigation-bar>

    <div class="goodsDetail-content">
      <parrallex @onScrollValue="onScrollValue">
        <template v-slot:slot-top>
          <swipper
            :height="SWIPPER_HEIGHT + 'px'"
            :swiperImages="goodsItem.swiperImgs"
            :pagenationType="'2'"
          >
          </swipper>
        </template>

        <template>
          <div class="goodsDetail-content-desc">
            <div class="goodsDetail-content-desc-item">
              <span class="goodsDetail-content-desc-item-price"
                >¥{{ goodsItem.price }}</span
              >
              <p class="goodsDetail-content-desc-item-content">
                {{ goodsItem.name }}
              </p>
            </div>

            <ul class="goodsDetail-content-desc-send">
              <li
                class="goodsDetail-content-desc-send-item"
                v-for="(item, index) in support"
                :key="index"
              >
                <img src="@img/support.svg" alt="" />
                <span class="goodsDetail-content-desc-send-item-desc">{{
                  item
                }}</span>
              </li>
            </ul>
            <div class="goodsDetail-content-desc-detail">
              <img
                class="goodsDetail-content-desc-detail-image"
                v-for="(item, index) in goodsItem.detailImgs"
                :key="index"
                :src="item"
              />
            </div>
          </div>
        </template>
      </parrallex>
    </div>

    <div class="goodsDetail-bottom">
      <span
        class="goodsDetail-bottom-button goodsDetail-bottom-chart"
        @click="chartClick"
        >加入购物车</span
      >
      <span
        class="goodsDetail-bottom-button goodsDetail-bottom-buy"
        @click="buyClick"
        >立即购买</span
      >
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/NavigationBar'
import Swipper from '@c/MySwipper'
import Parrallex from '@c/Parallex'
import Goods from './../store/index'

export default {
  name: 'goodsDetail',
  components: {
    NavigationBar,
    Swipper,
    Parrallex
  },
  data: function () {
    return {
      SWIPPER_HEIGHT: 364,
      goodsItem: {},
      naviBgColor: {
        backgroundColor: '',
        position: 'fixed'
      },
      support: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时购',
        '可自提',
        '不可使用优惠券'
      ],
      naviLeftBlackOpacity: 1,
      naviLeftWhiteOpacity: 0,
      SCROLL_HEIGHT: 300
    }
  },
  mounted () {
    let goodsId = this.$route.query.goodsId
    this.$http.get('goodsDetail', { params: { goodsId } }).then(data => {
      this.goodsItem = data.goodsData
    })
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    },
    onScrollValue (top) {
      let opacity = top / this.SCROLL_HEIGHT
      if (opacity > 1) {
        opacity = 1
      }
      this.naviBgColor.backgroundColor = 'rgba(255, 0, 0,' + opacity + ')'
      this.naviLeftBlackOpacity = 1 - opacity
      this.naviLeftWhiteOpacity = opacity
    },
    buyClick () {
      this.$router.push({
        name: 'Buy',
        params: {
          goodsItem: this.goodsItem,
          pushType: 'push'
        }
      })
    },
    chartClick () {
      this.$store.commit('addGoods', this.goodsItem)
      this.$router.push({
        name: 'Main',
        params: {
          selectIndex: 1,
          pushType: 'push',
          clearStack: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.test-shadow {
  box-shadow: 0 0 16px 0 rgba(216, 124, 124, 0.2);
}

.goodsDetail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  &-navi-left {
    display: flex;
    position: relative;
    width: 100%;

    img {
      position: absolute;
      align-self: center;
      left: px2rem(10);
      // width: px2rem(40);
      // height: px2rem(40);
    }
  }

  &-navi-center {
    text-align: center;
    width: 100%;

    &-title {
      font-size: px2rem(19);
      color: white;
      line-height: px2rem(44);
    }
  }

  &-content {
    // background: rgb(247, 243, 243);
    background: white;
    //这里很重要，这样才可以让底部的按钮显示出来，
    //因为页面总共heihgt 100%,  overflow:hidden就可以显示出来
    overflow: hidden;
    // overflow-y: auto;
    width: 100%;
    height: 100%;
    &-desc {
      background: #eeeeee;
      &-item {
        background: white;
        border-top: 1px solid rgba(184, 180, 180, 0.2);
        width: 100%;

        &-price {
          color: red;
          font-size: px2rem(22);
          line-height: px2rem(24);
          padding-left: px2rem(10);
          padding-top: px2rem(5);
          display: inline-block;
          width: 100%;
        }

        &-content {
          padding: px2rem(10) px2rem(5);
          color: black;
          line-height: px2rem(24);
          font-size: px2rem(20);
          margin-bottom: px2rem(20);
        }
      }

      &-send {
        display: flex;
        flex-wrap: wrap;
        background: white;
        padding: px2rem(20) px2rem(10);
        margin-bottom: px2rem(20);

        &-item {
          display: flex;
          align-items: center;
          padding: px2rem(5);

          img {
            width: px2rem(20);
            height: px2rem(20);
          }
          &-desc {
            font-size: px2rem(12);
            line-height: px2rem(20);
            display: inline-block;
          }
        }
      }
      &-detail {
        &-image {
          width: 100%;
        }
      }
    }
  }

  &-bottom {
    //textAlign可以让按钮 右对齐
    text-align: right;

    &-button {
      display: inline-block;
      height: px2rem(44);
      line-height: px2rem(44);
      font-size: px2rem(18);
      padding: px2rem(5);
    }

    &-chart {
      background-color: orange;
      color: white;
    }

    &-buy {
      background-color: red;
      color: white;
    }
  }
}
</style>
