<template>
  <div id="new_sale_commission">
    <c-title :hide="false"
             :text="WXtitle"></c-title>
    <div id="content">
      <div class="info_box">
        <div class="text">
          <ul>
            <li>{{WXtitle}}比例：{{commission.commission_rate}}%</li>
          </ul>
        </div>
        <div class="info">
          <ul>
            <li>{{commission.today}}</li>
            <li>今日</li>
          </ul>
          <ul>
            <li>{{commission.yesterday}}</li>
            <li>昨日</li>
          </ul>
          <ul>
            <li>{{commission.this_week}}</li>
            <li>本周</li>
          </ul>
          <ul>
            <li>{{commission.this_month}}</li>
            <li>本月累计分红</li>
          </ul>
        </div>
        <div class="img">
          <img src="../../assets/images/sale_img.png">
        </div>
      </div>
      <div class="sale_box">
        <mt-navbar v-model="activeName">
          <mt-tab-item id="-1"
                       @click.native="getTab">全部</mt-tab-item>
          <mt-tab-item id="1"
                       @click.native="getTab">已结算</mt-tab-item>
          <mt-tab-item id="0"
                       @click.native="getTab">未结算</mt-tab-item>
        </mt-navbar>
        <!--<el-tabs v-model="activeName" @tab-click="getTab">-->
        <mt-tab-container v-model="activeName">
          <!--<el-tab-pane label="全部" name="-1">-->
          <mt-tab-container-item id="-1">
            <div class="list_box"
                 v-if="activeName === '-1'">
              <div class="box"
                   v-for="(list,i) in commissionList"
                   :key='i'>
                <h1>{{list.create_month}}</h1>
                <div class="order"
                     v-for="(item,i) in list.has_many_sell"
                     :key='i'>
                  <h2>销售ID:{{item.id}}</h2>
                  <ul>
                    <li>
                      <span>订单号：{{item.order_sn}}</span>
                      <span>+{{item.royalties}}</span>
                    </li>
                    <li>
                      <span>{{item.created_at}}</span>
                      <span>{{item.status}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
          <!--</el-tab-pane>-->
          <mt-tab-container-item id="1">
            <!--<el-tab-pane label="已结算" name="1">-->
            <div class="list_box"
                 v-if="activeName === '1'">
              <div class="box"
                   v-for="(list,i) in commissionList"
                   :key='i'>
                <h1>{{list.create_month}}</h1>
                <div class="order"
                     v-for="(item,i) in list.has_many_sell"
                     :key='i'>
                  <h2>销售ID:{{item.id}}</h2>
                  <ul>
                    <li>
                      <span>订单号：{{item.order_sn}}</span>
                      <span>+{{item.royalties}}</span>
                    </li>
                    <li>
                      <span>{{item.created_at}}</span>
                      <span>{{item.status}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--</el-tab-pane>-->
          </mt-tab-container-item>
          <mt-tab-container-item id="0">
            <!--<el-tab-pane label="未结算" name="0">-->
            <div class="list_box"
                 v-if="activeName === '0'">
              <div class="box"
                   v-for="(list,i) in commissionList"
                   :key='i'>
                <h1>{{list.create_month}}</h1>
                <div class="order"
                     v-for="(item,i) in list.has_many_sell"
                     :key='i'>
                  <h2>销售ID:{{item.id}}</h2>
                  <ul>
                    <li>
                      <span>订单号：{{item.order_sn}}</span>
                      <span>+{{item.royalties}}</span>
                    </li>
                    <li>
                      <span>{{item.created_at}}</span>
                      <span>{{item.status}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--</el-tab-pane>-->
          </mt-tab-container-item>
        </mt-tab-container>
        <!--</el-tabs>-->
      </div>
    </div>
  </div>
</template>

<script>
import new_sale_commission_controller from "./new_sale_commission_controller";

export default new_sale_commission_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#new_sale_commission {
  padding-top: 40px;
  #content {
    .info_box {
      .text {
        background-color: #f15353;
        padding: 0.625rem 0.875rem;
        ul {
          li {
            color: #fff;
            line-height: 2.25rem;
            font-size: 16px;
            text-align: left;
          }
        }
      }
      .info {
        background-color: #fff;
        padding: 0.75rem 0;
        display: flex;
        ul:first-child,
        ul:nth-child(2),
        ul:nth-child(3) {
          width: 5.125rem;
          li {
            line-height: 1.875rem;
          }
          li:first-child {
            font-size: 20px;
            color: #ffa800;
          }
          li:last-child {
            font-size: 13px;
            font-weight: bold;
          }
        }
        ul:last-child {
          width: 8.0625rem;
          li {
            line-height: 1.875rem;
          }
          li:first-child {
            font-size: 20px;
            color: #ffa800;
          }
          li:last-child {
            font-size: 13px;
            font-weight: bold;
          }
        }
      }
      .img {
        position: absolute;
        bottom: 0.625rem;
        right: 7.625rem;
        height: 3.75rem;
        img {
          height: 100%;
        }
      }
      position: relative;
    }
    .sale_box {
      margin-top: 0.625rem;
      .list_box {
        .box {
          h1 {
            font-size: 16px;
            line-height: 2.5rem;
            padding: 0 0.875rem;
            text-align: left;
            background-color: #fafafa;
          }
          .order {
            margin-bottom: 0.375rem;
            background-color: #fff;
            h2 {
              margin: 0 0.875rem;
              line-height: 2.25rem;
              font-size: 15px;
              text-align: left;
              border-bottom: solid 0.0625rem #ebebeb;
            }
            ul {
              padding: 0.625rem 0.875rem;
              li {
                line-height: 1.5rem;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
              }
              li:last-child {
                span:first-child {
                  color: #8c8c8c;
                  font-size: 13px;
                }
                span:last-child {
                  color: #f15353;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>