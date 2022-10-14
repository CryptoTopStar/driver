<template>
  <div class="understandDetailModalCon">
    <div class="shutModal" @click="shutModAction"></div>
    <div class="title">主体详情</div>
    <div class="titleBg" :class="[state.titleBgNeedChange ? 'titleBgFix' : '']">
      <div class="titleBText">
        {{ state.info && state.info.ztmc }}
      </div>
    </div>
    <div class="scene1" v-if="state.showS1">
      <div class="scene1-1 scene1Common">
        <div class="centerText">
          <div class="commonTitle maxWidth310">详细地址</div>
          <div class="commonReal addressRealSpecialCon">{{ (state.addressArray[0] && state.addressArray[0].real) || '-' }}</div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[0]">
            <div class="commonTitle" v-if="state.withOutAddressArray[0].value">{{ state.withOutAddressArray[0].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[0].real || state.withOutAddressArray[0].real === 0">{{ state.withOutAddressArray[0].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[1]">
            <div class="commonTitle" v-if="state.withOutAddressArray[1].value">{{ state.withOutAddressArray[1].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[1].real || state.withOutAddressArray[1].real === 0">{{ state.withOutAddressArray[1].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene1-2 scene1Common" v-if="state.withOutAddressArray[2] && state.withOutAddressArray[3] && state.withOutAddressArray[4] && state.withOutAddressArray[5]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[2]">
            <div class="commonTitle" v-if="state.withOutAddressArray[2].value">{{ state.withOutAddressArray[2].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[2].real || state.withOutAddressArray[2].real === 0">{{ state.withOutAddressArray[2].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[3]">
            <div class="commonTitle" v-if="state.withOutAddressArray[3].value">{{ state.withOutAddressArray[3].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[3].real || state.withOutAddressArray[3].real === 0">{{ state.withOutAddressArray[3].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[4]">
            <div class="commonTitle" v-if="state.withOutAddressArray[4].value">{{ state.withOutAddressArray[4].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[4].real || state.withOutAddressArray[4].real === 0">{{ state.withOutAddressArray[4].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[5]">
            <div class="commonTitle" v-if="state.withOutAddressArray[5].value">{{ state.withOutAddressArray[5].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[5].real || state.withOutAddressArray[5].real === 0">{{ state.withOutAddressArray[5].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene1-3 scene1Common" v-if="state.withOutAddressArray[6] && state.withOutAddressArray[7] && state.withOutAddressArray[8] && state.withOutAddressArray[9]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[6]">
            <div class="commonTitle" v-if="state.withOutAddressArray[6].value">{{ state.withOutAddressArray[6].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[6].real || state.withOutAddressArray[6].real === 0">{{ state.withOutAddressArray[6].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[7]">
            <div class="commonTitle" v-if="state.withOutAddressArray[7].value">{{ state.withOutAddressArray[7].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[7].real || state.withOutAddressArray[7].real === 0">{{ state.withOutAddressArray[7].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[8]">
            <div class="commonTitle" v-if="state.withOutAddressArray[8].value">{{ state.withOutAddressArray[8].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[8].real || state.withOutAddressArray[8].real === 0">{{ state.withOutAddressArray[8].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[9]">
            <div class="commonTitle" v-if="state.withOutAddressArray[9].value">{{ state.withOutAddressArray[9].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[9].real || state.withOutAddressArray[9].real === 0">{{ state.withOutAddressArray[9].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene1-4 scene1Common" v-if="state.withOutAddressArray[10] && state.withOutAddressArray[11] && state.withOutAddressArray[12] && state.withOutAddressArray[13]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[10]">
            <div class="commonTitle" v-if="state.withOutAddressArray[10].value">{{ state.withOutAddressArray[10].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[10].real || state.withOutAddressArray[10].real === 0">{{ state.withOutAddressArray[10].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[11]">
            <div class="commonTitle" v-if="state.withOutAddressArray[11].value">{{ state.withOutAddressArray[11].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[11].real || state.withOutAddressArray[11].real === 0">{{ state.withOutAddressArray[11].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[12]">
            <div class="commonTitle" v-if="state.withOutAddressArray[12].value">{{ state.withOutAddressArray[12].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[12].real || state.withOutAddressArray[12].real === 0">{{ state.withOutAddressArray[12].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[13]">
            <div class="commonTitle" v-if="state.withOutAddressArray[13].value">{{ state.withOutAddressArray[13].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[13].real || state.withOutAddressArray[13].real === 0">{{ state.withOutAddressArray[13].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene1-5 scene1Common" v-if="state.withOutAddressArray[14] && state.withOutAddressArray[15] && state.withOutAddressArray[16] && state.withOutAddressArray[17]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[14]">
            <div class="commonTitle" v-if="state.withOutAddressArray[14].value">{{ state.withOutAddressArray[14].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[14].real || state.withOutAddressArray[14].real === 0">{{ state.withOutAddressArray[14].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[15]">
            <div class="commonTitle" v-if="state.withOutAddressArray[15].value">{{ state.withOutAddressArray[15].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[15].real || state.withOutAddressArray[15].real === 0">{{ state.withOutAddressArray[15].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[16]">
            <div class="commonTitle" v-if="state.withOutAddressArray[16].value">{{ state.withOutAddressArray[16].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[16].real || state.withOutAddressArray[16].real === 0">{{ state.withOutAddressArray[16].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[17]">
            <div class="commonTitle" v-if="state.withOutAddressArray[17].value">{{ state.withOutAddressArray[17].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[17].real || state.withOutAddressArray[17].real === 0">{{ state.withOutAddressArray[17].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene1-6 scene1Common" v-if="state.withOutAddressArray[18] && state.withOutAddressArray[19] && state.withOutAddressArray[20] && state.withOutAddressArray[21]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[18]">
            <div class="commonTitle" v-if="state.withOutAddressArray[18].value">{{ state.withOutAddressArray[18].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[18].real || state.withOutAddressArray[18].real === 0">{{ state.withOutAddressArray[18].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[19]">
            <div class="commonTitle" v-if="state.withOutAddressArray[19].value">{{ state.withOutAddressArray[19].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[19].real || state.withOutAddressArray[19].real === 0">{{ state.withOutAddressArray[19].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[20]">
            <div class="commonTitle" v-if="state.withOutAddressArray[20].value">{{ state.withOutAddressArray[20].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[20].real || state.withOutAddressArray[20].real === 0">{{ state.withOutAddressArray[20].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[21]">
            <div class="commonTitle" v-if="state.withOutAddressArray[21].value">{{ state.withOutAddressArray[21].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[21].real || state.withOutAddressArray[21].real === 0">{{ state.withOutAddressArray[21].real }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="scene2" v-if="state.showS2">
      <div class="scene2-1 scene2Common">
        <div class="centerText">
          <div class="commonTitle maxWidth310">详细地址</div>
          <div class="commonReal addressRealSpecialCon">{{ (state.addressArray[0] && state.addressArray[0].real) || '-' }}</div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[0]">
            <div class="commonTitle" v-if="state.withOutAddressArray[0].value">{{ state.withOutAddressArray[0].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[0].real || state.withOutAddressArray[0].real === 0">{{ state.withOutAddressArray[0].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[1]">
            <div class="commonTitle" v-if="state.withOutAddressArray[1].value">{{ state.withOutAddressArray[1].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[1].real || state.withOutAddressArray[1].real === 0">{{ state.withOutAddressArray[1].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene2-2 scene2Common" v-if="state.withOutAddressArray[2] && state.withOutAddressArray[3] && state.withOutAddressArray[4] && state.withOutAddressArray[5]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[2]">
            <div class="commonTitle" v-if="state.withOutAddressArray[2].value">{{ state.withOutAddressArray[2].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[2].real || state.withOutAddressArray[2].real === 0">{{ state.withOutAddressArray[2].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[3]">
            <div class="commonTitle" v-if="state.withOutAddressArray[3].value">{{ state.withOutAddressArray[3].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[3].real || state.withOutAddressArray[3].real === 0">{{ state.withOutAddressArray[3].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[4]">
            <div class="commonTitle" v-if="state.withOutAddressArray[4].value">{{ state.withOutAddressArray[4].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[4].real || state.withOutAddressArray[4].real === 0">{{ state.withOutAddressArray[4].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[5]">
            <div class="commonTitle" v-if="state.withOutAddressArray[5].value">{{ state.withOutAddressArray[5].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[5].real || state.withOutAddressArray[5].real === 0">{{ state.withOutAddressArray[5].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene2-3 scene2Common" v-if="state.withOutAddressArray[6] && state.withOutAddressArray[7] && state.withOutAddressArray[8] && state.withOutAddressArray[9]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[6]">
            <div class="commonTitle" v-if="state.withOutAddressArray[6].value">{{ state.withOutAddressArray[6].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[6].real || state.withOutAddressArray[6].real === 0">{{ state.withOutAddressArray[6].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[7]">
            <div class="commonTitle" v-if="state.withOutAddressArray[7].value">{{ state.withOutAddressArray[7].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[7].real || state.withOutAddressArray[7].real === 0">{{ state.withOutAddressArray[7].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[8]">
            <div class="commonTitle" v-if="state.withOutAddressArray[8].value">{{ state.withOutAddressArray[8].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[8].real || state.withOutAddressArray[8].real === 0">{{ state.withOutAddressArray[8].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[9]">
            <div class="commonTitle" v-if="state.withOutAddressArray[9].value">{{ state.withOutAddressArray[9].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[9].real || state.withOutAddressArray[9].real === 0">{{ state.withOutAddressArray[9].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene2-4 scene2Common" v-if="state.withOutAddressArray[10] && state.withOutAddressArray[11] && state.withOutAddressArray[12] && state.withOutAddressArray[13]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[10]">
            <div class="commonTitle" v-if="state.withOutAddressArray[10].value">{{ state.withOutAddressArray[10].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[10].real || state.withOutAddressArray[10].real === 0">{{ state.withOutAddressArray[10].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[11]">
            <div class="commonTitle" v-if="state.withOutAddressArray[11].value">{{ state.withOutAddressArray[11].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[11].real || state.withOutAddressArray[11].real === 0">{{ state.withOutAddressArray[11].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[12]">
            <div class="commonTitle" v-if="state.withOutAddressArray[12].value">{{ state.withOutAddressArray[12].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[12].real || state.withOutAddressArray[12].real === 0">{{ state.withOutAddressArray[12].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[13]">
            <div class="commonTitle" v-if="state.withOutAddressArray[13].value">{{ state.withOutAddressArray[13].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[13].real || state.withOutAddressArray[13].real === 0">{{ state.withOutAddressArray[13].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene2-5 scene2Common" v-if="state.withOutAddressArray[14] && state.withOutAddressArray[15] && state.withOutAddressArray[16] && state.withOutAddressArray[17]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[14]">
            <div class="commonTitle" v-if="state.withOutAddressArray[14].value">{{ state.withOutAddressArray[14].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[14].real || state.withOutAddressArray[14].real === 0">{{ state.withOutAddressArray[14].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[15]">
            <div class="commonTitle" v-if="state.withOutAddressArray[15].value">{{ state.withOutAddressArray[15].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[15].real || state.withOutAddressArray[15].real === 0">{{ state.withOutAddressArray[15].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[16]">
            <div class="commonTitle" v-if="state.withOutAddressArray[16].value">{{ state.withOutAddressArray[16].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[16].real || state.withOutAddressArray[16].real === 0">{{ state.withOutAddressArray[16].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[17]">
            <div class="commonTitle" v-if="state.withOutAddressArray[17].value">{{ state.withOutAddressArray[17].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[17].real || state.withOutAddressArray[17].real === 0">
              {{ state.withOutAddressArray[17].real }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scene3" v-if="state.showS3">
      <div class="scene3-1 scene3Common">
        <div class="centerText">
          <div class="commonTitle maxWidth310">详细地址</div>
          <div class="commonReal addressRealSpecialCon">{{ (state.addressArray[0] && state.addressArray[0].real) || '-' }}</div>
        </div>
        <div class="flexCenter centerText" v-if="state.withOutAddressArray[0] && state.withOutAddressArray[1]">
          <div v-if="state.withOutAddressArray[0]">
            <div class="commonTitle" v-if="state.withOutAddressArray[0].value">{{ state.withOutAddressArray[0].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[0].real || state.withOutAddressArray[0].real === 0">{{ state.withOutAddressArray[0].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[1]">
            <div class="commonTitle" v-if="state.withOutAddressArray[1].value">{{ state.withOutAddressArray[1].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[1].real || state.withOutAddressArray[1].real === 0">{{ state.withOutAddressArray[1].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene3-2 scene3Common" v-if="state.withOutAddressArray[2] && state.withOutAddressArray[3]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[2]">
            <div class="commonTitle" v-if="state.withOutAddressArray[2].value">{{ state.withOutAddressArray[2].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[2].real || state.withOutAddressArray[2].real === 0">{{ state.withOutAddressArray[2].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[3]">
            <div class="commonTitle" v-if="state.withOutAddressArray[3].value">{{ state.withOutAddressArray[3].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[3].real || state.withOutAddressArray[3].real === 0">{{ state.withOutAddressArray[3].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText" v-if="state.withOutAddressArray[4] && state.withOutAddressArray[5]">
          <div v-if="state.withOutAddressArray[4]">
            <div class="commonTitle" v-if="state.withOutAddressArray[4].value">{{ state.withOutAddressArray[4].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[4].real || state.withOutAddressArray[4].real === 0">{{ state.withOutAddressArray[4].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[5]">
            <div class="commonTitle" v-if="state.withOutAddressArray[5].value">{{ state.withOutAddressArray[5].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[5].real || state.withOutAddressArray[5].real === 0">{{ state.withOutAddressArray[5].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene3-3 scene3Common" v-if="state.withOutAddressArray[6] && state.withOutAddressArray[7]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[6]">
            <div class="commonTitle" v-if="state.withOutAddressArray[6].value">{{ state.withOutAddressArray[6].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[6].real || state.withOutAddressArray[6].real === 0">{{ state.withOutAddressArray[6].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[7]">
            <div class="commonTitle" v-if="state.withOutAddressArray[7].value">{{ state.withOutAddressArray[7].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[7].real || state.withOutAddressArray[7].real === 0">{{ state.withOutAddressArray[7].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText" v-if="state.withOutAddressArray[8] && state.withOutAddressArray[9]">
          <div v-if="state.withOutAddressArray[8]">
            <div class="commonTitle" v-if="state.withOutAddressArray[8].value">{{ state.withOutAddressArray[8].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[8].real || state.withOutAddressArray[8].real === 0">{{ state.withOutAddressArray[8].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[9]">
            <div class="commonTitle" v-if="state.withOutAddressArray[9].value">{{ state.withOutAddressArray[9].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[9].real || state.withOutAddressArray[9].real === 0">{{ state.withOutAddressArray[9].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene3-4 scene3Common" v-if="state.withOutAddressArray[10] && state.withOutAddressArray[11]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[10]">
            <div class="commonTitle" v-if="state.withOutAddressArray[10].value">{{ state.withOutAddressArray[10].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[10].real || state.withOutAddressArray[10].real === 0">{{ state.withOutAddressArray[10].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[11]">
            <div class="commonTitle" v-if="state.withOutAddressArray[11].value">{{ state.withOutAddressArray[11].value }}</div>
            <div class="commonReal addressSpecialCon" v-if="state.withOutAddressArray[11].real || state.withOutAddressArray[11].real === 0">{{ state.withOutAddressArray[11].real }}</div>
          </div>
        </div>
        <div class="flexCenter centerText" v-if="state.withOutAddressArray[12] && state.withOutAddressArray[13]">
          <div v-if="state.withOutAddressArray[12]">
            <div class="commonTitle" v-if="state.withOutAddressArray[12].value">{{ state.withOutAddressArray[12].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[12].real || state.withOutAddressArray[12].real === 0">{{ state.withOutAddressArray[12].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[13]">
            <div class="commonTitle" v-if="state.withOutAddressArray[13].value">{{ state.withOutAddressArray[13].value }}</div>
            <div class="commonReal" v-if="state.withOutAddressArray[13].real || state.withOutAddressArray[13].real === 0">{{ state.withOutAddressArray[13].real }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="scene4" v-if="state.showS4" key="4">
      <div class="scene4-1 scene4Common">
        <div class="centerText">
          <div class="common1Title maxWidth280">详细地址</div>
          <div class="common1Real maxWidth280">{{ (state.addressArray[0] && state.addressArray[0].real) || '-' }}</div>
        </div>
      </div>
      <div class="scene4-2 scene4Common" v-if="state.withOutAddressArray[0] && state.withOutAddressArray[1]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[0]">
            <div class="common1Title" v-if="state.withOutAddressArray[0].value">{{ state.withOutAddressArray[0].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[0].real || state.withOutAddressArray[0].real === 0">{{ state.withOutAddressArray[0].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[1]">
            <div class="common1Title" v-if="state.withOutAddressArray[1].value">{{ state.withOutAddressArray[1].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[1].real || state.withOutAddressArray[1].real === 0">{{ state.withOutAddressArray[1].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene4-3 scene4Common" v-if="state.withOutAddressArray[2] && state.withOutAddressArray[3]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[2]">
            <div class="common1Title" v-if="state.withOutAddressArray[2].value">{{ state.withOutAddressArray[2].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[2].real || state.withOutAddressArray[2].real === 0">{{ state.withOutAddressArray[2].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[3]">
            <div class="common1Title" v-if="state.withOutAddressArray[3].value">{{ state.withOutAddressArray[3].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[3].real || state.withOutAddressArray[3].real === 0">{{ state.withOutAddressArray[3].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene4-4 scene4Common" v-if="state.withOutAddressArray[4] && state.withOutAddressArray[5]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[4]">
            <div class="common1Title" v-if="state.withOutAddressArray[4].value">{{ state.withOutAddressArray[4].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[4].real || state.withOutAddressArray[4].real === 0">{{ state.withOutAddressArray[4].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[5]">
            <div class="common1Title" v-if="state.withOutAddressArray[5].value">{{ state.withOutAddressArray[5].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[5].real || state.withOutAddressArray[5].real === 0">{{ state.withOutAddressArray[5].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene4-5 scene4Common" v-if="state.withOutAddressArray[6] && state.withOutAddressArray[7]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[6]">
            <div class="common1Title" v-if="state.withOutAddressArray[6].value">{{ state.withOutAddressArray[6].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[6].real || state.withOutAddressArray[6].real === 0">{{ state.withOutAddressArray[6].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[7]">
            <div class="common1Title" v-if="state.withOutAddressArray[7].value">{{ state.withOutAddressArray[7].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[7].real || state.withOutAddressArray[7].real === 0">{{ state.withOutAddressArray[7].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene4-6 scene4Common" v-if="state.withOutAddressArray[8] && state.withOutAddressArray[9]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[8]">
            <div class="common1Title" v-if="state.withOutAddressArray[8].value">{{ state.withOutAddressArray[8].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[8].real || state.withOutAddressArray[8].real === 0">{{ state.withOutAddressArray[8].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[9]">
            <div class="common1Title" v-if="state.withOutAddressArray[9].value">{{ state.withOutAddressArray[9].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[9].real || state.withOutAddressArray[9].real === 0">{{ state.withOutAddressArray[9].real }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="scene5" v-if="state.showS5">
      <div class="scene5-1 scene5Common">
        <div class="centerText">
          <div class="common1Title maxWidth280">详细地址</div>
          <div class="common1Real maxWidth280">{{ (state.addressArray[0] && state.addressArray[0].real) || '-' }}</div>
        </div>
      </div>
      <div class="scene5-2 scene5Common" v-if="state.withOutAddressArray[0] && state.withOutAddressArray[1]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[0]">
            <div class="common1Title" v-if="state.withOutAddressArray[0].value">{{ state.withOutAddressArray[0].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[0].real || state.withOutAddressArray[0].real === 0">{{ state.withOutAddressArray[0].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[1]">
            <div class="common1Title" v-if="state.withOutAddressArray[1].value">{{ state.withOutAddressArray[1].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[1].real || state.withOutAddressArray[1].real === 0">{{ state.withOutAddressArray[1].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene5-3 scene5Common" v-if="state.withOutAddressArray[2] && state.withOutAddressArray[3]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[2]">
            <div class="common1Title" v-if="state.withOutAddressArray[2].value">{{ state.withOutAddressArray[2].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[2].real || state.withOutAddressArray[2].real === 0">{{ state.withOutAddressArray[2].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[3]">
            <div class="common1Title" v-if="state.withOutAddressArray[3].value">{{ state.withOutAddressArray[3].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[3].real || state.withOutAddressArray[3].real === 0">{{ state.withOutAddressArray[3].real }}</div>
          </div>
        </div>
      </div>
      <div class="scene5-4 scene5Common" v-if="state.withOutAddressArray[4] && state.withOutAddressArray[5]">
        <div class="flexCenter centerText">
          <div v-if="state.withOutAddressArray[4]">
            <div class="common1Title" v-if="state.withOutAddressArray[4].value">{{ state.withOutAddressArray[4].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[4].real || state.withOutAddressArray[4].real === 0">{{ state.withOutAddressArray[4].real }}</div>
          </div>
          <div v-if="state.withOutAddressArray[5]">
            <div class="common1Title" v-if="state.withOutAddressArray[5].value">{{ state.withOutAddressArray[5].value }}</div>
            <div class="common1Real" v-if="state.withOutAddressArray[5].real || state.withOutAddressArray[5].real === 0">{{ state.withOutAddressArray[5].real }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="scene6" v-if="state.showS6">
      <div class="scene6-1 scene6Common">
        <div class="centerText">
          <div class="common1Title maxWidth280">详细地址</div>
          <div class="common1Real maxWidth280">{{ (state.addressArray[0] && state.addressArray[0].real) || '-' }}</div>
        </div>
      </div>
      <div class="scene6-2 scene6Common" v-if="state.withOutAddressArray[0]">
        <div class="centerText">
          <div class="common1Title" v-if="state.withOutAddressArray[0].value">{{ state.withOutAddressArray[0].value }}</div>
          <div class="common1Real" v-if="state.withOutAddressArray[0].real || state.withOutAddressArray[0].real === 0">{{ state.withOutAddressArray[0].real }}</div>
        </div>
      </div>
      <div class="scene6-3 scene6Common" v-if="state.withOutAddressArray[1]">
        <div class="centerText">
          <div class="common1Title" v-if="state.withOutAddressArray[1].value">{{ state.withOutAddressArray[1].value }}</div>
          <div class="common1Real" v-if="state.withOutAddressArray[1].real || state.withOutAddressArray[1].real === 0">{{ state.withOutAddressArray[1].real }}</div>
        </div>
      </div>
      <div class="scene6-4 scene6Common" v-if="state.withOutAddressArray[2]">
        <div class="centerText">
          <div class="common1Title" v-if="state.withOutAddressArray[2].value">{{ state.withOutAddressArray[2].value }}</div>
          <div class="common1Real" v-if="state.withOutAddressArray[2].real || state.withOutAddressArray[2].real === 0">{{ state.withOutAddressArray[2].real }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const state = reactive({
  info: {},
  titleBgNeedChange: false,
  matchInfo: [
  
    {
      key: 'tyshxydm',
      value: '统一社会信用代码'
    },
    {
      key: 'xxdz',
      value: '详细地址'
    },
    {
      key: 'yzbm',
      value: '邮政编码'
    },
    {
      key: 'jwd',
      value: '经纬度'
    },
    {
      key: 'zcsj',
      value: '注册时间'
    },
    {
      key: 'djcys',
      value: '登记成员数'
    },
    {
      key: 'ddnhs',
      value: '带动农户数'
    },
    {
      key: 'sndgdzcze',
      value: '上年度固定资产总额'
    },
    {
      key: 'bz',
      value: '备注'
    },
    {
      key: 'jtcys',
      value: '家庭成员数量'
    },
    {
      key: 'ldlsl',
      value: '劳动力数量'
    },
    {
      key: 'fr',
      value: '法人'
    },
    {
      key: 'syqxz',
      value: '所有权性质'
    },
    {
      key: 'dpssmj',
      value: '大棚设施面积'
    },
    {
      key: 'xnw',
      value: '虚拟网'
    },
    {
      key: 'xzjd',
      value: '乡镇街道'
    },
    {
      key: 'cm',
      value: '村名'
    },
    {
      key: 'jbqk',
      value: '基本情况'
    },
    {
      key: 'zcdz',
      value: '注册地址'
    },
    {
      key: 'gbj',
      value: '股本金'
    },
    {
      key: 'sb',
      value: '商标'
    },
    {
      key: 'spscxk',
      value: '食品生产许可'
    },
    {
      key: 'csdymj',
      value: '村属地域面积'
    },
    {
      key: 'ds',
      value: '栋数'
    },
    {
      key: 'xdszcll',
      value: '限定生猪存栏量'
    },
    {
      key: 'xdnfmz',
      value: '限定能繁母猪'
    },
    {
      key: 'clsj',
      value: '成立时间'
    },
    {
      key: 'ssfcc',
      value: '省示范茶厂'
    },
    {
      key: 'sbzhmcc',
      value: '省标准化名茶厂'
    },
    {
      key: 'kz',
      value: '坑种'
    },
    {
      key: 'wxx',
      value: '无性系'
    },
    {
      key: 'csny',
      value: '出生年月'
    },
    {
      key: 'nl',
      value: '年龄'
    },
    {
      key: 'xb',
      value: '性别'
    },
    // {
    //   key: 'sjbm',
    //   value: '数据表名'
    // },
    {
      key: 'bd',
      value: '办电'
    },
    {
      key: 'cyzk',
      value: '产业状况'
    },
    {
      key: 'jydz',
      value: '经营地址'
    },
    {
      key: 'lxr',
      value: '联系人'
    },
    {
      key: 'lxdh',
      value: '联系电话'
    },

    {
      key: 'ztjb',
      value: '主体级别'
    },
    {
      key: 'ztlb',
      value: '主体类别'
    },
    {
      key: 'zycp',
      value: '主营产品'
    },

    {
      key: 'snyy',
      value: '上年盈余'
    },
    {
      key: 'yyfhze',
      value: '盈余返还总额'
    },
    {
      key: 'cylx',
      value: '产业类型'
    },
    {
      key: 'ydgm',
      value: '用地规模'
    },
    {
      key: 'qylx',
      value: '企业类型'
    },
    {
      key: 'hdcll',
      value: '核定总存栏'
    },
    {
      key: 'mqcl',
      value: '目前存栏(头/只)'
    },
    {
      key: 'yjncl',
      value: '预计年出栏(头/只)'
    },
    {
      key: 'cz',
      value: '产值'
    },
    {
      key: 'cbmj',
      value: '承包面积(亩)'
    },

    {
      key: 'djdbtmj',
      value: '单季补贴面积(亩)'
    },
    {
      key: 'zdbtmj',
      value: '早稻补贴面积(亩)'
    },
    {
      key: 'wdbtmj',
      value: '晚稻补贴面积(亩)'
    },
    {
      key: 'zlmj',
      value: '种粮面积(亩)'
    }
  ],
  realvalue: [],
  addressArray: [],
  withOutAddressArray: [],
  showS1: false,
  showS2: false,
  showS3: false,
  showS4: false,
  showS5: false,
  showS6: false
})
const choosenOne = computed(() => store.state.JiangShan.underModalDetailData)
const shutModAction = () => {
  store.commit('setShowUnderDetailModal', false)
}
const fetchSecond = () => {
  if (choosenOne && choosenOne.value) {
    state.info = choosenOne.value
    // || state.info[ele.key] === 0
    let hi = state.matchInfo.filter((ele) => {
      return state.info[ele.key]
    })
    hi.forEach((ele) => {
      ele.real = state.info[ele.key]
    })
    console.log('hi', hi)

    state.withOutAddressArray = hi.filter((ele) => {
      return ele.key != 'xxdz'
    })
    if (state.withOutAddressArray) {
      let track = state.withOutAddressArray.find((ele) => {
        return ele.key == 'csny'
      })
      let trackIndex = state.withOutAddressArray.findIndex((ele) => {
        return ele.key == 'csny'
      })
      if (track) {
        if (track.real == '0000-00-00') {
          state.withOutAddressArray.splice(trackIndex, 1)
        }
      }

      let track2 = hi.find((ele) => {
        return ele.key == 'csny'
      })
      let trackIndex2 = hi.findIndex((ele) => {
        return ele.key == 'csny'
      })
      if (track2) {
        if (track2.real == '0000-00-00') {
          hi.splice(trackIndex2, 1)
        }
      }
    }
    state.withOutAddressArray = state.withOutAddressArray.filter((ele) => {
      return ele.real != '0.00'
    })
    hi = hi.filter((ele) => {
      return ele.real != '0.00'
    })

    console.log('hi', hi)
    state.realvalue = hi

    state.addressArray = hi.filter((ele) => {
      return ele.key == 'xxdz'
    })
    if (state.realvalue.length) {
      state.showS6 = false
      state.showS5 = false
      state.showS4 = false
      state.showS3 = false
      state.showS2 = false
      state.showS1 = false
      let totalLength = state.realvalue.length
      if (totalLength <= 4) {
        state.titleBgNeedChange = true
        state.showS6 = true
        console.log('less than 4')
      } else if (totalLength > 4 && totalLength <= 7) {
        state.titleBgNeedChange = true
        console.log('less than 7  bigger than 4')
        state.showS5 = true
      } else if (totalLength > 7 && totalLength <= 11) {
        state.titleBgNeedChange = false
        state.showS4 = true
        console.log('less than 11  bigger than 7')
      } else if (totalLength > 11 && totalLength <= 15) {
        state.titleBgNeedChange = true
        state.showS3 = true
        console.log('less than 15  bigger than 11')
      } else if (totalLength > 15 && totalLength <= 19) {
        state.titleBgNeedChange = false
        state.showS2 = true
        console.log('less than 19  bigger than 15')
      } else if (totalLength > 19 && totalLength <= 23) {
        state.titleBgNeedChange = false
        state.showS1 = true
        console.log('less than 23  bigger than 19')
      } else {
        state.titleBgNeedChange = false
        state.showS1 = true
        console.log('bigger than 23')
      }
    }
  }
}
watch(
  () => choosenOne,
  (nval) => {
    fetchSecond()
  },
  {
    immediate: true,
    deep: true
  }
)
onMounted(() => {
  //   fetchSecond()
})
</script>
<style scoped lang="scss">
.centerText {
  text-align: center;
}
.flexCenter {
  display: flex;
  justify-content: center;
}
.commonTitle {
  font-weight: 800;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  height: 24px;
  font-size: 18px;
  font-family: MicrosoftYaHeiSemibold;
  color: #86fff1;
  line-height: 24px;
  min-width: 100px;
  max-width: 180px;
  margin-bottom: 8px;
}
.commonReal {
  height: 22px;
  font-size: 18px;
  color: #ffffff;
  line-height: 22px;
  max-width: 180px;
  min-width: 100px;
}
.common1Title {
  font-size: 18px;
  font-family: MicrosoftYaHeiSemibold;
  color: #86fff1;
  line-height: 24px;
  min-width: 100px;
  max-width: 150px;
  margin-bottom: 8px;
}
.common1Real {
  font-size: 18px;
  color: #ffffff;
  line-height: 22px;
  max-width: 150px;
  min-width: 100px;
  word-break: break-all;
}
.maxWidth280 {
  max-width: 280px;
}
.address1RealSpecialCon {
  //   height: 50px;
  //   padding-left: 10px;
  //   padding-right: 10px;
  //   word-break: break-all;
  //   box-sizing: border-box;
  //   max-width: 310px;
}
.addressSpecialCon {
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  word-break: break-all;
  box-sizing: border-box;
}
.addressRealSpecialCon {
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  word-break: break-all;
  box-sizing: border-box;
  max-width: 310px;
}
.maxWidth310 {
  max-width: 310px;
}
.scene1-1 {
  background-image: url(https://img.hzanchu.com/acimg/bfd3b0f645e7fbbfd8b041c4dc36376f.png);
  left: 82px;
  top: 137px;
}
.scene1-2 {
  background-image: url(https://img.hzanchu.com/acimg/bfd3b0f645e7fbbfd8b041c4dc36376f.png);
  left: 212px;
  top: 308px;
}
.scene1-3 {
  background-image: url(https://img.hzanchu.com/acimg/bfd3b0f645e7fbbfd8b041c4dc36376f.png);
  left: 288px;
  top: 474px;
}
.scene1-4 {
  background-image: url(https://img.hzanchu.com/acimg/4cefef9dc214141e03110d155fb4ac20.png);
  right: 82px;
  top: 137px;
}
.scene1-5 {
  background-image: url(https://img.hzanchu.com/acimg/4cefef9dc214141e03110d155fb4ac20.png);
  right: 212px;
  top: 308px;
}
.scene1-6 {
  background-image: url(https://img.hzanchu.com/acimg/4cefef9dc214141e03110d155fb4ac20.png);
  right: 288px;
  top: 474px;
}
.scene1Common {
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 311px;
  height: 185px;
  padding-top: 21px;
  padding-bottom: 21px;
  box-sizing: border-box;
}
.scene2Common {
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 311px;
  height: 185px;
  padding-top: 21px;
  padding-bottom: 21px;
  box-sizing: border-box;
}

.scene2-1 {
  background-image: url(https://img.hzanchu.com/acimg/bfd3b0f645e7fbbfd8b041c4dc36376f.png);
  left: 87px;
  top: 142px;
}
.scene2-2 {
  background-image: url(https://img.hzanchu.com/acimg/bfd3b0f645e7fbbfd8b041c4dc36376f.png);
  left: 212px;
  top: 308px;
}
.scene2-3 {
  background-image: url(https://img.hzanchu.com/acimg/d5f82735f91c4a5e12df37421133752a.png);
  left: 459px;
  top: 469px;
}
.scene2-4 {
  background-image: url(https://img.hzanchu.com/acimg/4cefef9dc214141e03110d155fb4ac20.png);
  right: 212px;
  top: 308px;
}
.scene2-5 {
  background-image: url(https://img.hzanchu.com/acimg/4cefef9dc214141e03110d155fb4ac20.png);
  right: 87px;
  top: 142px;
}

.scene3Common {
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 311px;
  height: 185px;
  padding-top: 21px;
  padding-bottom: 21px;
  box-sizing: border-box;
}
.scene3-1 {
  background-image: url(https://img.hzanchu.com/acimg/bfd3b0f645e7fbbfd8b041c4dc36376f.png);
  left: 85px;
  top: 142px;
}
.scene3-2 {
  background-image: url(https://img.hzanchu.com/acimg/bfd3b0f645e7fbbfd8b041c4dc36376f.png);
  left: 212px;
  top: 442px;
}
.scene3-3 {
  background-image: url(https://img.hzanchu.com/acimg/4cefef9dc214141e03110d155fb4ac20.png);
  right: 85px;
  top: 142px;
}
.scene3-4 {
  background-image: url(https://img.hzanchu.com/acimg/4cefef9dc214141e03110d155fb4ac20.png);
  right: 212px;
  top: 442px;
}
.scene4Common {
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 282px;
  height: 150px;
  box-sizing: border-box;
}
.scene4-1 {
  background-image: url(https://img.hzanchu.com/acimg/dab06bf598a2a08824e26ab9059f11ed.png);
  left: 111px;
  top: 183px;
}
.scene4-2 {
  background-image: url(https://img.hzanchu.com/acimg/dab06bf598a2a08824e26ab9059f11ed.png);
  left: 242px;
  top: 350px;
}
.scene4-3 {
  background-image: url(https://img.hzanchu.com/acimg/dab06bf598a2a08824e26ab9059f11ed.png);
  left: 317px;
  top: 512px;
}
.scene4-4 {
  background-image: url(https://img.hzanchu.com/acimg/b98ba8e5ccc1c6d418fc4c2e6e20ecda.png);
  right: 317px;
  top: 512px;
}
.scene4-5 {
  background-image: url(https://img.hzanchu.com/acimg/b98ba8e5ccc1c6d418fc4c2e6e20ecda.png);
  right: 242px;
  top: 350px;
}
.scene4-6 {
  background-image: url(https://img.hzanchu.com/acimg/b98ba8e5ccc1c6d418fc4c2e6e20ecda.png);
  right: 111px;
  top: 183px;
}
.scene5Common {
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 282px;
  height: 150px;
  box-sizing: border-box;
}

.scene5-1 {
  background-image: url(https://img.hzanchu.com/acimg/dab06bf598a2a08824e26ab9059f11ed.png);
  left: 116px;
  top: 188px;
}
.scene5-2 {
  background-image: url(https://img.hzanchu.com/acimg/dab06bf598a2a08824e26ab9059f11ed.png);
  left: 242px;
  top: 453px;
}
.scene5-3 {
  background-image: url(https://img.hzanchu.com/acimg/b98ba8e5ccc1c6d418fc4c2e6e20ecda.png);
  right: 242px;
  top: 453px;
}
.scene5-4 {
  background-image: url(https://img.hzanchu.com/acimg/b98ba8e5ccc1c6d418fc4c2e6e20ecda.png);
  right: 116px;
  top: 188px;
}
.scene6Common {
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 282px;
  height: 150px;
  box-sizing: border-box;
}
.scene6-1 {
  background-image: url(https://img.hzanchu.com/acimg/dab06bf598a2a08824e26ab9059f11ed.png);
  left: 116px;
  top: 188px;
}
.scene6-2 {
  background-image: url(https://img.hzanchu.com/acimg/dab06bf598a2a08824e26ab9059f11ed.png);
  left: 242px;
  top: 453px;
}
.scene6-3 {
  background-image: url(https://img.hzanchu.com/acimg/b98ba8e5ccc1c6d418fc4c2e6e20ecda.png);
  right: 242px;
  top: 453px;
}
.scene6-4 {
  background-image: url(https://img.hzanchu.com/acimg/b98ba8e5ccc1c6d418fc4c2e6e20ecda.png);
  right: 116px;
  top: 188px;
}

::-webkit-scrollbar {
  display: none;
}
@keyframes recycle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.understandDetailModalCon {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto !important;
  width: 1228px;
  height: 776px;
  z-index: 99999;
  background-image: url(https://img.hzanchu.com/acimg/b4b737030ed25eb4a5c540a3be6d3570.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding-top: 13px;
  box-sizing: border-box;
}
.shutModal {
  position: absolute;
  right: 3px;
  top: 0;
  background-image: url(https://img.hzanchu.com/acimg/0d65b20a49e068a94293f42e736259a4.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.titleBg {
  width: 308px;
  height: 71px;
  position: absolute;
  left: 460px;
  top: 220px;
  background-image: url(https://img.hzanchu.com/acimg/8923fb58fbb54293c49a40173705e826.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .titleBText {
    width: 250px;
    height: auto;
    text-align: center;
    font-size: 24px;
    font-family: PangMenZhengDao-3, PangMenZhengDao;
    color: #fff;
    letter-spacing: 1px;
    text-shadow: 0px 2px 8px rgba(21, 56, 107, 0.7);
  }
}
.titleBgFix {
  top: 320px !important;
}
.title {
  text-align: center;
  margin: 0 auto;
  width: 120px;
  height: 26px;
  font-size: 26px;
  font-family: PangMenZhengDao;
  color: #ffffff;
  line-height: 26px;
  letter-spacing: 3px;
}
</style>
<style lang="scss"></style>
