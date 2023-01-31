<template>
  <div class="goods-container"
       ref="goodsContainer"
       @scroll="onScroll($event)"
       :class="goodsContainerStyle"
       :style="{'height': styleType === 'water' ? contentHeight : '100%'}">
    <div class="goods-container-item"
         :class="goodsItemStyle"
         @click="clickGood(item)"
         ref="goods_item"
         v-for="(item,index) in sortData"
         :style="itemStyles[index]"
         :key="index">
      <img class="goods-container-item-img"
           :src="item.img"
           :style="{'height':randomsHeights[index]}"
           alt="">
      <div class="goods-container-item-desc">
        <p :class="{'goods-container-item-desc-no-helight':!item.isDirect}">
          <goods-direct v-if="item.isDirect" />
          <goods-no-have v-if="!item.isHave" />
          <!-- 知识点，放在同一行 -->
          {{item.name}}
        </p>
        <div class="goods-container-item-bottom">
          <span class="goods-container-item-bottom-price">¥{{item.price}}</span>
          <span class="goods-container-item-bottom-sale">销量：{{item.volume}}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GoodsDirect from '@c/GoodsDirect.vue'
import GoodsNoHave from '@c/GoodsNoHave.vue'

export default {
  props: {
    styleType: {
      type: String,
      default: 'list'
    },
    sort: {
      type: String,
      default: '1'
    }
  },
  components: {
    GoodsDirect,
    GoodsNoHave
  },
  data: function () {
    return {
      goodsData: [],
      sortData: [],
      heightLeft: 0,
      heightRight: 0,
      randomsHeights: [],
      MAX_HEIGHT: 260,
      MIN_HEIGHT: 160,
      itemStyles: [],
      contentHeight: '0',
      goodsContainerStyle: 'goods-waterfall',
      goodsItemStyle: 'goods-waterfall-item',
      scrollTop: 0
    }
  },
  created () {
    this.initData()
  },
  watch: {
    styleType () {
      this.initLayout()
    },
    sort () {
      this.setSortData()
    }
  },
  activated () {
    this.$refs.goodsContainer.scrollTop = this.scrollTop
  },
  methods: {
    initData () {
      this.$http.get('goods').then(data => {
        this.goodsData = data.list
        this.setSortData()
        this.initLayout()
      })
    },
    getHeights (listCount) {
      for (var i = 0; i < listCount; i++) {
        let height = this.MIN_HEIGHT + Math.floor(Math.random() * (this.MAX_HEIGHT - this.MIN_HEIGHT)) // 可均衡获取0到9的随机整数。
        this.randomsHeights.push(height + 'px')
      }
    },
    initWaterFull () {
      let $waterItems = this.$refs.goods_item
      $waterItems.forEach(element => {
        var style = {}
        let clientHeight = element.clientHeight

        if (this.heightLeft <= this.heightRight) {
          style.left = '0'
          style.top = this.heightLeft + 'px'
          this.heightLeft += clientHeight + 10
        } else {
          style.right = '0'
          style.top = this.heightRight + 'px'
          this.heightRight += clientHeight + 10
        }
        this.itemStyles.push(style)
      })
      this.contentHeight = this.heightLeft > this.heightRight ? this.heightLeft + 'px' : this.heightRight + 'px'
    },
    initLayout () {
      this.heightLeft = 0
      this.heightRight = 0
      this.randomsHeights = []
      this.itemStyles = []
      if (this.styleType === 'water') {
        this.goodsContainerStyle = 'goods-waterfall'
        this.goodsItemStyle = 'goods-waterfall-item'
        // 问题？style怎么绑定
        // 答案：只有获取style数据绑定，通过ref获取元素不行。需要调用nextTick
        this.getHeights(this.goodsData.length)
        this.$nextTick(() => {
          this.initWaterFull()
        })
      } else if (this.styleType === 'list') {
        this.goodsContainerStyle = 'goods-list'
        this.goodsItemStyle = 'goods-list-item'
      } else if (this.styleType === 'collection') {

      }
    },
    clickGood (item) {
      if (!item.isHave) {
        alert('暂无库存')
        return
      }
      this.$router.push({ name: 'goodsDetail', params: { pushType: 'push' }, query: { goodsId: item.id } })
    },
    setSortData () {
      this.sortData = this.goodsData.slice(0)
      switch (this.sort) {
        case '1': {
          break
        }
        case '1-2': {
          this.sortWithKey('price')
          break
        }
        case '1-3': {
          this.sortWithKey('volume')
          break
        }
        case '2': {
          this.sortWithKey('isHave')
          break
        }
        case '3': {
          this.sortWithKey('isDirect')
          break
        }
      }
    },
    sortWithKey (key) {
      // < 0 goods1 在 goods2 前面
      // > 0 goods1 在 goods2 后面
      //= = 0 不变
      this.sortData.sort((goods1, goods2) => {
        // 有货优先 直营优先
        let v1 = goods1[key]
        let v2 = goods2[key]
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
        }
        if (parseFloat(v1) > parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    onScroll (event) {
      this.scrollTop = event.target.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

// 公共部分只展示显示样式
.goods-container {
  position: relative;
  // margin-top: px2rem(10);
  width: 100%;
  overflow: hidden;
  overflow-y: auto;

  // 问题？中间的空格怎么布局？ 百分比不对。
  //答案：也是百分比
  &-item {
    background: white;

    &-desc {
      font-size: px2rem(13);
      width: 100%;
      &-no-helight {
        color: rgb(124, 118, 118);
      }
    }
    &-bottom {
      &-price {
        color: red;
        font-size: px2rem(20);
        line-height: px2rem(20);
        display: inline-block;
      }

      &-sale {
        color: grey;
        font-size: px2rem(15);
        line-height: px2rem(15);
        display: inline-block;
      }
    }
  }
}

// 不同布局的样式
.goods-waterfall {
}
.goods-waterfall-item {
  width: 49%;
  position: absolute;

  .goods-container-item-img {
    width: 100%;
  }
  .goods-container-item-bottom {
    padding: px2rem(10) px2rem(3);
    position: relative;
    //问题？ display 若不为flex，上边会有pading空白
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.goods-list {
}

.goods-list-item {
  display: flex;
  height: px2rem(150);
  padding-left: px2rem(10);

  .goods-container-item-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: px2rem(20) px2rem(10);
  }
  .goods-container-item-img {
    width: px2rem(100);
    height: px2rem(100);
    align-self: center;
  }
  .goods-container-item-bottom {
    padding: px2rem(10) px2rem(3);
    position: relative;
    //问题？ display 若不为flex，上边会有pading空白
    display: flex;
    justify-content: space-between;
  }
}
</style>
