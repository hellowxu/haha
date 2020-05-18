<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in itemList"
        :key="item.title"
        :icon="item.url"
        :text="item.title"
        :to="item.to"
      />
    </van-grid>
  </div>
</template>

<style lang="scss">
.my-swipe {
  height: 200px;
  .van-swipe-item {
    color: #fff;
    text-align: center;
    background-color: #39a9ed;
    img {
      height: 100%;
      width: 100%;
    }
  }
}

.van-grid-item {
  .van-grid-item__icon {
    font-size: 56px;
  }
}
</style>

<script>
import zgaxios from "@/tools/zgaxios";
import { LunboUrl } from "@/tools/api";

// import { Toast } from "vant";
export default {
  data() {
    return {
      lunbotuList: [], // 保存轮播图的数组
      itemList: [
        {
          url: require("../images/menu1.png"),
          title: "新闻资讯",
          to: "/newsList"
        },
        {
          url: require("../images/menu2.png"),
          title: "图片分享",
          to: "/photoList"
        },
        {
          url: require("../images/menu3.png"),
          title: "商品购买",
          to: "/goodList"
        },
        {
          url: require("../images/menu4.png"),
          title: "留言反馈",
          to: "/"
        },
        {
          url: require("../images/menu5.png"),
          title: "视频专区",
          to: "/"
        },
        {
          url: require("../images/menu6.png"),
          title: "联系我们",
          to: "/"
        }
      ]
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    async getLunbotu() {
      let result = await zgaxios("GET", LunboUrl);
      this.lunbotuList = result.message;
    }
  }
};
</script>
