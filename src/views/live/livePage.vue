<!-- 直播页 -->
<template>
  <div id="livePage">
    <div >
      <div class="videos" v-show="true" id="videoPlayer"></div>
    </div>

    <div class="replyMainComment" v-show="show&&mainCommentShow" :style="{bottom:(this.fun.getPhoneEnv() == 1?'2.875rem':'0'),position:(this.fun.getPhoneEnv() == 1?'absolute':'fixed')}">
      <div class="left">
        <input type="text"
              ref="commentInput"
              v-model="maincomment"
              @blur="isBlur"
              @focus="isFocus"
              placeholder="和主播说点什么"/>
      </div>
      <div class="right"
          @click="sendmessage" :style="{backgroundColor:(isSuccessIM?'#ee0223':'#999999')}">发送
      </div>
    </div>
    <div style="">
    <swiper :options="swiperOption" v-if="liveList.length > 0&&!swiperResize" ref="mySwiper">
      <swiper-slide v-for="(item, index) in liveList" :key='item.id'>
        <div class="content add_bgc" v-show="!item.show">
          <img :src="item.banner" alt="" class="coverImg">
          <img  class="play" src="../../assets/images/play1.png" alt="" v-if="loadedVideoDataOk" @click.stop="noAutoPlaying">
        </div>
        <div class="content add_bgc stop_style" v-if="stopLive">
          <img :src="item.banner" alt="" class="coverImg">
          <div class="stop_showbox">
            <img :src="item.avatar" alt="" class="stop_cover">
            <p class="stop_text">{{stopLiveTest}}</p>
          </div>
        </div>
        <div class="content" v-show="item.show">
          <!-- style="{top:(fun.getPhoneEnv() == 2?(isPlaying?'2.625rem':'0.25rem'):'0.25rem')} -->
          <div class="top" :style="{top:(fun.getPhoneEnv() == 2?(isPlaying?'2.625rem':'0.25rem'):'0.25rem')}">
            <div class="backBtn" @click.stop="gotoLivelist"><i class="iconfont icon-back"></i></div>
            <div class="anchorInfo" @click="anchorPopup">
              <div class="Avatar">
                <img :src="dataInfo.avatar" alt="">
              </div>
              <div class="user">
                <p>{{dataInfo.nickname}}</p>
                <p><template v-if="isopenBtn(diy_set.location)">{{dataInfo.address}}| </template><template v-if="isopenBtn(diy_set.view)">{{view_num}}观看</template></p>
              </div>
              <div class="attention" v-if="dataInfo.is_concern==0" @click.stop="addConcern">关注</div>
            </div>
            <!-- <div class="backBtn_1" @click.stop="gotoLivelist">直播中心<i class="fa fa-angle-right"></i></div> -->
          </div>
          <div class="directSeeding_content_center" v-if="isopenBtn(diy_set.banner)&&dataInfo.banner">
            <img class="henfu_bannner" :src="dataInfo.banner" alt="" style="width:100%;height:100%;">
          </div>

          <div class="positionStyles" :style="{bottom:(fun.getPhoneEnv() == 2?(isPlaying?'0.875rem':'2rem'):'2.125rem')}">
            <div class="BarrageBox" v-if="item.show">
              <canvas id="Barragecanvas" width="375" height="86"></canvas>
            </div>
            <!-- 购买，关注，进入直播间 的提示框 -->
            <div class="purchase_tips">
              <div :style="{opacity:tipsopacity}" class="purchase_tips_content">
                <div class="buyingBox" >
                  <i class="iconfont icon-htmal5icon29" v-if="tipsContentMsssage.type =='buy'"></i>
                  <template v-if="tipsContentMsssage.type =='buy'">
                    <em class="buyName">{{tipsContentMsssage.nickname}}</em>等{{tipsContentMsssage.count}}人正在去买
                  </template>
                  <template v-if="tipsContentMsssage.type =='come'">
                    <em class="buyName">{{tipsContentMsssage.nickname}}</em>正在进入直播间
                  </template>
                  <template v-if="tipsContentMsssage.type =='concern'">
                    <em class="buyName">{{tipsContentMsssage.nickname}}</em>正在关注主播
                  </template>
                </div>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;position: relative;">
              <div class="comment" @touchmove.stop>
                <ul class="chat_messages" id="chat_messages"   @touchmove.stop>
                  <!-- <li class="chat_messages_child" v-for="(item, index) in messageList" :key="index"  @click.stop>
                    <div class="text"><em class="name" >{{item.nickName}}</em>{{item.text}}</div>
                  </li> -->
                  <li class="chat_messages_child" v-for="(item, index) in messageList" :key="index" @click.stop>
                    <div class="text"><div class="message_icon" :class="[item.memberLevel>10?'':`color_${item.memberLevel}`] "><i class="iconfont icon-collect-active"></i></div><em class="name" :class="[item.memberLevel>10?'':`textcolor_${item.memberLevel}`] ">{{item.nickName}}</em>{{item.text}}</div>
                  </li>
                </ul>
              </div>
              <div class="top_icon">
                <div class="top_icons" v-if="isopenBtn(diy_set.report)" @click="showReportPopup=true" style="margin-bottom:0.625rem;"><i class="iconfont icon-zb_all_jb"></i></div>
                <div class="top_icons" v-if="isopenBtn(diy_set.share)" @click="shareMessage" style="margin-bottom:0.625rem;"><i class="iconfont icon-zb_all_share"></i></div>
                <div class="top_icons" v-if="isopenBtn(diy_set.poster)" @click="showPosterMethob" style="margin-bottom:0.625rem;"><i class="iconfont icon-zb_all_haibao"></i></div>
              </div>

              <div class="plugin_main" @touchmove.stop v-if="!fun.isTextEmpty(diy_menu)">
                <div class="plugin_child" @touchmove.stop v-for="(item, index) in diy_menu" :key="index">
                  <a :href="item.url" @touchmove.stop>
                    <img :src="item.image" alt="" @touchmove.stop>
                  </a>
                  <i class="iconfont icon-adsystem_icon_cancle" @click.stop="cloneFloatBtn(index)"></i>
                </div>
              </div>
            </div>
            <!-- 进度条 开始 -->
            <div class="audio-wrapper" v-if="activatPlayType !='livePlay'">
                <span class="icon"
                    @click.stop="changePlayStatus">
                <img src="../../assets/images/play1.png"
                     alt=""
                     v-show="songStop">
                <img src="../../assets/images/stop1.png"
                     alt=""
                     v-show="!songStop">
              </span>
              <div class="slider"
                    ref="slider" @touchstart="handleTouchStart">
                <div class="slider-track"></div>
                <div class="slider-fill"
                      :style="'width:'+sliderTime+'%'"></div>
                <div class="slider-thumb"
                      :style="'left:'+sliderTime+'%'"></div>
              </div>
              <div class="time">
                <div class="time_left">{{ targetVideo.currentTime | formatSecond}} </div>
                <div class="time_right">{{ targetVideo.maxTime | formatSecond}}</div>
              </div>
            </div>
            <!--进度条 end -->
            <div class="bottomBox">
              <div style="display: flex;">
                <div class="top_icons top_icons1" @click="showGoodLift=true"><i class="iconfont icon-zb_goods"></i><div class="num" v-if="dataInfo.goods_num">{{dataInfo.goods_num}}</div></div>
                <div class="commentLeft" @click="subMainCommentBtn">{{commentMessage}}</div>
              </div>
              <div class="bottomRight">
                <div class="canvasBox" v-if="item.show">
                  <canvas id="likeid" width="100" height="150"></canvas>
                </div>
                <div class="btn_main" v-if="isopenBtn(diy_set.option)">
                  <div class="top_icons"><i class="iconfont icon-zb_all_more" @click.stop="showMorePopup = true"></i></div>
                  <div class="Dot"></div>
                  <p>更多</p>
                </div>
                <div class="btn_main" v-if="isopenBtn(diy_set.reward)">
                  <div class="top_icons" @click="showGiftPopup"><img src="../../assets/images/liwu@2x.png" alt="" class="zb_gift"></div>
                  <p>打赏</p>
                </div>
                <div class="btn_main" v-if="isopenBtn(diy_set.praise)">
                  <div class="top_icons journal-reward"  @click="addClickLove"><i class="iconfont icon-zb_all_like" :style="{color:(isAddLove?'#fc7d26':'#fff')}"></i><div class="num likenum" v-if="dataInfo.like_num">{{dataInfo.like_num}}</div></div>
                  <p>点赞</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
</div>

    <div style="display:none;">
      <img id="canvasImg" src="../../assets/images/dianzan@2x.png" alt="" class="zb_gift">
    </div>
    <!-- <van-popup v-model="mainCommentShow"
               position="bottom" @click-overlay="clickMessageOverlay" >
      <div class="replyMainComment">
        <div class="left">
          <input type="text"
                 ref="commentInput"
                 v-model="maincomment"
                 @blur="isBlur"
                 @focus="isFocus"
                 placeholder="和主播说点什么"/>
        </div>
        <div class="right"
             @click="sendmessage">发送
        </div>
      </div>
    </van-popup> -->

    <van-popup v-model="showMorePopup" round closeable position="bottom" :style="{ height: '40%'}">
      <div class="more_popupClass">
        <div v-for="(item, index) in diy_option" :key="index" class="child">
          <a :href="item.url">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
          </a>
        </div>
      </div>
    </van-popup>
    <!-- 主播房间信息 弹窗 -->
    <van-popup v-model="showUser" round closeable>
      <div class="popupClass1">
        <img :src="MemberInfo.avatar" alt="" class="userImg" @click="gotoAnchor">
        <div class="topInfo">
          <h3>{{MemberInfo.nickname}}</h3>
          <div class="userId">ID：{{MemberInfo.member_id}} <div class="userStatus" v-if="!MemberInfo.is_concern" @click="addConcern">关注</div><div class="userStatus" v-if="MemberInfo.is_concern" @click="cancelConcern">已关注</div></div>
        </div>
        <div class="bottom">
          <div class="flexbox">
            <div class="num">{{view_num}}</div>
            <div class="numName">观看</div>
            <div class="Btn" @click="gotoMember">主页</div>
          </div>
          <div class="flexbox">
            <div class="num">{{MemberInfo.fan_count}}</div>
            <div class="numName">粉丝</div>
            <div class="Btn btnColor" @click="gotoShop" :style="{backgroundColor:(MemberInfo.shop_id?'#7e02e7':'#999999')}">店铺</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 主播海报 弹窗 -->
    <!-- <van-popup v-model="showPoster" round> -->
    <!-- </van-popup> -->
    <van-overlay :show="showPoster" @click="showPoster = false" />
    <div class="popupClass_newPoster" @touchmove.stop v-if="!fun.isTextEmpty(PosterData)" :style="{left:(showPoster?'50%':'-150%')}">
        <div class="popup-box" v-show="loadingImg">
          <div class="code" id="code_box">
            <div class="shop_top">
              <img :src="PosterData.shop_logo" alt="" class="shop_icon">
              <div class="shop_name">{{PosterData.shop_name}}</div>
            </div>
            <div class="bgBox">
              <img class="bg" :src="PosterData.cover"
                 alt=""/>
              <div class="anchorInfo">
                <img :src="dataInfo.avatar" alt="">
                <div class="nickname">{{dataInfo.nickname}}</div>
              </div>
              <div class="live_status">{{PosterData.status==2?"预告":(PosterData.status==3?"直播中":'回放中')}}</div>
            </div>
            <div class="posterBottom">
              <div class="l_info">
                <div class="titless">{{PosterData.title}}</div>
                <div class="live_time">直播时间{{PosterData.live_time}}</div>
                <div class="share_meber">
                  <img :src="PosterData.m_avatar" alt=""><div class="m_nickname">{{nameEllipsis}}</div>的分享
                </div>
              </div>
              <div class="r_info">
                <img :src="PosterData.qr_code" alt=""/>
                <p >长按识别或者保存图片</p>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 19.375rem;height: 27.625rem;margin: 0 auto;border-radius: 8px;z-index:2147483647;position: absolute;" v-show="!loadingImg">
          <img style="width: 19.375rem;height: 27.625rem;border-radius: 8px;z-index:2147483647;position: absolute;left:0;" id="thecanvas" @click.stop="previewImage"/>
        </div>
        <div class="closeBox" @click.stop="showPoster = false"><i class="iconfont icon-close11"></i></div>
      </div>


    <!-- 商品列表 弹窗 -->
    <van-popup v-model="showGoodLift" round position="bottom" :style="{ height: '50%'}" closeable class="set-pc-styleLeft">
      <div class="popupClass3">
        <li class="child" v-for="(item,index) in dataInfo.goods" :key="index" @click="gotoGoodDetail(item.id)">
          <div class="goodImg">
            <img :src="item.thumb" alt="">
            <div class="tag">{{index}}</div>
          </div>
          <div class="goodRight">
            <div class="title">
              {{item.title}}
            </div>
            <div class="bottomBox">
              <div class="price"><i class="smallPrice">￥</i>{{item.price}}</div>
              <div class="cartIcon"><i class="iconfont icon-car_card"></i></div>
            </div>
          </div>
        </li>
        <div style="height: 3rem"></div>
      </div>
      <div v-if="fun.isTextEmpty(dataInfo.goods)">
        <img src="../../assets/images/blank.png" alt="" style="width:5rem;margin:2rem 0 1rem;" >
        <p style="color:#666666;">该直播间暂无商品 ~</p>
      </div>

    </van-popup>
    <!-- 发送礼物 弹窗 -->
    <van-popup v-model="showGift" round position="bottom" closeable class="set-pc-styleLeft">
      <div class="popupClass4" v-if="!fun.isTextEmpty(giftList.list)">
        <van-swipe class="my-swipe" indicator-color="#ff3902" :width="fun.getPhoneEnv() == 3 ? 375 : clientWidths">
          <van-swipe-item v-for="(items, index) in giftList.list" :key="index">
            <div class="giftSwipe" >
              <div class="gift_child" v-for="(item,index) in items" :key="index" :class="{active:isGiftId==item.id}" @click="selectLiveGift(item)">
                <div class="img">
                  <img :src="item.icon_image" alt="">
                </div>
                <div class="title">{{item.name}}</div>
                <div class="other" v-if="giftList.member.credit1&&item.credit1_number&&item.credit1_number!=0">{{giftList.member.credit1_name}}:{{item.credit1_number}}</div>
                <div class="other" v-if="giftList.member.love&&item.love_number&&item.love_number!=0">{{giftList.member.love_name}}:{{item.love_number}}</div>
                <div class="other" v-if="giftList.member.credit2&&item.credit2_number&&item.credit2_number!=0">{{giftList.member.credit2_name}}:{{item.credit2_number}}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="selectExchange">
        <div class="se-left">
          <van-radio-group v-model="radio">
            <van-radio name="1" checked-color="#ff3902" v-if="giftList.member.credit1">我当前{{giftList.member.credit1_name}}数量{{giftList.member.credit1?giftList.member.credit1:''}}</van-radio>
            <van-radio name="2" checked-color="#ff3902" v-if="giftList.member.credit2">我当前{{giftList.member.credit2_name}}{{giftList.member.credit2?giftList.member.credit2:''}}</van-radio>
            <van-radio name="3" checked-color="#ff3902" v-if="giftList.member.love">我当前{{giftList.member.love_name}}数量{{giftList.member.love?giftList.member.love:''}}</van-radio>
          </van-radio-group>
        </div>
        <div class="Reward" @click="submitReward">打赏</div>
      </div>
    </van-popup>

    <!-- 营销活动领取(非IM) 弹窗 -->
    <div v-for="(items, index) in activityDataArray" :key="index" :close-on-click-overlay="false">
      <van-popup v-model="activityDataArray[index].activityData.showactivity" round>
        <div class="popupClass5">
          <div class="activeBox">
            <div class="activeTetle">
              <div class="titles">恭喜你获得</div>
            </div>
            <div style="max-height:18rem;overflow-y:scroll;">
              <div class="activeList">
                <div class="activeChild " v-for="(item, indexs) in items.activityData.activityList" :key="indexs" :class="item.status==3?'failClass':'succedClass'">
                  <div class="price">{{item.coupon_several}}<em>张</em></div>
                  <div class="name">
                    <div class="aa">{{item.coupon_name}}</div>
                  </div>
                  <div class="btn" v-if="item.status==2" @click="goCoupon">查看</div>
                  <div class="failtext" v-if="item.status==3">很遗憾，未领到</div>
                </div>
                <div class="activeChild" :class="items.activityData.pointBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.pointBonus">
                  <div class="price">{{items.activityData.pointBonus}}</div>
                  <div class="name">
                    <div class="aa">{{items.activityData.credit1_name}}</div>
                  </div>
                  <div class="btn" v-if="items.activityData.pointBonusStatus==2" @click="goIntegral">查看</div>
                  <div class="failtext" v-if="items.activityData.pointBonusStatus==3">很遗憾，未领到</div>
                </div>
                <div class="activeChild" :class="items.activityData.loveBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.loveBonus">
                  <div class="price">{{items.activityData.loveBonus}}</div>
                  <div class="name">
                    <div class="aa">{{items.activityData.love_name}}</div>
                  </div>
                  <div class="btn" v-if="items.activityData.loveBonusStatus==2" @click="goLoveindex">查看</div>
                  <div class="failtext" v-if="items.activityData.loveBonusStatus==3">很遗憾，未领到</div>
                </div>
                <div class="activeChild" :class="items.activityData.balanceBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.balanceBonus">
                  <div class="price">{{items.activityData.balanceBonus}}<em>元</em></div>
                  <div class="name">
                    <div class="aa">{{items.activityData.credit2_name}}</div>
                  </div>
                  <div class="btn" v-if="items.activityData.balanceBonusStatus==2" @click="gobalance">查看</div>
                  <div class="failtext" v-if="items.activityData.balanceBonusStatus==3">很遗憾，未领到</div>
                </div>

                <div class="activeChild" :class="items.activityData.packetBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.packetBonus">
                  <div class="price">{{items.activityData.packetBonus}}<em>元</em></div>
                  <div class="name">
                    <div class="aa">现金红包</div>
                  </div>
                  <div class="failtext" v-if="items.activityData.packetBonusStatus==2">请前往公众号领取</div>
                  <div class="failtext" v-if="items.activityData.packetBonusStatus==3">很遗憾，未领到</div>
                </div>
              </div>
            </div>
            <div class="receiveBtn" @click="activityDataBtn(index,items.activityData.activity_id)" :class="items.activityData.status==2?'failClass':'succedClass'">{{ items.activityData.status==2?'已领取':'立即领取'}}</div>
          </div>
          <div class="closeBox" @click="showactivityCloseBtn(index)"><i class="iconfont icon-close11"></i></div>
        </div>
      </van-popup>
    </div>

    <!-- 营销活动领取(IM) 弹窗 -->
    <div v-for="(items, index) in roomMemberContentArray" :key="index" :close-on-click-overlay="false">
      <van-popup v-model="roomMemberContentArray[index].activityData.showactivity" round>
        <div class="popupClass5">
          <div class="activeBox">
            <div class="activeTetle">
              <div class="titles">恭喜你获得</div>
            </div>
            <div style="max-height:18rem;overflow-y:scroll;">
              <div class="activeList">
                <div class="activeChild " v-for="(item, indexs) in items.activityData.activityList" :key="indexs" :class="item.status==3?'failClass':'succedClass'">
                  <div class="price">{{item.coupon_several}}<em>张</em></div>
                  <div class="name">
                    <div class="aa">{{item.coupon_name}}</div>
                  </div>
                  <div class="btn" v-if="item.status==2" @click="goCoupon">查看</div>
                  <div class="failtext" v-if="item.status==3">很遗憾，未领到</div>
                </div>
                <div class="activeChild" :class="items.activityData.pointBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.pointNum">

                  <div class="price">{{items.activityData.pointSet==1?items.activityData.pointLow +' - '+ items.activityData.pointHigh:items.activityData.pointFixed}}</div>
                  <div class="name">
                    <div class="aa">{{items.activityData.credit1_name}}</div>
                  </div>
                  <div class="btn" v-if="items.activityData.pointBonusStatus==2" @click="goIntegral">查看</div>
                  <div class="failtext" v-if="items.activityData.pointBonusStatus==3">很遗憾，未领到</div>
                </div>
                <div class="activeChild" :class="items.activityData.loveBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.loveNum">
                  <div class="price">{{items.activityData.loveSet==1?items.activityData.loveLow +' - '+ items.activityData.loveHigh:items.activityData.loveFixed}}</div>
                  <div class="name">
                    <div class="aa">{{items.activityData.love_name}}</div>
                  </div>
                  <div class="btn" v-if="items.activityData.loveBonusStatus==2" @click="goLoveindex">查看</div>
                  <div class="failtext" v-if="items.activityData.loveBonusStatus==3">很遗憾，未领到</div>
                </div>
                <div class="activeChild" :class="items.activityData.balanceBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.balanceNum">
                  <div class="price">{{items.activityData.balanceSet==1?items.activityData.balanceLow +' - '+ items.activityData.balanceHigh:items.activityData.balanceFixed}}<em>元</em></div>
                  <div class="name">
                    <div class="aa">{{items.activityData.credit2_name}}</div>
                  </div>
                  <div class="btn" v-if="items.activityData.balanceBonusStatus==2" @click="gobalance">查看</div>
                  <div class="failtext" v-if="items.activityData.balanceBonusStatus==3">很遗憾，未领到</div>
                </div>

                <div class="activeChild" :class="items.activityData.packetBonusStatus==3?'failClass':'succedClass'" v-if="items.activityData.packetNum">
                  <div class="price">{{items.activityData.packeSet==1?items.activityData.packeLow +' - '+ items.activityData.packeHigh:items.activityData.packeFixed}}<em>元</em></div>
                  <div class="name">
                    <div class="aa">现金红包</div>
                  </div>
                  <div class="failtext" v-if="items.activityData.packetBonusStatus==2" >请前往公众号领取</div>
                  <div class="failtext" v-if="items.activityData.packetBonusStatus==3">很遗憾，未领到</div>
                </div>
              </div>
            </div>
            <div class="receiveBtn" @click="roomMemberBtn(index,items.activityData.activity_id)" :class="items.activityData.status==2?'failClass':'succedClass'">{{ items.activityData.status==2?'已领取':'立即领取'}}</div>
          </div>
          <div class="closeBox" @click="showactivityCloseBtn_1(index)"><i class="iconfont icon-close11"></i></div>
        </div>
      </van-popup>
    </div>

    <van-popup v-model="showWxpay" round closeable>
      <div class="popupClass7">
        <p class="Recharge_title1" style="">打赏</p>
        <p class="Recharge_title2" style="">余额不足,可使用微信支付</p>
        <div class="paylist">
          <van-checkbox checked-color="#ff2c29" v-model="checked_wxPay" label-position='left' class="addStyle"><i class="iconfont icon-card_weixin"></i> 微信支付</van-checkbox>
        </div>
        <span class="btn" v-show="checked_wxPay" @click.stop="usewechatpay">支付</span>
      </div>
    </van-popup>

    <!-- 营销活动领取失败 弹窗 -->
    <van-popup v-model="showavticeFail" round>
      <div class="popupClass6">
        <img src="../../assets/images/addcheck.png" alt="">
        <h2>很遗憾！</h2>
        <h3>没有领到...</h3>
        <span class="btn" @click="showavticeFail=false">我知道了</span>
      </div>
    </van-popup>

    <!-- 举报弹窗 -->
    <yd-popup v-model="showReportPopup"
              position="right"
              closeOnClickModal="true"
              height="100%"
              width="100%">
      <div class="reportPopHeader">
        <i class="mintui mintui-back"
            @click="showReportPopup=false"></i>
        <p>举报主播</p>
      </div>
      <m-reportPage v-on:submitsave="reportsave" :nickname='dataInfo.nickname' :avatar='dataInfo.avatar' :rid='RoomId' v-if="dataInfo"></m-reportPage>
    </yd-popup>
  </div>
</template>

<script>
import livePage_Controller from "./livePage_Controller";
export default livePage_Controller;
</script>
<style lang="scss" rel="stylesheet/scss">
  .popupClass4{
    .my-swipe{
      .van-swipe__indicators{
        bottom: 0px;
        .van-swipe__indicator{
              width: 24px;
              height: 3px;
              border-radius: 0.875rem;
        }
      }
    }
  }
  #livePage{
    video{
      object-fit: cover;
      z-index: 1!important;
    }
    .hidden_video{
      height: 1px !important;
      visibility: hidden !important;
      display: none !important;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
#livePage{
  font-size: 0.875rem;
  position: relative;
  .videos{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    // background-color: #000000;
    // opacity: 0.4;
    video{
      z-index: 1!important;

    }
  }
  .content{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    // border-bottom: 1px solid #fff;
    // border-top: 1px solid #fff;
    // padding: 0.25rem 0.875rem;
    .coverImg{
      width: 100%;
      height: 100%;
      filter: blur(15px);
      -webkit-filter: blur(15px);
      object-fit: contain;
    }
    .play {
      position: absolute;
      z-index: 11;
      left: calc(55% - 3rem);
      top: calc(50% - 3rem);
      width: 4rem;
      height: 4rem;
    }
    .top{
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      right: 0.5rem;
      display: flex;
      align-items:center;
      justify-content:flex-start;
      .backBtn{
        margin-right: 0.25rem;
        width: 1.5rem;
        line-height: 1.5rem;
        height: 1.5rem;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 100%;
        i{
          font-size: 0.875rem;
          color: #ffffff;
        }
      }
      .backBtn_1{
        line-height: 1.5rem;
        height: 1.5rem;
        padding: 0 0.5rem;
        background: rgba(252, 125, 38, 1);
        border-radius: 5rem;
        color: #fff;
        i{
          font-size: 0.875rem;
          color: #ffffff;
          padding-left: 0.25rem;
        }
      }
      .anchorInfo{
        height: 2.25rem;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1.125rem;
        overflow: hidden;
        display: flex;
        padding: 0 0.5rem;
        align-items: center;
        .Avatar{
          width: 1.5rem;
	        height: 1.5rem;
          overflow: hidden;
          border-radius: 100%;
          border: 1px solid #ffffff;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .user{
          // width: 5rem;
          color: #ffffff;
          display: flex;
          flex-direction:column;
          justify-content: center;
          margin: 0 0.25rem;
          p{
            height: 1rem;
            line-height: 1rem;
            overflow: hidden;
            text-align: left;
            max-width: 10rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .attention{
          height: 1.375rem;
          line-height: 1.375rem;
          background-color: #ffffff;
          border-radius: 0.656rem;
          color: #f10505;
          font-size: 0.875rem;
          padding: 0 0.625rem;
        }
      }

    }
    .directSeeding_content_center{
      position: absolute;
      top: 3rem;
      right: 0.5rem;
      width: 6.25rem;
      display: flex;
      flex-direction:column;
      align-items: center;
      // height: 11.25rem;
      // background: url(../../assets/images/discount_bg@2x.png) center;
      // background-size: 100%;
      overflow: hidden;
      .henfu_bannner{

      }
      .title{
        font-size: 0.875rem;
        color: #6100d4;
        font-weight: bold;
        margin-top: 1.125rem;
      }
      .preferential_list{
        padding: 0.625rem 0.875rem 0.625rem 0.625rem;
        max-height: 7.5rem;
        overflow:scroll;
        .li{
          line-height: 1.625rem;
          border-bottom: 0.0625rem solid #b4c4db;
          color: #ed6603;
        }
      }
    }
    .plugin_main{
      position: absolute;
      top: -12rem;
      right: 0rem;
      margin-top: 1rem;
      // width: 5rem;
      height: 12rem;
      overflow-y: scroll;
      display: flex;
      flex-direction: column-reverse;
      z-index: 999;
      padding-right: 1rem;
      .plugin_child{
        position: relative;
        margin-bottom: 0.875rem;
        display: flex;
        justify-content: center;
        a{
          display: block;
        }
        img{
          width: 3rem;
          height: 3rem;
          object-fit: cover;
          display: block;
          border-radius: 100%;
        }
        i{
          position: absolute;
          top: -0.875rem;
          right: -1rem;
          font-size: 1rem;
          color: #fff;
          padding: 0.25rem;
        }
      }
    }
    .comment{
      // position: absolute;
      // bottom: 5.625rem;
      // left: 0.875rem;
      padding-left: 0.875rem;
      width: 17.375rem;
      height: 9.875rem;
      margin-bottom: 0.5rem;
      .chat_messages{
        overflow-y: scroll;
        height: 9.875rem;
        .chat_messages_child{
          line-height: 1.125rem;
          margin-bottom: 0.375rem;
          color: #fff;
          text-align: left;
          max-width: 100%;
          overflow: hidden;
          .message_icon{
            display: inline-block;
            background: #0ad76d;
            border-radius: 0.125rem;
            padding: 0 0.25rem;
            margin-right: 0.375rem;
          }
          .color_1,.color_2{
            background: #3971ff;
          }
          .color_3,.color_4{
            background: #ffc323;
          }
          .color_5,.color_6{
            background: #ff7301;
          }
          .color_7,.color_8{
            background: #f30061;
          }
          .color_9,.color_10{
            background: #ff2c29;
          }
          .text{
            display: inline-block;
            padding: 0.25rem 0.375rem;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 0.188rem;
            color: #ffffff;
            .name{
              display: inline-block;
              padding-right: 0.375rem;
              color: #0ad76d;
            }
          }
          .textcolor_1,.textcolor_2{
            color: #3971ff!important;
          }
          .textcolor_3,.textcolor_4{
            color: #ffc323!important;
          }
          .textcolor_5,.textcolor_6{
            color: #ff7301!important;
          }
          .textcolor_7,.textcolor_8{
            color: #f30061!important;
          }
          .textcolor_9,.textcolor_10{
            color: #ff2c29!important;
          }
        }
      }
    }
    .top_icon{
        display: flex;
        flex-direction: column-reverse;
        width: 2.25rem;
        margin-right: 0.875rem;
        z-index: 999;
        .top_icons{
          width: 2.25rem;
          height: 2.25rem;
          line-height: 2.25rem;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 100%;
          overflow: hidden;
          color: #ffffff;
          i{
            font-size: 1.5rem;
          }
        }
      }
    .positionStyles{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .BarrageBox{
      // position: absolute;
      // bottom: 17.625rem;
      // left: 0;
      width: 100%;
      // height: 100%;
      // top: 0;
      height: 5.375rem;
      margin-bottom: 0.5rem;
      // background: #ed6603;
    }
    .purchase_tips{
      // position: absolute;
      // bottom: 15.875rem;
      // left: 0.875rem;
      padding-left: 0.875rem;
      display:flex;
      height: 1.375rem;
      margin-bottom: 0.5rem;
      .purchase_tips_content{
        transition: all 2s;
        .buyingBox{
          height: 1.375rem;
          line-height: 1.375rem;
          padding: 0 0.5rem;
          background-color: #d29800;
          border-radius: 0.688rem;
          color: #ffffff;
          display: flex;
          .buyName{
            display: inline-block;
            max-width: 8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .bottomBox{
      // position: absolute;
      // bottom: 3rem;
      // left: 0.875rem;
      // right: 0.875rem;
      width: 100%;
      padding: 0 0.875rem;
      display: flex;
      justify-content:space-between;
      align-items: flex-end;
      color: #fff;
      // margin-bottom: 0.875rem;
      .commentLeft{
        text-align: left;
        width: 8.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1rem;
        padding:0 0.5rem;
        overflow: hidden;
        // background: rgba(0, 0, 0, 0.4);
        // border-radius: 1.25rem;
        display: flex;
        color: #fff;
        border-bottom: 1px solid #ffffff;
        margin-left: 0.5rem;
        i{
          font-size: 1.25rem;
          margin-right: 0.25rem;
        }
      }
      .bottomRight{
        display: flex;
        position: relative;
        .canvasBox{
          position: absolute;
          bottom: 2.5rem;
          right: -0.875rem;
          width: 100px;
          height: 150px;
        }
        .btn_main{
          width: 2.5rem;
          display: flex;
          align-items:center;
          flex-direction: column;
          margin-left: 0.925rem;
          position: relative;
          .Dot{
            position: absolute;
            background-color: #ff2c29;
            border: solid 1px #ffffff;
            width: 0.375rem;
            height: 0.375rem;
            top: 8px;
            right: 2px;
            border-radius: 100%;
          }
        }
        .top_icons{
          width: 2.5rem;
	        height: 2.5rem;
          line-height: 2.5rem;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 100%;
          position: relative;
          .num{
            position: absolute;
            top: 0.5rem;
            left: 1.5rem;
            background: #6100d4;
            border-radius: 0.875rem;
            height: 0.875rem;
            line-height: 0.875rem;
            padding: 0 0.25rem;
            font-size: 0.75rem;
          }
          p{
            font-size: 0.875rem;
          }
          .likenum{
            background: #e22400;
          }
          i{
            font-size: 1.5rem;
          }
          .icon-zb_goods{
            color: #ffffff;
          }
          .icon-zb_like{
            color: #ffbd27;
          }
          .zb_gift{
            width: 1.25rem;
	          height: 1.156rem;
            object-fit: cover;
            vertical-align: sub;
          }
        }

      }
      .top_icons1{
        width: 2.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        border-radius: 100%;
        position: relative;
        i{
          font-size: 2.5rem;
          color: #fc7d26;
        }
        .num{
            position: absolute;
            top: 0.25rem;
            left: 1.5rem;
            background: #6100d4;
            border-radius: 0.875rem;
            height: 0.875rem;
            line-height: 0.875rem;
            padding: 0 0.25rem;
            font-size: 0.75rem;
          }
      }
    }
  }
  .add_bgc{
    background: #000;
    overflow: hidden;
  }
  .stop_style{
    z-index: 999;
  }
  .stop_style .stop_showbox{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8rem;
    height: 8rem;
    margin: -4rem 0 0 -4rem;
    .stop_cover{
      width: 3.875rem;
      height: 3.875rem;
      border-radius: 100%;
      overflow: hidden;
    }
    .stop_text{
      font-size: 1rem;
      font-weight: bold;
      color: #ff7200;
      padding-top: 1rem;
    }
  }
  .van-popup{
    overflow-y:unset;
  }
  .more_popupClass{
    width: 100%;
    padding: 2.875rem 0.875rem 2.25rem 0;
    display: flex;
    flex-wrap: wrap;
    a{
      display: block;
    }
    .child{
      width: 3.5rem;
      margin-bottom: 1.45rem;
      margin-left: 0.875rem;
      display: flex;
      flex-direction: column;
      img{
        display: block;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 0.625rem;
        overflow: hidden;
        margin-bottom: 0.25rem;
      }
      p{
        color: #999999;
        font-size: 0.875rem;
        text-align: center;
      }
    }
  }
  .popupClass5{
    width: 19.375rem;
    .activeBox{
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      overflow: hidden;
      .activeTetle{
        height: 4.375rem;
        line-height: 4.375rem;
        width: 100%;
        position: relative;
        z-index: -1;
        overflow: hidden;
        font-size: 1.125rem;
        color:#ffffff;
        .titles{
          position: relative;
        }
        .titles:before {
          content: "●";
          position: absolute;
          width: 20%;
          height: 1px;
          line-height: 0px;
          font-size: 2rem;
          text-align: left;
          top: 50%;
          color: #a56d6d;
          background-color: #a56d6d;
          left: 12%;
          text-indent: -6px;
        }
        .titles:after {
          content: "●";
          position: absolute;
          width: 20%;
          height: 1px;
          line-height: 0px;
          font-size: 2rem;
          text-align: right;
          top: 50%;
          color: #a56d6d;
          background-color: #a56d6d;
          right: 12%;
          text-indent: 50px;
        }
      }
      .activeTetle::after {
        content: '';
        width: 130%;
        height: 4.375rem;
        position: absolute;
        left: -15%;
        top: 0;
        z-index: -1;
        border-radius: 0 0 50% 50%;
        background: #ff7800;
      }
      .activeList{
        display: flex;
        flex-direction:column;
        padding: 0 1.375rem;
        .activeChild{
          height: 3rem;
          line-height: 3rem;
          border-radius: 0.313rem;
          border: solid 0.031rem #ffffff;
          overflow: hidden;
          display: flex;
          align-items: center;
          color: #ffffff;
          margin-top: 0.75rem;
          .price{
            flex: 0 0 30%;
            border-right: 1px dotted #ffffff;
            height: 1.875rem;
            line-height: 1.875rem;
            font-size: 1.5rem;
            font-weight: bold;
            em{
              font-size: 0.875rem;
              font-weight: 400;
            }
          }
          .name{
            flex: 1;
            font-size: 1rem;
            text-align: left;
            text-indent: 0.875rem;
            overflow: hidden;
            .aa{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .btn{
            height: 1.25rem;
            line-height: 1.25rem;
            background-color: #ffffff;
            border-radius: 0.625rem;
            color: #ff7800;
            font-size: 0.75rem;
            padding: 0 0.875rem;
            margin-right: 0.75rem;
          }
          .failtext{
            margin-right: 0.75rem;
            font-size: 0.625rem;
            color: #000000;
          }
        }
        .succedClass{
          background-color: #ff7800;
        }
        .failClass{
          background-color: #cccccc;
        }
      }
      .receiveBtn{
        width: 13.25rem;
        height: 2.25rem;
        line-height: 2.25rem;
        background-color: #ff7800;
        border-radius: 1rem;
        font-size: 1.125rem;
        color: #ffffff;
        margin: 0.75rem auto;
      }
      .failClass{
        background-color: #cccccc;
      }
    }
    .closeBox{
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      border: solid 0.125rem #ffffff;
      border-radius: 100%;
      color: #ffffff;
      position: absolute;
      left: 50%;
      bottom: -3.5rem;
      margin-left: -1rem;
      i{
        font-size: 1rem;
      }
    }
  }
  .popupClass1{
    width: 19.375rem;
    .userImg{
      width: 5.25rem;
      height: 5.25rem;
      border: solid 0.25rem #ffffff;
      margin-top: -2.125rem;
      border-radius: 100%;
      overflow: hidden;
    }
    .topInfo{
      h3{
        font-size: 1.25rem;
        font-weight: bold;
        color: #000000;
        height: 1.875rem;
        line-height: 1.875rem;
      }
      .userId{
        height: 1.625rem;
        line-height: 1.625rem;
        font-size: 0.875rem;
        display: flex;
        justify-content: center;
        .userStatus{
          padding: 0 0.5rem;
          color: #fff;
          background-color: #999999;
	        border-radius: 0.875rem;
          margin-left: 0.5rem;
        }
      }
    }
    .bottom{
      display: flex;
      justify-content:center;
      .flexbox{
        display: flex;
        flex-direction:column;
        align-items:center;
        margin: 2.5rem 0.5rem;
        .num,.numName,.Btn{
          height: 2.5rem;
          line-height: 2.5rem;
        }
        .num{
          font-size: 1.5rem;
          color: #000000;
          font-weight: bold;
        }
        .numName{
          color: #999999;
        }
        .Btn{
          width: 8rem;
          height: 2.5rem;
          background-color: #ff7200;
          border-radius: 1.25rem;
          font-size: 1.125rem;
          color: #fff;
        }
        .btnColor{
          background-color: #7e02e7;
        }
      }
    }
  }
  .popupClass3{
    margin: 2rem 1rem 1rem 1rem;
    height: 100%;
    overflow: scroll;
    .child{
      height: 6.625rem;
      border-bottom: 0.0625rem solid #f3f3f4;
      display: flex;
      align-items: center;
      .goodImg{
        width: 4.875rem;
        height: 4.875rem;
        overflow: hidden;
        border-radius: 0.25rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tag{
          position: absolute;
          height: 1rem;
          line-height: 1rem;
          top: 0;
          left: 0;
          background-color: #ff9c00;
          color: #ffffff;
          padding: 0 0.25rem;
	        border-radius: 0.234rem 0rem 0.234rem 0rem;
        }
      }
      .goodRight{
        flex: 1;
        padding-left: 0.875rem;
        height: 4.875rem;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        .title{
          font-size: 0.875rem;
          font-weight: bold;
          text-align: left;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          overflow: hidden;
        }
        .bottomBox{
          display: flex;
          justify-content: space-between;
          .price{
            text-align: left;
            color: #f21a1b;
            font-size: 1rem;
            .smallPrice{
              font-size: 0.75rem;
              color: #999999;
            }
          }
          .cartIcon{
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            border-radius: 100%;
            overflow: hidden;
            background-color: #f21a1b;
            color: #ffffff;
          }
        }
      }
    }
  }
  .popupClass6{
    width: 18rem;
    img {
      width: 3.469rem;
      height: 3.469rem;
      display: block;
      margin-top: 1.375rem;
    }
    h2{
      font-size: 1.5rem;
      font-weight: bold;
      color: #000;
      height: 3.594rem;
      line-height: 3.594rem;
    }
    h3{
      font-size: .875rem;
      color: #999999;
    }
    .btn{
      height: 2.835rem;
      line-height: 2.835rem;
      background: #fe8a02;
      font-size: 1.125rem;
      color: #ffffff;
      padding:0 2.875rem;
      border-radius: 1.375rem;
      display: inline-block;
      margin: 2.656rem auto 1.5rem;
    }
  }
  .popupClass7{
    width: 18rem;
    padding: 0 1rem;
    .Recharge_title1{
      font-size:1.125rem;
      color:#000;
      height:3rem;
      line-height:3rem;
    }
    .Recharge_title2{
      font-size:0.75rem;
      color:#999;
      height:3rem;
      line-height:3rem;
      text-align:left;
    }
    .paylist{
      height:3rem;
      line-height:3rem;
      font-weight: bold;
      font-size: 1rem;
      .addStyle{
        display: flex;
        justify-content:space-between;
      }
      i{
        color: #0cce15;
        font-size: 1.5rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .btn{
      height: 2.835rem;
      line-height: 2.835rem;
      background: #fe8a02;
      font-size: 1.125rem;
      color: #ffffff;
      padding:0 2.875rem;
      border-radius: 1.375rem;
      display: inline-block;
      margin: 2.656rem auto 1.5rem;
    }
  }
  .selectExchange{
    display: flex;
    justify-content:space-between;
    align-items:center;
    padding: 0.5rem 0.875rem;
    .se-left{
      .van-radio{
        margin-bottom: 0.25rem;
      }
    }
    .Reward{
      width: 5rem;
      height: 1.875rem;
      background-image: linear-gradient(90deg,
        #f23a3a 0%,
        #f75f30 100%),
      linear-gradient(
        #e93534,
        #e93534);
      background-blend-mode: normal,
        normal;
      border-radius: 1rem;
      line-height: 1.875rem;
      color: #ffffff;
      font-size: 1.125rem;
    }
  }
  .popupClass4{
    padding: 1rem 0 0.875rem;
    border-bottom: 0.0625rem solid #f6f6f6;
    .my-swipe{
      .giftSwipe{
        display: flex;
        flex-wrap: wrap;
        padding: 0 0.125rem;
        .gift_child{
          display: flex;
          flex-direction:column;
          width: 25%;
          overflow: hidden;
          padding: 0.875rem 0;
          border: 1px solid #fff;
          .img{
            width: 5.875rem;
            height: 3.875rem;
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
          .title{
            font-size: 0.75rem;
            color: #000000;
            font-weight: bold;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 0.125rem;
          }
          .other{
            font-size: 0.625rem;
            color: #666666;
          }
        }
        .gift_child.active{
          border: 1px solid #ff3902;
        }
      }
    }
  }
  .replyMainComment {
    display: flex;
    justify-content:space-between;
    padding: 0.5rem 0.75rem;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    .left {
      flex: 1;
      height: 2.5rem;
      background-color: #f5f5f5;
      border-radius: 0.5rem;
      input {
        border: none;
        height: 100%;
        width: 100%;
        padding-left: 0.625rem;
      }
    }
    .right {
      width: 4rem;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: #ee0223;
      border-radius: 1.25rem;
      color: #ffffff;
      margin-left: 0.5rem;
    }
  }
  .popupClass_newPoster{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 19.375rem;
    height: 27.625rem;
    z-index: 999;
    .popup-box {
      width: 19.375rem;
      margin: 0 auto;
      height: 27.625rem;
      overflow: hidden;
      border: 1px solid #eeeeee;
      border-radius: 8px;
    }
    .code {
      width: 19.375rem;
	    height: 27.625rem;
      background-color: #FFFFFF;
      border-radius: 8px;
      padding-top: 0.5rem;
      .shop_top{
        display: flex;
        justify-content:center;
        align-items: center;
        height: 1.75rem;
        margin-bottom: 0.5rem;
        .shop_icon{
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 100%;
          margin:0;
        }
        .shop_name{
          height: 1.75rem;
          line-height: 1.75rem;
          margin-left: 1rem;
          font-size: 0.875rem;
          color: #000000;
        }
      }
      .bgBox{
        position: relative;
        margin: 0 auto;
        width: 17.5rem;
        height: 13.75rem;
        background: #fbfbfb;
        .bg {
          width: 17.5rem;
          height: 13.75rem;
          object-fit: cover;
        }
        .anchorInfo{
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          height: 1.375rem;
          line-height: 1.375rem;
          border-radius: 0.875rem;
          padding-right: 0.375rem;
          display: flex;
          img{
            width: 1.375rem;
            height: 1.375rem;
            border-radius: 100%;
            margin-right: 0.25rem;
          }
          .nickname{
            max-width: 5rem;
            overflow: hidden;/*超出部分隐藏*/
            text-overflow:ellipsis;/* 超出部分显示省略号 */
            white-space: nowrap;/*规定段落中的文本不进行换行 */
          }
        }
        .live_status{
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          color: #ffffff;
          width:4rem;
          height: 1.375rem;
          line-height: 1.375rem;
          background-color: #ff7200;
          border-radius: 0.656rem;
        }
      }
      .posterBottom{
        width: 17.5rem;
        margin: 0 auto;
        display: flex;
        justify-content:space-between;
        text-align: left;
        .l_info{
          display: flex;
          flex-direction:column;
          .titless{
            width: 11rem;
            height: 2.5rem;
            line-height: 1.25rem;
            color: #000;
            font-size: 0.875rem;
            text-align: left;
            margin-top: 1.375rem;
            overflow: hidden;
            text-overflow: ellipsis;
            // display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .live_time{
            font-size: 10px;
            color: #ff7200;
            margin-top: 1.875rem;
          }
          .share_meber{
            color: #666666;
            margin-top: 0.875rem;
            height: 1.5rem;
            line-height: 1.5rem;
            display: flex;
            img{
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 100%;
              margin: 0;
              vertical-align: top;
              margin-right: 0.25rem;
            }
            .m_nickname{
              max-width: 5rem;
              overflow: hidden;/*超出部分隐藏*/
              // text-overflow:ellipsis;/* 超出部分显示省略号 */
              // white-space: nowrap;/*规定段落中的文本不进行换行 */
            }
          }
        }
        .r_info{
          margin-top: 1.375rem;
          text-align: right;
          img{
            width: 5.969rem;
            height: 5.656rem;
            object-fit: contain;
          }
          p{
            font-size: 0.625rem;
          }
        }
      }
    }
    .closeBox{
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      border: solid 0.125rem #fff;
      border-radius: 100%;
      color: #fff;
      position: absolute;
      left: 50%;
      bottom: -3.5rem;
      margin-left: -1rem;
      z-index: 999;
      i{
        font-size: 1rem;
      }
    }
  }
  .audio-wrapper {
    /*background-color: #fcfcfc;*/
    width: 18rem;
    height: 30px;
    margin: 0 auto;
    /*border: 1px solid #e0e0e0;*/
    color: #3e3e3e;
    z-index: 999;
    position: relative;
    .icon{
      position: absolute;
      top: 0rem;
      left: -2.125rem;
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
      }
    }
  }
  .audio-left {
    float: left;
    text-align: center;
    width: 18%;
    height: 100%;
  }

  .audio-left img {
    width: 40px;
    position: relative;
    top: 15px;
    margin: 0;
    display: initial; /* 解除与app的样式冲突 */
    cursor: pointer;
  }
  .slider {
    width: 100%;
    position: relative;
    height: 16px;
    /*margin-top: 20px;*/
    display: flex;
    align-items: center;
    cursor: default;
    user-select: none;
    outline: none;
  }

  .slider-track {
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -1px;
    background-color: #bec2c1;
  }

  .slider-fill {
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #ffba00;
    left: 0;
    top: 50%;
    margin-top: -1px;
  }

  .slider-thumb {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background-color: #ffba00;
    color: #ffba00;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .time {
    display: flex;
    color: #ffffff;
    font-size: 0.625rem;
  }
  .time_left {
    flex: 1;
    text-align: left;
  }
  .time_right {
    flex: 0 0 3rem;
    /*padding-right: 1rem;*/
  }
  .reportPopHeader {
    position: fixed;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 2.5rem;
    background: white;
    display: flex;
    font-size: 16px;
    text-align: center;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    p {
      font-weight: bold;
      flex: 1;
      align-self: center;
    }
    i {
      padding: 0.5rem;
      align-self: center;
      flex: 0 0 1.5rem;
    }
  }
}
</style>
