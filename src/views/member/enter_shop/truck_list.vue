<template>
    <div id="truck_list">
        <c-title :hide="false" text='虚拟卡密'></c-title>
        <div id="content">
            <!-- <div v-infinite-scroll="getTuck" infinite-scroll-disabled="loading" infinite-scroll-distance="1">
                <ul class="look_number" v-for="(item,index) in value_list" :key='index'>
                <li>我的密卡</li>
                <li class="number">{{truck_list[index].value}}</li>
            </ul>
            </div> -->
            <ul class="order_info">
                <li>
                    <span>订单编号：</span>
                    <span>{{order_list.order_sn}}</span>
                </li>
                <li>
                    <span>交易状态：</span>
                    <span>{{order_list.status_name}}</span>
                </li>
            </ul>
            <div class="my_truck">
                <h1>我的密卡</h1>
                <div class="list">
                    <ul class="list_box" v-for="(item,index) in value_list" :key='index'>
                        <li>
                            <input type="hidden" v-model="truck_list[index].value">{{truck_list[index].value}}
                            <button type="button" v-clipboard:copy="truck_list[index].value" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <ul class="pay">
                <li>实付款（含运费）：<span><small>¥</small>{{order_list.price}}</span></li>
            </ul> -->
        </div>     
    </div>
</template>

<script>
import truck_list_controller from "./truck_list_controller";
export default truck_list_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#truck_list {
  padding-top: 40px;
  #content {
    // .look_number{
    //     margin: 0 0.875rem;
    //     padding: 1.25rem 0;
    //     font-size:16px;
    //     border-bottom: solid 0.0625rem #ebebeb;
    //     li{
    //         text-align: center;
    //         line-height: 1.875rem;
    //     }
    //     .number{
    //         font-size: 26px;
    //         font-weight: bold;
    //         line-height: 2.75rem;
    //     }
    // }
    .order_info {
        background: #fff;
      padding: 0.625rem 0.875rem;
      li {
        display: flex;
        justify-content: space-between;
        line-height: 1.875rem;
        font-size: 14px;
        span:first-child {
          color: #8c8c8c;
        }
      }
    }
    .my_truck {
      background: #fff;
      margin-top: 0.625rem;
      padding: 0 0.875rem;
      h1 {
        line-height: 2.8125rem;
        text-align: center;
        font-size: 18px;
        border-bottom: solid 0.0625rem #ebebeb;
      }
      .list {
        padding: 0.625rem 0;
        .list_box {
          li {
            display: flex;
            justify-content: space-between;
            line-height: 3.125rem;
            align-items: center;
            font-size: 18px;
            button {
            width: 3.75rem;
            height: 1.625rem;
            line-height:1.625rem;
            border-radius: 1rem;
              background: none;
              border: solid 0.0625rem #ccc;
              font-size: 13px;
              color:#666;
            }
          }
        }
      }
    }
    // .pay{
    //     border-top:solid 0.0625rem #ebebeb;
    //     li{
    //         padding: 0 0.875rem;
    //         text-align: right;
    //         line-height: 2.5rem;
    //         font-size:16px;
    //         span{
    //             color:#f15353;
    //             font-size:20px;
    //         }
    //     }
    // }
  }
}
</style>
