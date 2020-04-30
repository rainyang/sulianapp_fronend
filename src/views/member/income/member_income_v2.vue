<template>
  <div id="income">
    <c-title :hide="false"
             :text='`${income_name_text}`'></c-title>
    <div style="height: 40px;"></div>
    <div id="userinfo">
      <ul>
        <li>
          <span>￥{{total_income}}</span>
          <br>累计{{income_name_text}}</li>
        <li>
          <span>￥{{income}}</span>
          <br>可{{this.fun.initWithdrawal()}}{{income_name_text}}</li>
      </ul>
      <div class="tixi"
           @click="gotoIncome">
        <span>{{this.fun.initWithdrawal()}}</span>
        <i class="fa fa-angle-right"></i>
      </div>

    </div>
    <div class="title">
      <div class="spare"></div>
      <h3>未{{this.fun.initWithdrawal()}}{{income_name_text}}</h3>
    </div>

    <!--ico : "ico-commission" income : 0 title : "分销商" type : "commission" type_name : "分销佣金"-->
    <!-- <ul id="gongge"> -->
    <template>
      <yd-grids-group :rows="3">
        <yd-grids-item :link="fun.getUrl('',{})"
                       v-for="(plug,i) in plugs" :key='i'>
          <yd-icon slot="icon"
                   :class="plug.ico"
                   custom
                   size="1.5rem"
                   color="#FF685D"></yd-icon>
          <!-- <yd-icon slot="icon" :name="plug.ico" custom size="24px" color="#FF685D"></yd-icon> -->

          <ul slot="text"
              class="text">
            <li class="money"><small>￥</small>{{plug.income}}</li>
            <li class="name">{{plug.type_name}}</li>
          </ul>
          <!-- <span ></br><font></font></span> -->
        </yd-grids-item>
      </yd-grids-group>
    </template>
    <!-- <li v-for="plug in plugs">
				<i :class="plug.ico"></i>
				<yd-icon slot="icon" name="shouyintai" custom size="24px" color="#FF685D"></yd-icon>
				<br />{{plug.type_name}}
				<br />
				<font>￥{{plug.income}}</font>元
			</li> -->
    <!-- </ul> -->
    <p class="mszf">
      <router-link :to="fun.getUrl('presentationRecord')">{{this.fun.initWithdrawal()}}明细
        <span></span>
        <i class="fa fa-angle-right"></i>
      </router-link>
    </p>
  </div>
</template>
<script>
import member_incomecontroller from "./member_income_v2_controller";
export default member_incomecontroller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#income {
  #userinfo {
    background: #fff;
    ul {
      display: flex;
      align-items: center;
      background-color: #f15353;
    }
    ul li:last-child {
      border: 0;
    }
    ul li {
      color: #fff;
      text-align: center;
      display: block;
      flex: 1;
    }
    ul li span {
      color: #fff;
      font-size: 16px;
      margin-bottom: 0.3125rem;
      display: inline-block;
    }
    ul li {
      width: 50%;
      margin: 1rem 0;
      box-sizing: border-box;
      font-size: 12px;
    }
    .tixi {
      color: #333;
      font-size: 16px;
      padding: 0 0.875rem;
      line-height: 2.75rem;
      display: flex;
      justify-content: space-between;
      i {
        line-height: 2.75rem;
        font-size: 1.5rem;
        color: #c9c9c9;
      }
      a {
        color: #fff;
      }
    }
  }
  .title {
    background-color: #fff;
    margin-top: 0.625rem;
    border-bottom: solid 0.0625rem #ebebeb;
    height: 2.25rem;
    line-height: 2.25rem;
    padding: 0 0.875rem;
    display: flex;
    .spare {
      width: 0.25rem;
      height: 1rem;
      border-radius: 0.0625rem;
      background-color: #f15353;
      margin-right: 0.5rem;
      margin-top: 0.5625rem;
      h3 {
        font-size: 14px;
      }
    }
  }
  #gongge {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: #fff;
    padding: 0.625rem 0;
    li {
      flex: 33% 0 0;
      flex-direction: row;
      i {
        font-size: 2.125rem;
        color: #cccccc;
        margin: 0.625rem 0;
      }
      font {
        color: #e84e40;
      }
      a {
        color: #333;
        img {
          width: 1.4375rem;
          margin: 0.3125rem 0;
        }
      }
    }
  }
  .text {
    .money {
      color: #f15353;
      font-size: 14px;
    }
    .name {
      color: #333;
      font-size: 12px;
    }
  }
  .mszf {
    background: #fff;
    padding: 0 0.875rem;
    margin: 0;
    text-align: left;
    overflow: hidden;
    margin-top: 0.625rem;
    margin-bottom: 3.125rem;
    height: 2.75rem;
    box-sizing: border-box;
    line-height: 2.75rem;
    font-size: 16px;
    color: #333;
    i {
      font-size: 1.5rem;
      float: right;
      line-height: 2.75rem;
      color: #c9c9c9;
    }
    span {
      float: left;
    }
    a {
      color: #333;
      display: block;
    }
  }
}
</style>
