<template>
  <div class="news">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getNewsList">
      <van-cell
        v-for="item in list"
        :to="'/newsInfo/' + item.id"
        :key="item.id"
        :icon="item.img_url"
      >
        <template slot="title">
          <h4 class="title">{{item.title}}</h4>
        </template>
        <template slot="label">
          <span class="addtime">发表时间：{{ item.add_time|dateFormat }}</span>
          <span class="clickcount">点击：{{item.click}}次</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.news {
  .van-list {
    .van-cell {
      /*修改图片的大小*/
      .van-icon {
        font-size: 36px;
        /*通过margin微调让图片居中*/
        margin-top: 5px;
      }
      .van-cell__title {
        /*这边给一个小于...的宽度之后就可以了*/
        width: 80%;
        /*超出一行显示省略号*/
        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .van-cell__label {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>

<script>
import zgaxios from "@/tools/zgaxios";
import { NewslistUrl } from "@/tools/api";
// import { Toast } from "vant";
export default {
  data: function() {
    return {
      //新闻列表
      list: [],
      //加载状态
      loading: false,
      //数据是否已经加载完毕
      finished: false
    };
  },
  methods: {
    async getNewsList() {
      let result = await zgaxios("GET", NewslistUrl);
      this.list = result.message;
      this.loading = false;
      this.finished = true;
    }
  }
};
</script>
