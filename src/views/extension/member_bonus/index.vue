<template>
  <div id="member_bonus">
    <c-title :hide="false" :text="title"></c-title>
    <div id="content">
      <div class="user">
        <div class="header">
          <img :src="avatar" />
        </div>
        <ul class="name">
          <li class="name_a">{{ nickname }}</li>
          <li class="name_b">{{ level }}</li>
        </ul>
      </div>
      <div class="record">
        <router-link :to="fun.getUrl('MemberBonusRecord')">
          <ul class="list">
            <li>
              计分记录<span>计分金额：{{ amount || "" }}</span
              ><i class="fa fa-angle-right"></i>
            </li>
          </ul>
        </router-link>
      </div>
      <div class="record_reward">
        <div class="nav_box">
          <ul class="nav">
            <li
              v-for="(item, index) in tab1_arr"
              :class="{ cur: index == tab1_arr_index }"
              @click.stop="tab1Toggle(index)"
			  :key='index'
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 分红记录 -->
        <div class="nav_record" v-show="bonus_show">
          <van-tabs @click="tabHandel">
            <van-tab :title="distribution_commission">
              <div class="record_box">
                <van-pull-refresh
                  v-model="isLoading"
                  @refresh="getMoreBonusList"
                  :disabled="allLoaded"
                >
                  <div class="record_list" v-for="(item,i) in dc_list" :key='i'>
                    <ul class="box" @click="item.show = !item.show">
                      <li>
                        <span
                          >会员等级（{{
                            item.buy_member.level.level_name
                          }}）</span
                        >
                        <span class="sum">{{ item.dividend_amount }}</span>
                      </li>
                      <li>
                        <span>计分金额：{{ item.scoring_amount || 0 }}</span>
                        <span class="time">{{ item.created_at }}</span>
                      </li>
                    </ul>
                    <!-- 点击显示 -->
                    <transition name="fade">
                      <div class="reward_ratio" v-show="item.show">
                        <div class="reward_user">
                          <div class="header">
                            <img
                              :src="item.buy_member.has_one_member.avatar_image"
                            />
                          </div>
                          <ul class="name">
                            <li class="name_a">
                              {{ item.buy_member.has_one_member.nickname }}
                            </li>
                            <li class="grade">
                              {{ item.buy_member.level.level_name }}
                            </li>
                          </ul>
                        </div>
                        <ul class="ratio">
                          <li>
                            <span>奖励比例</span>
                            <span>{{ item.dividend_rate || "" }}</span>
                          </li>
                        </ul>
                      </div>
                    </transition>
                  </div>
                </van-pull-refresh>
              </div>
            </van-tab>
            <van-tab :title="shop_bonus">
              <div class="record_box">
                <van-pull-refresh
                  v-model="isLoading"
                  @refresh="getMoreBonusList"
                  :disabled="allLoaded"
                >
                  <div class="record_list" v-for="(item,i) in sb_list" :key='i'>
                    <ul class="box" @click="item.show = !item.show">
                      <li>
                        <span
                          >会员等级（{{
                            item.buy_member.level.level_name
                          }}）</span
                        >
                        <span class="sum">{{ item.dividend_amount }}</span>
                      </li>
                      <li>
                        <span>计分金额：{{ item.scoring_amount || 0 }}</span>
                        <span class="time">{{ item.created_at }}</span>
                      </li>
                    </ul>
                    <!-- 点击显示 -->
                    <transition name="fade">
                      <div class="reward_ratio" v-show="item.show">
                        <div class="reward_user">
                          <div class="header">
                            <img
                              :src="item.buy_member.has_one_member.avatar_image"
                            />
                          </div>
                          <ul class="name">
                            <li class="name_a">
                              {{ item.buy_member.has_one_member.nickname }}
                            </li>
                            <li class="grade">
                              {{ item.buy_member.level.level_name }}
                            </li>
                          </ul>
                        </div>
                        <ul class="ratio">
                          <li>
                            <span>奖励比例</span>
                            <span>{{ item.dividend_rate || "" }}</span>
                          </li>
                        </ul>
                      </div>
                    </transition>
                  </div>
                </van-pull-refresh>
              </div>
            </van-tab>
            <van-tab :title="thanks_award">
              <div class="record_box">
                <van-pull-refresh
                  v-model="isLoading"
                  @refresh="getMoreBonusList"
                  :disabled="allLoaded"
                >
                  <div class="record_list" v-for="(item,i) in ta_list" :key='i'>
                    <ul class="box" @click="item.show = !item.show">
                      <li>
                        <span
                          >会员等级（{{
                            item.buy_member.level.level_name
                          }}）</span
                        >
                        <span class="sum">{{ item.dividend_amount }}</span>
                      </li>
                      <li>
                        <span>计分金额：{{ item.scoring_amount || 0 }}</span>
                        <span class="time">{{ item.created_at }}</span>
                      </li>
                    </ul>
                    <!-- 点击显示 -->
                    <transition name="fade">
                      <div class="reward_ratio" v-show="item.show">
                        <div class="reward_user">
                          <div class="header">
                            <img
                              :src="item.buy_member.has_one_member.avatar_image"
                            />
                          </div>
                          <ul class="name">
                            <li class="name_a">
                              {{ item.buy_member.has_one_member.nickname }}
                            </li>
                            <li class="grade">
                              {{ item.buy_member.level.level_name }}
                            </li>
                          </ul>
                        </div>
                        <ul class="ratio">
                          <li>
                            <span>奖励比例</span>
                            <span>{{ item.dividend_rate || "" }}</span>
                          </li>
                        </ul>
                      </div>
                    </transition>
                  </div>
                </van-pull-refresh>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <!-- 消费奖励 -->
        <div class="nav_reward" v-show="record_show">
          <van-pull-refresh
            v-model="record_isLoading"
            @refresh="getMoreRecordList"
            :disabled="record_allLoaded"
          >
            <div class="reward_list" v-for="(item,i) in record_list" :key='i'>
              <ul class="reward_ID">
                <li>
                  <span>奖励记录ID:{{ item.id }}</span>
                  <span class="sum">{{ item.reward_amount || 0 }}</span>
                </li>
              </ul>
              <ul class="reward_info">
                <li>奖金池金额：{{ item.bonus_pool }}</li>
                <li>奖励比例：{{ item.reward_rate }}</li>
                <li>奖励人数：{{ item.reward_num }}</li>
                <span class="time">{{ item.created_at }}</span>
              </ul>
            </div>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import controller from "./index_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#member_bonus {
  padding-top: 40px;
  #content {
    .user {
      background: #f15353;
      padding: 1.25rem;
      display: flex;
      .header {
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        border: solid 0.125rem #fff;
        overflow: hidden;
        margin-right: 0.625rem;
        img {
          width: 100%;
        }
      }
      .name {
        li {
          line-height: 1.5rem;
          color: #fff;
          text-align: left;
        }
        .name_a {
          font-size: 16px;
          max-width: 16.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .name_b {
          font-size: 14px;
        }
      }
    }
    .record {
      background: #fff;
      .list {
        display: flex;
        li {
          padding: 0 0.875rem;
          line-height: 2.875rem;
          font-size: 16px;
          text-align: left;
          span {
            margin-left: 0.375rem;
            color: #8c8c8c;
            font-size: 14px;
          }
        }
        i {
          font-size: 1.5rem;
          color: #c9c9c9;
          line-height: 2.875rem;
          position: absolute;
          right: 0.875rem;
        }
      }
    }
    .record_reward {
      margin-top: 0.625rem;
      .nav_box {
        background: #fff;
        padding: 0.375rem 0;
        border-bottom: solid 0.0625rem #ebebeb;
        .nav {
          border: solid 0.0625rem #f15353;
          display: flex;
          margin: 0 auto;
          width: 15rem;
          border-radius: 0.375rem;
          li {
            width: 7.5rem;
            height: 1.875rem;
            line-height: 1.875rem;
            font-size: 14px;
            color: #666;
          }
          .cur {
            background: #f15353;
            color: #fff;
          }
        }
      }
      .nav_record {
        .record_box {
          .record_list {
            margin-top: 0.5rem;
            .box {
              padding: 0.625rem 0.875rem;
              background: #fff;
              li {
                line-height: 1.875rem;
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                .sum {
                  color: #f15353;
                }
                .time {
                  font-size: 12px;
                  color: #8c8c8c;
                }
              }
            }
            .reward_ratio {
              background: #fff;
              padding-bottom: 0.625rem;
              border-top: solid 0.0625rem #ebebeb;
              .reward_user {
                padding: 0.875rem;
                display: flex;
                .header {
                  width: 2.5rem;
                  height: 2.5rem;
                  border-radius: 1.25rem;
                  overflow: hidden;
                  margin-right: 0.625rem;
                  background: #f2f2f2;
                  img {
                    width: 100%;
                  }
                }
                .name {
                  li {
                    text-align: left;
                    line-height: 1.25rem;
                    font-size: 15px;
                  }
                  .name_a {
                    max-width: 16.25rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .grade {
                    font-size: 12px;
                    color: #8c8c8c;
                  }
                }
              }
              .ratio {
                padding: 0 0.875rem;
                li {
                  line-height: 1.875rem;
                  display: flex;
                  justify-content: space-between;
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
      .nav_reward {
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
              .sum {
                color: #f15353;
              }
            }
          }
          .reward_info {
            padding: 0.625rem 0;
            position: relative;
            li {
              line-height: 1.875rem;
              text-align: left;
              font-size: 15px;
              padding: 0 0.875rem;
            }
            .time {
              position: absolute;
              right: 0.875rem;
              top: 0.625rem;
              line-height: 1.875rem;
              font-size: 12px;
              color: #8c8c8c;
            }
          }
        }
      }
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      transition: opacity 0.003s;
    }
  }
}
</style>
