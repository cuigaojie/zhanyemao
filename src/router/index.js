import Vue from 'vue'
import Router from 'vue-router'

import sltPage from '@/page/sltPage'
import typePage from '@/page/typePage'
import inComing from '@/page/inComing'
import  accountPage  from '@/page/account'
import businessInfo from  '@/page/businessInfo'
import  endInfo from  '@/page/endInfo'
import imgInfo from '@/page/imgInfo'
import  all from  '@/page/all'
import success from '@/page/success'

// 配置路由需要先把路由需要的组件导入
Vue.use(Router)

export default new Router({
  //mode: 'history',
    routes: [
      // 选择机具类型
      {
        path: '/:agentid',
        name: 'home',
        component: sltPage,
        meta:{
          name:true
        }
      },
   //   选择商户类型
      {
        path: '/type/:tid',							//路由的路径
        name: 'type',					// 路由的名字
        component: typePage,	// 路由的对应的组件
        meta: {
          auth: true
        }
      },
   //  商户进件--执照信息
      {
        path: '/type/:tid/:nid',							//路由的路径
        name: 'nature',					// 路由的名字
        component: inComing	,	// 路由的对应的组件
      },

      //商户进件--结算信息
      {
        path:'/type/:tid/:nid/account',
        name:'account',
        component:accountPage,
      },
      // //商户进件--商户信息信息
      {
        path:'/type/:tid/:nid/business',
        name:'business',
        component:businessInfo
      },
      // //商户进件--终端信息
      {
        path:'/type/:tid/:nid/end',
        name:'end',
        component:endInfo
      },

      {
        path:'/type/:tid/:nid/img',
        name:'img',
        component:imgInfo,
      },
      {
        path:'/type/:tid/:nid/all',
        name:'all',
        component:all
      },
      {
        path:'/type/:tid/:nid/success',
        name:'success',
        component:success
      }
  ]

})
