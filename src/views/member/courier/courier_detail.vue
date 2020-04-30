<template>
  <div id="courierdetail">
      <c-title :hide="false"
            text='记录详情'></c-title>
        <div style="height: 40px;"></div>
        <div class="detail">
            <ul>
                <li>
                    <span class="left">{{couriername}}号：</span>
                    <span class="right">{{datas.courier_number}}</span>
                </li>
                <li>
                    <span class="left">单号状态：</span>
                    <span class="right" v-if='datas.status==0' >待审核</span>
                    <span class="right" v-if='datas.status==1' style='color:green'>已通过</span>
                    <span class="right" v-if='datas.status==2' style='color:#ccc'>已驳回</span>
                </li>
                <li>
                    <span class="left">{{datas.status==1?'获得奖励：':'预计奖励'}}</span>
                    <span class="right">{{datas.has_manage_info.reward_point}}个积分{{datas.has_manage_info.reward_cash}}元现金</span>
                </li>
                <li>
                    <span class="left">奖励时间：</span>
                    <span>{{datas.created_at}}</span>
                </li>
            </ul>
            <div class="express-img">
                <span>{{couriername}}图片：</span>
                <div class="img"><img :src='datas.courier_img'></div>
            </div>
            <div style="clear:both"></div>
        </div>
  </div>
</template>
<script>
import courier_detail_controller from './courier_detail_controller';
export default courier_detail_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#courierdetail{ 
    .detail{
        height:360px;
        background: #fff;
        box-sizing: border-box;
        padding:10px 14px;
        ul{
            li{
            font-size:13px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            .right{
                color:#f15353;
            }
            }
        }
        .express-img{
            span{
                line-height: 30px;
                display: inline-block;
            }
            .img{
                width:100%;
                height:100px;
                border:solid 1px #ebebeb;
                border-radius: 4px;
                img{
                    display: block;
                    width: 100%;
                    height:100%;
                }
            }
        }
        div{
            text-align: left;
            font-size: 14px;
            &:nth-child(1){
                height:40px;
                line-height: 40px;
            }
            &:nth-child(2){
                height:30px;
                line-height: 30px;
            }
            &:nth-child(3){
                width: 100%;
                height:100px;
                img{
                    display: block;
                    float: left;
                    width:70%;
                    height:100px;
                }
            }
            .icon{
                padding:5px 10px;
                background: orange;
                border-radius:3px;
                color:#fff;
            }
        }
    }
     
}
</style>