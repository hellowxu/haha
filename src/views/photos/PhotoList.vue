<template>
  <div>
    <van-tabs animated v-model="activeID" @click="tabItemClick">
      <van-tab :name="item.id" :key="item.id" v-for="(item,index) in cates" :title="item.title">
        <ul class="photo-list">
          <router-link v-for="item in list" :key="item.id" :to="'/photoInfo/' + item.id" tag="li">
            <img v-lazy="item.img_url" />
            <div class="info">
              <h1 class="info-title">{{ item.title }}</h1>
              <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
          </router-link>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { ImgCatrgoryUrl, ImagesUrl } from "@/tools/api";
export default {
  data: function() {
    return {
      cates: [
        //这边需要注释掉，否则请求分类数据会来之后第一页数据不能正常渲染
        // { title: "美女图片", id: 1 },
        // { title: "风景画", id: 2 },
        // { title: "风景画", id: 3 },
        // { title: "旅游", id: 4 },
        // { title: "苏州", id: 5 },
        // { title: "无锡", id: 6 },
        // { title: "上海", id: 7 }
      ],
      activeID: -1,
      list: []
    };
  },
  created() {
    //获取分类数据
    this.getPhotoCategory();
  },
  methods: {
    tabItemClick() {
      console.log(this.activeID);
      this.getPhotoListByCateId(this.activeID);
    },
    async getPhotoCategory() {
      let result = await zgaxios("GET", ImgCatrgoryUrl);
      this.cates = result.message;
      //追加一条全部分类数据
      this.cates.unshift({ title: "全部", id: 0 });

      //默认情况下获取第一个分类下的数据
      this.getPhotoListByCateId(this.cates[0].id);
    },
    //获取图片列表数据
    async getPhotoListByCateId(cateid) {
      let result = await zgaxios("GET", ImagesUrl + cateid);
      this.list = result.message;
    }
  }
};
</script>

<style lang="scss">
.van-tab__pane {
  padding: 16px;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;

  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;

    img {
      width: 100%;
      vertical-align: middle;
    }
    
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      overflow: auto;
      max-height: 100px;

      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>