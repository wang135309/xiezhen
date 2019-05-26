<template>
  <div class="page">
    <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="true"
        infinite-scroll-distance="10">
      <li v-for="(item,i) in lists"
          :key="i">
        <div>
          <img src="../../static/timg.jpg"
               alt="">
          <p>laowang的写真集，腿长模…</p>
          <div class="lable">
            <span>清新</span><span>萌妹子</span><span>尤物</span>
          </div>
        </div>
        <div>
          <img src="../../static/timg.jpg"
               alt="">
          <p>粉黛少女的写真集，腿长模…</p>
          <div class="lable">
            <span>清新</span><span>萌妹子</span><span>尤物</span>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
// import { Indicator } from 'mint-ui'
export default {
  props: ['lists'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // loadMore () {
    //   if (this.listEnd || this.loading) return
    //   Indicator.open('加载中...')
    //   this.loading = true
    //   this.data.page = this.data.page + 1

    //   scoreLog_api(this.data).then(res => {
    //     Indicator.close()
    //     this.loading = false
    //     if (res.code === 200) {
    //       console.log(res)
    //       res.data.amount = res.data.amount | 0
    //       this.money = res.data.amount

    //       this.page = res.data.page
    //       if (res.data.list.length > 0) {
    //         // res.data.list.forEach(element => {
    //         //   element.dateline =
    //         //     moment.unix(element.dateline).format('HH:mm:ss')
    //         // })
    //         this.zbList = this.zbList.concat(res.data.list)
    //       } else {
    //         this.listEnd = true
    //         // res.data.page!=1?Toast("没有更多数据了!"):''
    //       }
    //     }
    //   })
    // }
  },
  components: {

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
ul {
  margin: 0;
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;
    list-style: none;
    > div {
      width: 48%;
      background: #fff;
      > p {
        width: 95%;
        margin-left: 4px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; /*强制不换行*/
      }
      img {
        width: 100%;
      }
      .lable {
        display: flex;
        > span {
          font-size: 12px;
          padding: 2px 4px;
          margin: 4px;
          background: #eee;
        }
      }
    }
  }
}
</style>
