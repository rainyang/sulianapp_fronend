<template>
  <van-row id='sort'>
  <!--<el-row id='sort'>-->
    <!--<el-col :span="show?6:8">-->
      <van-col :span="show?6:8">
        <div class="grid-content" :class="{active:sort.tab==1,up:sort.up==1,down:sort.down==1}" @click='toggle($event,1)'
           v-if="!supplier">评价
      </div>
      <div class="grid-content" :class="{active:sort.tab==5,up:sort.up==5,down:sort.down==5}" @click='toggle($event,5)'
           v-if="supplier">综合
      </div>
      </van-col>
    <!--</el-col>-->
    <van-col :span="show?6:8">
    <!--<el-col :span="show?6:8">-->
      <div class="grid-content" :class="{active:sort.tab==2,up:sort.up==2,down:sort.down==2}" @click='toggle($event,2)'>
        销量
      </div>
    <!--</el-col>-->
    </van-col>
    <van-col :span="show?6:8">
    <!--<el-col :span="show?6:8">-->
      <div class="grid-content" :class="{active:sort.tab==3,up:sort.up==3,down:sort.down==3}" @click='toggle($event,3)'>
        价格
      </div>
    <!--</el-col>-->
    </van-col>
    <van-col :span="6" v-if="show">
    <!--<el-col :span="6" v-if="show">-->
      <div @click='toggle($event,4)'>筛选</div>
    <!--</el-col>-->
    </van-col>
  <!--</el-row>-->
  </van-row>
</template>
<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    props: {
      //['text', 'hide','show']
      text: {},

      hide: {},

      show: {
        default: false
      },

      supplier: {
        default: false
      }

    },
    data() {
      return {
        sort: {up: false, dows: false, tab: 0}
      }
    },
    computed: {
      ...mapState(["view"]),
      classObject() {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal',
        }
      }
    },

    methods: {
      ...mapMutations(['views']),
      toggle(event, n) {
        this.sort.up = n;
        let order_field = '';
        if (n == 4) {
          this.$emit('showscreen')
        } else {
          if (n == 1) order_field = 'comment_num';
          if (n == 2) order_field = 'show_sales';
          if (n == 3) order_field = 'price';
          if (n == 5) order_field = 'id';
          if (event.target.className == 'grid-content up') {
            event.target.className = 'grid-content down';
            this.$emit('sortIn', {order_field, order_by: 'asc'})
          } else {
            event.target.className = 'grid-content up';
            this.$emit('sortIn', {order_field, order_by: 'desc'})
          }
        }
      }
    },
    activated() {
      this.sort.up = false;
      this.sort.down = false;
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  #sort {
    background: #FFF;
    line-height: 2.25rem;
    border-bottom: solid 0.0625rem #d9d9d9;
    font-size: 12px;
    color: #333;
    .grid-content.up:after {
      background-position: -10.625rem -0.9375rem;
    }
    .grid-content.down:after {
      background-position: -10.625rem 0;
    }
    .grid-content.up,
    .grid-content.down {
      color: #f15353
    }
    .grid-content:after {
      content: "";
      display: inline-block;
      width: 0.5rem;
      height: 0.625rem;
      background: url(../assets/images/jd-sprites.png) no-repeat;
      background-size: 12.5rem 12.5rem;
      background-position: -10.625rem -1.875rem;
      margin-left: 0.25rem;
    }
    i {
      color: #555;
    }
  }
</style>