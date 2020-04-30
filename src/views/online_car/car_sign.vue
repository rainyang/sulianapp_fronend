<template>
  <div id="car_sign">
      <c-title :hide="false" :text="`签约汽车(合计：${signNumber}人)`"></c-title>
      <div id="content">
          <mt-loadmore :top-method = 'loadTop' topDropText = "释放刷新" ref = "loadmore">
              <div class="con">
                <div class="list_box" v-for="(item,index) in signInfo" :key="index">
                    <div class="sign_user">
                        <p class="car_number">车牌号：{{item.number_plate}}</p>
                        <div class="user_car">
                            <div class="img">
                                <img :src="item.godos_thumb">
                            </div>
                            <ul class="car_name">
                                <li>{{item.godos_title}}</li>
                                <li>{{item.godos_brand_name}}</li>
                            </ul>
                            <i class="iconfont icon-onlineCar_h" @click="goToAdress(item.number_plate)"></i>
                        </div>
                    </div>
                    <div class="user_info_list" v-for="(items,indexs) in item.car_has_many_driver" :key="indexs">
                        <div class="user_info">
                            <div class="user_img">
                                <img :src="items.has_one_member.avatar_image">
                            </div>
                            <ul class="user_name">
                                <li>
                                    <span>{{items.has_one_member.username}}</span>
                                    <span>ID：{{items.has_one_member.uid}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
            <router-link :to="this.fun.getUrl('home')" tag = 'div' class="bottom_btn">
              <button type="button">继续签约</button>
          </router-link>
      </div>
  </div>
</template>

<script>
import controller from "./car_sign_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#car_sign{
    padding-top: 40px;
    padding-bottom: 60px;
    #content{
        .con{
            min-height: 100vh;
            .list_box{
                background: #fff;
                margin-bottom: 0.625rem;
                .sign_user{
                    padding: 0.625rem 0;
                    .car_number{
                        padding: 0 0.875rem;
                        line-height: 2.25rem;
                        text-align: left;
                        font-size: 16px;
                        background: #fafafa;
                    }
                    .user_car{
                        padding: 0 0.875rem;
                        margin-top: 0.625rem;
                        display: flex;
                        position: relative;
                        .img{
                            width: 3rem;
                            height: 3rem;
                            overflow: hidden;
                            background: #f2f2f2;
                            img{
                                width: 100%;
                            }
                        }
                        .car_name{
                            margin-left: 0.625rem;
                            li:first-child{
                                font-size: 15px;
                                line-height: 1.5rem;
                                text-align: left;
                                max-width: 15rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            li:last-child{
                                font-size: 14px;
                                color:#8c8c8c;
                                line-height: 1.5rem;
                                text-align: left;
                            }
                        }
                    }
                    .iconfont{
                        position: absolute;
                        right: 0.875rem;
                        top: 0.75rem;
                        font-size: 24px;
                        color:#ed743b;
                    }
                }
                .user_info_list{
                    border-top: solid 0.0625rem #ebebeb;
                    border-bottom: solid 0.0625rem #ebebeb;
                    padding-left: 0.875rem;
                    .user_info{
                        border-bottom: solid 0.0625rem #ebebeb;
                        padding: 0.875rem 0.875rem 0.875rem 0;
                        display: flex;
                        align-items: center;
                        .user_img{
                            width: 2.25rem;
                            height: 2.25rem;
                            border-radius: 2rem;
                            background: #f2f2f2;
                            overflow: hidden;
                            margin-right: 0.625rem;
                            img{
                                width: 100%;
                            }
                        } 
                        .user_name{
                            width: 18.8125rem;
                            li{
                                display: flex;
                                justify-content: space-between;
                                font-size: 15px;
                                span:first-child{
                                    max-width: 12.5rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        } 
                    } 
                    .user_info:last-child{
                        border:none;
                    }
                }
                
            }
        }
        .bottom_btn{
            position: fixed;
            width: 100%;
            bottom: 0;
            button{
                width: 100%;
                background:#ed743b;
                height: 2.875rem;
                font-size: 16px;
                color:#fff;
                border:none;
            }
        }
    }
}
</style>
