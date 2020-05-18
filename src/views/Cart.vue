<template>
  <div>
    <van-cell-group>
      <van-cell v-for="(item,i) in goodslist" :key="item.id">
        <div class="icon" slot="icon">
          <!--这个地方不能直接绑定vuex的getters，这边的v-model需要绑定一个当前组件的state-->
          <van-checkbox
            v-model="itemSelected[item.id]"
            @change="itemSelectedChanged($event,item.id)"
          ></van-checkbox>
          <van-image width="5rem" height="3rem" fit="contain" :src="item.thumb_path" />
        </div>
        <div class="title" slot="title">{{ item.title }}</div>
        <div slot="label" class="label">
          <span class="price">￥{{ item.sell_price }}</span>
          <van-stepper
            v-model="$store.getters.getGoodsCount[item.id]"
            min="1"
            button-size="24px"
            disable-input
            @change="buynumChanged($event,item.id)"
          />
          <van-button type="info" size="small" @click="remove(item.id, i)">删除</van-button>
        </div>
      </van-cell>
    </van-cell-group>
    <van-panel>
      <div class="jiesuan" slot="header">
        <div class="left">
          <p>总计{{$store.getters.getAllGoodCount}}件</p>
          <p>
            已勾选
            <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价
            <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
          </p>
        </div>
        <van-button type="danger">去结算</van-button>
      </div>
    </van-panel>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { ShopcarListUrl } from "@/tools/api";
export default {
  data() {
    return {
      checked: true,
      buynum: 1,
      goodslist: [],
      itemSelected: this.$store.getters.getGoodsSelected
    };
  },
  created() {
    //请求购物车数据
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      //如果购物车中没有数据，则无需请求服务器
      if (idArr.length == 0) {
        return;
      }
      let result = await zgaxios("GET", ShopcarListUrl + idArr.join(","));
      this.goodslist = result.message;
      // console.log(this.goodslist);
    },
    buynumChanged(buynum, id) {
      this.$store.commit("updateCar", {
        id,
        count: buynum
      });
    },
    remove(id, index) {
      // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    itemSelectedChanged(isSelected, id) {
      this.$store.commit("updateGoodsSelected", {
        id: id,
        selected: isSelected
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 10px;
  .icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-weight: bold;
  }
  .label {
    .van-stepper {
      display: inline-block;
      vertical-align: middle;
      margin-right: 3px;
    }
    .price {
      font-size: 14px;
      color: red;
      font-weight: bold;
      margin-right: 3px;
    }
  }
}
.van-panel {
  padding: 16px;
  color: #515a6e;
  font-size: 14px;
  .jiesuan {
    display: flex;
    justify-content: space-between;
    .red {
      color: red;
      font-weight: bold;
    }
  }
}
</style>