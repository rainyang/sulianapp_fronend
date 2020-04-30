import { Field, Button } from "mint-ui";
import { MessageBox } from "mint-ui";
import { CheckBox, CheckBoxGroup } from "vue-ydui";
import cTitle from "components/title";



export default {
  data() {
    return {
      type:0,
      banner_url:'',
      app_url:'',
    };
  },

  mounted() {
    
  },

  methods: {
    init() {
      this.type = 0;
      this.banner_url = '';
      this.app_url = '';
    },
    
    jumpDown() {
      window.location.href = this.app_url;
    },
    getData() {
      var that = this;
      $http.get('plugin.app-set.frontend.app-poster.getAppShareOther', {}).then((response) => {
        if (response.result == 1) {
          let set =  response.data.set;
          that.banner_url = set.banner_url;
          that.app_url = set.app_url;
        } else {
          MessageBox.alert(response.msg);
        }
      }, (response) => {
        console.log(response.msg);
        that.agreementStatus = false;
      });
    },
    
  },
  activated() {
    let that = this;
    if(this.$route.params.type) {
      that.type = this.$route.params.type
    }
    this.getData();
  },

  components: { cTitle, CheckBox }
};
