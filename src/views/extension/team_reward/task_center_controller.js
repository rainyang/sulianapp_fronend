import cTitle from 'components/title';
import {Toast, MessageBox} from 'mint-ui';

export default {
	data() {
		return {
			member: {},
			task: {},
		}
	},
	activated() {
		this.getData();
	},
	methods: {
		getData() {
			$http.get("plugin.team-rewards.frontend.controllers.task.index", {}, " ").then(
					(response) => {
						if (response.result === 1) {
							this.member = response.data.member;
							this.task = response.data.task;
						} else {
							Toast(response.msg);
						}
					},
					function (response) {
						console.log(response);
					}
			);
		},
	},
	components: {cTitle}
}
