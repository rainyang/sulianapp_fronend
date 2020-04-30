<template>
  <div id="microclassification">
    <div class="header">
      <div class="left"
           @click="goBack">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="search">
        <div class="searchion"><i class="iconfont iconfont icon-sousuo1"></i></div>
        <div class="textinp">
          <van-field v-model="commodityTitle"
                     placeholder="搜索商品标题"
                     :clearable="true" />
        </div>
      </div>
      <div class="right"
           @click="searchBtn">搜索</div>
    </div>
    <div class="list">
      <div class="top">
        <div class="Classification">
          <div class="left">
            <mt-navbar v-model="selected">
              <template v-for="(item,index) in catelist">
                <mt-tab-item :id="1+index+''"
                             @click.native="swishTabTItem(item.id,index)">{{item.name}}</mt-tab-item>
              </template>
            </mt-navbar>
          </div>
          <div class="right"
               @click="classificationShow">
            <div class="imgicon"
                 v-if="classificationHide">
              <img src="../../assets/images/micro_communities/class_bottom@2x.png"
                   alt="">
            </div>
            <div class="imgicon"
                 v-else>
              <img src="../../assets/images/micro_communities/class_top@2x.png"
                   alt="">
            </div>
          </div>
        </div>
        <div class="all_classification"
             :class="{hide:classificationHide }">
          <div class="bottom">
            <ul>
              <li v-for="(item,index) in catelist"
			  :key='index'
                  @click="swishTabTItem(item.id,index)">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <mt-tab-container v-model="selected">
        <template v-for="(item,index) in catelistData">
          <mt-tab-container-item :id="1+index+''">
            <div class="video_list"
                 v-if="item&&item.length>0">
              <c-flow :list='item'
                      v-if="selected == index+1"></c-flow>
              <!-- =======================废弃  v-if=='false'; ============================= -->
              <ul v-if="false">
                <li v-for="(childitem,childindex) in item"
				:key='childindex'
                    @click="jumpDetails(childitem.has_many_image[0].stick_id)">
                  <div class="top">
                    <img :src="childitem.has_many_image[0].url"
                         alt="">
                  </div>
                  <div class="bottom">
                    <div class="title">{{childitem.title}}</div>
                    <div class="content">
                      <div class="headmessage">
                        <div class="left">
                          <img :src="childitem.has_one_stick_user.avatar"
                               alt="">
                        </div>
                        <div class="name">{{childitem.has_one_stick_user.nickname}}</div>
                      </div>
                      <div class="thumbup">
                        <div class="right">
                          <img src="../../assets/images/micro_communities/detail_praise@2x.png"
                               alt="">
                        </div>
                        <div class="num">{{childitem.praise_num}}</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
        </template>
      </mt-tab-container>
    </div>
    <div class="all_classificationmode"
         :class="{hide:classificationHide }"
         @click="classificationHide = true"></div>
  </div>
</template>

<script>
import microclassification_controller from "./microclassification_controller";
export default microclassification_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#microclassification {
  .header {
    display: flex;
    align-items: center;
    padding-top: 0.63rem;
    padding-bottom: 0.63rem;
    background: #fff;
    .left {
      font-size: 1.5rem;
      margin-left: 1.06rem;
      margin-right: 1.44rem;
    }
    .search {
      display: flex;
      width: 17.19rem;
      height: 1.88rem;
      background-color: #f5f5f5;
      border-radius: 0.94rem;
      align-items: center;
      .searchion {
        font-size: 0.81rem;
        color: #999999;
        margin-left: 0.5rem;
        margin-right: 0.41rem;
      }
      .van-cell {
        background-color: transparent;
        padding: 0;
      }
    }
    .right {
      font-size: 1rem;
      color: #1c96fe;
      flex: 1;
    }
  }
  .list {
    .top {
      position: relative;
      .Classification {
        display: flex;
        .left {
          flex: 1;
          overflow-x: scroll;
          width: 85%;
          background-color: #FFFFFF;
        }
        .right {
          background: #fff;
          width: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .imgicon {
            width: 1.88rem;
            img {
              width: 100%;
            }
          }
        }
      }
      .all_classification {
        position: absolute;
        top: 2.75rem;
        left: 0;
        right: 0;
        bottom: 0;
        height: 8rem;
        overflow: auto;
        z-index: 10;
        background: #fff;
        .bottom {
          padding-top: 1.16rem;
          ul {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            display: flex;
            flex-wrap: wrap;
            li {
              font-size: 0.88rem;
              line-height: 1.88rem;
              height: 1.88rem;
              padding-left: 0.91rem;
              padding-right: 0.91rem;
              margin-right: 0.63rem;
              margin-bottom: 0.63rem;
              background-color: #f5f5f5;
              border-radius: 0.94rem;
            }
          }
        }
      }
      .all_classification.hide {
        display: none;
      }
    }
    .video_list {
      ul {
        margin-top: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        justify-content: space-between;
        li {
          border-radius: 0.38rem;
          width: 10.59rem;
          background-color: #ffffff;
          padding-bottom: 0.69rem;
          margin-bottom: 0.75rem;
          .top {
            min-height: 14.06rem;
            img {
              width: 100%;
            }
          }
          .bottom {
            padding-left: 0.59rem;
            .title {
              padding-top: 0.63rem;
              font-size: 0.84rem;
              line-height: 0.84rem;
              display: -webkit-box;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              text-align: left;
              margin-bottom: 0.59rem;
            }
            .content {
              display: flex;
              justify-content: space-between;
              .headmessage {
                display: flex;
                .left {
                  width: 1.13rem;
                  height: 1.13rem;
                  border-radius: 50%;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .name {
                  margin-left: 0.31rem;
                  height: 1.13rem;
                  line-height: 1.13rem;
                  text-align: left;
                  color: #8c8c8c;
                  font-size: 0.69rem;
                }
              }
              .thumbup {
                display: flex;
                padding-top: 0.16rem;
                .right {
                  width: 0.81rem;
                  height: 0.84rem;
                  margin-right: 0.38rem;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .num {
                  min-width: 2rem;
                  max-width: 8rem;
                  text-align: left;
                  color: #333333;
                  font-size: 0.75rem;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
  }
  .all_classificationmode {
    position: absolute;
    top: 5.89rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background: rgba(0, 0, 0, 0.5);
  }
  .all_classificationmode.hide {
    display: none;
  }
}
</style>
