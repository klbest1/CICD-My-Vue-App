<template>
  <div class="mine-content">
    <navigation-bar :NaviTitle="'我的'"
                    :showBack='false' />

    <p>我的</p>
  </div>
</template>

<script>
import NavigationBar from '@c/NavigationBar.vue'

export default {
  name: 'mine',
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
.mine-content {
  width: 100%;
  height: 100%;
}
</style>
