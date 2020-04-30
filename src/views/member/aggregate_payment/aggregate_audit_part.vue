<template>
    <div id="aggregate">
        <c-title :hide="false" text='入网信息'></c-title>
        <div class="agg_content">
            <div class="agg_per_inf">
                <div class="content">
                    <ul>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left">子商编号：</span>
                                    <yd-input slot="right" disabled readonly v-model="subquotient"></yd-input>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left">法人姓名：</span>
                                    <yd-input slot="right" disabled readonly v-model="legalpersonName"></yd-input>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left">法人身份证号：</span>
                                    <yd-input slot="right" disabled readonly v-model="idNumber"></yd-input>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left">商户法人手机：</span>
                                    <yd-input slot="right" disabled readonly v-model="handset"></yd-input>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left">结算银行卡号：</span>
                                    <yd-input slot="right" disabled readonly v-model="cardNumber"></yd-input>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li>
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left">入网类型：</span>
                                    <yd-input slot="right" disabled readonly v-model="networktype"></yd-input>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                        <li v-if="beizhushow">
                            <yd-cell-group>
                                <yd-cell-item>
                                    <span slot="left">审核备注：</span>
                                    <span slot="right" style="text-align: left;justify-content:flex-start;">
                                        {{auditRemarks}}
                                    </span>
                                </yd-cell-item>
                            </yd-cell-group>
                        </li>
                    </ul>
                </div>
            </div>
            <yd-button size="large" type="disabled" disabled>{{btnStatusText}}</yd-button>
            <yd-button size="large" style="background: rgb(20, 141, 232)" type="primary" v-if="reapplyBtnshow" @click.native="reapplyBtn">重新申请</yd-button>
            <yd-button size="large" @click.native="bankCardbtn" type="primary" v-if="bankCardbtnshow" >修改结算银行卡</yd-button>
            <yd-button size="large" @click.native="protocolBtn" type="primary" v-if="protocolBtnshow">协议内容</yd-button>
        </div>
        <mt-popup v-model="show2" class="mint-popup-3" position="right" closeOnClickModal='true' modal='false' style="z-index:2004;">
            <div class="city-info">
                <mt-header fixed title="协议内容">
                    <mt-button icon="back" @click="popClose" slot="left"></mt-button>
                </mt-header>
                <div>

                    <div style="height: 2.5rem;clear: both;position: absolute;
    background: #fff;width: 100%"></div>

                    <div id="a_content" style="padding-top: 2.5rem" v-html='protocol_content'></div>

                </div>
            </div>

        </mt-popup>
    </div>
</template>

<script>
    import aggregate_bank_card_setcontroller from './aggregate_audit_partcontroller';
    export default aggregate_bank_card_setcontroller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #aggregate{
        .agg_content{
            background: #fff;
            padding-top: 40px;
            .agg_per_inf {
                .content ul li .yd-cell-box{
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
                                    font-size: 0.75rem;
                                }
                            }
                        }
                    }
                }
            }
            .yd-btn-block{
                width: 90%;
                margin: 1rem auto;
            }
        }
        .city-info {
            overflow-y: scroll;
            width: 100vw;
            height: 100vh;
            background: #fff;
        }
        .mint-header {
            background: none;
            color: #666;
        }
    }
</style>