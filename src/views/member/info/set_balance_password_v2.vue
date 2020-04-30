<template >
	<div id="info">
		<c-title :hide="false" text='设置余额支付密码'></c-title>
		<div style="height: 40px;"></div>

		<yd-cell-group>
		<yd-cell-item @click.native="showPwdKeyboard" >
            <span slot="left">支付密码：</span>
            <yd-input slot="right" type="password" v-model="pwd" disabled readonly max="6" :show-success-icon="false" :show-error-icon="false" placeholder="请输入支付密码"></yd-input>
        </yd-cell-item>
		<yd-cell-item @click.native="showRePwdKeyboard" >
            <span slot="left">确认密码：</span>
            <yd-input slot="right" type="password" v-model="rePwd" disabled readonly max="6" :show-success-icon="false" :show-error-icon="false" placeholder="请输入确认密码"></yd-input>
        </yd-cell-item>
		
		</yd-cell-group>
		
		
		<yd-button-group>
        	<yd-button size="large" @click.native="setPwd" type="danger">确认</yd-button>
    	</yd-button-group>

		<div style="height: 0.625rem;"></div>

		<yd-keyboard v-model="isPwdShowKeyboard" title="安全键盘" input-text="请输入支付密码" :callback="pwdKeyboardDone" ref="keyboardDemo1"></yd-keyboard>
		<yd-keyboard v-model="isRePwdShowKeyboard" title="安全键盘" input-text="请输入确认密码" :callback="rePwdKeyboardDone" ref="keyboardDemo1"></yd-keyboard>
	</div>
</template>
<script>
import set_balance_password_v2_controller from './set_balance_password_v2_controller';
export default set_balance_password_v2_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#info span {
	font-size: 14px !important;
}

.tips {
	height: 2.5rem;
	background: #fff;
	padding-right: 0.625rem;
	padding-left: 0.625rem;
	line-height: 2.5rem;
	text-align: left;
}

.tips1 {
	height: 1.875rem;
	padding-right: 0.625rem;
	padding-left: 0.625rem;
	line-height: 1.875rem;
	text-align: right;
}

.code {
	height: 1.875rem;
	margin-top: 0.625rem;
	margin-right: 0.625rem;
	background: #ccc;
	padding: 0.1875rem 0.3125rem;
	border-radius: 0.3125rem;
}


.list1 {
	margin-top: 0.625rem;
	height: 2.75rem;
	width: 97%;
	background: #fff;
	padding: 0 0 0 3%;
	border-top: 0.0625rem solid #e6e1e1;
	font-size: 14px;
	line-height: 2.75rem;
	color: #333;
	text-align: left;
}

.list1 i.fa.fa-angle-right {
	float: right;
	line-height: 2.75rem;
	display: inline-block;
	font-size: 0.9rem;
	margin-right: 0.375rem;
	color: #929292;
	width: 1.25rem;
	height: 1.25rem;
	text-align: center;
	background-size: 1.25rem;
}

.fa-angle-right {
	color: #999;
	font-size: 1.625rem;
	float: right;
	line-height: 3.125rem;
	margin-left: 0.375rem;
	margin-right: 0.3125rem;
}

.btmobile {
	top: 0rem;
	line-height: 3rem;
	right: 100;
	width: 5rem;
	font-size: 12px;
	color: #f15353;
}

#info .mint-button {
	margin: 0 2%;
}

.maleall {
	background: #FFF;
	text-align: left;
}

.males {
	line-height: 3.125rem;
	display: flex;
	border-top: 0.0625rem solid #F3F3F3;
	margin-left: 0.625rem;
}

.maleall span {
	color: #888;
	font-size: 14px;
	vertical-align: middle;
	width: 28%;
	-webkit-box-flex: 0;
	-ms-flex: none;
	flex: none;
}

#address {
	flex: 1;
	line-height: 3.125rem;
	.mint-button--default {
		line-height: 3.125rem;
		text-align: left;
		font-size: 16px;
	}
}

#myimg {
	flex: 1;
	text-align: right;
}

.popup-con {
	width: 100%;
}

.el-upload img {
	width: 30%;
}

.avatar-uploader-icon {
	padding-right: 1.5625rem;
}

.mint-cell-wrapper {
	background: red;
}

.mint-button {
	margin: 0.3125rem 0;
}

#info .mint-cell-wrapper {
	padding: 0
}
</style>