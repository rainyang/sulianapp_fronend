<template>
  <div id="courier">
      <c-title :hide="false"
            :text="couriername+'上传'"></c-title>
        <div style="height: 40px;"></div>
        <div class="banner" v-if='banner'>
            <img :src="banner">
        </div>
        <div class="uploader">
            <div style='position:relative;padding-top:20px' class="scan-box" >
                <input type="text" :placeholder="'请输入'+couriername+'号或扫码录入'" v-model='cupcode'>
                <div>
                <yd-icon slot="icon" class="iconfont icon-saoyisao" custom size="24px" color="#666" @click.native='getcode'></yd-icon>
                </div>
            </div>
            <div >
                <input type="file"  accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change='getimgurl' style='display:none'  id="input">
                <div style='positive:relative;width:88.5%;height:113px;margin-left:5.5%;position:absolute;top:115px;' :class="{posit:banner}" v-if='show'>
                    <span style="width: 30px;height: 30px;margin-top: 3px;line-height: 30px;border-radius: 50%;display: inline-block;position:absolute;right:5px;top:0;z-index:100;font-size:23px;background: rgba(45,45,45,0.8)" @click='changeimg'><i style="color: white;" class="el-icon-delete"></i></span>
                    <img :src="imgdata" style='width:100%;height:100%;' >
                </div>
            </div>
            <div style='margin-top:20px;margin-bottom: 0.4rem'>
                <div class="select" @click='selectfile'>
                    <span>点击这里选择{{couriername}}图片</span>
                </div>
            </div>
            <van-button type="primary" @click.native='submitUpload' style="width: 60%">上传</van-button>
            <!--<el-button type="success" @click.native='submitUpload'>上传</el-button>-->
        </div>
            <router-link :to="fun.getUrl('courierrecord')">
                <div class="record">
                    <span>查看上传记录</span>
                    <i class="fa fa-angle-right"></i>
                </div>
            </router-link>
        <div class="rulescontainerr" v-if='title'>
            <header>{{title}}</header>
            <div class="rules">
               {{rules}}
            </div>           
        </div>
  </div>
</template>
<script>
import courier_controller from './courier_controller';
export default courier_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#courier{
        .posit{
            top:285px!important;
        }
       .banner{
           height:170px;
           img{
               width:100%;
               height:100%;
           }
       }
       .uploader{
           height:270px;
           background: #fff;  
           input[type='text']{
               border:solid 1px #e2e2e2;
               width:80%;
               height:36px;
               border-radius: 4px;
               margin:auto;
               padding:0 6px;
           }         
           .iconfont{
               position: absolute;
               right:12%;
               top:42%;
           }
           .el-upload-list--picture{
               display: none;
           }
           .select{
               border:dashed 1px #e2e2e2;
               height:30vw;
               border-radius: 4px;
               margin:0 20px;
                span{
                    line-height: 30vw;
                    color:#ccc;
                    font-size:14px;
                }
           }
           .el-button--success{
               width: 70%;
               height: 35px;
               margin-top:23px;
           }
       }
       .record{
           display: flex;
           justify-content: space-between;
            height:44px;
            background:#fff;
            text-align:left;
            color:#999;
            box-sizing:border-box;
            margin:10px 0;
            line-height: 44px;
            padding:0 14px;
            font-size:14px;
            i{
                font-size:24px;
                color:#c9c9c9;
                line-height:44px;
            }
            .icon{
                display:inline-block;
                width:0.55rem;
                height:0.55rem;
                border:solid 1px #000;
                border-left:transparent;
                border-bottom:transparent;
                transform:rotate(45deg)	;
                float:right;
                margin-top:0.3rem;			
            }
       }
       .rulescontainerr{
           header{
               width: 100%;
               height: 40px;
               background: #fff;
               line-height: 40px;
               font-size: 15px;
               font-weight: bold;
               margin-bottom: 2px;
           }
           .rules{
               box-sizing: border-box;
               padding:10px 14px;
               background: #fff;
               line-height:24px;
               font-size: 13px;
               text-align: left;
               
           }
       }
}
</style>