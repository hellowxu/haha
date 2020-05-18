<template>
  <div>
    <van-panel>
      <template slot="header">
        <div class="header">
          <h4 class="title">{{ photoinfo.title }}</h4>
          <div class="desc">
            <span class="addtime">{{ photoinfo.add_time | dateFormat }}</span>
            <span class="clickcount">点击:{{ photoinfo.click }}次</span>
          </div>
        </div>
      </template>
      <template slot="default">
        <!-- 缩略图区域 -->
        <vue-preview :slides="list"></vue-preview>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>
      </template>
    </van-panel>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { ImageInfoUrl, ThumImageUrl } from "@/tools/api";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {}, // 图片详情
      list: [] // 缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getPhotoThubs();
  },
  methods: {
    //获取图片详情
    async getPhotoInfo() {
      let result = await zgaxios("GET", ImageInfoUrl + this.id);
      this.photoinfo = result.message.length > 0 ? result.message[0] : {};
      console.log(this.photoinfo);
    },
    //获取缩略图数据
    async getPhotoThubs() {
      let result = await zgaxios("GET", ThumImageUrl + this.id);
      if (result.status == 0) {
        result.message.forEach(item => {
          item.src = item.src; //点击大图的网址
          item.w = 400;
          item.h = 200;
          item.msrc = item.src; //点击小图的网址
        });
        this.list = result.message;
        console.log(this.list);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.van-panel {
  .header {
    padding: 8px;
    .title {
      text-align: center;
      padding-bottom: 10px;
      color: #26a2ff;
    }
    .desc {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  
  /*
  因为缩略图是第三方插件，如果在scoped下无法修改第三方插件的样式
  解决方案：
  1.再写一个style，不使用scoped <style lang="scss">
  2.使用样式的穿透 ： 
    less中可以使用 >>>  /deep/
    scss中可以使用 ::v-deep /deep/
  */
  /deep/ figure {
    width: 80px;
    margin: 5px;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    a {
      img[itemprop] {
        box-shadow: 0 0 8px #999;
        width: 80px;
      }
    }
  }
}
</style>