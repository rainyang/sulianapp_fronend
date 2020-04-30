<template>
    <section id="line-up">
        <c-title :hide="false" :text='title' tolink="QueueRecord" totext='奖励记录'></c-title>
        <section id="nav">
            <ul>
                <!-- <li class="active">关注会员</li>
    				<li>加盟店</li> -->
                <!-- <li v-for="(item,index) in tabOption" :class="{'active':index == currentIndex}" @click="toggle(index)">{{item}}</li> -->

                <li :class="{'active':allMemberShow}" @click="tabChoose(1)">
                    <span>关注(考察)会员</span><br>
                    <span>({{m_total}})人</span>
                </li>

                 <li :class="{'active':buyMemberShow}" @click="tabChoose(2)">
                    <span>已加盟店</span><br>
                    <span>({{b_total}})人</span>
                </li>
            </ul>
        </section>
        <!-- 关注会员页面 -->
        <section id="rank-list" v-if="allMemberShow">
            <div class="box">
                <ul class="nav">
                    <li class="nav-a">ID</li>
                    <li class="nav-b">微信昵称</li>
                    <li class="nav-c">星级加盟店</li>
                    <li class="nav-d">拼团积分</li>
                    <li class="nav-e">关注时间</li>
                </ul>
                <mt-loadmore v-if="m_goload" :top-method="loadTop1" :bottom-method="loadBottom1" :bottom-all-loaded="m_allLoaded" ref="member_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
                    <ul class="list" v-for="(item,i) in allMember" :key='i'>
                        <li class="nav-a">{{item.uid}}</li>
                        <li class="nav-b">
                            <div class="img"><img :src="item.avatar?item.avatar:require('../../../assets/images/loading.jpg')" style="width:100%;height:100%;"></div>
                            <span>{{b64Decode(item.nickname)}}</span>
                        </li>
                        <li class="nav-c" v-html="item.star_count" style="word-wrap:break-word;word-break:normal;">
                            <!-- <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon> -->
                        </li>
                        <li class="nav-d">
                            <span>{{item.has_one_queue?item.has_one_queue.amount_finish:""}}</span>
                            <span>{{item.has_one_queue?item.has_one_queue.status_name:""}}</span>
                        </li>
                        <li class="nav-e">
                            <span>{{item.create_at}}</span>
                        </li>
                    </ul>
                </mt-loadmore>
                <!-- <ul class="list">
                        <li class="nav-a">02</li>
                        <li class="nav-b">
                            <div class="img"><img src=""></div>
                            <span>滨崎步</span>
                        </li>
                        <li class="nav-c">
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                        </li>
                        <li class="nav-d">
                            <span>500.00</span>
                            <span>奖励中</span>
                        </li>
                        <li class="nav-e">
                            <span>2018-06-15</span>
                            <span>16:56:00</span>
                        </li>
                    </ul>
                    <ul class="list">
                        <li class="nav-a">03</li>
                        <li class="nav-b">
                            <div class="img"><img src=""></div>
                            <span>滨崎步</span>
                        </li>
                        <li class="nav-c">
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                        </li>
                        <li class="nav-d">
                            
                        </li>
                        <li class="nav-e">
                            <span>2018-06-15</span>
                            <span>16:56:00</span>
                        </li>
                    </ul> -->
            </div>
        </section>
        <!--加盟店  -->
        <section id="rank-list" v-if="buyMemberShow">
            <div class="box">
                <ul class="nav">
                    <li class="nav-a">编号</li>
                    <li class="nav-b">微信昵称</li>
                    <li class="nav-c">星级加盟店</li>
                    <li class="nav-d">拼团积分</li>
                    <li class="nav-e">加盟时间</li>
                </ul>
                <mt-loadmore v-if="b_goload" :top-method="loadTop2" :bottom-method="loadBottom2" :bottom-all-loaded="b_allLoaded" ref="buy_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' >
                    <ul class="list" v-for="(item,index) in buyList" :key='index'>
                        <li class="nav-a">{{index+1}}</li>
                        <li class="nav-b">
                            <div class="img"><img :src="item.has_one_member.avatar?item.has_one_member.avatar:require('../../../assets/images/loading.jpg')" style="width:100%;height:100%;"></div>
                            <span>{{item.has_one_member.nickname}}</span>
                        </li>
                        <li class="nav-c" v-html="item.star_count" style="word-wrap:break-word;word-break:normal;">
                        </li>
                        <li class="nav-d">
                            <span>{{item.amount_finish}}</span>
                            <span>{{item.status_name}}</span>
                        </li>
                        <li class="nav-e">
                            <!-- <span>2018-06-15</span>
                            <span>16:56:00</span> -->
                            <span>{{item.created_at}}</span>
                        </li>
                    </ul>
                </mt-loadmore>
                <!-- <ul class="list">
                        <li class="nav-a">02</li>
                        <li class="nav-b">
                            <div class="img"><img src=""></div>
                            <span>滨崎步</span>
                        </li>
                        <li class="nav-c">
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                        </li>
                        <li class="nav-d">
                            <span>500.00</span>
                            <span>奖励中</span>
                        </li>
                        <li class="nav-e">
                            <span>2018-06-15</span>
                            <span>16:56:00</span>
                        </li>
                    </ul>
                    <ul class="list">
                        <li class="nav-a">03</li>
                        <li class="nav-b">
                            <div class="img"><img src=""></div>
                            <span>滨崎步</span>
                        </li>
                        <li class="nav-c">
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                            <yd-icon class="iconfont icon-extension-stars" custom size="1.25rem" color="#f15353"></yd-icon>
                        </li>
                        <li class="nav-d">
                            
                        </li>
                        <li class="nav-e">
                            <span>2018-06-15</span>
                            <span>16:56:00</span>
                        </li>
                    </ul> -->
            </div>
        </section>
        <!-- 奖励记录页面 -->
        <!-- <section id="reward-box">
                    <ul class="reward">
                        <li>
                            <span>1000.00</span>
                            <span>奖励金额（元）</span>
                        </li>
                        <li>
                            <span>800.00</span>
                            <span>已奖励金额（元）</span>
                        </li>
                        <li>
                            <span>200.00</span>
                            <span>未奖励金额（元）</span>
                        </li>
                    </ul>
                    <section id="reward-list">
                       <yd-tab>
                           <yd-tab-panel label="奖励记录">
                               <ul class="list">
                                   <h1><span>奖励记录ID：3026</span><span>300.00</span></h1>
                                   <li>
                                       <span>时间ID:3026</span>
                                       <span>2018-06-19   09:48:00</span>
                                    </li>
                                    <li @click="awardEvent(2)">
                                        <span>查看记录</span>
                                        <span><i class="fa fa-angle-right"></i></span>
                                    </li>
                               </ul>
                               <ul class="list">
                                   <h1><span>奖励记录ID：3026</span><span>300.00</span></h1>
                                   <li>
                                       <span>时间ID:3026</span>
                                       <span>2018-06-19   09:48:00</span>
                                    </li>
                                    <li>
                                        <span>查看记录</span>
                                        <span><i class="fa fa-angle-right"></i></span>
                                    </li>
                               </ul>
                               <ul class="list">
                                   <h1><span>奖励记录ID：3026</span><span>300.00</span></h1>
                                   <li>
                                       <span>时间ID:3026</span>
                                       <span>2018-06-19   09:48:00</span>
                                    </li>
                                    <li>
                                        <span>查看记录</span>
                                        <span><i class="fa fa-angle-right"></i></span>
                                    </li>
                               </ul>
                           </yd-tab-panel>
                       </yd-tab>
                    </section>
            </section>     -->
    </section>
    <!-- <el-row>
                <el-button type="primary" plain @click="awardEvent(1)">奖项排行</el-button>
                <el-button type="success" plain @click="awardEvent(2)">奖项记录</el-button>
            </el-row> -->
    <!-- <section>
            <el-row>
                <el-button type="primary" plain @click="awardEvent(1)">奖项排行</el-button>
                <el-button type="success" plain @click="awardEvent(2)">奖项记录</el-button>
            </el-row>
        </section> -->
</template>

<script>
    import page from "./extension_page.js";
    export default page;
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
    #line-up {
        padding-top: 40px;
        //padding-bottom: 40px;
        #nav {
            padding: 0.625rem 0.875rem;
            li {
                width: calc(50% - 0.125rem);
                display: inline-block;
                text-align: center;
                font-size: 14px;
                padding: 0.375rem 0;
                line-height: 1rem;
                background: #fff;
                color: #f15353;
                border-radius: 0.3125rem;
                
            }
            
            .active {
                background-color: #f15353;
                color: #fff;
            }
        }
        #rank-list {
            //margin-bottom: 1.25rem;
            .box {
                background-color: #fff;
                .nav {
                    display: flex;
                    height: 2.5rem;
                    font-size: 14px;
                    color: #333;
                    border-bottom: solid 0.0625rem #ebebeb;
                    .nav-b,
                    .nav-c,
                    .nav-d,
                    .nav-e {
                        width: 5rem;
                        line-height: 2.5rem;
                    }
                    .nav-a {
                        line-height: 2.5rem;
                        width: 3.4375rem;
                    }
                }
                ul:last-child {
                    border: none;
                }
                .list {
                    display: flex;
                    align-items: center;
                    background-color: #fff;
                    padding: 0.625rem 0;
                    border-bottom: solid 0.0625rem #ebebeb;
                    .nav-a {
                        width: 3.4375rem;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .nav-b,
                    .nav-c,
                    .nav-d,
                    .nav-e {
                        width: 5rem;
                    }
                    .nav-b {
                        .img {
                            width: 2.25rem;
                            height: 2.25rem;
                            border-radius: 1.125rem;
                            background-color: #f15353;
                            margin: 0 auto;
                            overflow: hidden;
                        }
                        span {
                            display: block;
                            margin-top: 0.375rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                    .nav-d {
                        span {
                            display: block;
                            line-height: 1.25rem;
                            color: #8c8c8c;
                        }
                        span:first-child {
                            color: #f15353;
                            font-size: 14px;
                        }
                    }
                    .nav-e {
                        span {
                            display: block;
                            line-height: 1.25rem;
                            font-size: 14px;
                            color: #8c8c8c;
                        }
                    }
                }
            }
        }
        #reward-box {
            .reward {
                background-color: #f15353;
                color: #fff;
                padding: 0.625rem 0;
                display: flex;
                margin-bottom: 0.625rem;
                li {
                    width: 33.3%;
                    line-height: 1.5rem;
                    span {
                        display: block;
                    }
                    span:first-child {
                        font-size: 18px;
                    }
                }
            }
            #reward-list {
                .list {
                    margin-top: 0.375rem;
                    background-color: #fff;
                    h1 {
                        height: 2.5rem;
                        line-height: 2.5rem;
                        padding: 0 0.875rem;
                        font-size: 16px;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: solid 0.0625rem #ebebeb;
                        span:last-child {
                            font-weight: normal;
                            color: #f15353;
                        }
                    }
                    li:nth-child(2) {
                        height: 1.625rem;
                        line-height: 1.625rem;
                        margin-top: 0.625rem;
                        display: flex;
                        justify-content: space-between;
                        color: #8c8c8c;
                        font-size: 14px;
                        padding: 0 0.875rem;
                    }
                    li:last-child {
                        height: 2.75rem;
                        line-height: 2.75rem;
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        padding: 0 0.875rem;
                        i {
                            font-size: 1.5rem;
                            color: #c9c9c9;
                            line-height: 2.75rem;
                        }
                    }
                }
            }
        }
    }
</style>
