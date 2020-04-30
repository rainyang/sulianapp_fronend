<template>
	<div id="findpwd">
		<c-title :hide="false" text='忘记密码'></c-title>
		<div style="height:40px;"></div>
		<!--<img style='width:20%;height:40px;position:absolute;display:block;left:74%;top:8rem;z-index:999' :src="imgcode" @click='getimgdata' v-if='imgcode'>-->
		<!-- 新页面 -->
		<div id="content">
			<ul class="area_number">
				<li>
          <div class="must">*</div>
					<span>国家区号</span>
					<input type="text" placeholder="+86" v-model.trim="form.country">
				</li>
			</ul>
			<ul class="login_info">
				<li v-if='imgcode'>
          <div class="must">*</div>
					<input type="text" placeholder="请输入右侧图形验证码" v-model.trim="form.captcha">
          <div>
            <img
              style="width:100%;height:2.5rem;z-index:999;"
              :src="imgcode"
              @click="getimgdata"
              v-if="imgcode"
            />
          </div>
				</li>
				<li>
          <div class="must">*</div>
					<input type="text" placeholder="请输入手机号" v-model.trim="form.mobile">
				</li>
				<li class="code">
          <div class="must">*</div>
					<input type="text" placeholder="请输入验证码" v-model.trim="form.code">
					<!-- <button type="button">获取验证码</button> -->
					<!-- ↓↓关键代码是这里↓↓ -->
					<yd-sendcode slot="right" v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode>
					<!-- ↑↑关键代码是这里↑↑ -->
				</li>
				<li>
          <div class="must">*</div>
					<input type="password" placeholder="设置密码" v-model.trim="form.password">
				</li>
				<li>
          <div class="must">*</div>
					<input type="password" placeholder="确认密码" v-model.trim="form.confirm_password">
				</li>
			</ul>
			<div class="btn">
				<button type="button" @click="findpwd">提交修改</button>
			</div>
		</div>
		<!-- end -->
		<!-- <div class="lin"> -->
			<!-- <img style='width:20%;height:40px;position:absolute;display:block;left:74%;top:8rem;z-index:999' :src="imgcode" @click='getimgdata' v-if='imgcode'> -->
			<!-- <yd-cell-group> -->

				<!-- <yd-cell-item>
					<span slot="left">国际区号：</span>
					<input slot="right" type="number" placeholder="请输入国际区号" v-model.trim="form.country">
				</yd-cell-item> -->

				<!-- <yd-cell-item v-if='imgcode'>

					<span slot="left">图形验证码：</span>
					<input type="text" slot="right" placeholder="请输入右侧图形验证码" v-model.trim="form.captcha">
				</yd-cell-item> -->

				<!-- <yd-cell-item> -->
					<!-- <span slot="left">手机号：</span> -->

					<!-- <input type="tel" slot="right" placeholder="请输入手机号码" v-model.trim="form.mobile"> -->

					<!-- ↓↓关键代码是这里↓↓ -->
					<!-- <yd-sendcode slot="right" v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode> -->
					<!-- ↑↑关键代码是这里↑↑ -->

				<!-- </yd-cell-item> -->
				<!-- <yd-cell-item>
					<span slot="left">验证码：</span>
					<input slot="right" type="text" placeholder="请输入验证码" v-model.trim="form.code">
				</yd-cell-item> -->

				<!-- <yd-cell-item>
					<span slot="left">设置密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.password">
				</yd-cell-item> -->

				<!-- <yd-cell-item>
					<span slot="left">确认密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.confirm_password">
				</yd-cell-item> -->

			<!-- </yd-cell-group> -->

			<!-- <yd-button-group>
				<yd-button size="large" type="primary" @click.native="findpwd">提交修改</yd-button>
			</yd-button-group> -->

		<!-- </div> -->
	</div>
</template>

<script>
import findpwd_controller from "./findpwd_controller";
export default findpwd_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#findpwd {
  width: 100%;
  .must {
    color: #f15353;
    align-self: center;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  #code {
    background: #ccc;
    padding: 0.1875rem 0.3125rem;
    border-radius: 0.1875rem;
  }
  h1 {
    color: #42b983;
  }
  .mint-button--large {
    margin-top: 0.625rem;
  }
  #bts {
    margin: auto 0.3125rem;
    .mint-button--default {
      background-color: #13ce66;
      color: #fff;
    }
  }
  .forget {
    color: #999;
    float: right;
  }
  // 新页面
  #content {
    background-color: #fff;
    height: 627px;
    .area_number {
      padding-top: 20px;
      font-size: 16px;
      color: #333;
      margin-bottom: 30px;
      li {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        span {
          width: 92px;
          text-align: left;
        }
        input {
          border: none;
          border-bottom: solid 1px #eeeeee;
          width: 240px;
          padding: 0 10px;
        }
      }
    }
    .login_info {
      margin: 20px;
      li {
        margin: 20px auto 0 auto;
        width: 21rem;
        display: flex;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        /*border-bottom: solid 1px #ccc;*/
        position: relative;
        input {
          width: 100%;
          border: none;
          border-bottom: solid 1px #eeeeee;
        }
        span {
          font-size: 14px;
          position: absolute;
          right: 0;
          color: #333;
        }
        .img {
          width: 40px;
          overflow: hidden;
          img {
            margin-top: 26%;
            width: 48%;
          }
        }
      }
      .code {
        justify-content: space-between;
        button {
          border: none;
          background-color: #ebebeb;
          color: #f15353;
          font-size: 14px;
          border-radius: 30px;
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          margin-top: 4px;
        }
      }
    }
    .btn {
      margin-top: 40px;
      button {
        width: 315px;
        height: 45px;
        font-size: 16px;
        margin-bottom: 20px;
        border-radius: 30px;
        border: none;
        background-color: #f15353;
        color: #fff;
      }
    }
  }
}
</style>
