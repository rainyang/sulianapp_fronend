<!-- 会员报单 -->
<template>
  <div id="declaration_index">
        <c-title 
            :hide="false" 
            :text="this.info.setting.declaration_name"
            tolink="RecordDeclaration"
            :setParams="{id: this.info.member_info.uid}"
            totext="报单记录"
            ></c-title>
        <div class="content">
            <div class="banner">
                <img :src="this.info.setting.banner">
            </div>
            <div class="info_a_box">
                <ul class="info_a">
                    <li>
                        <span>会员昵称</span>
                        <yd-input type="text" placeholder="请输入昵称" v-model="nickname"></yd-input>
                    </li>
                    <li>
                        <span>会员姓名</span>
                        <yd-input type="text" placeholder="请输入姓名" v-model="realname"></yd-input>
                    </li>
                    <li @click="show1 = true">
                        <span>注册等级</span>
                        <yd-input type="text"  readonly placeholder="请选择等级" v-model="leve_name"></yd-input>
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>
            </div>
            <!-- 等级弹窗 -->
            <!-- <van-popup v-model="show1"  position="bottom" > -->
                    <yd-popup v-model="show1" position="bottom" height="80%">
                        <div class="grade_popup">
                            <div class="title">
                                <!-- <i class="fa fa-angle-left"></i> -->
                                <h1>注册等级</h1>
                                <i class="iconfont icon-guanbi" @click="close()"></i>
                            </div>
                            <van-radio-group v-model="leve_id" class="leveidClass" @change="change()">
                                <van-cell v-for="item in this.info.agent_level_list" :key="item.id" :title="item.name">
                                    <van-radio :name="item.id" checked-color='#f15353'></van-radio>
                                </van-cell>
                            </van-radio-group>
                        </div>
                    </yd-popup>
            <!-- </van-popup> -->
            <!--  -->
            <div class="info_b_box">
                <ul class="info_b">
                    <li>
                        <span>国家区号</span>
                        <yd-input type="text" placeholder="请输入国家区号" v-model="country"></yd-input>
                    </li>
                    <li>
                        <span>手机号码</span>
                        <yd-input type="text" placeholder="请输入手机号码" v-model="mobile"></yd-input>
                    </li>
                    <li class="code" v-if="imgcode">
                        <yd-input
                            slot="right"
                            v-model.trim="captcha"
                            required
                            :show-success-icon="false"
                            :show-error-icon="false"
                            placeholder="请输入图形验证码"
                        ></yd-input>
                        <!-- 获取图形验证码-->
                        <img
                        style="width:20%;height:40px;display:block;left:74%;z-index:999;"
                        :src="imgcode"
                        @click="getimgdata"
                        v-if="imgcode"
                        />
                    </li>
                    <li class="code">
                        <yd-input
                            slot="right"
                            v-model.trim="code"
                            required
                            :show-success-icon="false"
                            :show-error-icon="false"
                            regex="mobile"
                            placeholder="请输入验证码"
                        ></yd-input>
                        <!-- 获取验证码-->
                        <yd-sendcode
                            slot="right"
                            v-model="start1"
                            @click.native="verificationCode"
                            type="warning"
                        ></yd-sendcode>
                    </li>
                    <li>
                        <span>设置密码</span>
                        <yd-input type="password" placeholder="请输入密码" v-model="password"></yd-input>
                    </li>
                    
                    <li>
                        <span>确认密码</span>
                        <yd-input type="password" placeholder="请确认密码" v-model="confirm_password"></yd-input>
                    </li>
                </ul>
            </div>
            <div class="register_btn">
                <button type="button" @click="btnChooseVip">确认注册</button>
            </div>
        </div>
  </div>
</template>

<script>
import declaration from "./index_controller";
export default declaration;
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
#declaration_index{
    padding-top: 40px;
    .content{
        .banner{
            height:8.75rem;
            width: 100%;
            background: #f2f2f2;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                //object-fit: cover;
            }
        }
        .info_a_box,.info_b_box{
            background: #fff;
            .info_a,.info_b{
                padding: 0 0.875rem;
                li{
                    height: 2.875rem;
                    line-height: 2.875rem;
                    display: flex;
                    font-size: 16px;
                    border-bottom: solid 0.0625rem #ebebeb;
                    position: relative;
                    span{
                        width: 6.875rem;
                        text-align: left;
                    }
                    .yd-input{
                        width: 14.75rem;
                        border:none;
                    }
                    .fa{
                        position: absolute;
                        right: 0;
                        font-size: 1.5rem;
                        color:#c9c9c9;
                        line-height: 2.875rem;
                    }
                    h2{
                        font-size: 18px;
                    }
                }
                li:last-child{
                    border:none;
                    i{
                        position: absolute;
                        right: 0;
                        font-size: 1.5rem;
                        color:#c9c9c9;
                        line-height: 2.875rem;
                    }
                }
                .code {
                    justify-content: space-between;
                    button {
                        border: none;
                        background-color: #ebebeb;
                        color: #f15353;
                        font-size: 14px;
                        border-radius: 1.875rem;
                        padding: 0 0.625rem;
                        height: 1.875rem;
                        line-height: 1.875rem;
                        margin-top: 0.5rem;
                    }
                }
            }
            .info_a{
                li:last-child{
                    border:none;
                }
            }
            
        }
        .grade_popup{
                    padding-bottom: 1.25rem;
                    .title{
                        background: #fff;
                        width: 100%;
                        height: 3.125rem;
                        line-height: 3.125rem;
                        font-size: 16px;
                        border-bottom: solid 0.0625rem #ebebeb;
                        display: flex;
                        justify-content: center;
                        i{
                            font-size: 1rem;
                            color:#333;
                            position: absolute;
                            right: 0.625rem;
                            line-height: 3.125rem;
                        }
                    }
                    // .grade_list{
                    //     padding: 0.625rem 0 0 0.875rem;
                    //     li{
                    //         line-height: 2.875rem;
                    //         border-bottom: solid 0.0625rem #ebebeb;
                    //         text-align: left;
                    //         font-size: 16px;
                    //         display: flex;
                    //         justify-content: space-between;
                    //         padding-right: 0.875rem;
                    //         .iconfont{
                    //             color:#f15353;
                    //             font-size: 1.25rem;
                    //         }
                    //     }
                    // }
                    .leveidClass{
                        text-align: left;
                    }
            }
        .info_b_box{
            margin-top: 0.625rem;
        }
        .register_btn{
            margin-top: 1.25rem;
            button{
                // width: 21.5625rem;
                width: 90%;
                height: 2.875rem;
                background: #f15353;
                color:#fff;
                font-size: 16px;
                border-radius: 0.375rem;
                border:none;
            }
        }
    }
}
</style>