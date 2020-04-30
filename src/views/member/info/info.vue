<template >
	<div id="info">
		<c-title :hide="false" text='我的信息'></c-title>
		<div style="height: 39px;"></div>
		<!--<div class="maleall">
									<label for="male"
									       class="males"><span>我的头像 </span>
										<div id="myimg">
											<el-upload class="avatar-uploader"
											           action="http://test.yunzshop.com/addons/yun_shop/api.php?i=2&route=member.member.uploadImg"
													   list-type="picture"
													   data="dfadsf"
													   name="avatar"
													   with-credentials="true"
											           :show-file-list="false"
													   :on-error = "handleAvatarErr"
											           :on-success="handleAvatarScucess"
											           :before-upload="beforeAvatarUpload">
												<img v-if="info_form.avatar"
												     :src="info_form.avatar"
												     class="avatar">
												<i v-else
												   class="el-icon-plus avatar-uploader-icon"></i><i class="fa fa-angle-right"></i>
											</el-upload>
										</div>
									</label>
								</div>-->
								
								<mt-datetime-picker
    ref="picker"
    type="time"
    v-model="pickerValue">
  </mt-datetime-picker>
		<mt-field label="姓名" v-model="info_form.realname" placeholder="请输入您的姓名"></mt-field>
		<mt-field label="绑定手机号" v-model="info_form.mobile" readonly placeholder="请输入手机号" type="tel" :attr="{ maxlength: 11 }" size="normal">
			<span v-if="type == 1" class='btmobile' @click="bindTel">{{bind_btn}}</span>
		</mt-field>
		<mt-field label="微信号"
								          v-model="info_form.wx"
								          placeholder="请输入微信号"></mt-field>
		<!--<mt-field label="联系电话"
								          v-model="info_form.telephone"
								          placeholder="请输入联系电话"
								          type="tel"></mt-field>-->
		<mt-field label="支付宝账号" v-model="info_form.alipay" placeholder="请输入支付宝账号"></mt-field>
		<mt-field label="账号姓名" v-model="info_form.alipay_name" placeholder="请输入支付宝账号姓名"></mt-field>
		<div class="maleall" v-if="isShowSex">
			<label for="male" class="males">
				<span>性别</span>
				<van-radio-group v-model="info_form.gender">
					<van-radio name="1">男</van-radio>
					<van-radio name="0">女</van-radio>
				</van-radio-group>
				<!--<el-radio class="radio" v-model="info_form.gender" label="1" id="male">男</el-radio>-->
				<!--<el-radio class="radio" v-model="info_form.gender" label="0" id="male">女</el-radio>-->
			</label>
		</div>


		


		<template v-if="isShowAddress">
			<div class="maleall">
				<label for="male" class="males">
					<span>所在省份 </span>
					<el-select v-model="provicevalue" placeholder="请选择省份" @change="selectProviceHandle">
						<el-option v-for="(item,i) in provinceoptions" :key='i' :label="item.areaname" :value="item">
						</el-option>
					</el-select>
				</label>
			</div>
			<div class="maleall">
				<label for="male" class="males">
					<span>所在城市 </span>
					<el-select v-model="cityvalue" placeholder="请选择城市" @change="selectCityHandle">
						<el-option v-for="(item,i) in cityoptions" :key='i' :label="item.areaname" :value="item">
						</el-option>
					</el-select>
				</label>
			</div>
			<div class="maleall">
				<label for="male" class="males">
					<span>所在区县 </span>
					<el-select v-model="regionvalue" placeholder="所在区县" @change="selectRegionHandle">
						<el-option v-for="(item,i) in regionoptions" :key='i' :label="item.areaname" :value="item">
						</el-option>
					</el-select>
				</label>
			</div>
			<mt-field label="" placeholder="请输入详细地址" v-model='info_form.address'></mt-field>
</template>

		<!--<mt-datetime-picker v-model="pickerVisible"
				                    type="date"
				                    year-format="{value} 年"
				                    month-format="{value} 月"
				                    date-format="{value} 日">
				</mt-datetime-picker>-->
		<mt-field label="生日" v-model="info_form.birthday" placeholder="请输入生日" type="date" v-if="isShowBirthday"></mt-field>



	<template v-for='cItem in customDatas'>
	<mt-field :label="cItem.name" v-model="cItem.value" :placeholder='"请输入"+cItem.name'>
	</mt-field>
</template>

		<div v-if="isBalancePwd" class="list1" @click="editBalancePwd()">
			<div class="ico extension"></div>余额支付密码
			<i class="fa fa-angle-right"></i>
		</div>

		<div class="list1" v-if="is_custom" @click="editCustom()">
			<div class="ico extension"></div>{{custom_title}} {{custom_value}}
			<i class="fa fa-angle-right"></i>
		</div>

			<div class="list1"  @click="editBank()">
			<div class="ico extension"></div>银行卡
			<i class="fa fa-angle-right"></i>
		</div>

		<div style="height: 1.875rem;"></div>
		<mt-button type="primary" size="large" @click="submitInfo($event)">确认修改</mt-button>
		<div style="height: 0.625rem;"></div>
	</div>
</template>
<script>
import info from './info_controller';
export default info;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#info span {
	font-size: 14px !important;
}

.list1 {
	
	margin-top: 0.625rem;
	height: 2.75rem;
	width: 100%;
	background: #fff;
	padding: 0 0 0 3%;
	border-top: 0.0625rem solid #e6e1e1;
	font-size: 14px;
	line-height: 2.75rem;
	color: #333;
	text-align: left;
}
.list2 {
	height: 2.75rem;
	width: 100%;
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
	font-size: 0.875rem;
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
