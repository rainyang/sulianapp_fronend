<template>
    <div id="rewards_record_detail">
        <c-title :hide="false" style="z-index: 999;position: fixed;" :text="rename?(rename+'明细'):'明细'"></c-title>
        <div data-v-6f8d68ac="" style="height: 40px;"></div>
        <van-tabs v-model="active" @click="tabDataBtn">
            <van-tab title="全部">
                <div v-for=" (item,i) in alldata" :key='i'>
                    <div class="tbs">
                        <ul class="left">
                            <li class="item1">{{item.type_name}}</li>
                            <li class="item4">{{rename}}:{{item.current_amount}}</li>
                            <li class="item2">{{item.created_at}}</li>
                        </ul>
                        <div class="item3">
                            <span class="add" v-if="item.amount>0">{{item.amount}}</span>
                            <span class="reduce" v-else>{{item.amount}}</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="收入">
                <div v-for=" (item,i) in incomedata" :key='i'>
                    <div class="tbs">
                        <ul class="left">
                            <li class="item1">{{item.type_name}}</li>
                            <li class="item4">{{rename}}:{{item.current_amount}}</li>
                            <li class="item2">{{item.created_at}}</li>
                        </ul>
                        <div class="item3">
                            <span class="add" v-if="item.amount>0">{{item.amount}}</span>
                            <span class="reduce" v-else>{{item.amount}}</span>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="支出">
                <div v-for=" (item,i) in paydata" :key='i'>
                    <div class="tbs">
                        <ul class="left">
                            <li class="item1">{{item.type_name}}</li>
                            <li class="item4">{{rename}}:{{item.current_amount}}</li>
                            <li class="item2">{{item.created_at}}</li>
                        </ul>
                        <div class="item3">
                            <span class="add" v-if="item.amount>0">{{item.amount}}</span>
                            <span class="reduce" v-else>{{item.amount}}</span>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import rewards_record_detail_controller from "./rewards_record_detail_controller";
    export default rewards_record_detail_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    #rewards_record_detail {
        .tbs {
            background: #FFF;
            overflow: hidden;
            display: flex;
            align-items: center;
            padding: 0.625rem 0.75rem;
            border-bottom: 0.0625rem solid #e2e2e2;
            .left{
                flex:2;
                text-align:left;
                line-height: 1.5rem;
            }
            .item1 {
                font-size:14px;
                color: #333;
            }
            .item2 {

                color:#8c8c8c;
            }
            .item3 {
                flex: 1;
                text-align: right;
                font-size:14px;
                .add {
                    color: #259b24;
                }
                .reduce {
                    color: #f15353;
                }
            }
            .item4{
                color:#333;
            }
        }
    }
</style>