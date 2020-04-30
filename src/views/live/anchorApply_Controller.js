import cTitle from "components/title";
import { Toast } from 'vant';
export default {
  data() {
    return {
      bannerSrc:'',
      agreement:'',
      realname:'',
      mobile:'',
      addressName:'',
      street:'',
      address:'',
      categoryShow: false,
      addressShows: false,
      streetShow: false,
      //街道
      area: district,
      agreementChoose: false,
      strShow: false,
      showPopup: false,
      showAreement: false,
      showDissatisfy: false,
      showVeriVfy: false,

      province_id:'',
      city_id:'',
      district_id:'',
      conditionss:{}
    };
  },
  // mounted() {},
  activated(){
    this.getVerifyApplyStatus();
  },
  methods: {
    //判断主播申请状态
    //status 申请状态，1：可以申请；2：,等待审核，3：条件不满足 ，4：已经是主播,不能重复申请，5:未绑定手机号
    getVerifyApplyStatus() {
      let that = this;
      $http.post("plugin.room.frontend.room.verifyApplyStatus", {}, "").then(response => {
          if (response.result === 1) {
            that.bannerSrc = response.data.banner;
            that.agreement = response.data.agreement;
            if(response.data.status == 2){
              that.showPopup = true;
            }else if(response.data.status == 3){
              that.showDissatisfy = true;
              that.conditionss = response.data.condition;
            }else if(response.data.status == 4){
              that.showVeriVfy = true;
            }else if(response.data.status == 5){
              that.$dialog.confirm({
                message: '申请成为主播需绑定手机号！',
                confirmButtonText:'去绑定'
              }).then(() => {
                that.$router.push(that.fun.getUrl('editmobile'));
              }).catch(() => {
                that.$router.push(that.fun.getUrl('member'));
                // on cancel
              });
            }
          } else {
            console.log(response.msg);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitApply(){
      if (this.fun.isTextEmpty(this.realname)) {
        Toast("请填写姓名");
        return;
      }
      if (this.fun.isTextEmpty(this.mobile)) {
        Toast("请填写手机号");
        return;
      }
      if (this.fun.isMoblie(this.mobile)) {
        Toast("请填写正确的手机号");
        return;
      }
      if (
        this.fun.isTextEmpty(this.province_id) ||
        this.fun.isTextEmpty(this.city_id) ||
        this.fun.isTextEmpty(this.district_id)
      ) {
        Toast("请选择省市区");
        return;
      }
      if (this.fun.isTextEmpty(this.streetId)) {
        Toast("请在后台系统-交易设置-开启街道地址");
        return;
      }
      if (this.fun.isTextEmpty(this.address)) {
        Toast("请填写详细地址");
        return;
      }
      if (!this.agreementChoose) {
        Toast("请同意申请协议");
        return;
      }
      let json = {
        realname: this.realname,
        mobile: this.mobile,
        provinceId: this.province_id,
        cityId: this.city_id,
        districtId: this.district_id,
        streetId: this.streetId,
        address: this.address,
        remark: this.applyModel,
      }

      $http.post("plugin.room.frontend.room.apply", json, "").then(response => {
        if (response.result === 1) {
          this.showPopup = true;
        } else {
          console.log(response.msg);
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 地址回调
    addressCallback(obj) {
      this.addressName =
        obj.itemName1 + " " + obj.itemName2 + " " + obj.itemName3;

      this.province_id = obj.itemValue1;
      this.city_id = obj.itemValue2;
      this.district_id = obj.itemValue3;

      this.getStreet(obj.itemValue3);
    },
    streetConfirm(item) {
      this.street = item.areaname;
      this.streetId = item.id;
      this.streetShow = false;
    },
    // 获取街道
    getStreet(param) {
      $http
        .get("member.memberAddress.street", { district_id: param })
        .then(response => {
          if (response.result === 1) {
            if (
              !this.fun.isTextEmpty(response.data) &&
              response.data.length > 0
            ) {
              this.districtVal = response.data;
              this.strShow = true;
            } else {
              this.strShow = false;
            }
          } else {
            this.strShow = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoLiveHome(){
      this.$router.push(this.fun.getUrl("liveList", {from: 1}));
    },
    gotoGetCondition(_tag){
      if(_tag == 1){
        this.$router.push(this.fun.getUrl("ExtensionApply", {}));
      }else if(_tag == 2){
        this.$router.push(this.fun.getUrl("storeApply", {}));
      }else if(_tag == 4){
        this.$router.push(this.fun.getUrl("hotelApply", {}));
      }else if(_tag == 3){
        this.$router.push(this.fun.getUrl("supplier", {}));
      }
    }
  },
  components: {
    cTitle
  }
};
