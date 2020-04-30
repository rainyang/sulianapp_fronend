import cTitle from 'components/title';
import {MessageBox} from 'mint-ui';

export default {
  data() {
    return {
        ratetextshow:['极差', '失望', '一般', '满意', '惊喜'],
        ratetext:{text1:'惊喜',text2:'惊喜'},
      toi: this.fun.getKeyByI(),
      good: '',
      order_id: '',
      api: '',
      content: '',
      level: 5,
      level2: 5,
      order: '',
      comment: '',    //评论内容

      distributor: {},
      order_list: [],  // 商品列表
      type: '',  // 从哪一个页面跳转过来

    };
  },
  methods: {
    getStar_(value) {
      console.log(value);
        this.ratetext.text1=this.ratetextshow[value-1]
    },
      getStar_2(value) {
          console.log(value);
          this.ratetext.text2=this.ratetextshow[value-1]
      },
    toComment(item) {
      if (this.comment.length == 0) {
        MessageBox({
          title: '提示',
          message: '您还没有输入相关的评论内容',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {

            this.submitData(item);

          } else {
            return;
          }

        });
      } else {
        this.submitData(item);
      }

    },
    getDistributor() {
      var that = this;
      $http.get(that.getApi, that.data,"").then(function (response) {
        if (response.result === 1) {
          that.order_info = response.data;
          that.order_list = that.order_info.order_goods;
          that.distributor = that.order_info.distributor;
        } else {
          MessageBox.alert(response.msg, '提示');

        }

      }, function (response) {
        // error callback
      });
    },
    //提交数据到服务器
    submitData() {
      var that = this;
      let json = {};
      if (this.type === 'delivery') {
        json = {
          'distributor_order_id': that.order_id,
          'distributor_id': that.distributor.id,
          'provider_id': that.order_info.provider_id,
          'content': this.comment,
          'level': this.level,
        };
      } else if (this.type === 'distributor') {
        json = {
          'distributor_order_id': that.order_id,
          'distributor_id': that.distributor.id,
          'content': this.comment,
          'level': this.level,
          'efficiency_level': this.level2,
        };
      }
      let eltion = JSON.stringify(json);
      $http.post(that.api, {
        eltion: eltion,
      }).then(function (response) {
        if (response.result === 1) {
          MessageBox.alert(response.msg, '提示');
          that.$router.go(-1);

        } else {
          MessageBox.alert(response.msg, '提示');

        }

      }, function (response) {
        // error callback
      });
    },
    initData() {
      this.comment = '';
      this.order_list = [];
      this.distributor = {};
      this.level = 5;
      this.toi = this.fun.getKeyByI();
      this.order_id = this.$route.params.order_id;
      this.api = this.$route.params.api;
      this.type = this.$route.params.name;
      if (this.type === 'delivery') { //评价补货商
        this.getApi = 'plugin.kingtimes.frontend.distributor.distributorOrderDetail';
        this.data = {distributor_order_id: this.order_id};
      } else if (this.type === 'distributor') { //评价配送站
        this.getApi = 'plugin.kingtimes.frontend.order.orderDetail.index';
        this.data = {order_id: this.order_id};
      }
      if (!this.order_id) {
        this.$router.push(this.fun.getUrl("member", {}));
      } else {
        this.getDistributor();  // 获取订单信息
      }
    }

  },
  activated() {
    this.initData();
  },
  components: {cTitle}
};