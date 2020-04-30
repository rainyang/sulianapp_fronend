<template >
   
    <div id="alipay-detail">
        <c-title :hide="false" text='充值'></c-title>
        <div id="content">
            <div class="content_a">
                <h1>支付宝支付链接</h1>
                <p>{{url}}</p>
                <button type="button" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</button>
            </div>
            <div class="content_b">
                <h2>支付宝二维码</h2>
                <img :src="code_url">
            </div>
        </div>
    </div>
</template>

<script>
import controller from './wft_alipay_controller';
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#alipay-detail {
    padding-top: 40px;
    // background: rgba(0, 0, 0, .8);
    // height: 100%;
    // position: fixed;
    // width: 100%;
    // img {
    //     width: 100%;
    //     position: relative;
    //     top: -2.5rem;
    // }
    #content{
        margin-top: 0.625rem;
        background: #fff;
        padding: 0 0.875rem;
        .content_a{
            padding: 0.625rem 0;
            border-bottom:solid 0.0625rem #ebebeb;
            h1{
                font-size:18px;
                line-height: 2.5rem;
            }
            p{
                padding: 0.625rem;
                background-color:#f5f5f5;
                font-size:16px;
                text-align: left;
                border-radius: 0.375rem;
                margin-bottom: 1.25rem;
            }
            button{
                margin: 0.625rem 0;
                width: 6.25rem;
                height: 1.625rem;
                border-radius: 1rem;
                border:solid 0.0625rem #ccc;
                color:#666;
                font-size:14px;
            }
        }
        .content_b{
            padding: 0.625rem 0 1.25rem 0;
            h2{
                font-size:16px;
                line-height: 2.25rem;
                margin-bottom:1.25rem;
            }
            img{
                width: 11.25rem;
                height: 11.25rem;
            }
        }
    }
}
</style>