<template>
  <div>
    <van-form @submit="onSubmit">
      <h3>发表评论</h3>
      <van-field
        v-model="content"
        placeholder="请输入要BB的评论"
        type="textarea"
        rows="4"
        :rules="[{ required: true, message: '请填写用户名', trigger:'onChange' }]"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">发表评论</van-button>
      </div>
    </van-form>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getCommentInfo">
      <van-cell v-for="(item,idx) in list" :key="item.add_time">
        <template slot="title">
          <div
            class="cmt-title"
          >第{{idx}}楼&nbsp;&nbsp;{{item.user_name}}&nbsp;&nbsp;时间{{item.add_time|dateFormat}}</div>
        </template>
        <template slot="label">
          <div class="cmt-body">{{item.content}}</div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { CommentsUrl, PostCommentUrl } from "@/tools/api";

export default {
  props: ["id"],
  data: function() {
    return {
      content: "",
      list: [], //所有的评论数据
      loading: false,
      finished: false,
      pageIndex: 1 // 默认展示第一页数据
    };
  },
  methods: {
    async onSubmit() {
      let result = await zgaxios("POST", PostCommentUrl + this.id, {
        content: this.content.trim()
      });
      console.log(result);
      if (result.status == 0) {
        this.list.unshift({
          user_name: "匿名用户",
          add_time: Date.now(),
          content: this.content.trim()
        });
        //清空页面textarea内容
        this.content = "";
      }
    },
    async getCommentInfo() {
      let result = await zgaxios("GET", CommentsUrl + this.id, {
        params: { pageindex: this.pageIndex }
      });
    //   console.log(result);
      this.loading = false;
      if (result.status == 0) {
        if (result.message.length == 0) {
          this.finished = true;
          return;
        }
        //如果有更多数据，则将返回的数据追加到this.comments里面去
        this.list = [...this.list, ...result.message];
      }
      this.pageIndex++;
    }
  }
};
</script>

<style lang="scss">
.van-form {
  h3 {
    padding: 16px;
  }
  .van-field__body {
    border: 1px solid #ccc;
  }
}
</style>