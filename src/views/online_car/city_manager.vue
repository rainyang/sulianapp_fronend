<template>
  <div id="city_manager">
      <c-title :hide="false" :text="`城市经理人(合计：${managerNumber}人）`"></c-title>
      <div id="list_box" v-if="!this.fun.isTextEmpty(dataInfo.data)">
          <mt-loadmore :top-method = 'loadTop' topDropText = "释放刷新" ref = "loadmore">
              <div class="con">
                <div class="user" v-for="(item, index) in dataInfo.data" :key="index" >
                    <div class="user_img">
                        <img :src="item.avatar">
                    </div>
                    <ul class="name_number">
                        <li class="name">{{item.username}}</li>
                        <li class="number">
                            <span>总投资{{item.total_order_amount}}元</span>
                            <span>总投资车辆{{item.car_num}}辆</span>
                        </li>
                    </ul>
                </div>
            </div>
          </mt-loadmore>
      </div>
      <h2 v-if="isShowNoText">暂无数据</h2>
  </div>
</template>

<script>
import controller from "./city_manager_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#city_manager{
    padding-top: 40px;
    #list_box{
        background: #fff;
        .con{
            min-height: 100vh;
            .user{
                border-bottom: solid 0.0625rem #ebebeb;
                display: flex;
                padding: 0.875rem;
                .user_img{
                    width: 3rem;
                    height: 3rem;
                    border-radius: 2rem;
                    background: #f2f2f2;
                    overflow: hidden;
                    margin-right: 0.625rem;
                    img{
                        width: 100%;
                    }
                }
                .name_number{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 289px;
                    .name{
                        font-size: 16px;
                        max-width: 10rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .number{
                        span{
                            display: block;
                            font-size: 14px;
                        }
                        span:last-child{
                            color:#ed743b;
                        }
                    }
                }
            }
        }
    }
}
</style>
