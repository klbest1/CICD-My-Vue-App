<template>
  <div id="app">
    <transition :name="animationType">
      <keep-alive :include="virtualStack">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      animationType: 'pop',
      // 对 push 的前一个页面保持不加载，也就是课程所说的虚拟任务栈
      virtualStack: ['Main']
    }
  },
  mounted () {},
  watch: {
    $route (to, from) {
      let pusType = to.params.pushType
      if (pusType === 'push') {
        this.virtualStack.push(to.name)
        this.animationType = 'push'
      } else {
        this.virtualStack.pop()
        this.animationType = 'pop'
      }

      if (to.params.clearStack) {
        this.virtualStack = ['Main']
      }
    }
  }
}
</script>
>

<style lang="scss">
/**
** 注意：这里不能用Scoped，否则body 高度为0，没有overflowHiden,
**有scrolview的页面滚动到底部 整个页面将发生滚动
 */
@import "@css/style.scss";

#app {
  position: absolute;
  width: 100%;
  height: 100%;
}

.push-enter-active {
  animation: push-in;
  animation-duration: 0.3s;
}

.push-leave-active {
  animation: push-out;
  animation-duration: 0.3s;
}

.pop-enter-active {
  animation: pop-in;
  animation-duration: 0.3s;
}

.pop-leave-active {
  animation: pop-out;
  animation-duration: 0.3s;
}

// push 时 进入的页面
@keyframes push-in {
  0% {
    width: 100%;

    transform: translate(100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// push 时 out 的页面
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

//pop 时 新页面进入
@keyframes pop-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}

//pop 是 当前页面退出
@keyframes pop-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(100%, 0);
  }
}
</style>
