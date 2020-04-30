import cTitle from 'components/title';
import { MessageBox,Toast } from 'mint-ui';
export default {
    data() {
        return {
           url:"",
           code_url:""
        }
    },
    methods: {
            //复制邀请码
        onCopy(e){
            Toast({
                message: '复制成功',
                position: 'bottom',
                duration: 1000
            });
        },
        onError(e){
            Toast({
                message: '复制失败',
                position: 'bottom',
                duration: 1000
            });
        }
    },
    activated() {
        this.url=this.$route.params.url;
        this.code_url=this.$route.params.code_url;
    },
    components: { cTitle }
};