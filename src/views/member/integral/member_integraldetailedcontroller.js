import cTitle from 'components/title';
  export default {
data() {
      return {
        toi: this.fun.getKeyByI(),
        item:'',
        income_name_text: "",
      };
    },
    methods:{
      //自定义提现收入语言
      customizeIncome(){
        let mailLanguage = this.fun.initMailLanguage()
        //自定义收入字段
        this.income_name_text = mailLanguage.income.income_name;
      }
    },
    activated () {
      this.toi = this.fun.getKeyByI();
      this.item = this.$route.params.item;
      this.customizeIncome();
    },
    components: { cTitle }
  }