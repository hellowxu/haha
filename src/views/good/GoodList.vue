<template>
  <div class="goods-list">
    <div class="goods-list">
      <router-link
        class="goods-item"
        v-for="item in goodslist"
        :key="item.id"
        :to="'/goodInfo/'+item.id"
        tag="div"
      >
        <img :src="item.img_url" alt />
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
          </p>
        </div>
      </router-link>
      <van-button type="info" block @click="getMore">加载更多</van-button>
    </div> 
  </div>
</template>

<script>
</script>

<script>
import zgaxios from "@/tools/zgaxios";
import { GoodsUrl } from "@/tools/api";
export default {
  data() {
    return {
      pageindex: 1, // 分页的页数
      goodslist: [] // 存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //获取商品列表
    async getGoodsList() {
      let result = await zgaxios("GET", GoodsUrl, {
        params: {
          pageindex: this.pageindex
        }
      });

      if (result.status === 0) {
        // console.log(result.message,"000000000000000000")
        if (result.message.length == 0) {
          this.$toast("没有更多数据！");
          return;
        }
        this.goodslist = [...this.goodslist, ...result.message];
      }
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 7px;
  .goods-item {
    width: 49%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;

    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>