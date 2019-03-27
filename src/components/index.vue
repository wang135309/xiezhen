<template>
  <div class="index">
    <my-header></my-header>
    <div style="height:5rem">
      <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,i) in advert" :key="i">
        <img :src="item.image" alt="" style="width:100%"  @click="goPath(item.link)">
      </mt-swipe-item>
    </mt-swipe>
    </div>
    
    <!-- <img :src="advert"
         alt=""
         width="100%"> -->
    <p>最新美女图集</p>
    <div class="box1">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5"
          class="img_list">
        <li v-for="(item,i) in imgLists"
            :key="i">
          <div>
            <span class="num">{{item.num}}P</span>
            <img v-lazy="item.cover_img"
                 @click="detail(item.id)"
                 alt="">
            <p>{{item.title}}</p>
            <div class="lable">
              <span v-for="(v,j) in item.tag_arr"
                    @click="$router.push({
                      name: 'SeachDetail',
                      params: {
                        tag: v
                      }
                    })"
                    :key="j">{{v}}</span>
            </div>
          </div>
        </li>
      </ul>
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
import { GET_COLLECT_API, GET_ADVERT_API, GET_USER_INFO, GET_AUTHORITY } from '@/common/api'
import { mapMutations } from 'vuex'
export default {
  metaInfo: {
    title:
      "美色网 - 每日精选超高清美女图片_人体艺术图片_性感美女图片_日韩女优_性感美女写真", // set a title
    meta: [
      {
        // set meta
        name: "description",
        content:
          "美色网免费为您提供每日最新最全的美女写真集套图，有比基尼美女，大胸美女，人体艺术，性感美女，日本女优等高清写真集图片图集，免费欣赏超高清各种美女图片，如丝袜美女，大胸妹子，性感图片，性感少妇，情趣内衣美女，黑丝美女，日韩女优，欧美巨乳，私房福利"
      },
      {
        name: "keyWords",
        content:
          "人体艺术,人体艺术摄影,人体艺术图片,欧美人体艺术,性感美女,性感美女图片,性感美女图,性感美女写真,性感美女照片,丝袜,丝袜美腿,丝袜诱惑,制服丝袜,美女丝袜,美腿丝袜,丝袜制服,女优,日韩女优,女优图片,美女写真,美女裸照,裸体美女,少妇,性感少妇,少妇的诱惑,情趣内衣,情趣内衣秀,情趣内衣美女,情趣内衣模特,性感情趣内衣,大胸美女,街拍大胸美女,黑丝,黑丝美女,黑丝诱惑,黑丝美腿,黑丝高跟,性感黑丝,黑丝足交,美女黑丝,巨乳,巨乳美女,巨乳波霸,巨乳人妻,欧美巨乳,巨乳诱惑"
      }
    ]
  },
  created () {
    this.init_api()
  },
  data () {
    return {
      advert: [], // 广告
      imgLists: [],
      page: 0,
      listEnd: false,
      data: {
        page: 0
      }
    }
  },

  methods: {
    goPath (url) {
      window.open(`http://${url}`, 'target');
    },
    loadMore () {
      if (this.listEnd) return
      Indicator.open('加载中...')
      this.data.page++
      // if (this.data.page > this.page) return
      GET_COLLECT_API(this.data).then(res => {
        this.page = res.total / res.limit
        Indicator.close()
        // this.loading = false
        if (res.code === 200) {
          // this.page = res.data.page
          if (res.data.list.length > 0) {
            this.imgLists = this.imgLists.concat(res.data.list)
          } else {
            // Toast('没有更多数据了!')
            this.listEnd = true
          }
        } else {
          // Toast('没有更多数据了!')
          this.listEnd = true
        }
      })
    },
    detail (id) {
      this.imgsId(id)
      this.$router.push({
        name: 'Detail',
        params: {
          id: id
        }
      })
    },
    init_api () {
      Promise.all([GET_ADVERT_API(), GET_USER_INFO(), GET_AUTHORITY()]).then(([adver, userinit, authority]) => {
        if (adver.code === 200) {
          this.advert = adver.data
        } else {
          Toast(adver.msg)
        }
        let level = 1
        if (userinit.code === 200) {
          level = Number(userinit.data.user_level)
          this.islogin({ user: userinit.data })
          sessionStorage.setItem('user', JSON.stringify(userinit.data))
        } else {
          // Toast(userinit.msg)
        }
        if (authority.code === 200) {
          let num = 0
          authority.data.list.forEach(e => {
            if (Number(e.id) === level) {
              num = e.num
            }
          })
          this.allNum(num)
        }


      })
    },
    ...mapMutations({
      imgsId: 'IMGS_ID',
      islogin: 'IS_LOGIN',
      allNum: 'ALL_NUM'
    })
  },

  components: {
    MyHeader
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.index {
  font-size: 16px;
  > p {
    text-align: center;
    font-weight: 600;
    height: 0.8rem;
    line-height: 0.8rem;
  }

  .box1 {
    padding: 0 0.3rem;
  }
}
</style>
