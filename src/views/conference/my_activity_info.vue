<template>
	<div id="all">
		<c-title :hide="false" text='活动报名信息'></c-title>
		<div style="height: 40px;"></div>



		<yd-cell-group>
			<yd-cell-item v-for="(item,i) in datas" :key='i'>
                <span slot="left">{{item.title}}</span>
                <span slot="right">{{item.value}}</span>
            </yd-cell-item>
			<!-- <yd-cell-item>
				<span slot="left">用户名：</span>
				<yd-input slot="right" readonly disabled v-model="input1"></yd-input>
			</yd-cell-item>

			<yd-cell-item>
				<span slot="left">用户名：</span>
				<yd-input slot="right" readonly disabled v-model="input1"></yd-input>
			</yd-cell-item> -->

		</yd-cell-group>
	</div>
</template>

<script>
import my_activity_info_controller from './my_activity_info_controller';
export default my_activity_info_controller;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/member.scss';

#tool ul li {
	width: 100% !important;
}

.title {
	
	flex: 2;
	background: #fff;
	height: 2.8125rem;
	line-height: 2.8125rem;
}

.info {
	height: 2.8125rem;
	flex: 8;
	width: vw;
	line-height: 2.8125rem;
	background: #fff;
}

.yd-cell-box {
	margin-bottom: 0 !important;
}

.yd-btn-block {
	margin-top: 0.1875rem;
}

.checkbox {
	background: #fff;
	padding-top: 0.625rem;
	padding-bottom: 0.625rem;
	border-bottom: 0.0625rem solid #ece9e9;
}
</style>
