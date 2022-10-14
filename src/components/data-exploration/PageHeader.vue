<template>
  <header class="de-header">
    {{ headerTitle }}
    <router-link
      :to="returnUrl"
      v-if="Boolean(returnUrl)"
      class="back-home-link"
    >
      <img
        :src="require('@/assets/images/icon/return-arrow.svg')"
        alt="arrow"
      />
      返回首页
    </router-link>

    <div
      v-if="headerTitle == '食用菌长势监测'"
      class="download"
      @click="download"
    >
      <img src="@/assets/images/garbage/header-download-icon.png" />
      下载报告
    </div>
  </header>
</template>

<script setup>
import { defineEmits } from "vue";
import request from "@/util/http";
import { compareDateString, sanitizeInvalidDate } from "@/util/util";

const props = defineProps({
  headerTitle: String,
  returnUrl: String,
});

const download = (e) => {
  if (props.headerTitle == "食用菌长势监测") {
    downloadIot();
  }
};

// 下载 食用菌长势检测 模板
const downloadIot = async () => {
  let environment_alerts = [],
    diseases = [],
    growths = [];
  let isLoading = true;

  await request
    .get("/api/fungus/environment-alert-list")
    .then((result) => {
      environment_alerts = result.data
        .sort((a, b) => compareDateString(a.date, b.date))
        .map((e, idx) => ({
          ...e,
          date: sanitizeInvalidDate(e.date),
        }));
    })
    .finally(() => {
      isLoading = false;
    });
  await request.get("/api/fungus/pest-monitor-list").then((result) => {
    diseases = result.data.map((e) => ({
      photo: e.photo,
      refer_photo: e.refer_photo,
      measure: e.measure || "", // FIXME: 接口没返回
      date: e.date,
    }));
  });

  await request.get("/api/fungus/growth-monitor-list").then((result) => {
    growths = result.data.map((e) => ({
      abnormal: e.abnormal,
      number: e.number,
      cycle: e.cycle,
      date: e.date,
    }));
  });

  request
    .post("/api/report/export", {
      type: "jiangshan-fungus-growth-tendency",
      data: {
        environment_alerts,
        diseases,
        growths,
      },
    })
    .then((result) => {
      // console.log(result);
      let time = new Date().toISOString().slice(0, 10);
      downloadAs(
        result,
        "江山市食用菌长势监测报告" + time + ".docx",
        // "application/vnd.openxmlformats-officedocument.spreadsheetml.document"
        // "application/msword"
        // "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        // "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        // "application/vnd.ms-word"
        "application/octet-stream"
      );
    })
    .catch((e) => {
      console.log(e);
    });

  // console.log(environment_alerts, diseases, growths);
};

const downloadAs = (stream, name, MIMEType) => {
  // console.log(name, MIMEType);
  if (stream && name) {
    const blob = new Blob([stream], {
      type: MIMEType,
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href); // 释放URL 对象
    document.body.removeChild(link);
  }
};
</script>

<style scoped lang="scss">
.de-header {
  position: fixed;
  z-index: 100;
  box-sizing: border-box;
  width: vw(1920);
  height: vw(110);
  padding-block: vw(20);
  background: no-repeat center/100% 100%
    url("~@/assets/images/data-exploration/shared/header-bg.webp");

  font-size: vw(50);
  font-family: PangMenZhengDao;
  font-weight: 400;
  line-height: vw(50);
  color: #ffffff;
  text-shadow: 0px vw(6) vw(20) rgba(1, 14, 52, 0.63);
  letter-spacing: vw(4);
  text-align: center;
}

.back-home-link {
  position: absolute;
  font-size: vw(16);
  line-height: 1em;
  right: vw(40);
  top: vh(20);
  font-weight: bold;
  color: #ffffff;
  letter-spacing: initial;
  font-family: Microsoft YaHei;
  img {
    width: 1em;
    height: 1em;
    vertical-align: bottom;
  }
}

.download {
  position: absolute;
  z-index: 30;
  top: vh(70);
  right: vw(36);
  width: vw(106);
  height: vh(31);
  background: url("~@/assets/images/garbage/header-download-bg.png") no-repeat;
  background-size: 100% 100%;
  font-size: vw(14);
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: vw(1);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: vw(20);
    height: vh(20);
    margin-right: vw(4);
  }
}
</style>
