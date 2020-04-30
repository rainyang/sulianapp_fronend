import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import cCalendar from "components/calendar";

export default {
  data() {
    return {
      activeNames: [],
      value: 3,
      calendarEvents: [],
      result: "",
      today: '',
      timeList: [],
      showCalendar: true,
    };
  },
  activated() {
    this.showCalendar = false;
    this.getTime();
    this.today = new Date().getFullYear()+"-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
  },
  methods: {
    selectedDay(e) {
      let date = "";
      if(e.length>=3){
        date = e[0]+'-'+e[1]+'-'+e[2];
      }
      this.getAppointment(date);
    },
    monthChanged(e) {  //移动月份
      // console.log(e);
    },
    getTime() {
      $http
        .get(
          "plugin.appointment.frontend.work-time.get-period-list",
          {
            worker_id: this.$route.params.worker_id
          },
          "获取中"
        )
        .then(response => {
          this.showCalendar = true;
          if (response.result === 1) {
            this.calendarEvents = response.data.map(item => {
              if(item.work_status == 1){
                return item.work_date_format + '-休';
              }else{
                return item.work_date_format;
              }
            });
            this.getAppointment(this.today);
          } else {
            MessageBox.alert(response.msg);
          }
        })
        .catch(err => {
          this.showCalendar = true;
          console.log(err);
        });
    },
    getAppointment(date) {
      $http
        .get(
          "plugin.appointment.frontend.work-time.get-order-service-time-list",
          {
            worker_id: this.$route.params.worker_id,
            work_date: date
          },
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            this.timeList = response.data;
          } else {
            MessageBox.alert(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: { cTitle, cCalendar }
};
