<template>
  <div class="outer">
    <div class="header">
      <div class="title">数字应用</div>
    </div>
    <div class="center">
      <div class="title">
        <img src="https://img.hzanchu.com/acimg/872570e343691ba09ae1de2915cbe455.png" alt="">
        <span>{{cur_name}}</span>
        <img src="https://img.hzanchu.com/acimg/8f14ae253c0a79068dad22d77f5c5b23.png" alt="">
      </div>
      <div class="content">
        <div class="app-item" v-for="(item, app_i) in AppList" :key="app_i" @click="toPage(item)">
          <div class="qrcode">
            <img src="https://img.hzanchu.com/acimg/0860ff80f669b82f2a692ca567f30717.png" alt="">
          </div>
          <p class="app-name">{{item.name}}</p>
          <p class="subhead">{{item.subhead || '暂未开放，敬请期待'}}</p>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <div v-for="(item, i) in list" :key="i" class="nav-item">
        <div @click="toSelect(item, i)">
          <img :src="item.name === cur_name ? item.s_icon : item.icon" alt="">
          <p :style="{color: item.name === cur_name ? '#43C5EF' : '#2C3442'}">{{item.name}}</p>
        </div>
        <img v-if="i !== list.length - 1" src="https://img.hzanchu.com/acimg/8f1bc9c9cc4bf3c8c79dbc2561249375.png" alt="">
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'AppCenter',
  data() {
    return {
      list: [
        {
          icon: 'https://img.hzanchu.com/acimg/73fb4b6b059e114a6582b85d96ea87d5.png',
          s_icon: 'https://img.hzanchu.com/acimg/997e708223b104b4e410f62d3708003c.png',
          name: '生产管理'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/1d7d979305e18a57610accb704cbac81.png',
          s_icon: 'https://img.hzanchu.com/acimg/81bf7d23a1f807a74aa7da7dfeb36848.png',
          name: '流通营销'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/89b072dc54c13517d89d752a01b33918.png',
          s_icon: 'https://img.hzanchu.com/acimg/e8290bf195e43e8303cf870a19845b39.png',
          name: '行业监管'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/d6df8499b8536c60003f11d542389523.png',
          s_icon: 'https://img.hzanchu.com/acimg/a02144a69f853c2cdbe767841c623a5e.png',
          name: '公共服务'
        },
        {
          icon: 'https://img.hzanchu.com/acimg/937066bf5ae9c693876d26b218b7bc82.png',
          s_icon: 'https://img.hzanchu.com/acimg/99106ba988ebfee5dfa33860e616f21c.png',
          name: '乡村治理'
        },
      ],
      cur_name: '公共服务',
      AppList: [],
      shengchanguanli: [
        {
          name: '江农宅改',
          subhead: '管理系统',
          href: 'https://jiangshan-zjd-admini.zjsszxc.com',
        },
        {
          name: '江农投',
          subhead: '管理系统',
          href: 'https://jiangshan-tzyjs-admini.zjsszxc.com',
        },
        {
          name: '江益农',
          href: '',
        },
      ],
      liutongyingxiao: [
        {
          name: '网上农博·常山馆',
          subhead: '',
          href: '',
        },
        {
          name: '仓储物流集中配送系统',
          subhead: '',
          href: '',
        }
      ],
      hangyejianguan: [
        {
          name: '智慧园区监管平台',
          subhead: '',
          href: '',
        },
        {
          name: '全程追溯管理系统',
          subhead: '',
          href: '',
        },
        {
          name: '智慧园区监管平台',
          subhead: '',
          href: '',
        },
        {
          name: '中国油茶智慧云平台',
          subhead: '',
          href: '',
        },
        {
          name: '农资经营购销系统',
          href: '',
        },
      ],
      gonggongfuwu: [
        {
          name: '产业服务平台',
          subhead: '',
          href: '',
        },
      ],
      xiangcunzhili: [
        {
          name: '公共服务平台',
          subhead: '',
          href: '',
        },
        {
          name: '农村智慧垃圾分类',
          subhead: '',
          href: '',
        },
      ]
    }
  },
  mounted() {
    this.AppList = this.shengchanguanli
  },
  methods: {
    toEnter() {
      this.$message('暂未开放，敬请期待')
    },
    toSelect(item, i) {
      this.cur_name = item.name;
      switch(i) {
        case 0:
          this.AppList = this.shengchanguanli
          break;

        case 1:
          this.AppList = this.liutongyingxiao
          break;

        case 2:
          this.AppList = this.hangyejianguan
          break;

        case 3:
          this.AppList = this.gonggongfuwu
          break;

        case 4:
          this.AppList = this.xiangcunzhili
          break;


      }
    },
    toPage(item) {
      if(item.href) {
        window.open(item.href);
      } else {
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    background: url(https://img.hzanchu.com/acimg/6fe916f951d39e7e8e4f7b04061b0ba4.png) no-repeat;
    background-size: 100%;
  }
  .header  {
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 vw(54);
    margin-top: vw(37);
    .title {
      font-size: vw(48);
      font-family: Adobe Heiti Std R, Adobe Heiti Std R-R;
      color: #fff;
    }
  }
  .center {
    width:  vw(1326);
    height: vw(717);
    margin: vw(42) auto 0;
    background: url(https://img.hzanchu.com/acimg/23307ba44e97a87b4846a5e4c6ea1e37.png) no-repeat;
    background-size: 100% 100%;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: vw(100);
      img {
        width: vw(28);
      }
      span {
        font-size: vw(32);
        font-family: Adobe Heiti Std R, Adobe Heiti Std R-R;
        color: #fff;
        margin: 0 vw(17);
      }
    }
    .content {
      width: 86%;
      padding: 0 7%;
      height: vw(617);
      overflow-y: scroll;
      display: flex;
      flex-wrap: wrap;
      scrollbar-width: none;
      -ms-overflow-style: none;
      .app-item {
        text-align: center;
        margin: 0 0 vw(36) vw(36);
        width: vw(330);
        height: vw(260);
        color: #fff;
        .qrcode {
          width: vw(160);
          height: vw(160);
          border-radius: vw(32);
          background: rgba(69,200,240,0.4);
          margin: 0 auto;
          position: relative;
          cursor: pointer;
          img {
            width: vw(90);
            height: vw(90);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .qrcode:hover {
          background: linear-gradient( rgba(83,219,245,0.45) 0%, rgba(7,115,215,0.45) 100%);
        }
        .app-name {
          font-size: vw(28);
          line-height: vw(30);
          margin-top: vw(30);
        }
        .subhead {
          font-size: vw(20);
          line-height: vw(22);
          margin-top: vw(14);
        }
        // .entrance {
        //   font-size: vw(42);
        //   margin-top: vw(30);
        //   color: #90DBFE;
        //   text-decoration: underline;
        //   cursor: pointer;
        // }
      }
    }
    .content::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .footer {
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: vw(20);
    .nav-item  {
      display: flex;
      align-items: center;
      div {
        text-align: center;
        cursor: pointer;
        img {
          width: vw(72);
        }
        p {
          font-size: vw(20);
          line-height: vw(22);
          margin-top: vw(10);
          transition: all 0.3s;
        }
      }
      img {
        width: vw(109);
      }
    }
  }
</style>
