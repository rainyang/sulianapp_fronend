import cTitle from 'components/title'
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
        banner:'',//banner
        imgdata:'',//上传图片
        rules:'',//奖励规则
        cupcode:"",//二维码
        show:false,//图片显示
        title:'',//奖励规则
        couriername:'',//快递单名字
    }
  },  
  methods: { 
    initWeixin(){//微信设置
      $http.post("member.member.wxJsSdkConfig",{},).then(response =>{
        if(response.result == 1){
          this.weixinConfig(response.data);
        }
      }).catch(error =>{
        console.log(error);
      })
    },
     weixinConfig(data){
       wx.config(data.config);
     },
     getcode() {
      wx.scanQRCode({
        needResult: 1,
        scanType: ["qrCode", "barCode"],
        success:(res)=>{
          let arr=[]
          arr=res.resultStr.split(',')
          this.cupcode=arr[1]
        },
        fail:(res)=>{
          console.log(res)
          alert('扫码失败');
        }
      }); 
    },
    selectfile(){//选择引导
        let input=document.querySelector('#input')
        input.click()
    },
      submitUpload(){//快递单提交
        if(this.imgdata != ''&&this.cupcode != ''){
          let data={imgdata:this.imgdata,cupcode:this.cupcode}
          $http.post('plugin.courier.api.frontend.upload.getImg',data).then((res)=>{
            MessageBox.alert(res.msg)
          })      
        }else if(this.imgdata == ''&&this.cupcode != ''){
            this.$notify('请上传图片！');
          // this.$message.error('请上传图片！');
        }else if(this.imgdata != ''&&this.cupcode == ''){
            this.$notify('请填写快递单号！');
          // this.$message.error('请填写快递单号！');
        }else if(this.imgdata == ''&&this.cupcode == ''){
            this.$notify('请填写快递单号并上传图片！');
          // this.$message.error('请填写快递单号并上传图片！');
        }
         
      }, 
      getrent(){
        $http.get('member.member.getUserInfo').then((res)=>{
          if(!res.data.is_agent){
            MessageBox.alert('您还不是推广员,暂无法使用此功能').then(action => {
              this.$router.push(this.fun.getUrl("extension"))
            })
          }
        })
      },
      getimgurl(){//预览图片
        let that=this      
        let input = document.querySelector('#input')
        let reader = new FileReader()
        reader.readAsDataURL(input.files[0])
        reader.onload=function(){
            that.imgdata=this.result
            that.show=true
            input.setAttribute('type','text');
        }
    },
    changeimg(){
      this.show=false
      this.imgdata=''
      let input = document.querySelector('#input');
      input.setAttribute('type','file');
    },
    getdata(){
      $http.get('plugin.courier.api.frontend.upload.ajaxIndex').then((res)=>{
          this.banner=res.data[1].imgdata
          this.rules=res.data[1].textarea
          this.title=res.data[1].title
      })
    }      
  },
activated(){
  this.getrent()
},
created(){
  this.getdata()
  this.initWeixin()
  this.couriername=window.localStorage.couriername
},
  components: { cTitle }
}