<template>
  <div class="count-down">
    <span class="count-down-left">{{time}}点场</span>
    <span class="count-down-right">{{showSeconds}}</span>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      required: true
    }
  },
  name: 'CountDown',
  data: function () {
    return {
      diffSeconds: 0,
      timeInterval: undefined
    }
  },
  created () {
    let currentDate = new Date()
    let currentInterval = currentDate.getTime() / 1000
    let endDateContent = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + ' ' + this.time + ':' + '00:00'
    let endDate = new Date(endDateContent)
    let endDateIntverval = new Date(endDate).getTime() / 1000
    let seconds = endDateIntverval - currentInterval
    this.diffSeconds = parseInt(seconds)
    this.countDownTime()
  },
  methods: {
    countDownTime () {
      if (this.timeInterval) {
        clearInterval(this.timeInterval)
      }
      this.timeInterval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  computed: {
    showSeconds () {
      let hours = parseInt(this.diffSeconds / 60 / 60)
      if (hours < 10) {
        hours = '0' + hours
      }
      let minutes = parseInt(this.diffSeconds / 60 % 60)
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      let seconds = parseInt(this.diffSeconds % 60)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return hours + ':' + minutes + ':' + seconds
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.count-down {
  display: inline-block;
  border-radius: px2rem(18);
  margin-left: px2rem(20);
  font-size: px2rem(17);
  overflow: hidden;

  &-left {
    background: rgb(209, 58, 58);
    color: white;
    padding: px2rem(5) px2rem(10);
  }

  &-right {
    background: rgb(235, 220, 220);
    padding: px2rem(5) px2rem(10);
  }
}
</style>
