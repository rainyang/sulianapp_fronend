import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
// import District from "src/gov_province_city_area_id";
import cTitle from "components/title";
import { resolve } from "path";

export default {
    data() {
        return {
            show1: false,//地区选择的显示隐藏
            address: '',
            district: district,
            apply_title:'',
            apply_url:'',
            apply_base:'',
            apply_banner:'',
            apply_more:'',
            provinceId:'',
            cityId:'',
            is_presence:'', //司机信息是否存在
            show: true,
        };
    },

    activated() {
        this.show=true;
        this.initPageData()
        this.getData()
     },
     deactivated (){
        this.show=false;
     },
    mounted() { },
    methods: {
        // 初始化数据
        initPageData(){
            this.address='',
            this.show1=false,
            this.apply_title='',
            this.apply_url='',
            this.apply_banner='',
            this.apply_base='',
            this.apply_more='',
            this.apply_process='',
            this.is_presence=''
        },
        // 跳转到司机申请路由
        turnTo(){
            if(this.fun.isTextEmpty(this.address)&&this.is_presence===0){
                Toast('请先选择城市')
            }else{
                this.$router.push(this.fun.getUrl('DriverData',{address:this.address,provinceId:this.provinceId,cityId:this.cityId}))
            }
        },
        //地区选择后触发的回调
        result1(ret) {
            this.provinceId=ret.itemValue1;
            this.cityId=ret.itemValue2;
            this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
        },
        // 获取数据
        getData(){
            $http.get('plugin.net-car.frontend.driver-apply.apply-page').then((response)=>{
                if(response.result===1){
                    this.apply_title=response.data.title;
                    this.apply_url=response.data.url;
                    this.apply_base=response.data.base_requirements;
                    this.apply_banner=response.data.thumb;
                    this.apply_process=response.data.process;
                    this.apply_more=response.data.more_content;
                    this.is_presence=response.data.is_presence;
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    components: { cTitle }
};
