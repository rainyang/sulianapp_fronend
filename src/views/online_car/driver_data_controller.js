import { Loadmore } from 'mint-ui'
import { Indicator, Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import cTitle from 'components/title'
// import District from 'src/gov_province_city_area_id'

export default {
  data() {
    return {
      idNumber: '', // 身份证号码
      Name: '', // 个人姓名
      address: '', // 所选择的地址
      district: district,
      show1: false,
      provinceId: '', // 省份ID
      cityId: '', // 城市ID
      uploadUrl: '', // 后台上传图片地址,
      fromUrl: '', // 表单信息提交
      idImg: '', // 身份证图片
      nationImg: '', // 身份证国徽面
      carImg: '', // 驾驶证正面
      idTime: '2019-05-11', // 身份证有效期
      driverTime: '2019-05-11', // 驾驶证领证时间
      driverEffect: '2019-05-11', // 驾驶证有效期
      id: 3, // 会员端端口
      driver: '', // 司机信息
      fileInfo: '',
      remark: '', // 拒绝申请备注
      status: '', // 审核状态
      driver_phone: ''
    }
  },

  activated() {
    this.initPageData()
    this.statusInfo()
  },
  updated() {
    window.scrollTo(0, 0);
  },
  mounted() {},
  methods: {
    // 初始化数据
    initPageData() {
      this.idNumber = '',
      this.Name = '',
      this.show1 = false,
      this.uploadUrl = '',
      this.fromUrl = '',
      this.idImg = '',
      this.nationImg = '',
      this.carImg = '',
      this.driver = '',
      this.status = '',
      this.id = 3,
      this.idTime = '2019-05-11',
      this.driverTime = '2019-05-11',
      this.driverEffect = '2019-05-11',
      this.fileInfo = '',
      this.remark = ''
    },
    // 上传身份证正面
    IdRead(e) {
      let fd = new FormData()
      console.log(e, '文件流')
      fd.append('file', e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      var That = this
      this.uploadUrl = this.fun.getRealUrl(
        'upload.uploadPic',
        {}
      )

      axios.post(this.uploadUrl, fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        this.idImg = response.data.data.img_url
      // this.img.push(res.data.imgpath)
      }).catch(error => {
        console.log(error);})
    },
    // 上传身份证国徽面
    NationRead(e) {
      let fd = new FormData()
      fd.append('file', e.file)
      var That = this
      this.uploadUrl = this.fun.getRealUrl(
        'upload.uploadPic',
        {}
      )

      axios.post(this.uploadUrl, fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        this.nationImg = response.data.data.img_url
      // this.img.push(res.data.imgpath)
      }).catch(error => {
        console.log(error);})
    },
    // 上传驾驶证正面
    CarRead(e) {
      let fd = new FormData()
      fd.append('file', e.file)
      var That = this
      this.uploadUrl = this.fun.getRealUrl(
        'upload.uploadPic',
        {}
      )
      axios.post(this.uploadUrl, fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        this.carImg = response.data.data.img_url
      // this.img.push(res.data.imgpath)
      }).catch(error => {
        console.log(error);})
    },
    // 选择省市区后触发的回调
    result1(ret) {
      this.provinceId = ret.itemValue1
      this.cityId = ret.itemValue2
      this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3
    },
    // JS正则验证手机号码
    isPoneAvailable(pone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(pone)) {
        return false
      } else {
        return true
      }
    },
    // 司机申请信息提交
    CarInfo() {
      let regName = /^[\u4e00-\u9fa5]{2,4}$/
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let that = this
      if (this.fun.isTextEmpty(this.address)) {
        Toast('请选择地址')
        return
      }
      if (this.fun.isTextEmpty(this.idImg)) {
        Toast('请上传身份证人面像')
        return
      }
      if (this.fun.isTextEmpty(this.nationImg)) {
        Toast('请上传身份证国徽面')
        return
      }
      if (this.fun.isTextEmpty(this.carImg)) {
        Toast('请上传驾驶证正面')
        return
      }
      if (this.fun.isTextEmpty(this.Name)) {
        Toast('请输入姓名')
        return
      }
      if (!regName.test(this.Name)) {
        Toast('真实姓名有误,请重新填写')
        return
      }
      if (this.fun.isTextEmpty(this.idNumber)) {
        Toast('请输入身份证号码')
      }
      if (!regIdNo.test(this.idNumber)) {
        Toast('请输入正确身份证号码')
        return
      }
      if (isNaN(this.driver_phone) && this.driver_phone.length > 0) {
        Toast('手机号码只能为数字')
        return
      }
      if (!this.isPoneAvailable(this.driver_phone) && this.driver_phone.length > 0) {
        Toast('请输入正确的手机号码')
        return
      }else {
        this.fromUrl = this.fun.getRealUrl(
          'plugin.net-car.frontend.driver-apply.create',
          {}
        )
        let info = {
          driver_name: this.Name,
          id_card_expiry: this.idTime,
          driver_id_card: this.idNumber,
          driver_phone: this.driver_phone,
          receive_driver_license: this.driverTime,
          driver_license_expiry: this.driverEffect,
          province_id: this.provinceId,
          city_id: this.cityId,
          file_info: {id_card_front: this.idImg,id_card_back: this.nationImg,driver_license_front: this.carImg}
        }
        $http.post(this.fromUrl, {data: info}, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
          if (response.result === 1) {
            Toast('提交成功')
            this.$router.push(this.fun.getUrl('online_car', {id: this.id}))
          }else {
            Toast(response.msg)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 获取司机信息状态
    statusInfo() {
      $http.get('plugin.net-car.frontend.driver-apply.get-driver').then(response => {
        if (response.result === 1) {
          this.status = response.data.status
          this.driver = response.data.driver
          if (this.status === 999) {
            this.address = this.$route.params.address
            this.provinceId = this.$route.params.provinceId
            this.cityId = this.$route.params.cityId
          }else {
            this.fileInfo = this.driver.file_info
            this.Name = this.driver.driver_name
            this.idNumber = this.driver.driver_id_card
            this.idTime = this.driver.id_card_expiry
            this.driverTime = this.driver.receive_driver_license
            this.driverEffect = this.driver.driver_license_expiry
            this.address = this.driver.address
            this.idImg = this.fileInfo.id_card_front
            this.nationImg = this.fileInfo.id_card_back
            this.carImg = this.fileInfo.driver_license_front
            this.remark = this.driver.remark
            this.driver_phone = this.driver.driver_phone
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: { cTitle}
}
