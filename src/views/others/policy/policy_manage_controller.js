import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import Vue from "vue";
import { Popup } from 'vant';
import { Overlay } from "vant";
import { Dialog } from 'vant';
Vue.use(Overlay);

export default {
  data() {
    return {
      show: false,
      show1:false,
    };
  },
  activated() {

  },
  methods: {
    
    showPopup() {
      this.show = true;
    },
    showCall() {
      this.show1 = true;
      this.show = false;
    },
    showHidden(){
      this.show= false;
      this.show1=false;
    },
  },
  components: { cTitle }
};
