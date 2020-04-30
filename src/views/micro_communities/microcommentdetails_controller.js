import {
    Indicator,
    Toast
} from 'mint-ui';
import {
    MessageBox
} from "mint-ui";
import {scrollMixin} from 'utils/mixin';
import cTitle from 'components/title';
var share_tag = "-1";
//import BMap from 'BMap';
export default {
    mixins: [scrollMixin], //加载更多
    data() {
        return {
            bannerindex: 1,
            mainCommentShow: false,
            replyshow: false,
            adminOperationshow: false,
            releaseOperationshow: false,
            amountRewardshow: false,
            rewardPayshow: false,
            stickid: '',
            detailsData: {},
            StickCommentData: [],
            replyName: '',
            replyContent: '',
            host_comment_id: '',
            second_comment_id: '',
            maincomment: '',
            readertype: 1, // 1普通看帖人 2发帖人 3管理人
            is_praise: true,
            //打赏金额选项
            rewardArr: [{
                    value: 1,
                    name: "5元"
                },
                {
                    value: 2,
                    name: "10元"
                },
                {
                    value: 3,
                    name: "20元"
                },
                {
                    value: 4,
                    name: "50元"
                },
                {
                    value: 5,
                    name: "100元"
                }
            ],
            rewardArrselect: 99999,
            rewardArrmoney: '',
            rewardArrmoneytype: 2,
            btnData: [],
            rewardMoney: 0,
            commentManagement: false,
            is_own: false,
            commend_id: '',
            mulcommentsshow: true,
            //more
            isLoadMore: true,
            page: 1,
            total_page: 0
        };
    },
    activated() {
        if (this.$route.params.stickId) {
            this.stickid = this.$route.params.stickId;
        } else {
            this.$router.go(-1);
        }
        this.getMicroDetails();
        this.getStickComment();
    },

    mounted() {
        if (!this.fun.isTextEmpty(this.fun.getKey("share_tag"))) {
            share_tag = this.fun.getKey("share_tag");
        }
    },
    methods: {
        mulchMeatsShowBtn() {
            this.mulcommentsshow = false;
            this.getMoreData()
        },
        moneyShow() {
            this.rewardArrmoney = ''
            this.rewardArrselect = 9999;
            this.rewardMoney = 0
            this.amountRewardshow = true;
        },
        shorewardArrBtn(index) {
            this.rewardArrmoneytype = 1;
            this.rewardArrselect = index;
            this.rewardArrmoney = ''
        },
        rewardArrMoneyBtn() {
            this.rewardArrmoneytype = 2;
            this.rewardArrselect = 9999;
        },
        confirmRewardBtn() {
            this.amountRewardshow = false;
            if (this.rewardArrmoneytype == 1) {
                this.rewardMoney = parseInt(this.rewardArr[this.rewardArrselect].name);
            } else if (this.rewardArrmoneytype == 2) {
                this.rewardMoney = this.rewardArrmoney;
            }
            if (this.fun.isTextEmpty(this.rewardMoney)) {
                Toast("请输入或选择打赏金额");
                return;
            }
            if (this.rewardMoney <= 0) {
                Toast("打赏金额必须大于0");
                return;
            }
            this.getPayData();
        },
        rewardPayCancelBtn() {
            this.rewardPayshow = false;
        },
        //获取支付类型参数
        getPayData() {
            this.actionSheetItems = [];
            $http
                .get("payment.pay-type", {})
                .then(response => {
                    if (response.result == 1) {
                        let btnData = response.data.buttons;
                        this.btnData = btnData;
                        this.rewardPayshow = true;
                    } else {

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        payBtn(type, name) {
            let that = this;
            let json = {
                pay_method: type,
                amount: this.rewardMoney,
                pay_name: name,
                trick_id: this.stickid
            };
            $http
                .post(
                    "plugin.micro-communities.api.reward-log.index",
                    json,
                    "支付中..."
                )
                .then(response => {
                    that.rewardPayshow = false
                    if (response.result == 1) {
                        switch (type) {
                            case 1: //微信
                                wx.config(response.data.js);
                                that.WXPay(response.data.config);
                                break;
                            case 2: //支付宝
                                that.$router.push(
                                    that.fun.getUrl("alipayCourse", {
                                        status: "9",
                                        url: response.data
                                    })
                                );
                                break;
                            case 3: //余额
                                Toast(response.msg);
                                break;
                            case 6: //新版微信 link
                                window.location.href = response.data;
                                break;
                            case 12: //芸支付 微信
                                that.newWXPay(response.data.config);
                                break;
                            case 7: //云收银支付宝
                                that.$router.push(
                                    that.fun.getUrl("alipayCourse", {
                                        status: "9",
                                        url: response.data
                                    })
                                );
                                break;
                            case 9: //微信app
                                YDB.SetWxpayInfo(
                                    that.$store.state.temp.mailInfo.name,
                                    "订单号：" + response.data.order_sn,
                                    that.rewardMoney,
                                    response.data.order_sn,
                                    that.fun.getKeyByI()
                                );
                                break;
                            default:
                                break;
                        }
                    } else {
                        MessageBox.alert(response.msg);
                    }
                })
                .catch(error => {
                    MessageBox.alert(error);
                });
        },
        //旧版微信支付参数
        WXPay(payParams) {
            var that = this;
            wx.chooseWXPay({
                appId: payParams.appId,
                timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
                package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: payParams.paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    if (res.errMsg == "chooseWXPay:ok") {
                        that.$router.go(-1);
                        MessageBox.alert("支付成功", "提示");
                        that.getCurrentPayStatus(); //重新获取
                        that.getTodayPay();
                    } else {
                        MessageBox.alert("支付失败", "提示");
                    }
                },
                cancel: function (res) {
                    //支付取消
                },
                fail: function (res) {
                    MessageBox.alert("支付失败，请返回重试", "提示");
                }
            });
        },
        //新版微信支付参数
        newWXPay(payParams) {
            var that = this;
            WeixinJSBridge.invoke(
                "getBrandWCPayRequest", {
                    appId: payParams.appId, //公众号名称，由商户传入
                    timeStamp: payParams.timeStamp, //时间戳，自1970年以来的秒数
                    nonceStr: payParams.nonceStr, //随机串
                    package: payParams.package,
                    signType: payParams.signType, //微信签名方式：
                    paySign: payParams.paySign //微信签名
                },

                function (res) {
                    that.b = res;
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        MessageBox.alert("支付成功", "提示");
                        that.getCurrentPayStatus(); //重新获取
                        that.getTodayPay();
                    } else {
                        MessageBox.alert("支付失败", "提示");
                    }
                }
            );
        },
        attentionBtn() {
            if (this.detailsData.is_follow) {
                this.cancelAttention();
            } else {
                this.addAttention();
            }
        },
        cancelAttention() {
            let that = this;
            let dataJson = {
                uid: this.detailsData.user_id
            };
            $http.post("plugin.micro-communities.api.user.delFollow", dataJson).then(response => {
                if (response.result == 1) {
                    this.$set(this.detailsData, "is_follow", false); //动态添加
                    Toast(response.msg)
                } else {
                    Toast(response.msg)
                }
            });
        },
        addAttention() {
            let that = this;
            let dataJson = {
                user_id: this.detailsData.user_id
            };
            $http.post("plugin.micro-communities.api.user.addFollow", dataJson).then(response => {
                if (response.result == 1) {
                    this.$set(this.detailsData, "is_follow", true); //动态添加
                    Toast(response.msg)
                } else {
                    Toast(response.msg)
                }
            });
        },
        sidingsImg(index) {
            this.bannerindex = index + 1
        },
        getMicroDetails() {
            let that = this;
            let dataJson = {
                tid: this.stickid
            };
            $http.post("plugin.micro-communities.api.trick.getStrickDetail", dataJson,{}).then(response => {
                if (response.result == 1) {
                    that.detailsData = response.data;
                    if (that.detailsData) {
                        if (that.detailsData.is_manager == 1) {
                            that.readertype = 3;
                        } else if (that.detailsData.is_own == 1) {
                            that.readertype = 2;
                        }
                        if (that.detailsData.is_manager == 1) {
                            that.is_praise = true;
                        } else {
                            that.is_praise = false;
                        }
                    }
                    that.is_own = response.data.is_own==0?false:true
                    that.initShare();
                } else {
                    if (share_tag == "-1") {
                        that.$router.go(-1);
                    } else {
                        that.$router.push(that.fun.getUrl("home", {}));
                    }
                    Toast(response.msg)
                }
            });
        },
        getStickComment() {
            let that = this;
            that.pageInit();
            let dataJson = {
                tid: this.stickid
            };
            $http.post("plugin.micro-communities.api.trick.getStickComment", dataJson,{}).then(response => {
                if (response.result == 1) {
                    that.total_page=response.data.last_page;
                    that.StickCommentData = response.data.data;
                } else {
                    Toast(response.msg)
                }
            });
        },
        replyCommentsBtn(host_comment_id, second_comment_id, uname, content, is_own) {
            this.host_comment_id = host_comment_id;
            this.second_comment_id = second_comment_id;
            this.replyContent = '';
            this.replyName = uname;
            this.replyshowcontent = content;
            if (is_own == 1) {
                this.is_own = true;
            } else {
                this.is_own = false;
            }
            this.commentManagement = true;
        },
        replyBtn() {
            this.replyshow = true;
            this.commentManagement = false;
        },
        delBtn() {
            if (this.host_comment_id && this.second_comment_id) {
                this.commend_id = this.second_comment_id;
            } else {
                this.commend_id = this.host_comment_id;
            }
            this.commentManagement = false;
            this.delReply();
        },
        delReply() {
            let that = this;
            let dataJson = {};
            dataJson.commend_id = this.commend_id;
            $http.post("plugin.micro-communities.api.trick.delComment", dataJson).then(response => {
                if (response.result == 1) {
                    that.getStickComment();
                    Toast(response.msg)
                } else {
                    Toast(response.msg)
                }
            });
        },
        replyCancelBtn() {
            this.commentManagement = false;
        },
        subMainCommentBtn() {
            this.maincomment = '';
            this.mainCommentShow = true;
            this.$nextTick(() =>{
                this.$refs.commentInput.focus()
            })
            
        },
        subMainBtn() {
            if (!this.maincomment) {
                Toast('请输入你的精彩评论')
                return
            }
            this.mainCommentShow = false;
            this.getReplyComments('main');
        },
        replySubmitBtn() {
            if (!this.replyContent) {
                Toast('请输入回复内容')
                return
            }
            this.replyshow = false;
            this.getReplyComments('reply');
        },
        getReplyComments(getType) {
            let that = this;
            let dataJson = {};
            dataJson.tid = that.stickid;
            if (getType == 'main') {
                dataJson.content = that.maincomment;
            } else {
                dataJson.content = that.replyContent
            }
            if(getType == 'reply'){
                if (this.host_comment_id) {
                    dataJson.host_comment_id = this.host_comment_id;
                }
                if (this.second_comment_id) {
                    dataJson.second_comment_id = this.second_comment_id;
                }
            }
            $http.post("plugin.micro-communities.api.trick.comments", dataJson).then(response => {
                if (response.result == 1) {
                    that.getStickComment();
                    Toast(response.msg)
                } else {
                    Toast(response.msg)
                }
            });
        },
        managementBtn() {
            if (this.readertype == 1) {

            } else if (this.readertype == 2) {
                this.releaseOperationshow = true;
            } else if (this.readertype == 3) {
                this.adminOperationshow = true
            }
        },
        reEditBtn() {
            this.$router.push(
                this.fun.getUrl('microEdit', {
                    stickid: this.stickid
                })
            )
        },
        deleteBtn() {
            let that = this;
            let dataJson = {};
            dataJson.tid = that.stickid;
            $http.post("plugin.micro-communities.api.trick.delTrick", dataJson).then(response => {
                if (response.result == 1) {
                    Toast(response.msg)
                    this.releaseOperationshow = false;
                    this.adminOperationshow = false
                    this.$router.push(
                        this.fun.getUrl('microIndex')
                    );
                } else {
                    Toast(response.msg)
                    this.releaseOperationshow = false;
                    this.adminOperationshow = false
                }
            });
        },
        reCancelBtn() {
            this.releaseOperationshow = false;
        },
        adminBtn(typenum) {
            let that = this;
            let dataJson = {};
            dataJson.tid = that.stickid;
            if (typenum == 1) {
                dataJson.operation = 1
            } else if (typenum == 2) {
                dataJson.operation = 2
            }
            $http.post("plugin.micro-communities.api.trick.changeOperation", dataJson).then(response => {
                if (response.result == 1) {
                    Toast(response.msg)
                    this.adminOperationshow = false
                } else {
                    Toast(response.msg)
                    this.adminOperationshow = false
                }
            });
        },
        adCancel() {
            this.adminOperationshow = false
        },
        praiseBtn(host_comment_id, second_comment_id, index, chilindex,is_praise) {
            console.log('5555',host_comment_id);
            if (is_praise == 1) {
                Toast('你已赞过该贴')
                return  false
            }
            this.getPraiseData(host_comment_id, second_comment_id, index, chilindex,'')
        },
        isPraiseBtn() {
            if (this.detailsData.is_praise==1) {
                Toast('你已赞过该贴')
                return  false
            }
            this.getPraiseData('', '', '', '','main')
        },
        getPraiseData(host_comment_id, second_comment_id, index, chilindex,type) {
            let that = this;
            let dataJson = {};
            if(!host_comment_id){
                dataJson.tid = that.stickid;
            }
            if (host_comment_id && second_comment_id) {
                dataJson.comment_id = second_comment_id;
            } else {
                dataJson.comment_id = host_comment_id;
            }
            $http.post("plugin.micro-communities.api.trick.givePraise", dataJson).then(response => {
                if (response.result == 1) {
                    if('main'== type){
                        that.$set(that.detailsData, "praise_num", (that.detailsData.praise_num ? (that.detailsData.praise_num + 1) : 1)); //动态添加
                    }else{
                        if (host_comment_id && second_comment_id) {
                            let childData = that.StickCommentData[index].child[chilindex]
                            that.$set(childData, "is_praise", 1); //动态添加
                            that.$set(childData, "praise_num", (childData.praise_num ? (childData.praise_num + 1) : 1)); //动态添加
                        } else {
                            let StickCommentData = that.StickCommentData[index]
                            that.$set(StickCommentData, "is_praise", 1); //动态添加
                            that.$set(StickCommentData, "praise_num", (StickCommentData.praise_num ? (StickCommentData.praise_num + 1) : 1)); //动态添加
                        }
                    }
                    Toast(response.msg)
                } else {
                    Toast(response.msg)
                }
            });
        },
        gotoHome(_ids) {
            this.$router.push(this.fun.getUrl("microhomepage", {}, { micuid: _ids }));
          },
        goto() {
            if (share_tag == "-1") {
                this.$router.go(-1);
            } else {
                this.$router.push(this.fun.getUrl("home", {}));
            }
        },
        //跳转购物车
        gotoCart() {
            this.$router.push(this.fun.getUrl("home", {}));
        },
        //跳转个人中心
        gotoMember() {
            this.$router.push(this.fun.getUrl("member", {}));
        },
        //分享
        initShare() {
            let that = this;
            $http
                .post("member.member.wxJsSdkConfig", {
                    url: that.fun.isIosOrAndroid() === "android" ?
                        window.location.href : window.initUrl
                })
                .then(response => {
                    if (response.result === 1) {
                        that.share(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        share(data) {
            //自定义分享
            let that = this;
            wx.config(data.config);
            wx.ready(function () {
                let _title = "";
                let _imgUrl = "";
                let _desc = "";

                let _link = document.location.href + "&share_tag=2";
                _link = that.fun.isMid(_link, data.info.uid);
                _title = that.fun.isTextEmpty(that.detailsData.title) ?
                    data.share.title :
                    that.detailsData.title;
                _imgUrl = that.fun.isTextEmpty(that.detailsData.has_one_stick_user) ?
                    data.share.icon :
                    that.detailsData.has_one_stick_user.avatar;
                _desc = that.fun.isTextEmpty(that.detailsData.contents) ?
                    data.share.desc :
                    that.detailsData.contents;
                wx.showOptionMenu();
                wx.onMenuShareTimeline({
                    title: _title, // 分享标题
                    link: _link, // 分享链接
                    imgUrl: _imgUrl, // 分享图标
                    success: function () {
                        Toast("分享成功");
                    },
                    cancel: function () {
                        Toast("取消分享");
                    }
                });

                wx.onMenuShareAppMessage({
                    title: _title, // 分享标题
                    desc: _desc, // 分享描述
                    link: _link, // 分享链接
                    imgUrl: _imgUrl, // 分享图标
                    type: "link", // 分享类型,music、video或link，不填默认为link
                    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        Toast("分享成功");
                    },
                    cancel: function () {
                        Toast("取消分享");
                    }
                });
            });
        },
        //分享
        shareWeixin() {
            //不是微信端 不访问
            if (this.fun.getTyep() == 5) {
                return;
            }
            MessageBox({
                title: "提示",
                message: "请点击右上角微信分享",
                showCancelButton: true
            });
        },
        pageInit(){
            this.page = 1;
            this.total_page = 0;
            this.isLoadMore = true;
        },
        //获取更多数据
        getMoreData() {
            if(this.mulcommentsshow){
                return false;
            }
            const that = this;
            let json = {
                tid: this.stickid
            };
            that.isLoadMore = false;  // 防止多次请求分页数据
            if (this.page >= this.total_page) {
                return;
            } else {
                this.page = this.page + 1;
                json.page = this.page;
                $http.post('plugin.micro-communities.api.trick.getStickComment', json, '加载中...').then(function (response) {
                    that.isLoadMore = true;
                    if (response.result === 1) {
                        var myData = response.data.data;
                        that.StickCommentData = that.StickCommentData.concat(myData);
                    } else {
                        that.page = that.page - 1;
                        that.isLoadMore = false;
                        return;
                    }
                }, function (response) {
                    // error callback
                });
            }
        },
        gotoStore(_id){
            this.$router.push(this.fun.getUrl("HomeSeller", { store_id: _id }));
        },
        gotoGoods(_id){
            this.$router.push(this.fun.getUrl("goods", { id: _id }));
        },
    },

    components: {
        cTitle
    }
};