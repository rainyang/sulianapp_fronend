<template>
  <div id="robbing_center">
    <c-title :hide="false" text='抢单大厅'></c-title>
    <div style="height:40px"></div>
    <div id="content">
      <div class="bobbing" v-for="(list,i) in robbingList" :key='i' @click="toRobbingDetail(list.id)">
        <div class="icon">
          <img src="../../../assets/images/order_a.png">
        </div>
        <ul class="info">
          <li>配送至：{{list.address.address}}</li>
          <li>{{list.address.realname}}：{{list.address.mobile}}</li>
          <li class="info_c" :class="list.order_distributor.button_models.value==='1'?'':'complete'">
            <span class="left">预计{{income_name_text}}：¥{{list.order_distributor.dividend}}</span>
            <span class="btn" v-if="list.order_distributor.button_models"
                  @click.stop="operation(list.order_distributor.button_models,list.id)">{{list.order_distributor.button_models.name}}</span>
          </li>
        </ul>
      </div>
      <div class="no_data" v-if="robbingList.length < 1">没有更多喽~</div>
    </div>
  </div>
</template>
<script>
  import robbing_center_controller from './robbing_center_controller';

  export default robbing_center_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  #robbing_center {
    #content {
      .bobbing {
        background-color: #fff;
        margin-top: 0.625rem;
        padding: 0.75rem 0.875rem;
        display: flex;
        .icon {
          width: 1.75rem;
          height: 1.75rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            align-self: center;
            width: 80%;
            line-height: 1.75rem;
          }
        }
        .info {
          margin-left: 0.625rem;
          font-size: 14px;
          text-align: left;
          li {
            line-height: 1.5rem;
          }
          .info_c {
            display: flex;
            justify-content: space-between;
            margin-top: 0.625rem;
            .left {
              color: #f15353;
            }
            .btn {
              background-color: #f15353;
              height: 1.625rem;
              width: 4rem;
              border-radius: 0.1875rem;
              color: #fff;
              text-align: center;
            }
          }
          .complete {
            .btn {
              background-color: #bebebe;
              height: 1.625rem;
              width: 4rem;
              border-radius: 0.1875rem;
              color: #fff;
              text-align: center;
            }
          }
        }
      }
      .no_data{
        font-size: 16px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }

</style>