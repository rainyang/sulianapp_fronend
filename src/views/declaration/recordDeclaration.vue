<!-- 报单记录 -->
<template>
  <div id="recordDeclaration">
      <c-title :hide="false" text="报单记录"></c-title>
      <div class="content">
          <mt-loadmore :top-method = 'loadTop' topDropText = "释放刷新" ref = "loadmore">
            <ul class="main">
                <li class="grade_list" v-for="(item,i) in this.info" :key='i'>
                    <div class="grade" >
                        <span class="left">{{item.has_one_members.nickname}}({{item.has_one_level.name}})</span>
                        <span class="right">-{{item.amount}}</span>
                    </div>
                    <div class="grade" >
                        <span class="time">{{item.created_at}}</span>
                        <span class="state">扣除金额</span>
                    </div>
                </li>
                <h2 style="padding-top: 24px;color: #f15353;" v-if="this.fun.isTextEmpty(this.info)">暂无相关记录！</h2>
            </ul>
          </mt-loadmore>
      </div>
  </div>
</template>

<script>
import recordDeclaration from "./recordDeclaration_controller";
export default recordDeclaration;
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
#recordDeclaration{
    padding-top: 40px;
    .content{
        padding-left: 0.875rem;
        background: #fff;
        .main{
            min-height: 100vh;
            .grade_list{
                padding: 0.625rem 0.875rem 0.625rem 0;
                border-bottom: solid 0.0625rem #ebebeb;
                text-align: left;
                .grade{
                    display: flex;
                    justify-content: space-between;
                    line-height: 1.875rem;
                    .left{
                        font-size: 16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 240px;
                    }
                    .right{
                        color:#f15353;
                        font-size: 18px;
                    }
                }
                .state{
                    font-size: 14px;
                    line-height: 1.5rem;
                }
                .time{
                    font-size: 14px;
                    line-height: 1.5rem;
                    color:#8c8c8c;
                }
            }
            .grade_list:last-child{
                border:none;
            }
        }
    }
}
</style>