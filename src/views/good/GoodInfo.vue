<template>
  <div>
    <!--1.图片轮播-->
    <van-panel>
      <div slot="header">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in goodImages" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </van-panel>

    <!--2.商品购买-->
    <van-panel :title="goodsinfo.title">
      <div slot="default">
        <p class="price">
          <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
          </transition>市场价：
          <del>￥{{ goodsinfo.market_price }}</del>
          销售价：
          <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
        </p>
        <p class="buynum">
          购买数量：
          <van-stepper v-model="buynum" min="1" :max="goodsinfo.stock_quantity" disabled-input />
        </p>

        <van-goods-action>
          <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
          <van-goods-action-button type="danger" text="立即购买" @click="goBuy" />
        </van-goods-action>
      </div>
    </van-panel>

    <!--3.商品介绍-->
    <van-panel title="商品参数">
      <div slot="default">
        <div class="desc">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
        <van-button type="primary" block @click="goDesc(id)">图文介绍</van-button>
      </div>
    </van-panel>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { ThumImageUrl, GoodInfoUrl } from "@/tools/api";
export default {
  data() {
    return {
      buynum: 1,
      goodImages: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      id: this.$route.params.id,
      goodsinfo: {},
      //控制购物车小球隐藏显示
      ballFlag: false,
      //添加购物车动画是否完成
      animFinished: true
    };
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    //https://router.vuejs.org/zh/guide/essentials/navigation.html
    // 点击使用编程式导航跳转到 图文介绍页面 (这地方如果要以params方式传参，则不能用path需要用name)
    goDesc(id) {
      this.$router.push({ name: "goodDesc", params: { id } });
    },
    addToCart() {
      //如果添加动画没有完成，则再次点击该按钮无效
      if (this.animFinished) {
        this.animFinished = false;
        // console.log("添加购物车");
        // 添加到购物车
        this.ballFlag = !this.ballFlag;

        // 拼接出一个要保存到store中car数组里的商品信息对象
        var goodsinfo = {
          id: this.id,
          count: this.buynum,
          price: this.goodsinfo.sell_price,
          selected: true
        };
        // 调用store中的mutations来将商品加入购物车
        this.$store.commit("addToCar", goodsinfo);
      }
    },
    goBuy() {
      console.log("立即购买");
    },
    //获取轮播图数据
    async getLunbo() {
      let result = await zgaxios("GET", ThumImageUrl + this.id);
      this.goodImages = result.message;
      //console.log(this.goodImages)
    },
    //获取商品信息
    async getGoodsInfo() {
      let result = await zgaxios("GET", GoodInfoUrl + this.id);
      this.goodsinfo = result.message.length > 0 ? result.message[0] : {};
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球的在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面中的位置
      const badgePosition = document
        .querySelector("#badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 1s ease";

      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      el.style.transition = null;
      this.ballFlag = !this.ballFlag;
      this.animFinished = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.van-panel {
  /*设定panle的边框线*/
  margin: 5px;
  border: 1px solid #eee;
  border-radius: 5px;

  /*设定轮播图样式*/
  .van-swipe {
    height: 200px;
    img {
      height: 100%;
      width: 100%;
    }
  }

  /*设定面板头样式*/
  .van-panel__header {
    padding: 16px;
    .van-cell__title {
      font-size: 16px;
    }
  }

  /*设定面板体样式*/
  .van-panel__content {
    padding: 16px;
    font-size: 14px;
    color: #8f8f94;

    /*价格和选择数量的步进器*/
    .price {
      position: relative;
      .ball {
        width: 20px;
        height: 20px;
        background-color: red;
        z-index: 100;
        border-radius: 50%;
        position: absolute;
        left: 110px;
        top: 32px;
      }
      .now_price {
        color: red;
        font-weight: bold;
      }
    }

    .buynum {
      margin-top: 10px;
      margin-bottom: 10px;
      .van-stepper {
        display: inline-block;
        vertical-align: middle;
      }
    }
    /*让立即购买不处于页面底部*/
    .van-goods-action {
      position: static;
    }
    /*商品描述*/
    .desc {
      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>