<!-- 分期购车 分红奖励记录详情 -->
<template>
  <div id="dividend_detail">
    <c-title :hide="false" text="奖励记录详情"></c-title>
    <div class="content">
      <div class="background">
        <div class="user">
          <div class="user-head">
            <img :src="memberData.avatar_image" />
          </div>
          <div class="user-name">{{ memberData.username }}</div>
        </div>
      </div>
      <div class="absolute-block">
        <div class="right">
          <span class="first"><b>累计奖励</b></span>
          <span class="second">{{ memberData.amount_total }}</span>
        </div>
        <div class="line"></div>
        <div class="right">
          <span class="first"><b>待奖励</b></span>
          <span class="second">{{ memberData.amount_wait }}</span>
        </div>
      </div>
      <div class="list">
        <div id="tabs">
          <div
            class="tab-first tab"
            :id="0"
            @click="onClick(0)"
            :class="[current == 0 ? 'bgColor' : '']"
          >
            <span>奖励记录</span>
          </div>
          <div
            class="tab-second tab"
            @click="onClick(1)"
            :id="1"
            :class="[current == 1 ? 'bgColor' : '']"
          >
            <span>额外奖励队列</span>
          </div>
        </div>
        <mt-loadmore :top-method="loadTop" ref="award_loadmore" id="olis">
          <div
            class="award-list"
            :class="[!fun.isTextEmpty(dividend) ? 'bgBai' : '']"
            v-show="current == 0"
          >
            <ul>
              <li
                class="list-item"
                v-for="(item, index, key) in dividend"
                :key="index"
              >
                <div class="firstMain">
                  <img
                    :src="
                      item.member
                        ? item.member.avatar_image
                        : '../../../assets/images/photo-mr.jpg'
                    "
                    alt=""
                  />
                  <div class="child">
                    <div class="name">
                      {{ item.member ? item.member.username : "" }}
                    </div>
                    <div class="money">￥{{ item.amount }}</div>
                    <div class="time">{{ item.created_at }}</div>
                    <div class="other">{{ item.type_name }}</div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="blank" v-if="fun.isTextEmpty(dividend)">
              <img src="../../../assets/images/blank.png" />
              <span>还没有记录哦</span>
            </div>
          </div>
        </mt-loadmore>
        <mt-loadmore :top-method="careTop" ref="care_loadmore" id="olis">
          <div
            class="care-list"
            :class="[!fun.isTextEmpty(care) ? 'bgBai' : '']"
            v-show="current == 1"
          >
            <ul v-if="!fun.isTextEmpty(care)">
              <li class="list-item">
                <div class="firstMain">
                  <img
                    :src="
                      care.member
                        ? care.member.avatar_image
                        : '../../../assets/images/photo-mr.jpg'
                    "
                    alt=""
                  />
                  <div class="child">
                    <div class="name">
                      {{ care.member ? care.member.username : "" }}
                    </div>
                    <div class="money">{{ care.status_name }}</div>
                    <div class="time">{{ care.created_at }}</div>
                  </div>
                </div>
                <div class="hide">
                  <ul>
                    <li>
                      <span class="first">奖励总额</span
                      ><span
                        ><b>￥{{ care.amount_total }}</b></span
                      >
                    </li>
                    <li>
                      <span class="first">奖励周期</span
                      ><span
                        ><b>{{ care.period_months }}</b></span
                      >
                    </li>
                    <li>
                      <span class="first">已奖励次数</span
                      ><span
                        ><b>{{ care.award_count }}</b></span
                      >
                    </li>
                    <li>
                      <span class="first">奖励金额</span
                      ><span
                        ><b>{{ care.amount_unit }}</b></span
                      >
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="blank" v-if="fun.isTextEmpty(care)">
              <img src="../../../assets/images/blank.png" />
              <span>还没有记录哦</span>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import cTitle from "components/title";
import { Toast } from "mint-ui";
import { scrollMixin } from "../../../utils/mixin";
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      current: 0,
      bonus: {},
      dividend: [],
      care: {},
      isLoadMore: true,
      page: 1,
      total_page: 0,
      carePage: 1,
      care_total_page: 0,
      iscareMore: true,
      memberData: {
        amount_total: "",
        amount_wait: ""
      }
    };
  },

  activated() {
    this.initData();
    this.getMember();
    this.current = 0;
    this.getData();
    console.log("params 推广组id", this.$route.params.id);
  },

  components: { cTitle },
  computed: {},
  methods: {
    loadTop() {
      this.initData();
      this.getData();
      this.$refs.award_loadmore.onTopLoaded();
    },
    careTop() {
      this.initCare();
      this.getData();
      this.$refs.care_loadmore.onTopLoaded();
    },
    change(item) {
      item.status = !item.status;
    },
    changeCare(list) {
      list.status = !list.status;
    },
    initData() {
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
      this.dividend = [];
    },
    initCare() {
      this.carePage = 1;
      this.care_total_page = 0;
      this.iscareMore = true;
      this.care = {
        member: ""
      };
    },
    getMember() {
      $http
        .get(
          "plugin.instalments-award.frontend.log.getInfo",
          { rid: this.$route.params.id },
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.memberData = response.data.member;
            this.memberData.amount_total = response.data.amount_total;
            this.memberData.amount_wait = response.data.amount_wait;
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData() {
      let that = this;
      let url =
        this.current == 0
          ? "plugin.instalments-award.frontend.log.getLogList"
          : "plugin.instalments-award.frontend.log.getQueue";
      let json = {
        page: this.current == 0 ? this.page : this.carePage,
        rid: this.$route.params.id
      };
      $http.get(url, json, "获取中").then(
        response => {
          if (response.result == 1) {
            if (that.current == 0) {
              that.isLoadMore = true;
              that.total_page = response.data.logs.last_page;
              if (that.total_page) {
                that.total_page = 0;
              }
              that.dividend = response.data.logs.data;
            } else if (that.current == 1) {
              that.care = response.data.queue;
            }
          } else {
            Toast(response.msg);
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    getMoreData(page) {
      if (this.current == 1) {
        return;
      }
      let that = this;
      let url = "plugin.instalments-award.frontend.log.getLogList";
      if (this.page === this.total_page) {
        return;
      }
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        let json = {
          page: this.page,
          rid: this.$route.params.id
        };
        this.page = this.page + 1;
        $http.get(url, json, "加载中").then(
          function(response) {
            if (response.result === 1) {
              var arr = response.data.logs.data;
              that.dividend = that.dividend.concat(arr);
            } else {
              that.page = that.page - 1;
              that.isLoadMore = false;
              return;
            }
          },
          function(response) {
            // error callback
          }
        );
      }
    },
    onClick(index) {
      this.current = index;
      if (index == 0) {
        this.initData();
      } else if (index == 1) {
        this.initCare();
      }
      let tab = document.getElementById("tabs");
      let tabChild = tab.getElementsByClassName("tab");
      this.current = tabChild[index].getAttribute("id");
      this.getData();
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#dividend_detail {
  padding-top: 40px;
  .content {
    .background {
      width: 100%;
      height: 10rem;
      background: #f15353;
      display: flex;
      padding-top: 1rem;
      justify-content: center;
      .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        .user-head {
          height: 4rem;
          width: 4rem;
          background: #fff;
          border-radius: 50%;
          border: 0.125rem solid #fff;
          box-sizing: border-box;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .user-head img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .user-name {
          font-size: 16px;
          color: #fff;
          width: 8.5rem;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
        }
      }
    }
    .absolute-block {
      width: 22rem;
      background-color: #ffffff;
      border-radius: 0.5rem;
      margin: 0 auto;
      transform: translateY(-40%);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0.8rem 1rem;
      .top_left {
        width: 50%;
        text-align: left;
        color: #999999;
        margin-bottom: 0.625rem;
      }
      .top_right {
        width: 50%;
        text-align: right;
        color: #999999;
        margin-bottom: 0.625rem;
      }
      .left {
        width: 33%;
        display: flex;
        flex-direction: column;
        .first {
          color: #000000;
          font-size: 16px;
        }
        .second {
          font-size: 14px;
          color: #333;
        }
      }
      .right {
        width: 49%;
        display: flex;
        flex-direction: column;
        .first {
          color: #000000;
          font-size: 16px;
        }
        .second {
          font-size: 12px;
          color: #333;
        }
      }
      .line {
        height: 3rem;
        width: 1px;
        background-color: #d1d1d1;
      }
    }
    .list {
      width: 22rem;
      margin: 0 auto;
      border-radius: 0.5rem;
      margin-top: -1rem;
      margin-bottom: 1rem;
      background-color: #fff;
      #tabs {
        width: 100%;
        display: flex;
        .tab {
          height: 2rem;
          line-height: 2rem;
          background-color: #fff;
          color: #aaaaaa;
          font-size: 14px;
          width: 50%;
          position: relative;
          span {
            line-height: 2rem;
            display: inline-block;
          }
        }
        .tab:first-child {
          border-top-left-radius: 0.5rem;
        }
        .tab:last-child {
          border-top-right-radius: 0.5rem;
        }
        .tab-first::after {
          content: "";
          position: absolute;
          right: 0;
          width: 0;
          height: 2rem;
          border-bottom: 2rem solid #fff;
          border-left: 0.6rem solid transparent;
        }
        .tab-second::before {
          content: "";
          position: absolute;
          left: 0;
          width: 0;
          height: 2rem;
          border-bottom: 2rem solid #fff;
          border-right: 0.6rem solid transparent;
        }
      }
      .award-list {
        padding: 1rem;
        text-align: left;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        ul {
          .list-item {
            display: flex;
            flex-wrap: wrap;
            border-bottom: solid 1px #f3f3f3;
            padding-bottom: 0.625rem;
            padding-top: 0.625rem;
            .list-item:first-child {
              padding-top: 0;
            }
            .block {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .left {
              .stateClass {
                border: 1px solid #ff6000;
                color: #ff6000;
                border-radius: 0.438rem;
                font-size: 12px;
                padding: 0 0.25rem;
                margin-left: 0.25rem;
              }
              .date {
                color: #c1c1c1;
                font-size: 12px;
                margin-top: 0.35rem;
              }
            }
            .right {
              font-size: 18px;
              color: #ff6000;
            }
            .hide {
              display: flex;
              justify-content: center;
              width: 100%;
              padding-top: 1rem;
              ul {
                display: flex;
                width: 100%;
                li {
                  display: flex;
                  width: 33.3%;
                  justify-content: center;
                  flex-direction: column;
                  text-align: center;
                  font-size: 12px;
                  border-right: solid 1px #e1e1e1;
                  .first {
                    margin-bottom: 0.5rem;
                  }
                }
                li:last-child {
                  border-right: none;
                }
              }
            }
          }
        }
      }
      .care-list {
        padding: 1rem;
        text-align: left;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        ul {
          .list-item {
            display: flex;
            flex-wrap: wrap;
            border-bottom: solid 1px #f3f3f3;
            padding-bottom: 0.625rem;
            padding-top: 0.625rem;
            .list-item:first-child {
              padding-top: 0;
            }
            .block {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .left {
              .date {
                color: #c1c1c1;
                font-size: 12px;
                margin-top: 0.35rem;
              }
            }
            .right {
              font-size: 18px;
              color: #ff6000;
            }
            .hide {
              display: flex;
              justify-content: center;
              width: 100%;
              padding-top: 1rem;
              ul {
                display: flex;
                width: 100%;
                li {
                  display: flex;
                  width: 25%;
                  font-size: 12px;
                  justify-content: center;
                  flex-direction: column;
                  text-align: center;
                  border-right: solid 1px #e1e1e1;
                  .first {
                    margin-bottom: 0.5rem;
                  }
                }
                li:last-child {
                  border-right: none;
                }
              }
            }
          }
        }
      }
    }
    .firstMain {
      display: flex;
      width: 100%;
      img {
        width: 2.5rem;
        height: 2.5rem;
      }
      .child {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0.5rem;
        .name,
        .money,
        .time,
        .other {
          width: 50%;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
          text-align: left;
          color: #999999;
          line-height: 1rem;
        }
        .name {
          font-size: 0.875rem;
          font-weight: bold;
          color: #333333;
        }
        .money {
          color: #ff7459;
        }
        .money,
        .other {
          margin-top: 0.25rem;
          text-align: right;
        }
      }
    }
    .blank {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 6rem;
        height: 6rem;
      }
      span {
        margin-top: 15px;
        color: #ccc;
        font-size: 14px;
      }
    }
  }
  .bgColor {
    background-color: #fff !important;
    color: #ff7459 !important;
    span {
      border-bottom: 2px solid #ff7459;
    }
  }
  .bgBai {
    background-color: #fff;
  }
}
</style>
