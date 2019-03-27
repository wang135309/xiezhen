import Vue from "vue";
import Router from "vue-router";
// 登录
const Login = resolve => {
  import("components/login/login").then(module => {
    resolve(module);
  });
};
// 注册
const Reg = resolve => {
  import("components/reg/reg").then(module => {
    resolve(module);
  });
};
// 登录
const Index = resolve => {
  import("components/index").then(module => {
    resolve(module);
  });
};
// 搜索详情页
const SeachDetail = resolve => {
  import("components/seachDetail/seachDetail").then(module => {
    resolve(module);
  });
};
// 详情页
const Detail = resolve => {
  import("components/seachDetail/detail").then(module => {
    resolve(module);
  });
};
// 图集详情页
const PageDetail = resolve => {
  import("components/seachDetail/pageDetail").then(module => {
    resolve(module);
  });
};
// 分享页
const Share = resolve => {
  import("components/seachDetail/share").then(module => {
    resolve(module);
  });
};
// 个人中心
const Center = resolve => {
  import("components/center/center").then(module => {
    resolve(module);
  });
};
// 分享任务
const Spread = resolve => {
  import("components/center/spread").then(module => {
    resolve(module);
  });
};
// 个人中心
const Upgrade = resolve => {
  import("components/center/upgrade1").then(module => {
    resolve(module);
  });
};
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/reg",
      component: Reg,
      meta: {
        title: "注册"
      }
    },
    {
      path: "/seachDetail",
      name: "SeachDetail",
      component: SeachDetail,
      meta: {
        title: "搜索详情页"
      }
    },
    {
      path: "/detail",
      name: "Detail",
      component: Detail,
      meta: {
        title: "详情页"
      }
    },
    {
      path: "/pagedetail",
      name: "PageDetail",
      component: PageDetail,
      meta: {
        title: "详情"
      }
    },
    {
      path: "/share",
      name: "Share",
      component: Share,
      meta: {
        title: "分享"
      }
    },
    {
      path: "/center",
      component: Center,
      meta: {
        title: "个人中心"
      }
    },
    {
      path: "/spread",
      name: "Spread",
      component: Spread,
      meta: {
        title: ""
      }
    },
    {
      path: "/upgrade",
      component: Upgrade,
      meta: {
        title: "升级会员"
      }
    }
  ]
});
