import {Loadmore} from 'mint-ui';
import {Indicator, Toast} from 'mint-ui';
import {MessageBox} from 'mint-ui';
import cTitle from 'components/title';
import BScroll from 'better-scroll';

var specsManage = [];//选择池 用于排序
var optionsId = "";//选择后的 规格ID
var optionsMaxCount = 1;

export default {
  data() {
    return {
      show1: false,
      parentID: 0,
      nowID: 0,  //当前分类ID
      dataList: [],
      goodsList: [], //子分类商品
      goodsInfo: {}, //当前商品信息

      specid: '',  //规格ID
      goodsCount: 0,  //当前商品数量
      showGoods: true,
      showCart: false, //显示购物车
      carts: [], //购物车商品
      cartsTotal: 0.00,
      cartsNum: 0,
      cartIDs: [],  //购物车ID数组
      goodsCarts: [],  //购物车转为goods key的数组
      goodsCartsTotal: [],

      allLoaded: true,//loadmore-all
      goload: true,//loadmore--if
      pageCount: 1,
      loading: false,
    }
  },

  activated() {
    if (this.$route.params.fromDistribution === 1) {
      this.initData();
      this.getData();
    }
    this.getCart();
  },
  created() {
    this.initData();
    this.getData();
  },
  computed: {
    // a computed getter
    minicartStyle: function () {
      if (this.showCart) {
        return 'display: block;transform: translateY(-100%)';
      }
    },
    showLogo: function () {
      if (this.showCart) {
        return 'show';
      }
    },
    leftPrice() {
      if (this.showCart) {
        return 'transform: translateX(-60px);';
      }
    },
  },
  watch: {
    show1(val) {
      if (!val) {
        optionsId = "";
        specsManage = [];
        this.specid = '';
        this.goodsCount = 0;
      }

    }
  },
  methods: {
    //跳转商品详情
    goToGoodsDetail(good) {
      this.$router.push(this.fun.getUrl('goods', {id: good.id}));
    },

    //跳转订单详情
    goodsOrder(val) {
      let sum = 0;

      this.carts.forEach(val => {
        sum += val.total;
      })

      if (sum === 0) {
        return
      }

      if (val.length === 0 || this.carts.length === 0) {
        return
      } else {
        let cartIDs = this.cartIDs.join(",");
        this.$router.push(this.fun.getUrl('DistributionOrderDetail', {cartIDs: cartIDs}, {name: 'delivery'}));
      }
    },

    //添加商品到购物车
    addGood(good) {
      if (good.has_option === 1) {//有规格
        this.show1 = true;
        this.goodsInfo = good;
        this.initPopView();//初始化弹窗view
      } else {//无规格
        //处理参数
        optionsId = "";
        this.addCartRequest(good.id, optionsId, 1);
      }
    },

    //加入购物车网络操作
    addCartRequest(_goodsId, _optionsId, _total) {
      if (optionsMaxCount === 0)//库存不足
      {
        Toast("商品库存不足");
        return;
      }
      if (_total <= 0) {
        Toast("请选择商品数量");
        return;
      }

      let that = this;

      let json = {goods_id: _goodsId, total: _total, option_id: _optionsId};
      $http.get("plugin.kingtimes.frontend.distributorCart.DistributorCart.store", json, "添加中...").then(response => {
        if (response.result === 1) {
          console.log("添加购物车成功");
          that.getCart();
          Toast(response.msg);
        } else {
          Toast(response.msg);
        }
      }).catch(error => {
        console.log(error);
      })

    },

    //通过输入框改变数字修改购物车数量
    inputChange(id, num) {
      if (num <= 0) {
        let total = 0;
        this.carts.forEach(item => {
          if (item.id === id) {
            total = item.total;
          }
        });

        if (total + num <= 0) {
          this.delItemByCart(id);
          return;
        }

        if (num == 0) {
          this.delItemByCart(id);
          return;
        }

      }

      $http.get('plugin.kingtimes.frontend.distributorCart.DistributorCart.updateNumV2', {
        id: id,
        num: num,
      }).then((response) => {
        // console.log('result', response);
        if (response.result === 1) {
          this.getCart();
        } else {
          MessageBox('提示', response.msg);
          this.getCart();
        }
      }, (response) => {

      })
    },

    //修改购物车数量
    updateCart(id, num, good) {
      if (good && good.option_str) {
        Toast({
          message: '多规格商品请从购物车中删除',
          position: 'top',
          duration: 3000
        });
        this.showCart = true;
        return;
      }
      if (num < 0) {
        var total = 0;
        this.carts.forEach(item => {
          if (item.id === id) {
            total = item.total;
          }
        });

        if (total + num <= 0) {
          this.delItemByCart(id);
          return;
        }
      }

      $http.get('plugin.kingtimes.frontend.distributorCart.DistributorCart.updateNum', {
        id: id,
        num: num,
      }).then((response) => {
        // console.log('result', response);
        if (response.result === 1) {
          this.getCart();
        } else {
          MessageBox('提示', response.msg);
        }
      }, (response) => {

      })
    },

    //从购物车中删除单个
    delItemByCart(cart_id) {
      var that = this;

      $http.get('plugin.kingtimes.frontend.distributorCart.DistributorCart.destroy', {
        ids: cart_id
      }).then((response) => {
        if (response.result === 1) {
          that.getCart();
          that.showCart = false;
        } else {
          //alert('无商品');
          MessageBox('提示', response.msg);
        }
      }, (response) => {
        //alert('网络错误，请稍后再试！')
      })
    },

    //清空购物车
    clearCart() {
      var that = this;
      console.log('clearCart...');
      var destroyCarts = [];
      this.carts.forEach(item => {
        destroyCarts.push(item.id);
      });

      $http.get('plugin.kingtimes.frontend.distributorCart.DistributorCart.destroy', {
        ids: destroyCarts
      }).then((response) => {
        if (response.result === 1) {
          that.getCart();
          that.showCart = false;
        } else {
          //alert('无商品');
          MessageBox('提示', response.msg);
        }
      }, (response) => {
        //alert('网络错误，请稍后再试！')
      })
    },

    //在弹窗中增加数量
    addGoods() {

      console.log("增加");
      if (specsManage.length == this.goodsInfo.has_many_specs.length && this.goodsCount == optionsMaxCount) {
        Toast("数量超出范围");
        console.log("max=" + this.goodsCount);
        return;
      }
      this.goodsCount++;

    },

    //在弹窗中减少数量
    reduceGoods() {
      if (this.goodsCount === 1 || this.goodsCount === 0) {
        return;
      }

      this.goodsCount--;
    },

    /**
     * 如果传了商品，通过商品id获取购物车数量
     * @param goods
     */
    getCart(goods) {
      var that = this;
      console.log('getCart...', goods);
      that.cartsNum = 0;
      that.cartsTotal = 0;
      $http.get('plugin.kingtimes.frontend.distributorCart.DistributorCart.index', {}).then((response) => {
        if (response.result === 1) {
          that.carts = response.data;
          that.goodsCarts = [];
          that.cartIDs = [];
          that.carts.forEach(item => {
            that.$set(that.goodsCarts, item.goods_id, item);
            if (goods && (goods.id === item.goods_id)) {
              goods.buyNum = item.total;
            }
            that.cartsNum += item.total;
            that.cartsTotal += (item.total * item.goods.price);
            that.cartIDs.push(item.id);
          });

          that.goodsCartsTotal = that.calculateTotal(that.carts);

          that.cartsTotal = parseFloat(that.cartsTotal).toFixed(2);
          // console.log('cart.result', response.data);
          // console.log('goodsCarts...', that.goodsCarts);

        } else {
          Toast(response.msg);
          //return;
        }
      }, (response) => {
        //alert('网络错误，请稍后再试！')
      })
    },

    //不同规格的同一商品求和
    calculateTotal(arr) {
      let newArr = [];
      let temp = {};
      let newArr2 = [];
      for (let i in arr) {
        let key = arr[i].goods_id;
        if (temp[key]) {
          temp[key].goods_id = temp[key].goods_id;
          temp[key].total = temp[key].total + arr[i].total;
        } else {
          temp[key] = {};
          temp[key].goods_id = arr[i].goods_id;
          temp[key].total = arr[i].total;
        }
      }
      for (let k in temp) {
        newArr.push(temp[k])
      }
      newArr.forEach(item => {
        this.$set(newArr2, item.goods_id, item);
      });
      return newArr2
    },

    //弹窗提交确认
    submitAction() {

      if (specsManage.length < this.goodsInfo.has_many_specs.length) {  //请选择规格
        console.log(this.goodsDescription);
        this.show1 = false;
        Toast(this.goodsDescription);
        return;
      }
      this.show1 = false;
      //处理参数
      this.addCartRequest(this.goodsInfo.id, optionsId, this.goodsCount);
      //确认后清空数值
      optionsId = "";
      specsManage = [];
      this.specid = '';
      this.goodsCount = 0;

    },

    //初始化弹窗view
    initPopView() {

      if (this.goodsInfo.has_option === 1) { //是否有规格
        this.popThumb = this.goodsInfo.thumb;//设置默认图片
        this.popStock = this.goodsInfo.stock;//设置默认库存
        if (!this.specid.length) {
          this.popPrice = this.goodsInfo.min_price + "-" + this.goodsInfo.max_price;//设置默认价格
        }

        this.goodsDescription = "请选择";
        for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
          this.goodsDescription += " " + this.goodsInfo.has_many_specs[i].title;
        }
      } else {
        this.goodsDescription = "";
        optionsMaxCount = this.goodsInfo.stock;//设置最大购买量
      }

    },


    //界面选择规格触发事件
    selectSpecs(data, id) {
      // if (this.specid.length < 1) {
      //   this.specid.push(id);//对其他数据筛选 不筛选同级
      // }

      //处理选择池
      this.manageSpecs(data);

      //处理规格组合选择状态
      this.setGoodsSpecs(data);

      //设置选择规格后的 价格、照片、库存
      this.setGoodsSpecsChangeInfo(id);

      //判断当前购买总量与库存的关系
      this.getMaxCount();

    },

    //判断当前购买总量与库存的关系
    getMaxCount() {
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        // console.log(optionsMaxCount);
        if (optionsMaxCount == 0)//库存不足
        {
          this.goodsCount = 0;
        }
        if (this.goodsCount > optionsMaxCount) {
          this.goodsCount = optionsMaxCount;
        }
      }
    },

    //设置选择规格后的 价格、照片、库存
    setGoodsSpecsChangeInfo(id) {
      //根据ID 排序 specsManage.sort();
      specsManage.sort(function (a, b) {
        return a.id - b.id;
      });
      if (specsManage.length === this.goodsInfo.has_many_specs.length) {
        let goodsSpecs = "";
        for (let j = 0; j < specsManage.length; j++) {
          goodsSpecs += specsManage[j].id + "_";
        }
        goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"
        this.specid = goodsSpecs;
        console.log("goodsSpecs", goodsSpecs);
        for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
          if (goodsSpecs === this.setGoodsSpecsBySort(this.goodsInfo.has_many_options[i].specs)) {
            this.popmPrice = this.goodsInfo.has_many_options[i].market_price;//设置价格
            this.popPrice = this.goodsInfo.has_many_options[i].product_price;//设置价格
            this.popThumb = this.fun.isTextEmpty(this.goodsInfo.has_many_options[i].thumb) ? this.goodsInfo.thumb : this.goodsInfo.has_many_options[i].thumb;//设置图片
            this.popStock = this.goodsInfo.has_many_options[i].stock;//设置库存

            optionsId = this.goodsInfo.has_many_options[i].id;//设置规格ID，用于生成订单
            optionsMaxCount = this.goodsInfo.has_many_options[i].stock;//库存最大数 用于切换更改买家购买数量
            if (optionsMaxCount > 0) {
              this.goodsCount = 1;
            }

            break;
          }
        }
      } else {
        this.specid = id.toString();
      }
    },

    //处理商品goodsSpecs 并排序 新方法
    setGoodsSpecsBySort(specs) {

      let _specs = specs.split("_");//先变成数组
      //_specs.sort();//排序
      _specs.sort(function (a, b) {
        return a - b;
      });

      // 在组装回去
      let goodsSpecs = "";
      for (let j = 0; j < _specs.length; j++) {
        goodsSpecs += _specs[j] + "_";
      }
      goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"

      return goodsSpecs;
    },

    //处理选择池
    manageSpecs(data) {
      var specsObject = new Object();
      specsObject.id = data.id;
      specsObject.specid = data.specid;
      specsObject.title = data.title;

      if (specsManage.length > 0) {
        for (let i = 0; i < specsManage.length; i++) {
          if (specsManage[i].specid == specsObject.specid) {
            specsManage.splice(i, 1);
          }
        }
        specsManage.push(specsObject);
      } else {
        specsManage.push(specsObject);
      }

      //排序
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        var newSpecsManage = [];
        for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
          for (let j = 0; j < specsManage.length; j++) {
            if (this.goodsInfo.has_many_specs[i].id == specsManage[j].specid) {
              newSpecsManage.push(specsManage[j]);
              break;
            }
          }
        }
        specsManage = newSpecsManage;
      }
      this.setGoodsDescription();
    },

    //处理goodsDescription 数据
    setGoodsDescription() {
      var description = "";
      //相等代表全选了 体现语句
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        description = "已选择 ";
        for (let i = 0; i < specsManage.length; i++) {
          description += specsManage[i].title + " ";
        }
        this.goodsDescription = description;
      } else {
        description = "请选择 ";

        for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
          for (let j = 0; j < specsManage.length; j++) {
            if (this.goodsInfo.has_many_specs[i].id != specsManage[j].specid) {
              description += this.goodsInfo.has_many_specs[i].title + " ";
              break;
            }
          }
        }
        this.goodsDescription = description;
      }
    },

    //处理规格组合选择状态 过滤数据
    setGoodsSpecs(specs) {
      for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
        if (specs.specid != this.goodsInfo.has_many_specs[i].id) {
          this.setGoodsSpecsStatus(this.goodsInfo.has_many_specs[i].specitem, specs.id);
        }
      }
    },

    //处理规格组合选择状态 处理状态 specitem 组合数组(未选中的) id当前选中的ID 根据ID 组合算是否有当前组合
    setGoodsSpecsStatus(specitem, id) {
      console.log(specitem);
      console.log(id);
      let options = [];//数据池


      for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
        console.log(this.goodsInfo.has_many_options[i].specs);
        let _specs = this.goodsInfo.has_many_options[i].specs.split("_");
        //console.log(_specs);
        //判断是否包含
        for (let j = 0; j < _specs.length; j++) {
          if (_specs[j] == id) {
            options.push(this.goodsInfo.has_many_options[i]);
          }
        }
      }

      //关键处理方式 后期要优化 效率低
      for (let m = 0; m < options.length; m++) {
        let _specs = options[m].specs.split("_");
        for (let y = 0; y < _specs.length; y++) {
          if (_specs[y] != id && options[m].stock == 0) {
            for (let n = 0; n < specitem.length; n++) {
              if (_specs[y] == specitem[n].id) {
                specitem[n].c = true;
              }
            }
          } else if (_specs[y] != id && options[m].stock > 0) {
            for (let n = 0; n < specitem.length; n++) {
              if (_specs[y] == specitem[n].id) {
                specitem[n].c = false;
              }
            }
          }
        }
      }

      console.log(options);

    },

    _initScrollC() {
      this.classifyScroll = new BScroll(this.$refs.classifyWrapper, {
        click: true
      });
    },
    _initScrollG() {
      this.goodScroll = new BScroll(this.$refs.goodWrapper, {
        click: true,
        probeType: 3
      });
    },
    _initScrollCart() {
      this.cartScroll = new BScroll(this.$refs.cartWrapper, {
        click: true,
        probeType: 3
      });
    },

    //显示购物车
    goShowCart() {
      if (!this.showCart && this.cartsNum > 0) {
        this.showCart = true;
        if (!this.cartScroll) {
          this._initScrollCart();
        } else {
          this.cartScroll.refresh();
        }

      } else {
        this.showCart = false;
      }
    },

    //选择第一分类
    chooseCategory(list) {
      if (list.childrens.length >= 1) {
        this.nowID = list.childrens[0].id;
        this.parentID = list.id;
        this.chooseChildCategory(this.nowID, this.parentID);
      } else {
        this.parentID = list.id;
        this.chooseChildCategory(0, this.parentID);
      }

    },

    //选择第二分类
    chooseChildCategory(id, parentID) {
      const that = this;
      this.goodsList = [];
      this.nowID = id;
      this.parentID = parentID;
      if (!id) {
        id = parentID;
      }
      $http.get('plugin.kingtimes.frontend.goods.goods.fast-list', {category_id: id}, "加载中...").then(function (response) {
        if (response.result === 1) {
          that.goodsList = response.data;
          that.$nextTick(() => {
            that.classifyScroll.refresh();

            if (!that.goodScroll) { //判断是否已经初始化
              that._initScrollG();
              // 计算最大向上滚动距离
            } else {
              that.goodScroll.refresh();
            }

          });
        } else {
          // Toast(response.msg);
          that.$nextTick(() => {
            that.classifyScroll.refresh();
          });
        }
      }, function (response) {
        console.log(response)
      });
    },

    //获取分类
    getData() {
      const that = this;
      $http.get('goods.category.fastCategory', {}, "加载中...").then(function (response) {
        if (response.result === 1) {
          that.dataList = response.data.list;
          that.chooseCategory(that.dataList[0]);
          that.$nextTick(() => {
            if (!that.classifyScroll) {
              that._initScrollC();
            } else {
              that.classifyScroll.refresh();
              // that.classifyScroll.maxScrollY = (that.$refs.classifyWrapper.offsetHeight / 1.4) - that.classifyScroll.scrollerHeight;
            }
          });
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        console.log(response)
      });
    },

    //初始化商品详情参数
    initData() {

      this.cartsNum = 0;

      this.carts = [];

      this.cartsTotal = 0.00;

      this.goodsCarts = [];

      this.specid = '';  //规格ID
      this.goodsCount = 0;

      specsManage = [];//选择池 用于排序
      optionsId = "";//选择后的 规格ID
      optionsMaxCount = 1;
    },
  },
  components: {cTitle}
}
