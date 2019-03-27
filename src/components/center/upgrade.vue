<template>
  <div class="page">
    <child-header :title='title'></child-header>
    <div class="content">
      <div><span>当前账号:</span><b>{{felter(islogin.user.mobile)}}</b></div>
      <div>
        <span>升级类型:</span>
        <ul>
          <li>
            <span>L V 2 每日3套</span>
            <p><b>¥50</b><small>99</small></p>
          </li>
          <li>
            <span>L V 2 每日3套</span>
            <p><b>¥50</b><small>99</small></p>
          </li>
          <li>
            <span>L V 2 每日3套</span>
            <p><b>¥50</b><small>99</small></p>
          </li>
          <li>
            <span>L V 2 每日3套</span>
            <p><b>¥50</b><small>99</small></p>
          </li>
        </ul>
      </div>
      <div>
        <span>支付方式:</span>
        <ul>
          <li>
            <span>L V 2 每日3套</span>
            <p><b>¥50</b><small>99</small></p>
          </li>
        </ul>
      </div>
      <div class="box1"><span>支付金额</span><b>50</b>元</div>
      <p class="p1">
        <span>立即支付</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ChildHeader from '@/base/childHeader'
import { felterMobile } from '@/common/common'
import { mapGetters } from 'vuex'
export default {
  created () {
    this.title = this.$route.meta.title
  },
  computed: {
    ...mapGetters([
      'islogin'
    ])
  },
  data () {
    return {

    }
  },
  methods: {
    felter (str) {
      return felterMobile(str)
    }
  },
  components: {
    ChildHeader
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.content {
  font-size: 15px;
  color: @font_color;
  padding: 0.5rem 0.3rem;
  > div {
    margin-bottom: 0.5rem;
    display: flex;
    > span {
      width: 25%;
    }
    ul {
      width: 75%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 48%;
        box-sizing: border-box;
        border: 1px solid @dominant_color;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        padding: 0.1rem;
        margin-bottom: 0.2rem;
        > span {
          margin-bottom: 0.2rem;
          text-align: center;
        }
        > p {
          text-align: center;
          > b {
            color: @dominant_color;
            font-size: 18px;
          }
          > small {
            color: #666;
            text-decoration: line-through;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .box1 {
    b {
      color: @dominant_color;
      font-size: 20px;
    }
  }
  .p1 {
    text-align: center;
    font-size: 16px;
    span {
      padding: 0.2rem 0.8rem;
      background: #fe397f;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>
