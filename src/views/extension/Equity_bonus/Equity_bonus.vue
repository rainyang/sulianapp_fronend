<template >
  <div id="Equity_bonus">
    <c-title :hide="false"
             :text="bonus.plugin_name"></c-title>
    <div class="content">
      <div class="background">
        <div class="user">
          <div class="user-head">
            <img :src="bonus.avatar">
          </div>
          <div class="user-name">{{bonus.member_name}}</div>
        </div>
      </div>
      <div class="absolute-block">
        <div class="left">
          <span class="first"><b>{{bonus.integral}}</b></span>
          <span class="second">权益</span>
        </div>
        <div class="line"></div>
        <div class="right">
          <span class="first"><b>{{bonus.total_dividend}}</b></span>
          <span class="second">奖励总额(元)</span>
        </div>
      </div>
      <div class="list">
        <div id="tabs">
          <div class="tab-first tab"
               :id='0'
               @click="onClick(0)"
               :class="[current==0 ? 'bgColor' : '']">
            <span>管理奖</span>
          </div>
          <div class="tab-second tab"
               @click="onClick(1)"
               :id='1'
               :class="[current==1 ? 'bgColor' : '']">
            <span>关爱奖</span>
          </div>
        </div>
        <mt-loadmore :top-method="loadTop"
                     ref="award_loadmore"
                     id="olis">
          <div class="award-list"
               :class="[dividend.length>0 ? 'bgBai' : '']"
               v-show="current==0">
            <ul>
              <li class="list-item"
                  v-for="(item,index,key) in dividend" :key='index'>
                <div class="block"
                     @click="change(item)">
                  <div class="left"><span>订单号：{{item.has_one_order.order_sn}}</span>
                    <div class="date">{{item.created_at}}</div>
                  </div>
                  <div class="right">
                    <span>+{{item.dividend_amount}}</span>
                  </div>
                </div>
                <div class="hide"
                     v-show="item.status">
                  <ul>
                    <li><span class="first">下级会员</span><span><b>{{item.has_one_child.nickname}}</b></span></li>
                    <li><span class="first">结算金额</span><span><b>￥{{item.amount}}</b></span></li>
                    <li><span class="first">奖励比例</span><span><b>{{item.dividend_rate}}%</b></span></li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="blank"
                 v-if="dividend.length<=0">
              <img src="../../../assets/images/blank.png">
              <span>还没有记录哦</span>
            </div>
          </div>
        </mt-loadmore>
        <mt-loadmore :top-method="careTop"
                     ref="care_loadmore"
                     id="olis">
          <div class="care-list"
               :class="[care.length>0 ? 'bgBai' : '']"
               v-show="current==1">
            <ul>
              <li class="list-item"
                  v-for="(list,index,key) in care" :key='index'>
                <div class="block"
                     @click="changeCare(list)">
                  <div class="left"><span>订单号：{{list.has_one_order.order_sn}}</span>
                    <div class="date">{{list.created_at}}</div>
                  </div>
                  <div class="right">
                    <span>+{{list.dividend_amount}}</span>
                  </div>
                </div>
                <div class="hide"
                     v-show="list.status">
                  <ul>
                    <li><span class="first">上级会员</span><span><b>{{list.has_one_parent.nickname}}</b></span></li>
                    <li><span class="first">结算金额</span><span><b>￥{{list.amount}}</b></span></li>
                    <li><span class="first">个人权益</span><span><b>{{list.integral}}</b></span></li>
                    <li><span class="first">总权益</span><span><b>{{list.total_integral}}</b></span></li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="blank"
                 v-if="care.length<=0">
              <img src="../../../assets/images/blank.png">
              <span>还没有记录哦</span>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import Equity_bonuscontroller from "./Equity_bonuscontroller";
export default Equity_bonuscontroller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#Equity_bonus {
  padding-top: 40px;
  .content {
    .background {
      width: 100%;
      height: 10rem;
      background-image: linear-gradient(90deg, #ff7459 0%, #ff8a73 100%);
      display: flex;
      padding-top: 1rem;
      justify-content: center;
      .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        .user-head {
          height: 4rem;
          width: 4rem;
          background: #fff;
          border-radius: 50%;
          border: 0.125rem solid #fff;
          box-sizing: border-box;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .user-head img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .user-name {
          font-size: 16px;
          color: #fff;
        }
      }
    }
    .absolute-block {
      width: 22rem;
      height: 5rem;
      background-color: #ffffff;
      border-radius: 0.5rem;
      margin: 0 auto;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      .left {
        width: 50%;
        display: flex;
        flex-direction: column;
        .first {
          color: #000000;
          font-size: 16px;
        }
        .second {
          font-size: 14px;
          color: #ccc;
        }
      }
      .right {
        width: 50%;
        display: flex;
        flex-direction: column;
        .first {
          color: #000000;
          font-size: 16px;
        }
        .second {
          font-size: 14px;
          color: #ccc;
        }
      }
      .line {
        height: 3rem;
        width: 1px;
        background-color: #ffd5cd;
      }
    }
    .list {
      width: 22rem;
      margin: 0 auto;
      border-radius: 0.5rem;
      margin-top: -1rem;
      margin-bottom: 1rem;
      #tabs {
        width: 100%;
        display: flex;
        .tab {
          height: 2rem;
          line-height: 2rem;
          background-color: rgba(244, 244, 244, 0.7);
          color: #aaaaaa;
          font-size: 16px;
          width: 50%;
          position: relative;
        }
        .tab:first-child {
          border-top-left-radius: 0.5rem;
        }
        .tab:last-child {
          border-top-right-radius: 0.5rem;
        }
        .tab-first::after {
          content: "";
          position: absolute;
          right: 0;
          width: 0;
          height: 2rem;
          border-bottom: 2rem solid #fff;
          border-left: 0.6rem solid transparent;
        }
        .tab-second::before {
          content: "";
          position: absolute;
          left: 0;
          width: 0;
          height: 2rem;
          border-bottom: 2rem solid #fff;
          border-right: 0.6rem solid transparent;
        }
      }
      .award-list {
        padding: 1rem;
        text-align: left;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        ul {
          .list-item {
            display: flex;
            flex-wrap: wrap;
            border-bottom: solid 1px #f3f3f3;
            padding-bottom: 1rem;
            padding-top: 1rem;
            .list-item:first-child {
              padding-top: 0;
            }
            .block {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .left {
              .date {
                color: #c1c1c1;
                font-size: 12px;
                margin-top: 0.2rem;
              }
            }
            .right {
              font-size: 18px;
              color: #ff6000;
            }
            .hide {
              display: flex;
              justify-content: center;
              width: 100%;
              padding-top: 1rem;
              ul {
                display: flex;
                width: 100%;
                li {
                  display: flex;
                  width: 33.3%;
                  justify-content: center;
                  flex-direction: column;
                  text-align: center;
                  border-right: solid 1px #f6d331;
                  .first {
                    margin-bottom: 0.5rem;
                  }
                }
                li:last-child {
                  border-right: none;
                }
              }
            }
          }
        }
      }
      .care-list {
        padding: 1rem;
        text-align: left;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        ul {
          .list-item {
            display: flex;
            flex-wrap: wrap;
            border-bottom: solid 1px #f3f3f3;
            padding-bottom: 1rem;
            padding-top: 1rem;
            .list-item:first-child {
              padding-top: 0;
            }
            .block {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .left {
              .date {
                color: #c1c1c1;
                font-size: 12px;
                margin-top: 0.2rem;
              }
            }
            .right {
              font-size: 18px;
              color: #ff6000;
            }
            .hide {
              display: flex;
              justify-content: center;
              width: 100%;
              padding-top: 1rem;
              ul {
                display: flex;
                width: 100%;
                li {
                  display: flex;
                  width: 25%;
                  justify-content: center;
                  flex-direction: column;
                  text-align: center;
                  border-right: solid 1px #f6d331;
                  .first {
                    margin-bottom: 0.5rem;
                  }
                }
                li:last-child {
                  border-right: none;
                }
              }
            }
          }
        }
      }
    }
    .blank {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 6rem;
        height: 6rem;
      }
      span {
        margin-top: 15px;
        color: #ccc;
        font-size: 14px;
      }
    }
  }
  .bgColor {
    background-color: #fff !important;
    color: #ff7459 !important;
  }
  .bgBai {
    background-color: #fff;
  }
}
</style>
