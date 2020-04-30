<template>
  <div id="team_member">
      <c-title :hide="false" :text="`车队成员(合计：${memberTotal}人）`"></c-title>
      <mt-loadmore :top-method = 'loadTop' topDropText = "释放刷新" ref = "loadmore">
        <div id="list_box" v-if="!isShowNoText">
            <div class="user" v-for="(item, index) in dataInfo.data" :key="index" >
                <div class="user_img">
                    <img :src="item.avatar">
                </div>
                <ul class="name_number">
                    <li class="name">{{item.username}}</li>
                    <li class="number">
                        ID:{{item.uid}}
                    </li>
                </ul>
            </div>
        </div>
      </mt-loadmore>
      <h2 v-if="isShowNoText">暂无数据</h2>
  </div>
</template>

<script>
import controller from "./team_member_controller";
export default controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#team_member{
    padding-top: 40px;
    #list_box{
        background: #fff;
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
</style>
