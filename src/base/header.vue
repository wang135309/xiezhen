<template>
  <div class="header">
    <mt-header fixed
               class="my_header">
      <!-- <mt-button -->
        <img slot="left"  @click="$router.push('/')" src="@/assets/logo.png" alt="">
      <!-- </mt-button> -->
      <mt-button class=" iconfont"
                 :class="iconShow?'icon-fork':'icon-daohang'"
                 @click.native="iconShow=!iconShow"
                 slot="right"></mt-button>
    </mt-header>
    <transition name="header">
      <div class="pop"
           v-show="iconShow">
        <p v-if="user"
        class="p1"
           @click="$router.push('/center')">{{felter(user.mobile)}}</p>
        <p v-else>
          <router-link tag="span"
                       to="/login">登录</router-link> / <router-link tag="span"
                       to="/reg">注册</router-link>
        </p>
        <p class="p2">
          <span class="vip" @click="go">免费升级VIP</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import { felterMobile } from '@/common/common'
export default {
  created () {

  },
  computed: {
    user () {
      if (this.islogin.user) {
        return this.islogin.user
      } else {
        let data = JSON.parse(sessionStorage.getItem('user'))
        this.login({ user: data })
        return data
      }
    },
    ...mapGetters([
      'islogin'
    ])
  },
  data () {
    return {
      iconShow: false
    }
  },
  methods: {
    go(){
      if(this.user){
       this.$router.push('/spread')
      }else{
        this.$router.push('/login')
      }
    },
    felter (str) {
      return felterMobile(str)
    },
    ...mapMutations({
      login: 'IS_LOGIN'
    })
  },
  components: {

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.header {
  font-size: 16px;
  .my_header {
    background: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    color: #fff;
    img{
      width: .5rem;
      height: .5rem;
    }
  }
  .pop {
    width: 100%;
    height: 2.2rem;
    position: fixed;
    top: 40px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
   
    > p {
      margin: 0.4rem auto 0;
      text-align: center;
      color: #fff;
     
      > .vip {
        display: inline-block;
        padding: 0.1rem 0.3rem;
        background: @dominant_color;
        border-radius: 5px;
        margin-top: .3rem;
      }
    }
     >.p1{
      text-decoration: underline;
    }
    >.p2{
       width: 80%;
       border-top: 1px solid rgba(255, 255, 255, .3);
    }
  }
}

.header-enter-active,
.header-leave-active {
  transition: opacity 0.3s;
}
.header-enter,
.header-leave-to {
  opacity: 0;
}
</style>
