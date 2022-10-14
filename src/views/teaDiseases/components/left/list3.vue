<template>
  <div class="_list">
    <div class="_top">
      <div class="type ml-12">病虫害类型</div>
      <div class="date">发生月份</div>
      <div class="deal">防治措施</div>
      <div class="time">预测时间</div>
    </div>

    <div
      v-if="list.length > 0 && isLoad"
      class="_item-main"
      :style="
        '--scroll: ' +
        (total - 2 > 0 ? total - 2 : 0) +
        ';--time: ' +
        (total - 2 > 0 ? total - 2 : 0)
      "
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="index % 2 == 0 ? '_item _item-select ' : '_item'"
      >
        <div class="type ml-12">{{ item.content.pest }}</div>
        <div class="date">{{ item.content.input_date }}</div>
        <div class="deal text-over1">
          {{ item.content.anti }}
        </div>
        <div class="time">{{ item.predict_date }}</div>
      </div>
    </div>

    <div v-else class="_item-main flex-ajc">
      <img
        src="https://img.hzanchu.com/acimg/7ca7c3d2f5367f2e7789bfc20ee4a8e8.png"
        class="_empty"
      />
      <div class="_empty-title">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import { teaDiseasesWarning } from "@/api/teadiseases/api";
import axios from "axios";
export default {
  setup() {
    const list = ref([]);
    const total = ref(10);
    const isLoad = ref(false);

    const str = [
      {
        predict_date: "0508",
        content: {
          pest: "黑刺粉虱",
          anti: "1.结合修剪、台刈、中耕除草，改善茶园通风透光条件，抑制其发生。2.应用韦伯虫座孢菌菌粉0.5-1.0公斤/亩喷施或用挂菌枝法即用韦伯虫座孢菌枝分别挂放茶丛四周，每平方米5-10技。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0509",
        content: {
          pest: "黑刺粉虱",
          anti: "1.结合修剪、台刈、中耕除草，改善茶园通风透光条件，抑制其发生。2.应用韦伯虫座孢菌菌粉0.5-1.0公斤/亩喷施或用挂菌枝法即用韦伯虫座孢菌枝分别挂放茶丛四周，每平方米5-10技。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0510",
        content: {
          pest: "黑刺粉虱",
          anti: "1.结合修剪、台刈、中耕除草，改善茶园通风透光条件，抑制其发生。2.应用韦伯虫座孢菌菌粉0.5-1.0公斤/亩喷施或用挂菌枝法即用韦伯虫座孢菌枝分别挂放茶丛四周，每平方米5-10技。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0511",
        content: {
          pest: "黑刺粉虱",
          anti: "1.结合修剪、台刈、中耕除草，改善茶园通风透光条件，抑制其发生。2.应用韦伯虫座孢菌菌粉0.5-1.0公斤/亩喷施或用挂菌枝法即用韦伯虫座孢菌枝分别挂放茶丛四周，每平方米5-10技。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0512",
        content: {
          pest: "茶尺蠖",
          anti: "1.在蛾毛期用频振杀虫灯诱杀成虫。2.用（10000pib/μL·2000iu/μL）茶芯·苏云锦500倍液对第一、二、五、六代茶尺蠖进行喷雾。3.0.6%苦参碱水800-1000倍液或2.5%溴氰菊酯乳油2500-3000倍液或2.5%氯氰菊酯EC 2000倍液或15%喷雾乳剂3000倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0513",
        content: {
          pest: "茶尺蠖",
          anti: "1.在蛾毛期用频振杀虫灯诱杀成虫。2.用（10000pib/μL·2000iu/μL）茶芯·苏云锦500倍液对第一、二、五、六代茶尺蠖进行喷雾。3.0.6%苦参碱水800-1000倍液或2.5%溴氰菊酯乳油2500-3000倍液或2.5%氯氰菊酯EC 2000倍液或15%喷雾乳剂3000倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0514",
        content: {
          pest: "茶尺蠖",
          anti: "1.在蛾毛期用频振杀虫灯诱杀成虫。2.用（10000pib/μL·2000iu/μL）茶芯·苏云锦500倍液对第一、二、五、六代茶尺蠖进行喷雾。3.0.6%苦参碱水800-1000倍液或2.5%溴氰菊酯乳油2500-3000倍液或2.5%氯氰菊酯EC 2000倍液或15%喷雾乳剂3000倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0515",
        content: {
          pest: "茶尺蠖",
          anti: "1.在蛾毛期用频振杀虫灯诱杀成虫。2.用（10000pib/μL·2000iu/μL）茶芯·苏云锦500倍液对第一、二、五、六代茶尺蠖进行喷雾。3.0.6%苦参碱水800-1000倍液或2.5%溴氰菊酯乳油2500-3000倍液或2.5%氯氰菊酯EC 2000倍液或15%喷雾乳剂3000倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0516",
        content: {
          pest: "茶毛虫高山",
          anti: "1.每年11月至翌年4月，摘除越冬卵块，捕杀幼虫。2.结合中耕培土适时灭蛹。3.利用物联网设备，诱杀成虫。4.用90%晶体敌百虫或50%马拉松乳剂、25%亚胺硫磷乳剂、50%杀螟松1000-2000倍液、80%敌敌畏乳剂2000-3000倍液或肥皂水150倍液喷杀。5.喷撒青虫菌粉(每克含150亿个孢子)500倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0517",
        content: {
          pest: "茶毛虫高山",
          anti: "1.每年11月至翌年4月，摘除越冬卵块，捕杀幼虫。2.结合中耕培土适时灭蛹。3.利用物联网设备，诱杀成虫。4.用90%晶体敌百虫或50%马拉松乳剂、25%亚胺硫磷乳剂、50%杀螟松1000-2000倍液、80%敌敌畏乳剂2000-3000倍液或肥皂水150倍液喷杀。5.喷撒青虫菌粉(每克含150亿个孢子)500倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0518",
        content: {
          pest: "茶毛虫高山",
          anti: "1.每年11月至翌年4月，摘除越冬卵块，捕杀幼虫。2.结合中耕培土适时灭蛹。3.利用物联网设备，诱杀成虫。4.用90%晶体敌百虫或50%马拉松乳剂、25%亚胺硫磷乳剂、50%杀螟松1000-2000倍液、80%敌敌畏乳剂2000-3000倍液或肥皂水150倍液喷杀。5.喷撒青虫菌粉(每克含150亿个孢子)500倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0519",
        content: {
          pest: "茶毛虫高山",
          anti: "1.每年11月至翌年4月，摘除越冬卵块，捕杀幼虫。2.结合中耕培土适时灭蛹。3.利用物联网设备，诱杀成虫。4.用90%晶体敌百虫或50%马拉松乳剂、25%亚胺硫磷乳剂、50%杀螟松1000-2000倍液、80%敌敌畏乳剂2000-3000倍液或肥皂水150倍液喷杀。5.喷撒青虫菌粉(每克含150亿个孢子)500倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0520",
        content: {
          pest: "茶毛虫高山",
          anti: "1.每年11月至翌年4月，摘除越冬卵块，捕杀幼虫。2.结合中耕培土适时灭蛹。3.利用物联网设备，诱杀成虫。4.用90%晶体敌百虫或50%马拉松乳剂、25%亚胺硫磷乳剂、50%杀螟松1000-2000倍液、80%敌敌畏乳剂2000-3000倍液或肥皂水150倍液喷杀。5.喷撒青虫菌粉(每克含150亿个孢子)500倍液。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0521",
        content: {
          pest: "茶叶象甲",
          anti: "1.耕翻松土，杀除幼虫和蛹。2.利用成虫假死性，地面铺塑料薄膜，然后用力振落集中消灭。3.于成虫出土前撒施白僵菌871菌粉，亩用菌粉1-2公斤拌细土施土上面。4.成虫出土高峰前喷施2.5％天王星800倍或98％巴丹800倍或与871菌粉0.5-1.0公斤/亩混用。",
          input_date: "0507",
        },
      },
      {
        predict_date: "0522",
        content: {
          pest: "茶叶象甲",
          anti: "1.耕翻松土，杀除幼虫和蛹。2.利用成虫假死性，地面铺塑料薄膜，然后用力振落集中消灭。3.于成虫出土前撒施白僵菌871菌粉，亩用菌粉1-2公斤拌细土施土上面。4.成虫出土高峰前喷施2.5％天王星800倍或98％巴丹800倍或与871菌粉0.5-1.0公斤/亩混用。",
          input_date: "0507",
        },
      },
    ];

    // 重新加载数据
    const reload = () => {
      // axios.get("https://jiangshan-ai.zjsszxc.com/algorithm_api/tea_diseases_warning/").then((res)=>{
      //   console.log(res)
      // })
      // teaDiseasesWarning().then((res) => {
      //   console.log(res);
      //   if (res.code == 0) {
      //     total.value = res.data.length;
      //     setTimeout(() => {
      //       list.value = res.data;
      //     }, 0);
      //   }
      //   isLoad.value = true;
      // });
      let newList = str;
      for (let item of newList) {
        item.predict_date =
          item.predict_date.substring(0, 2) +
          "-" +
          item.predict_date.substring(2, 4);
        item.content.input_date =
          item.content.input_date.substring(0, 2) +
          "-" +
          item.content.input_date.substring(2, 4);
      }
      total.value = str.length;
      isLoad.value = true;
      setTimeout(() => {
        list.value = newList;
      }, 0);
    };

    return {
      reload,
      list,
      isLoad,
      total,
    };
  },
};
</script>

<style scoped lang="scss">
._list {
  width: 100%;
  margin-top: vh(16);
  .ml-12 {
    margin-left: vw(12);
  }

  .type {
    width: vw(120);
    height: vh(35);
    line-height: vh(35);
  }

  .date {
    width: vw(100);
    height: vh(35);
    line-height: vh(35);
  }

  .time {
    width: vw(100);
    height: vh(35);
    line-height: vh(35);
  }

  .deal {
    width: 0;
    flex: 1;
    height: vh(35);
    line-height: vh(35);
    margin-left: vw(12);
    margin-right: vw(12);
  }

  ._top {
    width: 100%;
    padding: 0 vw(30);
    font-size: vw(14);
    color: #a1ceef;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
  }

  .flex-ajc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  ._item-main {
    width: 100%;
    height: vh(152);
    margin-top: vh(10);
    padding: 0 vw(30);
    box-sizing: border-box;
    overflow: hidden;

    ._empty {
      width: vw(130);
      height: vh(140);
    }

    ._empty-title {
      margin-top: vh(-20);
      font-size: vw(18);
      color: #bbd7fa;
    }
    ._item {
      width: 100%;
      height: vh(35);
      margin-bottom: vh(2);
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      font-size: vw(14);
      color: #fff;

      animation: tour_left3_list calc(var(--time) * 4s) linear infinite normal;
      animation-fill-mode: forwards;
    }

    ._item-select {
      background-color: rgba(95, 175, 249, 0.16);
    }

    ._item:hover {
      background-color: rgba(95, 175, 249, 0.16);
    }
  }
}
</style>

<style lang="scss">
@keyframes tour_left3_list {
  0% {
    transform: translateY(vw(0));
  }
  100% {
    transform: translateY(calc(var(--scroll) * vh(-35)));
  }
}
</style>
