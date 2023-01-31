<template>
  <div class="activity">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'activiy'
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.activity {
  max-height: px2rem(160);
  position: relative;
  background: white;
}
</style>
