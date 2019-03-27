<template>
  <div class="login">
    <mt-header class="my_header">
      <mt-button slot="left">登 录</mt-button>
      <mt-button icon=" iconfont icon-fork"
                 @click.native="$router.push('/')"
                 slot="right"></mt-button>
    </mt-header>
    <div class="cont">
      <mt-cell class="bottom_border">
        <i class="iconfont icon-shouji"></i>
        <mt-field placeholder="请输入手机号"
                  type="tel"
                  v-model="mobile.mobile"></mt-field>
      </mt-cell>
      <mt-cell class="bottom_border">
        <i class="iconfont icon-icon-p_xinfeng"></i>
        <mt-field placeholder="请输入验证码"
                  type="tel"
                  v-model="mobile.vcode">
          <mt-button class="getCode"
                     :class="active?'active':''"
                     @click.native="getCode"
                     ref="span"
                     :disabled="!active">
            {{prompt}}
          </mt-button>
        </mt-field>
      </mt-cell>
      <mt-button size="large"
                 class="btn"
                 @click="login">登 录</mt-button>
      <p class="reg"
         @click="$router.push('/reg')">免费注册</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { LOGIN_API, MOBILE_API } from '@/common/api'
import { Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
export default {
  created () {

  },

  data () {
    return {
      prompt: '获取验证码',
      active: false,
      mobile: {
        mobile: '',
        vcode: '',
        type: 'vcode'
      },
      number: 0,
      reg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    }
  },
  methods: {
    // 登录
    login () {
      LOGIN_API(this.mobile).then(res => {
        if (res.code === 200) {
          this.islogin({ user: res.data })
          sessionStorage.setItem('user', JSON.stringify(res.data))
          this.$router.push('/')
        } else {
          Toast(res.msg)
        }
      })
    },
    // 获取验证码
    getCode () {
      if (this.mobile.mobile && this.number === 0) {
        this.number = 60
        this.active = false
        this.prompt = '重新发送' + this.number
        let timer = setInterval(() => {
          this.number--
          this.prompt = '重新发送' + this.number
          if (this.number < 1) {
            clearInterval(timer)
            this.active = true
            this.prompt = '获取验证码'
          }
        }, 1000)
        MOBILE_API({ type: 'register', mobile: this.mobile.mobile }).then(
          res => {
            Toast(res.msg)
          })
      } else if (this.number !== 0) {
        Toast('请不要重复发送')
      } else {
        Toast('请输入手机号码')
      }
    },
    ...mapMutations({
      islogin: 'IS_LOGIN'
    })
  },
  components: {

  },
  mounted () {
    document.body.style.background = '#fff'
  },
  beforeDestroy () {
    document.body.style.background = '#f2f2f2'
  },
  watch: {
    'mobile.mobile': {
      handler: function (n, o) {
        this.reg.test(n) ? (this.active = true) : (this.active = false)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "../../common/global.less";

.getCode {
  color: #ccc;
  background: #fff;
  border: 0;
  box-shadow: none;
  &:after {
    background: #fff;
    opacity: 0;
  }
}
.active {
  color: @dominant_color;
}
</style>
