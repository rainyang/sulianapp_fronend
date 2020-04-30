import {Indicator, Toast} from 'mint-ui';
import cTitle from 'components/title';
//import BMap from 'BMap';
export default {
    data() {
        return {
            commodityTitle:'',
            historydata:[]
        };
    },
    activated() {
        this.getHistory()
    },

    mounted() {

    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        goToSearch(){
            this.$router.push(
                this.fun.getUrl('microClassification', {
                    searchdata: this.commodityTitle
                })
            );
        },
        goHistoryBtn(val){
            this.$router.push(
                this.fun.getUrl('microClassification', {
                    searchdata: val
                })
            );
        },
        getHistory(){
            let that=this;
            let dataJson={};
            $http.post("plugin.micro-communities.api.index.getSearch", dataJson, "").then(response => {
                if (response.result == 1) {
                    that.historydata = response.data
                } else {
                    Toast(response.msg)
                }
            });
        },
        clearHistory(){
            let that=this;
            let dataJson={};
            $http.post("plugin.micro-communities.api.trick.delSearch", dataJson, "").then(response => {
                if (response.result == 1) {
                    that.historydata = [];
                    Toast(response.msg)
                } else {
                    Toast(response.msg)
                }
            });
        }
    },

    components: {
        cTitle
    }
};
