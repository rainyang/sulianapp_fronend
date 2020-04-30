<template>
	<div id="income">
		<c-title :hide="false" :text='`${income_name_text}`'></c-title>
		<div style="height: 40px;"></div>
		<div id="userinfo">
			<ul>
				<li>
					<span>￥{{total_income}}</span>
					<br>累计{{income_name_text}}</li>
				<li>
					<span>￥{{income}}</span>
					<br>可{{this.fun.initWithdrawal()}}{{income_name_text}}</li>
				<li>
					<span class="tixi" @click="gotoIncome">
						{{this.fun.initWithdrawal()}}
					</span>
				</li>
			</ul>
		</div>
		<h3>未{{this.fun.initWithdrawal()}}{{income_name_text}}</h3>
		<!--ico : "ico-commission" income : 0 title : "分销商" type : "commission" type_name : "分销佣金"-->
		<!-- <ul id="gongge"> -->
		<template>
			<yd-grids-group :rows="3">
					<yd-grids-item  :link="fun.getUrl('',{})" v-for="(plug,i) in plugs" :key='i'>
						<yd-icon slot="icon" :class="plug.ico" custom size="1.5rem" color="#FF685D"></yd-icon>
							<!-- <yd-icon slot="icon" :name="plug.ico" custom size="24px" color="#FF685D"></yd-icon> -->
							<span slot="text">{{plug.type_name}} <font>￥{{plug.income}}</font></span>
					</yd-grids-item>
			</yd-grids-group>
		</template>
			<!-- <li v-for="plug in plugs">
				<i :class="plug.ico"></i>
				<yd-icon slot="icon" name="shouyintai" custom size="24px" color="#FF685D"></yd-icon>
				<br />{{plug.type_name}}
				<br />
				<font>￥{{plug.income}}</font>元
			</li> -->
		<!-- </ul> -->
		<p class="mszf">
			<router-link :to="fun.getUrl('presentationRecord')">{{this.fun.initWithdrawal()}}明细
				<span></span>
				<i class="fa fa-angle-right"></i>
			</router-link>
		</p>
	</div>
</template>
<script>
import member_incomecontroller from './member_incomecontroller';
export default member_incomecontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#income {
	#userinfo {
		background: #FFF;
		margin-bottom: 0.625rem;
		ul {
			display: flex;
			align-items: center;
		}
		ul li:last-child {
			border: 0;
		}
		ul li {
			color: #8c8c8c;
			text-align: center;
			display: block;
			flex: 1;
		}
		ul li span {
			color: #222;
			font-size: 16px;
			margin-bottom: 0.3125rem;
			display: inline-block;
		}
		ul li {
			width: 33.3333%;
			margin: 0.625rem 0;
			box-sizing: border-box;
			font-size: 12px;
		}
		.tixi {
			color: #FFF;
			font-size: 14px;
			border: 0.0625rem solid #ff5757;
			border-radius: 0.875rem;
			background: #ff5757;
			padding: 0.1875rem 1rem;
			a {
				color: #FFF;
			}
		}
	}
	h3 {
		background: #f5f5f5;
		margin: 0;
		padding: 0 0.625rem;
		text-align: left;
		font-weight: normal;
		font-size: 0.75rem;
		height: 2rem;
		box-sizing: border-box;
		line-height: 2rem;
	}
	#gongge {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		background: #FFF;
		padding: 0.625rem 0;
		li {
			flex: 33% 0 0;
			flex-direction: row;
			i {
				font-size: 2.125rem;
				color: #CCCCCC;
				margin: 0.625rem 0;
			}
			font {
				color: #e84e40
			}
			a {
				color: #000000;
				img {
					width: 1.4375rem;
					margin: 0.3125rem 0;
				}
			}
		}
	}
	.mszf {
		background: #FFF;
		padding: 0 0.625rem;
		margin: 0;
		text-align: left;
		overflow: hidden;
		margin-top: 0.625rem;
		height: 2.75rem;
		box-sizing: border-box;
		line-height: 2.75rem;
		font-size: 14px;
		color: #333;
		i {
			font-size: 1.0625rem;
			float: right;
			line-height: 2.75rem;
		}
		span {
			float: left;
		}
		a {
			color: #000000;
			display: block;
		}
	}
}
</style>
