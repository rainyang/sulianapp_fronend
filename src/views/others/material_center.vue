<template>
  <div id="material_center">
    <c-title :hide="false" :text="'素材中心'"></c-title>
    <div class="content">
      <div class="user_info" v-for="(item,i) in list" :key='i'>
        <div class="user_name">
          <div class="user">
            <img :src="item.logo" />
          </div>
          <ul class="right">
            <li class="name">{{ item.name }}</li>
            <li class="time">{{ item.created_at }}</li>
          </ul>
        </div>
        <p class="share_text">
          {{ item.content }}
        </p>
        <viewer :images="item.images" class="goods_box">
          <div class="img" v-for="(img,i) in item.images" :key='i'>
            <img :src="img" />
          </div>
        </viewer>
        <div
          class="goods_lik"
          v-if="item.goods"
          @click="toGoods(item.goods.id)"
        >
          <div class="goods_img">
            <img :src="item.goods.thumb" />
          </div>
          <ul class="goods_name">
            <li class="name" style="-webkit-box-orient: vertical;">
              {{ item.goods.title | escapeTitle }}
            </li>
            <li class="number">¥{{ item.goods.price }}</li>
          </ul>
        </div>
        <div class="goods_share">
          <div
            class="left"
            @click="update(item.id)"
            v-clipboard:copy="item.content"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            <i class="iconfont icon-material_share"></i>
            <span>分享</span>
          </div>
          <div class="right" @click="postShow(item.goods.id)">
            <i class="iconfont icon-material_goodsCode"></i>
            <span>商品码</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分享 -->
    <yd-popup v-model="show1" position="bottom" height="330" @click.stop>
      <div class="share_popup_box">
        <div class="tips">提示</div>
        <ul class="text">
          <li>
            <i class="iconfont icon-info-complete current"></i>
            <span>文案已复制</span>
          </li>
          <li>
            <i class="iconfont icon-info-complete"></i>
            <span>长按素材图片保存至相册</span>
          </li>
          <li>
            <i class="iconfont icon-info-complete"></i>
            <span>点击<em>商品码</em>长按保存至相册</span>
          </li>
        </ul>
        <div class="title">
          <div class="line_left"></div>
          <span>分享</span>
          <div class="line_right"></div>
        </div>
        <div class="share_list">
          <div class="list">
            <div class="img">
              <img src="../../assets/images/material_share_a.png" />
            </div>
            <span>打开微信</span>
          </div>
          <div class="list">
            <div class="img">
              <img src="../../assets/images/material_share_c.png" />
            </div>
            <span>粘贴文案/上传图片</span>
          </div>
          <div class="list">
            <div class="img">
              <img src="../../assets/images/material_share_d.png" />
            </div>
            <span>发布朋友圈</span>
          </div>
        </div>
        <div class="block"></div>
        <div class="share_btn" @click="show1 = false">
          <button type="button">取消</button>
        </div>
      </div>
    </yd-popup>
    <!-- 商品码 -->
    <yd-popup v-model="posterShow" position="center" width="320px" @click.stop>
      <div class="goods_code_popup">
        <img
          :src="'data:'+posterImg.mime+';base64,'+posterImg.base64Image"
          v-if="posterImg.base64Image"
          style="width:100%;border-radius:0.375rem;"
        />
        <img
          src="../../assets/images/img_default.png"
          v-if="!posterImg.base64Image"
          style="width:100%;height:100%;border-radius:0.375rem;"
        />
        <div class="close" @click="posterShow = false">
          <img src="../../assets/images/material_close.png" />
        </div>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import material_center_controller from "./material_center_controller";

export default material_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#material_center {
  padding-top: 40px;
  .content {
    .user_info {
      padding: 0 0.9375rem;
      background: #fff;
      border-top: solid 0.0625rem #ebebeb;
      border-bottom: solid 0.0625rem #ebebeb;
      margin-bottom: 0.625rem;
      .user_name {
        display: flex;
        padding-top: 0.9375rem;
        .user {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 1.375rem;
          border: solid 0.0625rem #ebebeb;
          overflow: hidden;
          background: #f2f2f2;
          margin-right: 0.9375rem;
          img {
            width: 100%;
          }
        }
        .right {
          text-align: left;
          .name {
            font-size: 16px;
            margin-bottom: 0.5rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .time {
            font-size: 14px;
            color: #999;
          }
        }
      }
      .share_text {
        font-size: 16px;
        line-height: 1.5rem;
        text-align: left;
        margin-top: 0.625rem;
        margin-bottom: 0.625rem;
      }
      .goods_box {
        display: flex;
        flex-wrap: wrap;
        max-height: 21.875rem;
        overflow: hidden;
        .img {
          width: 6.9375rem;
          height: 6.9375rem;
          overflow: hidden;
          background: #f2f2f2;
          margin-right: 0.375rem;
          margin-bottom: 0.375rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .img:nth-child(3n) {
          margin: 0;
        }
      }
      .goods_lik {
        background: #f8f8f8;
        margin-top: 0.25rem;
        display: flex;
        .goods_img {
          width: 4rem;
          height: 4rem;
          overflow: hidden;
          background: #f2f2f2;
          margin-right: 0.9375rem;
          img {
            width: 100%;
          }
        }
        .goods_name {
          text-align: left;
          font-size: 14px;
          width: 16.625rem;
          .name {
            line-height: 2rem;
            height: 2rem;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .number {
            font-size: 14px;
            line-height: 2rem;
            height: 2rem;
          }
        }
      }
      .goods_share {
        margin-top: 0.625rem;
        border-top: solid 0.0625rem #ebebeb;
        display: flex;
        align-items: center;
        padding: 0.625rem 0;
        .left,
        .right {
          display: flex;
          width: 50%;
          border-right: solid 0.0625rem #ebebeb;
          font-size: 14px;
          color: #666;
          justify-content: center;
          .iconfont {
            margin-right: 0.375rem;
            color: #666;
            font-size: 1.125rem;
          }
        }
        .right {
          border: none;
        }
      }
    }
  }
  .share_popup_box {
    background: #fff;
    .tips {
      font-size: 16px;
      font-weight: bold;
      margin-top: 1rem;
    }
    .text {
      padding: 1.5rem 0.9375rem;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 100%;
        font-size: 14px;
        text-align: left;
        display: flex;
        padding: 0.375rem 0;
        .iconfont {
          font-size: 1.125rem;
          margin-right: 0.25rem;
          color: #999;
        }
        .current {
          color: #07be12;
        }
        em {
          text-decoration: underline;
          color: #4c7fff;
        }
      }
    }
    .title {
      padding: 0 0.9375rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .line_left,
      .line_right {
        width: 7.5rem;
        height: 0.0625rem;
        background: #ebebeb;
      }
      span {
        font-size: 20px;
      }
    }
    .share_list {
      padding: 1.25rem 0.9375rem;
      display: flex;
      justify-content: space-around;
      .list {
        display: flex;
        align-items: center;
        margin: 0 0.2rem;
        .img {
          width: 1.2rem;
          height: 1.2rem;
          overflow: hidden;
          margin-right: 0.1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .block {
      height: 0.625rem;
      background: #f5f5f5;
    }
    .share_btn {
      button {
        border: none;
        height: 3.125rem;
        font-size: 16px;
      }
    }
  }
  .goods_code_popup {
    background: #fff;
    border-radius: 0.5rem;
    position: relative;
    width: 90%;
    display: inline-block;
    margin: 0 auto;
    .goods_img {
      width: 20rem;
      height: 20rem;
      background: #f2f2f2;
      overflow: hidden;
      padding: 0.25rem;
      border-radius: 0.375rem 0.375rem 0 0;
      img {
        width: 85%;
      }
    }
    .goods_info {
      display: flex;
      justify-content: space-between;
      padding: 0.625rem;
      .info_left {
        width: 12.5rem;
        .name {
          font-size: 14px;
          line-height: 1.25rem;
          height: 2.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .price {
          font-size: 24px;
          color: #f15353;
          text-align: left;
          margin-top: 0.75rem;
          font-weight: bold;
          span {
            font-size: 14px;
            color: #8c8c8c;
            text-decoration: line-through;
            margin-left: 0.9375rem;
            font-weight: normal;
          }
          font {
            font-size: 14px;
          }
        }
      }
      .info_right {
        .code_img {
          width: 5.5rem;
          height: 5.5rem;
          background: #f2f2f2;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        span {
          font-size: 12px;
          line-height: 1.25rem;
        }
      }
    }
    .close {
      position: absolute;
      top: -1rem;
      right: -1rem;
      width: 2.75rem;
      height: 2.75rem;
      overflow: hidden;
      img {
        width: 80%;
      }
    }
  }
}
</style>
