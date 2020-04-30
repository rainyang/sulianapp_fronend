<template>
    <div id="shareholderCenter">
        <c-title :hide="false" text=' 消费返现'></c-title>

        <div class="share_holder">
        	<div class="left">
				<span>￥{{returnAmountTotal}}</span> <br />
        		<span>返现总额(元)</span>
        	</div>
        </div>

        <div class="share_info">
        	<div>
        		<span>￥{{alreadyReturn}}</span><br />
				已返现总额(元)
        	</div>
        	<div>
        		<span>￥{{notReturn}}</span><br />
        		未返现总额(元)
        	</div>
        </div>


        <div class="shareholder-order">
            <div id="tabs">
                <mt-navbar v-model="activeName">
                    <mt-tab-item id="first" @click.native="handleClick('1')">返现记录</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="activeName">
                    <mt-tab-container-item id="first">
                        <ul class='rationList'>
                            <li v-for="(elem,i) in first_content" class="list" :key='i'>
                                <h4>
                                    返现记录ID:{{elem.id}}
                                    <span>{{elem.amount}}元</span>
                                </h4>

								<div class="one">
									<div class="time">
										<span class="left">{{mailSingleReturnName}}时间ID:{{elem.id}}</span>
										<span class="right">{{elem.created_at}}</span>
									</div>
									<div class="Record"  @click="toReturnInfo(elem.id)">
										<span class="left look">查看记录</span>
										<i class="fa fa-angle-right"></i>
									</div>
								</div>

                            </li>
                        </ul>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>

        </div>

    </div>
</template>

<script>
import consume_return_center_controller from './consume_return_center_controller';
export default consume_return_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
p {
    margin: 0;
    padding: 0;
}

#shareholderCenter {
	padding-top: 40px;
    .m_header {
        width: 100%;
        height: 2.8125rem;
        line-height: 2.8125rem;
        font-size: 15px;
        font-weight: bold;
        background: #fff;
        span {
            display: inline-block;
            width: 1rem;
            height: 1.5rem;
            float: left;
            margin-left: 0.625rem;
            font-size: 30px;
        }
    }
    .share_holder {
       box-sizing: border-box;
       background-color: #f15353;

       .left{
       		width:55% ;
       		text-align: left;
       		color:#FFFFFF;
       		box-sizing: border-box;
			   padding:1rem 0.75rem;
			   span:first-child{
				   font-size:20px;
				   line-height: 1.5rem;
				   display: inline-block;
			   }
       		span{
				   font-size: 14px;
				   line-height: 1.5rem;
				   display: inline-block;
       		}
       }
       .right{
       	width: 45%;
       	padding:2rem 0.9375rem 0rem 0rem;
       	box-sizing: border-box;
       	color:#fff;
       	text-align: right;
       	line-height: 1.625rem;
       	float:right;
       	font-size: 12px;

       }
    }

    .share_info{
		width: 100%;
		padding:1rem 0;
    	background-color: #fff;
		margin-bottom: 0.625rem;
		display: flex;
		justify-content: space-between;
    	div{
    		color:#737372;
    		font-size: 12px;
    		line-height: 1.25rem;
    		width: 50%;
    		box-sizing: border-box;
    		span{
    			color:#f15353;
    			font-size: 16px;
    			font-weight: bold;
    		}
		}
		div:first-child{
			border-right:solid 0.0625rem #e2e2e2;
		}

    }


    .shareholder-order {
    	#tabs{
    		.rationList{
    			.list{
    				margin: 0.375rem 0rem;
    				background-color:#fff;
    				h4{
						line-height: 40px;
    					width: 100%;
    					box-sizing: border-box;
    					padding: 0.625rem 1.25rem;
    					text-align: left;
    					color:#333;
    					font-size: 14px;
    					border-bottom: 0.0625rem solid #ececec;
    					span{
    						display: inline-block;
    						font-size: 12px;
    						padding: 0.0625rem 0.25rem;
    						font-weight: normal;
    						color:#f15353;
    						float: right;
    					};
    				}
    				ul:after{
    					content: "";
    					display: block;
    					clear: both;
    				}
    				ul{
    					width: 100%;
    					padding: 0.625rem 0rem;
    					li{
    						width: 33%;
    						float: left;
    						font-size: 12px;
    						color:#8c9295;
    						line-height: 1.375rem;
    						span{
    							color:#333;
    							font-size: 14px;
    						}
    					}
    				}
    				p{
    					color:#aab2b9;
    					text-align: left;
    					box-sizing: border-box;
    					padding: 0rem 1.25rem 0.9375rem;
    					span{
    						color:#728ae3;
    						float: right;
    					}
    				}

    			}


    			.recordList{
    				padding:0.9375rem;
    				font-size: 14px;
    				line-height: 1.125rem;
    				color:#333;
    				text-align: left;
    				background-color: #fff;
    				margin: 0.125rem;
    				span{
    					font-size: 14px;
    					float: right;
    				}
    			}
    			.one{
						padding:0 0.75rem ;

					.time{
						width:100%;
						line-height: 1.625rem;
						margin-top:0.625rem;
						display: flex;
						justify-content:space-between;
					}
					.Record{
						width:100%;
						line-height: 2.75rem;
						display: flex;
						justify-content:space-between;

						i{
							font-size: 1.25rem;
							color:#c9c9c9;
							line-height: 2.75rem;
						}
						span{
							color:#333;
						}
					}
					.left{
						color:#8c8c8c;
						font-size:14px;
					}
					.right{
						color:#8c8c8c;
					}
					.right{
						color:#8c8c8c;
						font-size:14px;
					}
				}

    		}
    		.rationList:after{
    			content: "";
    			display: block;
   				clear: both;
    		}
    	}

    }

}
</style>
