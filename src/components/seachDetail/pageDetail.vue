<template>
  <div class="pageDetail">
    <child-header :title='title'></child-header>
    <div class="content">
      <h4>{{imgLists.name}}</h4>
      <div class="list_msg">
        <p>更新日期: <span>2018-10-15</span> </p>
        <p>图片标签:
          <span v-for="(v,j) in imgLists.tags.split(',')"
                @click="tagClick(v)"
                class='tags'
                :key="j">{{v}}</span>
          <p>图片数量: <span>{{imgLists.total}}P</span></p>
          <p>图集编号: <span>{{imgLists.id}}</span></p>
          <p class="flex">
            <span>图片说明: </span>
            <span class="span1">{{imgLists.intro}}</span>
          </p>
          <p>相关图集:</p>
      </div>
      <div>
        <ul  class="img_list">
          <li v-for="(item,i) in list"
              :key="i">
            <div>
              <span class="num">{{item.num}}P</span>
              <img v-lazy="item.cover_img"
                   @click="detail(item.id)"
                   alt="">
              <p>{{item.title}}</p>
              <div class="lable">
                <span v-for="(v,j) in item.tags"
                      @click="tagClick(v)"
                      :key="j">{{v}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ChildHeader from '@/base/childHeader'
import { GET_RELATED_API } from '@/common/api'
import { Toast, Indicator } from 'mint-ui'
import { mapMutations } from 'vuex'
export default {

  created () {
    this.title = this.$route.meta.title
    if (this.$route.params.data) {
      this.imgLists = this.$route.params.data
       this.tagText = {
              title: this.imgLists.title,
            intro: this.imgLists.intro,
            tags: this.imgLists.tags
            }
      this.id = this.imgLists.id
      this.loadMore()
    } else {
      this.$router.push(-1)
    }
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
      imgLists: [],
      list: [],
      id: '',
        tagText: {
        title: 'loading',
        tags: 'loading',
        intro: 'loading'
      }
    }
  },
  methods: {
    loadMore () {
      Indicator.open('加载中...')
      GET_RELATED_API({ id: this.id }).then(res => {
        Indicator.close()
        if (res.code === 200) {
            this.list = res.data
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
    tagClick (tag) {
      this.$router.push({
        name: 'SeachDetail',
        params: {
          tag: tag
        }
      })
    },
       ...mapMutations({
      imgsId: 'IMGS_ID',
    })
  },
  mounted () {
    document.body.style.background = '#fff'
  },
  beforeDestroy () {
    document.body.style.background = '#f2f2f2'
  },
  components: {
    ChildHeader
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/global.less";
.pageDetail {
  font-size: 15px;
  color: @font_color;
  .content {
    padding: 0.3rem;
   .list_msg>p {
      margin: 0.3rem 0;
    }
    .flex {
      display: flex;
      > .span1 {
        flex: 2;
      }
    }
    .tags {
      color: @dominant_color;
      margin-right: 5px;
    }
  }
}
</style>
