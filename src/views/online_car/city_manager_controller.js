import { Loadmore } from "mint-ui";
import { Indicator, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import cTitle from "components/title";
import {scrollMixin} from "../../utils/mixin";//引入加载更多

const CITY_MANAGER_URL = "plugin.net-car.frontend.subordinate.city-manager-people";

export default {
    mixins: [scrollMixin],
    data() {
        return {
            isShowNoText: false,
            managerNumber: '0',
            //more
            dataInfo: [],//签约汽车信息
            page: 1,//分页数，当前页数
            isLoadMore: true,//判断是否要加载更多的标志
            total_page: 0,//总页数
        };
    },

    activated() { 
        this.getData();
    },

    methods: {
        // 初始化数据
        initPageData(){
            this.dataInfo=[],
            this.isLoadMore=true,
            this.total_page=0,
            this.page=1
        },
        //获取数据
        getData() {
            const that = this;
            let json = {
                page: 1
            }
            $http.get(CITY_MANAGER_URL, json, "加载中...").then(res => { 
                if (res.result == 1) {
                    //console.log(res.data)
                    that.isLoadMore = true;
                    that.total_page = res.data.last_page;
                    if(!that.total_page) {
                        that.total_page = 0;
                    }
                    that.dataInfo = res.data;
                    that.managerNumber = res.data.total;
                    that.isShowNoText = that.fun.isTextEmpty(this.dataInfo.data);
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //获取更多数据，加载更多
        getMoreData() {
            this.isLoadMore = false; // 防止多次请求分页数据
            const that = this;
            if(that.page >= that.total_page) {
                return;
            }else {
                that.page += 1;
                $http.get(CITY_MANAGER_URL, {page: that.page}, "加载中...").then(res => { 
                    that.isLoadMore = true;
                    if (res.result == 1) {
                        var nextPageData = res.data;
                        that.dataInfo = that.dataInfo.concat(nextPageData);//进行数组拼接
                    }else {
                        that.page = that.page - 1;
                        that.isLoadMore = false;
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
        }
    },
    components: { cTitle }
};
