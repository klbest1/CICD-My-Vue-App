<template>
  <div class="main-content">
    <keep-alive>
      <component :is="currentTabComponent"></component>
    </keep-alive>
    <tool-bar
      ref="toolBar"
      @toolBarItemSelected="toolBarItemSelected"
    ></tool-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import toolBar from '@c/ToolBar.vue'
import Home from './Home'
import Shopping from './Shopping'
import Mine from './Mine'

export default {
  name: 'Main',
  components: {
    toolBar,
    Home,
    Shopping,
    Mine
  },
  data: function () {
    return {
      currentTabComponent: 'home'
    }
  },
  activated () {
    let index = this.$route.params.selectIndex
    this.$refs.toolBar.selectComponentAtIndex(index)
  },
  methods: {
    toolBarItemSelected (name) {
      this.currentTabComponent = name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.main-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
