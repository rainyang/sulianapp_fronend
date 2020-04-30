import cTitle from 'components/title'
import {scrollMixin} from "../../utils/mixin";//引入加载更多

export default {
    mixins: [scrollMixin],
    data() {
        return {
            info: [],

            page: 1,//分页数，当前页数
            isLoadMore: true,//判断是否要加载更多的标志
            total_page: 0,//总页数
        }
    },
    activated() {
        this.getData();
        this.init();
    },
    methods: {
        init(){
            this.info = [],
            this.isLoadMore=true,
            this.total_page=0,
            this.page=1
        },
        getData(){
            let that = this;
            $http.get('plugin.declaration.api.maker-user-log.index', {member_id: this.$route.params.id, page: 1}, "加载中").then(res => { 
                if (res.result == 1) {
                    that.isLoadMore = true;
                    that.total_page = res.data.last_page;
                    if(!that.total_page) {
                        that.total_page = 0;
                    }

                    this.info=res.data.data;
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
                $http.get('plugin.declaration.api.maker-user-log.index', {member_id: this.$route.params.id, page: that.page}, "加载中").then(res => { 
                    that.isLoadMore = true;
                    if (res.result == 1) {
                        var nextPageData = res.data.data;
                        that.info = that.info.concat(nextPageData);//进行数组拼接
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
            this.init();
            this.getData();
            this.$refs.loadmore.onTopLoaded();
        }
    },
    components: { cTitle }
}