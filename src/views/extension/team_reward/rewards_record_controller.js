import cTitle from 'components/title';
import {Toast, MessageBox} from 'mint-ui';
import { scrollMixin } from "utils/mixin";

export default {
	mixins: [scrollMixin], //加载更多
	data() {
		return {
			active: 0,
			allData: {},
			member:{},
			rewards:{},
			name:{},
			rewards_type: 1,
			recordsList: [],
			amount_id: '',
			//more
			isLoadMore: true,
			page: 1,
			total_page: 0,
		}
	},
	activated() {
		this.initData();
		this.getData();
	},
	methods: {
		toPage(){
			this.$router.push(this.fun.getUrl('TaskCenter'));
		},
		tabHandel(index) {
			this.rewards_type = index+1;
			this.initData();
			this.getData();
		},
		showDetail(obj) {
			if (obj.show && this.amount_id === obj.id) {
				obj.show = false;
				return;
			}
			this.amount_id = obj.id;
			this.$set(obj, "show", true);
		},
		getData() {
			$http.post("plugin.team-rewards.frontend.controllers.rewards-center.index", {page:1,rewards_type:this.rewards_type}, " ").then(
					(response) => {
						if (response.result === 1) {
							this.allData = response.data;
							this.member = this.allData.member;
							this.rewards = this.allData.statistics;
							this.name = this.allData.name;
							this.isLoadMore = true;
							this.total_page = this.allData.page_list.last_page;
							if (!this.total_page) {
								this.total_page = 0;
							}
							this.recordsList = this.allData.page_list.data;
							this.fun.setWXTitle(this.name.plugin_name);
						} else {
							Toast(response.msg);
						}
					},
					function (response) {
						console.log(response);
					}
			);
		},
		//获取更多数据
		getMoreData() {
			this.isLoadMore = false;  // 防止多次请求分页数据
			if (this.page >= this.total_page) {
				return;
			} else {
				this.page = this.page + 1;
				$http.get('plugin.team-rewards.frontend.controllers.rewards-center.search', {
					page: this.page,rewards_type:this.rewards_type
				}, '加载中').then(response=> {
					this.isLoadMore = true;
					if (response.result === 1) {
						var myData = response.data.data;
						this.recordsList = this.recordsList.concat(myData);//数组拼接
					} else {
						this.page = this.page - 1;
						this.isLoadMore = false;
					}
				}, function (response) {
					// error callback
				});

			}
		},
		initData(){
			this.recordsList = [];
			this.page = 1;
			this.total_page = 0;
			this.isLoadMore = true;
			this.amount_id = '';
		},
		goRewardsRecordDetail(){
			this.$router.push(this.fun.getUrl("RewardsRecordDetail"));
		}
	},
	components: {cTitle}
}
