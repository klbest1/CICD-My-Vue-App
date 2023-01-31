<template>
  <div class="home" ref="home" @scroll="onScroll($event)">
    <navigation-bar :showDefalut="false" :navigationStyle="naviBgColor">
      <!-- 注意 slot的写法 -->
      <template v-slot:left>
        <img :src="currentNaviUIInfo.leftIcon" alt="" />
      </template>
      <template v-slot:center>
        <search
          :searchIcon="currentNaviUIInfo.searhIcon"
          :bgColor="currentNaviUIInfo.searchFieldColor"
          :hintColor="currentNaviUIInfo.searchTxtColor"
        />
      </template>

      <template v-slot:right>
        <img :src="currentNaviUIInfo.rightIcon" alt="" />
      </template>
    </navigation-bar>
    <div class="home-content">
      <my-swiper
        :swiperImages="swiperImages"
        :height="swiperHeight"
      ></my-swiper>
      <activity>
        <div class="home-content-activity">
          <img
            v-for="(activity, index) in activityData"
            :key="index"
            :src="activity.icon"
            class="home-content-activity-image"
            alt=""
          />
        </div>
      </activity>

      <mode-options></mode-options>
      <seconds :secondsData="secondsData" />

      <activity>
        <div class="activity-pin-goujie">
          <img src="@img/haoHuoQiang.gif" />
        </div>
      </activity>

      <goods :styleType="'water'" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MySwiper from '@c/MySwipper.vue'
import Activity from '@c/Activity.vue'
import ModeOptions from '@c/ModeOptions.vue'
import Seconds from '@c/Seconds.vue'
import Goods from '@c/Goods.vue'
import NavigationBar from '@c/NavigationBar.vue'
import Search from '@c/Search.vue'

export default {
  name: 'home',
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data: function () {
    return {
      swiperData: [],
      activityData: [],
      secondsData: [],
      scrollHeight: 150,
      naviBgColor: { background: '', position: 'fixed' },
      naviBarUIInfo: {
        normal: {
          leftIcon: require('@img/more-white.svg'),
          rightIcon: require('@img/message-white.svg'),
          searhIcon: require('@img/search.svg'),
          searchFieldColor: { background: 'white' },
          searchTxtColor: { color: 'grey' }
        },
        scroll: {
          leftIcon: require('@img/more.svg'),
          rightIcon: require('@img/message.svg'),
          searhIcon: require('@img/search-white.svg'),
          searchFieldColor: { background: 'grey' },
          searchTxtColor: { color: 'white' }
        }
      },
      currentNaviUIInfo: {},
      // swiperImgs: [
      // require('@img/swiper-1.jpg'),
      // require('@img/swiper-2.jpg'),
      // require('@img/swiper-3.jpg'),
      // require('@img/swiper-4.jpg'),
      // require('@img/swiper-5.jpg'),
      // require('@img/swiper-6.jpg')
      // ],
      swiperHeight: '184px',
      // <!-- 保持滑动状态 -->
      scrollTop: 0
    }
  },
  created: function () {
    this.initData()
  },
  computed: {
    swiperImages () {
      return this.swiperData.map(item => item.icon)
    }
  },
  activated () {
    // 保持滑动状态
    this.$refs.home.scrollTop = this.scrollTop
  },
  methods: {
    initData () {
      this.currentNaviUIInfo = this.naviBarUIInfo.normal
      // this.$http
      // .get('/swiper')
      // .then(data => {
      // this.swiperData = data.list
      // })
      // .catch(err => {
      // console.log(err)
      // })

      // this.$http
      // .get('/activitys')
      // .then(data => {
      // this.activityData = data.list
      // })
      // .catch(err => {
      // console.log(err)
      // })

      this.$http
        .all([
          this.$http.get('/swiper'),
          this.$http.get('/activitys'),
          this.$http.get('/seconds')
        ])
        .then(
          this.$http.spread((swiperData, activityData, secondsData) => {
            //
            if (swiperData) {
              this.swiperData = swiperData.list
            }

            if (activityData) {
              this.activityData = activityData.list
            }

            this.secondsData = secondsData.list
          })
        )
    },
    onScroll (event) {
      let offsetScroll = event.target.scrollTop
      this.scrollTop = offsetScroll
      let opacity = offsetScroll / this.scrollHeight
      this.naviBgColor = {
        background: 'rgba(255,255,255,' + opacity + ')',
        position: 'fixed'
      }
      // this.naviBgColor = { 'background': 'white' }

      if (opacity > 1) {
        this.currentNaviUIInfo = this.naviBarUIInfo.scroll
      } else {
        this.currentNaviUIInfo = this.naviBarUIInfo.normal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.home {
  // position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  background: rgb(243, 237, 237);

  &-content {
    // position: absolute;
    height: 100%;
    &-activity {
      height: 100%;
      margin-top: px2rem(-8);

      &-image {
        display: inline-block;
        width: 33.33%;
        height: 100%;
      }
    }

    .activity-pin-goujie img {
      width: 100%;
    }
  }
}

.test {
  width: 100%;
  height: 70px;
}
</style>
