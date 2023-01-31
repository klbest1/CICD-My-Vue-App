<template>
  <div class="shopping">
    <navigation-bar :NaviTitle="'购物车'" :showBack="false" />

    <ul class="shopping-content">
      <li
        class="shopping-content-item"
        v-for="(item, index) in buyGoods"
        :key="index"
      >
        <div class="shopping-content-item-content">
          <img
            :src="
              item.select
                ? require('@img/check.svg')
                : require('@img/no-check.svg')
            "
            class="shopping-content-item-content-select-icon"
            @click="itemClick(item)"
            alt=""
          />
          <img
            :src="item.img"
            class="shopping-content-item-content-img"
            alt=""
          />
          <div class="shopping-content-item-content-desc">
            <p class="shopping-content-item-content-desc-name">
              {{ item.name }}
            </p>
            <div class="shopping-content-item-content-desc-bottom">
              <span class="shopping-content-item-content-desc-bottom-price"
                >¥{{ item.price }}</span
              >
              <div
                class="shopping-content-item-content-desc-bottom-button-content"
              >
                <button
                  @click="dclineClick(item)"
                  class="shopping-content-item-content-desc-bottom-button-content-decline"
                >
                  -
                </button>
                <span
                  class="shopping-content-item-content-desc-bottom-button-content-number"
                  >{{ item.number }}</span
                >
                <button
                  @click="addClick(item)"
                  class="shopping-content-item-content-desc-bottom-button-content-add"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="shopping-bottom">
      <div class="shopping-bottom-select">
        <img
          @click="allClick"
          class="shopping-bottom-select-icon"
          :src="
            this.allGoodsData.select
              ? require('@img/check.svg')
              : require('@img/no-check.svg')
          "
          alt=""
        />
        <span class="shopping-bottom-select-desc">全选</span>
      </div>
      <div class="shopping-bottom-desc">
        <p class="shopping-bottom-desc-title">
          合计：¥{{ this.allGoodsData.finalMount }}
        </p>
        <p class="shopping-bottom-desc-subtitle">
          总额：¥{{ this.allGoodsData.totalMount }} 立减：¥{{
            this.allGoodsData.cutMount
          }}
        </p>
      </div>
      <button @click="buyClick" class="shopping-bottom-buy">
        去结算({{ this.allGoodsData.totalNumber }})
      </button>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/NavigationBar.vue'

export default {
  name: 'shopping',
  components: {
    NavigationBar
  },
  data: function () {
    return {
      buyGoods: [],
      allGoodsData: {
        select: false,
        finalMount: 0,
        totalMount: 0,
        cutMount: 0,
        totalNumber: 0
      }
    }
  },
  created () {
    this.buyGoods = this.$store.state.goodsData
    this.changeAllGoodsData()
  },
  computed: {},
  methods: {
    // 如果用computed 返回一个对象，不会被观察到变化
    changeAllGoodsData () {
      // 初始化，这种计算方式比较优雅、简单
      this.allGoodsData = {
        select: true,
        finalMount: 0,
        totalMount: 0,
        cutMount: 0,
        totalNumber: 0
      }

      this.buyGoods.forEach(item => {
        if (item.select) {
          this.allGoodsData.totalMount += parseFloat(item.price) * item.number
          this.allGoodsData.totalNumber += item.number
        } else {
          // 这里比较优雅的计算
          this.allGoodsData.select = false
        }
      })

      this.allGoodsData.finalMount =
        this.allGoodsData.totalMount - this.allGoodsData.cutMount
    },
    itemClick (item) {
      item.select = !item.select
      this.changeAllGoodsData()
    },
    dclineClick (item) {
      item.number -= 1
      if (item.number < 1) {
        item.number = 1
      }
      if (item.select) {
        this.changeAllGoodsData()
      }
    },
    addClick (item) {
      item.number += 1
      if (item.select) {
        this.changeAllGoodsData()
      }
    },
    allClick () {
      this.allGoodsData.select = !this.allGoodsData.select

      this.buyGoods.forEach(item => {
        item.select = this.allGoodsData.select
      })

      this.changeAllGoodsData()
    },
    buyClick () {}
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.shopping {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;

  position: relative;
  &-content {
    height: 100%;
    background: rgba(243, 241, 241, 0.3);
    overflow: hidden;
    &-item {
      &-content {
        padding: px2rem(5) px2rem(10);
        background: white;
        display: flex;
        //这里也会影响子子元素 space betwteen 的高度
        // align-items: center;

        &-select-icon {
          width: px2rem(20);
          height: px2rem(20);
          align-self: center;
          padding: px2rem(6);
        }
        &-img {
          width: px2rem(86);
          height: px2rem(86);
        }

        &-desc {
          //去掉高度100%，由于父元素高度为auto ,这里的100%为内容的高度
          // height: 100%;
          padding: 0 px2rem(10);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          &-name {
            font-size: px2rem(16);
          }
          &-bottom {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            &-price {
              font-size: px2rem(17);
              color: red;
            }

            &-button-content {
              &-decline {
                font-size: px2rem(15);
              }
              &-number {
                font-size: px2rem(18);
                background: #808080;
                display: inline-block;
                width: px2rem(30);
                height: px2rem(20);
                text-align: center;
                line-height: px2rem(20);
              }
              &-add {
                font-size: px2rem(15);
              }
            }
          }
        }
      }
    }
  }

  &-bottom {
    box-shadow: 0 0 10px rgb(206, 202, 202);
    width: 100%;
    left: 0;
    bottom: 0;
    height: px2rem(80);
    background: white;
    padding-left: px2rem(10);
    display: flex;

    &-select {
      align-self: center;
      // text-align: center;
      display: flex;
      align-items: center;

      &-icon {
        width: px2rem(20);
        height: px2rem(20);
      }

      &-desc {
        padding-left: px2rem(10);
        font-size: px2rem(15);
        line-height: px2rem(20);
      }
    }

    &-desc {
      align-self: center;
      //这个可以让中间占完所有空间，“去结算”按钮则可以右对齐
      flex-grow: 2;
      &-title {
        font-size: px2rem(18);
        line-height: px2rem(18);
      }

      &-subtitle {
        padding-top: px2rem(5);
        font-size: px2rem(16);
        line-height: px2rem(16);
      }
    }

    &-buy {
      background: red;
      font-size: px2rem(20);
      color: white;
      outline: none;
      //这个也可以让按钮右对齐
      // margin-left: auto;
      padding: 0 px2rem(15);
    }
  }
}
</style>
