<template>
    <div id="login-page">
        <div class="content">
            <div class="img">
                <img src="../../assets/images/hourglass@2x.png" class="login">
            </div>
            <span>登录中，请稍等...</span>
        </div>
        
        <!-- <div id="member" style="position:relative;">
				<c-title :hide="true" text='home'></c-title> -->
				
				<!-- <div class="header">
					<div class="icon">
						<router-link :to="fun.getUrl('info',{})">
						<i class="iconfont icon-shezhi"></i>
						</router-link>
					</div>
					<div class="header-info">
						<div class="left">
							<img src="../../assets/images/photo-mr.jpg">
						</div>
						<div class="user-info">
							<div class="user-name" id="name-one">
								<span id="name-a">登录中...</span>
							</div>
						</div>
						<div class="member-box"  style="z-index:39;" >
							<div class="img"><img src="../../assets/images/member-vip02.png"></div>
							<div class="font">会员<i class="fa fa-angle-right"></i></div>
						</div>
					</div>
					<div class="user">
						<div class="vip">
							<i class="iconfont icon-shoucang1"></i>
						</div>
						<div class="user-head">
							<img v-lazy="avatar">
						</div>
						<div class="user-info">
							<div class="user-name">{{nickname}}</div>
							<div class="user-name">[{{$store.state.langService.language.langMember.langMemberId}}:{{uid}}]</div>
							<div class="user-other" v-if="MyReferrer.is_show=='1'">[推荐人:{{MyReferrer.nickname}}]
							</div>

							<div class="user-other" v-if="level_name">[{{level_name}}] {{validity_value}}
							</div>
							<div class="user-name" v-if="is_custom">{{custom_title}}:{{custom_value}}
							</div>
						</div>
						<div class="set" v-if="member_item">
							<router-link :to="fun.getUrl('info',{item:member_item})">
								<i class="fa fa-gear"></i>
							</router-link>
						</div>
						
					</div>
				</div> -->
				<!-- <div id="userinfo">
					<ul>
						<li>
							<router-link :to="fun.getUrl('balance')">
								<span><small>￥</small>0</span>
								<br>余额</router-link>
						</li>
						<li>
							<router-link :to="fun.getUrl('integral_v2')">
								<span>0</span>
								<br>积分</router-link>
						</li>
						<li>
							<router-link :to="fun.getUrl('extension')">
								<span><small>￥</small>0</span>
								<br>提现</router-link>


						</li>
					</ul>
				</div> -->
				<!-- <div id="orderlist">
					<div class="ordertltie">
						
						<router-link :to="fun.getUrl('orderlist',{ status:'0' })">
							<div class="ordername">我的订单</div>
							<div class="">
								<i class="fa fa-angle-right"></i>
							</div>
						</router-link>
					</div>
					<div class="order_all">
						<router-link :to="fun.getUrl('orderlist',{ status:'1'})">
							<div class="order_pub">
								<div class="badge"></div>
								<i class="fa money"></i>
								<br>待付款
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'2' })">

							<div class="order_pub">
								<div class="badge "></div>
								<i class="fa box"></i>
								<br>待发货
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'3'})">

							<div class="order_pub">
								<div class="badge "></div>
								<i class="fa car"></i>
								<br>待收货
							</div>

						</router-link>
						
						<router-link :to="fun.getUrl('aftersaleslist')">
							<div class="order_pub">
								<div class="badge"></div>
								<i class="fa refun"></i>
								<br>待退款
							</div>
						</router-link>
					</div>

				</div> -->

				<!-- <div id="tool">
					<div class="title">
						<div class="spare"></div>
						<h3>基础工具</h3>
					</div>
					
					<ul class="tool-box">
						
						<li>
							<router-link :to="fun.getUrl('collection',{selected:'1'})">
								<div class="img">
									<img src="../../assets/images/tool-a.png">
								</div>
								</router-link>
								<div>收藏</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('footprint',{selected:'1'})">
								<img src="../../assets/images/tool-b.png">
								</router-link>
								<div>足迹</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('myEvaluation',{selected:'1'})">
								<img src="../../assets/images/tool-c.png">
								</router-link>
								<div>评论</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('myRelationship',{selected:'1'})">
								<img src="../../assets/images/tool-d.png">
							</router-link>
							    <div>关系</div>
						</li>
						<li>      
							<router-link :to="fun.getUrl('address',{selected:'1'})">
								<img src="../../assets/images/tool-e.png">
							</router-link>
							<div>地址管理</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('coupon',{selected:'1'})">
								<img src="../../assets/images/tool-f.png">
								</router-link>
								<div>优惠券</div>
						</li>
						<li>

						      <img src="../../assets/images/tool-g.png">
                                <div>二维码</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('message',{selected:'1'})">
								<img src="../../assets/images/tool-h.png">
								<div>消息通知</div></router-link>
						</li>
					</ul>
				</div> -->

				<!-- <div style="height: 10px;clear: both;"></div>

					<template>
					    <yd-cell-group>
					        <yd-cell-item arrow>
					            <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
					            <span slot="left">我的订单</span>
					            <span slot="right">查看全部订单</span>
					        </yd-cell-item>

					        <yd-cell-item arrow>
					            <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
					            <span slot="left">图标</span>
					            <span slot="right">图标是image</span>
					        </yd-cell-item>
					    </yd-cell-group>
					</template> -->

				<!-- <div class="cart">
					
					<router-link :to="fun.getUrl('extension')" >
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-extension1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">我的推广</span>
							<i class="fa fa-angle-right"></i>
						</div>    
					</router-link>
                    <router-link :to="fun.getUrl('microShop_apply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-my-shop1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">我要开店</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
                    <router-link  :to="fun.getUrl('storeApply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-store-apply1" custom size="1.625rem" color="#f15353" style="margin-right:0.375rem"></yd-icon>
							<span slot="text">门店申请</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					
				
				</div> -->
				
				
			<!-- </div> -->
        <!-- <c-foot v-if='!foot'></c-foot> -->
    </div>
</template>


<script>
    import validataion from './login_validation_controller';
    export default validataion;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
   #login-page{
       background-color: #fff;
       min-height: 41.6875rem;
       padding-top:7.5rem;
       .content{
           .img{
                width: 3.75rem;
                height: 3.75rem;
                line-height: 3.75rem;
                overflow: hidden; 
                margin: 0 auto;
                //    background-color: #fff;
                transform-origin: 50% 50%;
                animation-duration:2s;
                animation-iteration-count:infinite;
                position:relative;
                animation-name:img;
                text-align: center;
                @keyframes img{
                from{transition:1s ease-in}
                to{transform:rotate(360deg)}
                }
                img{
                    height: 60%;
                    display: inline-block;
                    vertical-align: middle; 
                }
            }
       }
       
       span{
           font-size:16px;
           line-height: 1.875rem;
       }
   }
// 头像
   .header {
        height: auto;
        padding: 0;
        background-color: #f15353;
        padding: 1.25rem;
        position: relative;
        .icon {
            text-align: right;
            position: absolute;
            right:1.25rem;
            i {
                font-size: 1.25rem;
                color: #fff;
            }
        }
        .header-info {
            display: flex;
            .left {
                width: 3.75rem;
                height: 3.75rem;
                border-radius: 50%;
                img {
                    overflow: hidden;
                    height: 3.75rem;
                    width: 3.75rem;
                    border-radius: 50%;
                    border: solid 0.125rem #fff;
                }
            }
            .user-info {
                margin-left: 1rem;
                text-align: left;
                color: #fff;
                #name-one {
                    line-height: 3.75rem;
                    // margin-top:0.9375rem; 
                    // border:solid 0.0625rem #fff;
                    // border-radius: 1.875rem;
                    // padding: 0.25rem 0.625rem;
                }
                #name-a {
                    font-size: 16px;
                    font-weight: bold;
                }
                #name-b {
                    font-size: 12px;
                    margin-left: 0.625rem;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 0.625rem;
                    padding: 0.125rem 0.375rem;
                }
            }
            .member-box {
                width: 30%;
                display: flex;
                position: absolute;
                right: 0;
                color: #fff;
                margin-top: 1.4375rem;
                .font {
                    font-size: .875rem;
                    position: absolute;
                    line-height: 2rem;
                    right: 0.875rem;
                }
                i {
                    line-height: 2rem;
                    font-size: 1.125rem;
                    margin-left: 0.625rem;
                }
                .img {
                    width: 6rem;
                    height: 2rem;
                    overflow: hidden;
                    position: absolute;
                    right: 0;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .member-box{
                width: 30%;
                display: flex;
                position: absolute;
                right:0;
                color:#fff;
                margin-top:1.4375rem;
                .font{
                    font-size:.875rem;
                    position: absolute;
                    line-height: 2rem;
                    right:0.875rem;
                }
                i{
                    line-height: 2rem;
                    font-size:1.125rem;
                    margin-left:0.625rem;
                }
                .img{
                    width: 6rem;
                    height:2rem;
                    overflow: hidden;
                    position: absolute;
                    right: 0;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
                
        }

        .user {
            height: 9.375rem;
            text-align: left;
            .user-head {
                height: 3.25rem;
                width: 3.25rem;
                background: #fff;
                border-radius: 50%;
                border: 2px solid #fff;
                margin: 0.375rem auto;
                box-sizing: border-box;
            }
            .user-head img {
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
            }
            .user-info {
                height: 3rem;
                width: 100%;
                color: #fff;
            }
            .set {
                position: absolute;
                right: 2.5rem;
                top: 0.625rem;
                color: #fff;
                font-size: 14px;
            }
            .vip{
                position: relative;
                top: 0;
                text-align: right;
                i{
                    color:#fff;
                    font-size:1.25rem;
                }
            }
            
            .user-info .user-name {
                height: 1.875rem;
                width: auto;
                font-size: 14px;
                line-height: 1.875rem;
            }
            .user-info .user-other {
                height: 1.25rem;
                width: auto;
                font-size: 12px;
                line-height: 1.25rem;
                opacity: 0.8;
            }
        }
        .user-gold {
            height: 2.1875rem;
            width: 94%;
            padding: 0.3125rem 3%;
            border-bottom: 0.0625rem solid #f5f3f3;
            background: #fff;
            font-size: 12px;
            line-height: 2.1875rem;
        }
        .user-gold .title {
            height: 2.1875rem;
            width: auto;
            float: left;
            color: #666;
        }
        .user-gold .num {
            height: 2.1875rem;
            width: auto;
            float: left;
            color: #f90;
        }
        .user-gold .draw {
            width: 5rem;
            height: 1.875rem;
            background: #6c9;
            float: right;
        }
        .user-op {
            height: 2.1875rem;
            width: 94%;
            padding: 0.3125rem 3%;
            border-bottom: 0.0625rem solid #f5f3f3;
            background: #fff;
            font-size: 12px;
            line-height: 2.1875rem;
        }
    }
// 积分
        #userinfo {
        background: #FFF;
        ul {
//          display: flex;

            //          display: flex;
            li a {
                color: #8c8c8c;
                text-align: center;
                display: block;
            }
            li a span {
                color: #222;
                height: 1.25rem;
                line-height: 1.25rem;
                font-size: 14px;
            }
            li {
                flex: 1;
                width: 33%;
                float: left;
                margin: 0.625rem 0;
                box-sizing: border-box;
                border: 0
            }
            li:last-child {
                border: 0
            }
            li a {
                color: #8c8c8c;
                text-align: center;
                display: block;
            }
            li a span {
                color: #222;
                font-size: 16px;
                margin-bottom: 0.3125rem;
                height: 1.25rem;
                line-height: 1.25rem;
                display: inline-block;
            }
            li small{
                font-size:12px;
            }
            li a {
                color: #8C8C8C;
                font-size: 12px;
            }
            li:after{
                content: "";
                display: block;
                clear: both;
            }
        }
        ul:after{
                content: "";
                display: block;
                clear: both;
            }
    }
// 订单

        #orderlist {
        background: #FFF;
        margin: 0.625rem 0;
    }

    .ordertltie {
        text-align: left;
        text-indent: 0.875rem;
        width: 100%;
        height: 2.5rem;
        border-bottom: 0.0625rem solid #ebebeb;
        box-sizing: border-box;
        i {
            line-height: 2.5rem;
            color: #c9c9c9;
            font-size: 1.25rem;
            float: right;
            padding-right: 0.875rem;
        }
        a .ordername {
            float: left;
            line-height: 2.5rem;
            font-size: 16px;
            color: #333;
        }
    }
    .order_all {
        display: -webkit-box;
        display: -webkit-flex;
        padding: 0.875rem 0;
        color: #666;
        overflow: hidden;
        display: flex;
        a {
            width: 25%;
            -webkit-box-flex: 1;
        }
    }

    .order_all a i {
        font-size: 1.25rem;
        margin-bottom: 0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        background-size: 1.25rem;
    }

    .order_all a .money {
        background-image: url(../../assets/images/money.png);
    }

    .order_all a .box {
        background-image: url(../../assets/images/box.png);
    }

    .order_all a .car {
        background-image: url(../../assets/images/car.png);
    }

    .order_all a .refun {
        background-image: url(../../assets/images/refun.png);
    }

// 基础工具
    #tool {
        background-color: #fff;  
        overflow: hidden;
        color:#333;
        .title{
            display: flex;
            height:2.5rem;
            line-height: 2.5rem;
            padding:0 0.875rem;
            border:solid 1px #f3f3f3;
        }
        .spare{
            width:0.25rem;
            height:1rem;
            border-radius: 0.0625rem;
            background-color: #f15353;
            margin-top:0.75rem;
            margin-right:0.375rem;
        }
        h3 {
            color: #333;
            text-align: left;
            font-size: 16px;
            box-sizing: border-box;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
        }
        li img {
            width:42%;
            margin-bottom: 0.25rem;
            margin:auto;
            display: block;
        }
        ul li {
            -webkit-box-flex: 1;
            width:25%;
            position: relative;
            box-sizing: border-box;
            text-align: center;
            font-size: 12px;
        }
        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3),
        li:nth-child(4) {
            margin-bottom: 0.625rem;
        }
        ul li a {}
        ul li i {
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 0.625rem;
            color: #fff;
            line-height: 2.25rem;
            font-size: 20px;
            margin-bottom: 0.25rem
        }
        .tool-box {
            display: -webkit-box;
            display: -webkit-flex;
            padding: 0.625rem 0;
        }
    }

// 功能列表
        .cart {
        height: auto;
        width: 100%;
        margin-top: 0.625rem;
        padding-left: 0.875rem;
        background-color: #fff;
    }

        .list1 {
        height: 2.75rem;
        width: 100%;
        padding: 0 0.875rem 0 0;
        font-size: 16px;
        line-height: 2.75rem;
        color: #333;
        text-align: left;
        border-top:solid 0.0625rem #ebebeb;
        display: flex;
    }
    .list1 i.fa.fa-angle-right {
        float: right;
        line-height: 2.75rem;
        display: inline-block;
        font-size: 1.5rem;
        color: #c9c9c9;
        text-align: center;
        background-size: 1.25rem;
        position: absolute;
        right:0.875rem;
    }

    #copyright {
        color: #a7a7a7;
        margin: 0.625rem 0;
    }
</style>