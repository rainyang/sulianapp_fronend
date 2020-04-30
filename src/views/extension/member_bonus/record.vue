<template>
  <div id="bonus_record">
    <c-title :hide="false" text="分红记录"></c-title>
    <div id="content">
      <van-tabs @click="tabHandel">
        <van-tab title="全部">
          <div class="reward_box">
            <van-pull-refresh
              v-model="isLoading"
              @refresh="getMoreList"
              :disabled="isAllLoaded"
            >
              <div class="reward_list" v-for="(item,i) in all_arr" :key='i'>
                <ul class="reward_ID">
                  <li>
                    <span>奖励记录ID:{{ item.scoring_sn }}</span>
                  </li>
                </ul>
                <ul class="reward_info">
                  <li>
                    <span>{{ item.has_one_member_level.level_name }}</span>
                    <span class="sum">{{ item.scoring_amount || 0 }}</span>
                  </li>
                  <li>
                    <span class="time">{{ item.created_at }}</span>
                    <span>{{ getStatus(item.status) }}</span>
                  </li>
                </ul>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="待审核">
          <div class="reward_box">
            <van-pull-refresh
              v-model="isLoading"
              @refresh="getMoreList"
              :disabled="isAllLoaded"
            >
              <div class="reward_list" v-for="(item,i) in auditing_arr" :key='i'>
                <ul class="reward_ID">
                  <li>
                    <span>奖励记录ID:{{ item.scoring_sn }}</span>
                  </li>
                </ul>
                <ul class="reward_info">
                  <li>
                    <span>{{ item.has_one_member_level.level_name }}</span>
                    <span class="sum">{{ item.scoring_amount || 0 }}</span>
                  </li>
                  <li>
                    <span class="time">{{ item.created_at }}</span>
                    <span>{{ getStatus(item.status) }}</span>
                  </li>
                </ul>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="通过">
          <div class="reward_box">
            <van-pull-refresh
              v-model="isLoading"
              @refresh="getMoreList"
              :disabled="isAllLoaded"
            >
              <div class="reward_list" v-for="(item,i) in pass_arr" :key='i'>
                <ul class="reward_ID">
                  <li>
                    <span>奖励记录ID:{{ item.scoring_sn }}</span>
                  </li>
                </ul>
                <ul class="reward_info">
                  <li>
                    <span>{{ item.has_one_member_level.level_name }}</span>
                    <span class="sum">{{ item.scoring_amount || 0 }}</span>
                  </li>
                  <li>
                    <span class="time">{{ item.created_at }}</span>
                    <span>{{ getStatus(item.status) }}</span>
                  </li>
                </ul>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="驳回">
          <div class="reward_box">
            <van-pull-refresh
              v-model="isLoading"
              @refresh="getMoreList"
              :disabled="isAllLoaded"
            >
              <div class="reward_list" v-for="(item,i) in reject_arr" :key='i'>
                <ul class="reward_ID">
                  <li>
                    <span>奖励记录ID:{{ item.scoring_sn }}</span>
                  </li>
                </ul>
                <ul class="reward_info">
                  <li>
                    <span>{{ item.has_one_member_level.level_name }}</span>
                    <span class="sum">{{ item.scoring_amount || 0 }}</span>
                  </li>
                  <li>
                    <span class="time">{{ item.created_at }}</span>
                    <span>{{ getStatus(item.status) }}</span>
                  </li>
                </ul>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import controller from "./record_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#bonus_record {
  padding-top: 40px;
  #content {
    .reward_box {
      .reward_list {
        background: #fff;
        margin-top: 0.5rem;
        .reward_ID {
          padding-left: 0.875rem;
          li {
            border-bottom: solid 0.0625rem #ebebeb;
            line-height: 2.5rem;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            padding-right: 0.875rem;
          }
        }
        .reward_info {
          padding: 0.625rem 0;
          li {
            line-height: 1.875rem;
            text-align: left;
            font-size: 15px;
            padding: 0 0.875rem;
            display: flex;
            justify-content: space-between;
            .time {
              line-height: 1.875rem;
              font-size: 12px;
              color: #8c8c8c;
            }
            .sum {
              color: #f15353;
            }
          }
        }
      }
    }
  }
}
</style>
