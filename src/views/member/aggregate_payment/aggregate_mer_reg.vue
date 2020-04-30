<template>
  <div id="aggregate">
    <c-title :hide="false" text="个体工商户注册"></c-title>
    <div class="agg_content">
      <div class="agg_per_inf">
        <div class="title">个人信息</div>
        <div class="content">
          <ul>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >商户全称：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="merchant"
                    placeholder="请填写与营业执照或资质证一致的名称"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >商户简称：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="merAbbre"
                    placeholder="收银台上显示的收款方名称"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >营业执号：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="businessNumber"
                    placeholder="请填写对应的证件类型的证件编号"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >法人名称：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="judicialPerson"
                    placeholder="请按照证件上的真实姓名准确填写"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >法人身份证号：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="personNumber"
                    placeholder="请按照证件上的真实号码准确填写"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >法人手机号：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="mobileNumber"
                    placeholder="为方便联系请认真填写真实信息"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >法人邮箱：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="corporateMailbox"
                    placeholder="请填写真实邮箱地址信息"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >商户分类：</span
                  >
                  <span slot="right" @click="comtenshowbtn">{{
                    comtentext
                  }}</span>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >所在城市：</span
                  >
                  <span slot="right" @click="cityshowbtn">{{ citytext }}</span>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >详细地址：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="detaAddress"
                    placeholder="街道楼牌号等"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
          </ul>
        </div>
      </div>
      <div class="agg_ope_acc">
        <div class="title">开户信息</div>
        <div class="content">
          <ul>
            <li>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >结算银行卡号：</span
                  >
                  <yd-input
                    slot="right"
                    v-model="cardNumber"
                    placeholder="请填写结算银行账号或银行卡号"
                  ></yd-input>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >开户行：</span
                  >
                  <span slot="right" @click="bankDepositBtn">{{
                    bankDepositText
                  }}</span>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >开户行省份：</span
                  >
                  <span slot="right" @click="bankprovinceBtn">{{
                    bankprovinceText
                  }}</span>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >开户行城市：</span
                  >
                  <span slot="right" @click="bankCityBtn">{{
                    bankCityText
                  }}</span>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <yd-cell-group>
                <yd-cell-item arrow>
                  <span slot="left"
                    ><i class="xin_icon iconfont icon-info-must"></i
                    >开户支行：</span
                  >
                  <span slot="right" @click="subbranchBtn">{{
                    subbranchText
                  }}</span>
                </yd-cell-item>
              </yd-cell-group>
            </li>
            <li>
              <div class="agg_aud_vid">
                <div class="vid_title">
                  <i class="xin_icon iconfont icon-info-must"></i
                  >资质影印件信息：
                </div>
                <div class="vid_content">
                  <div class="left">
                    <div class="add_photo">
                      <van-uploader :after-read="onfrontRead">
                        <img
                          :style="
                            imageUrl ? 'display: block;' : 'display: none;'
                          "
                          style="width: 100%;height: 100%;"
                          :src="imageUrl"
                        />
                      </van-uploader>
                    </div>
                    <h3>上传法人身份证正面</h3>
                  </div>
                  <div class="right">
                    <div class="add_photo">
                      <van-uploader :after-read="reverseRead">
                        <img
                          :style="
                            imageUrl_1 ? 'display: block;' : 'display: none;'
                          "
                          style="width: 100%;height: 100%;"
                          :src="imageUrl_1"
                        />
                      </van-uploader>
                    </div>
                    <h3>上传法人身份证反面</h3>
                  </div>
                </div>
                <div class="vid_content">
                  <div class="left">
                    <div class="add_photo">
                      <van-uploader :after-read="creditCardRead">
                        <img
                          :style="
                            imageUrl_2 ? 'display: block;' : 'display: none;'
                          "
                          style="width: 100%;height: 100%;"
                          :src="imageUrl_2"
                        />
                      </van-uploader>
                    </div>
                    <h3>上传结算银行卡</h3>
                  </div>
                  <div class="right">
                    <div class="add_photo">
                      <van-uploader :after-read="handstatusRead">
                        <img
                          :style="
                            imageUrl_3 ? 'display: block;' : 'display: none;'
                          "
                          style="width: 100%;height: 100%;"
                          :src="imageUrl_3"
                        />
                      </van-uploader>
                    </div>
                    <h3>上传营业执照</h3>
                  </div>
                </div>
                <div class="vid_message">
                  需要上传包括：”法人身份证正面“、”法人身份证反面“、“结算银行卡“、“营业执照”。
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div @click="individual" class="sub_btn">
      <yd-button bgcolor="#389ef2" color="#fff" type="primary">提交</yd-button>
    </div>
    <van-popup v-model="comtenshow" position="bottom" :overlay="true">
      <van-picker
        :show-toolbar="true"
        @change="comtlistbtn"
        :columns="comtcolumns"
        :loading="comtLoad"
        @confirm="comtconbtn"
        @cancel="comtcancelbtn"
      />
    </van-popup>
    <van-popup v-model="cityshow" position="bottom" :overlay="true">
      <van-picker
        :show-toolbar="true"
        @change="citylistbtn"
        :columns="citycolumns"
        :loading="cityLoad"
        @confirm="cityconbtn"
        @cancel="citycancelbtn"
      />
    </van-popup>
    <van-popup v-model="bankDepositshow" position="bottom" :overlay="true">
      <van-picker
        :show-toolbar="true"
        @change="banklistbtn"
        :columns="bankDepcolumns"
        :loading="bankDeploading"
        @confirm="bankconbtn"
        @cancel="bankcancelbtn"
      />
    </van-popup>
    <van-popup v-model="bankprovinceShow" position="bottom" :overlay="true">
      <van-picker
        :show-toolbar="true"
        @change="bankprovincelistbtn"
        :columns="bankprovcolumns"
        :loading="bankprovloading"
        @confirm="bankprovinceconbtn"
        @cancel="bankprovincecancelbtn"
      />
    </van-popup>
    <van-popup v-model="bankCityShow" position="bottom" :overlay="true">
      <van-picker
        :show-toolbar="true"
        @change="bankCitylistbtn"
        :columns="bankcitycolumns"
        :loading="bankcityloading"
        @confirm="bankCitybtn"
        @cancel="bankCitycancelbtn"
      />
    </van-popup>
    <van-popup v-model="subbranchShow" position="bottom" :overlay="true">
      <van-picker
        :show-toolbar="true"
        @change="subbranchlistbtn"
        :columns="subbranchcolumns"
        :loading="subbranchloading"
        @confirm="subbranchbtn"
        @cancel="subbranchcancelbtn"
      />
    </van-popup>
  </div>
</template>

<script>
import aggregate_mer_regcontroller from "./aggregate_mer_regcontroller";
export default aggregate_mer_regcontroller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#aggregate {
  .agg_content {
    background: #fff;
    padding-top: 40px;
    .agg_per_inf {
      .title {
        background: #f5f5f5;
        height: 2.25rem;
        line-height: 2.25rem;
        text-align: left;
        padding-left: 0.8rem;
        font-weight: bold;
        color: #333333;
        font-size: 16px;
      }
      .content ul li .yd-cell-box {
        // border-bottom: 1px solid #ebebeb;
        margin-bottom: 0;
        .yd-cell-item {
          padding-left: 1.5rem;
          .yd-cell-left {
            span {
              position: relative;
              .xin_icon {
                color: #f15353;
                margin-left: -1rem;
                font-size: 0.75rem;
              }
            }
          }
        }
      }
      .content ul li:nth-last-of-type(1) .yd-cell-box {
        border: none;
      }
    }
    .agg_ope_acc {
      .title {
        background: #f5f5f5;
        height: 2.25rem;
        line-height: 2.25rem;
        text-align: left;
        padding-left: 0.8rem;
        font-weight: bold;
        color: #333333;
        font-size: 16px;
      }
      .content ul li {
        .yd-cell-box {
          // border-bottom: 1px solid #ebebeb;
          margin-bottom: 0;
          .yd-cell-item {
            padding-left: 1.5rem;
            .yd-cell-left {
              span {
                position: relative;
                .xin_icon {
                  color: #f15353;
                  margin-left: -1rem;
                  font-size: 0.75rem;
                }
              }
            }
          }
        }
        .agg_aud_vid {
          border-bottom: 0.0625rem solid #ebebeb;
          .vid_title {
            height: 3.12rem;
            line-height: 3.12rem;
            text-align: left;
            padding-left: 1rem;
            .xin_icon {
              color: #f15353;
              margin-left: -0.5rem;
              font-size: 0.75rem;
            }
          }
          .vid_content {
            display: flex;
            justify-content: space-around;
            .left {
              .add_photo {
                width: 8.8rem;
                height: 5rem;
                border: 0.0625rem solid #319ff8;
                border-radius: 0.3125rem;
                background: url("../../../assets/images/agg_add_icon.png")
                  no-repeat center center;
                background-size: 1.8rem 1.8rem;
                .van-uploader {
                  width: 100%;
                  height: 5rem;
                }
              }
              h3 {
                height: 1.56rem;
                line-height: 1.56rem;
                font-size: 12px;
              }
            }
            .right {
              .add_photo {
                width: 8.8rem;
                height: 5rem;
                border: 0.0625rem solid #319ff8;
                border-radius: 0.3125rem;
                background: url("../../../assets/images/agg_add_icon.png")
                  no-repeat center center;
                background-size: 1.8rem 1.8rem;
                .van-uploader {
                  width: 100%;
                  height: 5rem;
                }
              }
              h3 {
                height: 1.56rem;
                line-height: 1.56rem;
                font-size: 12px;
              }
            }
          }
          .vid_message {
            width: 20rem;
            margin: 0.625rem auto;
            padding: 0.625rem 0.25rem;
            font-size: 12px;
            line-height: 1.25rem;
            color: #8c8c8c;
            background: #fafafa;
            border-radius: 0.25rem;
          }
        }
      }
    }
  }
  .sub_btn {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    .yd-btn {
      width: 20.625rem;
      height: 2.625rem;
      border-radius: 0.375rem;
      font-size: 16px;
    }
  }
}
</style>
