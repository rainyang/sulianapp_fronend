<template>
    <div id="income">
        <div class="supplier">
            <c-title :hide="false" text='选择区域'></c-title>
            <div style="height:40px;"></div>
            <div class="banner">
                <img src="../../assets/images/regionalmanagement.png" />
            </div>
            <div class="main">
                <div class="welcome">
                    <div class="info">
                        <div class="inptent" @click="seleRegional">
                            <input  type="text" placeholder="请选择区域等级" readonly  class="inp" v-model="regionallevel" />
                        </div>
                        <div class="inptent" v-if="Provincesshow" @click="Provincesbtn">
                            <input  type="text" placeholder="请选择省份" readonly  class="inp" v-model="Provinces"/>
                        </div>
                        <div class="inptent" v-if="cityshow" @click="citybtn">
                            <input  type="text" placeholder="请选择城市" readonly  class="inp" v-model="city"/>
                        </div>
                        <div class="inptent" v-if="districtshow" @click="districtbtn">
                            <input  type="text" placeholder="请选择区/县" readonly  class="inp" v-model="district"/>
                        </div>
                        <div class="inptent" v-if="streetshow" @click="streetbtn">
                            <input  type="text" placeholder="请选择街道" readonly  class="inp" v-model="street"/>
                        </div>
                        <div class="inptent" @click="goaddressgoodsbtn">
                            <input type="submit" :value="disabledbtn?'该区域不可选':'提交'" :class="{'disabledbtn': disabledbtn }" class="btn">
                        </div>
                    </div>
                </div>
                <p class="notice_purchase
" v-html="noticePurchaseData"></p>
            </div>
        </div>
<!--        <van-popup v-model="regionallevelshow" position="bottom" :overlay="true">-->
<!--            <van-picker :columns="regionallevelcolumns" @change="seleRegionalChange"  @cancel="seleRegionalCancelbtn" @confirm="seleRegionalConfirmbtn" show-toolbar/>-->
<!--        </van-popup>-->
<!--        <van-popup v-model="Provincesshow_1" position="bottom" :overlay="true">-->
<!--            <van-picker :columns="Provincesshowcolumns" @change="ProvincesChange"  @cancel="ProvincesCancelbtn" @confirm="ProvincesConfirmbtn" show-toolbar/>-->
<!--        </van-popup>-->
<!--        <van-popup v-model="cityshow_1" position="bottom" :overlay="true">-->
<!--            <van-picker :columns="citycolumns" @change="cityChange"  @cancel="cityCancelbtn" @confirm="cityConfirmbtn" show-toolbar/>-->
<!--        </van-popup>-->
<!--        <van-popup v-model="districtshow_1" position="bottom" :overlay="true">-->
<!--            <van-picker :columns="districtcolumns" @change="districtChange"  @cancel="districtCancelbtn" @confirm="districtConfirmbtn" show-toolbar/>-->
<!--        </van-popup>-->
<!--        <van-popup v-model="streetshow_1" position="bottom" :overlay="true">-->
<!--            <van-picker :columns="streetcolumns" @change="streetChange"  @cancel="streetCancelbtn" @confirm="streetConfirmbtn" show-toolbar/>-->
<!--        </van-popup>-->
        <mt-popup
                v-model="regionallevelshow"
                position="left"
                style="width:100%;height:100%;padding-top:2.5rem;"
                popup-transition="popup-fade"
        >
            <yd-navbar title="代理等级" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
                  @click.native="regionallevelshow = false"
          ></yd-navbar-back-icon>
        </span>
            </yd-navbar>
            <!-- <div style="clear:both;margin-top:40px;"></div> -->
            <yd-cell-item
                    arrow
                    v-for="(item,i) in regionallevelcolumns"
					:key='i'
                    @click.native="seleRegionalConfirmbtn(item)"
            >
                <span slot="left">{{ item.text }}</span>
            </yd-cell-item>
        </mt-popup>
        <mt-popup
                v-model="Provincesshow_1"
                position="left"
                style="width:100%;height:100%;padding-top:2.5rem;"
                popup-transition="popup-fade"
        >
            <yd-navbar title="省级区域" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
                  @click.native="Provincesshow_1 = false"
          ></yd-navbar-back-icon>
        </span>
            </yd-navbar>
            <div class="scroll">
                <yd-cell-item
                        arrow
                        v-for="(item,i) in Provincesshowcolumns"
						:key='i'
                        @click.native="ProvincesConfirmbtn(item)"
                >
                    <span slot="left">{{ item.text }}</span>
                </yd-cell-item>
            </div>
        </mt-popup>
        <mt-popup
                v-model="cityshow_1"
                position="left"
                style="width:100%;height:100%;padding-top:2.5rem;"
                popup-transition="popup-fade"
        >
            <yd-navbar title="市级区域" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
                  @click.native="cityshow_1 = false"
          ></yd-navbar-back-icon>
        </span>
            </yd-navbar>
            <div class="scroll">
                <yd-cell-item
                        arrow
                        v-for="(item,i) in citycolumns"
						:key='i'
                        @click.native="cityConfirmbtn(item)"
                >
                    <span slot="left">{{ item.text }}</span>
                </yd-cell-item>
            </div>
        </mt-popup>
        <mt-popup
                v-model="districtshow_1"
                position="left"
                style="width:100%;height:100%;padding-top:2.5rem;"
                popup-transition="popup-fade"
        >
            <yd-navbar title="区/县级区域" height="2.5rem" fontsize="16px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
                  @click.native="districtshow_1 = false"
          ></yd-navbar-back-icon>
        </span>
            </yd-navbar>
            <div class="scroll">
                <yd-cell-item
                        arrow
                        v-for="(item,i) in districtcolumns"
						:key='i'
                        @click.native="districtConfirmbtn(item)"
                >
                    <span slot="left">{{ item.text }}</span>
                </yd-cell-item>
            </div>
        </mt-popup>
        <mt-popup
                v-model="streetshow_1"
                position="left"
                style="width:100%;height:100%"
                popup-transition="popup-fade"
        >
            <yd-navbar title="街道/乡镇区域" height="2.5rem" fontsize="14px" fixed>
        <span slot="left">
          <yd-navbar-back-icon
                  @click.native="streetshow_1 = false"
          ></yd-navbar-back-icon>
        </span>
            </yd-navbar>
            <div style="clear:both;margin-top:2.5rem;"></div>
            <div style=" height: 90%;overflow-y: scroll;">
                <yd-cell-item
                        arrow
                        v-for="(item,i) in streetcolumns"
						:key='i'
                        @click.native="streetConfirmbtn(item)"
                >
                    <span slot="left">{{ item.text }}</span>
                </yd-cell-item>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import selectionarea_controller from "./selectionarea_controller";
    export default selectionarea_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .supplier .banner img {
        width: 100%;
    }
    .supplier .main {
        position: relative;
        top: -0.25rem;
    }
    .notice_purchase{
        padding: 0.4rem;
        text-align: left;
    }
    input {
        border-width: 0;
        position: absolute;
        right: 0px;
    }
    .welcome {
        padding: 0.625rem;
        background: #ffffff;
        .text {
            p {
                font-size: 12px;
                color: #666;
                line-height: 1.2rem;
                margin-top: 0;
                span {
                    color: #f55955;
                }
            }
        }
        .info {
            margin-top: 0.625rem;
            input {
                position: relative;
                display: block;
                margin-bottom: 0.5rem;
                width: 100%;
                height: 2rem;
                border-radius: 0.3125rem;
                padding: 0 0.3125rem;
                box-sizing: border-box;
                outline: none;
            }

            .inp1 {
                border: 0.0625rem solid #b8b8b8;
            }

            .inp {
                border: 0.0625rem solid #b8b8b8;
            }
            span {
                color: #f55955;
            }
            .btn {
                background: #f55955;
                color: #ffffff;
                margin-bottom: 0.5rem;
                width: 100%;
                height: 2rem;
                border-radius: 0.3125rem;
                padding: 0 0.3125rem;
                box-sizing: border-box;
                text-align: center;
                font-size: 12px;
                line-height: 2rem;
                i {
                    display: inline-block;
                }
            }
            .disabledbtn.btn{
                background: rgb(204, 204, 204);
                color: #ffffff;
            }
        }
    }
    .scroll{
        height: 100%;
        overflow-y: scroll;
    }
</style>
