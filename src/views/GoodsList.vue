<template>
  <div class="goods-list-page">
    <navigation-bar @leftClick='leftClick'
                    :NaviTitle="'商品列表'">
      <template v-slot:right>
        <!-- <div @click="rightTypeClick"> -->
        <img :src="listType.icon"
             @click="rightTypeClick"
             alt="">
        <!-- </div> -->
      </template>
    </navigation-bar>

    <div class="goods-list-page-content">
      <goods-options @optionChange='goodsOptionChange' />
      <goods :styleType='listType.type'
             :sort='sortType'>
      </goods>
    </div>

  </div>
</template>

<script>
import NavigationBar from '@c/NavigationBar.vue'
import GoodsOptions from '@c/GoodsOptions.vue'
import Goods from '@c/Goods.vue'

export default {
  name: 'goodsList',
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  data () {
    return {
      listTypeData: [
        {
          type: 'list',
          icon: require('@img/list-type.svg')
        },
        {
          type: 'water',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      listType: {},
      sortType: '1'
    }
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    },
    rightTypeClick () {
      if (this.listType.type === 'list') {
        this.listType = this.listTypeData[1]
      } else if (this.listType.type === 'water') {
        this.listType = this.listTypeData[0]
      }
    },
    goodsOptionChange (sort) {
      this.sortType = sort
    }
  },
  created () {
    this.listType = this.listTypeData[0]
  }
}
</script>

<style lang="scss" scoped>
.goods-list-page {
  width: 100%;
  height: 100%;
  //防止不滚动,只允许部分滚动
  display: flex;
  flex-direction: column;
  position: absolute;

  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
