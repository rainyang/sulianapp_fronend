import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      checkList: [],
      datas: [],
      checkAll: false
    }
  },

  activated() {
    this.toi = this.fun.getKeyByI();
    this.getData();
  },

  mounted() {
    this.toi = this.fun.getKeyByI();

  },
  methods:
  {

    // handleCheckAllChange(event) 
    // {
    //   this.checkList = event.target.checked ? this.datasoruce : [];

    // },
    // handleCheckedChange(event) 
    // {
    //   console.log(event);

    //   // let checkedCount = value.length;
    //   // this.checkAll = checkedCount === this.datasoruce.length;

    // },


    getData() {
      let that = this;

      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member-history.index', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.datas = response.data;
        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },

    delteteItem(item, i) {
      console.log(i);
      let that = this;
      let json = { id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };

      $http.get('member.member-history.destroy', json, "处理中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.datas.splice(i, 1);
          Toast("操作成功");
        } else {
          Toast(response.msg);
        }

      }, function (response) {
        console.log(response);
      });

    },

    toItem(item) {
      //console.log(goods);
      //this.$router.push({ name: 'goods', params: { id: goods.id }, query: { i: this.toi } });
      


      if(item.owner_id != 0){
        
        this.$router.push(this.fun.getUrl('goodsO2O',{id: item.goods.id,tag:"o2o",store_id:item.owner_id}));
        
      }else{
        this.$router.push(this.fun.getUrl('goods',{id: item.goods.id}));
      }
    }
  },
  components: { cTitle }
}