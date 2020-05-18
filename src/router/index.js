import VueRouter from "vue-router";

// 导入对应的路由组件
// import Home from "../views/Home.vue";
// import Member from "../views/Member.vue";
// import Cart from "../views/Cart.vue";
// import Search from "../views/Search.vue";
// import NewsList from '../views/news/NewsList.vue';
// import NewsInfo from '../views/news/NewsInfo.vue';
// import PhotoList from '../views/photos/PhotoList.vue'
// import PhotoInfo from '../views/photos/PhotoInfo.vue'
// import GoodList from '../views/good/GoodList.vue'
// import GoodInfo from '../views/good/GoodInfo.vue'
// import GoodDesc from '../views/good/GoodDesc.vue'

const Home = () => import('../views/Home.vue')
const Member = () => import('../views/Member.vue')
const Cart = () => import('../views/Cart.vue')
const Search = () => import('../views/Search.vue')
const NewsList = () => import('../views/news/NewsList.vue')
const NewsInfo = () => import('../views/news/NewsInfo.vue')
const PhotoList = () => import('../views/photos/PhotoList.vue')
const PhotoInfo = () => import('../views/photos/PhotoInfo.vue')
const GoodList = () => import('../views/good/GoodList.vue')
const GoodInfo = () => import('../views/good/GoodInfo.vue')
const GoodDesc = () => import('../views/good/GoodDesc.vue')

// 3. 创建路由对象
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
      meta:{
        title:"哈哈购物"
      }
    },
    {
      path: "/member",
      component: Member,
      meta:{
        title:"会员中心"
      }
    },
    {
      path: "/cart",
      component: Cart,
      meta:{
        title:"购物车"
      }
    },
    {
      path: "/search",
      component: Search,
      meta:{
        title:"搜索中心"
      }
    },
    {
      path: '/newsList',
      component: NewsList,
      meta:{
        title:"新闻列表"
      }
    },
    {
      path: '/newsInfo/:id',
      component: NewsInfo,
      meta:{
        title:"新闻详情"
      }
    },
    {
      path: '/photoList',
      component: PhotoList,
      meta:{
        title:"图片列表"
      }
    },
    {
      path: '/photoInfo/:id',
      component: PhotoInfo,
      meta:{
        title:"图片详情"
      }
    },
    {
      path: "/goodList",
      component: GoodList,
      meta:{
        title:"商品列表"
      }
    },
    {
      path: '/goodInfo/:id',
      component: GoodInfo,
      meta:{
        title:"商品信息"
      }
    },
    { 
      path: '/goodDesc/:id', 
      component:GoodDesc, 
      name:'goodDesc',
      meta:{
        title:"商品详情"
      }
    }
  ]
});