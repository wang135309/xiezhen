<template>
  <div class="seachDetail">
    <my-header></my-header>
    <div class="content">
      <div>
        <h4>{{data.tag}}</h4>
        <p>
          以下为美色网精选的【 <span>{{data.tag}}</span> 】美女写真集，共 <span> {{total}} </span>套 宅男最爱的美女诱惑，全部都是超高清的写真集
        </p>
      </div>
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          class="img_list">
        <li v-for="(item,i) in list"
            :key="i">
          <div>
            <span class="num">{{item.num}}P</span>
            <img v-lazy="item.cover_img"
                 @click="detail(item.id)"
                 alt="">
            <p>{{item.intro}}</p>
            <div class="lable">
              <span v-for="(v,j) in item.tag_arr"
                    @click="tag(v)"
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
import MyList from '@/base/list'
import { Indicator } from 'mint-ui'
import { GET_COLLECT_BY_TAG_API } from '@/common/api'
export default {
  created () {
    if (this.$route.params.tag) {
      this.data.tag = this.$route.params.tag
    } else {
      this.$router.go(-1)
    }
  },
  metaInfo () {
    return {
      title: `${this.data.tag} - 美色网`, // set a title
      meta: [
        {
          // set meta
          name: "description",
          content: `${this.data.tag}超高清图集`
        },
        {
          name: "keyWords",
          content: `${this.data.tag}`
        }
      ]
    }
  },
  data () {
    return {
      list: [],
      page: 0,
      listEnd: false,
      total: 0,
      data: {
        page: 0,
        tag: 'loading'
      }
    }
  },
  methods: {
    loadMore () {
      if (this.listEnd) return
      Indicator.open('加载中...')
      this.data.page++
      // if (this.data.page > this.page) return
      GET_COLLECT_BY_TAG_API(this.data).then(res => {
        this.page = res.total / res.limit
        Indicator.close()
        // this.loading = false
        if (res.code === 200) {
          // this.page = res.data.page
          if (res.data.list.length > 0) {
            this.list = this.list.concat(res.data.list)
            this.total = res.data.total
          } else {
            // Toast('没有更多数据了!')
            this.listEnd = true
          }
        }
      })
    },
    detail (id) {
      this.$router.push({
        name: 'Detail',
        params: {
          id: id
        }
      })
    },
    tag (tag) {
      this.data.tag = tag
      this.data.page = 0
      this.loadMore()
    }
  },
  components: {
    MyHeader,
    MyList
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.content {
  width: 90%;
  margin: 60px auto 0;
  font-size: 12px;
  background: #f2f2f2;
  > div {
    padding: 0.3rem;
    margin: 0.3rem auto 0.5rem;
    line-height: 1.5;
    text-align: center;
    font-size: 12px;
    color: #666;
    background: #fff;
    > h4 {
      text-align: center;
      font-size: 17px;
      color: @font_color;
    }
    p {
      margin-top: 0.3rem;
      > span {
        color: @dominant_color;
      }
    }
  }
}
</style>
