import cTitle from 'components/title'
import { Navbar, Toast, MessageBox } from 'mint-ui'
import { scrollMixin } from 'utils/mixin'

export default {
  mixins: [scrollMixin], // 加载更多
  data() {
    return {
      radio: '对公账户',
      switch1: true,
      receiverAccountNoEnc: '', // 银行卡号
      receiverNameEnc: '', // 名称
      receiverBankChannelNo: '', // 账户
      // 判断是否显示对公和对私
      private: true, // 对公
      public: true, // 对私
      privateLi: true,
      val: '',
      status: false
    }
  },
  activated() {
    this.getShow()
    this.editInfo()
  },
  mounted() {
    if (this.radio == '对私账户') {
      this.privateLi = false
    } else if (this.radio == '对公账户') {
      this.privateLi = true
    }
  },
  methods: {
    change() {
      this.status = true;
      this.receiverAccountNoEnc = ""
    },
    // 判断是否显示
    getShow() {
      $http.get('plugin.converge_pay.frontend.controllers.converge-pay-bank-card.create').then((res) => {
        if (res.result === 1) {
          if (res.data.all == '1') {
            this.private = true
            this.public = true
          } else {
            if (res.data.private == '1') {
              this.private = true
              this.radio = '对私账户'
            }
            if (res.data.public == '1') {
              this.public = true
              this.radio = '对公账户'
            }
            if (res.data.public == '1' && res.data.private == '1') {
              this.public = true
              this.private = true
              this.radio = '对公账户'
            }
          }
        } else {
          MessageBox.alert(res.msg)
        }
      }, function (response) {
        // error callback
      })
    },
    // 改变
    changeOut(val) {
      if (val == '对私账户') {
        this.privateLi = false
      } else if (val == '对公账户') {
        this.privateLi = true
      }
    },
    // 修改
    addTiJiao() {
      console.log('修改银行卡')
      if (this.receiverAccountNoEnc == '') {
        Toast('请输入银行卡卡号')
        return
      }
      if (this.receiverNameEnc == '') {
        Toast('请输入持卡人名称')
        return
      }
      if (this.privateLi) {
        if (this.receiverBankChannelNo == '') {
          Toast('请输入对公账户')
          return
        }
      }

      var type = ''
      if (this.radio == '对公账户') {
        type = 204
      } else if (this.radio == '对私账户') {
        type = 201
      }
      let json = [{
        receiverAccountNoEnc: this.receiverAccountNoEnc,
        receiverAccountType: type,
        receiverNameEnc: this.receiverNameEnc,
        receiverBankChannelNo: this.receiverBankChannelNo,
        default: this.switch1 ? '1' : '0'
      }]
      json = JSON.stringify(json)
      $http.get('plugin.converge_pay.frontend.controllers.converge-pay-bank-card.edit', { data: json, id: this.$route.params.id }).then((res) => {
        if (res.result === 1) {
          MessageBox.alert(res.msg)
          setTimeout(() => {
            this.$router.push(this.fun.getUrl('bankCardInformation'))
          }, 1000)
        } else {
          MessageBox.alert(res.msg)
        }
      }, function (response) {
        // error callback
      })
    },
    // 编辑数据
    editInfo() {
      $http.get('plugin.converge_pay.frontend.controllers.converge-pay-bank-card.edit', { id: this.$route.params.id }).then((res) => {
        console.log(res, 'res')
        if (res.result == '1') {
          this.receiverAccountNoEnc = res.data.receiverAccountNoEnc
          this.receiverAccountType = res.data.receiverAccountType
          this.receiverNameEnc = res.data.receiverNameEnc
          this.receiverBankChannelNo = res.data.receiverBankChannelNo

          if (this.fun.isTextEmpty(res.data.has_one_default)) {
            this.switch1 = false
          } else {
            if (res.data.has_one_default.default == '0') {
              this.switch1 = false
            } else {
              this.switch1 = true
            }
          }
          if (this.receiverAccountType == '204') {
            this.radio = '对公账户'
            this.privateLi = true
          } else if (this.receiverAccountType == '201') {
            this.radio = '对私账户'
            this.privateLi = false
          }
          this.status = false;
        } else {
          MessageBox.alert(res.msg)
        }
      })
    },
    deleteChange() {
      $http.get('plugin.converge_pay.frontend.controllers.converge-pay-bank-card.destroy', { id: this.$route.params.id }).then((res) => {
        if (res.result == '1') {
          MessageBox.alert(res.msg)
          this.$router.push(this.fun.getUrl('bankCardInformation'))
        } else {
          MessageBox.alert(res.msg)
          this.$router.push(this.fun.getUrl('bankCardInformation'))
        }
      })
    }

  },

  components: {cTitle}
}
