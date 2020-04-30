import cTitle from 'components/title'
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
        recordtype:['全部','待审核','已通过','无效'],
        selectkey:0,
        dataold:[],
        datas:[],
        couriername:'',
    }
  },  
  methods: {
      filtertype(key){
          this.selectkey=key
          let changetype=this.datas.filter((res)=>{
              return res!=5
          })
          this.datas=changetype
          switch(key){
              case 0:
              this.datas=this.dataold;
              break;
              case 1:
              this.datas=this.dataold;
              this.datas=this.datas.filter((res)=>{
                  return res.status==0
              })
               break;
               case 2:
               this.datas=this.dataold;
               this.datas=this.datas.filter((res)=>{
                   return res.status==1
               })
               break;
               case 3:
               this.datas=this.dataold;
               this.datas=this.datas.filter((res)=>{
                return res.status==2
            })
          }
      },
      getdata(){
        $http.get('plugin.courier.api.frontend.uploadLog.index').then((res)=>{
            this.dataold=res.data.list
            this.datas=this.dataold
        })
      }
  },
  created(){
    this.couriername=window.localStorage.couriername
  },
  activated(){
    this.getdata()
},
  components: { cTitle }
}