import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";
import {scrollMixin} from '../../utils/mixin';//引入加载更多

const CITY_MANAGER_URL = "plugin.net-car.frontend.subordinate.car-team-member";

export default {
    mixins: [scrollMixin], //加载更多
    data() {
        return {
            //more
            dataInfo: [],//签约汽车信息
            page: 1,//分页数，当前页数
            isLoadMore: true,//判断是否要加载更多的标志
            total_page: 0,//总页数

            isShowNoTest: false,
            memberTotal: '0'
        };
    },

    activated() { 
        this.getData();
    },

    mounted() { },
    methods: {
        //获取数据
        getData() {
            let json = {
                page: 1
            }
            $http.get(CITY_MANAGER_URL, json, "加载中...").then(res => { 
                if (res.result == 1) {
                    this.isLoadMore = true;
                    this.total_page = res.data.last_page;
                    //console.log(res.data)
                    if(!this.total_page) {
                        this.total_page = 0;
                    }
                    this.memberTotal = res.data.total;
                    this.dataInfo = res.data;
                    this.isShowNoText = this.fun.isTextEmpty(this.dataInfo.data);
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //获取更多数据，加载更多
        getMoreData() {
            this.isLoadMore = false;
            if(this.page >= this.total_page) {
                return;
            }else {
                this.page += 1;
                $http.get(CITY_MANAGER_URL, { page: this.page}, "加载中...").then(res => { 
                    this.isLoadMore = true;
                    if (res.result == 1) {
                        var nextPageData = res.data;
                        this.dataInfo = this.dataInfo.concat(nextPageData);//进行数组拼接
                    }else {
                        this.page = that.page - 1;
                        this.isLoadMore = false;
                        return;
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        //下拉刷新
        loadTop() {
            //console.log('触发下拉');
            this.initPageData();
            this.getData();
            this.$refs.loadmore.onTopLoaded();
        },
        // 初始化数据
        initPageData() {
            this.dataInfo=[],
            this.isLoadMore=true,
            this.total_page=0,
            this.page=1
        },
    },
    components: { cTitle }
};
