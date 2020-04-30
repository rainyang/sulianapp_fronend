<template>
  <div>
    <div id="member-all"
         v-show="template"
         :class="[this.fun.getPhoneEnv() == 3?'pcStyle':''] ">
      <!--<mt-loadmore-->
      <!--:top-method="loadTop"-->
      <!--:top-status.sync="topStatus"-->
      <!--@top-status-change="handleTopChange"-->
      <!--ref="loadmore"-->
      <!--&gt;-->

      <!--装修修改部分 start-->
      <template v-for="(item, index) in designer">
        <component v-if="item.params && member_order.order"
                   :is="item.temp"
                   :datas="item"
                   :isClick="isClick"
                   :Params="item.params"
                   :Order="item.data"
                   :member_item="member_item"
                   :all="designer.length"
                   :index="index"
                   :member_order="member_order"
                   @openQrCode="openQrCode">
        </component>
      </template>

      <section v-show="template == '03'">
        <div class="home"
             v-if="showDiy">
          <template v-for="(item, index) in showDiy">
            <component :is="item.temp"
                       :datas="item"
                       :home="true"
                       :index="index"
                       :all="designer.length-1"
                       >
            </component>
          </template>
          <!-- <div style="height: 3.3125rem;"></div> -->
        </div>
        <mt-button type="primary"
                   size="large"
                   @click="outInfo($event)"
                   v-if="myType == 5 || wechat_login_mode">退出登录
        </mt-button>
        <div class="copyright">©{{ copyright }}&nbsp;</div>
        <div class="copyright">v1.1.026
          <template v-if="fun.isApp()">
            <router-link :to="fun.getUrl('userAgreement',{},{show: 'agreement'})">用户协议</router-link>
            和
            <router-link :to="fun.getUrl('userAgreement',{},{show: 'privacy'})">隐私政策</router-link>
          </template>
        </div>

        <div style="height: 3.75rem;clear: both;"></div>
      </section>

      <!--装修修改部分 end-->

      <div id="member"
           style="position:relative;"
           v-show="template != '03'">
        <div class="header">
          <div class="header-info">
            <div class="left">
              <img :src="avatar" />
            </div>
            <div class="user-info">
              <div class="user-name"
                   id="name-one">
                <span id="name-a">{{ nickname }}</span>
                <span class="user-other"
                      id="name-b"
                      v-if="level_name">{{
                    $store.state.langService.language.langMember.langMemberId
                  }}:{{ uid }}
                </span>
              </div>
              <div class="name_invite"
                   v-if="isGeneralize && isshowInvit">
                <input type="hidden"
                       v-model="this.inviteCode" />
                邀请码：{{ inviteCode }}
                <button class="copybtn"
                        v-clipboard:copy="this.inviteCode"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">
                  复制
                </button>
              </div>
              <div class="user-name"></div>
            </div>
            <div class="member-box"
                 @click="gotoMemberGrade"
                 v-if="isMemberGrade"
                 style="z-index:39;">
              <i class="iconfont icon-member-enter"></i>
              <div class="font">{{ level_name }}</div>
              <i class="fa fa-angle-right"></i>
            </div>
          </div>
        </div>
        <div id="userinfo">
          <ul>
            <li v-if="love_obj.unable_love_show == 1">
              <router-link :to="fun.getUrl('love_index')">
                <span> <small></small>{{ love_obj.unable_data }}</span>
                <br />{{ love_obj.unable_text }}
              </router-link>
            </li>
            <li v-if="love_obj.usable_love_show == 1">
              <router-link :to="fun.getUrl('love_index')">
                <span> <small></small>{{ love_obj.usable_data }}</span>
                <br />{{ love_obj.usable_text }}
              </router-link>
            </li>
            <li v-if="credit.is_show == 1">
              <router-link :to="fun.getUrl('balance')">
                <span> <small>￥</small>{{ credit.data }}</span>
                <br />{{ credit.text }}
              </router-link>
            </li>
            <li v-if="integral.is_show == 1">
              <router-link :to="fun.getUrl('integral_v2')">
                <span>{{ integral.data }}</span>
                <br />{{ integral.text }}
              </router-link>
            </li>
            <li v-if="coupon">
              <router-link :to="fun.getUrl('extension')">
                <span> <small>￥</small>{{ coupon || "0.00" }}</span>
                <br />{{name_of_withdrawal_text}}
              </router-link>
            </li>
          </ul>
        </div>
        <div id="orderlist">
          <div class="ordertltie">
            <router-link :to="fun.getUrl('orderlist', { status: '0' })">
              <div class="spare"></div>
              <div class="ordername">我的订单</div>
              <div class="">
                <i class="fa fa-angle-right"></i>
              </div>
            </router-link>
          </div>
          <div class="order_all">
            <router-link :to="fun.getUrl('orderlist', { status: '1' })">
              <div class="order_pub">
                <div class="badge"
                     v-if="waitPay != 0">{{ waitPay }}
                </div>
                <i class="iconfont icon-stay_pay"></i>
                <br />待付款
              </div>
            </router-link>
            <router-link :to="fun.getUrl('orderlist', { status: '2' })">
              <div class="order_pub">
                <div class="badge "
                     v-if="waitSend != 0">{{ waitSend }}
                </div>
                <i class="iconfont icon-stay_send"></i>
                <br />待发货
              </div>
            </router-link>
            <router-link :to="fun.getUrl('orderlist', { status: '3' })">
              <div class="order_pub">
                <div class="badge "
                     v-if="waitReceive != 0">
                  {{ waitReceive }}
                </div>
                <i class="iconfont icon-stay_receive"></i>
                <br />待收货
              </div>
            </router-link>
            <!--aftersaleslist-->
            <router-link :to="fun.getUrl('aftersaleslist')">
              <div class="order_pub">
                <div class="badge"
                     v-if="waitrRefund != 0">
                  {{ waitrRefund }}
                </div>
                <i class="iconfont icon-stay_refund"></i>
                <br />售后列表
              </div>
            </router-link>
          </div>
        </div>

        <!-- 酒店订单 -->
        <div id="hotel_order"
             v-if="is_hotel">
          <router-link :to="
              fun.getUrl('hotelOrderlist', {
                status: '0',
                orderType: 'hotel'
              })
            ">
            <div class="title_box">
              <div class="spare"></div>
              <span>{{ PageNameList.hotels }}订单</span>
              <i class="fa fa-angle-right"></i>
            </div>
          </router-link>
          <ul class="item_box">
            <li>
              <router-link :to="
                  fun.getUrl('hotelOrderlist', {
                    status: '1',
                    orderType: 'hotel'
                  })
                ">
                <div class="badge-hotel"
                     v-if="hotel_order.waitPay != 0">
                  {{ hotel_order.waitPay }}
                </div>
                <img src="../../assets/images/hotel_a.png" />
                <span>待付款</span>
              </router-link>
            </li>
            <li>
              <router-link :to="
                  fun.getUrl('hotelOrderlist', {
                    status: '2',
                    orderType: 'hotel'
                  })
                ">
                <div class="badge-hotel"
                     v-if="hotel_order.waitSure != 0">
                  {{ hotel_order.waitSure }}
                </div>
                <img src="../../assets/images/hotel_b.png" />
                <span>待确认</span>
              </router-link>
            </li>
            <li>
              <router-link :to="
                  fun.getUrl('hotelOrderlist', {
                    status: '3',
                    orderType: 'hotel'
                  })
                ">
                <div class="badge-hotel"
                     v-if="hotel_order.waitEnter != 0">
                  {{ hotel_order.waitEnter }}
                </div>
                <img src="../../assets/images/hotel_c.png" />
                <span>待入住</span>
              </router-link>
            </li>
            <li>
              <router-link :to="
                  fun.getUrl('hotelOrderlist', {
                    status: '5',
                    orderType: 'hotel'
                  })
                ">
                <div class="badge-hotel"
                     v-if="hotel_order.waitCheckOut != 0">
                  {{ hotel_order.waitCheckOut }}
                </div>
                <img src="../../assets/images/hotel_d.png" />
                <span>待退房</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 拼团订单 -->
        <div id="orderlist"
             v-if="is_open_fight_groups">
          <div class="ordertltie">
            <router-link :to="
              fun.getUrl('GroupOrderlist', { status: '0', orderType: 'groups' })
            ">
              <div class="spare"></div>
              <div class="ordername">拼团订单</div>
              <div class="">
                <i class="fa fa-angle-right"></i>
              </div>
            </router-link>
          </div>
          <div class="order_all">
            <router-link :to="
                  fun.getUrl('GroupOrderlist', {
                    status: '1',
                    orderType: 'groups'
                  })
                ">
              <div class="order_pub">
                <div class="badge"
                     v-if="groups_order.waitPay != 0">{{ groups_order.waitPay }}
                </div>
                <i class="iconfont icon-stay_pay"></i>
                <br />待付款
              </div>
            </router-link>
            <router-link :to="
                  fun.getUrl('GroupOrderlist', {
                    status: '2',
                    orderType: 'groups'
                  })
                ">
              <div class="order_pub">
                <div class="badge "
                     v-if="groups_order.waitSure != 0">{{ groups_order.waitSure }}
                </div>
                <i class="iconfont icon-stay_send"></i>
                <br />待发货
              </div>
            </router-link>
            <router-link :to="
                  fun.getUrl('GroupOrderlist', {
                    status: '3',
                    orderType: 'groups'
                  })
                ">
              <div class="order_pub">
                <div class="badge "
                     v-if="groups_order.waitEnter != 0">
                  {{ groups_order.waitEnter }}
                </div>
                <i class="iconfont icon-stay_receive"></i>
                <br />待收货
              </div>
            </router-link>
            <!--aftersaleslist-->
            <router-link :to="fun.getUrl('aftersaleslist')">
              <div class="order_pub">
                <div class="badge"
                     v-if="groups_order.waitCheckOut != 0">
                  {{ groups_order.waitCheckOut }}
                </div>
                <i class="iconfont icon-stay_refund"></i>
                <br />售后列表
              </div>
            </router-link>
          </div>
        </div>

        <!-- 网约车订单 -->
        <div id="hotel_order"
             v-if="is_open_net_car">
          <router-link :to="
              fun.getUrl('onlineCarOrderlist', {
                status: '0',
                orderType: 'onlineCar'
              })
            ">
            <div class="title_box">
              <div class="spare"></div>
              <span>网约车订单</span>
              <i class="fa fa-angle-right"></i>
            </div>
          </router-link>
          <ul class="item_box">
            <li>
              <router-link :to="
                  fun.getUrl('onlineCarOrderlist', {
                    status: '2',
                    orderType: 'onlineCar'
                  })
                ">
                <!-- <div class="badge-hotel" v-if="hotel_order.waitPay != 0">
                    {{ hotel_order.waitPay }}
                  </div> -->
                <img src="../../assets/images/order_card_a.png" />
                <span>待审核</span>
              </router-link>
            </li>
            <li>
              <router-link :to="
                  fun.getUrl('onlineCarOrderlist', {
                    status: '3',
                    orderType: 'onlineCar'
                  })
                ">
                <!-- <div class="badge-hotel" v-if="hotel_order.waitSure != 0">
                    {{ hotel_order.waitSure }}
                  </div> -->
                <img src="../../assets/images/order_card_b.png" />
                <span>待贷款</span>
              </router-link>
            </li>
            <li>
              <router-link :to="
                  fun.getUrl('onlineCarOrderlist', {
                    status: '4',
                    orderType: 'onlineCar'
                  })
                ">
                <!-- <div class="badge-hotel" v-if="hotel_order.waitEnter != 0">
                    {{ hotel_order.waitEnter }}
                  </div> -->
                <img src="../../assets/images/order_card_c.png" />
                <span>待提车</span>
              </router-link>
            </li>
            <li>
              <router-link :to="fun.getUrl('aftersaleslist')">
                <!-- <div class="badge-hotel" v-if="hotel_order.waitCheckOut != 0">
                    {{ hotel_order.waitCheckOut }}
                  </div> -->
                <img src="../../assets/images/order_card_d.png" />
                <span>售后列表</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 租赁订单 -->
        <div id="hotel_order"
             v-if="is_open_lease_toy">
          <router-link :to="
              fun.getUrl('lease_toyOrderlist', {
                status: '0',
                orderType: 'lease_toy'
              })
            ">
            <div class="title_box">
              <div class="spare"></div>
              <span>租赁订单</span>
              <i class="fa fa-angle-right"></i>
            </div>
          </router-link>
          <ul class="item_box">
            <li>
              <router-link :to="
                  fun.getUrl('lease_toyOrderlist', {
                    status: '1',
                    orderType: 'lease_toy'
                  })
                ">
                <div class="badge-hotel"
                     v-if="lease_order_one.total != 0">
                  {{ lease_order_one.total }}
                </div>
                <img src="../../assets/images/rent_order_a.png" />
                <span>待支付</span>
              </router-link>
            </li>
            <li>
              <router-link :to="
                  fun.getUrl('lease_toyOrderlist', {
                    status: '2',
                    orderType: 'lease_toy'
                  })
                ">
                <div class="badge-hotel"
                     v-if="lease_order_two.total != 0">
                  {{ lease_order_two.total }}
                </div>
                <img src="../../assets/images/rent_order_b.png" />
                <span>待发货</span>
              </router-link>
            </li>
            <li>
              <router-link :to="
                  fun.getUrl('lease_toyOrderlist', {
                    status: '3',
                    orderType: 'lease_toy'
                  })
                ">
                <div class="badge-hotel"
                     v-if="lease_order_three.total != 0">
                  {{ lease_order_three.total }}
                </div>
                <img src="../../assets/images/rent_order_c.png" />
                <span>待收货</span>
              </router-link>
            </li>
            <!-- <li>
                <router-link
                  :to="
                    fun.getUrl('lease_toyOrderlist', {
                      status: '4',
                      orderType: 'lease_toy'
                    })
                  "
                >

                  <img src="../../assets/images/hotel_d.png" />
                  <span>已完成</span>
                </router-link>
              </li> -->
            <li>
              <router-link :to="
                  fun.getUrl('lease_toyOrderlist', {
                    status: '4',
                    orderType: 'lease_toy'
                  })
                ">
                <div class="badge-hotel"
                     v-if="lease_order_four.total != 0">
                  {{ lease_order_four.total }}
                </div>
                <img src="../../assets/images/rent_order_d.png" />
                <span>待归还</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div id="tool">
          <div class="title">
            <div class="spare"></div>
            <h3>实用工具</h3>
          </div>

          <ul class="tool-box">
            <li>
              <router-link :to="fun.getUrl('collection', { selected: '1' })">
                <i class="iconfont icon-shoucang"></i>
                <div>收藏</div>
              </router-link>
            </li>
            <li>
              <router-link :to="fun.getUrl('footprint', { selected: '1' })">
                <i class="iconfont icon-zuji"></i>
                <div>足迹</div>
              </router-link>
            </li>
            <li>
              <router-link :to="fun.getUrl('address', { selected: '1' })">
                <i class="iconfont icon-dizhi"></i>
                <div>地址管理</div>
              </router-link>
            </li>
            <li>
              <router-link :to="fun.getUrl('info', { item: member_item })">
                <i class="iconfont icon-shezhi"></i>
                <div>设置</div>
              </router-link>
            </li>

            <li v-for="(item,i) in pluginsList.tool"
                :key='i'
                v-if="pluginsList.tool">
              <router-link :to="fun.getUrl(item.url)">
                <!-- <i class="iconfont bankCard" :class="item.class"></i> -->
                <i class="iconfont"
                   :class="item.class"></i>
                <div>{{ item.title }}</div>
              </router-link>
            </li>

            <li v-if="isApp">
              <router-link :to="fun.getUrl('message', { selected: '1' })">
                <i class="iconfont icon-icon"></i>
                <div>消息通知</div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="carts"
             v-if="template !== '02'">
          <van-collapse v-model="activeNames">
            <van-collapse-item name="1"
                               v-if="
                (store_set && store_set.is_open_cashier == 1) ||
                  is_stroeWithdraw ||
                  (pluginsList.merchant && pluginsList.merchant.length > 0)
              ">
              <div slot="title"
                   class="title">
                <div class="spare"></div>
                <h3>商家管理</h3>
              </div>

              <div class="cart">
                <div class="list1"
                     v-if="pluginsList.merchant"
                     v-for="(item,i) in pluginsList.merchant"
                     :key='i'
                     @click="pluginGoto(item)">
                  <yd-icon slot="icon"
                           :class="item.class"
                           custom
                           size="1.625rem"
                           color="#f15353"
                           style="margin-right:0.375rem"></yd-icon>
                  <span slot="text">{{ item.title }}</span>
                  <i class="fa fa-angle-right"></i>
                </div>
              </div>
            </van-collapse-item>
            <van-collapse-item name="2">
              <div slot="title"
                   class="title">
                <div class="spare"></div>
                <h3>营销互动</h3>
              </div>

              <div class="cart">
                <div v-if="relation_switch"
                     @click="openQrCode('block')">
                  <div class="list1">
                    <yd-icon slot="icon"
                             class="icon-member_code"
                             custom
                             size="1.625rem"
                             color="#f15353"
                             style="margin-right:0.375rem"></yd-icon>
                    <span slot="text">二维码</span>
                    <i class="fa fa-angle-right"></i>
                  </div>
                </div>

                <router-link :to="fun.getUrl('myEvaluation', { selected: '1' })">
                  <div class="list1">
                    <yd-icon slot="icon"
                             class="icon-member_comment"
                             custom
                             size="1.625rem"
                             color="#f15353"
                             style="margin-right:0.375rem"></yd-icon>
                    <span slot="text">评论</span>
                    <i class="fa fa-angle-right"></i>
                  </div>
                </router-link>

                <router-link :to="fun.getUrl('myRelationship', { selected: '1' })">
                  <div class="list1">
                    <yd-icon slot="icon"
                             class="icon-member_relation"
                             custom
                             size="1.625rem"
                             color="#f15353"
                             style="margin-right:0.375rem"></yd-icon>
                    <span slot="text">客户</span>
                    <i class="fa fa-angle-right"></i>
                  </div>
                </router-link>

                <router-link :to="fun.getUrl('coupon', { selected: '1' })">
                  <div class="list1">
                    <yd-icon slot="icon"
                             class="icon-member_quan"
                             custom
                             size="1.625rem"
                             color="#f15353"
                             style="margin-right:0.375rem"></yd-icon>
                    <span slot="text">优惠券</span>
                    <i class="fa fa-angle-right"></i>
                  </div>
                </router-link>

                <div>
                  <div class="list1"
                       v-if="pluginsList.market"
                       v-for="(item,i) in pluginsList.market"
                       :key='i'
                       @click="pluginGoto(item)">
                    <yd-icon slot="icon"
                             :class="item.class"
                             custom
                             size="1.625rem"
                             color="#f15353"
                             style="margin-right:0.375rem"></yd-icon>
                    <span slot="text">{{ item.title }}</span>
                    <i class="fa fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </van-collapse-item>
            <van-collapse-item name="3">
              <div slot="title"
                   class="title">
                <div class="spare"></div>
                <h3>资产权益</h3>
              </div>

              <div class="cart">
                <div class="list1"
                     v-if="pluginsList.asset_equity"
                     v-for="(item,i) in pluginsList.asset_equity"
                     :key='i'
                     @click="pluginGoto(item)">
                  <div class="list1">
                    <yd-icon slot="icon"
                             :class="item.class"
                             custom
                             size="1.625rem"
                             color="#f15353"
                             style="margin-right:0.375rem"></yd-icon>
                    <span slot="text">{{ item.title }}</span>
                    <i class="fa fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>

        <!-- 模板二 -->
        <div id="templet_box"
             v-if="template === '02'">
          <!-- 我的推广 -->
          <div class="extension_plate"
               v-if="
              (store_set && store_set.is_open_cashier == 1) ||
                is_stroeWithdraw ||
                (pluginsList.merchant && pluginsList.merchant.length > 0)
            ">
            <h1>
              <div class="spare"></div>
              商家管理
            </h1>
            <ul class="box">
              <li v-if="pluginsList.merchant"
                  v-for="(item,i) in pluginsList.merchant"
                  :key='i'
                  @click="pluginGoto(item)">
                <i class="iconfont"
                   :class="item.class"></i>
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>

          <div class="extension_plate">
            <h1>
              <div class="spare"></div>
              营销互动
            </h1>
            <ul class="box">
              <li v-if="relation_switch"
                  @click="openQrCode('block')">
                <i class="iconfont icon-erweima"
                   style="width: 1.7rem;"></i>
                <span>二维码</span>
              </li>

              <li>
                <router-link :to="fun.getUrl('myEvaluation', { selected: '1' })">
                  <i class="iconfont icon-pinglun"
                     style="width: 1.7rem;"></i>
                  <span>评论</span>
                </router-link>
              </li>
              <li>
                <router-link :to="fun.getUrl('myRelationship', { selected: '1' })">
                  <i class="iconfont icon-guanxi"
                     style="width: 1.7rem;"></i>
                  <span>客户</span>
                </router-link>
              </li>
              <!-- <li>
                <router-link :to="fun.getUrl('Bonus', { selected: '1' })">
                     <img src="../../assets/images/extension/extension(55).png" alt="" style="width: 1.7rem;">
                  <span>奖金池</span>
                </router-link>
              </li> -->
              <li>
                <router-link :to="fun.getUrl('coupon', { selected: '1' })">
                  <i class="iconfont icon-youhuiquan1"
                     style="width: 1.7rem;"></i>
                  <span>优惠券</span>
                </router-link>
              </li>

              <li v-if="pluginsList.market"
                  v-for="(item,i) in pluginsList.market"
                  :key='i'
                  @click="pluginGoto(item)">
                <i class="iconfont"
                   :class="item.class"></i>
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>

          <div class="extension_plate">
            <h1>
              <div class="spare"></div>
              资产权益
            </h1>
            <ul class="box">
              <li v-if="pluginsList.asset_equity"
                  v-for="(item,i) in pluginsList.asset_equity"
                  :key='i'
                  @click="pluginGoto(item)">
                <i class="iconfont"
                   :class="item.class"></i>
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <mt-button type="primary"
                   size="large"
                   @click="outInfo($event)"
                   v-if="myType == 5 || wechat_login_mode">退出登录
        </mt-button>
        <div class="copyright">©{{ copyright }}&nbsp;</div>
        <div class="copyright">v1.1.026
          <template v-if="fun.isApp()">
            <router-link style="color: #3b73ef" :to="fun.getUrl('userAgreement',{},{show: 'agreement'})">用户协议</router-link>
            和
            <router-link style="color: #3b73ef" :to="fun.getUrl('userAgreement',{},{show: 'privacy'})">隐私政策</router-link>
          </template>
        </div>

        <div style="height: 3.75rem;clear: both;"></div>
      </div>
      <!--</mt-loadmore>-->

      <div id="ewm"
           ref="hook"
           @click="openQrCode('none')">
        <div class="pic"
             v-if="poster">
          <img :src="poster"
               alt="二维码" />
        </div>
        <div class="pic"
             style="line-height: 10;margin-top: 9rem;"
             v-if="!poster">
          二维码生成中 请稍候查看
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import member from "./membercontroller";

export default member;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/member.scss";
</style>
