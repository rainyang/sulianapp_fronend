import cTitle from '../../../../components/title'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      list: {}, // 数据对象
    }
  },
  methods: {
    getData() {
      $http.get('plugin.lease-toy.api.retreat.return.return-detail', { order_id: this.$route.params.id }).then(res => {
        if (res.result == 1) {
          this.list = res.data
          console.log('8754545454')
        } else {
          MessageBox.alert(res.msg, '提示')
        }
      })
    }
  },
  activated() {
    this.getData()
  },
  components: { cTitle}
}
