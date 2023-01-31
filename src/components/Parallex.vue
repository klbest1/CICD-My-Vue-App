<template>
  <div class="parrallex-content"
       @scroll="onScrollValue($event)">
    <div class="parrallex-content-top"
         :style="{top:slowTop +'px'}">
      <slot name="slot-top"></slot>
    </div>

    <div class="parrallex-content-detail z-index-2">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Parrallex',
  data: function () {
    return {
      parallexScroll: 0
    }
  },
  methods: {
    onScrollValue (event) {
      this.parallexScroll = event.target.scrollTop
      this.$emit('onScrollValue', this.parallexScroll)
    }
  },
  computed: {
    slowTop () {
      return (this.parallexScroll / 3)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.parrallex-content {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;

  &-top {
    position: relative;
    width: 100%;
  }

  &-detail {
    position: relative;
    // height: 100%;
  }
}
</style>
