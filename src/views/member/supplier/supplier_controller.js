import cTitle from 'components/title'
import { Indicator, Toast } from 'mint-ui'
// import District from 'ydui-district/dist/gov_province_city_area_id'

const IS_SUPPLIER = -1; // todo 已经成为供应商，无需再申请
const REPEAT_APPLY = 0; // todo 已经提交申请，等待审核。
const VISIT_SUCCESS = 1; // todo 访问成功
export default {
  data() {
    return {
      setname: '',
      supplier_status: -2,
      supplier_info: '',
      supplier_form: '',
      isDiyForm: 0,
      applyModel: {
        username: '',
        password: '',
        realname: '',
        mobile: '',
        product: '',
        remark: '',
        // 省市区
        province_name: '',
        city_name: '',
        district_name: ''

      },
      diyform: {},
      diydata: [],
      types: {
        '88': 'diyusername',
        '99': 'diypassword',
        '0': 'diyinput',
        '1': 'diytextarea',
        '3': 'diycheckbox',
        '4': 'diyradio',
        '2': 'diyselect',
        '7': 'diydate',
        '9': 'diycity',
        '5': 'diyimage'
      },
      pickerValue: '2017-09-27',
      showCity: false,
      showCity1: false,
      district: district,
      currentDateKey: '',
      currentCityKey: '',
      checks: [],
      isValidation: true,
      activity_id: '',
      form_id: '',
      conference: {},
      intro: false,
      thumb: '',
      imgUrls: [],
      urlArr: [],
      isPhoto: true,
      btnTitle: '',
      isModify: false,
      previewImg: '',
      isPreview: false,
      currentImageField: '',
      pass_safe: 0,

      startDate: new Date('1900-01-01'),

      imageUrl: '',
      uploadUrl: '',
      fileList1: [],
      upNumMax: 0,
      // 完整地址
      fullAddress: '',
      showAddress: false
    }
  },

  activated() {
    this.showAddress = false
    this.fullAddress = ''
    this.supplier_status = -2
    this.pass_safe = 0
    this.diyform = {}
    this.diydata = []
    this.getData()
    this.imgUrls = []
    this.currentImageField = ''

    this.upEvent()
  },
  // mounted() {},
  watch: {
    'applyModel.password'(newname, oldname) {
      this.msgText = this.checkStrong(newname);
      if (this.msgText == 3) {
        // document.getElementById("tips").style.color = "#00D1B2";
        document.getElementById("tips").style.display = "none";
      } else {
        document.getElementById("tips").style.display = "#D33047";
        document.getElementById("tips").style.display = "inline-block";
      }
    }
  },

  methods: {
    checkStrong(sValue) {
      var modes = 0;
      //正则表达式验证符合要求的
      if (sValue.length < 1) return modes;
      if (/\d/.test(sValue)) modes++; //数字
      if (/[a-z]/.test(sValue)) modes++; //小写
      if (/[A-Z]/.test(sValue)) modes++; //大写
      // if (/\W/.test(sValue)) modes++; //特殊字符

      //逻辑处理
      switch (modes) {
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        case 3:
          return sValue.length < 8 ? 2 : 3;
          break;
      }
      return modes;
    },
    // 获取数据
    getData() {
      let that = this
      let json = {}

      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply', json, '加载中...').then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.supplier_status = response.data.status
          that.pass_safe = response.data.safe
          if (that.supplier_status == 1) {
            if (response.data.is_open_region == '1') {
              that.showAddress = true
            }
            that.checkEnableDiyForm()
            that.supplier_info = response.data.signature;
            if( that.supplier_info) {
              that.supplier_info = that.supplier_info.replace(/(\r\n|\n|\r)/gm, "<br />");
            }
            return
          }
        // that.supplier_info = response.data.signature
        // console.log(that.supplier_info)
        } else {
          Toast(response.msg)
        }
      }, function (response) {
        console.log(response)
      })
    },

    // 验证开启表单
    checkEnableDiyForm() {
      let that = this
      let json = {}
      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply.is-enable-diyform', json, '').then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.supplier_status = 2
          that.isDiyForm = 1
          that.form_id = response.data.form_id
          that.getForm()
        }
      }, function (response) {
        console.log(response)
      })
    },

    // 获取表单信息
    getForm() {
      var that = this
      $http.get('plugin.diyform.api.diy-form.get-diy-form-by-id', {
        'form_id': this.form_id,
        'i': this.fun.getKeyByI(),
        'type': this.fun.getTyep()
      }).then(function (response) {
        if (response.result == 1) {
          that.diyform = response.data
          var fields = that.diyform.fields
          for (var field in fields) {
            if (that.types[fields[field].data_type] == 'diycheckbox') {
              var f = {
                name: field,
                data: fields[field],
                value: [],
                type: that.types[fields[field].data_type]
              }
            } else if (that.types[fields[field].data_type] == 'diydate') {
              var f = {
                name: field,
                data: fields[field],
                value: '2018-03-29',
                type: that.types[fields[field].data_type]
              }
            } else if (that.types[fields[field].data_type] == 'diyimage') {
              var f = {
                name: field,
                data: fields[field],
                imgUrls: [],
                isPhoto: false,
                type: that.types[fields[field].data_type]
              }
            } else {
              var f = {
                name: field,
                data: fields[field],
                value: '',
                type: that.types[fields[field].data_type]
              }
            }

            that.diydata.push(f)
          }
          console.log('diyform', that.diydata)
        } else {
          // MessageBox.alert(response.msg)
        }
      }, function (response) {
        alert('fail')
      // error callback
      })
    },
    // onFileChange: function (event, item) {
    //   console.log('e.target', item)
    //   var files = event.target.files || event.dataTransfer.files
    //   if (!files.length) return
    //   this.createImage(files, event, item)
    // },
    createImage: function (file, e, item) {
      let vm = this
      // console.log('1111')
      lrz(file[0], {width: 480}).then(function (rst) {
        item.imgUrls.push(rst.base64)
        console.log('item', item)
        return rst
      }).always(function () {
        // 清空文件上传控件的值
        e.target.value = null
      })
    },
    delImage: function (item, index) {
      let vm = this

      this.$dialog.confirm({
        title: '删除',
        mes: '确定删除该图片?',
        opts: () => {
          console.log(item.constructor)
          console.log('delitem:', item)
          console.log('delitemindex:', index)
          // if (index == 1) {
          item.splice(index, 1)
        // }
        // Toast({mes: '你点了确定', timeout: 1000})
        }
      })
      /*mui.confirm('确定删除该图片?','提示', btnArray, function(e) {
        if (e.index == 1) {
          vm.imgUrls.splice(index, 1)
        }
      })*/

    },

    /*saveImage: function(){
      let vm = this
      let urlArr = [],
      imgUrls = this.imgUrls

      for(let i = 0; i < imgUrls.length; i++) {
        if(imgUrls[i].indexOf('file') == -1) {
          //urlArr.push(imgUrls[i].split(',')[1])
          urlArr.push(imgUrls[i])
        } else {
          urlArr.push(imgUrls[i])
        }
      }

      //数据传输操作
              $http.post('upload_handler.php', {
                  imgs: urlArr
              }).then(function (response) {
                  console.log(response)
              }, function (response) {
                  //alert(response.body.msg)
              })
              return
    },*/
    // 提交数据
    setApplyData() {
      console.log(this.applyModel)

      if (this.fun.isTextEmpty(this.applyModel.username)) {
        Toast('请填写账号')
        return
      }

      if (this.fun.isTextEmpty(this.applyModel.password)) {
        Toast('请填写密码')
        return
      }

      if (this.msgText != 3 && this.pass_safe == 1) {
        Toast('请正确填写密码')
        return
      }

      if (this.fun.isTextEmpty(this.applyModel.realname)) {
        Toast('请填写真实姓名')
        return
      }

      if (this.fun.isTextEmpty(this.applyModel.mobile)) {
        Toast('请填写手机号码')
        return
      }

      if (this.fun.isMoblie(this.applyModel.mobile)) {
        Toast('请输入正确的手机号')
        return
      }

      if (this.fun.isTextEmpty(this.applyModel.product)) {
        Toast('请填写产品类型')
        return
      }

      let that = this

      let json = {'apply': JSON.stringify(this.applyModel)}

      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply.apply', json, '提交中...').then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.supplier_status = response.data.status
        } else {
          Toast(response.msg)
        }
      }, function (response) {
        console.log(response)
      })
    },

    // 去商城
    goHome() {
      this.$router.push(this.fun.getUrl('home'))
    },

    setCity(ret) {
      var retCity = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3
      console.log('retCity', retCity)
      console.log('currentCityKey', this.currentCityKey)
      this.diydata.forEach(item => {
        if (item.name == this.currentCityKey) {
          this.$set(item, 'value', retCity)
        }
      })
    },
    openPicker(name) {
      this.currentDateKey = name
      console.log('name', name)
      this.$refs.picker.open()
    },
    setDate(ret) {
      console.log(ret.Format('yyyy-MM-dd'))
      this.diydata.forEach(item => {
        if (item.name == this.currentDateKey) {
          this.$set(item, 'value', ret.Format('yyyy-MM-dd'))
        }
      })
    },
    openCity(name) {
      this.currentCityKey = name
    },
    goback() {
      this.$router.go(-1)
    },
    validation() {
      this.isValidation = true
      this.diydata.forEach(item => {
        if (item.data.tp_must == 1 && !item.value && item.type != 'diyimage') {
          console.log(item.data.tp_name, item.value)
          Toast(item.data.tp_name + '必须填写哦')
          this.isValidation = false
        }

        if (item.data.tp_must == 1 && item.type == 'diyimage') {
          if (item.imgUrls.length < item.data.tp_max) {
            Toast(item.data.tp_name + '必须上传' + item.data.tp_max + '张')
            this.isValidation = false
          }
        }

        if (item.type == 'diycheckbox' && item.value.length == 0) {
          console.log(item.data.tp_name, item.value)
          Toast(item.data.tp_name + '必须选择哦')
          this.isValidation = false
        }
      })
    },
    submit() {
      console.log('submit')
      this.validation()
      if (!this.isValidation) {
        return
      }

      this.submitForm()
    },

    // 自定义表单提交
    submitForm() {
      var that = this
      var formData = []
      var formObject = {}
      this.diydata.forEach(item => {
        // 图片类型的直接提交图片base64的数组到后台，其它直接传值
        if (item.type == 'diyimage') {
          formObject[item.name] = item.imgUrls
        } else {
          formObject[item.name] = item.value
        }
      })
      console.log('formObject', formObject)
      formData.push(formObject)
      console.log('要提交了')
      // return;   //todo, 测试先停掉了，需要处理时把return去掉

      let json = {form_id: this.form_id, form_data: formData}
      $http.post('plugin.diyform.api.diy-form.save-diy-form-data', json, '提交中...').then(function (response) {
        if (response.result == 1) {
          that.submitApplyByForm(response.data.form_data_id)
        } else {
          Toast(response.msg)
        }
      }, function (response) {
        // error callback
      })
    },

    submitApplyByForm(fromId) {
      let that = this
      let json = {'form_data_id': fromId}
      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply.apply', json, '提交中...').then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          Toast(response.msg)
          that.$router.go(-1)
        } else {
          Toast(response.msg)
        }
      }, function (response) {
        console.log(response)
      })
    },

    //  setting sun
    // 营业执照上传成功
    handleAptiSuccess(res, file) {
      console.log('------param-----', res)
      if (res.result == 1) {
        for (var i = 0; i < this.diydata.length; i++) {
          if (this.diydata[i].name == res.data.attach) {
            this.diydata[i].imgUrls.push(res.data.img)
          }
        }
      } else {
        Toast(res.msg)
      }
    },
    // 删除上传
    handleAptiRemove(file, fileList) {
      // console.log('handleStoreRemove:', file, fileList, file.response.data.attach)
      this.upNumMax = fileList.length
      if (!file.response) {
        console.log('上传出错自动删除')
      } else {
        let f = file.response.data.img
        if (f) {
          for (var i = 0; i < this.diydata.length; i++) {
            if (this.diydata[i].name == file.response.data.attach) {
              let delIndex = ''
              this.diydata[i].imgUrls.forEach(function (val, index, arr) {
                if (val == f) {
                  delIndex = index
                }
              })
              this.diydata[i].imgUrls.splice(delIndex, 1)
            }
          }
        }
      }
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isPNG = (file.type === 'image/png' || file.type === 'image/jpeg')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPNG) {
        this.$notify('上传头像图片只能是 JPG或PNG 格式!')
      // this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$notify('上传头像图片大小不能超过 2MB!')
      // this.$message.error('上传头像图片大小不能超过 2MB!')
      // this.upNumMax = 0
      }
      return isPNG && isLt2M
    },
    upEvent() {
      this.uploadUrl = this.fun.getRealUrl('upload.uploadPic', {})
      console.log(this.diydata)
    },
    // 遮挡上传
    occlusion() {
      // this.$message.warning('图片数量已达到上限')
      this.$notify({
        background: '#fef0f0',
        message: '图片数量已达到上限',
        color: '#f56c6c'
      })
    },
    handleChange(file, fileList) {
      this.upNumMax = fileList.length
    },

    setCity1(value) {
      console.log(value)
      this.applyModel.province_name = value.itemName1
      this.applyModel.city_name = value.itemName2
      this.applyModel.district_name = value.itemName3
      this.fullAddress = value.itemName1 + ' ' + value.itemName2 + ' ' + value.itemName3
    },
    // vant 多图片上传
    setIndex(name) {
      this.setname = name
    },
    onRead_1(e) {
      var That = this
      let fd = new FormData()
      fd.append('attach', this.setname)
      fd.append('file', e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      axios.post(this.uploadUrl, fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        var responseData = response.data
        if (responseData.result == 1) {
          for (var i = 0; i < this.diydata.length; i++) {
            if (That.diydata[i].name == responseData.data.attach) {
              That.diydata[i].imgUrls.push(responseData.data.img_url)
            }
          }
        } else {
          Toast(responseData.msg)
        }
      }).catch(error => {
        console.log(error);})
    },
    removeImg: function (delIndex, index_1) {
      this.diydata[index_1].imgUrls.splice(delIndex, 1)
    }

  },
  components: {cTitle}
}
