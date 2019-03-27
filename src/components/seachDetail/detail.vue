<template>
  <div class="detail">
    <my-header></my-header>
    <div v-infinite-scroll="ajax"
         infinite-scroll-disabled="listEnd"
         infinite-scroll-distance="10">
      <img alt=""
           v-for="(imgs,i) in list"
           :key="i"
           v-lazy="imgs"
           width="100%">
    </div>

    <div class="fixed">
      <div @click="share(listData)">
        <span class="iconfont icon-13"></span>
        <p>分享</p>
      </div>
      <div @click="$router.push({
        name: 'PageDetail',
        params: {
          data: listData
        }
      })">
        <span class="iconfont icon-daohangguize"></span>
        <p>更多</p>
      </div>
      <div @click="toTop(60)">
        <span class="iconfont icon-zhixiangshangshangjiantou"></span>
        <p>回顶部</p>
      </div>
    </div>
    <div class="footer"
         v-if="listData.remaining==0 && last">

      <p>您今日免费体验美女图集数剩余 <span>{{listData.remaining}}/{{allNum}}</span></p>
      <p class="p1">
        <span @click="goToPath('upgrade')">极速升级VIP</span>
        <span @click="goToPath('/spread')">免费升级VIP</span>
      </p>
    </div>
    <div class="footer"
         v-else-if="limit">
      <p>您今日免费体验美女图集数剩余 <span>{{listData.remaining}}/{{allNum}}</span></p>
      <p class="p1">
        <span @click="seeAll">点击查看全部</span>
      </p>
    </div>
    <p class="loadMore"
       v-if="listEnd">
      <span>------------------我是有底线的------------------</span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from '@/base/header'
import { Toast, Indicator } from 'mint-ui'
import { GET_COLLECT_PHOTOS_API } from '@/common/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  created () {
    if (this.$route.params.id) {
      this.data.id = this.$route.params.id
      this.data.author_id = this.author_id
    } else {
      if (this.imgsId) {
        this.data.id = this.imgsId
        this.data.author_id = this.author_id
      } else {
        this.$router.go(-1)
      }
    }
  },
  computed: {
    author_id () {
      return this.user ? this.user.user_level : ''
    },
    user () {
      return this.islogin.user ? this.islogin.user : ''
    },

    ...mapGetters([
      'islogin',
      'imgsId',
      'allNum'
    ])
  },
  metaInfo () {
    return {
      title: `${this.tagText.title}  - 美色网`, // set a title
      meta: [
        {
          // set meta
          name: 'description',
          content: `${this.tagText.title}是有美色网提供的免费高清写真集。${this.tagText.intro}`
        },
        {
          name: 'keyWords',
          content: `${this.tagText.tags}`
        }
      ]
    }
  },
  data () {
    return {
      data: {
        id: '',
        author_id: ''
      },
      limit: false, // 是否限制观看
      last:true,
      listEnd: false,
      loading: false,
      listData: {},
      list: [],
      tagText: {
        title: 'loading',
        tags: 'loading',
        intro: 'loading'
      }
    }
  },
  methods: {
    goToPath(str){
      if(this.user){
        this.$router.push(str)
      }else{
        this.$router.push('/login')
      }
      
    },
    ajax () {
      if (!this.listEnd && !this.loading) {
        this.loading = true
        Indicator.open('加载中...')
        GET_COLLECT_PHOTOS_API(this.data).then(res => {
          this.loading = true
          Indicator.close()
          if (res.code === 200) {
            if (res.data.list&&res.data.list.length > 0) {
              this.listData = res.data
              this.tagText = {
                title: res.data.title,
                intro: res.data.intro,
                tags: res.data.tags
              }
              this.seeNum(res.data.remaining)
              sessionStorage.setItem('remaining', JSON.stringify(res.data.remaining))
              if (!this.one) {
                this.limit = !(this.listData.list.length === this.listData.total)
                this.one = true
              }
              this.loading = false
              this.list = res.data.list
              this.listEnd = true
            } else {
              this.listEnd = true
            }
          } else {
            Toast(res.msg)
            this.listEnd = true
          }
        })
      }

    },
    seeAll () {
      this.data.read = 1
      this.limit = false
      this.listEnd = false
      this.loading = false
      if(this.listData.remaining==1){
        this.last = false
      }
    },
    share (list) {
      if (this.user) {
        this.$router.push({
          name: 'Share',
          params: {
            data: list
          }
        })
      } else {
        this.$router.push('/login')
      }
    },
    toTop (i) {
      document.documentElement.scrollTop -= i
      if (document.documentElement.scrollTop > 0) {
        var c = setTimeout(() => this.toTop(i), 16)
      } else {
        clearTimeout(c)
      }
    },
    ...mapMutations({
      seeNum: 'SEE_NUM'
    })
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.fixed {
  position: fixed;
  right: 0.3rem;
  bottom: 1rem;
  font-size: 16px;
  color: #fff;
  z-index: 2;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.3rem;
    > p {
      margin: 0.1rem 0 0;
      font-size: 12px;
    }
  }
  .iconfont {
    padding: 0.2rem;
    font-size: 18px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  .icon-13 {
    background: rgba(254, 57, 127, 0.5);
  }
}
.footer {
  font-size: 15px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: #565656;
  box-shadow: 0 -25px 50px #565656;
  > p {
    text-align: center;
    margin: 0.5rem 0 0;
    color: #fff;
    > span {
      color: @dominant_color;
    }
  }
  > .p1 {
    display: flex;
    justify-content: space-around;
    margin-top: 0.8rem;

    > span {
      padding: 0.2rem 0.3rem;
      background: @dominant_color;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>
