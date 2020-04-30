<template>
  <div id="rebate">
    <c-title :hide="false" text='返利记录'></c-title>
    <div style="height:40px;"></div>
    <div id="box">
      <mt-navbar v-model="activeName">
        <mt-tab-item id="-1"  @click.native="getRebate">全部</mt-tab-item>
        <mt-tab-item id="0" @click.native="getRebate">待返利</mt-tab-item>
        <mt-tab-item id="1"  @click.native="getRebate">已返利</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="activeName">
      <!--<el-tabs v-model="activeName" @tab-click="getRebate">-->
        <!--<el-tab-pane label="全部" name="-1">-->
        <mt-tab-container-item name="-1">
          <div class="order-box">
            <div v-for="(item,index) in list" :key='index'>
              <ul class="list">
                <li class="one">
                  <span class="left">{{type === 'replenish'?'铺货单号':'订单号'}} ：{{type === 'replenish'?item.has_one_distributor_order.order_sn : item.has_one_order.order_sn}}</span>
                  <span class="right">+{{item.amount}}</span>
                </li>
                <li class="two">
                  <span class="left">{{item.created_at}}</span>
                  <span class="right">{{item.status_name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </mt-tab-container-item>
        <!--</el-tab-pane>-->
        <mt-tab-container-item name="0">
        <!--<el-tab-pane label="待返利" name="0">-->
          <div class="order-box">
            <div v-for="(item,index) in list" :key='index'>
              <ul class="list">
                <li class="one">
                  <span class="left">{{type === 'replenish'?'铺货单号':'订单号'}} ：{{type === 'replenish'?item.has_one_distributor_order.order_sn : item.has_one_order.order_sn}} </span>
                  <span class="right">+{{item.amount}}</span>
                </li>
                <li class="two">
                  <span class="left">{{item.created_at}}</span>
                  <span class="right">{{item.status_name}}</span>
                </li>
              </ul>
            </div>
          </div>
        <!--</el-tab-pane>-->
        </mt-tab-container-item>
        <mt-tab-container-item name="1">
        <!--<el-tab-pane label="已返利" name="1">-->
          <div class="order-box">
            <div v-for="(item,index) in list" :key='index'>
              <ul class="list">
                <li class="one">
                  <span class="left">{{type === 'replenish'?'铺货单号':'订单号'}} ：{{type === 'replenish'?item.has_one_distributor_order.order_sn : item.has_one_order.order_sn}}</span>
                  <span class="right">+{{item.amount}}</span>
                </li>
                <li class="two">
                  <span class="left">{{item.created_at}}</span>
                  <span class="right">{{item.status_name}}</span>
                </li>
              </ul>
            </div>
          </div>
        <!--</el-tab-pane>-->
        </mt-tab-container-item>
      <!--</el-tabs>-->
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import rebate_controller from './rebate_controller';

  export default rebate_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #rebate {

    #box {
      .order-box {
        .list {
          border-bottom: solid 0.0625rem #ebebeb;
          background-color: #fff;
          padding: 0.625rem 0.875rem;
          li {
            font-size: 14px;
            line-height: 1.875rem;
            display: flex;
            justify-content: space-between;
          }
          .two {
            .left {
              color: #8c8c8c;
            }
            .right {
              color: #f15353;
            }
          }
        }
        .list:last-child {
          border: none;
        }
      }
    }
  }

</style>