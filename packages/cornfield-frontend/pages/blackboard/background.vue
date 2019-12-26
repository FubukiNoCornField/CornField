<template>
  <div>
    <audio ref="player" :src="bgmSrc" loop autoplay></audio>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item>
        <img src="/blackboard/background/logo.png" width="670px" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  head: {
    title: 'Background'
  },
  data() {
    return {
      bgmSrc: ''
    }
  },
  mounted() {
    this.bgmSrc = '/blackboard/background/' + this.randomNum(1, 3) + '.ogg'
    setTimeout(() => {
      this.$refs.player.play()
    }, 2000)
  },
  methods: {
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        default:
          return 0
      }
    }
  }
}
</script>

<style></style>
