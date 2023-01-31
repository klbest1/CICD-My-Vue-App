<template>
  <div class="options-content">
    <div
      class="options-content-menu"
      @click="itemClick"
      v-for="(item, index) in dataSource"
      :key="index"
    >
      <img class="options-content-menu-image" :src="item.icon" />
      <p class="options-content-menu-title" v-text="item.title"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModeOptions',
  data () {
    return {
      dataSource: [
        {
          id: '1',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '2',
          icon: require('@img/haiTunQuanQiu.png'),
          title: '海屯全球'
        },
        {
          id: '3',
          icon: require('@img/jingDongFuShi.png'),
          title: '京东服饰'
        },
        {
          id: '4',
          icon: require('@img/jingDongShengXian.png'),
          title: '京东生鲜'
        },
        {
          id: '5',
          icon: require('@img/jingDongDaoJia.png'),
          title: '京东到家'
        },
        {
          id: '6',
          icon: require('@img/chongZhiJiaoFei.png'),
          title: '充值缴费'
        },
        {
          id: '7',
          icon: require('@img/jingDongPinGou.png'),
          title: '9.9元拼'
        },
        {
          id: '8',
          icon: require('@img/lingJuan.png'),
          title: '领劵'
        },
        {
          id: '9',
          icon: require('@img/zhuanQian.png'),
          title: '赚钱'
        },
        {
          id: '10',
          icon: require('@img/quanBu.png'),
          title: '全部'
        }
      ]
    }
  },
  methods: {
    itemClick () {
    // md.openWin(
    // {
    // name: 'newPage',
    // url: 'wgt://index.html#/goodsList',
    // reload: true,
    // pageParam: {}
    // },
    // function (ret, err) {
    // if (ret) {
    // alert(JSON.stringify(ret))
    // } else {
    // alert(JSON.stringify(ret))
    // }
    // }
    // )
      this.$router.push({ name: 'goodsList', params: { pushType: 'push' } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.options-content {
  position: relative;
  widows: 100%;
  height: pxrem(90);
  overflow: hidden;
  background: white;

  &-menu {
    float: left;
    width: 20%;
    text-align: center;

    &-image {
      width: px2rem(66);
      height: px2rem(66);
    }

    &-title {
      font-size: px2rem(18);
    }
  }
}
</style>
