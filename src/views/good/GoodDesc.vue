<template>
  <van-panel :title="info.title">
    <div slot="default">
      <div class="content" v-html="info.content"></div>
    </div>
  </van-panel>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { GoodDescUrl } from "@/tools/api";
export default {
  data() {
    return {
      // 图文数据
      info: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.getDesc();
  },
  methods: {
    async getDesc() {
      let result = await zgaxios("GET", GoodDescUrl + this.id);
      this.info = result.message.length > 0 ? result.message[0] : {};
    }
  }
};
</script>

<style lang="scss" scoped>
.van-panel {
  .van-panel__header {
    .van-cell__title {
      font-size: 15px;
      color: #226aff;
      font-weight: bold;
    }
  }
  .van-panel__content {
    padding-left: 16px;
    padding-right: 16px;
    .content {
      /*因为.content下面的元素不是当前组件拥有的，所以需要使用穿透来设置样式*/
      /deep/ p {
        margin-bottom: 10px;
        font-size: 13px;
        color: #515a6e;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>