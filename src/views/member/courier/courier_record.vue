<template>
  <div id="courierrecord">
      <c-title :hide="false"
            text='上传记录'></c-title>
        <div style="height: 40px;"></div>
        <header>
            <span v-for="(val,key,index) in recordtype" :key="index" :class="{color:key==selectkey}" @click='filtertype(key)'>{{val}}</span>
        </header>
        <div class="record" v-for="(val,key,index) in datas" :key="index">
            <p>
                <span>记录id：{{val.id}}</span>
                <span style='color:#f15353' v-if='val.status==0'>待审核</span>
                <span style='color:green' v-if='val.status==1'>已通过</span>
                <span style='color:#ccc' v-if='val.status==2'>已驳回</span>
            </p>
            <div class="records">
                <section>
                    <span>{{couriername}}号</span>
                    <span>{{val.courier_number}}SM3478598746</span>
                </section>
                <router-link :to="fun.getUrl('courierdetail',{id:val.id})">
                    <div class="look">
                        <span>查看记录</span>
                        <i class="fa fa-angle-right"></i>
                    </div>
                </router-link>  
            </div>          
        </div>
  </div>
</template>
<script>
import courier_record_controller from './courier_record_controller';
export default courier_record_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#courierrecord{
    .color{border-bottom:solid 3px #f15353;color:#f15353}
    header{
        width: 100%;
        height:45px;
        margin-top:1px;
        background: #fff;
        span{
            display:block;
            height:45px;
            width: 25%;
            text-align: center;
            float: left;
            line-height:45px;
            font-size:14px; 
        }
    }
    .record{
        p{
            margin-top:10px;
            height:40px;
            background: #fff;
            span{
                font-size: 14px;
                line-height: 40px;
                box-sizing: border-box;
                &:nth-child(1){
                   float:left;
                   padding-left:10px;
                }
                &:nth-child(2){
                    float:right;
                    padding-right:10px;
                }
            }
        }
        .records{
            background: #fff;
            margin-top:1px;
            padding:10px  14px;
            color:#8c8c8c;
                section{
                    width: 100%;
                    height:30px;
                    font-size:13px;
                    span{
                        line-height: 30px;
                        box-sizing: border-box;
                        &:nth-child(1){
                        float:left;
                        }
                        &:nth-child(2){
                            float:right;
                        }
                    } 
                }
            .look{
                line-height: 30px;
                display: flex;
                justify-content: space-between;
                    font-size: 13px;
                    text-align: left;
                    i{
                        line-height: 30px;
                        font-size:20px;
                        color:#c9c9c9;
                    }
                }
        }
    }      
}
</style>