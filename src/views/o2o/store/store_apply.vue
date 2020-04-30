<template>
  <div id="income">
    <div class="supplier">
      <c-title :hide="false"
               :text='is_hotel?`${hotelTitleType}申请`:"门店申请"'></c-title>
      <div style="height: 40px;"></div>
      <div class="banner">
        <img :src="is_hotel?require('../../../assets/images/hotel.png'):bannerImg">
      </div>
      <div class="main"
           v-if="o2o_status==1">
        <!-- <div class="main" v-if="o2o_status==1"> -->
        <!--申请   -->
        <!-- <div class="welcome">
								<div class="text">
									<h1>请填写申请信息</h1>
								</div>
								<div class="info">
									<div class="info-btn">
										<input type="text" placeholder="设置账号" class="inp" v-model="applyModel.username">
										<input type="password" placeholder="设置密码" class="inp" v-model="applyModel.password">
										<input type="text" placeholder="请填写真实姓名" class="inp" v-model="applyModel.realname">
										<input type="number" placeholder="请填写手机号码" class="inp" v-model="applyModel.mobile">
									</div>

									<div class="info-box">

										<ul class="picture">
											<li class="left">地理位置：<span style="display:block;">经度:{{applyModel.lng}}</span><span style="display:block;">纬度:{{applyModel.lat}}</span></li>
											<li class="right"><i class="fa fa-angle-right"></i></li>
										</ul>

									</div>

									<input type="submit" value="申请" class="btn" @click="setApplyData">
								</div>
							</div> -->
        <!-- 填写申请信息 -->
        <yd-cell-group class="store_apply">
          <yd-cell-item class="otherTitle">
            <span slot="left">账号信息</span>
            <span slot="right"
                  v-if="!is_hotel&&!fun.isTextEmpty(cservice)"><a :href="cservice"><i class="iconfont icon-service"></i></a></span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left"
                  class="dd">登录账号 <em>*</em></span>
            <input slot="right"
                   type="text"
                   placeholder="账号"
                   v-model="applyModel.username" />
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">登录密码 <em>*</em></span>
            <input slot="right"
                   type="password"
                   placeholder="密码"
                   v-model="applyModel.password" />
          </yd-cell-item>
          <span id="tips"
                v-if="pass_safe == 1">密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符</span>
          <yd-cell-item>
            <span slot="left">姓名 <em>*</em></span>
            <input slot="right"
                   type="text"
                   placeholder="姓名"
                   v-model="applyModel.realname" />
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">手机号 <em>*</em></span>
            <input slot="right"
                   type="number"
                   placeholder="手机号"
                   v-model="applyModel.mobile" />
          </yd-cell-item>
          <h3>注：账号/密码用于您登录PC端管理后台，请务必牢记！</h3>
        </yd-cell-group>
        <yd-cell-group class="store_apply">
          <yd-cell-item class="otherTitle">
            <span slot="left">{{is_hotel?`${hotelTitleType}信息`:'门店信息'}}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">{{is_hotel?`${hotelTitleType}名称`:'门店名称'}} <em>*</em></span>
            <input slot="right"
                   type="text"
                   :placeholder="is_hotel?`${hotelTitleType}名称`:'门店名称'"
                   v-model="applyModel.storeName"></input>
          </yd-cell-item>
          <!-- <div class="yd-cell-item">
								<div class="yd-cell-left"><span class="yd-cell-icon"></span> <span data-v-5eba54ac="">门店图片:</span></div>
								<div class="yd-cell-right imageRight">
									<el-upload class="avatar-uploader" :action="uploadUrl" :on-preview="handlePreview" :limit="1" :show-file-list="false" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleStoreSuccess">

										<img v-if="imageUrl" :src="imageUrl" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon imageRight">上传图片</i>
									</el-upload>
								</div>
							</div> -->
          <yd-cell-item arrow>
            <span slot="left">所属类型 <em>*</em></span>
            <input slot="right"
                   type="text"
                   @click.stop="showCategory"
                   v-model="categoryName"
                   readonly
                   placeholder="请选择类型">
          </yd-cell-item>
          <yd-cell-item arrow
                        v-if="is_hotel">
            <span slot="left">星级 <em>*</em></span>
            <input slot="right"
                   type="text"
                   @click.stop="levelShow = true"
                   v-model="levelName"
                   readonly
                   placeholder="请选择星级">
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">所在城市 <em>*</em></span>
            <input slot="right"
                   type="text"
                   @click.stop="addressShow = true"
                   v-model="addressName"
                   readonly
                   placeholder="请选择城市">
          </yd-cell-item>
          <yd-cell-item arrow
                        v-if="strShow">
            <span slot="left">街道 <em>*</em></span>
            <input slot="right"
                   type="text"
                   @click.stop="streetShow = true"
                   v-model="street"
                   readonly
                   placeholder="请选择街道">
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">详细地址 <em>*</em></span>
            <yd-input slot="right"
                      type="text"
                      v-model="applyModel.address"
                      placeholder="街道楼排号等"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">地理位置 <em>*</em></span>
            <span slot="right"
                  style="display: flex;justify-content: flex-end;width: 90%;align-items: center;">
              <div class="addressDiv"
                   style="text-align:right;">{{addressInfo}}</div>
              <i class="iconfont icon-dingwei"
                 style="color:#f86e6e;padding-right:0.25rem;"></i>
              <div class=""
                   style=""
                   @click="toGeolocation">{{addressInfo?'切换':'自动定位'}}</div>
              <!-- <div class="addressDiv">经度:{{applyModel.lng}}<br/> 纬度:{{applyModel.lat}}</div> -->
            </span>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">{{is_hotel?'入住时间':'营业开始时间'}} <em>*</em></span>
            <yd-datetime type="time"
                         v-model="applyModel.beginTime"
                         slot="right"
                         style="justify-content: flex-end;"></yd-datetime>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">{{is_hotel?'离开时间':'营业结束时间'}} <em>*</em></span>
            <yd-datetime type="time"
                         v-model="applyModel.endTime"
                         slot="right"
                         style="justify-content: flex-end;"></yd-datetime>
          </yd-cell-item>
          <!--<yd-cell-item>
									<span slot="left">营业执照:</span>
									<input slot="right" id="inp" type="file" value="上传图片" multiple @click="getImgUpload" name="input"/>
								</yd-cell-item>-->
          <!-- <div class="yd-cell-item">
								<div class="yd-cell-left"><span class="yd-cell-icon"></span> <span data-v-5eba54ac="">营业执照:</span></div>
								<div class="yd-cell-right imageRight">
									<el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleAptiRemove" :file-list="fileList2" list-type="picture" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleAptiSuccess">
										<el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
								</div>
							</div> -->
          <!-- <yd-cell-item>
									<span slot="left">申请协议:{{agreement}}</span>
									<yd-checkbox v-model="agreementChoose" slot="right">&nbsp;</yd-checkbox>
								</yd-cell-item> -->

          <!-- <div class="apply">
									<el-checkbox v-model="agreementChoose" slot="right">&nbsp;</el-checkbox>
									<div class="text">
										<span>申请协议：</span>
										<p class="red" v-html="agreement"></p>
									</div>
								</div> -->
          <!-- <yd-cell-item arrow @click.native="showAgreement">
							<span slot="left">申请协议（点击查看协议）</span>
						</yd-cell-item>
						<yd-cell-item>
							<span slot="left">是否同意申请协议：</span>
							<el-checkbox v-model="agreementChoose" slot="right">&nbsp;</el-checkbox>
						</yd-cell-item> -->
          <div style="clear:both"></div>
          <div style="text-align:left;padding:0.75rem;display: flex;justify-content: space-between;">
            <span style="font-size:14px;font-weight:bold;">{{is_hotel?`${hotelTitleType}Logo`:'门店Logo'}} <em style="color:#f86e6e;">*</em></span>
            <div @click="selectIndex(1)">
              <van-uploader :after-read="onRead"
                            :max-size="photosize"
                            @oversize="onphotosize">
                <div style="padding: 0.2rem;  width:4.25rem;height: 4.25rem; border: 1px dashed #c0ccda;margin: 0 auto;display:flex;">
                  <img :src="imageUrl?imageUrl:require('../../../assets/images/up_icon.png')"
                       :style="{width:(imageUrl?'100%':'50%'),height:(imageUrl?'100%':'50%')}"
                       class="avatar">
                </div>
              </van-uploader>
              <p style="font-size:12px;color:#999;">建议方形图片</p>
            </div>
          </div>
          <div style="text-align:left;padding:0.75rem;display: flex;justify-content: space-between;"
               v-if="!is_hotel">
            <span style="font-size:14px;font-weight:bold;width:50%;">门店Banner</span>
            <div style="display: flex;justify-content: flex-end;flex-wrap: wrap;"
                 @click="selectIndex(2)">
              <van-uploader :after-read="onRead"
                            :max-size="photosize"
                            @oversize="onphotosize">
                <div style="padding: 0.2rem;  width:6.906rem;height: 3.5rem; border: 1px dashed #c0ccda;margin: 0 auto;display:flex;">
                  <img :src="applyModel.bannerImg?applyModel.bannerImg:require('../../../assets/images/up_icon.png')"
                       :style="{width:(applyModel.bannerImg?'100%':'30%'),height:(applyModel.bannerImg?'100%':'50%')}"
                       class="avatar">
                </div>
              </van-uploader>
              <p style="font-size:12px;color:#999;">建议尺寸: 414*150，或长形图片</p>
            </div>
          </div>
        </yd-cell-group>

        <yd-cell-group class="store_apply"
                       v-if="!is_hotel">
          <yd-cell-item class="otherTitle">
            <span slot="left">门店介绍</span>
          </yd-cell-item>
          <yd-cell-item style="border:none;">
            <yd-textarea slot="right"
                         v-model="applyModel.storeIntroduce"
                         placeholder="填写100字以上的门店简介（*必填）"
                         maxlength="100"
                         style="background-color: #f8f8f8;border-radius: 0.469rem;padding:10px;"></yd-textarea>
          </yd-cell-item>
          <div class="otherphoto"
               style="text-align:left;padding:0.75rem;display: flex;justify-content: space-between;">
            <div style="display: flex;flex-wrap: wrap;"
                 @click="selectIndex(3)">
              <div class="imgflex">
                <div v-for="(val,index) in fileList1 "
                     :key="index">
                  <div class="photobox">
                    <img :src="val.url"
                         style="width: 100%">
                    <i @click="removeImg_1(index)"></i>
                  </div>
                </div>
                <van-uploader :after-read="multipleMethod_1"
                              :max-size="photosize"
                              @oversize="onphotosize2"
                              multiple>
                  <div style="padding: 0.2rem;  width:5rem;height: 5rem; border: 1px dashed #c0ccda;margin: 0 auto;display:flex;">
                    <img src="../../../assets/images/up_icon.png"
                         style="width:50%;height:50%;"
                         class="avatar">
                  </div>
                </van-uploader>
              </div>
              <p style="font-size:12px;color:#999;width:100%;">非必填，支持上传多张，显示在门店详情中！</p>
            </div>
          </div>
        </yd-cell-group>

        <yd-cell-group class="store_apply"
                       v-if="!is_hotel">
          <yd-cell-item class="otherTitle">
            <span slot="left">资质证件</span>
          </yd-cell-item>
          <div style="padding:0 12px;text-align:left;">
            <p style="font-weight:bold;">营业执照 <em style="color:#f86e6e;">*</em></p>
            <div class="otherphoto"
                 style="padding-bottom:0.625rem;">
              <div class="imgflex"
                   @click="selectIndex(4)">
                <!-- <template v-for="(val,index) in fileList2 ">
									<div class="photobox">
										<img  :src="val.url" style="width: 100%" >
										<i @click="removeImg(index)" ></i>
									</div>
								</template> -->
                <van-uploader :after-read="onRead"
                              :max-size="photosize"
                              @oversize="onphotosize2"
                              style="width: 100%;">
                  <div style="padding: 0.25rem 1rem;width: 100%;height: 11rem;">
                    <img :src="aptitudeImgurl?aptitudeImgurl:require('../../../assets/images/bg_business@2x.png')"
                         style="width: 100%"
                         class="avatar">
                  </div>
                </van-uploader>
              </div>
            </div>
            <p style="font-weight:bold;">法人身份证正面</p>
            <div class="otherphoto"
                 style="padding-bottom:0.625rem;">
              <div class="imgflex"
                   @click="selectIndex(5)">
                <van-uploader :after-read="onRead"
                              :max-size="photosize"
                              @oversize="onphotosize2"
                              style="width: 100%;">
                  <div style="padding: 0.25rem 1rem;  width:100% ;height: 11rem; ">
                    <img :src="idCardImg_0?idCardImg_0:require('../../../assets/images/bg_idcard_down@2x.png')"
                         style="width: 100%"
                         class="avatar">
                  </div>
                </van-uploader>
              </div>
            </div>
            <p style="font-weight:bold;">法人身份证反面</p>
            <div class="otherphoto"
                 style="padding-bottom:0.625rem;">
              <div class="imgflex"
                   @click="selectIndex(6)">
                <van-uploader :after-read="onRead"
                              :max-size="photosize"
                              @oversize="onphotosize2"
                              style="width: 100%;">
                  <div style="padding: 0.25rem 1rem;  width: 100%;height: 11rem; ">
                    <img :src="idCardImg_1?idCardImg_1:require('../../../assets/images/bg_idcard_up@2x.png')"
                         style="width: 100%"
                         class="avatar">
                  </div>
                </van-uploader>
              </div>
            </div>
            <p style="font-weight:bold;">其他图片</p>
            <div class="otherphoto"
                 style="padding:0.625rem 0;">
              <div class="imgflex">
                <template v-for="(val,index) in fileList3 ">
                  <div class="photobox">
                    <img :src="val.url"
                         style="width: 100%">
                    <i @click="removeImg_2(index)"></i>
                  </div>
                </template>
                <div @click="selectIndex(7)">
                  <van-uploader :after-read="multipleMethod_1"
                                :max-size="photosize"
                                @oversize="onphotosize2"
                                multiple>
                    <div style="padding: 0.2rem;  width:5rem;height: 5rem; border: 1px dashed #c0ccda;margin: 0 auto;display:flex;">
                      <img src="../../../assets/images/up_icon.png"
                           style="width:50%;height:50%;"
                           class="avatar">
                    </div>
                  </van-uploader>
                </div>
              </div>
            </div>
          </div>
        </yd-cell-group>

        <yd-cell-group class="store_apply">
          <yd-cell-item class="otherTitle">
            <span slot="left">备注信息</span>
          </yd-cell-item>
          <yd-cell-item style="padding-bottom:0.625rem;">
            <yd-textarea slot="right"
                         placeholder="填写备注信息"
                         maxlength="100"
                         v-model="applyModel.remark"
                         style="background-color: #f8f8f8;border-radius: 0.469rem;padding:10px;"></yd-textarea>
          </yd-cell-item>
        </yd-cell-group>
        <!-- <yd-cell-group name="门店图片">

					</yd-cell-group> -->
        <!-- <yd-cell-grounp name="营业执照">
					<div style="background:#fff;">
					</div>
				</yd-cell-grounp> -->
        <!-- 申请信息结束 -->
        <!-- 入驻说明 -->
        <yd-cell-group class="store_apply"
                       v-if="!is_hotel">
          <yd-cell-item class="otherTitle">
            <span slot="left">入驻说明</span>
          </yd-cell-item>
          <div style="padding:0 12px 12px;">
            <div id="t1"
                 v-html='signature'></div>
          </div>
        </yd-cell-group>
        <!-- 是否同意协议 -->
        <div style="display:flex;padding: 0 0.625rem;">
          <van-checkbox v-model="agreementChoose"
                        checked-color="#f15353"></van-checkbox>&nbsp;&nbsp;阅读并同意<i @click="showAgreement"
             style="color:#ff5959;">《商家入驻协议》</i>
        </div>
        <!--文字说明；后台设置-->
        <div style="clear:both;margin-top:0.9375rem;"></div>
        <input type="submit"
               value="提交入驻申请"
               class="btn"
               @click="setApplyData">

        <!-- <div class="vip_main" v-if="!(o2o_info==null||o2o_info==''||o2o_info==undefined)">
					<div class="title">门店说明</div>
						<yd-cell-item>
							<span slot="left">申请协议：</span>
						</yd-cell-item>
					<div class="vip">
						<div class="text">
							<div id="t1" v-html='o2o_info'></div>
							<div class="t2">拥有专属推广二维码，用于推广客户；</div>
						</div>
					</div>
				</div> -->
      </div>
      <!--申请后展示-->
      <div class="success"
           v-if="o2o_status==2">
        <div class="ico"><i class="fa fa-check"></i></div>
        <div class="text">您的申请已经提交，请等待审核！</div>
        <a @click="goToIndex()">
          <div class="sub">去商城逛逛</div>
        </a>
      </div>
      <!--审核通过后展示，文字后台设置 -->
      <div class="success"
           v-if="o2o_status==3">
        <div class="ico"><i class="fa fa-check"></i></div>
        <div class="text">您已通过审核</div>
        <a @click="goToIndex()">
          <div class="sub">去商城逛逛</div>
        </a>
      </div>
    </div>
    <!-- 门店类别列表 -->
    <yd-popup v-model="categoryShow"
              position="right"
              width="100%">
      <yd-navbar title="选择类别"
                 height="2.5rem"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="categoryShow = false"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <yd-cell-item arrow
                    :key='i'
                    v-for="(item,i) in categoryList"
                    @click.native="chooseCategory(item)">
        <span slot="left">{{item.name}}</span>
      </yd-cell-item>
    </yd-popup>
    <!-- 街道地址 -->
    <yd-cityselect v-model="addressShow"
                   :callback="addressCallback"
                   :items="area"></yd-cityselect>
    <yd-popup v-model="streetShow"
              position="right"
              width="100%">
      <yd-navbar title="选择街道"
                 height="2.5rem"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <yd-cell-item :key='i'
                    arrow
                    v-for="(item,i) in districtVal"
                    @click.native="streetConfirm(item)">
        <span slot="left">{{item.areaname}}</span>
      </yd-cell-item>
    </yd-popup>
    <!-- 申请协议 -->
    <yd-popup v-model="agreementShow"
              position="right"
              width="100%">
      <yd-navbar title="申请协议"
                 height="40px"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="hideAgreement"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:40px;"></div>
      <div v-html="o2o_info">
      </div>
    </yd-popup>
    <!-- 星级 -->
    <yd-popup v-model="levelShow"
              position="right"
              width="100%">
      <yd-navbar title="选择星级"
                 height="2.5rem"
                 fontsize="14px"
                 fixed>
        <span slot="left">
          <yd-navbar-back-icon @click.native="levelShow = false"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <div style="clear:both;margin-top:2.5rem;"></div>
      <yd-cell-item arrow
                    :key='i'
                    v-for="(item,i) in star_arr"
                    @click.native="chooseStarLevel(item)">
        <span slot="left">{{item.name}}</span>
      </yd-cell-item>
    </yd-popup>
  </div>
</template>
<script>
import store_apply_controller from "./store_apply_controller";
export default store_apply_controller;
</script>
<style lang="scss" rel="stylesheet/scss">
#tips {
  text-align: left;
  color: #ff5d5c;
  font-size: 12px;
  display: inline-block;
  padding-left: 12px;
}

.el-upload-list__item {
  padding: 0 !important;
}
.el-input__icon.el-icon-caret-top {
  color: #b8b8b8;
}
.avatar {
  width: 100%;
  height: 100%;
}
.imageRight {
  justify-content: flex-start;
  padding-left: 0.625rem;
  text-align: left !important;
}
.el-input__inner {
  border: 0.0625rem solid #b8b8b8;
  font-size: 12px;
}
.el-select {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2rem;
  border-radius: 0.3125rem;
  box-sizing: border-box;
  outline: none;
}
#income {
  h3 {
    background: #f5f5f5;
    margin: 0;
    padding: 0 0.625rem;
    text-align: left;
    font-weight: normal;
    font-size: 12px;
    height: 2rem;
    box-sizing: border-box;
    line-height: 2rem;
    span {
      color: #999;
    }
  }
}
a {
  text-decoration: none;
  color: #222;
}
input {
  border-width: 0;
}
.supplier .banner img {
  width: 100%;
}
.welcome {
  padding-bottom: 0.625rem;
  .text {
    line-height: 2.25rem;
    height: 2.25rem;
    background-color: #fff;
    h1 {
      font-size: 14px;
    }
  }
  .info {
    .info-btn {
      padding: 0.625rem;
      background-color: #fff;
      input {
        display: block;
        margin-bottom: 0.5rem;
        width: 90%;
        height: 2rem;
        border-radius: 0.3125rem;
        padding: 0 0.3125rem;
        box-sizing: border-box;
        outline: none;
        margin: 0.625rem auto;
      }
    }
    .inp {
      border: 0.0625rem solid #b8b8b8;
    }
    .inp:focus {
      border-color: #f55955;
      box-sizing: border-box;
    }
    span {
      color: #f55955;
    }
    .btn {
      background: #f55955;
      color: #ffffff;
      margin-bottom: 0.5rem;
      width: 90%;
      height: 2rem;
      border-radius: 0.3125rem;
      padding: 0 0.3125rem;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      line-height: 2rem;
      margin: 0 auto;
      i {
        display: inline-block;
      }
    }
    .btn:focus {
      background: #d8403c;
    }
    .info-box {
      background-color: #fff;
      padding-bottom: 1.25rem;
      margin-top: 0.625rem;
      padding-left: 0.875rem;
      margin-bottom: 1.25rem;
      ul {
        display: flex;
        line-height: 2.75rem;
        height: 2.75rem;
        font-size: 14px;
        border-bottom: solid 0.0625rem #e2e2e2;
        .left {
          width: 20%;
          font-size: 14px;
        }
        .right {
          width: 80%;
          font-size: 14px;
          color: #8c8c8c;
        }
      }
      ul:last-child {
        border: none;
      }
      .name {
        .right {
          padding-right: 0.875rem;
          text-align: left;
          input {
            width: 100%;
          }
        }
      }
      .picture {
        .right {
          padding-right: 0.875rem;
          text-align: right;
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
      }
      .city {
        display: flex;
        line-height: 2.75rem;
        padding-right: 0.875rem;
        .btn {
          font-size: 14px;
          padding: 0;
          height: 2.6875rem;
          display: flex;
          justify-content: space-between;
          background-color: #fff;
          width: 79%;
          line-height: 2.75rem;
          input {
            flex: 2;
          }
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
        .left {
          width: 21%;
        }
      }
      .time {
        padding-right: 0.875rem;
        display: flex;
        height: 2.75rem;
        line-height: 2.75rem;
        .left {
          width: 21%;
        }
        .right {
          width: 79%;
          display: flex;
          justify-content: space-between;
          input {
            flex: 2;
          }
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
      }
      .select {
        padding-right: 0.875rem;
        .left {
          width: 21%;
        }
        .right {
          width: 79%;
          display: flex;
          justify-content: space-between;
          select {
            color: #8c8c8c;
            flex: 2;
            border: none;
            border-radius: 0.25rem;
            option {
              color: #333;
            }
          }
          i {
            line-height: 2.75rem;
            font-size: 24px;
            color: #c9c9c9;
          }
        }
      }
      .remarks {
        display: flex;
        padding-right: 0.875rem;
        width: 100%;
        margin-top: 0.625rem;
        span {
          width: 21%;
          font-size: 14px;
          color: #333;
        }
        textarea {
          width: 79%;
          height: 3rem;
          padding: 0.25rem;
          border: solid 0.0625rem #e2e2e2;
          background-color: #fafafa;
          border-radius: 0.25rem;
        }
      }
    }
  }
}
.supplier .main .vip_main {
  background: #ffffff;
  margin: 0.9375rem 0;
  .title {
    padding: 0.625rem;
    font-size: 12px;
    border-bottom: 0.0625rem solid #eeeeee;
    text-align: center;
  }
  .vip {
    padding: 0.9375rem 0.625rem;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    .ico1,
    .ico2 {
      width: 15%;
      float: left;
    }
    .ico1 {
      i {
        background: #32cd32;
      }
    }
    .ico2 {
      i {
        background: #fece00;
      }
    }
    .text {
      float: left;
      width: 100%;
      .t1 {
        font-size: 16px;
        color: #333;
        margin-bottom: 0.3125rem;
        text-align: left;
      }
      .t2 {
        text-align: justify;
      }
    }
    i {
      background: #32cd32;
      height: 2.25rem;
      width: 2.25rem;
      border-radius: 1.125rem;
      color: #fff;
      text-align: center;
      line-height: 2.375rem;
      font-size: 18px;
    }
  }
  .vip1 {
    border-bottom: 0.0625rem solid #eeeeee;
  }
}
.main {
  .btn {
    width: 100%;
    background: #f55955;
    color: #ffffff;
    height: 3rem;
    padding: 0 0.3125rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    line-height: 3rem;
  }
  .apply {
    line-height: 2.75rem;
    margin: 0 0.75rem 0 0.75rem;
    display: flex;
    .text {
      font-size: 14px;
      .red {
        color: #f15353;
      }
    }
  }
  .otherphoto {
    .photobox {
      position: relative;
      width: 5rem;
      height: 5rem;
      border: 1px dashed #c0ccda;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
      i {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        background: url("../../../assets/images/close_iocn.png");
        background-size: 100%;
      }
    }
  }
}
.supplier .success {
  height: 12.5rem;
  padding-top: 4.0625rem;
  background: #ffffff;
  .ico {
    height: 4.0625rem;
    width: 4.0625rem;
    margin: auto;
    border: 0.1875rem solid #32cd32;
    border-radius: 4rem;
    color: #32cd32;
    font-size: 36px;
    text-align: center;
    line-height: 4rem;
  }
  .text {
    height: 2rem;
    margin-top: 1.875rem;
    color: #666;
    line-height: 1.6rem;
    text-align: center;
  }
  a .sub {
    height: 2rem;
    width: 80%;
    background: #f55955;
    margin: 1.25rem auto;
    border-radius: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: 14px;
    margin-bottom: 1.25rem;
  }
  a .sub:focus {
    background: #d8403c;
  }
  .avatar-uploader .el-upload {
    border: 0.0625rem dashed #d9d9d9;
    border-radius: 0.375rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 11.125rem;
    height: 11.125rem;
    line-height: 11.125rem;
    text-align: center;
  }
  .avatar {
    width: 11.125rem;
    height: 11.125rem;
    display: block;
  }
  .el-upload-list__item .is-success {
    width: 80%;
    height: 6.25rem;
  }
}
.imgflex {
  display: flex;
  flex-wrap: wrap;
  .photobox {
    position: relative;
    width: 4.25rem;
    height: 4.25rem;
    overflow: hidden;
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
    background: #f5f5f5;
    border: 1px dashed rgb(192, 204, 218);
  }
}
#income {
  .main {
    .store_apply {
      background: #ffffff;
      .yd-cell-item {
        .yd-cell-left {
          span {
            font-weight: bold;
            color: #333;
          }
          em {
            color: #f86e6e;
            font-size: 18px;
          }
        }
        .yd-cell-right {
          justify-content: flex-end;
        }
        .yd-cell-right input {
          text-align: right;
          color: #333;
        }
        .yd-cell-right .addressDiv {
          width: 10rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 18px;
        }
      }
      .otherTitle {
        border: none;
        .yd-cell-left {
          flex: 1;
          span {
            color: #f86e6e;
            font-weight: bold;
            line-height: 0.875rem;
            font-size: 0.875rem;
            border-left: 0.2rem solid #f86e6e;
            padding-left: 0.5rem;
          }
        }
        .yd-cell-right {
          width: auto;
          flex: 0;
          span {
            width: 1.25rem;
            height: 1.25rem;
            border: 1px solid #f86e6e;
            border-radius: 100%;
            text-align: center;
            i {
              color: #f86e6e;
            }
          }
        }
      }
      .otherTitle::after {
        width: 0%;
      }
      h3 {
        background: #ffffff;
        color: #999;
      }
    }
  }
}
</style>

