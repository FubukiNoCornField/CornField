<!--
TODO: 1. Add Vuex to store loginState
At: https://zh.nuxtjs.org/guide/vuex-store#%E6%99%AE%E9%80%9A%E6%96%B9%E5%BC%8F
Eg: https://zh.nuxtjs.org/examples/vuex-store
TODO: 2. Add Middleware to confirm login
At: https://zh.nuxtjs.org/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6
Eg: https://zh.nuxtjs.org/examples/auth-routes
Eg: https://zh.nuxtjs.org/examples/middleware/
TODO: 3. Adjust parameters
At: https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate3d
-->

<template>
  <div>
    <div>
      <transition name="fade">
        <img src="/blackboard/demo/1.png" v-show="b1" />
      </transition>
      <transition name="fade">
        <img src="/blackboard/demo/3.png" v-show="b2" />
      </transition>
      <transition name="fade">
        <img src="/blackboard/demo/2.png" v-show="b3" :style="style" />
      </transition>
    </div>
    <canvas
      @mousemove="update"
      @mouseout="update"
      @touchmove="update"
      @touchend="update"
      ref="rootCanvas"
    ></canvas>
  </div>
</template>

<script>
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default {
  layout: 'empty',
  head: {
    title: 'Demo'
  },
  data() {
    return {
      b1: false,
      b2: false,
      b3: false,
      x: 0,
      y: 0,
      screenWidth: 0,
      screenHeight: 0,
      style: false
    }
  },
  async mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.innerWidth
        that.$refs.rootCanvas.width = window.innerWidth
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.innerHeight
        that.$refs.rootCanvas.height = window.innerHeight
      })()
    }
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
    this.$refs.rootCanvas.width = window.innerWidth
    this.$refs.rootCanvas.height = window.innerHeight
    // await delay(1000)
    this.b1 = true
    await delay(2000)
    this.b2 = true
    await delay(2000)
    this.b3 = true
  },
  methods: {
    update(e) {
      const event = e || window.event
      switch (event.type) {
        case 'mousemove':
          this.x = Number(event.offsetX) / Number(this.screenWidth) - 0.5
          this.y = Number(event.offsetY) / Number(this.screenHeight) - 0.5
          break
        case 'touchmove':
          this.x =
            Number(event.touches[0].screenX) / Number(this.screenWidth) - 0.5
          this.y =
            Number(event.touches[0].screenY) / Number(this.screenHeight) - 0.5
          event.preventDefault()
          break
        case 'touchend':
        case 'mouseout':
          return this.transformPic(false)
      }
      this.transformPic(true)
    },
    transformPic(e) {
      if (!e) {
        this.x = 0
        this.y = 0
      } else {
        // this.x = -this.x
        this.y = -this.y
        this.x *= 0.2
        this.y *= 0.2
      }
      this.style = `  
-webkit-transform-style: preserve-3d;
-moz-transform-style: preserve-3d;
-ms-transform-style: preserve-3d;
-o-transform-style: preserve-3d;
transform-style: preserve-3d;
-webkit-transform: rotate3d(${this.y}, ${this.x}, 0, 20deg);
-moz-transform: rotate3d(${this.y}, ${this.x}, 0, 20deg);
-ms-transform: rotate3d(${this.y}, ${this.x}, 0, 20deg);
-o-transform: rotate3d(${this.y}, ${this.x}, 0, 20deg);
transform: rotate3d(${this.y}, ${this.x}, 0, 20deg);`
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  width: 100%;
  display: block;
  overflow: hidden;
}
canvas,
img {
  display: block;
  position: absolute;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
