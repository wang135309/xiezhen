<template>
  <div class="pageDetail">
    <mt-header class="my_header">
      <mt-button slot="left">{{title}}</mt-button>
      <mt-button class=" iconfont icon-fork"
                 slot="right"
                 @click.native="$router.go(-1)"
                 ></mt-button>
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['title'],
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.my_header {
  background: #fff;
  font-size: 18px;
  color: @font_color;
}
</style>
