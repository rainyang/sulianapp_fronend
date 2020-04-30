<template>
	<div id="sales_management">
		<c-title :hide="false"
		         text='团队销量管理'></c-title>
		<div style="height: 40px;"></div>
		<van-tabs v-model="activeName"
        @click.native="handleClick">
        <van-tab title="经销商团队查询"
         id="0"></van-tab>
         <van-tab title="下级经销商团队查询"
         id="1"
         ></van-tab>
				</van-tabs>
			<div class="line">

			</div>
		<div class="content">
			<div class="sale" v-if="activeName==0">
				<div class="top">
					<div class="left">
						<span class="item"  v-for="(item,index) in empower"
						:key="index"
						@click="chooseEnp(item)"
						:class="[item.checked?'bg':'']">{{item.name}}</span>
					</div>
					<div class="right" @click.stop="showTime">
							<span v-if="id==1">{{currentDate}}</span>
							<span v-if="id==2">{{cut(currentDate2)[0]}}</span>
							<i class="iconfont icon-member-bottom"  ></i>
					</div>
				</div>
				<div class="sale-content" v-if="id==1">
					<div class="block-one">
						<div class="num">{{month_sales}}</div>
						<div>{{cut(currentDate)[1]}}月销量</div>
					</div>
					<div class="block-two">
						<div class="num">{{year_sales}}</div>
						<div>{{cut(currentDate)[0]}}销量</div>
					</div>
				</div>
				<div class="sale-content" v-if="id==2">
					<div class="block-one">
						<div class="num">{{month_sales}}</div>
						<div>1月销量</div>
					</div>
					<div class="block-two">
						<div class="num">{{year_sales}}</div>
						<div>{{cut(currentDate2)[0]}}销量</div>
					</div>
				</div>
			</div>
			<div class="next-sale" v-if="activeName==1">
				<div class="top">
					<div class="left">
						<span class="item"  v-for="(item,index) in empower"
						:key="index"
						@click="chooseEnp(item)"
						:class="[item.checked?'bg':'']">{{item.name}}</span>
					</div>
					<div class="right" @click.stop="showTime">
						<span v-if="id==1">{{currentDate}}</span>
						<span v-if="id==2">{{cut(currentDate2)[0]}}</span>
						<i class="iconfont icon-member-bottom"  ></i>
					</div>
				</div>
				<div class="sale-content" v-if="datas.length<=0">
					暂无下级!
				</div>
				<div class="sale-content"  v-if="id==1&&datas.length>0">
						<div class="list" v-for="(item,index,key) in datas" :key="index">
							<div class="wrap">
									<div class="avator">
											<img :src="item.has_one_member.avatar">
										</div>
										<div class="txt">
											<div class="top">
													ID:{{item.uid}}
													<span>{{item.has_one_level.level_name}}</span>
											</div>
											<div class="bottom">
												<div class="name">{{item.has_one_member.nickname}}</div>
											</div>
										</div>
							</div>
							<div class="sale-num" style="font-size: 12px;">
								<div style="color: #666666;">{{cut(currentDate)[1]}}月销量</div>
								<div>{{item.month_sales}}</div>
							</div>
							<div class="year-num" style="font-size: 12px;">
									<div  style="color: #666666;">{{cut(currentDate)[0]}}销量</div>
									<div>{{item.year_sales}}</div>
								</div>
						</div>
				</div>
				<div class="sale-content"  v-if="id==2&&datas.length>0">
					<div class="list" v-for="(item,index,key) in datas" :key="index">
						<div class="wrap">
								<div class="avator">
										<img :src="item.has_one_member.avatar">
									</div>
									<div class="txt">
										<div class="top">
												ID:{{item.uid}}
												<span>{{item.has_one_level.level_name}}</span>
										</div>
										<div class="bottom">
											<div class="name">{{item.has_one_member.nickname}}</div>
										</div>
									</div>
						</div>
						<div class="sale-num" style="font-size: 12px;">
							<div style="color: #666666;">{{cut(currentDate2)[1]}}月销量</div>
							<div>{{item.month_sales}}</div>
						</div>
						<div class="year-num" style="font-size: 12px;">
								<div  style="color: #666666;">{{cut(currentDate2)[0]}}销量</div>
								<div>{{item.year_sales}}</div>
							</div>
					</div>
			</div>
			</div>
		</div>
		<yd-datetime type="month" v-model="currentDate"  ref="datetime"  style="visibility: hidden;" id="datetime" :callback="selectTime"></yd-datetime>
		<yd-datetime type="month" v-model="currentDate2"  ref="datetime2"  style="visibility: hidden;" id="datetime2"  :callback="selectTime"></yd-datetime>
	</div>
</template>
<script>
import sales_management_controller from './sales_management_controller';
export default sales_management_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#sales_management {
	height:100vh;
	background-color:#fff;
	.line{
		height: 0.625rem;
		background-color: #f2f2f7;
	}
	.content{
		background-color:#fff;
		padding: 0 1rem;
		padding-top:0.75rem;
		.sale{
			.top{
				display: flex;
				align-items:center;
				justify-content:space-between;
				.left{
					background-color: #ffffff;
					display: flex;
					.item:first-child{
						width: 2.625rem;
						box-sizing:border-box;
						border-top-left-radius:0.625rem;
						border-bottom-left-radius:0.625rem;
						border: solid 1px #d9d9d9;
						height: 1.25rem;
						display:flex;
						align-items:center;
						justify-content:center;
						border-right:none;
					}
					.item:last-child{
						width: 2.625rem;
						border-top-right-radius:0.625rem;
						border-bottom-right-radius:0.625rem;
						border: solid 1px #d9d9d9;
						height: 1.25rem;
						display:flex;
						align-items:center;
						justify-content:center;
						border-left:none;
					}
				}
				.right{
					color: #666666;
					display:flex;
					align-items: center;
					i{
						font-size:18px;
					}
				}
			}
			.sale-content{
				margin-top:1.75rem;
				display: flex;
				justify-content: space-between;
				.block-one{
					width: 9.875rem;
					height: 5.5625rem;
					background-color: #ffffff;
					box-shadow: 0rem 0rem 0.6875rem 0rem
						rgba(0, 0, 0, 0.06);
					border-radius: 0.3125rem;
					display:flex;
					justify-content:center;
					flex-direction:column;
					padding-left:0.75rem;
					text-align:left;
					color:#666666;
					flex-wrap:wrap;
					.num{
						margin-bottom: 1.25rem;
						color:#ff0000;
						font-size: 16px;
					}
				}
				.block-two{
					width: 9.875rem;
					height: 5.5625rem;
					background-color: #ffffff;
					box-shadow: 0rem 0rem 0.6875rem 0rem
						rgba(0, 0, 0, 0.06);
					border-radius: 0.3125rem;
					display:flex;
					justify-content:center;
					flex-direction:column;
					padding-left:0.75rem;
					text-align:left;
					color:#666666;
					flex-wrap:wrap;
					.num{
						margin-bottom: 1.25rem;
						color:#ff0000;
						font-size: 16px;
					}
				}
			}
		}
		.next-sale{
			.top{
				display: flex;
				align-items:center;
				justify-content:space-between;
				.left{
					background-color: #ffffff;
					border-radius: 0.625rem;
					border: solid 0.0625rem #d9d9d9;
					display: flex;
					.item:first-child{
						width: 2.625rem;
						box-sizing:border-box;
						border-top-left-radius:0.625rem;
						border-bottom-left-radius:0.625rem;
						border: solid 1px #d9d9d9;
						height: 1.25rem;
						display:flex;
						align-items:center;
						justify-content:center;
						border-right:none;
					}
					.item:last-child{
						width: 2.625rem;
						border-top-right-radius:0.625rem;
						border-bottom-right-radius:0.625rem;
						border: solid 1px #d9d9d9;
						height: 1.25rem;
						display:flex;
						align-items:center;
						justify-content:center;
						border-left:none;
					}
				}
				.right{
					color: #666666;
					display:flex;
					align-items: center;
					i{
						font-size:18px;
					}
				}
			}
			.sale-content{
				.list{
					padding:1rem 0;
					border-bottom:solid 1px #ccc;
					display:flex;
					.wrap{
						display:flex;
						flex:1;
						.avator{
						width: 2.6875rem;
						height: 2.6875rem;
						box-sizing:border-box;
						border-radius: 50%;
						img{
							width:100%;
							height:100%;
							border-radius:50%;
						}
					}
					.txt{
						margin-left:0.625rem;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.top{
							color: #666666;
							display: flex;
							align-items:center;
							justify-content: center;
							font-size:12px;
							span{
								width: 6rem;
								height: 1rem;
								background-color: #ff0000;
								border-radius: 0.4375rem;
								display: flex;
								align-items:center;
								justify-content: center;
								color:#fff;
								margin-left:0.25rem;
							}
						}
						.bottom{
							text-align: left;
						}
					}
					}
					.sale-num{
						flex:1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
					.year-num{
						flex:1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
				}
			}
		}
	}
	.bg {
    background-color: #ff0000;
    color: #fff !important;
  }
	.yd-cell-item	.yd-cell-left{
		position:absolute;
		right:0;
		top:50%;
		bottom:50%;
	}
}
</style>
