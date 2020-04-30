<style lang="scss" rel="stylesheet/scss" scoped>
* {
	box-sizing: border-box;
}

#share {
	#tabs {
		margin-top: 40px;
		.shareList {
			li {
				background: #fff;
				height: 5rem;
				padding: 0.625rem 0.9375rem;
				margin-bottom: 0.4375rem;
				line-height: 1.875rem;
				div.lf {
					text-align: left;
					span {
						color: #484848;
					}
					p {
						color: #a8a8a8;
						font-size: 12px
					}
				}
				div.rt {
					text-align: right;
					color: #a8a8a8;
					font-size: 12px;
					span {
						color: #f15353;
						font-size: 14px;
					}
				}
			}
		}
	}
}
</style>
<template>
	<div id="share">
	
		<c-title :hide="false" text='店主中心'></c-title>
	
		<div id="tabs">
			<mt-navbar v-model="activeName">
				<mt-tab-item id="first" @click.native="handleClick('0')">全部</mt-tab-item>
				<mt-tab-item id="second" @click.native="handleClick('1')">未结算</mt-tab-item>
				<mt-tab-item id="third" @click.native="handleClick('2')">已结算</mt-tab-item>
				<mt-tab-item id="fourth" @click.native="handleClick('3')">已失效</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="activeName">
			<!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
				<mt-tab-container-item id="first">
				<!--<el-tab-pane label="全部" name="first">-->
					<ul class="shareList">
						<li v-if="first_content" :key='i' v-for="(elem,i) in first_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
					<div v-if="!first_content">您还未下订单，赶快去商城选购吧~</div>
				<!--</el-tab-pane>-->
				</mt-tab-container-item>
				<mt-tab-container-item id="second">
				<!--<el-tab-pane label="未结算" name="second">-->
					<ul class="shareList">
						<li v-if="second_content" :key='i' v-for="(elem,i) in second_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
	
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
					<div v-if="!second_content">您还未下订单，赶快去商城选购吧~</div>
				<!--</el-tab-pane>-->
				</mt-tab-container-item>
				<mt-tab-container-item id="third">
				<!--<el-tab-pane label="已结算" name="third">-->
					<ul class="shareList">
						<li v-if="third_content" :key='i' v-for="(elem,i) in third_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
	
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
	
					<div v-if="!third_content">您还未下订单，赶快去商城选购吧~</div>
				<!--</el-tab-pane>-->
				</mt-tab-container-item>
				<mt-tab-container-item id="fourth">
				<!--<el-tab-pane label="已失效" name="fourth">-->
					<ul class="shareList">
						<li v-if="fourth_content" :key='i' v-for="(elem,i) in fourth_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
	
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
	
					<div v-if="!fourth_content">您还未下订单，赶快去商城选购吧~</div>
				<!--</el-tab-pane>-->
				</mt-tab-container-item>
			</mt-tab-container>
			<!--</el-tabs>-->
		</div>
	</div>
</template>


<script>
import shareList_controller from './shareList_controller';
export default shareList_controller;
</script>




























<!--<style  lang="scss" rel="stylesheet/scss" scoped>
	
</style>

<template>
   
</template>

<script>
    
</script>
-->
