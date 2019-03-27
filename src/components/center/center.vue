<template>
  <div class="center">
    <my-header></my-header>
    <!-- {{islogin}} -->
    <div class="head">
      <img :src="islogin.user.avatar"
           alt=""
           width="50px"
           height="50px">
      <div class="box3">
        <p><span>{{felter(islogin.user.mobile)}}</span> <img :src="vipImg.img"
               alt=""
               class="vip_img"></p>
        <i class="code iconfont icon-erweima"
           @click="$router.push('/spread')">
          <i class="iconfont icon-jiantouzuo"></i>
        </i>
      </div>
      <div class="box2">
        <div>
          <div class="box1">
            <div>
              <span>今日可看</span>
              <span>美女图集数</span>
            </div>
            <span><b>{{islogin.user.remaining}}</b>/{{num}}</span>
          </div>
        </div>
        <span @click="$router.push('/upgrade')">极速升级VIP</span>
      </div>
    </div>
    <div class="rank">
      <h4>我的等级</h4>
      <mt-progress :value="difference.progressValue"
                   :bar-height="5">
        <div slot="start"
             class="zuo"
             v-if="userLevel!=5">
          <!-- {{vipImg}} -->
          <img :src="vipImg.img"
               alt=""
               width="20px">
          <span>{{vipImg.rank}}</span>
        </div>

        <div slot="end"
             class="zuo">
          <img :src="vipImg1.img"
               alt=""
               width="20px">
          <span>{{vipImg1.rank}}</span>
        </div>

      </mt-progress>
      <p v-if="userLevel==5">您已是最高等级</p>
      <p v-else>距离下一等级还差{{difference.differenceNum}}人</p>
    </div>
    <p class="img">
      <img src="@/assets/vip.png"
           alt="">
    </p>
    <div class="upgrade">
      <p>分享给好友成功下载APP并打开或注册时好友填写你的邀请码，可以永久增加每日观看图集数</p>
      <ul>
        <li v-for="(item,i) in dataList"
            :key="i">
          <img :src="item.img"
               alt="">
          <div>
            <b>{{item.title}}</b>
            <p>{{item.text}}</p>
          </div>
          <span @click="$router.push('/spread')"
                v-if="i[1]>userLevel">去完成</span>
          <img v-if="i[1]<=userLevel"
               src="@/assets/wancheng.png"
               alt=""
               class="ok_img">
        </li>
      </ul>
    </div>
    <div class="invite">
      <h4>我的邀请记录</h4>
      <ul>
        <li>
          <span>用户名</span>
          <span>手机号码</span>
          <span>邀请时间</span>
        </li>
        <!-- {{inviterList}} -->
        <li v-if="inviterList.length==0">暂无邀请人</li>
        <li v-else
            class="bottom_border"
            v-for="(item,i) in inviterList"
            :key="i">
          <span>{{item.username}}</span>
          <span>{{item.mobile}}</span>
          <span>{{item.reg_time.replace(/\:/g,'/')}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from '@/base/header'
import { mapGetters } from 'vuex'
import { felterMobile } from '@/common/common'
import { GET_AUTHORITY_API, GET_INVITER_API, GET_AUTHORITY } from '@/common/api'
export default {
  created () {
    if (!this.islogin.user) {
      this.islogin.user = JSON.parse(sessionStorage.getItem('user'))
    }
    Promise.all([GET_INVITER_API({ username: this.islogin.user.username }), GET_AUTHORITY_API({ level: this.islogin.user.user_level })]).then(([inviter, anthority]) => {
      if (anthority.code === 200) {
        this.num = anthority.data.num
      }
      if (inviter.code === 200) {
        this.inviterList = inviter.data
        console.log(this.inviterList)
      }
    })
    GET_AUTHORITY().then(res => {
      if (res && res.code === 200) {
        let list = res.data.list
        let text_arr = []
        list.shift()
        loop(0)
        function loop (index) {
          if (list[index] && list[index + 1]) {
            let text = `分享${list[index].invite_num}人，每日可观看图集数+${list[index].num}`;
            text_arr.push(text)
            index++
            loop(index)
          }
        }
        text_arr = [].concat(text_arr)
        .concat([`分享${list[4].invite_num}人，每日可观看图集数+无限`])
        Object.keys(this.dataList).forEach((item, index) => {
          this.dataList[item].text = text_arr[index]
        })
      }
    })
  },
  computed: {
    
    difference () {
      let inviteNum = Number(this.islogin.user.invite_members)
      let level = Number(this.islogin.user.user_level)
      let msg = this.msg || [1, 3, 10, 30, 50];
      return {
        progressValue: (inviteNum / msg[level-1]).toFixed(2)*100,
        differenceNum: msg[level-1] - inviteNum
      }
    },
    userLevel () {
      return parseInt(this.islogin.user.user_level)-1
    },
    vipImg () {
      return this.dataList['v' + this.userLevel]
    },
    vipImg1 () {
      let s = parseInt(this.userLevel)+1
      if(s>5){s=5}
      return this.dataList['v' +s ]
    },
    ...mapGetters([
      'islogin'
    ])
  },
  data () {
    return {
      dataList: {
        v1: { img: require('@/assets/v1.png'), rank: '入门', title: '入门徽章', text: '分享1人，每日可观看图集数+2' },
        v2: { img: require('@/assets/v2.png'), rank: '进阶', title: '进阶徽章', text: '分享3人，每日可观看图集数+5' },
        v3: { img: require('@/assets/v3.png'), rank: '达人', title: '达人徽章', text: '分享10人，每日可观看图集数+30' },
        v4: { img: require('@/assets/v4.png'), rank: '专家', title: '专家徽章', text: '分享30人，每日可观看图集数+50' },
        v5: { img: require('@/assets/v5.png'), rank: '教授', title: '教授徽章', text: '分享50人，每日可观看图集数+无限' }
      },
      num: 0,
      inviterList: []
    }
  },
  methods: {
    felter (str) {
      return felterMobile(str)
    }
  },
  mounted () {
    document.body.style.background = '#f2f2f2'
  },
  beforeDestroy () {
    document.body.style.background = '#fff'
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.center {
  font-size: 12px;
  > img {
    margin: 5px 0.2rem 0;
  }
}
.head {
  background: #fff;
  margin: 55px 0.2rem 10px;
  display: flex;
  padding: 0.2rem;
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  > img {
    border-radius: 50%;
    margin-right: 10px;
  }
  .box1 {
    display: flex;
    align-items: center;
    color: #666;
    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex: 1;
    }
    > span {
      margin-left: 5px;
    }
  }
  .box2 {
    align-items: center;
    > span {
      padding: 0.1rem 0.3rem;
      background: @dominant_color;
      border-radius: 5px;
      color: #fff;
      margin-top: 5px;
    }
  }
  .box3 {
    > p > span {
      font-size: 18px;
      font-weight: 600;
    }
    > .code {
      font-size: 26px;
      color: #999;
    }
    > .icon-jiantouzuo {
      font-size: 23px;
    }
  }
}
.rank {
  margin: 5px 0.2rem 10px;
  background: #fff;
  padding: 0.2rem 0.3rem;
  height: 2rem;
  > p {
    text-align: center;
    color: #666;
  }
  > h4 {
    font-size: 15px;
    margin-bottom: 15px;
  }
  .zuo {
    display: flex;
    flex-direction: column;
    > span {
      line-height: 1.5;
    }
    > img {
      width: 16px;
      height: 22px;
      background: #ffecf3;
      padding: 8px 10px;
      border-radius: 50%;
    }
  }
}
.img {
  margin: 0 0.2rem 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.vip_img {
  width: 16px;
  height: 22px;
  vertical-align: bottom;
  margin-left: 3px;
}
.upgrade,
.invite {
  margin: 0 0.2rem 10px;
  background: #fff;
  padding: 0.2rem 0.3rem;
  color: #999999;
  h4 {
    color: @font_color;
    font-size: 15px;
    margin-bottom: 5px;
  }
}
.upgrade li {
  display: flex;
  align-items: center;
  margin: 0.5rem 0 0;
  height: 1.5rem;
  > img {
    width: 16px;
    height: 22px;
    background: #ffecf3;
    padding: 8px 10px;
    border-radius: 50%;
    margin-right: 10px;
  }
  > .ok_img {
    width: 1rem;
    height: 1rem;
    background-color: #fff;
  }
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  > span {
    padding: 3px 8px;
    border: 1px solid @dominant_color;
    color: @dominant_color;
    border-radius: 20px;
  }
}

.invite {
  h4 {
    margin-bottom: 10px;
  }
  li {
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    margin: 0;
    position: relative;
    justify-content: space-around;
    color: @font_color;
    > span {
      width: 33.3333%;
      text-align: center;
    }
  }
  li:first-child {
    background: #f2f2f2;
    font-size: 14px;
  }
}
</style>
