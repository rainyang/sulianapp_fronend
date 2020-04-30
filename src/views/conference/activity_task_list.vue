<template>
	<div id="all">
		<c-title :hide="false" text='活动任务'></c-title>
<div style="height: 40px;"></div>

  <div>
        <div id="tool">
				<dt v-if="activityThumb"><img v-lazy="activityThumb" style="width: 100% ;height: 9.375rem;"/></dt>
			  </div>
      	<yd-cell-group title="活动名称">
			    <yd-cell-item>
                <span slot="left">{{activityName}}</span>
             </yd-cell-item>
		    </yd-cell-group>

        <yd-cell-group title="活动时间">
			    <yd-cell-item>
                <span slot="left">{{activityDate}}</span>
          </yd-cell-item>
		    </yd-cell-group>

        <yd-cell-group title="活动介绍">

           <div id="activity_content" v-html='activityContent'></div>
		    </yd-cell-group>
            </div>


 <div style="height: 1.25rem;"></div>

	<yd-cell-group title="活动任务">
<yd-accordion >
 <yd-accordion-item :title="item.title" v-for="(item,i) in activityTask" :key='i'>
        <div >
          <!-- <yd-cell-group title="任务名称">
			    <yd-cell-item>
                <span slot="left">{{item.title}}</span>
             </yd-cell-item>
		    </yd-cell-group> -->
	        <yd-cell-group title="任务进度">
              <yd-cell-item  v-for="(reward,i) in item.reward_detail.condition" :key='i'>
                  <span slot="left">{{reward.content}}</span>
                  <!-- <input slot="right" type="checkbox" value="Han MeiMei" v-model="checkbox1"/> -->
                  <yd-checkbox slot="right" shape="circle" v-model="reward.status" disabled>{{reward.status_name}}</yd-checkbox>
              </yd-cell-item>
 	        </yd-cell-group>

           <yd-cell-group title="任务奖励">
			          <yd-cell-item>
                    <yd-textarea slot="right" placeholder="任务奖励说明" maxlength="100" readonly :show-counter="false" v-model="item.reward_detail.reward_content"></yd-textarea>
                </yd-cell-item>
		      </yd-cell-group>
          <div style="height: 0.625rem;"></div>
          <yd-button-group>

                <yd-button size="large" type="primary"  disabled v-if="item.reward_status==0">领取奖励</yd-button>
                <yd-button size="large" type="primary" v-if="item.reward_status==1" @click.native="getReceive(item.id)">领取奖励</yd-button>
                <yd-button size="large" type="primary" disabled v-if="item.reward_status==2">已领取奖励</yd-button>
          </yd-button-group>
           <div style="height: 1.25rem;"></div>
        </div>
        </yd-accordion-item>
    </yd-accordion>
</yd-cell-group>









	</div>

</template>

<script>
import activity_task_list_controller from "./activity_task_list_controller";
export default activity_task_list_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/member.scss";

#tool ul li {
  width: 100% !important;
}

#activity_content {
  padding: 0.625rem;
  font-size: 14px;
  background: #fff;
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
