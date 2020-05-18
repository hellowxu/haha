<template>
  <div>
    <van-skeleton title :row="3" :loading="loading">
      <van-panel :title="newsinfo.title" :desc="newsinfo.add_time | dateFormat">
        <div v-html="newsinfo.content"></div>
      </van-panel>
    </van-skeleton>

    <Comment :id="this.id"></Comment>
  </div>
</template>

<style lang="scss" scoped>
.van-panel {
  .van-cell__title {
    color: red;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    /*副标题靠右对齐*/
    .van-cell__label {
      text-align: right;
      font-weight: normal;
    }
  }
  .van-panel__content {
    padding: 16px;
    font-size: 14px;
    color: #8f8f94;
    p {
      margin-top: 10px;
    }
  }
}
</style>

<script>
import zgaxios from "@/tools/zgaxios";
import { NewsInfoUrl } from "@/tools/api";
import Comment from "@/components/Comment.vue";
export default {
  data() {
    return {
      loading: true,
      id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: {}, // 新闻对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  components: {
    Comment
  },
  methods: {
    //获取新闻详情数据
    async getNewsInfo() {
      let result = await zgaxios("GET", NewsInfoUrl + this.id);
      this.newsinfo = result.message[0];
      this.loading = false;
    },
  }
};
</script>
