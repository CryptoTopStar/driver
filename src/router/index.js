import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/information',
    // redirect: '/fungi',
    component: () => import('@/layout/index'),
    children: [
      {
        path: 'fungi',
        component: () => import('@/views/information/fungi/index'),
        name: 'fungi',
        meta: { title: '食用菌一张图' },
      },
      {
        path: 'kiwi',
        component: () => import('@/views/information/kiwi/index'),
        name: 'kiwi',
        meta: { title: '猕猴桃一张图' },
      },
      {
        path: 'weather',
        component: () => import('@/views/information/weather/index'),
        name: 'weather',
        meta: { title: '气象资源分析' },
      },
    ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index"),
    meta: {
      title: '江山市数字三农平台'
    }
  },
  {
    path: "/home1",
    name: "home1",
    component: () => import("@/views/home/index1"),
    meta: {
      title: '江山市数字三农平台'
    }
  },
  {
    path: "/sence",
    name: "sence",
    component: () => import("@/views/sence/index"),
    meta: {
      title: '特色应用场景'
    }
  },
  {
    path: '/AppCenter',
    name: 'AppCenter',
    component: () => import('@/views/AppCenter/index'),
    meta: {
      title: '江山市数字三农平台'
    }
  },
  {
    path: '/villageTour',
    name: 'villageTour',
    component: () => import('@/views/tour/index'),
    meta: {
      title: '乡村旅游'
    }
  },
  {
    path: '/villageHospital',
    name: 'villageHospital',
    component: () => import('@/views/hospital/index'),
    meta: {
      title: '乡村医院'
    }
  },
  {
    path: '/villageGarbage',
    name: 'villageGarbage',
    component: () => import('@/views/garbage/index'),
    meta: {
      title: '垃圾分类'
    }
  },
  {
    path: '/teaDiseases',
    name: 'teaDiseases',
    component: () => import('@/views/teaDiseases/index'),
    meta: {
      title: '茶叶病虫害预警'
    }
  },

  {
    path: '/agriculturalMachine',
    name: 'agriculturalMachine',
    component: () => import('@/views/agriculturalMachine/index'),
    meta: {
      title: '农机资源分析'
    }
  },


  {
    path: '/smart-communities',
    name: 'SmartCommunities',
    component: () => import('@/layout/content'),
    meta: {
      title: '未来社区'
    },
    children: [
      {
        path: 'home',
        name: 'sc-home',
        component: () => import('@/views/smart-communities/index'),
        meta: {
          title: '未来社区'
        }
      },
      {
        path: 'fire-stats',
        name: 'sc-fire-stats',
        component: () => import('@/views/smart-communities/fire-stats'),
        meta: {
          title: '消防监管'
        }
      },
      {
        path: 'census-data',
        name: 'sc-census-data',
        component: () => import('@/views/smart-communities/census-data'),
        meta: {
          title: '重点人员'
        }
      },
    ]
  },
  {
    path: '/data-exploration',
    name: 'DataExploration',
    component: () => import('@/layout/DataExplorationLayout'),
    meta: {
      title: '算法模型' // 待定
    },
    children: [
      {
        path: 'priceDanger-warning',
        name: 'mp-PriceDanger-warning',
        component: () => import('@/views/data-exploration/PriceDangerLineWarning'),
        meta: {
          title: '生猪价格红线预警'
        }
      },
      {
        path: 'regionalSales-warning',
        name: 'mp-RegionalSales-warning',
        component: () => import('@/views/data-exploration/regionalSalesWarning'),
        meta: {
          title: '生猪区域销量突变预警'
        }
      },
      {
        path: 'iot-monitoring',
        name: 'mp-IoTMonitoring',
        component: () => import('@/views/data-exploration/IoTMonitoring'),
        meta: {
          title: '食用菌长势监测'
        }
      },
      {
        path: 'production-forecast',
        name: 'mp-production-forecast',
        component: () => import('@/views/data-exploration/ProductionForecast'),
        meta: {
          title: '食用菌产量预估'
        }
      },
    ]
  },
  {
    path: '/ruralBrain',
    name: 'ruralBrain',
    component: () => import('@/views/ruralBrain'),
    meta: {
      title: '乡村大脑'
    }
  },
  {
    path: '/jntIndex',
    name: 'jntIndex',
    component: () => import('@/views/jnt/index'),
    meta: {
      title: '乡村大脑'
    }
  },
  {
    path: '/404',
    name: '未找到页面',
    component: () => import('@/views/404.vue'),
  },
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
