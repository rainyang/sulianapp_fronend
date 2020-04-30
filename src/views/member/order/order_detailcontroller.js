import cTitle from "components/title";
import { MessageBox } from "mint-ui";
import { Lazyload, Button } from "mint-ui";
import cDyPopup from "../../goods/diyFormPopup";
export default {
  data() {
    return {
      regional: "请选择快递公司",
      dateshow_1: false,
      columns: [],
      order_id: "",
      order_data: "",
      bottomStatus: "",
      selected: "1",
      allLoaded: false,
      isVirtual: false,
      receiver: "",
      mobile: "",
      address: "",
      pay_type_id: "",
      orderType: "shop",
      order_pay_id: "",
      dispatch_type_id: "",
      qrcode: "",
      showQrcode: false,
      // 确认发货
      dialogVisible: false,
      expressName: "",
      numberName: "",
      addresseeInfo: "",
      options: [],

      hotel_start: "",
      hotel_end: "",
      night_day: "",
      hotel_name: "",

      showDFData: false,//商品自定义表单
      dfData:{},

      service_station: {}, // 服务站信息
      package_deliver: {} //自提点（杨朗）

      // 是否使用权益标识
      // isRight:false
    };
  },
  methods: {
    // 初始化
    init() {
      this.order_id = "";
      this.order_data = "";
      this.bottomStatus = "";
      this.selected = "1";
      this.allLoaded = false;
      this.isVirtual = false;
      this.receiver = "";
      this.mobile = "";
      this.address = "";
      this.qrcode = "";
      this.showQrcode = false;
      this.dialogVisible = false;
      this.options = [];
      this.regional = "请选择快递公司";
      this.dateshow_1 = false;
      this.columns = [];
      this.hotel_start = "";
      this.hotel_end = "";
      this.night_day = "";
      this.hotel_name = "";
      this.service_station = "";
      this.showDFData = false;
      this.dfData = {};
    },

    operation(btn, order) {
      // this.actions=[{name:"无理由",method:"sheetAction"},{name:"不退了",method:"sheetAction"}]
      if (btn.value == 8) {
        this.checklogistics(order, btn);
      } else if (btn.value == 12) {
        this.deleteOrder(order, btn);
      } else if (btn.value == 10) {
        this.comment(order, btn);
      } else if (btn.value == 1) {
        this.toPay(order, btn);
      } else if (btn.value == 13) {
        // 退款
        this.toRefund(order, btn);
      } else if (btn.value == 9) {
        // 取消订单
        this.cancleOrder(order, btn);
      } else if (btn.value == 5) {
        // 确认订单
        this.confirmOrder(order, btn);
      } else if (btn.value == 18) {
        // 退款中
        this.toRefundDetail(order, btn);
      } else if (btn.value == "cashierPay") {
        // 退款中
        this.cashPayOrder(order, btn);
      } else if (btn.value == "verification_code") {
        // 验证核销
        this.verification(order, btn);
      } else if (btn.value == 20) {
        console.log("现金支付");
        // 现金付款
        this.verificationCash(order, btn);
      } else if (btn.value == 3) {
        this.gotoRefund(order.id);
      } else if (btn.value == 40) {
        this.gotoRefundCheck(order.id);
      } else if (btn.value == 4) {
        this.gotoMakeSure(order.id);
      } else if (btn.value == 21) {
        this.shopRecord();
      } else if (btn.value == 22) {
        // 确认支付
        this.payMoney(order, btn);
      } else if (btn.value == 23) {
        // 确认发货
        this.orderPayId = order.id;
        if (order.dispatch_type_id == 3) {
          this.sendGoogs();
        } else {
          this.dialogVisible = true;
        }
        this.expressName = "";
        this.numberName = "";
      } else if (btn.value == 24) {
        // 取消发货
        this.deliverGoodsCancel(order, btn);
      } else if (btn.value == 25) {
        // 确认收货
        this.collectGoods(order, btn);
      } else if (btn.value == 26) {
        // 关闭订单
        this.closeOrderPay(order, btn);
      } else if (btn.value == 27) {
        this.evaluate(btn, order);
      } else if (btn.value == 28) {
        // 卡密
        this.truckList(btn, order);
      } else if (btn.value == 41) {
        // 398售后
        window.location.href = btn.api;
      } else if (btn.value == 50) {
        // 发票
        this.checkInvoice(btn, order);
      } else if (btn.value == 11) {
        // 酒店确认下单
        this.confirmHotelOrder(btn.api, order.id);
      } else if (btn.value == "coupon") {
        // 分享优惠券
        this.$router.push(
          this.fun.getUrl("couponShare", { order_id: order.id })
        );
      } else if (btn.value === "check_out") {
        this.sureOut(order, btn);
      } else if (btn.value === "delivery_station_clerk_complete") {
        // 配送站核销后的确认收货(核销员)
        this.collectGoods(order, btn);
      } else if (btn.value === "delivery_station_complete") {
        // 配送站核销后的确认收货（管理员）
        this.collectGoods(order, btn);
      } else if (btn.value === "delivery_station_pay") {
        // 配送站的确认支付
        this.orderPayId = order.id;
        this.payMoney(order, btn);
      } else if (btn.value === "delivery_station_accept_order") {
        // 配送站的确认接单
        this.orderPayId = order.id;
        this.orderReceiving(order, btn);
      } else if (btn.value === "delivery_station_send") {
        // 配送站的确认配送
        this.orderPayId = order.id;
        this.confirmDelivery(order, btn);
      } else if (btn.value === "delivery_station_cancel_send") {
        // 配送站的取消配送
        this.orderPayId = order.id;
        this.cancelDelivery(order, btn);
      } else if (btn.value === "delivery_station_close") {
        // 配送站的关闭订单
        this.orderPayId = order.id;
        this.closeOrderPay(order, btn);
      } else if (
        btn.value === "clerk_code" ||
        btn.value === "package_deliver"
      ) {
        // 确认核销
        this.orderPayId = order.id;
        this.confirmWriteOff(order, btn);
      } else if (btn.value === "service_station_pay") {
        // 服务站的确认支付serviceReplenish
        this.orderPayId = order.id;
        this.payMoney(order, btn);
      } else if (btn.value === "service_station_send") {
        // 服务站的确认发货
        this.orderPayId = order.id;
        this.getCompany();
        this.dialogVisible = true;
        this.expressName = "";
        this.numberName = "";
      } else if (btn.value === "service_station_cancel_send") {
        // 服务站的取消发货
        this.orderPayId = order.id;
        this.deliverGoodsCancel(order, btn);
      } else if (btn.value === "service_station_complete") {
        // 服务站的确认收货
        this.orderPayId = order.id;
        this.collectGoods(order, btn);
      } else if (btn.value === "service_station_close") {
        // 服务站的关闭订单
        this.orderPayId = order.id;
        this.closeOrderPay(order, btn);
      } else if (
        btn.value == "lease_toy_refund" ||
        btn.value == "package_deliver_clerk"
      ) {
        // 申请归还and 确认完成（自提点核销）
        this.getReturn(btn, order);
      } else if (btn.value == "lease_toy_apply_adopt") {
        // 填写归还
        this.$router.push(this.fun.getUrl("OrderReturn", { id: order.id }));
      } else if (btn.value == "lease_toy_return_info") {
        // 归还详情
        this.$router.push(this.fun.getUrl("orderruturninfo", { id: order.id }));
      } else if (btn.value == "sbc_schedule") {
        // 分期购车
        this.$router.push(
          this.fun.getUrl("ApplicationProgress", { id: order.id })
        );
      }
    },
    // 申请归还的操作and 确认完成（自提点核销）
    getReturn(btn, order) {
      $http.get(btn.api, { order_id: order.id }).then(res => {
        if (res.result == 1) {
          MessageBox.alert(res.msg, "提示");
          this.getNetData();
        } else {
          MessageBox.alert(res.msg, "提示");
        }
      });
    },
    // 确认接单
    orderReceiving(order, btn) {
      MessageBox({
        title: "提示",
        message: "确定接收此单配送任务?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.orderPayId
          };
          let urls = btn.api;
          $http.get(urls, json).then(
            function(response) {
              if (response.result == 1) {
                that.$emit("ConfrimOrderNotification", "pay");
                // that.$message({
                //   message: '关闭订单成功',
                //   type: 'success'
                // })
                that.$notify({
                  background: "#f0f9eb",
                  message: "接单成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    confirmWriteOff(order, btn) {
      var that = this;
      let url = "";
      if (btn.value == "clerk_code") {
        url = "plugin.delivery-station.frontend.order.detail.qr-code-url";
      } else if (btn.value == "package_deliver") {
        url = btn.api;
      }
      $http.get(url, { order_id: order.id }, "正在获取核销码").then(
        function(response) {
          if (response.result == 1) {
            if (btn.value == "clerk_code") {
              that.qrcode = response.data.qrcode_url;
            } else if (btn.value == "package_deliver") {
              that.qrcode = response.data.qr_code_url;
            }
            that.showQrcode = true;
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    confirmDelivery(order, btn) {
      MessageBox({
        title: "提示",
        message: "确定配送此单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.orderPayId
          };
          let urls = btn.api;
          $http.get(urls, json).then(
            function(response) {
              if (response.result == 1) {
                that.$emit("ConfrimOrderNotification", "pay");
                that.$notify({
                  background: "#f0f9eb",
                  message: "配送成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    cancelDelivery(order, btn) {
      MessageBox({
        title: "提示",
        message: "确定取消配送此单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.orderPayId
          };
          let urls = btn.api;
          $http.get(urls, json).then(
            function(response) {
              if (response.result == 1) {
                that.$emit("ConfrimOrderNotification", "pay");
                that.$notify({
                  background: "#f0f9eb",
                  message: "取消配送成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    // 查看发票
    checkInvoice(btn, order) {
      this.$router.push(this.fun.getUrl("Invoice", { order_id: order.id }));
    },
    // 卡密
    truckList(btn, order) {
      this.$router.push(this.fun.getUrl("TruckList", { order_id: order.id }));
    },
    // 评价
    evaluate(btn, order) {
      this.$router.push(
        this.fun.getUrl("DeliveryEvaluate", {
          order_id: order.id,
          api: btn.api,
          name: "distributor"
        })
      );
    },
    // 确认支付
    payMoney(order, btn) {
      MessageBox({
        title: "提示",
        message: "确认支付该订单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.$route.params.order_id
          };
          let urls = "";
          if (this.orderType == "supplier") {
            urls = btn.api;
          } else if (this.orderType == "serviceReplenish") {
            urls = btn.api;
          } else if (this.orderType == "DeliveryS") {
            urls = btn.api;
          } else {
            urls =
              "plugin.store-cashier.frontend.store.center.order-operation.pay";
          }
          $http.get(urls, json).then(
            function(response) {
              if (response.result == 1) {
                that.getNetData();
                // that.$message({
                //   message: '支付成功',
                //   type: 'success'
                // })
                that.$notify({
                  background: "#f0f9eb",
                  message: "支付成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    // 关闭订单
    closeOrderPay(order, btn) {
      MessageBox({
        title: "提示",
        message: "确定关闭订单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.$route.params.order_id
          };
          let urls = "";
          if (this.orderType == "supplier") {
            urls = btn.api;
          } else if (this.orderType == "serviceReplenish") {
            urls = btn.api;
          } else if (this.orderType == "DeliveryS") {
            urls = btn.api;
          } else {
            urls =
              "plugin.store-cashier.frontend.store.center.order-operation.close";
          }
          $http.get(urls, json).then(
            function(response) {
              if (response.result == 1) {
                if (that.orderType == "supplier") {
                  that.$router.go(-1);
                } else {
                  that.$router.push(
                    that.fun.getUrl("storeOrderlist", {
                      status: "0",
                      orderType: "store"
                    })
                  );
                }
                that.$notify({
                  background: "#f0f9eb",
                  message: "关闭订单成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    // 取消发货
    deliverGoodsCancel(order, btn) {
      MessageBox({
        title: "提示",
        message: "确定取消发货?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.$route.params.order_id
          };
          let urls = "";
          if (this.orderType == "supplier") {
            urls = btn.api;
          } else if (this.orderType == "serviceReplenish") {
            urls = btn.api;
          } else if (this.orderType == "DeliveryS") {
            urls = btn.api;
          } else {
            urls =
              "plugin.store-cashier.frontend.store.center.order-operation.cancel-send";
          }
          $http.get(urls, json).then(
            function(response) {
              if (response.result == 1) {
                that.getNetData();
                that.$notify({
                  background: "#f0f9eb",
                  message: "取消发货成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    // 获取快递公司
    getCompany() {
      var that = this;
      var urls = "";
      if (this.orderType == "supplier") {
        urls = "plugin.supplier.frontend.order.express-company";
      } else if (this.orderType == "serviceReplenish") {
        var urls = "plugin.service-station.frontend.order-list.express";
      } else {
        urls = "plugin.store-cashier.frontend.store.center.sendOrder";
      }
      $http
        .get(urls, {
          order_id: that.$route.params.order_id
        })
        .then(
          function(response) {
            if (response.result === 1) {
              that.options = [];
              that.options = response.data.express_companies;
              var arrayOfSquares = that.options.map(function(item) {
                return item.name;
              });
              that.columns = arrayOfSquares;
              that.addresseeInfo = response.data.address;
              that.address = response.data.address.address;
              that.mobile = response.data.address.mobile;
              that.receiver = response.data.address.realname;
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            console.log(response);
          }
        );
    },
    // 选择快递公司监听
    selectCompany(value) {
      console.log(value, this.expressName);
    },
    // 确认退房
    sureOut(order, btn) {
      MessageBox({
        title: "提示",
        message: "确认退房?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.$route.params.order_id
          };
          $http.get(btn.api, json).then(
            function(response) {
              if (response.result === 1) {
                that.getNetData();
                that.$notify({
                  background: "#f0f9eb",
                  message: "退房成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    // 确认收货
    collectGoods(order, btn) {
      MessageBox({
        title: "提示",
        message: "确认收货?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          let json = {
            order_id: that.$route.params.order_id
          };
          let urls = "";
          if (this.orderType == "supplier") {
            urls = btn.api;
          } else if (this.orderType == "serviceReplenish") {
            urls = btn.api;
          } else if (this.orderType == "DeliveryS") {
            urls = btn.api;
          } else {
            urls =
              "plugin.store-cashier.frontend.store.center.order-operation.receive";
          }
          $http.get(urls, json).then(
            function(response) {
              if (response.result === 1) {
                that.getNetData();
                that.$notify({
                  background: "#f0f9eb",
                  message: "收货成功",
                  color: "#67c23a"
                });
              } else {
                MessageBox.alert(response.msg, "提示");
              }
            },
            function(response) {
              console.log(response);
            }
          );
        }
      });
    },
    // 确认发货取消
    sendCancel() {
      this.dialogVisible = false;
    },
    // 确认发货
    sendGoogs() {
      var that = this;
      // if (that.expressName == "" && that.numberName == "") {
      //   that.$notify("请选择快递公司和输入快递单号")
      //   return
      // } else if (that.expressName == "") {
      //   that.$notify("请选择快递公司")
      //   return
      // } else if (that.numberName == "") {
      //   that.$notify("请输入快递单号")
      //   return
      // }
      let json = {};
      let urls = "";
      if (this.orderType == "supplier") {
        urls = "plugin.supplier.frontend.order.send";
        json = {
          order_id: that.orderPayId,
          express_code: that.expressName.value,
          express_company_name: that.expressName.name,
          express_sn: that.numberName
        };
      } else {
        urls =
          "plugin.store-cashier.frontend.store.center.order-operation.send";
        json = {
          order_id: that.$route.params.order_id,
          express_code: that.expressName,
          express_sn: that.numberName
        };
      }
      $http.get(urls, json).then(
        function(response) {
          if (response.result == 1) {
            that.dialogVisible = false;
            that.getNetData();
            that.$notify({
              background: "#f0f9eb",
              message: "发货成功",
              color: "#67c23a"
            });
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function(response) {
          console.log(response);
        }
      );
    },
    handleClose(done) {
      this.$dialog.confirm({
        title: "提示",
        message: "确认关闭？",
      }).then(() => {
        // on confirm
        done();
      }).catch(() => {
        // on cancel
      });
    },
    checklogistics(item, btn) {
      this.$router.push(
        this.fun.getUrl("logistics", {
          id: item.id
        })
      );
    },
    cashPayOrder(item, btn) {
      MessageBox({
        title: "提示",
        message: "确定此订单已付款?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          // this.datasource.splice(this.datasource.indexOf(item), 1)
          this.sentRequest(
            btn.api,
            {
              order_id: item.id,
              order_pay_id: this.order_pay_id
            },
            false
          );
        }
      });
    },

    verification(item, btn) {
      this.$router.push(
        this.fun.getUrl("orderVerification", {
          order_id: item.id,
          api: btn.api
        })
      );
    },

    verificationCash(item, btn) {
      MessageBox({
        title: "提示",
        message: "确定此订单已付款?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          // this.datasource.splice(this.datasource.indexOf(item), 1)
          this.sentRequest(
            "plugin.store-cashier.frontend.store.order-operation.pay",
            {
              order_id: item.id,
              order_pay_id: this.order_pay_id
            },
            false
          );
        }
      });
    },

    cancleOrder(item, btn) {
      MessageBox({
        title: "提示",
        message: "确定取消此订单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          // 删除当前选中的地址
          // this.datasource.splice(this.datasource.indexOf(item), 1)
          this.sentRequest(
            btn.api,
            {
              order_id: item.id
            },
            false
          );
        }
      });
    },
    // 删除订单
    deleteOrder(item, btn) {
      MessageBox({
        title: "提示",
        message: "确定删除此订单?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          // 删除当前选中的地址
          this.sentRequest(
            btn.api,
            {
              order_id: item.id
            },
            false
          );
        }
      });
    },
    toPay(item, btn) {
      // type-2合并支付 type-1订单支付

      this.$router.push(
        this.fun.getUrl("orderpay", {
          status: 1,
          order_ids: item.id
        })
      );
    },
    // 评价订单
    comment(item, btn) {
      this.$router.push(
        this.fun.getUrl("comment", {
          order: item
        })
      );
    },
    confirmOrder(item, btn) {
      MessageBox({
        title: "提示",
        message: "您确定" + btn.name + "?",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          var that = this;
          // this.$emit('ConfrimOrderNotification', item)
          // 调用接口通知服务器收到货物请求
          $http
            .get(
              btn.api,
              {
                order_id: item.id
              },
              "正在处理订单..."
            )
            .then(
              function(response) {
                if (response.result == 1) {
                  that.getNetData();

                  MessageBox.alert(response.msg);
                } else {
                  MessageBox.alert(response.msg);
                }
              },
              function(response) {
                MessageBox(response.msg, "确定");
                that.$router.push(that.fun.getUrl("home", {}));
              }
            );
        } else {
        }
      });
    },

    toRefundDetail(item, btn) {
      this.$router.push(
        this.fun.getUrl("aftersales", {
          refund_id: item.refund_id
        })
      );
    },
    // 退款
    toRefund(item, btn) {
      // refund

      this.$router.push(
        this.fun.getUrl("refund", {
          order: item,
          type: 1
        })
      );
    },
    // 跳转商品详情页面
    toGoodsDetail(goods, isshow, showCourse) {
      if (this.orderType == "lease_toy") {
        this.$router.push(
          this.fun.getUrl("goods", {
            id: goods.goods_id
          })
        );
        return;
      }
      if (isshow == 0) {
        if (showCourse == 1) {
          this.$router.push(
            this.fun.getUrl("CourseDetail", {
              goods_id: goods.goods_id
            })
          );
        } else if (showCourse == 0) {
          if (this.order_data.plugin_id == 32) {
            this.$router.push(
              this.fun.getUrl("goodsO2O", {
                id: goods.goods_id,
                tag: "o2o",
                store_id: goods.store_id
              })
            );
          } else if (this.order_data.plugin_id == 54) {
            this.$router.push(
              this.fun.getUrl(
                "GroupGoods",
                {
                  id: "0" //活动id
                },
                { fight_groups: goods.goods_id }
              )
            );
          } else {
            this.$router.push(
              this.fun.getUrl("goods", {
                id: goods.goods_id
              })
            );
          }
        } else {
          return;
        }
      }
    },

    sentRequest(action, params, isIndicator) {
      var that = this;
      $http.get(action, params, "").then(
        function(response) {
          if (response.result == 1) {
            MessageBox.alert(response.msg, "提示");
            if (window.history.length <= 1) {
              that.$router.push(that.fun.getUrl("home", {}));
            } else {
              that.$router.go(-1);
            }
          } else {
            MessageBox.alert(response.msg, "提示");
          }
        },
        function(response) {
          // error callback
        }
      );
    },
    // 发起http请求

    getNetData(order_id) {
      var that = this;
      var url = "";
      console.log(this.orderType);
      if (this.orderType == "cashier") {
        url = "plugin.store-cashier.frontend.Order.detail";
      } else if (this.orderType == "store") {
        url = "plugin.store-cashier.frontend.store.order-detail";
      } else if (this.orderType == "supplier") {
        url = "plugin.supplier.frontend.order.detail";
      } else if (this.orderType == "hotel") {
        url = "plugin.hotel.frontend.hotel.detail";
      } else if (this.orderType == "onlineCar") {
        url = "plugin.net-car.frontend.order-detail.index";
      } else if (this.orderType == "hotel_center") {
        url = "plugin.hotel.frontend.hotel.center.order-detail";
      } else if (this.orderType == "hotelcashier") {
        url = "plugin.hotel.frontend.Order.detail";
      } else if (this.orderType == "lease_toy") {
        url = "plugin.lease-toy.api.order.order-detail.index";
      } else if (this.orderType == "serviceReplenish") {
        url = "plugin.service-station.frontend.order-detail.index";
      } else if (this.orderType == "DeliveryReplenish") {
        //配送站补货单
        url = "plugin.delivery-station.frontend.purchase.order-detail.index";
      } else if (this.orderType == "DeliveryS") {
        //配送站的配送订单
        url = "plugin.delivery-station.frontend.order.detail.index";
      } else if (this.orderType == "groups") {
        //拼团
        url = "plugin.fight-groups.frontend.controllers.detail.index";
      } else if (this.orderType == "verifier") {
        //自提点核销员
        url = "plugin.package-deliver.frontend.clerk-order-detail.index";
      } else {
        url = "order.detail";
      }
      let json = {};

      if (that.fun.getKey("is_clerk")) {
        json = {
          order_id: that.$route.params.order_id,
          is_clerk: that.fun.getKey("is_clerk")
        };
      } else {
        json = {
          order_id: that.$route.params.order_id
        };
      }

      $http.get(url, json, "正在获取订单").then(
        function(response) {
          if (response.result === 1) {
            var myData = response.data;
            that.order_data = myData;
            that.order_pay_id = myData.order_pay_id;
            that.dispatch_type_id = myData.dispatch_type_id;
            if (!myData.address_info.address) {
              that.address = myData.address_info.store_address;
              that.mobile = myData.address_info.member_mobile;
              that.receiver = myData.address_info.member_realname;
            } else {
              that.address = myData.address_info.address;
              that.mobile = myData.address_info.mobile;
              that.receiver = myData.address_info.realname;
            }

            that.pay_type_id = myData.pay_type_id;
            if (that.orderType == "hotel") {
              that.hotel_start = response.data.hotel_order.enter_at.split(
                " "
              )[0];
              that.hotel_end = response.data.hotel_order.leave_at.split(" ")[0];
              that.hotel_name =
                response.data.hotel_order.has_one_hotel.hotel_name;
              that.getDays(that.hotel_start, that.hotel_end);
            }

            if (that.orderType == "DeliveryReplenish") {
              that.service_station = response.data.service_station;
            }
            if (myData.dispatch_type_id == 8) {
              that.package_deliver = myData.package_deliver;
            }
          } else {
            MessageBox.alert(response.msg);
            that.$router.go(-1);
          }
        },
        function(response) {
          MessageBox.alert(response.msg);
        }
      );
    },

    lookDFData(_data){
      console.log(_data)
      this.dfData = _data;
      this.$nextTick(()=>{
        this.showDFData = true;
      })
    },

    // 退还跳转
    gotoRefund(val) {
      this.$router.push(
        this.fun.getUrl("OrderReturn", {
          id: val
        })
      );
    },

    // 退还跳转
    gotoRefundCheck(val) {
      this.$router.push(
        this.fun.getUrl("OrderReturnCheck", {
          id: val
        })
      );
    },

    // 待确定
    gotoMakeSure(val) {
      this.$router.push(
        this.fun.getUrl("OrderReturnSure", {
          id: val
        })
      );
    },
    // setting sun
    // 汇款记录
    shopRecord() {
      this.$router.push(
        this.fun.getUrl("OrderRecord", {
          order_id: this.$route.params.order_id,
          order_state: this.order_data.status_name
        })
      );
    },
    /*以下四个都是下拉快递选择相关方法*/
    seleRegional: function() {
      this.dateshow_1 = true;
    },
    onChange(picker, value, index) {},
    onCancelbtn: function(val, index) {
      this.dateshow_1 = false;
    },
    onConfirmbtn: function(val, index) {
      this.dateshow_1 = false;
      this.regional = val;
      var array = this.options;
      this.expressName = array[index];
    },

    // 时间日期
    getDays(strDateStart, strDateEnd) {
      let strSeparator = "-"; // 日期分隔符
      let oDate1, oDate2, iDays;
      oDate1 = strDateStart.split(strSeparator);
      oDate2 = strDateEnd.split(strSeparator);
      let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
      let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
      iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数
      this.night_day = iDays;
    },

    // value 11 酒店确认下单
    confirmHotelOrder(api, id) {
      $http
        .get(api, { order_id: id }, "处理中...")
        .then(res => {
          if (res.result == 1) {
            MessageBox.alert("确认下单成功", "提示");
          } else {
            MessageBox.alert(res.msg, "提示");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  activated() {
    if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "cashier"
    ) {
      this.orderType = "cashier";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "store"
    ) {
      this.orderType = "store";
      this.getCompany();
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "supplier"
    ) {
      this.orderType = "supplier";
      this.getCompany();
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "hotel"
    ) {
      this.orderType = "hotel";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "onlineCar"
    ) {
      this.orderType = "onlineCar";
    } else if (this.$route.params.orderType == "hotel_center") {
      this.orderType = "hotel_center";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "hotelcashier"
    ) {
      this.orderType = "hotelcashier";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "lease_toy"
    ) {
      this.orderType = "lease_toy";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "serviceReplenish"
    ) {
      this.orderType = "serviceReplenish";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "DeliveryReplenish"
    ) {
      this.orderType = "DeliveryReplenish";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "DeliveryS"
    ) {
      this.orderType = "DeliveryS";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "groups"
    ) {
      this.orderType = "groups";
    } else if (
      this.$route.params.orderType &&
      this.$route.params.orderType == "verifier"
    ) {
      //自提点核销员进入
      this.orderType = "verifier";
    } else {
      this.orderType = "shop";
    }

    this.init();

    this.order_id = this.$route.params.order_id;
    this.getNetData(this.order_id);
    // this.getCompany()
    // this.isVirtual  = this.order_data.isVirtual
  },
  components: {
    cTitle,cDyPopup
  }
};
