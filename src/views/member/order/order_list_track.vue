<template >
	<div id="logistics">
		<c-title :hide="false"
		         text='物流详情'></c-title>
		<div style="height: 40px;"></div>
	
		<div class="my_wrapper">
			<span><img :src="thumb"/></span>
			<div class="my-value">
				<p><b> 物流状态</b>
					<font>{{status_name}}</font>
				</p>
				<p>配送司机：{{driver_name}}</p>
				<p>司机手机：{{phone}}</p>
			</div>
		</div>
	
		<div style="height: 0.625rem;"></div>
		<div
          id="container"
          style="width:100%; height:70vh"
      	></div>
		  
	</div>
</template>
<script>
import order_list_trackcontroller from './order_list_trackcontroller';
export default order_list_trackcontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#logistics {
	.my_wrapper {
		background: #FFF;
		overflow: hidden;
		display: flex;
		padding: 0.625rem;
		align-items: center;
		span {
			flex: 1;
			font-size: 16px;
			line-height: 1;
			img {
				width: 100%;
			}
		}
		.my-value {
			flex: 3;
			text-align: left;
			color: #8C8C8C;
			margin-left:0.625rem;
			b {
				color: #000000;
				font-size: 14px;
			}
			font {
				font-size: 14px;
				margin-left: 0.3125rem;
				color: #259B24
			}
			p {
				margin: 0;
				font-size: 12px;
			}
		}
	}
	#wlinfo {
		background: #FFF;
		margin-top: 0.625rem;
		color: #8C8C8C;
		padding-top: 0.625rem;
		li {
			border-left: 0.125rem solid #BBBBBB;
			text-align: left;
			padding: 0 0.625rem 0.625rem 1.25rem;
			margin-left: 1.25rem;
			position: relative;
			span {
				font-size: 12px;
				border-bottom: #dcdcdc 0.0625rem solid;
				display: block;
				line-height: 1.5rem;
			}
		}
		li:after {
			content: '.';
			border-radius: 50%;
			background: #8C8C8C;
			width: 0.625rem;
			height: 0.625rem;
			display: block;
			position: absolute;
			top: 0.125rem;
			left: -0.375rem;
		}
		li:first-child {
			color: #259B24;
		}
		li:first-child:after {
			background: #259B24;
			border: #42B983 0.25rem solid;
			// left: -0.625rem;
			top: 0px;
		}
	}
}
</style>