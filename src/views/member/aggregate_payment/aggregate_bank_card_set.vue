<template>
    <div id="aggregate">
        <c-title :hide="false" text='入网信息'></c-title>
        <div class="agg_content">
            <div class="agg_ope_acc">
                <div class="title">开户信息</div>
                <div class="content">
                    <ul>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left"><i class="xin_icon iconfont icon-info-must"></i>结算银行卡号：</span>
                                    <yd-input slot="right" v-model="cardNumber"  placeholder="请填写结算银行账号或银行卡号"></yd-input>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item arrow>
                                    <span slot="left"><i class="xin_icon iconfont icon-info-must"></i>开户行：</span>
                                    <span slot="right" @click="bankDepositBtn">{{bankDepositText}}</span>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item arrow>
                                    <span slot="left">开户行省份：</span>
                                    <span slot="right" @click="bankprovinceBtn">{{bankprovinceText}}</span>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item arrow>
                                    <span slot="left">开户行城市：</span>
                                    <span slot="right" @click="bankCityBtn">{{bankCityText}}</span>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item arrow>
                                    <span slot="left">开户支行：</span>
                                    <span slot="right" @click="subbranchBtn">{{subbranchText}}</span>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <!--<li class="proving">-->
                            <!--<yd-cell-group>-->
                                <!--<yd-cell-item>-->
                                    <!--<span slot="left">手机号：</span>-->
                                    <!--<yd-input slot="right" v-model="cellhoneNumberP"  placeholder="请输入手机号"></yd-input>-->
                                    <!--<div slot="right">-->
                                         <!--<div class="provingbtn">获取验证码</div>-->
                                    <!--</div>-->
                                <!--</yd-cell-item>-->
                            <!--</yd-cell-group>-->
                        <!--</li>-->
                        <li class="proving">
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left"> <yd-input  v-model="identifyingCode"  placeholder="请输入验证码"></yd-input></span>
                                    <div slot="right">
                                        <yd-sendcode style="color: #fff;"  v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode>
                                    </div>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <!-- <li>
                            <div class="sub_btn">
                                <yd-button  bgcolor="#389ef2" color="#fff" type="primary">确认修改</yd-button>
                            </div>
                        </li>
                        <li>
                            <div class="rev_btn">
                                <yd-button  bgcolor="#fff" color="#389ef2" type="primary">入网详情</yd-button>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div class="btn_box">
            <yd-button  bgcolor="#389ef2" color="#fff" type="primary" @click.native="confirmBtn">确认修改</yd-button>
            <yd-button  bgcolor="#fff" color="#389ef2" type="primary" @click.native="detailsBtn">入网详情</yd-button>
        </div>
        <van-popup v-model="bankDepositshow" :lazy-render="false" position="bottom" :overlay="true">
            <van-picker :show-toolbar="true" ref="banklist_sele" @change="banklistbtn" :columns="bankDepcolumns" :loading="bankDeploading" @confirm="bankconbtn" @cancel="bankcancelbtn"/>
        </van-popup>
        <van-popup v-model="bankprovinceShow" :lazy-render="false" position="bottom" :overlay="true">
            <van-picker :show-toolbar="true" ref="bankprovince_sele" @change="bankprovincelistbtn" :columns="bankprovcolumns" :loading="bankprovloading" @confirm="bankprovinceconbtn" @cancel="bankprovincecancelbtn"/>
        </van-popup>
        <van-popup v-model="bankCityShow" :lazy-render="false" position="bottom" :overlay="true">
            <van-picker :show-toolbar="true" ref="bankCity_sele" @change="bankCitylistbtn" :columns="bankcitycolumns" :loading="bankcityloading" @confirm="bankCitybtn" @cancel="bankCitycancelbtn"/>
        </van-popup>
        <van-popup v-model="subbranchShow" :lazy-render="false" position="bottom" :overlay="true">
            <van-picker :show-toolbar="true"  ref="subbranch_sele" @change="subbranchlistbtn" :columns="subbranchcolumns" :loading="subbranchloading" @confirm="subbranchbtn" @cancel="subbranchcancelbtn"/>
        </van-popup>
    </div>
</template>

<script>
    import aggregate_bank_card_setcontroller from './aggregate_bank_card_setcontroller';
    export default aggregate_bank_card_setcontroller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    #aggregate{
        .agg_content{
            background: #fff;
            padding-top: 40px;
            .agg_ope_acc{
                .title{
                    background: #f5f5f5;
                    height: 2.25rem;
                    line-height: 2.25rem;
                    text-align: left;
                    padding-left: 0.8rem;
                    font-weight: bold;
                    color: #333333;
                    font-size:16px;
                }
                .content ul{
                    li {
                        .yd-cell-box{
                            // border-bottom: 1px solid #ebebeb;
                            margin-bottom: 0;
                            .yd-cell-item{
                                padding-left: 1.5rem;
                                .yd-cell-left{
                                    span{
                                        position: relative;
                                        .xin_icon{
                                            color: #f15353;
                                            margin-left: -1rem;
                                            font-size:0.75rem;
                                        }
                                    }
                                }
                            }
                        }
                        .agg_aud_vid{
                            border-bottom: 0.0625rem solid #ebebeb;
                            .vid_title{
                                height: 3.12rem;
                                line-height: 3.12rem;
                                text-align: left;
                                padding-left: 1rem;
                                .xin_icon{
                                    color: #f15353;
                                    margin-left: -0.5rem;
                                    font-size:0.75rem;
                                }
                            }
                            .vid_content{
                                display: flex;
                                justify-content:space-around;
                                .left{
                                    .add_photo{
                                        width: 8.8rem;
                                        height: 5rem;
                                        border: 0.0625rem solid #319ff8;
                                        border-radius: 0.3125rem;
                                        background: url("../../../assets/images/agg_add_icon.png") no-repeat center center;
                                        background-size: 1.8rem 1.8rem;
                                        .van-uploader{
                                            width: 100%;
                                            height: 5rem;
                                        }
                                    }
                                    h3{
                                        height: 1.56rem;
                                        line-height: 1.56rem;
                                        font-size: 12px;
                                    }
                                }
                                .right{
                                    .add_photo{
                                        width: 8.8rem;
                                        height: 5rem;
                                        border: 0.0625rem solid #319ff8;
                                        border-radius: 0.3125rem;
                                        background: url("../../../assets/images/agg_add_icon.png") no-repeat center center;
                                        background-size: 1.8rem 1.8rem;
                                        .van-uploader{
                                            width: 100%;
                                            height: 5rem;
                                        }
                                    }
                                    h3{
                                        height: 1.56rem;
                                        line-height: 1.56rem;
                                        font-size: 12px;
                                    }
                                }

                            }
                            .vid_message{
                                width: 20rem;
                                margin: 0 auto;
                                padding-top: 0.9rem;
                                font-size: 12px;
                                line-height: 1.25rem;
                                color: #8c8c8c;
                                padding-bottom: 1.4rem;
                            }
                        }
                        // .sub_btn{
                        //     padding-top: 2.5rem;
                        //     padding-bottom: 0.625rem;
                        //     .yd-btn{
                        //         width: 20rem;
                        //         height: 2.6rem;
                        //     }
                        // }
                        // .rev_btn{
                        //     padding-top: 0.625rem;
                        //     padding-bottom: 1.25rem;
                        //     .yd-btn{
                        //         width: 20rem;
                        //         height: 2.6rem;
                        //         border: 1px solid #4a7de5;
                        //     }
                        // }
                    }
                    .proving{
                        .provingbtn{
                            min-width: 5.625rem;
                            height: 1.625rem;
                            line-height: 1.625rem;
                            text-align: center;
                            border-radius: 1rem;
                            color: #f15353;
                            background: #ebebeb;
                            font-size: 13px;
                        }
                    }
                }

            }
        }
        .btn_box{
            margin-top: 1.125rem;
            button{
                width: 20.625rem;
                height: 2.625rem;
                border-radius: 0.375rem;
                font-size: 16px;
                margin: 0.375rem auto;
            }
            button:last-child{
                border:solid 0.0625rem #389ef2;
            }
        }
    }
</style>