<template>
  <div class="spread">
    <child-header :title='title'></child-header>
    <h4 style="margin-top:.4rem">分享获取永久免费观看</h4>
    <div class="pintu">
      <img class="img2"
           src
           alt
           style="width:100%;">
      <img src="@/assets/pintu.png"
           alt=""
           class="img1"
           style="display:none">
      <div style="display:none">
        <p>扫码下载美女APP</p>
        <div id='qrcode'></div>
      </div>
    </div>
    <p class="p1">
      <span @click="copyTxt(code)">复制邀请码</span>
      <span @click="saveCode('img2')">保存分享二维码</span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
import ChildHeader from '@/base/childHeader'
import QRCode from 'qrcodejs2'
import copy from 'copy-to-clipboard'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  created () {
    this.title = this.$route.meta.title
    !this.code && this.$router.go(-1)
    console.log(location.host)
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
    if (this.code) {
      let code = `${location.protocol}//${location.host}/${this.code}`;
      new QRCode('qrcode', {
        width: 50,
        height: 50,
        text: code
      })
      setTimeout(() => {
        this.downloadImg('#qrcode', '.img1', 230, 460, 250, 'img2')
      }, 20)
    }
  },
  methods: {
    copyTxt (e) {
      copy(e)
      Toast('复制成功')
    },
    downloadImg (img11, img22, x, y, wh, img33) {
      let c = document.createElement('canvas')
      let ctx = c.getContext('2d')
      c.width = 666
      c.height = 850
       // 设置字体填充颜色
       ctx.font = "bold 45px Courier New";
       ctx.fillText(this.code, 200, 100);
      ctx.font = "28px Courier New";
      ctx.fillStyle = "black";
      // 从坐标点(50,50)开始绘制文字
      ctx.fillText("— 您分享的二维码— ", 200, 200);
      ctx.fillText("— 您的邀请码— ", 230,30);
      ctx.stroke();
      ctx.rect(0, 0, c.width, c.height)
      ctx.fillStyle = 'transparent' // 画布填充颜色;
      ctx.fill()
      // 获取生成的二维码的src
      let imgone = document.querySelector(img11).getElementsByTagName('img')[0].src
      // 获取图片的src
      let imgtwo = document.querySelector(img22).src
      let img1 = new Image()
      let img2 = new Image()
      img1.src = imgone
      img2.src = imgtwo
      // 画坐标
      ctx.drawImage(img2, 0, 250, 666, 600)
      ctx.drawImage(img1, x, y, 200, 200)

      let img = convertCanvasToImage(c)
      document.getElementsByClassName(img33)[0].src = img.src
      function convertCanvasToImage (canvas) {
        let image = new Image()
        image.src = canvas.toDataURL('image/jpg')
        return image
      }
    },
    saveCode (i) {
      let img = document.getElementsByClassName(i)[0]
      if (img) {
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = img.src
        a.download = '分享二维码.jpg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
  },
  components: {
    ChildHeader
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.spread {
  font-size: 15px;
  color: #666;
  h4 {
    font-size: 20px;
    margin-bottom: 0.5rem;
    color: @font_color;
  }
  > p,
  h4 {
    text-align: center;
  }
  > p {
    margin-bottom: 0.2rem;
  }
}
.p1 {
  display: flex;
  justify-content: space-around;
  margin-top: .6rem;
  > span {
    width: 36%;
    padding: 0.2rem;
    background: @dominant_color;
    border-radius: 5px;
    color: #fff;
  }
}
.pintu {
  // width: 100%;
  position: relative;
  padding: 0.3rem;
  > img {
    width: 100%;
  }
  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    background: #fff;
    padding: 0.2rem 0.5rem 0.5rem;
    > p {
      margin-bottom: 10px;
      text-align: center;
      color: @dominant_color;
      font-weight: 600;
    }
  }
}
</style>
