import cTitle from 'components/title'
import { MessageBox, Indicator, Toast } from 'mint-ui'
var canvas = document.createElement('canvas')
var context = canvas.getContext('2d')
export default {
  data() {
    return {
      ratetextshow: ['极差', '失望', '一般', '满意', '惊喜'],
      ratetext: '惊喜',
      toi: this.fun.getKeyByI(),
      good: '',
      order_id: '',
      content: '',
      level: 5,
      order: '',
      comment: '', // 评论内容
      photosize: 1024 * 1024 * 2, // 图片大小限制,
      upNumMaxOther: '', // 图片数量
      uploadUrl: '',
      fileList3: [],
      fileList4: []
    }
  },
  methods: {
    getStar(value) {
      this.ratetext = this.ratetextshow[value - 1]
    },
    toComment(item) {
      if (this.comment.length == 0) {
        MessageBox({
          title: '提示',
          message: '您还没有输入相关的评论内容',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            this.submitData(item)
          } else {
            return
          }
        })
      } else {
        this.submitData(item)
      }
    },
    onphotosize(e) {
      if (e && e.length) {
        for (let i = 0; i < e.length; i++) {
          if (e[i].file.size > this.photosize) {
            console.log("图片超出大小",e[i])
            this.imgPreview(e[i].file, 2);
          }else{
            this.onRead_2(e[i].file, true);
          }
        }
      } else {
        console.log("图片超出大小",e)
        this.imgPreview(e.file, 2);
      }
    },
    imgPreview(file, callback) {
      let self = this
      // 判断支不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片转成base64格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          img.onload = function () {
            // 图片原始尺寸
            var originWidth = this.width
            var originHeight = this.height
            // 最大尺寸限制
            var maxWidth = 400,
              maxHeight = 400
            // 目标尺寸
            var targetWidth = originWidth,
              targetHeight = originHeight
            // 图片尺寸超过400x400的限制
            if (originWidth > maxWidth || originHeight > maxHeight) {
              if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth
                targetHeight = Math.round(
                  maxWidth * (originHeight / originWidth)
                )
              } else {
                targetHeight = maxHeight
                targetWidth = Math.round(
                  maxHeight * (originWidth / originHeight)
                )
              }
            }

            // canvas对图片进行缩放
            canvas.width = targetWidth
            canvas.height = targetHeight
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight)
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight)
            // canvas转为blob并上传
            canvas.toBlob(function (blob) {
              // 图片ajax上传
              if (callback === 1) {
                self.onRead(blob, true)
              } else {
                // self.onRead_1(blob, true)
                self.multipleMethod_1(blob, true)
              }
            }, file.type || 'image/png')
          }
        }
      }
    },
    // 判断多图上传，循环onRead_1方法
    multipleMethod_1(e, flag) {
      if (e && e.length) {
        for (let i = 0; i < e.length; i++) {
          this.onRead_2(e[i], flag);
        }
      } else {
        this.onRead_2(e, flag);
      }
    },
    // vant 多其他图片上传
    onRead_2(e, flag) {
      if (flag !== true) {
        // if (e.file.size > this.photosize) {
        //   this.imgPreview(e.file, 3)
        //   return false
        // }
      }
      var That = this
      let fd = new FormData()
      if (this.upNumMaxOther == 5 || this.upNumMaxOther >= 5) {
        this.$notify({
          background: '#fef0f0',
          message: '图片数量已达到上限',
          color: '#f56c6c'
        })
        return false
      }
      if (flag === true) {
        fd.append('file', e)
      } else {
        fd.append('file', e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      }
      fd.append('attach', 'upload')

      // 添加加载提示
      Indicator.open(' ')
      axios
        .post(this.uploadUrl, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          var responseData = response.data
          if (responseData.result == 1) {
            That.upNumMax++
            That.fileList3.push({
              url: responseData.data.img
            })
            console.log(That.fileList3)

            if (flag === true) {
              That.fileList4.push({
                url: URL.createObjectURL(e)
              })
            } else {
              That.fileList4.push({
                url: URL.createObjectURL(e.file)
              })
            }
            Indicator.close()
          } else {
            Toast(responseData.msg)
            Indicator.close()
          }
        })
        .catch(error => {
          console.log(error)
          Indicator.close()
        })
    },
    removeImg_1: function (delIndex) {
      this.fileList3.splice(delIndex, 1)
      this.fileList4.splice(delIndex, 1)
      this.upNumMaxOther = this.fileList3.length
    },
    // 提交数据到服务器
    submitData(item) {
      var that = this
      var newArr2 = []
      if (that.fileList3.length != 0) {
        for (var i = 0; i < that.fileList3.length; i++) {
          newArr2.push(that.fileList3[i].url)
        }
      } else {
        newArr2 = []
      }
      newArr2 = JSON.stringify(newArr2)
      console.log(newArr2)
      $http
        .post('goods.comment.create-comment', {
          order_id: this.order_id,
          goods_id: item.goods_id,
          content: this.comment,
          level: this.level,
          images: newArr2,
          i: this.fun.getKeyByI(),
          type: this.fun.getTyep()
        })
        .then(
          function (response) {
            if (response.result == 1) {
              MessageBox.alert(response.msg, '提示')
              that.$router.go(-1)
            } else {
              MessageBox.alert(response.msg, '提示')
            }
          },
          function (response) {
            // error callback
          }
      )
    }
  },
  activated() {
    this.comment = ''
    this.toi = this.fun.getKeyByI()
    this.order_id = this.$route.params.order_id
    this.good = this.$route.params.goods
    this.uploadUrl = this.fun.getRealUrl('upload.uploadPic', {})
  },
  components: { cTitle}
}
