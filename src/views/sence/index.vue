<template>
  <div class="sence">
    <img class="goBack" src="../../assets/images/back.png" alt="" @click="goBack">
    <img
      class="header"
      src="https://img.hzanchu.com/acimg/a98b53d31218a1f324bad819990c3a61.png"
      alt=""
    />

    <div class="center">
      <list :list="getList" :customStyle="getStyle"></list>
    </div>

    <div class="footer">
      <div
        :class="type == 1 ? 'item-select' : 'item-unselect'"
        @click="changeTab(1)"
      >
        省级特色应用
      </div>
      <!--
      <div
        :class="type == 2 ? 'item-select ml' : 'item-unselect ml'"
        @click="changeTab(2)"
      >
        市级特色应用
      </div>
      -->

      <div
        :class="type == 3 ? 'item-select ml' : 'item-unselect ml'"
        @click="changeTab(3)"
      >
        县级特色应用
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import List from "./list.vue";
import { useRouter } from 'vue-router';
export default {
  components: { List },
  computed: {
    getList: function () {
      let curList = [];
      if (this.type == 1) {
        curList = this.list1;
      } else if (this.type == 3) {
        curList = this.list3;
      }
      console.log(curList);
      return curList;
    },
    getStyle: function () {
      let style = "";
      if (this.type == 3) {
        style = "margin-left: 90px;margin-right: 90px;margin-bottom: 90px";
      }
      return style;
    },
  },
  setup() {
    const type = ref(1); // 当前type类型
    const Router = useRouter();
    const list1 = ref([
      {
        list: [
          {
            url: "http://fylz.zjagri.cn/gx/pub/login/initLogin.shtml",
            route: "",
            title: "浙农优品-农资购销模块",
          },
          {
            url: "https://zjnj.zjagri.gov.cn/accountNjWeb/?pt=gf#/login",
            route: "",
            title: "浙江省农村集体经济数字管理系统",
          },
        ],
      },
      {
        list: [
          {
            url: "https://zjqzjs.ryaims.com:9903/#/newscreen",
            route: "",
            title: "江山农机社会化服务系统",
          },
        ],
      },

      {
        list: [
          {
            url: "https://datav.aliyuncs.com/share/f0b6a45abddb40c516e026aef41ed35a?code=c24c90e2c77f444f8fe87a572441e3a6",
            route: "",
            title: "浙鱼安",
          },
          {
            url: "http://zhxm.zjagri.gov.cn/zjtrace/user/bind?tuid=38029241&registerFlag=sn",
            route: "",
            title: "浙江省数字畜牧应用系统",
          },
        ],
      },
      {
        list: [
          // {
          //   url: "https://sznt.zjagri.cn:7070/ZJSZNT/login/EwmBUserLogin/0?SubTime=01%2F01%2F0001%2000%3A00%3A00&LastModifiedOn=01%2F01%2F0001%2000%3A00%3A00&DelFlag=0&ULevel=0&accountId=38029241&employeeCode=GE_5e8c745bdce84fac82ee62fa6bdc922f&realmId=196729&R_UserInfo_ActionInfo=System.Collections.Generic.HashSet%601%5BZAAS.ZJMAGIS.Model.R_UserInfo_ActionInfo%5D&R_UserInfo_Role=System.Collections.Generic.HashSet%601%5BZAAS.ZJMAGIS.Model.R_UserInfo_Role%5D&ActionGroup=System.Collections.Generic.HashSet%601%5BZAAS.ZJMAGIS.Model.ActionGroup%5D",
          //   route: "",
          //   title: "浙农田",
          // },
          {
            url: "https://szsn.zjagri.cn/sso/assets/szsnbg/login.html?appId=99197912281514014&redirectUri=https%3A%2F%2Fznm.zjagri.cn%2Fnorm%2Fdatav2%2F%23%2F",
            route: "",
            title: "浙农码数据驾驶舱",
          },
        ],
      },

      {
        list: [
          // {
          //   url: "https://fylz.zjagri.cn/zhejiang/use/gongZZHC/index.do",
          //   route: "",
          //   title: "浙农优品",
          // },
          {
            url: "http://www.zjnm.cn/XXKB/sy.html?code=55659af604844ee28931da1fad59789d",
            route: "",
            title: "浙江农民信箱",
          },
          {
            url: "https://zncf.zjagri.cn/login",
            route: "",
            title: "浙农共富",
          },
        ],
      },
      // {
      //   list: [
      //     {
      //       url: "https://szsn.zjagri.cn/sso/assets/szsnbg/login.html?appId=99197912281514014&redirectUri=https%3A%2F%2Fznm.zjagri.cn%2Fnorm%2Fdatav2%2F%23%2F",
      //       route: "",
      //       title: "浙农码数据驾驶舱",
      //     },
      //   ],
      // },

      // {
      //   list: [
      //     {
      //       url: "http://www.zjnm.cn/XXKB/sy.html?code=55659af604844ee28931da1fad59789d",
      //       route: "",
      //       title: "浙江农民信箱",
      //     },
      //     {
      //       url: "http://jqy.zjagri.cn/screen/#/",
      //       route: "",
      //       title: "二十四节气游美丽乡村",
      //     },
      //   ],
      // },
    ]); // 当前展示的列表
    const list3 = ref([
      {
        list: [
          {
            url: "https://jiangshan-mht-admini.zjsszxc.com",
            route: "",
            miniIcon: require("@/assets/images/sence/mihoutao.png"),
            miniImg: require("@/assets/images/sence/mihoutao.png"),
            title: "江山猕猴桃",
          },
          {
            url: "https://jiangshan-tzyjs-admini.zjsszxc.com/login",
            route: "",
            miniIcon: require("@/assets/images/sence/jnt.png"),
            miniImg: require("@/assets/images/sence/jnt.png"),
            title: "江农投",
          },
        ],
      },
      {
        list: [
          {
            url: "https://jiangshan-qcyl-admini.zjsszxc.com",
            route: "",
            miniIcon: require("@/assets/images/sence/shiyongjun.png"),
            miniImg: require("@/assets/images/sence/shiyongjun.png"),
            title: "江山食用菌",
          },
          {
            url: "https://jiangshan-ggfw-admini.zjsszxc.com/",
            route: "",
            miniIcon: require("@/assets/images/sence/jiangyinong.png"),
            miniImg: require("@/assets/images/sence/jiangyinong.png"),
            title: "江益农",
          },
        ],
      },
      {
        list: [
          {
            url: "https://jiangshan-zjd-yzt.zjsszxc.com/index",
            route: '',
            miniIcon: require("@/assets/images/sence/zhaigai.png"),
            miniImg: require("@/assets/images/sence/zhaigai.png"),
            title: "江山宅基地",
          },
          {
            url: "",
            miniIcon: require("@/assets/images/sence/list3-mini-icon.png"), // 小程序图标配置
            miniImg: require("@/assets/images/sence/list3-mini-img.png"), // 小程序大图配置
            route: "",
            title: "一机游江山",
          },
        ],
      },
    ]); // 当前展示的列表

    // 点击切换
    const changeTab = (t) => {
      type.value = t;
    };

    const goBack = () => {
      Router.go(-1);
    }

    onMounted(() => {});
    return {
      type,
      list1,
      list3,
      changeTab,
      goBack
    };
  },
};
</script>

<style lang="scss" scoped>
.sence {
  width: 100%;
  height: 100vh;
  background: url("https://img.hzanchu.com/acimg/5afa9f8cbea019a6ca72ae9121cc5866.png")
    no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .center {
    width: 100%;
    margin-top: vw(130);
  }
}

.goBack {
  width: 71px;
  position: absolute;
  right: 0;
  top: 24px;
  cursor: pointer;
}

.header {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.footer {
  position: fixed;
  bottom: vh(16);
  width: 100%;
  height: vw(100);
  // background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .item-select {
    width: vw(572);
    height: vw(92);
    background: url("https://img.hzanchu.com/acimg/37a45aa371c46053008e4d5ecd880275.png")
      no-repeat;
    background-size: 100% 100%;
    line-height: vw(92);
    text-align: center;
    font-weight: bold;
    font-size: vw(28);
    color: #fff;
  }

  .item-unselect {
    width: vw(572);
    height: vw(92);
    background: url("https://img.hzanchu.com/acimg/3afa8f2f03d86ec81dd630f8defb88ba.png")
      no-repeat;
    background-size: 100% 100%;
    line-height: vw(92);
    text-align: center;
    font-weight: bold;
    font-size: vw(26);
    color: rgba($color: #ffffff, $alpha: 0.5);
    cursor: pointer;
  }

  .ml {
    margin-left: vw(-120);
  }
}
</style>
