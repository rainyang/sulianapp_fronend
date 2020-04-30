<template>
  <div>
    <c-title :hide="false" :text="'购车进度'"> </c-title>
    <div style="height: 40px"></div>

    <div class="main-content">
      <!--<div class="head">-->
      <!--<img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/728da9773912b31b7096bff48418367adbb4e171.jpg" alt="">-->
      <!--<div class="titles">-->
      <!--<p class="title">雷克萨斯LX 2019款 570 豪华版</p>-->
      <!--<div class="gray-text">-->
      <!--<span>价格:1290000.00</span>-->
      <!--<span>规格：豪华版</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->

      <div class="contract-operate_recodeMain">
        <ul class="contract-operate_recode_date">
          <li :class="{ red: isTime == 6 }">
            <span class="first">{{ progressData.complete_at }}</span>
            <i class="second"></i>
            <span class="third"
              ><em>已交车</em>
              <template v-if="!fun.isTextEmpty(progressData.jiao_che_info)">
                <br />
                <div class="info little">
                  服务人员:{{ progressData.jiao_che_info.name }}[{{
                    progressData.jiao_che_info.phone
                  }}]<br /><em
                    class="info_btn "
                    @click="showVoucher(progressData.jiao_che_info, 6)"
                    >查看详情</em
                  >
                </div>
              </template>
            </span>
          </li>
          <li :class="{ over: isTime > 5, red: isTime == 5 }">
            <span class="first">{{ progressData.receive_at }}</span>
            <i class="second"></i>
            <!-- <span class="third"
                  v-if="progressData.service_personnel && progressData.service_personnel.actual_name"><em>上牌</em><br /><em class="little">服务人员{{progressData.service_personnel.actual_name}} [{{progressData.service_personnel.phone}}]将为你上牌。</em></span> -->
            <span class="third"
              ><em>上牌</em><br />
              <template v-if="!fun.isTextEmpty(progressData.shang_pai_info)">
                <div class="little">
                  服务人员{{ progressData.shang_pai_info.name }}[{{
                    progressData.shang_pai_info.phone
                  }}]将为您上牌！<br /><em
                    class="info_btn "
                    @click="showVoucher(progressData.shang_pai_info, 5)"
                    >查看详情</em
                  >
                </div>
              </template>
            </span>
          </li>
          <li :class="{ over: isTime > 4, red: isTime == 4 }">
            <span class="first">{{ progressData.take_car_at }}</span>
            <i class="second"></i>
            <span class="third">安排提车</span>
          </li>
          <li :class="{ over: isTime > 3, red: isTime == 3 }">
            <span class="first">{{ progressData.insurance_at }}</span>
            <i class="second"></i>
            <span class="third"
              ><em>买保险</em><br />
              <template v-if="!fun.isTextEmpty(progressData.insurance_info)">
                <div class="info little">
                  服务人员:{{ progressData.insurance_info.name }}[{{
                    progressData.insurance_info.phone
                  }}]<br /><em
                    class="info_btn"
                    @click="showVoucher(progressData.insurance_info, 2)"
                    >查看详情</em
                  >
                </div>
              </template>
            </span>
          </li>
          <li :class="{ over: isTime > 2, red: isTime == 2 }">
            <span class="first">{{ progressData.loan_at }}</span>
            <i class="second"></i>
            <span class="third"
              ><em>放款成功</em
              ><em class="little" @click="gotoPage" style="color:#f15353"
                >&nbsp&nbsp&nbsp查看分期记录</em
              ><br />
              <template v-if="!fun.isTextEmpty(progressData.loan_info)">
                <div class="info little">
                  服务人员:{{ progressData.loan_info.name }}[{{
                    progressData.loan_info.phone
                  }}]<br /><em
                    class="info_btn"
                    @click="showVoucher(progressData.loan_info, 3)"
                    >查看详情</em
                  >
                </div>
              </template>
            </span>
          </li>
          <li :class="{ over: isTime > 1, red: isTime == 1 }">
            <span class="first">{{ progressData.pay_at }}</span>
            <i class="second"></i>
            <span class="third">已交首付</span>
          </li>
        </ul>
      </div>
    </div>
    <van-popup v-model="isVoucher">
      <div class="voucherDiv">
        <h2>{{ Voucherinfo.text }}服务人员</h2>
        <div class="voucherDetail">
          <div class="left">姓名</div>
          <div class="right">{{ Voucherinfo.name }}</div>
          <div class="left">电话</div>
          <div class="right">{{ Voucherinfo.phone }}</div>
          <div class="left">凭证</div>
          <div class="right" v-if="!fun.isTextEmpty(Voucherinfo.images)">
            <img
              v-for="(item, i) in Voucherinfo.images"
              :src="item"
              :key="i"
              @click="showimg(i)"
              style="width: 3.75rem;height:3.75rem;object-fit: contain;margin:0 0.25rem 0.25rem 0;"
            />
          </div>
          <div class="right" v-else>
            暂无凭证
          </div>
        </div>
        <i class="iconfont icon-close11" @click="isVoucher = false"></i>
      </div>
    </van-popup>
    <van-image-preview
      v-model="show"
      :images="Voucherinfo.images"
      :start-position="imgIndex"
    >
    </van-image-preview>
  </div>
</template>

<script>
import application_progress_controller from "./application_progress_controller";

export default application_progress_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.main-content {
  background: #ffffff;
  margin: 10px;
  border-radius: 10px;
}
.head {
  margin: 0.5rem;
  display: flex;
  padding: 1rem;
  border-bottom: 0.031rem solid #f6f6f6;
  img {
    flex: 0 0 5rem;
    width: 4rem;
    height: 4rem;
  }
  .titles {
    flex: 1;
    text-align: left;
    margin-left: 1.5rem;
  }
  .title {
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .gray-text {
    display: flex;
    color: #999999;
    span {
      flex: 1;
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.contract-operate_recodeMain {
  padding-top: 2.5rem;
}
.contract-operate_recode_date {
  margin: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .little {
    position: absolute;
    font-size: 10px;
    color: #333333;
  }
  .info {
    top: 1.2rem;
  }
  .info_btn {
    top: 2.25rem;
    padding: 0.1rem 0.5rem;
    color: #f15353;
    font-size: 12px;
    border: 0.00625rem solid #f15353;
  }
  li {
    width: 100%;
    height: 5rem;
    position: relative;
    .first {
      position: absolute;
      left: 2rem;
      top: 0;
      width: 75px;
      height: 4rem;
      display: inline-block;
      line-height: 1rem;
      font-size: 14px;
      color: #999999;
      word-break: break-all;
    }
    .second {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background-color: #d8d8d8;
      border-radius: 50%;
      margin: 0 20px 0 50px;
      &:after {
        content: "";
        display: block;
        clear: both;
        width: 1px;
        height: 4.5rem;
        background-color: #d8d8d8;
        margin: 13px auto;
      }
    }
    .third {
      font-size: 14px;
      color: #999999;
      display: inline-block;
      width: 100px;
      height: 16px;
      text-align: left;
    }
  }
  li:last-child {
    .second {
      &:after {
        content: "";
        display: none;
      }
    }
  }
  .red {
    .first {
      color: #333333;
    }
    .second {
      background-color: #e31717;
      &:after {
        background-color: #e31717;
      }
    }
    .third {
      color: #e31717;
    }
  }
  .over {
    .second {
      background-color: #e31717;
      &:after {
        background-color: #e31717;
      }
    }
  }
}
.van-popup {
  border-radius: 1rem;
  .voucherDiv {
    padding: 1.25rem;
    width: 18rem;
    position: relative;
    h2 {
      padding-bottom: 0.825rem;
    }
    .voucherDetail {
      display: flex;
      flex-wrap: wrap;
      text-align: left;
      .left {
        width: 30%;
        padding-bottom: 0.625rem;
      }
      .right {
        width: 70%;
        padding-bottom: 0.625rem;
      }
    }
    i {
      font-size: 1rem;
      padding: 0.5rem;
      position: absolute;
      top: 0;
      right: 0.25rem;
    }
  }
}
</style>
