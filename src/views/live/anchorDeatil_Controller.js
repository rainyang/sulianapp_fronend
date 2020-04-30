import cTitle from "components/title";
import { Toast } from "mint-ui";
import { scrollMixin } from "utils/mixin";
export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      dataInfo: [],
      roomList: [],
      backList:[],
      //more
      isLoadMore: true,
      page: 1,
      total_page: 0,
      is_concern: 0//是否已关注：1已关注，0未关注
    };
  },
  mounted() {},
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      $http
        .post(
          "plugin.room.frontend.anchor.get-anchor",
          { member_id: this.$route.params.id},
          ""
        )
        .then(response => {
          if (response.result === 1) {
            this.dataInfo = response.data;
            this.roomList = response.data.room;
            this.is_concern = response.data.is_concern;
            if(response.data.is_back){
              this.getBackList();
            }
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoBackPlay(_id,_rid){
      this.$router.push(this.fun.getUrl("livePage", {id:_rid,backid:_id,memberid:this.$route.params.id,type:'memberPlayBack'}));
    },
    getBackList(){
      this.backList = [];
      $http
        .post('plugin.room.frontend.anchor.get-back',{member_id:this.$route.params.id,page:1},"").then(response => {
          this.isloading = false;
          if (response.result === 1) {
            this.backList = response.data.data;
            this.isLoadMore = true;
            this.total_page = response.data.last_page;
            if (!this.total_page) {
              this.total_page = 0;
            }
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoLive(_status,_id){
      if(_status == 3){
        //直播
        this.$router.push(this.fun.getUrl("livePage", {id:_id}));
      }else{
        //预告
        this.$router.push(this.fun.getUrl("foreshow", {id:_id}));
      }
    },
    addConcern(){
      //添加关注
      $http
        .post(
          "plugin.room.frontend.anchor.concern",
          { member_id: this.$route.params.id },
          ""
        )
        .then(response => {
          if (response.result === 1) {
            this.is_concern = 1;
            Toast('关注成功');
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancelConcern(){
      //取消关注
      $http
        .post(
          "plugin.room.frontend.anchor.cancel-concern",
          { member_id: this.$route.params.id },
          ""
        )
        .then(response => {
          if (response.result === 1) {
            this.is_concern = 0;
            Toast('已取消关注');
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addNotice(_parameter,_id,_index){
      let _url = null;
      let that = this;
      if(_parameter == 1){
        _url ='plugin.room.frontend.live-list.cancel-notice';//取消开播提醒
      }else{
        _url ='plugin.room.frontend.live-list.play-notice';//设置开播提醒
      }
      $http.post(_url,{ id: _id },"").then(response => {
          if (response.result === 1) {
            if(_parameter == 1){
              Toast('已取消提醒');
              that.$set(that.roomList[_index], "notice", 0);
            }else{
              Toast('已成功订阅');
              that.$set(that.roomList[_index], "notice", 1);
            }
            //================================
            //进行更新列表操作
          } else {
            Toast(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    timeEnd(i) {
      //倒计时结束时触发的回调方法
      console.log("倒计时结束时触发的回调方法，timeEnd()");
    },
    //获取更多数据
    getMoreData() {
      const that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "plugin.period-return.frontend.log.index",
            {
              page: that.page
            },
            "加载中"
          )
          .then((response)=> {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.list.data;
                that.recordsList = that.recordsList.concat(myData); //数组拼接
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
              }
            },
            function(response) {
              // error callback
            }
          );
      }
    },
  },
  components: {
    cTitle
  }
};
