<template>
  <div class="goods-options ">
    <!-- 一级选项 -->
    <ul class="goods-options-list">
      <li class="goods-options-list-item"
          v-for="(item,index) in optionsList"
          :key="index">
        <a class="goods-options-list-item-content"
           @click="optionListItemClick(item,index)">
          <span class="goods-options-list-item-content-title "
                :class="{'goods-options-list-item-content-title-active':selectOption.id === item.id}">{{item.name}}</span>
          <span class="goods-options-list-item-content-icon caret"
                :class="[ isShowSub ? 'goods-options-list-item-content-icon-open':'goods-options-list-item-content-icon-close']"
                v-if="item.subs.length > 0 && selectOption.id === item.id"></span>
        </a>
      </li>
    </ul>
    <!-- 二级选项 -->
    <transition name="animation-height">
      <div class="goods-options-sub z-index-2"
           v-if="isShowSub">
        <ul class="goods-options-sub-list ">
          <li class="goods-options-sub-list-item"
              v-for="(item,index) in selectOption.subs"
              :key="index">
            <a class="goods-options-sub-list-item-content"
               @click="subOptionsClick(item,index)">
              <span class="goods-options-sub-list-item-content-title"
                    :class="{'goods-options-sub-list-item-content-title-active':selectOption.id === item.id}">{{item.name}}</span>
              <img class="goods-options-sub-list-item-content-icon"
                   src="@img/options-select.svg"
                   v-if="selectOption.id === item.id"
                   alt="">
            </a>
          </li>
        </ul>
      </div>
    </transition>

    <div class="cover"
         v-if="isShowSub"
         @click="clickCover"></div>

  </div>
</template>

<script>
export default {
  props: {
    optionsList: {
      type: Array,
      default: function () {
        return [
          {
            id: '1',
            name: '默认',
            subs: [
              {
                id: '1',
                name: '默认'
              },
              {
                id: '1-2',
                name: '价格由高到低'
              },
              {
                id: '1-3',
                name: '销量由低到高'
              }
            ]
          },
          {
            id: '2',
            name: '有货优先',
            subs: []
          },
          {
            id: '3',
            name: '直营优先',
            subs: []
          }
        ]
      }
    }
  },
  data () {
    return {
      selectOption: {},
      isShowSub: false
    }
  },
  created () {
    this.selectOption = this.optionsList[0]
  },
  watch: {
    selectOption () {
      this.$emit('optionChange', this.selectOption.id)
    }
  },
  methods: {
    optionListItemClick: function (item, index) {
      // 展开则关闭
      if (this.isShowSub) {
        this.isShowSub = false
        return
      }
      // 选中按钮
      if (item.subs.length > 0 && this.selectOption.id === item.id) {
        this.isShowSub = true
      }
      this.selectOption = item
    },
    subOptionsClick (item, index) {
      this.optionsList.forEach(listItem => {
        listItem.subs.forEach(subItem => {
          // 替换为选中状态
          if (subItem.id === item.id) {
            this.selectOption = item
            listItem.name = item.name
            listItem.id = item.id
          }
        })
      })
      // 关闭
      this.isShowSub = false
    },
    clickCover () {
      this.isShowSub = false
    }

  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goods-options {
  width: 100%;
  // display: flex;
  // flex-direction: column;

  font-size: px2rem(16);
  &-list {
    background: white;
    display: flex;

    &-item {
      display: inline-block;
      flex-grow: 1;

      &-content {
        height: px2rem(44);
        align-items: center;
        width: 100%;
        display: flex;
        // 水平居中
        justify-content: center;
        border-bottom: px2rem(1) solid rgb(233, 229, 229);

        &-title {
          margin-right: px2rem(5);

          &-active {
            color: red;
          }
        }

        &-icon {
          &-open {
            transform: rotate(-180deg);
            transition: transform 0.3s linear;
          }
          &-close {
            transform: rotate(0deg);
            transition: transform 0.3s linear;
          }
        }
      }
    }
  }

  &-sub {
    // !!绝对定位会默认从文档流末端开始排列
    position: absolute;
    width: 100%;
    max-height: px2rem(44 * 3);
    //不 hidden 动画无法执行
    overflow: hidden;
    overflow-y: scroll;

    &-list {
      // position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);

      &-item {
        background: white;

        &-content {
          height: px2rem(44);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 px2rem(10);
          border-bottom: px2rem(1) solid rgb(233, 229, 229);

          &-title {
            &-active {
              color: red;
            }
          }
          &-icon {
            width: px2rem(30);
          }
        }
      }
    }
  }

  .cover {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
  }
  .animation-height-enter-active {
    animation: animation-height-in 0.2s;
  }

  .animation-height-leave-active {
    animation: animation-height-out 0.2s;
  }

  @keyframes animation-height-in {
    0% {
      max-height: 0%;
    }

    100% {
      max-height: px2rem(44 * 3);
    }
  }

  @keyframes animation-height-out {
    0% {
      max-height: px2rem(44 * 3);
    }

    100% {
      max-height: 0;
    }
  }
}
</style>
