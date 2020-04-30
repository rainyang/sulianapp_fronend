<template>
  <div id="task_center">
    <c-title :hide="false" :text="'任务中心'"></c-title>
        <div class="header" v-if="member.member">
            <div class="use-header">
                <div class="img">
                    <img :src="member.member.avatar_image">
                </div>
                <ul>
                    <li class="name">{{member.member.nickname}}</li>
                    <li v-if="member.level">等级名称:{{member.level.level_name}}</li>
                </ul>
            </div>
            <div class="time" >
                <yd-icon class="iconfont icon-jiangli1" custom size="1.125rem" color="#f5d59c"></yd-icon>
                <font><span>奖励：</span>{{ task.price }}元</font>
            </div>
        </div>
        <div class="title-box">
            <div class="left"></div>
                <span>奖励任务</span>
            <div class="right"></div>
        </div>
        <ul class="list_box">
            <li class="list" v-if="task.is_child">
                <i class="iconfont icon-taskconter"></i>
                <span class="text">直推订单数量满{{task.is_child.all}}笔</span>
                <span class="right" v-if="Number(task.is_child.complete) < Number(task.is_child.all)">{{task.is_child.complete}}/{{task.is_child.all}}</span>
                <span class="right complete" v-if="Number(task.is_child.complete) >= Number(task.is_child.all)"></span>
            </li>
            <li class="list" v-if="task.is_self">
                <i class="iconfont icon-taskconter"></i>
                <span class="text">自购订单数量满{{task.is_self.all}}笔</span>
                <span class="right" v-if="Number(task.is_self.complete) < Number(task.is_self.all)">{{task.is_self.complete}}/{{task.is_self.all}}</span>
                <span class="right complete" v-if="Number(task.is_self.complete) >= Number(task.is_self.all)"></span>
            </li>
            <li class="list" v-if="task.is_child_self">
                <i class="iconfont icon-taskconter"></i>
                <span class="text">直推+自购订单数量满{{task.is_child_self.all}}笔</span>
                <span class="right" v-if="Number(task.is_child_self.complete) < Number(task.is_child_self.all)">{{task.is_child_self.complete}}/{{task.is_child_self.all}}</span>
                <span class="right complete" v-if="Number(task.is_child_self.complete) >= Number(task.is_child_self.all)"></span>
            </li>
        </ul>
  </div>
</template>

<script>
	import task_center_controller from "./task_center_controller";

	export default task_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#task_center{
    padding-top: 40px;
    .header{
        width:100%;
        .use-header{
            background-color:#3b3b4f;
            padding:1.25rem;
            position:relative;
            display:flex;
            .img{
                width:3.75rem;
                height:3.75rem;
                border:solid 0.125rem #fff;
                border-radius:50%;
                margin-right:1rem;
                overflow:hidden;
                img{
                    width:100%;
                }
            }
            ul{
                text-align:left;
                li{
                    line-height:1.75rem;
                    color:#fff;
                    font-size:16px;
                }
                li:last-child{
                    font-size: 14px;
                }
                .name{
                    font-weight:bold;
                }
            }
            .button{
                width:21%;
                height:1.625rem;
                background-color: #fff;
                border-radius:0.8125rem;
                display:flex;
                justify-content:space-between;
                padding:0 0.5rem;
                position:absolute;
                margin-top:1.0625rem;
                right:0.625rem;

                input{
                    border:none;
                    color:#efcb7b;
                }
                i{
                    color:#efcb7b;
                    font-size:1.25rem;
                    line-height:1.625rem;
                }
            }
        }
        .time{
            background-color:rgba(59,59,79,0.8);
            text-align:left;
            height:2.25rem;
            padding:0 1.25rem;
            font{
                font-size:14px;
                line-height:2.25rem;
                color:#f5d59c;
                span{
                    font-weight:bold;
                }
            }
            i{
                margin-right:0.625rem;
            }
        }
    }
    .title-box{
        display: flex;
        justify-content: center;
        height: 3.125rem;
        align-items: center;
        .left{
            margin-left:0.875rem;
            width:4%;
            height:0.0625rem;
            background-color: #ccc;
        }
        span{
            font-size:16px;
            line-height: 1.875rem;
            margin: 0 0.625rem;
        }
        .right{
            width:4%;
            height:0.0625rem;
            background-color: #ccc;
            margin-right:0.875rem;
        }
    }
    .list_box{
        background: #fff;
        .list{
            border-bottom: solid 0.0625rem #ebebeb;
            padding: 0.875rem;
            display: flex;
            align-items: center;
            font-size: 16px;
            .iconfont{
                margin-right: 0.625rem;
                color:#f5d59c;
                font-size: 36px;
            }
            .text{
                max-width: 15rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                text-align: left;
            }
            .right{
                position: absolute;
                right: 0.875rem;
                color:#f5d59c;
                font-size: 18px;
            }
            .complete{
                width: 2.5rem;
                height: 2.5rem;
                background-image: url(../../../assets/images/task_complete.png);
                background-repeat: no-repeat;
                background-position: center;
                background-size: 2.5rem;
                transform:rotate(-30deg);
                -ms-transform:rotate(-30deg); /* Internet Explorer */
                -moz-transform:rotate(-30deg); /* Firefox */
                -webkit-transform:rotate(-30deg); /* Safari 和 Chrome */
                -o-transform:rotate(-30deg); /* Opera */
            }
        }
    }
}
</style>
