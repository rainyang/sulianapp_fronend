<template>
	<div id="payment">
		<c-title :hide="false"
		         text='我的订单'></c-title>
		<div style="height: 87px;"></div>
		<mt-navbar v-model="selected"
		           fixed>
			<mt-tab-item id="0"
			             @click.native="swichTabTItem">全部</mt-tab-item>
			<mt-tab-item id="1"
			             @click.native="swichTabTItem"> 待付款</mt-tab-item>
			<mt-tab-item id="2"
			             @click.native="swichTabTItem">待充值</mt-tab-item>
			<mt-tab-item id="3"
			             @click.native="swichTabTItem">已完成</mt-tab-item>
			<!--<mt-tab-item id="4"
			             @click.native="swichTabTItem">已完成</mt-tab-item>-->
		</mt-navbar>
	
 <mt-loadmore v-if="goload"
		             :top-method="loadTop"
		             :bottom-method="loadBottom"
		             :bottom-all-loaded="allLoaded"
		             ref="loadmore"
		             bottomPullText=''
		             bottomDropText='下拉加载...'
		             bottomLoadingText=''
		             :autoFill='true' id='olis'>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="0">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction"
					            v-on:ToDetailNotification="toDetail"
					            :datasource="orderList"
					            :status="0"  class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="1">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction"
					            v-on:ToDetailNotification="toDetail"
								v-on:MultiplePayNotification="multiplePayAction"
					            :datasource="waitPayList"
								ref="mychild"
					            :status="1" class='osll'></cOrderList>
					    <div style="height: 45px;"></div>        
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction"
					            v-on:ToDetailNotification="toDetail"
					            :datasource="waitSendList"
					            :status="2" class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction"
					            v-on:ToDetailNotification="toDetail"
					            :datasource="waitReceiveList"
					            :status="3" class='osll'></cOrderList>
				</mt-tab-container-item>

			</mt-tab-container>
		</mt-loadmore>
		<div class="contes" v-if="isMultiplePay"><button @click="toMultiplePay">合并支付</button></div>
		<!--<div class="loadNomore"
			     v-show='loading'><img src="assets/images/no-more-product.png" /></div>-->
	</div>
</template>
<script>
import orderListController from './order_listController';
export default orderListController;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.osll{min-height: 100vh;}
.contes{position: fixed;bottom: 0;width: 100%;height: 2.1875rem;background: #FFF;line-height: 2.1875rem;border-top: #e2e2e2 solid 0.0625rem;text-align: right;
	button{border: solid 0.0625rem #f15353;background: #FFF;border-radius: 0.875rem;margin-right: 0.3125rem;color: #f15353;}
}
.loadNomore img {
	width: 20%;
}

#payment {
	
	.mint-navbar.is-fixed {
		top: 2.5rem;
	}
}
</style>