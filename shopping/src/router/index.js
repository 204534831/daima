import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search/index'
import List from '@/views/search/list'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
import store from '@/store'
import Address from '@/views/myorder/address'
import Add from '@/views/myorder/add'
import Edit from '@/views/myorder/edit'



Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path:'/',
      component:Layout,
      redirect:'/home',
      children:[
      {
        path:'/cart',
        component:Cart
      },
      {
        path:'/category',
        component:Category
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/user',
        component:User
      }
      ]

    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/myorder',
      component:Myorder
    },
    {
      path:'/pay',
      component:Pay
    },
    {
      path:'/prodetail/:id',
      component:Prodetail
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/list',
      component:List
    },
    {
      path:'/address',
      component:Address
    },
    {
      path:'/add',
      component:Add
    },
    {path:'/edit',
  component:Edit}
  ]
})

const authUrl=['/pay','/myorder']
router.beforeEach((to,from,next)=>{
  if(!authUrl.includes(to.path)){
     next()
     return
  }
 
  const token = store.state.user.userInfo.token
  if(token){
    next()
  }
  else{
    next('/login')
  }
})


export default router
