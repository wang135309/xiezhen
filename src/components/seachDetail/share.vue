<template>
  <div class="share">
    <child-header :title='title'></child-header>
    <div class="content">
      <img :src="detailMsg.list[0]"
           alt="">
      <div class="box1">
        <div>
          <p>{{detailMsg.title}}</p>
          <p class="p1">扫码即可一爽到底观看图集</p>
        </div>
        <div id='qrcode'></div>
        <!-- <img src="@/assets/logo.png"
             alt=""> -->
      </div>
      <div class="box2">
        <div>
          <img src="@/assets/weixin.png"
               alt="">
          <p>微信分享</p>
        </div>
        <div>
          <img src="@/assets/qq.png"
               alt="">
          <p>QQ分享</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ChildHeader from '@/base/childHeader'
import QRCode from 'qrcodejs2'
import { mapGetters } from 'vuex'
export default {
  created () {
    this.title = this.$route.meta.title
    if (this.$route.params.data) {
      this.detailMsg = this.$route.params.data
    } else {
      this.$router.go(-1)
    }
  },
  computed: {
    code () {
      return this.islogin.user ? this.islogin.user.invitation : ''
    },
    ...mapGetters([
      'islogin'
    ])
  },
  data () {
    return {

    }
  },
  mounted () {
     let code = `${location.protocol}//${location.host}/${this.code}`;
    let qrcode = new QRCode('qrcode', {
        width: 50,
        height: 50,
        text: code
      })
  },
  methods: {
   
  },
  components: {
    ChildHeader
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.content {
  width: 80%;
  padding: 0 10%;
  margin: 0 auto 0.3rem;
  font-size: 12px;
  > img {
    width: 100%;
  }
  .box1 {
    width: 90%;
    display: flex;
    margin: 0 auto;
    > div {
      width: 80%;
      > p {
        margin: 0.2rem 0 0;
      }
    }
    > #qrcode {
      margin-top: 0.2rem;
      width: 20%;
      height: 1rem;
    }
    .p1 {
      color: @dominant_color;
    }
  }
  .box2 {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      width: 40px;
    }
  }
}
</style>
