<style lang="scss" rel="stylesheet/scss" scoped>
p,
ul,
li {
	margin: 0;
	padding: 0;
}

li {
	list-style: none;
}

#share {

	.m_header {
		width: 100%;
		height: 2.8125rem;
		padding-right: 0.9375rem;
		box-sizing: border-box;
		background: #fff;
		line-height: 2.8125rem;
		font-size: 18px;
		span {
			display: inline-block;
			width: 1rem;
			height: 1.5rem;
			float: left;
			margin-left: 0.625rem;
			font-size: 30px;
		}
		i {
			line-height: 48px;
			display: block;
			font-size: 14px;
			float: right;
			font-style: normal;
		}
	}
	.top {
		text-align: left;
		background: #fff;
		position: relative;
		text-align: center;
		i {

			font-style: normal;
			font-size: 14px;
			display: block;
			line-height: 48px;
		}
		.content {

			width: 7.5rem;
			margin: 0 auto;
			font-size: 16px;
			text-align: center;
			span {
				font-size: 28px;
				font-weight: bold;
				color: #333;
				display: inline-block;
			}
			b {
				line-height: 1.5rem;
				font-weight: normal;
				color: #fff;
				background: #f15353;
				width: 3.75rem;
				height: 1.5rem;
				display: inline-block;
			}
		}
	}
	.middle,
	.bott {
		text-align: left;
		padding: 0.625rem 0.75rem;
		line-height: 1.875rem;
		color: #343434;
		background: #fff;
		margin-bottom: 0.5rem;
	}
	.middle {
		display: flex;
		flex-wrap: wrap;
		.lrest {
			flex: 50%;
			color:#8c8c8c;
		}
		.resot {
			flex: 50%;
			text-align: right;
		}
	}
}
</style>
<template>
	<div id="share">
		<div>
	
			<c-title :hide="false" text='返现详情'></c-title>
			<div style="height:40px"></div>
			<div class="top">
				<i>已返现金额（元）</i>
				<div class="content">
					<span>{{amount}}</span>
				</div>
			</div>
			<div class="middle">
				<template>
					<div class="lrest" v-if="info">营业额</div>
					<div class="resot" v-if="info">{{turnover}}元</div>

					<div class="lrest" v-if="info">权益单价</div>
					<div class="resot" v-if="info">{{unit_price}}元/个</div>

					<div class="lrest" v-if="info">返现比例</div>
					<div class="resot" v-if="info">{{ratio}}%</div>

					<div class="lrest" v-if="info">返现总额</div>
					<div class="resot" v-if="info">{{amount_total}}元</div>

					<div class="lrest" v-if="info">剩余返现金额</div>
					<div class="resot" v-if="info">{{amount_surplus}}元</div>

					<div class="lrest">返现时间</div>
					<div class="resot">{{created_at}}</div>
				</template>
			</div>
		</div>
	</div>
</template>


<script>
import consume_return_list_info_controller from './consume_return_list_info_controller';
export default consume_return_list_info_controller;
</script>