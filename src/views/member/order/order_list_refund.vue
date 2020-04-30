<template >
<div id="refund">
	<c-title :hide="false" :text="title"></c-title>
	<div style="height: 40px;"></div>
	<!-- <div class="my_wrapper" id="cause">
		<span>退款原因：</span>
		<div class="my-value">
			  <el-select v-model="form.reason" placeholder="请选择">
    				<el-option v-for="item in reasons"  :label="item" :value="item"></el-option>
  			  </el-select>
		</div>
	</div>
	<div class="my_wrapper">
		<span>退款金额：</span>
		<div class="my-value">{{money}}元</div>
	</div>
	<font>提示：您可退款的最大金额为{{money}}元</font>
	<div class="my_wrapper">
		<span>处理方式：</span>
		<div class="my-value">
			  <el-select v-model="form.refund_type" placeholder="请选择">
    				<el-option v-for="item in refundTypes"  :label="item.name" :value="item.value"></el-option>
  			  </el-select>
		</div>
	</div> -->
	
		<div class="info">
			<ul class="cause"  style='position:relative'>
				<li>退款原因：<span style='position:absolute;left:24%;z-index:999'>{{form.reason}}</span></li>
				<li class="select">
					<yd-button @click.native="show1 = true">请选择</yd-button>
					<i class="fa fa-angle-right"></i>
				</li>
			</ul>
			<ul class="sum">
				<li>退款金额：</li>
				<li class="right">{{money}}元</li>
			</ul>
		</div>
		<div class="prompt">提示：您的退款最大金额为{{money}}元</div>
		<div class="info">
			<ul class="mode" style='position:relative'>
				<li>退款方式：<span style='position:absolute;left:24%;z-index:999'>{{refundtype[form.refund_type]}}</span></li>
				<li class="select">
					<yd-button @click.native="show2 = true">请选择</yd-button>
					<i class="fa fa-angle-right"></i>
				</li>
			</ul>
			<!-- <ul class="explain">
				<li>退款说明：</li>
				<li class="right"><input type="text" placeholder="请输入退款说明"></li>
			</ul> -->
		</div>
		<div class="explain">
			<span>退款说明：</span>
			<textarea type="text" placeholder="请输入退款说明" maxlength="100" v-model='form.content'></textarea>
		</div>
	



	<!--<div class="my_wrapper" v-show="value=='B'">
		<span>快递单号</span>
		<div class="my-value">
			<el-input v-model="express_number" placeholder="请输入快递单号"></el-input>
		</div>
	</div>	-->



	<!-- <mt-field  v-model="form.content" label="退款说明：" placeholder="请输入退款说明" type="textarea" rows="1"></mt-field> -->
	<div style="height: 1.25rem;"></div>
	<mt-button type="primary" size="large" @click="confirmRefund">提交申请</mt-button>

	<yd-popup v-model="show1" position="bottom" height="60%">
		<div class="return-cause">
			<h1>退款原因</h1>
			<ul>
				<li v-for='(val,key,index) in reasontype' @click='changetext(val)' :key='index' >{{val}}</li>
			</ul>
		</div>
	</yd-popup>

	<yd-popup v-model="show2" position="bottom" height="60%">
		<div class="return-cause">
			<h1>处理方式</h1>
			<ul>
				<li v-for='(val,key,index) in refundtype' @click='changetype(key)' :key='index'>{{val}}</li>
			</ul>
		</div>
	</yd-popup>
</div>
</template>
<script>
import order_list_refundcontroller from './order_list_refundcontroller';
export default order_list_refundcontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#refund{    text-align: left;
	font{display: block;color: #8c8c8c;line-height: 2rem;padding: 0 0.625rem;font-size: 14px;}
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding: 0.625rem 0.875rem; align-items: center;
		span{width:5.375rem;flex: none;font-size: 16px;line-height: 1;}
		.my-value{color:#f15353;flex: 2;text-align: left;font-size:16px; span{color: red;}}
		.mint-popup{width: 100%;}
	}
	.el-select{
		width:100%;
	}
	
		
		.info{
			background-color: #fff;
			.cause,.mode{
				line-height: 2.75rem;
				margin-left:0.875rem;
				padding-right:0.875rem;
				border-bottom:solid 0.0625rem #ebebeb;
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				i{
					font-size:1.125rem;
					color:#999;
					margin-left:0.5rem;
				}
				li:nth-child(2){
					color:#8c8c8c;
				}
				input{
					text-align: right;
					width:90%;
					border:none;
				}
				.select{
					flex:2;
					text-align: right;
				}
				button{
					width: 90%;
					color:#999;
					text-align: right;
					padding:0;
					background-color: #fff;
				}
			}
			.sum,.explain{
				display: flex;
				padding:0 0.875rem;
				line-height: 2.75rem;
				font-size:14px;
				li:nth-child(2){
					color:#f15353;
				}
			}
			.explain{
				li:nth-child(2){
					flex:3;
				}
				input{
					border:none;
					width:100%;
					font-size:14px;
					color:#8c8c8c;
				}
			}
			.sum .right,.explain .right{
				padding-left:0.625rem;
			}
			
		}
		.explain{
			background-color: #fff;
			padding:0 0.875rem 0.875rem 0.875rem;
			font-size:14px;
			span{
				line-height: 2.75rem;
				text-align: left;
			}
			textarea{
				border:none;
				background-color: #fafafa;
				width:100%;
				height:4.5rem;
				border-radius: 0.25rem;
				padding:0.375rem;
				line-height: 1.25rem;
				color:#8c8c8c;
				font-size:12px;
			}
		}
		.prompt{
			line-height: 1.875rem;
			padding:0 0.875rem;
			font-size:12px;
			color:#8c8c8c;
		}
	.return-cause{
		h1{
			line-height: 2.8125rem;
			text-align: center;
			font-size:14px;
			border-bottom:solid 1px #e2e2e2;
		}
		ul{
			padding:0.625rem 0.875rem 0 0.875rem;
			li{
				line-height: 2.25rem;
			}
		}
	}
}
</style>