import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";
import {scrollMixin} from '../../utils/mixin';
export default {
    mixins: [scrollMixin], //加载更多
    data() {
        return {
            port_type:'',//端口的不同类型
            page:1,
            amount:'',//分红总额
            bonus:[],//分红列表数据
            isLoadMore:true,//判断是否能够加载更多
            last_page:0 ,//总页数
            isShowNoTest:false  //无数据时的判断
        };
    },

    activated() { 
        this.port_type=this.$route.params.id||'3';
        this.getData(this.port_type)
    },
    mounted() { },
    methods: {
        // 下拉刷新
        loadTop() {
            this.initPageData();
            this.getData(this.port_type);
            this.$refs.bonus_loadmore.onTopLoaded();
        },
        // 初始化数据
        initPageData(){
            this.bonus=[],
            this.isLoadMore=true,
            this.last_page=0,
            this.amount='',
            this.page=1,
            this.port_type=this.$route.params.id||'3',
            this.isShowNoTest=false
        },
        // 首次获取数据
        getData(type){
            let json={
                port_type:type,
                page:1
            }
            $http.get('plugin.net-car.frontend.net-car.dividend-detail',json,'加载中').then((response)=>{
                if(response.result===1){
                    this.isLoadMore = true;
                    this.amount=response.data.total_amount;
                    this.last_page=response.data.last_page;
                    if(!this.last_page){
                        this.last_page=0;
                    }
                    if(response.data.data.length>0){
                        this.isShowNoTest=false;
                        this.bonus=response.data.data;
                    }else{
                        this.isShowNoTest=true;
                    }              
                }else{
                    Toast(response.msg)
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        // 获取更多数据
        getMoreData(){
            this.isLoadMore = false; // 防止多次请求分页数据
            let json={
                port_type:this.port_type,
                page:this.page
            }
            if(this.page>=this.last_page){
                return 
            }else{
                this.page=this.page+1
                json.page=this.page
                $http.get('plugin.net-car.frontend.net-car.dividend-detail',json,'加载中').then((response)=>{
                   this.isLoadMore = true;
                   if(response.result===1){
                        this.bonus=this.bonus.concat(response.data.data)
                   }else {
                    this.page = this.page - 1;
                    this.isLoadMore = false;
                    return;
                  }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    },
    components: { cTitle }
};
