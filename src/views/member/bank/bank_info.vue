<template>
	<div id="register">
		<c-title :hide="false" text='银行卡信息'></c-title>

		 <div style="height: 50px;"></div>
			<yd-cell-group>

				<yd-cell-item>
					<span slot="left">开户行：</span>
					<input slot="right" :readonly="status ? false : 'readonly'" type="text" placeholder="请输入开户行" v-model.trim="bank_name">
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">开户行省份：</span>
					<input slot="right" :readonly="status ? false : 'readonly'" type="text" placeholder="请输入开户行省份" v-model.trim="bank_province">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">开户行城市：</span>
					<input slot="right" :readonly="status ? false : 'readonly'" type="text" placeholder="请输入开户行城市" v-model.trim="bank_city">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">开户行支行：</span>
					<input slot="right" :readonly="status ? false : 'readonly'" type="text" placeholder="请输入开户行支行" v-model.trim="bank_branch">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">账号：</span>
          <p slot="right" v-if="!status" class="bank_id">{{bank_id}}</p>
					<input slot="right" v-if="status === true" type="number" placeholder="请输入账号" v-model.trim="bank_id">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">姓名：</span>
					<input slot="right" :readonly="status ? false : 'readonly'" type="text" placeholder="请输入姓名" v-model.trim="bank_user">
				</yd-cell-item>

			</yd-cell-group>


			<yd-button-group>
        <yd-button size="large" v-if="!status" type="danger" @click.native="change">点击编辑</yd-button>
				<yd-button size="large" v-else type="primary" @click.native="bind">提交</yd-button>
			</yd-button-group>







	</div>
</template>

<script>
import bank_info_controller from "./bank_info_controller";
export default bank_info_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#register {
  .bank_id {
    width: 100%;
    text-align: left;
  }
}
</style>
