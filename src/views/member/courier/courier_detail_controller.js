import cTitle from 'components/title'
export default {
  data() {
    return {
        datas:{},
        couriername:'',
    }
  },  
  methods: {
  },
  created(){
    this.couriername=window.localStorage.couriername
  },
  activated(){
    let data={id:this.$route.params.id}
    $http.post('plugin.courier.api.frontend.uploadLog.checkLog',data).then((res)=>{
      this.datas=res.data.list
    })
  },
  components: { cTitle }
}