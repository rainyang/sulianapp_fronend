import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";
import { format } from "util";

//会员端地址
const MEMBER_PAGE_URL = "plugin.net-car.frontend.net-car.index";
//司机地址
const DRIVER_PAGE_URL = "plugin.net-car.frontend.net-car.driver-port";
//投资人端地址
const INVESTORS_PAGE_URL = "plugin.net-car.frontend.net-car.investor-port";

export default {
    data() {
        return {
            is_driver:'',
            userType: 3,//当前端口类型，3:会员端 ||2：司机端||1：投资人
            dataInfo: {},//返回数据列表
            headTitles: '',
            showMoney: true,//是否显示金额数字，false是显示' **** '
        };
    },
    activated() {
        this.userType = this.$route.params.id||'3';
        this.getPageData();
    },
    deactivated () {
       
    },
    created () {
        
    },
    mounted() {
        this.userType = this.$route.params.id;
        //console.log("ssssssssssssssssssss",this.userType)
     },
    methods: {
        //获取页面数据
        getPageData() {
            var _url = '';
            if(this.userType == '3') {
                //加载会员端
                _url = MEMBER_PAGE_URL;
                this.headTitles = '会员端';
            }else if(this.userType == '2'){
                //加载司机端
                _url = DRIVER_PAGE_URL;
                this.headTitles = '司机端';
            }else {
                //加载投资人端
                _url = INVESTORS_PAGE_URL;
                this.headTitles = '投资人端';
            }

            $http.get(_url, {}, "加载中...").then(res => { 
                if (res.result == 1) {
                    this.is_driver=res.data.is_driver;
                    this.dataInfo = res.data;
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //会员端 切换版本（端口类型）
        //是否注册了司机，否：申请司机||是：加载对应版本
        switchType(p) {
            if( p == '2') {
                if(this.is_driver == '0' ){
                    //进入司机申请
                    this.$router.push(this.fun.getUrl("DriverApply"));
                }else{
                    this.dataInfo = '';
                    this.$router.push(this.fun.getUrl("online_car",{id: p}));
                }
            } else {
                //is_driver为1 ,已成为司机
                this.dataInfo = '';
                this.$router.push(this.fun.getUrl("online_car",{id: p}));
            }
        },
        //改变金额显示与隐藏， ****
        isLook() {
            this.showMoney = !this.showMoney;
        },
        driverApply(){
            this.$router.push(this.fun.getUrl("DriverApply")); 
        }
    },
    components: { cTitle }
};
