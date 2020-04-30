import cTitle from "components/title";
import { Toast, MessageBox } from "mint-ui";
import cCalendar from "components/calendar";

export default {
  data() {
    return {
      showProjects: false,
      show1: false,
      id: 0,
      project_id: 0,
      project: {},
      store: [],
      AStore: {},
      chooseTechnician: {
        name: ""
      },
      activeNames: [],
      times: [],
      calendarEvents: [],
      technician: [],
      result: "",
      isRest: false,
      work_date: "",
      start_time: "",
      applyModel: {
        order_id: "",
        store_id: "",
        worker_id: "",
        customer_name: "",
        customer_tel: "",
        begin_time: ""
      },
      point: {},
    };
  },
  activated() {
    this.id = this.$route.params.id;
    this.project_id = this.$route.query.project_id;
    this.init();
    this.getData();
    this.today = new Date().getFullYear() + "-" + (new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1)) + "-" + (new Date().getDate() >= 10 ? new Date().getDate() : "0" + new Date().getDate());
    this.work_date = this.today;
  },
  methods: {
    init() {
      this.show1 = false;
      this.start_time = "";
      this.AStore = {};
      this.times = [];
      this.calendarEvents = [];
      this.technician = [];
      this.result = "";
      this.chooseTechnician = { name: "" };
      this.applyModel = {
        order_id: "",
        store_id: "",
        worker_id: "",
        customer_name: "",
        customer_tel: "",
        begin_time: ""
      };
    },
    Sure() {
      this.showProjects = false;
    },
    clickTechnician(item) {
      this.chooseTechnician = item;
      console.log(this.chooseTechnician, "this.chooseTechnician");
    },
    toTime() {
      if (!this.applyModel.store_id) {
        Toast("请先选择门店");
        return;
      }
      this.activeNames = [];
      this.getDate();
      this.getTime();
    },
    chooseStore(item) {
      this.AStore = item;
      this.applyModel.store_id = this.AStore.id;
      this.show1 = false;
      this.start_time = "";
      this.chooseTechnician.name = "";
    },
    getData() {
      $http
        .get(
          "plugin.appointment.frontend.appointment-order.detail",
          { project_id: this.id },
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            this.project = response.data.project;
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStore() {
      if (!this.point.lng) {
        this.ready();
        return;
      }
      $http
        .get(
          "plugin.appointment.frontend.store.get-list-by-project-id",
          { lng: this.point.lng, lat: this.point.lat, project_id: this.project_id },
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            this.store = response.data;
            this.show1 = true;
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    makeAppointment() {
      if (!this.start_time) {
        Toast("请选择时间");
        return;
      }
      if (!this.start_time) {
        Toast("请填写电话");
        return;
      }
      if (!this.chooseTechnician.name) {
        Toast("请选择技师");
        return;
      }
      if (!this.applyModel.customer_name) {
        Toast("请填写姓名");
        return;
      }
      if (!this.applyModel.customer_tel) {
        Toast("请填写电话");
        return;
      }
      this.applyModel.order_id = this.id;
      this.applyModel.worker_id = this.chooseTechnician.id;
      this.applyModel.begin_time = this.work_date + " " + this.start_time;
      $http
        .post(
          "plugin.appointment.frontend.appointment-service.create-service",
          this.applyModel,
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            MessageBox.alert(response.msg).then(() => {
                this.$router.go(-1);
              }
            );
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });

    },

    selectedDay(e) {
      let date = "";
      if (e.length >= 3) {
        date = e[0] + "-" + e[1] + "-" + e[2];
      }
      if (e.length >= 4 && e[3].eventName) {
        this.isRest = false;
      } else {
        this.isRest = true;
      }
      this.work_date = date;
      this.start_time = "";
    },
    selectedTime(time) {
      this.start_time = time;
      this.getTechnician();
    },
    monthChanged(e) {
      // console.log(e);
    },
    getDate() {
      let that = this;
      $http
        .get(
          "plugin.appointment.frontend.work-time.get-work-dates",
          { store_id: this.applyModel.store_id },
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            this.showProjects = true;
            this.calendarEvents = response.data.map(item => {
              if (item.work_date_format == that.today) {
                item.work_sattus == 1 ? that.isRest = true : that.isRest = false;
              }
              if (item.work_status == 1) {
                return item.work_date_format + "-休";
              } else {
                return item.work_date_format;
              }
            });
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTime() {
      $http
        .get(
          "plugin.appointment.frontend.work-time.get-start-times",
          { store_id: this.applyModel.store_id },
          "获取中"
        )
        .then(response => {
          if (response.result === 1) {
            this.times = response.data;
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTechnician() {
      $http
        .get(
          "plugin.appointment.frontend.worker.get-appointment-workers",
          {
            store_id: this.applyModel.store_id,
            project_id: this.project_id,
            work_date: this.work_date,
            start_time: this.start_time
          },
          "获取中"
        )
        .then(response => {
          this.activeNames = [];
          if (response.result === 1) {
            this.technician = response.data;
          } else {
            Toast(response.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    ready() {
      let myLocation = this.$store.state.o2oLocation;

      if (myLocation.point) {
        this.address = myLocation.title;
        this.city = myLocation.city;
        this.point = myLocation.point;
        //初始化数据
        this.getStore();
      } else {
        console.log("location不存在");
        this.getLocation();
      }
    },
    getLocation() {
      var that = this;
      var mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, "error", onError); // 返回定位出错信息
      });

      function onComplete(obj) {
        var res =
          "经纬度：" +
          obj.position +
          "\n精度范围：" +
          obj.accuracy +
          "米\n定位结果的来源：" +
          obj.location_type +
          "\n状态信息：" +
          obj.info +
          "\n地址：" +
          obj.formattedAddress +
          "\n地址信息：" +
          JSON.stringify(obj.addressComponent, null, 4);
        //alert(res);
        //alert(JSON.stringify(obj.addressComponent, null, 4));
        var position = obj.position.toString().split(",");
        that.point = {
          lat: position[1],
          lng: position[0]
        };
        that.address = obj.formattedAddress;
        that.title = obj.formattedAddress;
        that.city = !that.fun.isTextEmpty(obj.addressComponent.city)
          ? obj.addressComponent.city
          : obj.addressComponent.province;

        var pos = {
          address: obj.formattedAddress,
          city: that.city,
          title: obj.formattedAddress,
          point: that.point
        };
        console.log("test pos", pos);
        that.$store.commit("updateLocation", pos);
        that.$store.commit("setLocation", pos);
        window.localStorage.setItem("myLocation", JSON.stringify(pos));
        that.getStore();
      }

      function onError(obj) {
        console.log(obj);
        Toast("定位失败");
      }
    }
  },
  components: { cTitle, cCalendar }
};
