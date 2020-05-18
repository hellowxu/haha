<template>
  <div id="app">
    <van-nav-bar :title="$route.meta.title" fixed @click-left="leftClicked">
      <van-icon name="arrow-left" slot="left" v-if="flag"/>
    </van-nav-bar>

    <router-view></router-view>

    <van-tabbar v-model="active" active-color="#26a2ff">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/member" icon="friends-o">会员</van-tabbar-item>
      <van-tabbar-item to="/cart">
        <van-goods-action-icon
          id="badge"
          icon="cart-o"
          text="购物车"
          :info="$store.getters.getAllGoodCount"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      //用于控制返回按钮是否需要显示
      flag: false
    };
  },
  methods: {
    leftClicked() {
      this.$router.go(-1);
    }
  },
  watch: {
    //控制返回按钮是否需要显示的
    "$route.path": function(newVal, oldVal) {
      if (
        newVal == "/" ||
        newVal == "/member" ||
        newVal == "/cart" ||
        newVal == "/search"
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

// html,body{
//   height: 100%;
// }

#app {
  padding-top: 46px;
  padding-bottom: 50px;
  /*避免PC端网页在页面切换的时候出现的水平滚动条*/
  overflow: hidden;

  .van-tabbar {
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    .van-tabbar-item--active {
      background-color: #eaeaea;
    }
    /*去除徽标背景色*/
    .van-goods-action-icon {
      background-color: transparent;
    }
  }

  .van-nav-bar {
    background-color: #26a2ff !important;
    .van-nav-bar__title {
      color: white !important;
    }
    .van-nav-bar__left {
      .van-icon {
        color: white !important;
      }
    }
  }
}
</style>
