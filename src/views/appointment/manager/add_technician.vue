<template>
  <div style="background-color: #FFFFFF;" id="addTechnician">
    <c-title :hide="false" :text="worker_id? '编辑技师': '添加技师'">
    </c-title>
    <div style="height: 40px"></div>
    <div class="main">
      <div style="position: relative">
        <p class="title">会员</p>
        <input class="input-class" v-model="text_id" type="text" @keyup="getMember" placeholder="请输入会员ID/昵称">
        <div class="member-list" v-if="showMember">
          <p v-for="(item, index) in member" :key="index" @click="chooseMember(item)">{{item.nickname}}  (id: {{item.uid}})</p>
          <p v-if="member.length <= 0" style="text-align: center;">搜索不到用户</p>
        </div>
      </div>
      <div>
        <p class="title">技师姓名</p>
        <input class="input-class" v-model="applyModel.name" type="text" placeholder="请输入技师姓名">
      </div>
      <div style="display: flex; padding: 1rem 0; border-bottom: 1px solid #f5f5f5;" @click="getProject">
        <span class="black">关联项目</span>
        <i class="iconfont icon-advertise-next"></i>
      </div>
      <div>
        <p class="title">技师简介</p>
        <van-cell-group>
          <van-field
            v-model="applyModel.description"
            rows="1"
            :autosize="{ minHeight: 120 }"
            type="textarea"
            placeholder="输入技师简介"
          />
        </van-cell-group>
      </div>

      <div v-if="!worker_id">
        <p class="title">技师介绍</p>
        <div class="imgflex">
          <div v-for="(val,index) in applyModel.worker_content "
               :key="index">
            <div class="photobox">
              <img :src="val"
                   style="width: 100%">
              <i @click="removeImg(index)"></i>
            </div>
          </div>
          <van-uploader :after-read="multipleMethod_1"
                        :max-size="photosize"
                        @oversize="onphotosize2"
                        multiple>
            <div
              style="padding: 0.2rem;  width:5rem;height: 5rem; border: 1px dashed #c0ccda;margin: 0 auto;display:flex;">
              <img src="../../../assets/images/up_icon.png"
                   style="width:50%;height:50%;"
                   class="avatar">
            </div>
          </van-uploader>
        </div>
      </div>
      <div>
        <p class="title">头像</p>
        <div style="margin: 0 0.5rem">
          <van-uploader :after-read="onRead"
                        :max-size="photosize"
                        @oversize="onphotosize">
            <div
              style="padding: 0.2rem; width:3.5rem;height: 3.5rem;border: 1px dashed #c0ccda;margin: 0 auto;display:flex;border-radius: 50%;">
              <img :src="applyModel.thumb?applyModel.thumb:require('../../../assets/images/up_icon.png')"
                   :style="{width:(applyModel.thumb?'100%':'50%'),height:(applyModel.thumb?'100%':'50%')}"
                   class="avatar">
            </div>
          </van-uploader>
        </div>
      </div>
    </div>

    <div style="padding-bottom: 2rem;">
      <p class="add" @click="editTechnician" v-if="worker_id">编辑技师</p>
      <p class="add" @click="addTechnician" v-else>添加技师</p>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
    >
      <div style="margin: 0.5rem 1rem">
        <div class="top">
          <p class="title">关联项目</p>
          <p class="add-icon" @click="show = false">确定</p>
        </div>
        <div style="height: 16rem;overflow-y: scroll">
          <van-checkbox-group v-model="applyModel.project_ids">
            <div class="item" v-for="item in projects" :key="item.id">
              <van-checkbox :name="item.id.toString()" checked-color="#f4a82e">
                <div style="display: flex">
                  <div class="item-left">
                    <img :src="item.thumb" alt="">
                  </div>
                  <p class="item-right">{{item.title}}</p>
                </div>
              </van-checkbox>
            </div>
          </van-checkbox-group>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
  import add_technician_controller from "./add_technician_controller";

  export default add_technician_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .main {
    padding: 1rem;
    text-align: left;
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #cccccc;
    }
  }

  .add {
    width: 18.75rem;
    height: 2.5rem;
    background-color: #f4a82e;
    border-radius: 1.25rem;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    line-height: 2.5rem;
    margin: 0 auto;
  }

  .black {
    font-weight: bold;
    font-size: 14px;
    flex: 1;
  }

  .title {
    font-weight: bold;
    font-size: 14px;
    margin: 1rem 0;
  }

  .content {
    margin: 0 0.5rem;
  }

  .input-class {
    border: none;
    outline: none;
    background-color: #f7f7f7;
    border-radius: 0.375rem;
    width: 100%;
    padding: 0.5rem 0.5rem;
  }

  .top {
    display: flex;
    .title {
      flex: 1;
      font-size: 16px;
      text-align: left;
    }
    .add-icon {
      background-color: #f4a82e;
      border-radius: 1.25rem;
      color: #FFFFFF;
      width: 3rem;
      height: 1.5rem;
      line-height: 1.5rem;
      align-self: center;
    }
  }

  .item {
    margin: 0.5rem 0;
  }

  .item-left {
    width: 4.625rem;
    height: 4.625rem;
    border-radius: 0.156rem;
    flex: 0 0 5rem;
    img {
      width: 4.625rem;
      height: 4.625rem;
    }
  }

  .item-right {
    margin-left: 0.5rem;
    text-align: left;
  }

  .imgflex {
    display: flex;
    flex-wrap: wrap;
    .photobox {
      position: relative;
      overflow: hidden;
      background: #f5f5f5;
      width: 5rem;
      height: 5rem;
      border: 1px dashed #c0ccda;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
      i {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        background: url("../../../assets/images/close_iocn.png");
        background-size: 100%;
      }
    }
  }

  .avatar {
    border-radius: 50%;
  }

  .member-list {
    border: 1px solid #eeeeee;
    border-radius: 8px;
    background: #FFFFFF;
    position: absolute;
    top: 4.5rem;
    left: 0;
    width: 100%;
    height: 8rem;
    padding: 0.5rem;
    overflow-y: scroll;
    p {
      margin: 0.4rem 0;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eeeeee;
    }
  }

</style>
