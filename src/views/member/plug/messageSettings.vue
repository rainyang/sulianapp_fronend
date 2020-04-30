<template>
    
    <div id="messageSettings">
    	<c-title :hide="false" text='消息提醒设置'></c-title>
    	<div style="height: 40px;"></div>
    	<h4>商城信息 提醒</h4>
    	<mt-cell :title="'选项 ' + value">
      		<mt-switch v-model="value" @change="switchItme"></mt-switch>
    	</mt-cell>
    	<mt-cell :title="'选项 ' + value">
      		<mt-switch v-model="value" ></mt-switch>
    	</mt-cell>
    	<mt-cell :title="'选项 ' + value">
      		<mt-switch v-model="value" ></mt-switch>
    	</mt-cell>
    </div>
   
</template>
<script>
import messageSettingsController from './messageSettingsController';
export default messageSettingsController;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>

#messageSettings{
	.mint-cell-title {text-align: left;}
	h4{margin: 0;line-height: 2.5rem;text-align: left;font-size: 16px;font-weight: normal;padding-left: 0.625rem;}
	a{color:#000;}
	ul{background: #FFF;overflow: hidden;}
	li{border-bottom: 0.0625rem #f0f0f0 solid;padding-left: 0.625rem;line-height:2.75rem;text-align: left;color: #000;}
	i{ float:left; color: #a8a8a8;font-size:26px;line-height:2.75rem;}
	.fa-star{margin-right: 0.625rem;}
	.fa-angle-right{color:#999;width: 1.25rem;float: right;}
}
</style>