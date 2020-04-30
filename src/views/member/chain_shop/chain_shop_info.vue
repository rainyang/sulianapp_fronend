<template>
    <div id="chain_shop">
        <c-title :hide="false" text='门店信息'></c-title>
        <div id="header">
            <div class="header_user">
                <div class="img">
                    <img :src="store_info.thumb?store_info.thumb:require('../../../assets/images/bgimg.png')">
                </div>
                <ul class="name">
                    <li>{{store_info.store_name}}</li>
                </ul>
            </div>
            <div class="header_info">
                <ul>
                    <li>订单数</li>
                    <li>{{store_count.order_count}}<span>个</span></li>
                </ul>
                <ul>
                    <li>{{income_name_text}}</li>
                    <li><span>¥</span>{{store_count.amount_total}}</li>
                </ul>
            </div>
        </div>
        <div id="order_info">
            <div class="tab_box">
                <ul class="tab">
                    <li :key='index' v-for="(item,index) in tabArr" @click="toggle(index)" :class="{'active':currentIndex==index}">{{item}}</li>
                </ul>
            </div>
            <!-- 门店订单 -->
            <div class="select_box" v-if="store_order_show">
                <ul class="select_tab">
                    <li>订单编号</li>
                    <li>订单金额</li>
                    <li>订单状态</li>
                </ul>
                <div class="select_list">
                    <mt-loadmore v-if="store_goload" :top-method="storeLoadTop" :bottom-method="storeLoadBottom" :bottom-all-loaded="store_allLoaded" ref="store_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'>
                        <ul v-for="(item,i) in storeList" :key='i'>
                            <li>
                                <span>{{item.order.order_sn}}</span>
                                <span>{{item.order.create_time }}</span>
                            </li>
                            <li><span>¥</span>{{item.order.price}}</li>
                            <li>{{item.order.status_name}}</li>
                        </ul>
                    </mt-loadmore>
                </div>
            </div>
            <!-- 收银台订单 -->
            <div class="select_box" v-if="cashier_order_show">
                <ul class="select_tab">
                    <li>订单编号</li>
                    <li>订单金额</li>
                    <li>订单状态</li>
                </ul>
                <div class="select_list">
                    <mt-loadmore v-if="cashier_goload" :top-method="cashierLoadTop" :bottom-method="cashierLoadBottom" :bottom-all-loaded="cashier_allLoaded" ref="cashier_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false'>
                        <ul v-for="(item,i) in cashierList" :key='i'>
                            <li>
                                <span>{{item.order.order_sn}}</span>
                                <span>{{item.order.create_time }}</span>
                            </li>
                            <li><span>¥</span>{{item.order.price}}</li>
                            <li>{{item.order.status_name}}</li>
                        </ul>
                    </mt-loadmore>
                </div>
            </div>
        </div>
        <div>
            <!-- 音频播放 -->
            <!-- style="opacity:0;" -->
            <audio autoplay controls id="yp" style="opacity:0;">
                    <source :src="vedioSrc" type="audio/mpeg">
            </audio>
        </div>
    </div>
</template>

<script>
    import controller from './chain_shop_info_controller';
    export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #chain_shop {
        padding-top: 2.5rem;
        #header {
            background-color: #fff;
            .header_user {
                display: flex;
                padding: 1.25rem 0.625rem;
                align-items: center;
                position: relative;
                .img {
                    width: 3.5rem;
                    height: 3.5rem;
                    border: solid 0.125rem #f5f5f5;
                    border-radius: 1.75rem;
                    margin-right: 0.625rem;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                }
                .name {
                    li {
                        font-size: 18px;
                        font-weight: bold;
                    }
                } // .btn{
                //     position: absolute;
                //     right: 0.625rem;
                //     display: flex;
                //     width: 5rem;
                //     height: 1.875rem;
                //     line-height: 1.875rem;
                //     border:solid 0.0625rem #ebebeb;
                //     border-radius: 1rem;
                //     padding: 0 0.625rem;
                //     i{
                //         color:#f15353;
                //         font-size:1.375rem;
                //         margin-right: 0.375rem;
                //     }
                //     span{
                //         font-size:14px;
                //     }
                // }
            }
            .header_info {
                border-top: solid 0.0625rem #ebebeb;
                display: flex;
                padding: 0.625rem 0;
                ul {
                    width: 50%;
                    padding-left: 1.25rem;
                    li {
                        text-align: left;
                        line-height: 1.875rem;
                    }
                    li:first-child {
                        color: #8c8c8c;
                        font-size: 15px;
                    }
                    li:last-child {
                        font-size: 22px;
                        span {
                            font-size: 15px;
                        }
                    }
                }
            }
        }
        #order_info {
            margin-top: 0.625rem;
            background-color: #fff;
            .tab_box {
                width: 100%;
                padding: 10px 0;
                display: flex;
                justify-content: center;
                .tab {
                    display: flex;
                    li:first-child {
                        width: 168px;
                        height: 30px;
                        line-height: 30px;
                        border: solid 1px #f15353;
                        font-size: 15px;
                        border-radius: 6px 0 0 6px;
                    }
                    li:last-child {
                        width: 168px;
                        height: 30px;
                        line-height: 30px;
                        border: solid 1px #f15353;
                        font-size: 15px;
                        border-radius: 0 6px 6px 0;
                    }
                    .active {
                        background-color: #f15353;
                        color: #fff;
                    }
                }
            }
            .select_box {
                .select_tab {
                    display: flex;
                    border-bottom: solid 0.0625rem #ebebeb;
                    li {
                        width: 33.33%;
                        height: 2.5rem;
                        line-height: 2.5rem;
                        font-size: 16px;
                    }
                }
                .select_list {
                    padding-left: 0.875rem;
                    border-bottom: solid 0.0625rem #ebebeb;
                    ul:last-child {
                        border: none;
                    }
                    ul {
                        padding: 0.625rem 0;
                        display: flex;
                        align-items: center;
                        border-bottom: solid 0.0625rem #ebebeb;
                        li:first-child {
                            width: 33.33%;
                            text-align: left;
                            span:first-child {
                                font-size: 16px;
                            }
                            span:last-child {
                                font-size: 14px;
                                color: #8c8c8c;
                            }
                        }
                        li:nth-child(2) {
                            width: 33.33%;
                            font-size: 16px;
                            span {
                                font-size: 14px;
                            }
                        }
                        li:last-child {
                            width: 33.33%;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>
