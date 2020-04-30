import cTitle from 'components/title';
import {Toast, MessageBox} from 'mint-ui';
import { scrollMixin } from "utils/mixin";

export default {
    mixins: [scrollMixin], //加载更多
    data() {
        return {
            rename:'',
            active: 0,
            page:1,
            total_page:0,
            isLoadMore:true,
            alldata:[],
            incomedata:[],
            paydata:[],
            retype:''
        }
    },
    activated() {
        this.active = 0;
        this.retype='';
        this.initData();
        this.getData('');
    },
    methods: {
        initData(){
            this.page = 1;
            this.total_page = 0;
            this.isLoadMore = true;
        },
        getData(){
            $http.post("plugin.team-rewards.frontend.controllers.deposit.index", {page:1,change_type:this.retype}, " ").then(
                (response) => {
                    if (response.result === 1) {
                        let jsonData = response.data;
                        this.rename = jsonData.name?jsonData.name:'';
                        this.isLoadMore = true;
                        this.total_page = jsonData.list.last_page;
                        if (!this.total_page) {
                            this.total_page = 0;
                        }
                        if(this.retype=='income'){//收入数据
                            this.incomedata = jsonData.list.data?jsonData.list.data:[];
                        }else if(this.retype=='deduct'){//支出数据
                            this.paydata = jsonData.list.data?jsonData.list.data:[];
                        }else{
                            this.alldata = jsonData.list.data?jsonData.list.data:[];
                        }
                    } else {
                        Toast(response.msg);
                    }
                },
                function (response) {
                    console.log(response);
                }
            );
        },
        tabDataBtn(e){
            let index=e;
            this.initData();
             if(index==0){
                 this.retype=''
                 this.getData()
             }else if(index==1){
                 this.retype='income'
                 this.getData()
             }else{
                 this.retype='deduct'
                 this.getData()
             }
        },
        //获取更多数据
        getMoreData() {
            this.isLoadMore = false;  // 防止多次请求分页数据
            if (this.page >= this.total_page) {
                return;
            } else {
                this.page = this.page + 1;
                $http.get('plugin.team-rewards.frontend.controllers.deposit.index', {
                    page: this.page,
                    change_type:this.data.retype
                }, '加载中').then(response=> {
                    this.isLoadMore = true;
                    if (response.result === 1) {
                        var myData = response.data.list.data;
                        if(this.retype=='income'){//收入数据
                            this.incomedata =this.incomedata.concat(myData);//数组拼接
                        }else if(this.retype=='deduct'){//支出数据
                            this.paydata = this.paydata.concat(myData);//数组拼接
                        }else{
                            this.alldata = this.alldata.concat(myData);//数组拼接
                        }
                    } else {
                        this.page = this.page - 1;
                        this.isLoadMore = false;
                    }
                }, function (response) {
                    // error callback
                });

            }
        },
    },
    components: {cTitle}
}
