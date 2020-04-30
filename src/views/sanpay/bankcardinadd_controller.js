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
      privateLi: false,
      val: ''
    }
  },
  activated() {
    this.getShow()
  },
  mounted() {
    console.log(this.radio, '什么值')
  },
  methods: {
    // 判断是否显示
    getShow() {
      $http.get('plugin.converge_pay.frontend.controllers.converge-pay-bank-card.create').then((res) => {
        if (res.result === 1) {
          console.log(res.data, '215445545')
          if (res.data.all == '1') {
            this.private = true
            this.public = true
            this.privateLi = true
          } else {
            if (res.data.private == '1') {
              this.private = true
              this.public = false
              this.radio = '对私账户'
              this.privateLi = false
            }
            if (res.data.public == '1') {
              this.public = true
              this.private = false
              this.radio = '对公账户'
              this.privateLi = true
            }
            if (res.data.public == '1' && res.data.private == '1') {
              this.public = true
              this.private = true
              this.radio = '对公账户'
              this.privateLi = true
            }
          }

          console.log(this.radio, '什么值')
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
    // 提交
    addTiJiao() {
      console.log('添加银行卡')
      if (this.receiverAccountNoEnc == '') {
        Toast('请输入银行卡卡号')
        return
      }
      var reg = /^\d{16,19}$/
      console.log(reg.test(this.receiverAccountNoEnc))

      if (!reg.test(this.receiverAccountNoEnc)) {
        Toast('请输入19位的银行卡卡号')
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
      $http.get('plugin.converge_pay.frontend.controllers.converge-pay-bank-card.create', { data: json }).then((res) => {
        if (res.result === 1) {
          Toast(res.msg)
          this.receiverAccountNoEnc = ''
          this.receiverNameEnc = ''
          this.receiverBankChannelNo = ''
          setTimeout(() => {
            this.$router.push(this.fun.getUrl('bankCardInformation'))
          }, 1000)
        } else {
          Toast(res.msg)
        }
      }, function (response) {
        // error callback
      })
    // this.$router.push(this.fun.getUrl())
    },
    // 编辑数据
    editInfo() {
      $http.get('plugin.converge_pay.frontend.controllers.converge-pay-bank-card.edit', { id: this.$route.params.id }).then((res) => {
        console.log(res, 'res')

        if (res.result == '1') {
          console.log(res.data, '525454545454')
        } else {
          MessageBox.alert(res.msg)
        }
      })
      console.log('编辑')
    }

  },

  components: {cTitle}
}
