<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperImages"
                    :key="index">
        <img class="swiper-slide-img"
             :style="{ height: height }"
             :src="slide"
             alt="" />
      </swiper-slide>

      <template v-slot:pagination>
        <div class="swiper-pagination"></div>
      </template>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    swiperImages: {
      type: Array,
      required: false
    },
    height: {
      type: String,
      required: false,
      default: '20px'
    },
    pagenationType: {
      type: String,
      default: '1'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
          // bulletClass: 'swiper-pagination-custom'
        },
        autoplay: true,
        autoHeight: true
      },
      swiperSlides: [1, 2, 3, 4, 5]
    }
  },
  created () {
    switch (this.pagenationType) {
      case '1':
        this.swiperOption.pagination = {
          el: '.swiper-pagination',
          type: 'bullets'
          // bulletClass: 'swiper-pagination-custom'
        }
        break
      case '2':
        this.swiperOption.pagination = {
          el: '.swiper-pagination',
          type: 'fraction'
          // bulletClass: 'swiper-pagination-custom'
        }
        break
      default:
        break
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

// .swiper-pagination {
//   bottom: px2rem(12);
// .swiper-pagination-custom {
//   box-sizing: border-box;
//   border-radius: 100%;
//   height: 6px;
//   width: 6px;
//   border: 1px solid red;
//   margin: 0 4px;
//   display: inline-block;
//   opacity: 1;
// }
// }

.swiper-slide-img {
  width: 100%;
}
.swiper-pagination-fraction {
  font-size: px2rem(34);
  color: white;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  //为 auto才能居右对齐
  left: auto;
  right: 0;
  bottom: px2rem(20);
  width: px2rem(100);
  border-bottom-left-radius: px2rem(10);
  border-top-left-radius: px2rem(10);
}
</style>
