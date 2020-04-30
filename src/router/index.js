/**
 * @file
 * Created by liang into on 19/10/30.
 */

import BlockChain from "./blockchain";
const conferenceList = r =>
  require.ensure(
    [],
    () => r(require("@/views/conference/home")),
    "conferenceList"
  );
const activity = r => require(["../views/conference/activity"], r);
const MyActivityInfo = r =>
  require(["../views/conference/my_activity_info"], r);
const conferenceSign = r => require(["../views/conference/conferenceSign"], r);
const ActivityTaskList = r =>
  require(["../views/conference/activity_task_list"], r);

const userAgreement = r => require(["../views/member/user_agreement"], r);

const o2oHome = r => require(["../views/o2o/home"], r);
const o2oStore = r => require(["../views/o2o/store/store"], r);
const o2oStore_v2 = r => require(["../views/o2o/store/store_v2"], r);
const o2oLocation = r => require(["../views/o2o/location/home"], r);
const o2oLocation_loc = r => require(["../views/o2o/location/location"], r);
const o2oCity = r => require(["../views/o2o/location/city"], r);
const o2oSearch = r => require(["../views/o2o/search"], r);
const o2oCategory = r => require(["../views/o2o/category"], r);
const StoreApply = r => require(["../views/o2o/store/store_apply"], r);
const StoreWithdrawals = r => require(["../views/o2o/store/withdrawals"], r);
const StoreManage = r => require(["../views/o2o/store_manage"], r);
const StoreSearch = r => require(["../views/o2o/store/store_search"], r);
const qrCode = r => require(["../views/o2o/qr_code"], r);
// const privacy = r => require(["../views/o2o/privacy"], r);
const cloudHorn = r => require(["../views/o2o/cloud_horn"], r);
const zkzDevice = r => require(["../views/o2o/zkzDevice"], r);

const Home = r => require(["../views/home/home"], r);
const Category = r => require(["../views/category/category"], r);
const Catelist = r => require(["../views/category/catelist"], r);
const Brand = r => require(["../views/category/brand"], r);
const BrandGoods = r => require(["../views/category/brandgoods"], r);
const Temp = r => require(["../views/commission"], r);
const Cart = r => require(["../views/cart/cart"], r);
const Settlement = r => require(["../views/cart/settlement"], r);
const Hello = r => require(["../views/hello"], r);
const Diy = r => require(["../views/diy"], r);
const Share = r => require(["../views/home/share"], r);
const CloseSite = r => require(["../views/close_site"], r);
const DiyForm = r => require(["../views/diy_form"], r);
// 收银台
const cashier = r => require(["../views/cashier/cashier"], r);
const cashier_pay = r => require(["../views/cashier/pay"], r);
const cashier_qr = r => require(["../views/cashier/qrcode"], r);
const cashier_withdrawals = r => require(["../views/cashier/withdrawals"], r);
const cashier_stat = r => require(["../views/cashier/stat"], r);
const show_balances = r => require(["../views/cashier/showBalances"], r);
// article
const Notice = r => require(["../views/article/notice"], r);
const ArticleContent = r => require(["../views/article/articleContent"], r);
const NoticeByCategory = r =>
  require(["../views/article/notice_by_category"], r);
const NoticeReport = r => require(["../views/article/notice_report"], r);
const payList = r => require(["../views/article/pay_list"], r);
const payEssay = r => require(["../views/article/pay_essay"], r);
// Member
const MemberBank = r => require(["../views/member/bank/bank_info"], r);
const BankCard = r => require(["../views/member/bank/bankCard"], r);
const Member = r => require(["../views/member/member"], r);
// const Po = r => require(['../views/member/po'], r)
// const Tabs = r => require(['../views/member/tabs'], r)
const Info = r => require(["../views/member/info/info_v2"], r);
const Editmobile = r =>
  require(["../views/member/info/member_editmobile_v2"], r);
const WithdrawEditmobile = r =>
  require(["../views/member/info/member_withdraw_editmobile"], r);
const scanEditmobile = r =>
  require(["../views/member/info/scan_editmobile"], r);
const codePage = r => require(["../views/member/tool/code_page"], r);
// //visit
// const Visit = r => require(['../views/member/visit/Visit'], r)

// const AlterAddress = r => require(['../views/member/address/alterAddress'], r)
const AlterAddress = r =>
  require(["../views/member/address/alterAddress_v2"], r);
// const AppendAddress = r => require(['../views/member/address/appendAddress'], r)
const AppendAddress = r =>
  require(["../views/member/address/appendAddress_v2"], r);
const Balance = r => require(["../views/member/balance/member_balance"], r);
const Integral = r => require(["../views/member/integral/member_integral"], r);
const IntegralV2 = r =>
  require(["../views/member/integral_v2/member_integral_v2"], r);
const IntegralV2Transfer = r =>
  require(["../views/member/integral_v2/member_integral_v2_transfer"], r);
const InfoCostom = r => require(["../views/member/info/info_custom"], r);
const BalancePassword = r =>
  require(["../views/member/info/balance_password_v2"], r);
const SetBalancePassword = r =>
  require(["../views/member/info/set_balance_password_v2"], r);

// score
const IntegralActivity = r =>
  require(["../views/member/score/integral_activity"], r);
const IntegralGeneralization = r =>
  require(["../views/member/score/integral_generalization"], r);
const IntegralGetRecord = r =>
  require(["../views/member/score/integral_get_record"], r);
const IntegralPresent = r =>
  require(["../views/member/score/integral_present"], r);
const IntegralRecord = r =>
  require(["../views/member/score/integral_record"], r);

// sign
const Sign = r => require(["../views/member/sign/member_sign"], r);
const Signrules = r => require(["../views/member/sign/member_signrules"], r);
const Signrecord = r => require(["../views/member/sign/member_signrecord"], r);

// member_integraldetailed
const Integraldetail = r =>
  require(["../views/member/integral/member_integraldetailed"], r);
const IntegralList = r =>
  require(["../views/member/integral/member_integrallist"], r);
const Balance_recharge = r =>
  require(["../views/member/balance/member_balance_recharge"], r);
const Balance_transfer = r =>
  require(["../views/member/balance/member_balance_transfer"], r);
const Balance_withdrawals = r =>
  require(["../views/member/balance/member_balance_withdrawals"], r);
// 保单管理
const Balance_manage = r =>
  require(["../views/member/balance/member_balance_manage"], r);
// 保单管理的详情
const Balance_manageDetail = r =>
  require(["../views/member/balance/member_balance_manageDetail"], r);
// 保单添加
const Add_Balance_manage = r =>
  require(["../views/member/balance/add_member_balance"], r);
// 编辑保单
const Edit_Balance_manage = r =>
  require(["../views/member/balance/edit_member_balance"], r);
const Detailed = r =>
  require(["../views/member/balance/member_balance_detailed"], r);
// 保单支付
const policyPay = r =>
  require(["../views/member/balance/policy_pay"], r);
const Screen = r =>
  require(["../views/member/balance/member_balance_screen"], r);
const Details = r =>
  require(["../views/member/balance/member_balance_details"], r);
// const Income = r => require(['../views/member/income/member_income'], r)
const Withdrawal = r =>
  require(["../views/member/income/member_income_withdrawal"], r);
const Incomedetails = r =>
  require(["../views/member/income/member_income_incomedetails"], r);
const IncomedetailsInfo = r =>
  require(["../views/member/income/member_income_incomedetails_info"], r);
const PresentationRecord = r =>
  require(["../views/member/income/member_income_presentationRecord"], r);
const PresentationDetails = r =>
  require([
    "../views/member/income/member_income_presentationRecord_presentationDetails"
  ], r);
const Supplier = r => require(["../views/member/supplier/supplier"], r);
const CreditInfo = r => require(["../views/member/credit/credit_info"], r);
const CommodityManagement = r =>
  require(["../views/member/supplier/commodity_management/management"], r);
const CommodityEditor = r =>
  require(["../views/member/supplier/commodity_management/editor"], r);
const CommodityRelease = r =>
  require(["../views/member/supplier/commodity_management/release"], r);

const CommodityCoupon = r =>
  require(["../views/member/supplier/commodity_coupon/management"], r);
const CommodityCouponEdit = r =>
  require(["../views/member/supplier/commodity_coupon/edit"], r);
const CommodityCouponGive = r =>
  require(["../views/member/supplier/commodity_coupon/give_out"], r);

const GoodsClassify = r =>
  require(["../views/member/supplier/classify/goods_classify"], r);
const AddClassify = r =>
  require(["../views/member/supplier/classify/add_classify"], r);
const FirstEdit = r =>
  require(["../views/member/supplier/classify/first_edit"], r);

const Income = r => require(["../views/member/income/member_income_v2"], r);

const Message = r => require(["../views/member/message_list"], r);
const MessageInfo = r => require(["../views/member/message_info"], r);

// order
// order_after_express_info
const OrderExpress = r =>
  require(["../views/member/order/order_after_express_info"], r);
const OrderList = r => require(["../views/member/order/order_list"], r);
const Goodsinfo = r => require(["../views/member/order/order_detail"], r);
const Refund = r => require(["../views/member/order/order_list_refund"], r);
const Logistics = r =>
  require(["../views/member/order/order_list_logistics"], r);
const track = r => require(["../views/member/order/order_list_track"], r);
const Evaluate = r => require(["../views/comment/evaluate"], r);
const ReplyEvaluate = r =>
  require(["../views/member/order/order_list_replyEvaluate"], r);
const Addevaluate = r => require(["../views/comment/addevaluate"], r);
const Aftersales = r => require(["../views/member/order/order_aftersales"], r);
const Aftersaleslist = r =>
  require(["../views/member/order/order_aftersaleslist"], r);
const OrderPay = r => require(["../views/member/order/order_payment"], r);
const OrderVerification = r =>
  require(["../views/member/order/order_verification"], r);
const OrderCash = r => require(["../views/member/order/order_cash"], r);
const OrderRecord = r => require(["../views/member/order/order_record"], r);

const PayErr = r => require(["../views/member/order/order_payErr"], r);
const PayYes = r => require(["../views/member/order/order_payYes"], r);
const Blacklist = r => require(["../views/member/order/order_blacklist"], r);
const Mandate = r => require(["../views/member/order/order_mandate"], r);

// Extension
const Manage = r => require(["../views/extension/manage"], r);
const Extension = r =>
  require.ensure([], () => r(require("@/views/extension/index")), "Extension");
const Distribution = r => require(["../views/extension/distribution"], r);
const Commission = r => require(["../views/extension/commission"], r);
const CommissionDetails = r =>
  require(["../views/extension/commissionDetails"], r);
const Unsettled = r => require(["../views/extension/unsettled"], r);
const UnsettledDetails = r =>
  require(["../views/extension/unsettledDetails"], r);
const AlreadySettled = r => require(["../views/extension/alreadySettled"], r);
const AlreadySettledDetails = r =>
  require(["../views/extension/alreadySettledDetails"], r);
const NotPresent = r => require(["../views/extension/notPresent"], r);
const NotPresentDetails = r =>
  require(["../views/extension/notPresentDetails"], r);
const Present = r => require(["../views/extension/present"], r);
const PresentDetails = r => require(["../views/extension/presentDetails"], r);
const DistributionOrder = r =>
  require(["../views/extension/distributionOrder"], r);

const AwardRanking = r =>
  require(["../views/extension/spread/awardRanking"], r);
const ExtensionPage = r => require(["../views/extension/spread/extension"], r);
const RecordOfAwards = r =>
  require(["../views/extension/spread/recordOfAwards"], r);
const MyIncome = r => require(["../views/extension/spread/my_income"], r);
const myEarnings = r => require(["../views/extension/spread/my_earnings"], r);
const earningList = r => require(["../views/extension/spread/earning_list"], r);

const point_activity_award_center = r =>
  require(["../views/extension/pointActivityAwardCenter"], r);
//区域选择
const Selectionarea = r =>
  require(["../views/regionalmanage/selectionarea"], r);
//区域分红
const Regionaldividend = r =>
  require(["../views/regionalmanage/regionaldividend"], r);
//区域分红详情
const Detailsdividends = r =>
  require(["../views/regionalmanage/detailsdividends"], r);
// plug
// const Marketing = r => require(['../views/member/plug/marketing'], r)
// const MessageSettings = r => require(['../views/member/plug/messageSettings'], r)
// income
const DistributionCommission = r =>
  require(["../views/member/income/distributionCommission"], r);
const ExtendIncome = r => require(["../views/member/income/extendIncome"], r); // new
const MerchantsDividendRatio = r =>
  require(["../views/member/income/merchants/merchants_dividend_ratio"], r);
const ShareholderCenter = r =>
  require(["../views/member/income/shareholderCenter/shareholderCenter"], r);
const TeamAgentCenter = r =>
  require(["../views/member/income/teamAgentCenter/teamAgentCenter"], r);
const TeamPerformance = r =>
  require(["../views/member/income/teamAgentCenter/teamPerformance"], r);
const TeamCode = r =>
  require(["../views/member/income/teamAgentCenter/teamCode"], r);
const TeamClient = r =>
  require(["../views/member/income/teamAgentCenter/teamClient"], r);
const CodeHistory = r =>
  require(["../views/member/income/teamAgentCenter/codeHistory"], r);
const InvestmentCenter = r =>
  require(["../views/member/income/investmentCenter/investmentCenter"], r);
const RegionalAgencyCenter = r =>
  require([
    "../views/member/income/regionalAgencyCenter/regionalAgencyCenter"
  ], r);
const ApplyRegionalAgency = r =>
  require([
    "../views/member/income/regionalAgencyCenter/applyRegionalAgency"
  ], r);
const FixedReward = r =>
  require(["../views/member/income/fixedReward/fixed_reward"], r);
const CourseIncome = r => require(["../views/member/income/course/index"], r);
const Helpcenter = r => require(["../views/member/helpcenter"], r);

// 经销商红包奖励
const FranchiserRed = r =>
  require(["../views/member/income/teamAgentCenter/franchiser_red"], r);

const RedReward = r => require(["../views/member/income/red_reward"], r);

//每日红包
const DailyRed = r => require(["../views/others/daily_red/daily_red"], r);
const GetRedRecord = r =>
  require(["../views/others/daily_red/get_red_record"], r);
const RedAmount = r => require(["../views/others/daily_red/red_amount"], r);

// microshop
const MicroShop_apply = r =>
  require(["../views/member/microshop/microShop_apply.vue"], r);
const MicroShop_apply_reg_info = r =>
  require(["../views/member/microshop/microShop_apply_reg_info.vue"], r);
const MicroShop_baseInfo = r =>
  require(["../views/member/microshop/baseInfo.vue"], r);
const MicroShop_Category = r =>
  require(["../views/member/microshop/category/category.vue"], r);
const Catelist1 = r =>
  require(["../views/member/microshop/category/catelist.vue"], r);
const MicroShop_home = r => require(["../views/member/microshop/home/home"], r);
const MicroShop_ShopKeeperCenter = r =>
  require(["../views/member/microshop/shopKeeperCenter"], r);
const MicroShop_orderDetail = r =>
  require(["../views/member/microshop/orderDetail"], r);
const MicroShop_shareList = r =>
  require(["../views/member/microshop/shareList.vue"], r);
const MicroShop_shareDetail = r =>
  require(["../views/member/microshop/shareDetail"], r);
const MicroShop_selectedGoods = r =>
  require(["../views/member/microshop/selectedGoods"], r);
// microshop 分享出去的模块
const MicroShop_Share_home = r =>
  require(["../views/member/microshop/microshophome/micros_shop_home"], r);
const MicroShop_ShareCategory = r =>
  require(["../views/member/microshop/categoryshare/category"], r);
// 添加商品的分类
const ManageShop = r => require(["../views/member/microshop/manage_shop"], r);
const MicroShop_AddCategory = r =>
  require(["../views/member/microshop/category_add/category"], r);
const CatelistShare = r =>
  require(["../views/member/microshop/categoryshare/catelist.vue"], r);

// love 爱心值
const Love_index = r => require(["../views/love/love_index"], r);
const Love_list = r => require(["../views/love/love_list"], r);
const Love_transfer = r => require(["../views/love/love_transfer"], r);
const Love_trading_sell = r => require(["../views/love/love_trading_sell"], r);
const Love_trading = r => require(["../views/love/love_trading"], r);
const Love_changein = r => require(["../views/love/love_changein"], r);
const Love_changeto = r => require(["../views/love/love_changeto"], r);
const Love_give = r => require(["../views/love/love_give"], r);
const Love_agent = r => require(["../views/love/love_agent"], r);
const Love_push = r => require(["../views/love/love_push"], r);
const Love_cash = r => require(["../views/love/love_cash"], r);
const Love_record = r => require(["../views/love/love_record"], r);
const Love_details = r => require(["../views/love/love_details"], r);
const Love_activation = r => require(["../views/love/love_activation"], r);
const Love_explain = r => require(["../views/love/love_explain"], r);
const LoveWithdrawals = r => require(["../views/love/love_withdrawals"], r);
const lovePeriod = r => require(["../views/love/love_period/love_period"], r);
const lovePerformance = r =>
  require(["../views/love/love_performance/love_performance"], r);

// 消费积分-爱心值
const Integral_love = r =>
  require(["../views/love/integral_love/integral_love"], r);
const Integral_invest = r =>
  require(["../views/love/integral_love/Integral_love_invest"], r);
const Integral_love_detail = r =>
  require(["../views/love/integral_love/Integral_love_detail"], r);
const Integral_love_transfer = r =>
  require(["../views/love/integral_love/Integral_love_transfer"], r);
const Integral_love_cash = r =>
  require(["../views/love/integral_love/Integral_love_cash"], r);

// 华侨币 overseas
const Overseas_index = r => require(["../views/overseas/overseas_index"], r);
const Overseas_explain = r =>
  require(["../views/overseas/overseas_explain"], r);
const Overseas_transfer = r =>
  require(["../views/overseas/overseas_transfer"], r);
const Overseas_record = r => require(["../views/overseas/overseas_record"], r);
const Overseas_list = r => require(["../views/overseas/overseas_list"], r);
const Overseas_balance_withdrawals = r =>
  require(["../views/overseas/overseas_balance_withdrawals"], r);

// tool
const Footprint = r => require(["../views/member/tool/footprint"], r);
const Collection = r => require(["../views/member/tool/collection"], r);
const MyRelationship = r =>
  require(["../views/member/tool/my_relationship_v2"], r);
const OfflineSearch = r => require(["../views/member/tool/search"], r);
const MyEvaluation = r => require(["../views/comment/myEvaluation"], r);
const Comment = r => require(["../views/member/tool/comment"], r);
const EvaluationDetails = r =>
  require(["../views/member/tool/evaluationDetails"], r);
// 我的朋友
const MyFriendApply = r => require(["../views/member/tool/my_friends"], r);

// 兑换中心
const CouponExchange = r =>
  require(["../views/member/coupon_exchange/index"], r);

// Other
const Address = r => require(["../views/member/address/addresslist_v2"], r);
const Search = r => require(["../views/search"], r);
const SearchAll = r => require(["../views/searchall"], r);
// const Goods = r => require(['../views/goods/goods'], r)
const Goods = r => require(["../views/goods/goods_v2"], r);
const GoodsComment = r =>
  require(["../components/goods/children/commentList"], r);
const PackageGoods = r => require(["../views/goods/package_goods"], r);

const GoodsO2O = r => require(["../views/goods/goods_v2"], r);
const GoodsOrder = r => require(["../views/goods/goods_order"], r);
const GoodsOrderDiyForm = r => require(["../views/goods/diyFormPage"], r);
const Goodstabs = r => require(["../views/goods/goodstabs"], r);
const Login = r =>
  require.ensure([], () => r(require("@/views/login/login.vue")), "Login");
const Register = r => require(["../views/register/register_v2"], r);
const haifenRegister = r => require(["../views/register/haifen_register"], r);
const RegisterAgreement = r =>
  require(["../views/register/register_agreement"], r);
const Findpwd = r => require(["../views/register/findpwd"], r);
const RegisterGuide = r => require(["../views/register/guide"], r);

const NotFound = r => require(["../views/notfound"], r);
// alipay_detail.vue
const Alipay = r => require(["../views/member/pay/alipay_detail"], r);
const AlipayClockin = r => require(["../views/member/pay/alipay_detail"], r);

// Coupon
const Coupon = r => require(["../views/coupon/coupon_index"], r);
const CouponStore = r => require(["../views/coupon/coupon_store"], r);
const CouponInfo = r => require(["../views/coupon/coupon_info"], r);

// Coupon-share
const CouponShare = r => require(["../views/coupon/coupon_share"], r);
const getCoupon = r => require(["../views/coupon/get_coupon"], r);

// comment
const CommentDetails = r => require(["../views/comment/CommentDetails"], r);
const ReCommentDetails = r => require(["../views/comment/ReCommentDetails"], r);
const OtherCommentDetails = r =>
  require(["../views/comment/OtherCommentDetails"], r);

// service
const Service = r => require(["../views/member/service/service"], r);
const ServiceOrderList = r =>
  require(["../views/member/service/order/order_list"], r);
// phone
const PhoneRecharge = r =>
  require(["../views/member/service/phone/phoneRecharge"], r);
const MobileBinding = r =>
  require(["../views/member/service/phone/mobileBinding"], r);
const RechargePay = r =>
  require(["../views/member/service/phone/rechargePay"], r);
const OrderDetailsPaied = r =>
  require(["../views/member/service/phone/orderDetailsPaied"], r);
const OrderDetailsNoPay = r =>
  require(["../views/member/service/phone/orderDetailsNoPay"], r);
const RechargeRecord = r =>
  require(["../views/member/service/phone/rechargeRecord"], r);
const FlowRechargeRecord = r =>
  require(["../views/member/service/phone/flowRechargeRecord"], r);
const RechargeDetail = r =>
  require(["../views/member/service/phone/rechargeDetail"], r);
const FlowRechargeDetail = r =>
  require(["../views/member/service/phone/flowRechargeDetail"], r);
// oilCard
const AddCard = r => require(["../views/member/service/oilCard/addCard"], r);
const CardServer = r =>
  require(["../views/member/service/oilCard/cardServer"], r);
const OilNoPay = r => require(["../views/member/service/oilCard/oilNoPay"], r);
const OilDetailsPaied = r =>
  require(["../views/member/service/oilCard/oilDetailsPaied"], r);
const OilRecharge = r =>
  require(["../views/member/service/oilCard/oilRecharge"], r);
const OilRechargePay = r =>
  require(["../views/member/service/oilCard/oilRecharge_pay"], r);
// ticket 机票
const Ticket = r => require(["../views/member/service/ticket/index"], r);
const City = r => require(["../views/member/service/ticket/city"], r);
const TicketOrder = r =>
  require(["../views/member/service/ticket/ticketOrder"], r);
const SearchResults = r =>
  require(["../views/member/service/ticket/searchResults"], r);
const FlightPrice = r =>
  require(["../views/member/service/ticket/flightPrice"], r);
const NewAddPassenger = r =>
  require(["../views/member/service/ticket/newAddPassenger"], r);
const ModifyContacts = r =>
  require(["../views/member/service/ticket/modifyContacts"], r);

const AddOrder = r => require(["../views/member/service/ticket/addOrder"], r);
const RefundApplication = r =>
  require(["../views/member/service/ticket/refundApplication"], r);
const TicketOrderDetail = r =>
  require(["../views/member/service/ticket/ticketOrderDetail"], r);
const ChangeAgreement = r =>
  require(["../views/member/service/ticket/changeAgreement"], r);
const Ticket_pay = r =>
  require(["../views/member/service/ticket/ticket_pay"], r);

// Game
const GameSearch = r => require(["../views/member/service/game/gameSearch"], r);
const GameIsPay = r => require(["../views/member/service/game/gameIsPay"], r);
const GameNoPay = r => require(["../views/member/service/game/gameNoPay"], r);
const GameFlingRecharge = r =>
  require(["../views/member/service/game/gameFlingRecharge"], r);
const GamePasswordRecharge = r =>
  require(["../views/member/service/game/gamePasswordRecharge"], r);

// newService
const LifeService = r => require(["../views/member/service/lifeService"], r);
const Telephone = r =>
  require(["../views/member/service/telephone/telephone"], r);
const Flow = r => require(["../views/member/service/flow/flow"], r);
// lifePayment
const Electricity = r =>
  require(["../views/member/service/lifePayment/electricity"], r);
const ElectricityPay = r =>
  require(["../views/member/service/lifePayment/electricity_pay"], r);
const WaterFee = r =>
  require(["../views/member/service/lifePayment/waterFee"], r);
const WaterFeePay = r =>
  require(["../views/member/service/lifePayment/waterFee_pay"], r);
const FixedTelephone = r =>
  require(["../views/member/service/lifePayment/fixedTelephone"], r);
const FixedTelephonePay = r =>
  require(["../views/member/service/lifePayment/fixedTelephone_pay"], r);

const Broadband = r =>
  require(["../views/member/service/lifePayment/broadband"], r);
const BroadbandPay = r =>
  require(["../views/member/service/lifePayment/broadband_pay"], r);
const GasCosts = r =>
  require(["../views/member/service/lifePayment/gasCosts"], r);

const LifePayNoPay = r =>
  require(["../views/member/service/lifePayment/lifePayNoPay"], r);
const LifePayIsPaied = r =>
  require(["../views/member/service/lifePayment/lifePayIsPaied"], r);
const LifePayIndex = r =>
  require(["../views/member/service/lifePayment/lifePayIndex"], r);
const PaymentRecord = r =>
  require(["../views/member/service/lifePayment/paymentRecord"], r);

// 交通罚款
const TrafficIndex = r =>
  require(["../views/member/service/trafficFine/trafficIndex"], r);
const TrafficConfirmOrder = r =>
  require(["../views/member/service/trafficFine/trafficConfirmOrder"], r);
const TrafficCity = r =>
  require(["../views/member/service/trafficFine/trafficCity"], r);
const TrafficRecord = r =>
  require(["../views/member/service/trafficFine/trafficRecord"], r);
const TrafficOrderNoPay = r =>
  require(["../views/member/service/trafficFine/trafficOrderNoPay"], r);
const TrafficOrderlsPaied = r =>
  require(["../views/member/service/trafficFine/trafficOrderlsPaied"], r);
// 火车票
const TrainTicket = r =>
  require(["../views/member/service/trainTicket/trainTicket"], r);
const TrainTicketOrder = r =>
  require(["../views/member/service/trainTicket/trainTicketOrder"], r);
const TrainCity = r =>
  require(["../views/member/service/trainTicket/trainCity"], r);
const TrainSearchResults = r =>
  require(["../views/member/service/trainTicket/trainSearchResults"], r);
const TrainFlightPrice = r =>
  require(["../views/member/service/trainTicket/trainFlightPrice"], r);
const TrainAddOrder = r =>
  require(["../views/member/service/trainTicket/trainAddOrder"], r);
const TrainOrderDetail = r =>
  require(["../views/member/service/trainTicket/trainOrderDetail"], r);
const TrainRefundApplication = r =>
  require(["../views/member/service/trainTicket/trainRefundApplication"], r);
const Policy = r => require(["../views/member/service/trainTicket/policy"], r);
const TrainPay = r =>
  require(["../views/member/service/trainTicket/train_pay"], r);

//代理商分红
const AgentBonus = r =>
  require(["../views/extension/agency-bonus/agent_bonus"], r);
const GroupOrder = r =>
  require(["../views/extension/agency-bonus/group_orders"], r);
const AgentCustomer = r =>
  require(["../views/extension/agency-bonus/my_customer"], r);

// Enterpr

const EnterpriseIndex = r =>
  require(["../views/member/enterprise/enterprise_index"], r);
const EnterpriseApply = r =>
  require(["../views/member/enterprise/enterprose_apply"], r);
const EnterpriseSupplier = r =>
  require(["../views/member/enterprise/enterprise_supplier"], r);
const EnterpriseSupplierInfo = r =>
  require(["../views/member/enterprise/enterprise_supplier_info"], r);
const EnterpriseCenterApply = r =>
  require(["../views/member/enterprise/enterprose_center_apply"], r);
const EnterpriseCenterSupplier = r =>
  require(["../views/member/enterprise/enterprise_center_supplier"], r);
//招商-我的门店
const EnterpriseStore = r =>
  require(["../views/member/enterprise/enterprise_store"], r);

//分期买车
const CartGood = r => require(["../components/goods/cart_good"], r);
const ApplicationProgress = r =>
  require(["../views/others/buy_car/application_progress"], r);
const InstallmentRecord = r =>
  require(["../views/others/buy_car/Installment_record"], r);

// rentCenter
const RentIndex = r => require(["../views/rent/rentIndex"], r);
const GoodsDetail = r => require(["../views/rent/goodsDetail"], r);
const ConfirmOrder = r => require(["../views/rent/confirmOrder"], r);
const RentOrderPay = r => require(["../views/rent/orderPay"], r);
const RentCenter = r => require(["../views/rent/rentCenter"], r);
const RentMyOrder = r => require(["../views/rent/rentMyOrder"], r);
const RentCharge = r => require(["../views/rent/rentCharge"], r);
const RentDeposit = r => require(["../views/rent/rentDeposit"], r);
const RentDepositDetail = r => require(["../views/rent/rentDepositDetail"], r);
const RentReturnGoods = r => require(["../views/rent/rentReturnGoods"], r);

const ToBeReturned = r =>
  require(["../views/rent/allRentOrders/toBeReturned"], r);
const OverdueReturn = r =>
  require(["../views/rent/allRentOrders/overdueReturn"], r);
const HasTransferred = r =>
  require(["../views/rent/allRentOrders/hasTransferred"], r);
const HasBeenReturned = r =>
  require(["../views/rent/allRentOrders/hasBeenReturned"], r);
const TransferRecord = r =>
  require(["../views/rent/allRentOrders/transferRecord"], r);
const RentGuide = r => require(["../views/rent/allRentOrders/rentGuide"], r);
const RentAfterSalas = r =>
  require(["../views/rent/allRentOrders/rentAfterSalas"], r);
const ReturnRecord = r =>
  require(["../views/rent/allRentOrders/returnRecord"], r);
const ToBePay = r => require(["../views/rent/allRentOrders/toBePay"], r);
const ToBeSend = r => require(["../views/rent/allRentOrders/toBeSend"], r);
const ToBetakeGoods = r =>
  require(["../views/rent/allRentOrders/toBetakeGoods"], r);
const ToBeClose = r => require(["../views/rent/allRentOrders/toBeClose"], r);
const ToBeComplete = r =>
  require(["../views/rent/allRentOrders/toBeComplete"], r);
const ToBeReturneding = r =>
  require(["../views/rent/allRentOrders/toBeReturneding"], r);

// 订单全返
const SingleReturnCenter = r =>
  require(["../views/member/income/singleReturn/single_return_center"], r);
const SingleReturnListInfo = r =>
  require(["../views/member/income/singleReturn/single_return_list_info"], r);

// 团队等级全返
const TeamLevelReturnCenter = r =>
  require([
    "../views/member/income/teamLevelReturn/teamlevel_return_center"
  ], r);
const TeamLevelReturnListInfo = r =>
  require([
    "../views/member/income/teamLevelReturn/teamlevel_return_list_info"
  ], r);

// 消费全返
const ConsumeReturnCenter = r =>
  require(["../views/member/income/consumeReturn/consume_return_center"], r);
const ConsumeReturnListInfo = r =>
  require(["../views/member/income/consumeReturn/consume_return_list_info"], r);

// 满额全返
const FullReturnCenter = r =>
  require(["../views/member/income/fullReturn/full_return_center"], r);
const FullReturnListInfo = r =>
  require(["../views/member/income/fullReturn/full_return_list_info"], r);

// 股东分红
const ShareholderDividend = r =>
  require([
    "../views/member/income/shareholderDividend/shareholder_dividend"
  ], r);
// 股东奖励
const ShareholderReward = r =>
  require(["../views/member/income/ShareholderReward/Shareholder_reward"], r);

// 分销管理奖励
const DistributionHome = r =>
  require(["../views/member/income/distributionIncentive/distributionHome"], r);
// 分销管理奖励详情
const DistributionDetail = r =>
  require([
    "../views/member/income/distributionIncentive/distributionDetail"
  ], r);
// 分销商分红
const LevelReturn = r =>
  require(["../views/member/income/levelReturn/level_return"], r);

// 排行榜

const RankingIndex = r => require(["../views/ranking/index"], r);
const RankingListFirst = r =>
  require(["../views/ranking/list_first_ranking"], r);
const RankingListSecond = r =>
  require(["../views/ranking/list_second_ranking"], r);

// 早起打卡
const ClockPunch = r => require(["../views/clockin/clockin"], r);
// 早起打卡挑战规则
const ClockPunchRule = r => require(["../views/clockin/clockinrule"], r);
// 早起打卡我的战绩
const ClockPunchRecord = r => require(["../views/clockin/clockinrecord"], r);

// 我的关系筛选
const MyRelationshipSearch = r =>
  require(["../views/member/tool/my_relationship_v2_search"], r);

// o2o首页商家
const HomeSeller = r => require(["../views/o2o/home_seller"], r);

// o2o首页商家详情
// const HomeSellerDetail = r => require(['../views/o2o/home_seller_detail'], r)

// o2o首页商家地址
const HomeSellerAddress = r => require(["../views/o2o/home_seller_address"], r);

// 代付
const PayAnother = r => require(["../views/member/pay/pay_another"], r);

// 代付详情

const PayAnotherDetail = r =>
  require(["../views/member/pay/pay_another_detail"], r);

const MyInfo = r => require(["../views/member/address/myinfo"], r);

// 充值码
const RechargeCode = r => require(["../views/qr_recharge/index"], r);

// 课程中心--首页

const CourseIndex = r => require(["../views/member/course/course_index"], r);

// 课程中心--搜索

const CourseSearch = r => require(["../views/member/course/course_search"], r);

// 课程中心--管理

const CourseManage = r => require(["../views/member/course/course_manage"], r);

// 课程详情

const CourseDetail = r => require(["../views/member/course/course_detail"], r);

// 课程-我的打赏

const CourseReward = r => require(["../views/member/course/course_reward"], r);

// 课程-我的课程

const CourseMy = r => require(["../views/member/course/course_mycourse"], r);

// 课程-观看历史

const CourseHistory = r =>
  require(["../views/member/course/course_history"], r);

// 课程-升级会员

const CourseMemberUpdate = r =>
  require(["../views/member/course/course_member_level"], r);

// 音频列表

const VoiceList = r => require(["../views/member/course/voice/voice_list"], r);

// 音频详情

const VoiceDetail = r =>
  require(["../views/member/course/voice/voice_detail"], r);

// 推广申请

const ExtensionApply = r => require(["../views/extension/extensionApple"], r);

// 会员等级

const MemberGradeList = r =>
  require(["../views/member/member_grade/member_grade_list"], r);

// 会员详情

const MemberGradeListDetail = r =>
  require(["../views/member/member_grade/member_grade_detail"], r);

// 待退还

const OrderReturn = r => require(["../views/member/order/order_refund"], r);

// 待退还中

const OrderReturnCheck = r =>
  require(["../views/member/order/order_return_check"], r);

// 待确定

const OrderReturnSure = r =>
  require(["../views/member/order/order_return_sure"], r);

// 租赁归还售后详情

const OrderReturnAftersalesDetail = r =>
  require(["../views/member/order/order_return_after_detail"], r);

// 会员权益退款迁移

const MemberRefundsMigration = r =>
  require(["../views/member/member_grade/member_grade_refunds_migration"], r);

// 商品详情品牌

const GoodsBrand = r => require(["../views/goods/goods_brand"], r);

// 柜子商品中转页面

const CupboardTransfer = r =>
  require(["../views/member/cupboard/cupboard_transfer"], r);

// 柜子商品操作员页面

const CupboardOperator = r =>
  require(["../views/member/cupboard/cupboard_operator"], r);

// 柜子商品操作员页面--投放页面

const CupboardDelivery = r =>
  require(["../views/member/cupboard/cupboard_delivery"], r);

// 柜子商品操作员页面--清空页面

const CupboardEmpty = r =>
  require(["../views/member/cupboard/cupboard_empty"], r);

// 柜子商品详情

const CupGoods = r => require(["../views/goods/goods_v2"], r);

// 区域选择

const ZoneChoose = r => require(["../views/home/home_zone"], r);

// 商品详情供应商店铺

const SupplierShop = r =>
  require(["../views/member/supplier/goods_supplier"], r);
// 转账

const TransferAccount = r =>
  require(["../views/member/pay/pay_transfer_account"], r);

// 供应商管理
const SupplierCenter = r =>
  require(["../views/member/supplier/supplier_center"], r);

// 供应商--信息管理页面

const SupInfoManage = r => require(["../views/member/supplier/info_manage"], r);

// 排队奖励记录

const QueueRecord = r =>
  require(["../views/extension/spread/reward_record"], r);

// 冻结币
const FrozenCoin = r => require(["../views/member/frozen/frozen_coin"], r);
const RechargeCoin = r => require(["../views/member/frozen/recharge_coin"], r);
const LookDetailsCoin = r =>
  require(["../views/member/frozen/look_details_coin"], r);
const PutForwardCoin = r =>
  require(["../views/member/frozen/put_forward_coin"], r);
// 开户信息

const AccoutInfo = r => require(["../views/member/accout/accout_info"], r);

// 登录中专页面

const LoginValidate = r => require(["../views/login/login_validation"], r);

// 抢单--补货商申请

const ReplenishmentApply = r =>
  require(["../views/grab/replenishmentApply"], r);

// 抢单--配送站申请

const DeliveryTerminalApply = r =>
  require(["../views/grab/deliveryTerminalApply"], r);

// 我要辅货

const MyDistribution = r =>
  require(["../views/grab/replenish/my_distribution"], r);

// 铺货单

const DistributionOrderList = r =>
  require(["../views/grab/replenish/distribution_orderlist"], r);

// 提交订单--详情

const DistributionOrderDetail = r =>
  require(["../views/grab/replenish/distribution_orderlist_detail"], r);

// 补货单

const ReplenishOrderlist = r =>
  require(["../views/grab/replenish/replenish_orderlist"], r);

// 补货单--详情

const ReplenishOrderDetail = r =>
  require(["../views/grab/replenish/replenish_orderlist_detail"], r);

// 返利记录 rebate

const ReplenishRebate = r => require(["../views/grab/replenish/rebate"], r);

// 抢单大厅

const RobbingCenter = r =>
  require(["../views/grab/delivery/robbing_center"], r);

// 配送订单

const DeliveryOrderList = r =>
  require(["../views/grab/delivery/delivery_list"], r);

// 我要补货

const MyReplenishment = r =>
  require(["../views/grab/delivery/my_replenish"], r);

//配送站的 我要补货
const WantReplenishment = r =>
  require(["../views/serviceStation/want_Replenishment"], r);

// 补货单111

const ReplenishOrder = r =>
  require(["../views/grab/delivery/replenish_order"], r);

// 订单详情-- 配送站

const DeliveryOrderDetail = r =>
  require(["../views/grab/delivery/order_detail"], r);

// 发货
const Send = r => require(["../views/grab/send"], r);

// 抢单评价
const DeliveryEvaluate = r => require(["../views/grab/evaluate"], r);

// 快递单

const Courier = r => require(["../views/member/courier/courier"], r);
const Courierrecord = r =>
  require(["../views/member/courier/courier_record"], r);
const Courierdetail = r =>
  require(["../views/member/courier/courier_detail"], r);

// 文章列表

const ArticleList = r => require(["../views/article/articleList"], r);

// 供应商搜素

const SupplierSearch = r => require(["../views/member/supplier/search"], r);

// 共享链
const RewardQueue = r =>
  require(["../views/extension/share_link/reward_queue"], r);
const RewardDetail = r =>
  require(["../views/extension/share_link/reward_detail"], r);
const RewardProcess = r =>
  require(["../views/extension/share_link/reward_process"], r);

// mryt
const MRYT = r => require(["../views/extension/mryt/mryt"], r);
const SaleCommission = r =>
  require(["../views/extension/mryt/sale_commission"], r);
const AwardRecord = r => require(["../views/extension/mryt/award_record"], r);
const AwardDetail = r => require(["../views/extension/mryt/award_detail"], r);
//连锁店--首页
const ChainShopIndex = r =>
  require(["../views/member/chain_shop/chain_shop_index"], r);
const ChainShopInfo = r =>
  require(["../views/member/chain_shop/chain_shop_info"], r);

//手动分红
const Profit = r => require(["../views/extension/profit/Profit.vue"], r);

//武昌医院--会务活动
const MeetingIndex = r =>
  require(["../views/conference/meeting/entry_record"], r); //报名记录
const MeetingIndexDetail = r =>
  require(["../views/conference/meeting/entry_record_detail"], r); //报名记录详情
const MeetingExtendList = r =>
  require(["../views/conference/meeting/extend_enroll_list"], r); //推广报名列表
const MeetingExtendDetail = r =>
  require(["../views/conference/meeting/extend_enroll_detail"], r); //推广报名详情

//入驻商品
const EnterShop = r => require(["../views/member/enter_shop/enter_shop"], r);
const EnterProtocol = r =>
  require(["../views/member/enter_shop/enter_protocol"], r);
const SubmitSucceed = r =>
  require(["../views/member/enter_shop/submit_succeed"], r);
const ApplyMerchant = r =>
  require(["../views/member/enter_shop/apply_merchant"], r);
const TruckList = r => require(["../views/member/enter_shop/truck_list"], r);
//爱心值充值
const LoveRecharge = r => require(["../views/love/love_recharge"], r);

//威富通
const WftAlipayDetail = r => require(["../views/member/pay/wft_alipay"], r);

//推广中心--专区商品
const ExtensionGoods = r => require(["../views/extension/extension_goods"], r);
//团队销量管理
const salesManagement = r => require(["../views/extension/teamSales/sales_management"], r);
//398二期：团队数据统计
const TeamDataCount = r =>
  require(["../views/extension/mryt/team_data_count"], r);
//新团队数据统计
const newTeamDataCount = r =>
  require(["../views/new_mryt/new_team_data_count"], r);
//398 一卡通
const CardIndex = r => require(["../views/o2o/card/card_index"], r);
const CardOpenMembership = r =>
  require(["../views/o2o/card/card_open_membership"], r);
const CardChooseMembership = r =>
  require(["../views/o2o/card/card_choose_membership_time"], r);
const CardRight = r => require(["../views/o2o/card/card_rights"], r);
const NewCard = r =>require(["../views/o2o/card/new_card"],r);
const NewCardList = r =>require(["../views/o2o/card/newcard_list"],r);
//门店优惠券
const StoreCoupon = r => require(["../views/o2o/store/store_coupon"], r);

//酒店优惠券
const hotelCoupon = r => require(["../views/hotel/hotel_coupon"], r);

//邀请页面
const InputVisit = r => require(["../views/member/visit/inputVisit"], r);
const Inviter = r => require(["../views/member/visit/inviter"], r);

//发票详情
const Invoice = r => require(["../views/invoice/invoice"], r);

//酒店相关页面
const HotelIndex = r => require(["../views/hotel/index"], r);
const HotelSearch = r => require(["../views/hotel/search"], r);
const HotelHome = r => require(["../views/hotel/homepage"], r);
const HotelChooseRoom = r => require(["../views/hotel/choose_room"], r);
// const HotelGood= r => require(['../views/hotel/goods'], r);
const HotelGoodsOrder = r => require(["../views/hotel/goods_order"], r);
const HotelOrderList = r => require(["../views/hotel/order_list"], r);
const HotelOrderDetail = r => require(["../views/hotel/order_detail"], r);
const HotelManage = r => require(["../views/hotel/manage"], r);

// 增加酒店供应链搜索页
const HotelSupplySearch = r => require(["../views/hotelSupply/search"], r);
// 增加酒店供应链首页
const HotelSupplyIndex = r => require(["../views/hotelSupply/index"], r);
// 增加酒店供应链酒店主页
const HotelSupplyHome = r => require(["../views/hotelSupply/homepage"], r);
// 增加酒店供应链酒店房型详情页
const hotelSupplyGoods = r => require(["../views/hotelSupply/hotelSupplyGoods"], r);
// 增加酒店供应链酒店房型下单页
const HotelSupplyGoodsOrder = r => require(["../views/hotelSupply/goods_order"], r);
// 增加酒店供应酒店详情页
const hotelOrder = r => require(["../views/hotelSupply/hotelOrder"], r);
//营业额
const Performance = r =>
  require(["../views/extension/performance/Performance"], r);

//合伙人团队
const PartnershipTeam = r =>
  require(["../views/extension/team_recorded/partnership_team"], r);
const ManagementRecord = r =>
  require(["../views/extension/team_recorded/management_record"], r);
const TaskList = r =>
  require(["../views/extension/team_recorded/task_list"], r);

//团队奖励
const RewardsRecord = r =>
  require(["../views/extension/team_reward/rewards_record"], r);
const RewardsRecordDetail = r =>
  require(["../views/extension/team_reward/rewards_record_detail"], r);
const TaskCenter = r =>
  require(["../views/extension/team_reward/task_center"], r);

//聚合/易合支付 Bank card settlement
const AggregateIndReg = r =>
  require(["../views/member/aggregate_payment/aggregate_ind_reg"], r);
const AggregateIndRegEdit = r =>
  require(["../views/member/aggregate_payment/aggregate_ind_reg_edit"], r);
const AggregateMeReg = r =>
  require(["../views/member/aggregate_payment/aggregate_mer_reg"], r);
const AggregateMeRegEdit = r =>
  require(["../views/member/aggregate_payment/aggregate_mer_reg_edit"], r);
const AggregateEntReg = r =>
  require(["../views/member/aggregate_payment/aggregate_ent_reg"], r);
const AggregateEntRegEdit = r =>
  require(["../views/member/aggregate_payment/aggregate_ent_reg_edit"], r);
const AggregateBankCardSet = r =>
  require(["../views/member/aggregate_payment/aggregate_bank_card_set"], r);
const AggregateAuditPart = r =>
  require(["../views/member/aggregate_payment/aggregate_audit_part"], r);
const CompanyEdit = r =>
  require(["../views/member/aggregate_payment/company_edit"], r);
const IndividualEdit = r =>
  require(["../views/member/aggregate_payment/individual_edit"], r);
const ShowApply = r =>
  require(["../views/member/aggregate_payment/show_apply"], r);

//口令红包
const redEnvelope = r =>
  require(["../views/member/redEnvelope/redEnvelope"], r);
//口令红包 邀请记录
const redEnvelopeRecord = r =>
  require(["../views/member/redEnvelope/record"], r);

//会员分红
const MemberBonusIndex = r =>
  require(["../views/extension/member_bonus/index"], r);
const MemberBonusRecord = r =>
  require(["../views/extension/member_bonus/record"], r);

//挂单
const EntryExchange = r =>
  require(["../views/extension/entry_orders/coupon_exchange"], r);
const EntryVolume = r =>
  require(["../views/extension/entry_orders/entry_volume"], r);
const MoneyDetail = r =>
  require(["../views/extension/entry_orders/money_detail"], r);
const MyVolume = r => require(["../views/extension/entry_orders/my_volume"], r);
const VolumeDetail = r =>
  require(["../views/extension/entry_orders/volume_detail"], r);
const WholesaleVolume = r =>
  require(["../views/extension/entry_orders/wholesale_volume"], r);
const paddingOrder_Home = r =>
  require(["../views/extension/entry_orders/paddingOrder_Home"], r);
const CouponExrecord = r =>
  require(["../views/extension/entry_orders/coupon_exrecord"], r);

//网约车
const CarIndex = r => require(["../views/online_car/index"], r);
const CarSign = r => require(["../views/online_car/car_sign"], r);
const cityManager = r => require(["../views/online_car/city_manager"], r);
const teamMember = r => require(["../views/online_car/team_member"], r);
const CarBonus = r => require(["../views/online_car/bonus_list"], r);
const DriverApply = r => require(["../views/online_car/driver_apply"], r);
const DriverData = r => require(["../views/online_car/driver_data"], r);
const onlineCarOrderlist = r => require(["../views/online_car/order_list"], r); //网约车订单

const globalDividend = r => require(["../views/extension/global_dividend"], r);

// 活动聚合页
const businessActivity = r => require(["../views/Activity/Activity"], r);
// 活动聚合页
const ActivityDetail = r => require(["../views/Activity/activity_detail"], r);
// 素材中心
const materialCenter = r => require(["../views/others/material_center"], r);
//虚拟币
const addressManage = r =>
  require(["../views/others/virtual/address_manage"], r);
const addressAdd = r => require(["../views/others/virtual/address_add"], r);
const reviseAddress = r =>
  require(["../views/others/virtual/revise_address"], r);
const handWithdraw = r => require(["../views/others/virtual/hand_withdraw"], r);
// 经销商奖励
const DealerAward = r =>
  require(["../views/extension/dealer_award/dealer_award"], r);
const DriverDetail = r =>
  require(["../views/extension/dealer_award/dealer_detail"], r);

//团队管理奖
const TeamManageReward = r =>
  require(["../views/extension/team_manage_reward/rewards_record"], r);

const Lottery = r => require(["../views/others/lottery"], r);
const LotteryRecord = r => require(["../views/others/lottery_record"], r);
// 分销订单统计
const DistributionOrders = r =>
  require(["../views/member/distribution_orders/distribution_orders"], r);
const Declaration = r => require(["../views/declaration/index"], r); //会员报单
const RecordDeclaration = r =>
  require(["../views/declaration/recordDeclaration"], r); //报单记录

const ServiceStation = r => require(["../views/serviceStation/index"], r); //服务站

const CommissionList = r =>
  require(["../views/serviceStation/commissionList"], r); //提成明细

// 自定义队列
const CustomQueue = r =>
  require(["../views/extension/custom_queue/custom_queue"], r);

//权益商品
const RightGood = r => require(["../views/member/member_grade/right_good"], r);
//保单
const policyManage = r => require(["../views/others/policy/policy_manage"], r);
const policyAdd = r => require(["../views/others/policy/policy_add"], r);

//小视频
const myVideo = r => require(["../views/video_goods/little_video/my_video"], r);
const VideoList = r =>
  require(["../views/video_goods/little_video/video_list"], r);
const VideoDetail = r =>
  require(["../views/video_goods/little_video/video_detail"], r);
const videoAgreement = r =>
  require(["../views/video_goods/video_agreement"], r); //小视频的用户协议，非协议内容
const releaseVideo = r => require(["../views/video_goods/release_video"], r); //小视频的用户协议，非协议内容
const addVideoGood = r => require(["../views/video_goods/video_good"], r); //选择添加视频上商品
const VideoReward = r => require(["../views/video_goods/video_reward"], r); //商品奖励记录

//团队业绩奖励
const TeamPerformanceAward = r =>
  require(["../views/extension/team_performance_award/index"], r);
//权益值分红
const EquityBonus = r =>
  require(["../views/extension/Equity_bonus/Equity_bonus"], r);

//广告中心
const advertiser = r => require(["../views/advertising_market/advertiser"], r); //广告主
const addAdvertising = r =>
  require(["../views/advertising_market/add_advertising"], r); //添加广告
const advertisingFee = r =>
  require(["../views/advertising_market/advertising_fee"], r); //广告费列表
const placedAdvertising = r =>
  require(["../views/advertising_market/placed_advertising"], r); //投放的广告

// 新mryt
const newMRYT = r => require(["../views/new_mryt/new_mryt"], r);
const newSaleCommission = r => require(["../views/new_mryt/new_sale_commission"], r);
const newAwardRecord = r => require(["../views/new_mryt/new_award_record"], r);
const newAwardDetail = r => require(["../views/new_mryt/new_award_detail"], r);

// 芸众电子合同
const signIndex = r => require(["../views/others/sign/index"], r);
const signGuide = r => require(["../views/others/sign/guide"], r);
const personBank = r => require(["../views/others/sign/person_bank"], r);
const identifyResult = r => require(["../views/others/sign/identify_result"], r);
const signCompany= r => require(["../views/others/sign/company"], r);
const contractBills = r => require(["../views/others/sign/contract_bills"], r);
// service
// const Service = r => require(['../views/member/service/service'],r)
// //phone
// const PhoneRecharge = r => require(['../views/member/service/phone/phoneRecharge'],r)
// const RechargePay = r => require(['../views/member/service/phone/rechargePay'],r)
// const OrderDetailsPaied = r =>require(['../views/member/service/phone/orderDetailsPaied'],r)
// const OrderDetailsNoPay = r =>require(['../views/member/service/phone/orderDetailsNoPay'],r)
// const RechargeRecord = r =>require(['../views/member/service/phone/rechargeRecord'],r)
// //oilCard
// const AddCard = r =>require(['../views/member/service/oilCard/addCard'],r)
// const CardServer = r =>require(['../views/member/service/oilCard/cardServer'],r)
// const OilNoPay = r =>require(['../views/member/service/oilCard/oilNoPay'],r)
// const OilDetailsPaied = r =>require(['../views/member/service/oilCard/oilDetailsPaied'],r)
// const OilRecharge = r =>require(['../views/member/service/oilCard/oilRecharge'],r)
// //ticket 机票
// const Ticket = r => require(['../views/member/service/ticket/index'], r)
// const City = r => require(['../views/member/service/ticket/city'], r)
// const TicketOrder = r =>require(['../views/member/service/ticket/ticketOrder'],r)
// const AddOrder = r =>require(['../views/member/service/ticket/addOrder'],r)
// const RefundApplication = r=>require(['../views/member/service/ticket/refundApplication'],r)
//
// //Game
// const GameSearch = r => require(['../views/member/service/game/gameSearch'],r)
// const GameIsPay = r => require(['../views/member/service/game/gameIsPay'],r)
// const GameNoPay = r => require(['../views/member/service/game/gameNoPay'],r)
// const GameFlingRecharge = r =>require(['../views/member/service/game/gameFlingRecharge'],r)
// const GamePasswordRecharge =r =>require(['../views/member/service/game/gamePasswordRecharge'],r)
//微社区
const MicroHome = r => require(["../views/micro_communities/home"], r);
const MicroIndex = r => require(["../views/micro_communities/microIndex"], r);
const MicroRelease = r =>
  require(["../views/micro_communities/microRelease"], r);
const Microsearchindex = r =>
  require(["../views/micro_communities/microsearchindex"], r);
const Microclassification = r =>
  require(["../views/micro_communities/microclassification"], r);
const Microcommentdetails = r =>
  require(["../views/micro_communities/microcommentdetails"], r);
const microhomepage = r =>
  require(["../views/micro_communities/microhomepage"], r);
const MicroEdit = r => require(["../views/micro_communities/microEdit"], r);
const microAttention = r =>
  require(["../views/micro_communities/micro_attention"], r);
const microFanlist = r =>
  require(["../views/micro_communities/microFanlist"], r);
//拼团
const GroupDetail = r => require(["../views/goods/group/group_detail"], r);
const GroupList = r => require(["../views/goods/group/group_list"], r);
const GroupGoods = r => require(["../components/goods/group_good"], r);
const MyGroups = r => require(["../views/goods/group/mygroups"], r);

//广告市场
const admarketHome = r => require(["../views/member/adMarket/home"], r);
const MyDevice = r => require(["../views/member/adMarket/myDevice"], r);
const DeviceManger = r => require(["../views/member/adMarket/deviceManger"], r);
const ADApply = r => require(["../views/member/adMarket/AD_Apply"], r);
const DeviceDetail = r => require(["../views/member/adMarket/deviceDetail"], r);
const managerCommission = r =>
  require(["../views/member/adMarket/managerCommission"], r);

//语音商品
const VoiceGood = r => require(["../views/goods/voice_good/good_detail"], r);
const MyVoices = r => require(["../views/goods/voice_good/my_voices"], r);

const Payrecharge = r =>
  require(["../views/member/payrecharge/payrecharge"], r);
// 第三方支付汇聚
const BankCardInformation = r =>
  require(["../views/sanpay/bankcardinformation"], r);
const BankCardinEdit = r => require(["../views/sanpay/bankcardinedit"], r);
const BankCardinAdd = r => require(["../views/sanpay/bankcardinadd"], r);
// 归还详情
const OrderRuturnInfo = r =>
  require(["../views/member/order/orderInfo/order_ruturn_info"], r);
// 调查表
const survey = r => require(["../views/others/survey"], r);
// 龙存管
const myWallet = r => require(["../views/member/dragon/my_wallet"], r);
const changePwd = r => require(["../views/member/dragon/change_pwd"], r);
const companyLogon = r => require(["../views/member/dragon/company_logon"], r);
const personLogon = r => require(["../views/member/dragon/person_logon"], r);
const personModify = r => require(["../views/member/dragon/person_modify"], r);
const companyModify = r =>
  require(["../views/member/dragon/company_modify"], r);
const dragonDeposit = r =>
  require(["../views/member/dragon/dragon_deposit"], r);
const walletDetail = r => require(["../views/member/dragon/wallet_detail"], r);
const chooseStatus = r => require(["../views/member/dragon/choose_status"], r);
const checking = r => require(["../views/member/dragon/checking"], r);
const dragonWithdraw = r =>
  require(["../views/member/dragon/dragon_withdraw"], r);
const myBank = r => require(["../views/member/dragon/my_bank"], r);
const failApply = r => require(["../views/member/dragon/fail_apply"], r);
const infoChange = r => require(["../views/member/dragon/info_change"], r);
//柯怡 管理奖
const ManageAward = r =>
  require(["../views/extension/manage_share/manage_award"], r);
//柯怡 分享奖
const ShareAward = r =>
  require(["../views/extension/manage_share/share_award"], r);
//平级奖
const PeersAward = r =>
  require(["../views/extension/peers_award/peers_award"], r);
const SelfCarryApply = r =>
  require(["../views/member/self_carry/selfCarry_apply"], r);
//杨朗 自提点列表
const SelfCarry_info = r =>
  require(["../views/member/self_carry/selfCarry_info"], r);
//杨朗 自提点详情
const selfCarry_reward = r =>
  require(["../views/member/self_carry/selfCarry_reward"], r);
//分期购车-管理页面
const HireCarManage = r =>
  require(["../views/extension/service_staff/manage"], r);
//分期购车-服务人员
const ServiceStaff = r =>
  require(["../views/extension/service_staff/service_staff"], r);
const StaffOrderDetail = r =>
  require(["../views/extension/service_staff/order_detail"], r);
const Dividend = r => require(["../views/extension/service_staff/dividend"], r);
//分期购车奖励详情
const dividendDetail = r =>
  require(["../views/extension/service_staff/dividend_detail"], r);
const Bonus = r => require(["../views/others/bonus"], r);
//收益奖
const revenus_bonus = r => require(["../views/others/revenus_bonus"],r);

// 预约
const Appointment = r => require(["../views/appointment/appointment_index"],r);
const showAppointment = r => require(["../views/appointment/showAppointment"],r);
const AppointmentSearch = r => require(["../views/appointment/search"],r);
const ProjectDetails = r => require(["../views/appointment/project_details"],r);
const ProjectList = r => require(["../views/appointment/project_list"],r);
const TechnicianDetails = r => require(["../views/appointment/technician_details"],r);
const HotTechnician = r => require(["../views/appointment/hot_technician"],r);
const AppointmentMine = r => require(["../views/appointment/mine"],r);
const TechnicianTime = r => require(["../views/appointment/technician/add_work_time"],r);
const TechnicianWork = r => require(["../views/appointment/technician/work_day"],r);
const AppointmentProject = r => require(["../views/appointment/technician/appointment_project"],r);
const AddTechnician = r => require(["../views/appointment/manager/add_technician"],r);
const StoresTechnician = r => require(["../views/appointment/manager/stores_technician"],r);
const ClientAppointment = r => require(["../views/appointment/client/appointment"],r);
const ClientEvaluate = r => require(["../views/appointment/client/evaluate"],r);
const MakeAppointment = r => require(["../views/appointment/client/make_appointment"],r);
const ClientProject = r => require(["../views/appointment/client/project"],r);
const ClientVerification = r => require(["../views/appointment/client/verification"],r);

// 宣传单
const advertisingPage = r => require(["../views/others/advertisingPage"], r);
//门店附近商品
const introduceNear = r => require(["../views/o2o/introduce_good/introduce_near"], r);
const nearSearch = r => require(["../views/o2o/introduce_good/near_search"], r);
const addNear = r => require(["../views/o2o/introduce_good/add_near"], r);
// 根目录
const rootPath = "";
//画册
const pictureAlbum = r => require(["../views/others/picture_album/picture_album"],r);
//优惠券二维码
const qrCoupon = r => require(["../views/qr_coupon/qr_coupon"],r);
// 页面路由
const routes = [
  // 支付后跳转页面
  {
    path: "/member/payrecharge",
    component: Payrecharge,
    name: "payrecharge",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "",
    redirect: {
      name: "home"
    },
    meta: {
      title: "",
      foot: false
    }
  },
  {
    path: "/user_agreement",
    component: userAgreement,
    name: "userAgreement",
    meta: {
      title: "",
      foot: true
    }
  },
  // 汇聚 账户信息
  {
    path: "/member/bankCardInformation",
    component: BankCardInformation,
    name: "bankCardInformation",
    meta: {
      title: "",
      foot: false
    }
  },
  // 归还详情
  {
    path: "/member/orderruturninfo:id",
    component: OrderRuturnInfo,
    name: "orderruturninfo",
    meta: {
      title: "归还详情",
      foot: false
    }
  },
  // 银行卡信息编辑
  {
    path: "/member/bankcardinedit",
    component: BankCardinEdit,
    name: "bankcardinedit",
    meta: {
      title: "",
      foot: false
    }
  },
  // 银行卡信息添加
  {
    path: "/member/bankcardinadd",
    component: BankCardinAdd,
    name: "bankcardinadd",
    meta: {
      title: "",
      foot: false
    }
  },
  {
    path: "/home",
    component: Home,
    name: "home",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/temp",
    component: Temp,
    name: "temp",
    meta: {
      title: "模板",
      foot: false
    }
  },
  {
    path: "/hello",
    component: Hello,
    name: "hello"
  },
  {
    path: "/CloseSite",
    component: CloseSite,
    name: "CloseSite",
    meta: {
      title: "站点已关闭",
      foot: true
    }
  },

  {
    path: "/diy",
    component: Diy,
    name: "diy",
    meta: {
      title: "",
      foot: false
    }
  },
  // {
  //   path: "/diy/:page_id",
  //   component: Diy,
  //   name: "Diy1"
  // },
  {
    path: "/diyform/:id",
    component: DiyForm,
    name: "DiyForm"
  },
  {
    path: "/diyform/:id/:goodsId/:optionsId/:total",
    component: DiyForm,
    name: "activityDiyForm"
  },
  {
    path: "/share",
    component: Share,
    name: "share",
    meta: {
      title: "分享",
      foot: false
    }
  },
  // 活动聚合页
  {
    path: "/business_activity/business_activity",
    component: businessActivity,
    name: "businessActivity ",
    meta: {
      title: "活动聚合",
      foot: true
    }
  },
  // 活动聚合页
  {
    path: "/activity_detail",
    component: ActivityDetail,
    name: "ActivityDetail ",
    meta: {
      title: "活动详情",
      foot: true
    }
  },
  //Member
  {
    path: "/member/bank",
    component: MemberBank,
    name: "memberBank",
    meta: {
      title: "银行卡",
      foot: true
    }
  },
  {
    path: "/member/bank_card",
    component: BankCard,
    name: "BankCard",
    meta: {
      title: "银行卡",
      foot: true
    }
  },
  {
    path: "/member",
    component: Member,
    name: "member",
    meta: {
      title: "会员中心",
      foot: false
    }
  },

  // {
  //   path: '/member/tabs',
  //   component: Tabs,
  //   name: 'tabs',
  //   meta: {
  //     title: 'tabs',
  //     foot: false
  //   }
  // },
  // {
  //   path: '/member/po',
  //   component: Po,
  //   name: 'po',
  //   meta: {
  //     title: 'po',
  //     foot: false
  //   }
  // },
  {
    path: "/member/info",
    component: Info,
    name: "info",
    meta: {
      title: "会员信息",
      foot: true
    }
  },
  {
    path: "/member/editmobile",
    component: Editmobile,
    name: "editmobile",
    meta: {
      title: "绑定手机",
      foot: true
    }
  },
  {
    path: "/member/withdrawEditmobile",
    component: WithdrawEditmobile,
    name: "withdrawEditmobile",
    meta: {
      title: "绑定手机",
      foot: true
    }
  },
  {
    path: "/member/scaneditmobile",
    component: scanEditmobile,
    name: "scanEditmobile",
    meta: {
      title: "绑定手机",
      foot: true
    }
  },

  {
    path: "/member/balance",
    component: Balance,
    name: "balance",
    meta: {
      title: "余额",
      foot: true
    }
  },
  {
    path: "/member/detailed",
    component: Detailed,
    name: "detailed",
    meta: {
      title: "余额明细",
      foot: true
    }
  },
  {
    path: "/member/code_page",
    component: codePage,
    name: "codePage",
    meta: {
      title: "支付码",
      foot: true
    }
  },
  {
    path: "/member/uid_code",
    component: codePage,
    name: "uidCode",
    meta: {
      title: "会员卡号",
      foot: true
    }
  },
  // {
  //   path: '/member/screen',
  //   component: Screen,
  //   name: 'screen',
  //   meta: {
  //     title: '余额筛选',
  //     foot: true
  //   }
  // },
  {
    path: "/member/details/:item",
    component: Details,
    name: "details",
    meta: {
      title: "余额详情",
      foot: true
    }
  },
  {
    path: "/member/integral",
    component: Integral,
    name: "integral",
    meta: {
      title: "积分",
      foot: true
    }
  },
  {
    path: "/member/integral_v2",
    component: IntegralV2,
    name: "integral_v2",
    meta: {
      title: "积分",
      foot: true
    }
  },
  {
    path: "/member/integral_v2Transfer",
    component: IntegralV2Transfer,
    name: "integral_v2_transfer",
    meta: {
      title: "积分转账",
      foot: true
    }
  },
  {
    path: "/member/income",
    component: Income,
    name: "income",
    meta: {
      title: "收入",
      foot: true
    }
  },
  {
    path: "/member/balance_recharge",
    component: Balance_recharge,
    name: "balance_recharge",
    meta: {
      title: "充值",
      foot: true
    }
  },
  {
    path: "/member/balance_transfer",
    component: Balance_transfer,
    name: "balance_transfer",
    meta: {
      title: "转账",
      foot: true
    }
  },
  {
    path: "/member/balance_withdrawals",
    component: Balance_withdrawals,
    name: "balance_withdrawals",
    meta: {
      title: "提现",
      foot: true
    }
  },
  // 保单管理
  // Balance_manage
  {
    path: "/member/Balance_manage",
    component: Balance_manage,
    name: "balance_manage",
    meta: {
      title: "保单管理",
      foot: true
    }
  },
  // Balance_manageDetail
  {
    path: "/member/Balance_manageDetail",
    component: Balance_manageDetail,
    name: "balance_manageDetail",
    meta: {
      title: "保单详情",
      foot: true
    }
  },
  // 保单添加
  // Add_Balance_manage
  {
    path: "/member/add_balance_manage",
    component: Add_Balance_manage,
    name: "add_balance_manage",
    meta: {
      title: "保单添加",
      foot: true
    }
  },
  // 编辑保单
  // Edit_Balance_manage
  {
    path: "/member/edit_balance_manage/:type",
    component: Edit_Balance_manage,
    name: "edit_balance_manage",
    meta: {
      title: "编辑保单",
      foot: true
    }
  },
  {
    path: "/member/policyPay/:id/:supplier_id",
    component: policyPay,
    name: "policyPay",
    meta: {
      title: "保单支付",
      foot: true
    }
  },
  {
    path: "/member/withdrawal",
    component: Withdrawal,
    name: "withdrawal",
    meta: {
      title: "收入提现",
      foot: true
    }
  },
  {
    path: "/member/incomedetails",
    component: Incomedetails,
    name: "incomedetails",
    meta: {
      title: "收入明细",
      foot: true
    }
  },
  {
    path: "/member/member_income_incomedetails_info",
    component: IncomedetailsInfo,
    name: "income_details_info",
    meta: {
      title: "收入明细详情",
      foot: true
    }
  },
  // 修改自定义信息
  {
    path: "/member/info_costom",
    component: InfoCostom,
    name: "info_costom",
    meta: {
      title: "修改信息",
      foot: true
    }
  },
  // 余额支付密码
  {
    path: "/member/balance_password",
    component: BalancePassword,
    name: "balance_password",
    meta: {
      title: "修改余额支付密码",
      foot: true
    }
  },
  // 设置余额支付密码
  {
    path: "/member/set_balance_password",
    component: SetBalancePassword,
    name: "set_balance_password",
    meta: {
      title: "设置余额支付密码",
      foot: true
    }
  },

  // 消息列表
  {
    path: "/member/message",
    component: Message,
    name: "message",
    meta: {
      title: "消息列表",
      foot: false
    }
  },
  {
    path: "/member/message_info/:id",
    component: MessageInfo,
    name: "messageInfo",
    meta: {
      title: "消息详情",
      foot: false
    }
  },

  // {
  //   path: '/member/integraldetail/:item',
  //   component: Integraldetail,
  //   name: 'integraldetail',
  //   meta: {
  //     title: '积分详情',
  //     foot: true
  //   }
  // },
  {
    path: "/member/integrallist",
    component: IntegralList,
    name: "integrallist",
    meta: {
      title: "积分列表",
      foot: true
    }
  },
  {
    path: "/member/presentationRecord",
    component: PresentationRecord,
    name: "presentationRecord",
    meta: {
      title: "我的提成",
      foot: true
    }
  },
  {
    path: "/member/presentationRecord/:supplier",
    component: PresentationRecord,
    name: "supplierRecord",
    meta: {
      title: "我的提现",
      foot: true
    }
  },
  {
    path: "/member/presentationDetails/:record_id",
    component: PresentationDetails,
    name: "presentationDetails",
    meta: {
      title: "提现详情",
      foot: true
    }
  },
  {
    path: "/member/address",
    component: Address,
    name: "address",
    meta: {
      title: "默认地址",
      foot: true
    }
  },
  {
    path: "/member/alterAddress",
    component: AlterAddress,
    name: "alterAddress",
    meta: {
      title: "修改收货地址",
      foot: true
    }
  },
  {
    path: "/member/appendAddress",
    component: AppendAddress,
    name: "appendAddress",
    meta: {
      title: "添加收货地址",
      foot: true
    }
  },
  // income
  {
    path: "/member/distributionCommission",
    component: DistributionCommission,
    name: "distributionCommission",
    meta: {
      title: "未提现分销佣金",
      foot: true
    }
  },
  // tool
  {
    path: "/member/footprint",
    component: Footprint,
    name: "footprint",
    meta: {
      title: "我的足迹",
      foot: true
    }
  },
  {
    path: "/member/collection",
    component: Collection,
    name: "collection",
    meta: {
      title: "我的收藏",
      foot: true
    }
  },
  {
    path: "/member/myrelationship",
    component: MyRelationship,
    name: "myRelationship",
    meta: {
      title: "我的关系",
      foot: true
    }
  },
  {
    path: "/member/offlineSearch",
    component: OfflineSearch,
    name: "offlineSearch",
    meta: {
      title: "下线搜索",
      foot: true
    }
  },
  {
    path: "/member/myEvaluation",
    component: MyEvaluation,
    name: "myEvaluation",
    meta: {
      title: "我的评价",
      foot: true
    }
  },
  {
    path: "/member/comment",
    component: Comment,
    name: "comment",
    meta: {
      title: "多商品评价",
      foot: true
    }
  },
  {
    path: "/member/evaluationDetails",
    component: EvaluationDetails,
    name: "evaluationDetails",
    meta: {
      title: "评价详情",
      foot: true
    }
  },
  {
    path: "/member/myfriends",
    component: MyFriendApply,
    name: "MyFriendApply",
    meta: {
      title: "我的朋友",
      foot: true
    }
  },
  {
    path: "/member/coupon_exchange",
    component: CouponExchange,
    name: "CouponExchange",
    meta: {
      title: "兑换中心",
      foot: true
    }
  },
  {
    path: "/member/helpcenter",
    component: Helpcenter,
    name: "helpcenter",
    meta: {
      title: "帮助中心",
      foot: true
    }
  },
  // score
  {
    path: "/member/integral_activity",
    component: IntegralActivity,
    name: "IntegralActivity",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/member/Integral_generalization",
    component: IntegralGeneralization,
    name: "IntegralGeneralization",
    meta: {
      title: "发起赠送",
      foot: true
    }
  },
  {
    path: "/member/integral_get_record",
    component: IntegralGetRecord,
    name: "IntegralGetRecord",
    meta: {
      title: "领取记录",
      foot: true
    }
  },
  {
    path: "/member/integral_present",
    component: IntegralPresent,
    name: "IntegralPresent",
    meta: {
      title: "积分推广",
      foot: false
    }
  },
  {
    path: "/member/integral_record",
    component: IntegralRecord,
    name: "IntegralRecord",
    meta: {
      title: "赠送记录",
      foot: true
    }
  },
  // Love 爱心值
  {
    path: "/love_index",
    component: Love_index,
    name: "love_index",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/love_list",
    component: Love_list,
    name: "love_list",
    meta: {
      title: "明细",
      foot: true
    }
  },
  {
    path: "/love_transfer",
    component: Love_transfer,
    name: "love_transfer",
    meta: {
      title: "转账",
      foot: true
    }
  },
  {
    path: "/love_changein",
    component: Love_changein,
    name: "love_changein",
    meta: {
      title: "转入",
      foot: true
    }
  },
  {
    path: "/love_changeto",
    component: Love_changeto,
    name: "love_changeto",
    meta: {
      title: "转出",
      foot: true
    }
  },
  {
    path: "/love_give",
    component: Love_give,
    name: "love_give",
    meta: {
      title: "购物赠送详情",
      foot: true
    }
  },
  {
    path: "/love_details",
    component: Love_details,
    name: "love_details",
    meta: {
      title: "消费抵扣详情",
      foot: true
    }
  },
  {
    path: "/love_agent",
    component: Love_agent,
    name: "love_agent",
    meta: {
      title: "代理商奖励详情",
      foot: true
    }
  },
  {
    path: "/love_push",
    component: Love_push,
    name: "love_push",
    meta: {
      title: "直推奖奖励详情",
      foot: true
    }
  },
  {
    path: "/love_cash",
    component: Love_cash,
    name: "love_cash",
    meta: {
      title: "收入提现奖励详情",
      foot: true
    }
  },
  {
    path: "/love_record",
    component: Love_record,
    name: "love_record",
    meta: {
      title: "爱心值激活记录",
      foot: true
    }
  },
  {
    path: "/love_explain",
    component: Love_explain,
    name: "love_explain",
    meta: {
      title: "爱心值说明",
      foot: true
    }
  },
  {
    path: "/love_activation/:id",
    component: Love_activation,
    name: "love_activation",
    meta: {
      title: "激活详情",
      foot: true
    }
  },
  {
    path: "/loveWithdrawals",
    component: LoveWithdrawals,
    name: "loveWithdrawals",
    meta: {
      title: "提现",
      foot: true
    }
  },
  {
    path: "/lovePeriod",
    component: lovePeriod,
    name: "lovePeriod",
    meta: {
      title: "周期奖励记录",
      foot: true
    }
  },
  {
    path: "/lovePerformance",
    component: lovePerformance,
    name: "lovePerformance",
    meta: {
      title: "团队奖励记录",
      foot: true
    }
  },

  // article
  {
    path: "/notice",
    component: Notice,
    name: "notice",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/articleContent/:id",
    component: ArticleContent,
    name: "articleContent",
    meta: {
      title: "文章内容",
      foot: true
    }
  },
  {
    path: "/noticeByCategory/:id",
    component: NoticeByCategory,
    name: "noticeByCategory",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/noticeReport/:id",
    component: NoticeReport,
    name: "noticeReport",
    meta: {
      title: "举报",
      foot: true
    }
  },
  {
    path: "/payEssay",
    component: payEssay,
    name: "payEssay",
    meta: {
      title: "已付费文章",
      foot: true
    }
  },
  {
    path: "/payList/:id",
    component: payList,
    name: "payList",
    meta: {
      title: "付费列表",
      foot: true
    }
  },
  // overseas 华侨币
  {
    path: "/overseas_index",
    component: Overseas_index,
    name: "overseas_index",
    meta: {
      title: "华侨币",
      foot: true
    }
  },
  {
    path: "/overseas_explain",
    component: Overseas_explain,
    name: "overseas_explain",
    meta: {
      title: "华侨币说明",
      foot: true
    }
  },
  {
    path: "/overseas_transfer",
    component: Overseas_transfer,
    name: "overseas_transfer",
    meta: {
      title: "华侨币转让",
      foot: true
    }
  },
  {
    path: "/overseas_record",
    component: Overseas_record,
    name: "overseas_record",
    meta: {
      title: "激活记录",
      foot: true
    }
  },
  {
    path: "/overseas_list",
    component: Overseas_list,
    name: "overseas_list",
    meta: {
      title: "激活明细",
      foot: true
    }
  },
  {
    path: "/overseas_balance_withdrawals",
    component: Overseas_balance_withdrawals,
    name: "overseas_balance_withdrawals",
    meta: {
      title: "提现到余额",
      foot: true
    }
  },

  // microshop
  {
    path: "/microShopShare/home/:shop_id",
    component: MicroShop_Share_home,
    name: "micro_shop_share_home",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/microShopShare/micro_shop_category",
    component: MicroShop_ShareCategory,
    name: "micro_shop_share_category",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/microShopShare/micro_share_catelist/:id/",
    component: CatelistShare,
    name: "micro_shop_share_carelist",
    meta: {
      title: "",
      foot: true
    }
  },

  {
    path: "/microShopAdd/micro_shop_category",
    component: MicroShop_AddCategory,
    name: "micro_shop_add_category",
    meta: {
      title: "商品分类",
      foot: true
    }
  },

  {
    path: "/microShop_apply",
    component: MicroShop_apply,
    name: "microShop_apply",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/microShop_apply_reg_info",
    component: MicroShop_apply_reg_info,
    name: "microShop_apply_reg_info",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/microShop/baseinfo",
    component: MicroShop_baseInfo,
    name: "microShop_baseinfo",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/microShop/micro_shop_category",
    component: MicroShop_Category,
    name: "micro_shop_category",
    meta: {
      title: "",
      foot: true
    }
  },

  // 参数id用来接收从分类页面传递过来的具体类别参数
  {
    path: "/catelist1/:id/",
    component: Catelist1,
    name: "catelist1",
    meta: {
      title: "分类列表",
      foot: true
    }
  },
  // {path: '/catelist1/:id/:isSelect', component: Catelist1, name: 'catelist1',meta: {	title: '分类列表', foot:true }},
  {
    path: "/microShop/home",
    component: MicroShop_home,
    name: "microShop_home",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/microShop/shopKeeperCenter",
    component: MicroShop_ShopKeeperCenter,
    name: "microShop_ShopKeeperCenter",
    meta: {
      title: "用户中心",
      foot: true
    }
  },

  // 路由参数用来控制显示哪个时间段的订单
  {
    path: "/microShop/orderDetail/:date",
    component: MicroShop_orderDetail,
    name: "microShop_orderDetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },

  // 路由参数用来控制显示哪个时间段的分红订单 （）
  {
    path: "/microShop/shareList/:date",
    component: MicroShop_shareList,
    name: "microShop_shareList",
    meta: {
      title: "分红列表",
      foot: true
    }
  },

  // 路由参数用来控制显示哪个分红订单的具体详情
  {
    path: "/microShop/shareDetail/:orderID",
    component: MicroShop_shareDetail,
    name: "microShop_shareDetail",
    meta: {
      title: "分红详情",
      foot: true
    }
  },
  {
    path: "/microShop/selectedGoods/:goods",
    component: MicroShop_selectedGoods,
    name: "microShop_selectedGoods",
    meta: {
      title: "已选商品",
      foot: true
    }
  },
  {
    path: "/microShop/manageShop",
    component: ManageShop,
    name: "manage_shop",
    meta: {
      title: "",
      foot: true
    }
  },

  // extension
  {
    path: "/extension/manage",
    component: Manage,
    name: "manage",
    meta: {
      title: "管理奖",
      foot: true
    }
  },
  {
    path: "/member/extension",
    component: Extension,
    name: "extension",
    meta: {
      title: "我的推广",
      foot: false
    }
  },
  {
    path: "/extension/distribution",
    component: Distribution,
    name: "distribution",
    meta: {
      title: "分销商",
      foot: true
    }
  },
  {
    path: "/extension/commission",
    component: Commission,
    name: "commission",
    meta: {
      title: "预计佣金",
      foot: true
    }
  },
  {
    path: "/extension/commissionDetails",
    component: CommissionDetails,
    name: "commissionDetails",
    meta: {
      title: "预计佣金详情",
      foot: true
    }
  },
  {
    path: "/extension/unsettled",
    component: Unsettled,
    name: "unsettled",
    meta: {
      title: "未结算佣金",
      foot: true
    }
  },
  {
    path: "/extension/unsettledDetails",
    component: UnsettledDetails,
    name: "unsettledDetails",
    meta: {
      title: "未结算佣金详情",
      foot: true
    }
  },
  {
    path: "/extension/alreadySettled",
    component: AlreadySettled,
    name: "alreadySettled",
    meta: {
      title: "已结算佣金",
      foot: true
    }
  },
  {
    path: "/extension/alreadySettledDetails",
    component: AlreadySettledDetails,
    name: "alreadySettledDetails",
    meta: {
      title: "已结算佣金详情",
      foot: true
    }
  },
  {
    path: "/extension/notPresent",
    component: NotPresent,
    name: "notPresent",
    meta: {
      title: "未提现佣金",
      foot: true
    }
  },
  {
    path: "/extension/notPresentDetails",
    component: NotPresentDetails,
    name: "notPresentDetails",
    meta: {
      title: "未提现佣金详情",
      foot: true
    }
  },
  {
    path: "/extension/present",
    component: Present,
    name: "present",
    meta: {
      title: "已提现佣金",
      foot: true
    }
  },
  {
    path: "/extension/invalid/:type",
    component: Present,
    name: "invalid",
    meta: {
      title: "无效佣金",
      foot: true
    }
  },
  {
    path: "/extension/presentDetails",
    component: PresentDetails,
    name: "presentDetails",
    meta: {
      title: "已提现佣金详情",
      foot: true
    }
  },
  {
    path: "/extension/distributionOrder",
    component: DistributionOrder,
    name: "distributionOrder",
    meta: {
      title: "分销订单",
      foot: true
    }
  },
  {
    path: "/extension/extendIncome",
    component: ExtendIncome,
    name: "extendIncome",
    meta: {
      title: "推广收入",
      foot: false
    }
  }, // new
  {
    path: "/extension/merchantsDividendRatio",
    component: MerchantsDividendRatio,
    name: "merchantsDividendRatio",
    meta: {
      title: "招商员",
      foot: true
    }
  }, // new
  {
    path: "/shareholderCenter",
    component: ShareholderCenter,
    name: "shareholderCenter",
    meta: {
      title: "股东中心",
      foot: true
    }
  },
  {
    path: "/teamAgentCenter",
    component: TeamAgentCenter,
    name: "teamAgentCenter",
    meta: {
      title: " ",
      foot: true
    }
  },
  {
    path: "/teamPerformance",
    component: TeamPerformance,
    name: "teamPerformance",
    meta: {
      title: "团队业绩",
      foot: true
    }
  },
  {
    path: "/FranchiserRed",
    component: FranchiserRed,
    name: "FranchiserRed",
    meta: {
      title: "红包奖励记录列表",
      foot: true
    }
  },
  {
    path: "/teamCode",
    component: TeamCode,
    name: "teamCode",
    meta: {
      title: "我的激活码",
      foot: true
    }
  },
  {
    path: "/teamClient",
    component: TeamClient,
    name: "TeamClient",
    meta: {
      title: "我的客户",
      foot: true
    }
  },
  {
    path: "/codeHistory",
    component: CodeHistory,
    name: "codeHistory",
    meta: {
      title: "使用记录",
      foot: true
    }
  },
  {
    path: "/investmentCenter",
    component: InvestmentCenter,
    name: "investmentCenter",
    meta: {
      title: "招商中心",
      foot: true
    }
  },
  {
    path: "/regionalAgencyCenter",
    component: RegionalAgencyCenter,
    name: "regionalAgencyCenter",
    meta: {
      title: " ",
      foot: true
    }
  },
  {
    path: "/applyRegionalAgency",
    component: ApplyRegionalAgency,
    name: "applyRegionalAgency",
    meta: {
      title: "申请区域代理",
      foot: true
    }
  },
  {
    path: "/fixedReward",
    component: FixedReward,
    name: "fixedReward",
    meta: {
      title: "固定奖励",
      foot: true
    }
  },
  {
    path: "/courseIncome",
    component: CourseIncome,
    name: "courseIncome",
    meta: {
      title: "讲师分红",
      foot: true
    }
  },
  {
    path: "/DailyRed",
    component: DailyRed,
    name: "DailyRed",
    meta: {
      title: "",
      foot: false
    }
  },
  {
    path: "/GetRedRecord",
    component: GetRedRecord,
    name: "GetRedRecord",
    meta: {
      title: "红包领取记录",
      foot: true
    }
  },
  {
    path: "/RedAmount",
    component: RedAmount,
    name: "RedAmount",
    meta: {
      title: "红包额度记录",
      foot: true
    }
  },
  {
    path: "/RedReward",
    component: RedReward,
    name: "RedReward",
    meta: {
      title: "经销商红包奖励",
      foot: true
    }
  },
  // 推广页
  {
    path: "/extensionPage",
    component: ExtensionPage,
    name: "ExtensionPage",
    meta: {
      title: "推广页",
      foot: true
    }
  },
  {
    path: "/awardRanking",
    component: AwardRanking,
    name: "AwardRanking",
    meta: {
      title: "奖项排行",
      foot: true
    }
  },
  {
    path: "/recordOfAwards/:id",
    component: RecordOfAwards,
    name: "RecordOfAwards",
    meta: {
      title: "奖励记录",
      foot: true
    }
  },
  {
    path: "/myIncome",
    component: MyIncome,
    name: "MyIncome",
    meta: {
      title: "我的收入",
      foot: true
    }
  },

  // 数据统计
  {
    path: "/myEarnings",
    component: myEarnings,
    name: "myEarnings",
    meta: { title: "领取收益", foot: true }
  },
  {
    path: "/earningList",
    component: earningList,
    name: "earningList",
    meta: { title: "领取收益", foot: true }
  },

  {
    path: "/point_activity_award_center",
    component: point_activity_award_center,
    name: "point_activity_award_center",
    meta: { title: "积分活动奖励", foot: true }
  },
  //区域选择
  {
    path: "/selectionarea",
    component: Selectionarea,
    name: "selectionarea",
    meta: { title: "区域选择", foot: true }
  },
  //区域分红
  {
    path: "/regionaldividend",
    component: Regionaldividend,
    name: "regionaldividend",
    meta: { title: "区域分红", foot: true }
  },
  //区域分红详情
  {
    path: "/detailsdividends",
    component: Detailsdividends,
    name: "detailsdividends",
    meta: { title: "区域分红详情", foot: true }
  },
  // 信用值
  {
    path: "/member/creditInfo",
    component: CreditInfo,
    name: "creditInfo",
    meta: {
      title: "信用值",
      foot: true
    }
  },
  // supplier
  {
    path: "/member/supplier",
    component: Supplier,
    name: "supplier",
    meta: {
      title: "供应商申请",
      foot: true
    }
  },
  // comment
  {
    path: "/CommentDetails/:order_id/:goods_id/:uid",
    component: CommentDetails,
    name: "CommentDetails",
    meta: {
      title: "评价详情",
      foot: true
    }
  },
  {
    path: "/ReCommentDetails",
    component: ReCommentDetails,
    name: "ReCommentDetails",
    meta: {
      title: "追加评价",
      foot: true
    }
  },
  {
    path: "/OtherCommentDetails",
    component: OtherCommentDetails,
    name: "othercommentdetails",
    meta: {
      title: "其它评价",
      foot: true
    }
  },
  // order
  {
    path: "/member/alipay/:status/:url",
    component: Alipay,
    name: "alipayCloud",
    meta: {
      title: "支付宝",
      foot: true
    }
  },
  {
    path: "/member/alipay/:status/:recharge_money/:order_pay_id/:uid/:pid",
    component: Alipay,
    name: "alipay",
    meta: {
      title: "支付宝",
      foot: true
    }
  },
  // 冻结币--支付
  {
    path: "/member/alipay/:status/:recharge_money/:order_pay_id/:uid/:pid/:tag",
    component: Alipay,
    name: "fre_alipay",
    meta: {
      title: "支付宝",
      foot: true
    }
  },
  // 爱心值--支付
  {
    path: "/member/alipay/:status/:recharge_money/:order_pay_id/:uid/:pid/:tag",
    component: Alipay,
    name: "love_alipay",
    meta: {
      title: "支付宝",
      foot: true
    }
  },

  {
    path: "/member/alipayClockin/:status/:url",
    component: AlipayClockin,
    name: "alipayClockin",
    meta: {
      title: "支付宝",
      foot: true
    }
  },
  {
    path: "/member/alipayCourse/:status/:url",
    component: Alipay,
    name: "alipayCourse",
    meta: {
      title: "支付宝",
      foot: true
    }
  },
  {
    path: "/member/orderList/:status",
    component: OrderList,
    name: "orderlist",
    meta: {
      title: "我的订单",
      foot: true
    }
  },
  {
    path: "/member/orderList/:status/:orderType",
    component: OrderList,
    name: "cashierOrderlist",
    meta: {
      title: "订单",
      foot: true
    }
  },
  {
    path: "/member/orderList/:status/:orderType",
    component: OrderList,
    name: "storeOrderlist",
    meta: {
      title: "订单",
      foot: true
    }
  },
  {
    path: "/member/orderList/:status/:orderType",
    component: OrderList,
    name: "supplierOrderlist",
    meta: {
      title: "订单",
      foot: true
    }
  },
  {
    path: "/member/orderList/:status/:orderType",
    component: OrderList,
    name: "hotelOrderlist",
    meta: {
      title: "酒店订单",
      foot: true
    }
  },
  {
    path: "/onlineCar/orderList/:status/:orderType",
    component: OrderList,
    name: "onlineCarOrderlist",
    meta: {
      title: "网约车订单",
      foot: true
    }
  },
  {
    path: "/groups/orderList/:status/:orderType",
    component: OrderList,
    name: "GroupOrderlist",
    meta: {
      title: "拼团订单",
      foot: true
    }
  },
  {
    path: "/lease_toy/orderList/:status/:orderType",
    component: OrderList,
    name: "lease_toyOrderlist",
    meta: {
      title: "租赁订单",
      foot: true
    }
  },
  {
    path: "/deliveryStation/DeliveryOrderList/:status/:orderType",
    component: OrderList,
    name: "DeliveryOrderList",
    meta: {
      title: "配送订单",
      foot: true
    }
  },
  {
    path: "/deliveryStation/DeliveryReplenish/:status/:orderType",
    component: OrderList,
    name: "DeliveryReplenish",
    meta: {
      title: "补货单",
      foot: true
    }
  },
  {
    path: "/serviceStation/hireCarOrderList/:status/:orderType",
    component: OrderList,
    name: "hireCarOrderList",
    meta: {
      title: "分期购车订单",
      foot: true
    }
  },
  {
    path: "/hireCar/serviceReplenish/:status/:orderType",
    component: OrderList,
    name: "serviceReplenish",
    meta: {
      title: "补货单",
      foot: true
    }
  },
  {
    path: "/member/express/:refund_id",
    component: OrderExpress,
    name: "express",
    meta: {
      title: "退款快递信息",
      foot: true
    }
  },
  {
    path: "/member/orderdetail/:order_id",
    component: Goodsinfo,
    name: "orderdetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/member/orderdetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "cashierOrderdetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/member/orderdetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "storeOrderdetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/member/orderdetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "supplierOrderdetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/member/logistics",
    component: Logistics,
    name: "logistics",
    meta: {
      title: "物流详情",
      foot: true
    }
  },
  {
    path: "/member/track",
    component: track,
    name: "track",
    meta: {
      title: "物流轨迹",
      foot: true
    }
  },
  {
    path: "/member/evaluate/:order_id/:goods",
    component: Evaluate,
    name: "evaluate",
    meta: {
      title: "评价",
      foot: true
    }
  },
  {
    path: "/member/replyEvaluate",
    component: ReplyEvaluate,
    name: "replyEvaluate",
    meta: {
      title: "回复评论",
      foot: true
    }
  },
  {
    path: "/member/addevaluate",
    component: Addevaluate,
    name: "addevaluate",
    meta: {
      title: "追加评价",
      foot: true
    }
  },
  {
    path: "/member/refund/:order_id/:type",
    component: Refund,
    name: "refund",
    meta: {
      title: "申请售后",
      foot: true
    }
  },
  {
    path: "/member/aftersaleslist",
    component: Aftersaleslist,
    name: "aftersaleslist",
    meta: {
      title: "售后列表",
      foot: true
    }
  },
  {
    path: "/member/aftersales/:refund_id",
    component: Aftersales,
    name: "aftersales",
    meta: {
      title: "售后详情",
      foot: true
    }
  },
  {
    path: "/member/orderpay/:order_ids",
    component: OrderPay,
    name: "orderpay",
    meta: {
      title: "订单支付",
      foot: true
    }
  },
  {
    path: "/member/order/verification/:order_id/:api",
    component: OrderVerification,
    name: "orderVerification",
    meta: {
      title: "订单核销",
      foot: true
    }
  },
  {
    path: "/member/order/cash/:order_pay_id/:pid",
    component: OrderCash,
    name: "orderCash",
    meta: {
      title: "门店支付",
      foot: true
    }
  },
  {
    path: "/member/orderrecord/:order_id",
    component: OrderRecord,
    name: "OrderRecord",
    meta: {
      title: "汇款记录",
      foot: true
    }
  },

  // {path: '/member/orderpay/:status/:order_ids', component: OrderPay, name: 'orderpay',meta: { title: '订单支付', foot:true }},
  // orderpay
  {
    path: "/member/payErr",
    component: PayErr,
    name: "payErr",
    meta: {
      title: "支付取消或失败",
      foot: "true"
    }
  }, // 支付错误
  {
    path: "/member/payYes",
    component: PayYes,
    name: "PayYes",
    meta: {
      title: "支付成功",
      foot: "true"
    }
  }, // 支付成功
  {
    path: "/member/blacklist",
    component: Blacklist,
    name: "blacklist",
    meta: {
      title: "黑名单",
      foot: "true"
    }
  },
  {
    path: "/member/mandate",
    component: Mandate,
    name: "mandate",
    meta: {
      title: "微信授权失败",
      foot: "true"
    }
  },
  // coupon
  {
    path: "/coupon/coupon_index",
    component: Coupon,
    name: "coupon",
    meta: {
      title: "优惠券",
      foot: true
    }
  },
  {
    path: "/coupon/coupon_store",
    component: CouponStore,
    name: "couponStore",
    meta: {
      title: "领券中心",
      foot: true
    }
  },
  {
    path: "/coupon/coupon_info",
    component: CouponInfo,
    name: "couponInfo",
    meta: {
      title: "详情",
      foot: true
    }
  },
  {
    path: "/coupon/share/:order_id",
    component: CouponShare,
    name: "couponShare",
    meta: {
      title: "分享优惠券",
      foot: true
    }
  },
  {
    path: "/coupon/get_coupon/:order_id",
    component: getCoupon,
    name: "getCoupon",
    meta: {
      title: "领取优惠券",
      foot: true
    }
  },
  // plug
  // {
  //   path: '/member/marketing',
  //   component: Marketing,
  //   name: 'marketing',
  //   meta: {
  //     title: '营销工具',
  //     foot: true
  //   }
  // },
  // {
  //   path: '/member/messageSettings',
  //   component: MessageSettings,
  //   name: 'messageSettings',
  //   meta: {
  //     title: '消息提醒设置',
  //     foot: true
  //   }
  // },
  // Other
  {
    path: "/search",
    component: Search,
    name: "search",
    meta: {
      title: "搜索",
      foot: true
    }
  },
  {
    path: "/searchall",
    component: SearchAll,
    name: "searchAll",
    meta: {
      title: "全部商品",
      foot: true
    }
  },
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: {
      title: "登录",
      foot: true
    }
  },
  {
    path: "/register",
    component: Register,
    name: "register",
    meta: {
      title: "注册",
      foot: true
    }
  },
  {
    path: "/haifen_register",
    component: haifenRegister,
    name: "haifenRegister",
    meta: {
      title: "注册",
      foot: true
    }
  },
  {
    path: "/registerAgreement",
    component: RegisterAgreement,
    name: "registerAgreement",
    meta: {
      title: "协议",
      foot: true
    }
  },

  {
    path: "/findpwd",
    component: Findpwd,
    name: "findpwd",
    meta: {
      title: "忘记密码",
      foot: true
    }
  },
  {
    path: "/register_guide",
    component: RegisterGuide,
    name: "RegisterGuide",
    meta: {
      title: "下载APP",
      foot: true
    }
  },
  {
    path: "/category",
    component: Category,
    name: "category",
    meta: {
      title: "分类",
      foot: false
    }
  },
  {
    path: "/catelist/:id",
    component: Catelist,
    name: "catelist",
    meta: {
      title: "分类列表",
      foot: true
    }
  },
  {
    path: "/brand",
    component: Brand,
    name: "brand",
    meta: {
      title: "品牌",
      foot: false
    }
  },
  {
    path: "/brandgoods/:id",
    component: BrandGoods,
    name: "brandgoods",
    meta: {
      title: "品牌商品",
      foot: true
    }
  },
  {
    path: "/cart",
    component: Cart,
    name: "cart",
    meta: {
      title: "购物车",
      foot: false
    }
  },
  {
    path: "/cart/settlement",
    component: Settlement,
    name: "settlement",
    meta: {
      title: "结算",
      foot: true
    }
  },
  {
    path: "/goods/:id",
    component: Goods,
    name: "goods",
    meta: {
      title: "商品详情",
      foot: true
    }
  },
  {
    path: "/comment/:id",
    component: GoodsComment,
    name: "GoodsComment",
    meta: {
      title: "商品评论",
      foot: true
    }
  },
  {
    path: "/packageGoods/:id",
    component: PackageGoods,
    name: "packageGoods",
    meta: {
      title: "商品套餐页",
      foot: true
    }
  },
  {
    path: "/goods/:id/:tag/:store_id",
    component: GoodsO2O,
    name: "goodsO2O",
    meta: {
      title: "商品详情",
      foot: true
    }
  },
  // 扫码柜子商品
  {
    path: "/goods/:id/:mark",
    component: CupGoods,
    name: "CupGoods",
    meta: {
      title: "商品详情",
      foot: true
    }
  },
  // {path: '/goodsorder/:tag/:goodsId/:optionsId/:total/:cart_ids', component: GoodsOrder,name: 'goodsorder',meta: {  title: '填写订单', foot:true }},
  {
    path: "/orderDiyForm/:id",
    component: GoodsOrderDiyForm,
    name: "GoodsOrderDiyForm",
    meta: {
      title: "填写资料",
      foot: true
    }
  },
  {
    path: "/goodsorder",
    component: GoodsOrder,
    name: "goodsorder",
    meta: {
      title: "填写订单",
      foot: true
    }
  },
  {
    path: "/goods/goodstabs/:id/:goods",
    component: Goodstabs,
    name: "goodstab",
    meta: {
      title: "商品详情内容",
      foot: true
    }
  },
  // {path:'/addons/yun_shop',redirect:'/'}

  // sign
  {
    path: "/member/sign",
    component: Sign,
    name: "sign",
    meta: {
      title: "签到",
      foot: true
    }
  },
  {
    path: "/member/signrules",
    component: Signrules,
    name: "signrules",
    meta: {
      title: "规则说明",
      foot: true
    }
  },
  {
    path: "/member/signrecord",
    component: Signrecord,
    name: "signrecord",
    meta: {
      title: "签到记录",
      foot: true
    }
  },
  // 排行榜
  {
    path: "/ranking/index",
    component: RankingIndex,
    name: "rankingIndex",
    meta: {
      title: "排行榜",
      foot: true
    }
  },
  {
    path: "/ranking/list/first/:action/:key",
    component: RankingListFirst,
    name: "rankingListFirst",
    meta: {
      title: "排行榜列表",
      foot: true
    }
  },
  {
    path: "/ranking/list/second/:action",
    component: RankingListSecond,
    name: "rankingListSecond",
    meta: {
      title: "排行榜列表",
      foot: true
    }
  },

  // service
  // 手机充值 ServiceOrderList
  {
    path: "/service",
    component: Service,
    name: "service",
    meta: {
      title: "我的服务",
      foot: true
    }
  },
  {
    path: "/serviceOrderList/:status",
    component: ServiceOrderList,
    name: "serviceOrderList",
    meta: {
      title: "服务订单列表",
      foot: true
    }
  },

  {
    path: "/phoneRecharge",
    component: PhoneRecharge,
    name: "phoneRecharge",
    meta: {
      title: "手机充值",
      foot: true
    }
  },
  {
    path: "/mobileBinding",
    component: MobileBinding,
    name: "mobileBinding",
    meta: {
      title: "手机绑定列表",
      foot: true
    }
  },
  {
    path: "/rechargePay",
    component: RechargePay,
    name: "rechargePay",
    meta: {
      title: "充值支付",
      foot: true
    }
  },
  {
    path: "/orderDetailsPaied",
    component: OrderDetailsPaied,
    name: "orderDetailsPaied",
    meta: {
      title: "已支付",
      foot: true
    }
  },
  {
    path: "/orderDetailsNoPay",
    component: OrderDetailsNoPay,
    name: "orderDetailsNoPay",
    meta: {
      title: "未支付",
      foot: true
    }
  },
  {
    path: "/rechargeRecord",
    component: RechargeRecord,
    name: "rechargeRecord",
    meta: {
      title: "手机充值记录",
      foot: true
    }
  },
  {
    path: "/flowRechargeRecord",
    component: FlowRechargeRecord,
    name: "flowRechargeRecord",
    meta: {
      title: "流量充值记录",
      foot: true
    }
  },
  {
    path: "/rechargeDetail/:orderId",
    component: RechargeDetail,
    name: "rechargeDetail",
    meta: {
      title: "记录详情",
      foot: true
    }
  },
  {
    path: "/flowRechargeDetail/:orderId",
    component: FlowRechargeDetail,
    name: "flowRechargeDetail",
    meta: {
      title: "流量记录详情",
      foot: true
    }
  },

  // 油卡充值
  {
    path: "/addCard/:tag",
    component: AddCard,
    name: "addCard",
    meta: {
      title: "新增油卡",
      foot: true
    }
  },
  {
    path: "/cardServer",
    component: CardServer,
    name: "cardServer",
    meta: {
      title: "油卡服务",
      foot: true
    }
  },
  {
    path: "/oilNoPay",
    component: OilNoPay,
    name: "oilNoPay",
    meta: {
      title: "油卡支付",
      foot: true
    }
  },
  {
    path: "/oilDetailsPaied",
    component: OilDetailsPaied,
    name: "oilDetailsPaied",
    meta: {
      title: "油卡支付",
      foot: true
    }
  },
  {
    path: "/oilRecharge/:tag",
    component: OilRecharge,
    name: "oilRecharge",
    meta: {
      title: "油卡支付",
      foot: true
    }
  },
  {
    path: "/oilRechargePay/:para",
    component: OilRechargePay,
    name: "oilRechargePay",
    meta: {
      title: "油卡支付",
      foot: true
    }
  },

  // Ticket机票
  {
    path: "/ticket",
    component: Ticket,
    name: "ticket",
    meta: {
      title: "国内机票",
      foot: true
    }
  },
  {
    path: "/ticket/city",
    component: City,
    name: "city",
    meta: {
      title: "城市",
      foot: true
    }
  },
  {
    path: "/ticketOrder",
    component: TicketOrder,
    name: "ticketOrder",
    meta: {
      title: "机票订单",
      foot: true
    }
  },
  {
    path: "/searchResults",
    component: SearchResults,
    name: "searchResults",
    meta: {
      title: "搜索航班结果",
      foot: true
    }
  },
  {
    path: "/flightPrice/:id",
    component: FlightPrice,
    name: "flightPrice",
    meta: {
      title: "航班价格",
      foot: true
    }
  },
  {
    path: "/newAddPassenger",
    component: NewAddPassenger,
    name: "newAddPassenger",
    meta: {
      title: "新增乘机人",
      foot: true
    }
  },
  {
    path: "/modifyContacts",
    component: ModifyContacts,
    name: "modifyContacts",
    meta: {
      title: "修改联系人",
      foot: true
    }
  },

  {
    path: "/addOrder/:id/:parentId",
    component: AddOrder,
    name: "addOrder",
    meta: {
      title: "添加订单",
      foot: true
    }
  },
  {
    path: "/refundApplication",
    component: RefundApplication,
    name: "refundApplication",
    meta: {
      title: "退票申请",
      foot: true
    }
  },
  {
    path: "/ticketOrderDetail",
    component: TicketOrderDetail,
    name: "ticketOrderDetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/changeAgreement",
    component: ChangeAgreement,
    name: "changeAgreement",
    meta: {
      title: "改退协议",
      foot: true
    }
  },
  {
    path: "/ticket_pay/:para",
    component: Ticket_pay,
    name: "ticket_pay",
    meta: {
      title: "机票下单",
      foot: true
    }
  },

  // game
  {
    path: "/gameSearch",
    component: GameSearch,
    name: "gameSearch",
    meta: {
      title: "游戏搜索",
      foot: true
    }
  },
  {
    path: "/gameIsPay",
    component: GameIsPay,
    name: "gameIsPay",
    meta: {
      title: "游戏已支付",
      foot: true
    }
  },
  {
    path: "/gameNoPay",
    component: GameNoPay,
    name: "gameNoPay",
    meta: {
      title: "游戏未支付",
      foot: true
    }
  },
  {
    path: "/gameFlingRecharge",
    component: GameFlingRecharge,
    name: "gameFlingRecharge",
    meta: {
      title: "游戏直冲充值",
      foot: true
    }
  },
  {
    path: "/gamePasswordRecharge",
    component: GamePasswordRecharge,
    name: "gamePasswordRecharge",
    meta: {
      title: "游戏卡密充值",
      foot: true
    }
  },

  // newService
  {
    path: "/lifeService",
    component: LifeService,
    name: "lifeService",
    meta: {
      title: "生活缴费",
      foot: true
    }
  },
  {
    path: "/lifeService/telephone",
    component: Telephone,
    name: "telephone",
    meta: {
      title: "话费充值",
      foot: true,
      notKeepAlive: true
    }
  },
  {
    path: "/lifeService/flow",
    component: Flow,
    name: "flow",
    meta: {
      title: "流量",
      foot: true,
      notKeepAlive: true
    }
  },
  // lifePayment
  {
    path: "/electricity",
    component: Electricity,
    name: "electricity",
    meta: {
      title: "电费",
      foot: true
    }
  },
  {
    path: "/electricityPay/:para",
    component: ElectricityPay,
    name: "electricityPay",
    meta: {
      title: "电费支付",
      foot: true
    }
  },
  {
    path: "/waterFee",
    component: WaterFee,
    name: "waterFee",
    meta: {
      title: "水费",
      foot: true
    }
  },
  {
    path: "/waterFeePay/:para",
    component: WaterFeePay,
    name: "waterFeePay",
    meta: {
      title: "水费支付",
      foot: true
    }
  },
  {
    path: "/fixedTelephone",
    component: FixedTelephone,
    name: "fixedTelephone",
    meta: {
      title: "固话",
      foot: true
    }
  },
  {
    path: "/fixedTelephonePay/:para",
    component: FixedTelephonePay,
    name: "fixedTelephonePay",
    meta: {
      title: "固话支付",
      foot: true
    }
  },

  {
    path: "/broadband",
    component: Broadband,
    name: "broadband",
    meta: {
      title: "宽带",
      foot: true
    }
  },
  {
    path: "/broadbandPay/:para",
    component: BroadbandPay,
    name: "broadbandPay",
    meta: {
      title: "宽带支付",
      foot: true
    }
  },

  {
    path: "/gasCosts",
    component: GasCosts,
    name: "gasCosts",
    meta: {
      title: "燃气费",
      foot: true
    }
  },

  {
    path: "/lifePayNoPay",
    component: LifePayNoPay,
    name: "lifePayNoPay",
    meta: {
      title: "未支付",
      foot: true
    }
  },
  {
    path: "/lifePayIsPaied",
    component: LifePayIsPaied,
    name: "lifePayIsPaied",
    meta: {
      title: "已支付",
      foot: true
    }
  },
  {
    path: "/lifePayIndex",
    component: LifePayIndex,
    name: "lifePayIndex",
    meta: {
      title: "生活缴费",
      foot: true
    }
  },
  {
    path: "/paymentRecord",
    component: PaymentRecord,
    name: "paymentRecord",
    meta: {
      title: "缴费记录",
      foot: true
    }
  },

  // 交通罚款
  {
    path: "/trafficIndex",
    component: TrafficIndex,
    name: "trafficIndex",
    meta: {
      title: "交通罚款",
      foot: true
    }
  },
  {
    path: "/trafficConfirmOrder",
    component: TrafficConfirmOrder,
    name: "trafficConfirmOrder",
    meta: {
      title: "交通罚款下单",
      foot: true
    }
  },
  {
    path: "/trafficCity",
    component: TrafficCity,
    name: "trafficCity",
    meta: {
      title: "选择城市",
      foot: true
    }
  },
  {
    path: "/trafficRecord",
    component: TrafficRecord,
    name: "trafficRecord",
    meta: {
      title: "罚款记录",
      foot: true
    }
  },
  {
    path: "/trafficOrderNoPay",
    component: TrafficOrderNoPay,
    name: "trafficOrderNoPay",
    meta: {
      title: "缴费未支付",
      foot: true
    }
  },
  {
    path: "/trafficOrderlsPaied",
    component: TrafficOrderlsPaied,
    name: "trafficOrderlsPaied",
    meta: {
      title: "缴费支付中",
      foot: true
    }
  },
  // Train ticket 火车票
  {
    path: "/trainTicket",
    component: TrainTicket,
    name: "trainTicket",
    meta: {
      title: "火车票",
      foot: true
    }
  },
  {
    path: "/trainTicketOrder",
    component: TrainTicketOrder,
    name: "trainTicketOrder",
    meta: {
      title: "我的订单",
      foot: true
    }
  },
  {
    path: "/trainCity",
    component: TrainCity,
    name: "trainCity",
    meta: {
      title: "城市",
      foot: true
    }
  },
  {
    path: "/trainSearchResults",
    component: TrainSearchResults,
    name: "trainSearchResults",
    meta: {
      title: "搜索结果",
      foot: true
    }
  },
  {
    path: "/trainFlightPrice/:id",
    component: TrainFlightPrice,
    name: "trainFlightPrice",
    meta: {
      title: "班次列表",
      foot: true
    }
  },
  {
    path: "/trainAddOrder/:id/:parentId",
    component: TrainAddOrder,
    name: "trainAddOrder",
    meta: {
      title: "确认订单",
      foot: true
    }
  },
  {
    path: "/trainOrderDetail",
    component: TrainOrderDetail,
    name: "trainOrderDetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/trainRefundApplication",
    component: TrainRefundApplication,
    name: "trainRefundApplication",
    meta: {
      title: "退票申请",
      foot: true
    }
  },
  {
    path: "/policy",
    component: Policy,
    name: "policy",
    meta: {
      title: "我的保单",
      foot: true
    }
  },
  {
    path: "/train_pay/:para",
    component: TrainPay,
    name: "train_pay",
    meta: {
      title: "火车票支付",
      foot: true
    }
  },
  //代理商分红
  {
    path: "/AgentBonus",
    component: AgentBonus,
    name: "AgentBonus",
    meta: {
      title: "代理商分红",
      foot: true
    }
  },
  {
    path: "/CartGood/:id",
    component: CartGood,
    name: "CartGood",
    meta: {
      title: "商品详情",
      foot: true
    }
  },
  {
    path: "/GroupOrder",
    component: GroupOrder,
    name: "GroupOrder",
    meta: {
      title: "团队订单",
      foot: true
    }
  },
  {
    path: "/ApplicationProgress/:id",
    component: ApplicationProgress,
    name: "ApplicationProgress",
    meta: {
      title: "购车进度",
      foot: true
    }
  },
  {
    path: "/AgentCustomer",
    component: AgentCustomer,
    name: "AgentCustomer",
    meta: {
      title: "我的客户",
      foot: true
    }
  },
  {
    path: "/InstallmentRecord",
    component: InstallmentRecord,
    name: "InstallmentRecord",
    meta: {
      title: "分期记录",
      foot: true
    }
  },

  // rentCenter
  {
    path: "/rentIndex",
    component: RentIndex,
    name: "rentIndex",
    meta: {
      title: "首页",
      foot: true
    }
  },
  {
    path: "/goodsDetail/:id",
    component: GoodsDetail,
    name: "goodsDetail",
    meta: {
      title: "商品详情",
      foot: true
    }
  },
  // { path: '/confirmOrder/:goodsId/:optionsId/:total/:rentDate/:rentDay', component: ConfirmOrder, name: 'confirmOrder', meta: { title: '确认下单', foot: true } },
  {
    path: "/confirmOrder",
    component: ConfirmOrder,
    name: "confirmOrder",
    meta: {
      title: "确认下单",
      foot: true
    }
  },
  {
    path: "/rentOrderPay",
    component: RentOrderPay,
    name: "rentOrderPay",
    meta: {
      title: "订单支付",
      foot: true
    }
  },

  {
    path: "/rentCenter",
    component: RentCenter,
    name: "rentCenter",
    meta: {
      title: "租赁中心",
      foot: true
    }
  },
  {
    path: "/rentMyOrder/:status",
    component: RentMyOrder,
    name: "rentMyOrder",
    meta: {
      title: "我的租借",
      foot: true
    }
  },
  {
    path: "/rentCharge",
    component: RentCharge,
    name: "rentCharge",
    meta: {
      title: "押金充值",
      foot: true
    }
  },
  {
    path: "/rentDeposit",
    component: RentDeposit,
    name: "rentDeposit",
    meta: {
      title: "押金提现",
      foot: true
    }
  },
  {
    path: "/rentDepositDetail",
    component: RentDepositDetail,
    name: "rentDepositDetail",
    meta: {
      title: "押金明细",
      foot: true
    }
  },
  {
    path: "/rentReturnGoods/:id",
    component: RentReturnGoods,
    name: "rentReturnGoods",
    meta: {
      title: "归还商品",
      foot: true
    }
  },

  {
    path: "/toBePay/:id",
    component: ToBePay,
    name: "toBePay",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/toBeSend/:id",
    component: ToBeSend,
    name: "toBeSend",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/toBetakeGoods/:id",
    component: ToBetakeGoods,
    name: "toBetakeGoods",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/toBeReturneding/:id",
    component: ToBeReturneding,
    name: "toBeReturneding",
    meta: {
      title: "订单详情",
      foot: true
    }
  },

  {
    path: "/toBeClose/:id",
    component: ToBeClose,
    name: "toBeClose",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/toBeComplete/:id",
    component: ToBeComplete,
    name: "toBeComplete",
    meta: {
      title: "订单详情",
      foot: true
    }
  },

  {
    path: "/toBeReturned/:id",
    component: ToBeReturned,
    name: "toBeReturned",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  {
    path: "/overdueReturn",
    component: OverdueReturn,
    name: "overdueReturn",
    meta: {
      title: "逾期未归还",
      foot: true
    }
  },
  {
    path: "/hasTransferred",
    component: HasTransferred,
    name: "hasTransferred",
    meta: {
      title: "已转赠",
      foot: true
    }
  },
  {
    path: "/hasBeenReturned",
    component: HasBeenReturned,
    name: "hasBeenReturned",
    meta: {
      title: "已归还",
      foot: true
    }
  },
  {
    path: "/transferRecord",
    component: TransferRecord,
    name: "transferRecord",
    meta: {
      title: "转赠记录",
      foot: true
    }
  },
  {
    path: "/rentGuide",
    component: RentGuide,
    name: "rentGuide",
    meta: {
      title: "租赁指南",
      foot: true
    }
  },
  {
    path: "/rentAfterSalas",
    component: RentAfterSalas,
    name: "rentAfterSalas",
    meta: {
      title: "售后列表（待退款）",
      foot: true
    }
  },
  {
    path: "/returnRecord",
    component: ReturnRecord,
    name: "returnRecord",
    meta: {
      title: "归还记录",
      foot: true
    }
  },

  // 招商中心
  {
    path: "/member/enterprise/index",
    component: EnterpriseIndex,
    name: "enterprise_index",
    meta: {
      title: "招商",
      foot: true
    }
  },
  {
    path: "/member/enterprise/apply",
    component: EnterpriseApply,
    name: "enterprise_apply",
    meta: {
      title: "招商",
      foot: true
    }
  },
  {
    path: "/member/enterprise/supplier",
    component: EnterpriseSupplier,
    name: "enterprise_supplier",
    meta: {
      title: "我的供应商",
      foot: true
    }
  },
  {
    path: "/member/enterprise/supplierInfo/:id",
    component: EnterpriseSupplierInfo,
    name: "enterprise_supplier_info",
    meta: {
      title: "供应商详情",
      foot: true
    }
  },
  {
    path: "/member/enterprise/center/apply",
    component: EnterpriseCenterApply,
    name: "enterprose_center_apply",
    meta: {
      title: "招商中心",
      foot: true
    }
  },
  {
    path: "/member/enterprise/center/supplier",
    component: EnterpriseCenterSupplier,
    name: "enterprise_center_supplier",
    meta: {
      title: "我的供应商",
      foot: true
    }
  },
  // 招商-我的门店
  {
    path: "/member/enterprise/store/:type",
    component: EnterpriseStore,
    name: "enterprise_store",
    meta: {
      title: "招商-我的门店",
      foot: true
    }
  },

  // 订单全返
  {
    path: "/member/income/singleReturn",
    component: SingleReturnCenter,
    name: "single_return_center",
    meta: {
      title: "订单返现",
      foot: true
    }
  },
  {
    path: "/member/income/singleReturnListInfo/:id",
    component: SingleReturnListInfo,
    name: "single_return_list_info",
    meta: {
      title: "返现详情",
      foot: true
    }
  },

  // 团队等级全返
  {
    path: "/member/income/teamLevelReturn",
    component: TeamLevelReturnCenter,
    name: "teamlevel_return_center",
    meta: {
      title: "团队返现",
      foot: true
    }
  },
  {
    path: "/member/income/teamLevelReturnListInfo/:id",
    component: TeamLevelReturnListInfo,
    name: "teamlevel_return_list_info",
    meta: {
      title: "返现详情",
      foot: true
    }
  },

  // 消费全返
  {
    path: "/member/income/consumeReturn",
    component: ConsumeReturnCenter,
    name: "consume_return_center",
    meta: {
      title: "消费返现",
      foot: true
    }
  },
  {
    path: "/member/income/consumeReturnListInfo/:id",
    component: ConsumeReturnListInfo,
    name: "consume_return_list_info",
    meta: {
      title: "返现详情",
      foot: true
    }
  },

  // 满额全返
  {
    path: "/member/income/fullReturn",
    component: FullReturnCenter,
    name: "full_return_center",
    meta: {
      title: "满额返现",
      foot: true
    }
  },
  {
    path: "/member/income/fullReturnListInfo/:id",
    component: FullReturnListInfo,
    name: "full_return_list_info",
    meta: {
      title: "返现详情",
      foot: true
    }
  },

  // 股东分红
  {
    path: "/member/income/shareholderDividend",
    component: ShareholderDividend,
    name: "shareholder_dividend",
    meta: {
      title: "股东分红",
      foot: true
    }
  },
  // 股东奖励
  {
    path: "/member/income/ShareholderReward",
    component: ShareholderReward,
    name: "ShareholderReward",
    meta: {
      title: "股东奖励",
      foot: true
    }
  },

  // 分销商全返
  {
    path: "/member/income/level_return",
    component: LevelReturn,
    name: "level_return",
    meta: {
      title: "分销商全返",
      foot: true
    }
  },

  {
    path: "/love_trading",
    component: Love_trading,
    name: "love_trading",
    meta: {
      title: "交易中心",
      foot: true
    }
  },
  {
    path: "/love_trading_sell",
    component: Love_trading_sell,
    name: "love_trading_sell",
    meta: {
      title: "爱心值出售",
      foot: true
    }
    // },
    // //visit 邀请码
    // {
    //   path: '/visit',
    //   component: Visit,
    //   name: 'visit',
    //   meta: {
    //     title: '邀请码',
    //     foot: true
    //   }
  },
  {
    path: "/transformLoveV",
    component: Love_trading_sell,
    name: "transformLoveV",
    meta: {
      title: "转化爱心值",
      foot: true
    }
  },

  // 收银台
  {
    path: "/cashier",
    component: cashier,
    name: "cashier",
    meta: {
      title: "收银台",
      foot: true
    }
  },
  {
    path: "/cashier_pay/:store_id",
    component: cashier_pay,
    name: "cashier_pay",
    meta: {
      title: "收银台",
      foot: true
    }
  },
  {
    path: "/cashier_qr",
    component: cashier_qr,
    name: "cashier_qr",
    meta: {
      title: "二维码",
      foot: true,
      notKeepAlive: true
    }
  },
  {
    path: "/cashier_withdrawals",
    component: cashier_withdrawals,
    name: "cashier_withdrawals",
    meta: {
      title: "提现",
      foot: true
    }
  },
  {
    path: "/cashier_stat",
    component: cashier_stat,
    name: "cashier_stat",
    meta: {
      title: "统计结算",
      foot: true
    }
  },
  {
    path: "/show_balances/:pay_sn/:pay_type",
    component: show_balances,
    name: "showBalances",
    meta: {
      title: "支付奖励",
      foot: true
    }
  },
  {
    path: "/distribution_stat",
    component: cashier_stat,
    name: "distribution_stat",
    meta: {
      title: "统计结算",
      foot: true
    }
  },
  {
    path: "/o2o/home",
    component: o2oHome,
    name: "o2oHome",
    meta: {
      title: "",
      foot: false
    }
  },
  {
    path: "/o2o/store/:store_id",
    component: o2oStore,
    name: "o2oStore",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/store_v2/:store_id",
    component: o2oStore_v2,
    name: "o2oStore_v2",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/location",
    component: o2oLocation,
    name: "o2oLocation",
    meta: {
      title: "",
      foot: false
    }
  },
  {
    path: "/o2o/location/location",
    component: o2oLocation_loc,
    name: "o2oLocation_loc",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/location/city",
    component: o2oCity,
    name: "o2oCity",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/search/:city/:point",
    component: o2oSearch,
    name: "o2oSearch",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/category/:id",
    component: o2oCategory,
    name: "o2oCategory",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/storeApply",
    component: StoreApply,
    name: "storeApply",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/storeWithdrawals",
    component: StoreWithdrawals,
    name: "storeWithdrawals",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/o2o/store_manage",
    component: StoreManage,
    name: "storeManage",
    meta: {
      title: "门店中心",
      foot: true
    }
  },
  {
    path: "/o2o/cloud_horn",
    component: cloudHorn,
    name: "cloudHorn",
    meta: {
      title: "云喇叭绑定",
      foot: true
    }
  },
  {
    path: "/o2o/zkz_device",
    component: zkzDevice,
    name: "zkzDevice",
    meta: {
      title: "zkc设备绑定",
      foot: true
    }
  },
  {
    path: "/o2o/qr_code/:store_id",
    component: qrCode,
    name: "qrCode",
    meta: {
      title: "门店二维码",
      foot: true
    }
  },
  // {
  //   path: "/o2o/privacy",
  //   component: privacy,
  //   name: "privacy",
  //   meta: {
  //     title: "隐私",
  //     foot: true
  //   }
  // },
  {
    path: "/store/search/:store_id",
    component: StoreSearch,
    name: "StoreSearch",
    meta: {
      title: "商品搜索",
      foot: true
    }
  },

  {
    path: "/conference/conferenceList",
    component: conferenceList,
    name: "conferenceList",
    meta: {
      title: "活动列表",
      foot: true
    }
  },
  {
    path: "/conference/activity/:id",
    component: activity,
    name: "activity",
    meta: {
      title: "活动",
      foot: true
    }
  },
  {
    path: "/conference/my_activity_info/:id",
    component: MyActivityInfo,
    name: "myActivityInfo",
    meta: {
      title: "活动信息",
      foot: true
    }
  },
  {
    path: "/conference/sign/:id",
    component: conferenceSign,
    name: "conferenceSign",
    meta: {
      title: "活动签到",
      foot: true
    }
  },
  {
    path: "/activity/task/list/:id",
    component: ActivityTaskList,
    name: "activityTaskList",
    meta: {
      title: "活动任务",
      foot: true
    }
  },

  {
    path: "/clockin",
    component: ClockPunch,
    name: "ClockPunch",
    meta: {
      title: "早起打卡",
      foot: true
    }
  },
  {
    path: "/clockin/clockinrule",
    component: ClockPunchRule,
    name: "ClockPunchRule",
    meta: {
      title: "挑战规则",
      foot: true
    }
  },
  {
    path: "/clockin/clockinrecord",
    component: ClockPunchRecord,
    name: "ClockPunchRecord",
    meta: {
      title: "我的战绩",
      foot: true
    }
  },
  {
    path: "/member/myrelationsearch",
    component: MyRelationshipSearch,
    name: "MyRelationshipSearch",
    meta: {
      title: "我的关系",
      foot: true
    }
  },
  {
    path: "/rechargeCode",
    component: RechargeCode,
    name: "rechargeCode",
    meta: {
      title: "充值码",
      foot: true
    }
  },
  {
    path: "/rechargeCodeByQrCode/:qrCode",
    component: RechargeCode,
    name: "rechargeCodeByQrCode",
    meta: {
      title: "充值码",
      foot: true
    }
  },
  {
    path: "/o2o/home/homeseller/:store_id",
    component: HomeSeller,
    name: "HomeSeller",
    meta: {
      title: "商家",
      foot: true
    }
  },
  // {
  //   path: '/o2o/home/homeseller/detail/:store_id',
  //   component: HomeSellerDetail,
  //   name: 'HomeSellerDetail',
  //   meta: {
  //     title: '商家详情',
  //     foot: true
  //   }
  // },
  {
    path: "/o2o/home/homeseller/address/:store_id",
    component: HomeSellerAddress,
    name: "HomeSellerAddress",
    meta: {
      title: "门店地址",
      foot: true
    }
  },

  // 代付
  {
    path: "/member/payanother/:order_id",
    component: PayAnother,
    name: "PayAnother",
    meta: {
      title: "代付",
      foot: true
    }
  },

  // 代付详情
  {
    path: "/member/payanotherdetail",
    component: PayAnotherDetail,
    name: "PayAnotherDetail",
    meta: {
      title: "代付详情",
      foot: true
    }
  },

  // 保税真实信息添加
  {
    path: "/member/address/myinfo",
    component: MyInfo,
    name: "myinfo",
    meta: {
      title: "我的信息",
      foot: true
    }
  },

  // 课程中心
  {
    path: "/member/courseindex",
    component: CourseIndex,
    name: "CourseIndex",
    meta: {
      title: "课程",
      foot: false
    }
  },

  // 课程搜索
  {
    path: "/member/coursesearch/:goods_type",
    component: CourseSearch,
    name: "CourseSearch",
    meta: {
      title: "精选推荐课程",
      foot: true
    }
  },

  // 课程管理

  {
    path: "/member/coursemanage",
    component: CourseManage,
    name: "CourseManage",
    meta: {
      title: "我的课程",
      foot: true
    }
  },

  // 课程详情
  {
    path: "/member/coursedetail/:goods_id",
    component: CourseDetail,
    name: "CourseDetail",
    meta: {
      title: "课程详情",
      foot: true
    }
  },

  // 课程-我的打赏

  {
    path: "/member/coursereward",
    component: CourseReward,
    name: "CourseReward",
    meta: {
      title: "我的打赏",
      foot: true
    }
  },

  // 课程-我的课程

  {
    path: "/member/mycourse",
    component: CourseMy,
    name: "CourseMy",
    meta: {
      title: "我的课程",
      foot: true
    }
  },

  // 课程-观看历史

  {
    path: "/member/coursehistory",
    component: CourseHistory,
    name: "CourseHistory",
    meta: {
      title: "观看历史",
      foot: true
    }
  },

  // 课程-升级会员

  {
    path: "/member/courselevel/:id/:goods",
    component: CourseMemberUpdate,
    name: "CourseMemberUpdate",
    meta: {
      title: "升级会员",
      foot: true
    }
  },

  // 推广申请

  {
    path: "/member/extension_apply",
    component: ExtensionApply,
    name: "ExtensionApply",
    meta: {
      title: "推广申请",
      foot: true
    }
  },
  // 会员等级列表

  {
    path: "/member/membergradelist",
    component: MemberGradeList,
    name: "MemberGradeList",
    meta: {
      title: "会员等级",
      foot: true
    }
  },

  {
    path: "/member/rightGood/:level_id",
    component: RightGood,
    name: "RightGood",
    meta: {
      title: "权益商品",
      foot: true
    }
  },
  {
    path: "/member/policyManage",
    component: policyManage,
    name: "policyManage",
    meta: {
      title: "保单管理",
      foot: true
    }
  },
  {
    path: "/member/policyAdd",
    component: policyAdd,
    name: "policyAdd",
    meta: {
      title: "保单添加",
      foot: true
    }
  },

  // 会员等级详情

  {
    path: "/member/membergradedetail/:id",
    component: MemberGradeListDetail,
    name: "MemberGradeListDetail",
    meta: {
      title: "会员等级",
      foot: true
    }
  },

  // 待退还

  {
    path: "/member/return/:id",
    component: OrderReturn,
    name: "OrderReturn",
    meta: {
      title: "退还商品",
      foot: true
    }
  },

  // 待退还中

  {
    path: "/member/returncheck/:id",
    component: OrderReturnCheck,
    name: "OrderReturnCheck",
    meta: {
      title: "退还商品",
      foot: true
    }
  },

  // 待确定

  {
    path: "/member/returnsure/:id",
    component: OrderReturnSure,
    name: "OrderReturnSure",
    meta: {
      title: "退还商品",
      foot: true
    }
  },

  // 租赁归还售后详情

  {
    path: "/member/returnafterdetail/:id",
    component: OrderReturnAftersalesDetail,
    name: "OrderReturnAftersalesDetail",
    meta: {
      title: "售后详情",
      foot: true
    }
  },

  // 会员退款迁移

  {
    path: "/member/refundsmigration",
    component: MemberRefundsMigration,
    name: "MemberRefundsMigration",
    meta: {
      title: "退款迁移",
      foot: true
    }
  },

  // 商品详情品牌

  {
    path: "/member/goodsbrand/:id",
    component: GoodsBrand,
    name: "GoodsBrand",
    meta: {
      title: "品牌详情",
      foot: true
    }
  },

  // 柜子商品中转页

  {
    path: "/member/cuptransfer/:mark",
    component: CupboardTransfer,
    name: "CupboardTransfer",
    meta: {
      title: "智能柜",
      foot: true
    }
  },

  // 柜子商品操作员页面

  {
    path: "/member/cupoperator/:id/:name/:mark",
    component: CupboardOperator,
    name: "CupboardOperator",
    meta: {
      title: "智能柜",
      foot: true
    }
  },

  // 柜子商品操作员页面--投放

  {
    path: "/member/cupdelivery/:id/:name/:mark",
    component: CupboardDelivery,
    name: "CupboardDelivery",
    meta: {
      title: "投放",
      foot: true
    }
  },

  // 柜子商品操作员页面--清空

  {
    path: "/member/cupempty/:id/:name/:mark",
    component: CupboardEmpty,
    name: "CupboardEmpty",
    meta: {
      title: "清空",
      foot: true
    }
  },

  // 区域选择页面

  {
    path: "/zone_search",
    component: ZoneChoose,
    name: "ZoneChoose",
    meta: {
      title: "区域选择",
      foot: true
    }
  },

  // 文章列表

  {
    path: "/article_list",
    component: ArticleList,
    name: "ArticleList",
    meta: {
      title: "文章列表",
      foot: true
    }
  },

  // 开户信息
  {
    path: "/member/accoutinfo",
    component: AccoutInfo,
    name: "AccoutInfo",
    meta: {
      title: "开户信息",
      foot: true
    }
  },

  // SupplierCenter 供应商管理中心

  {
    path: "/supplier_center/:uid",
    component: SupplierCenter,
    name: "SupplierCenter",
    meta: {
      title: "供应商管理",
      foot: true
    }
  },
  {
    path: "/commodity_management/:store_id/:store",
    component: CommodityManagement,
    name: "CommodityManagement",
    meta: {
      title: "商品管理",
      foot: true
    }
  },
  {
    path: "/commodity_editor/:store_id/:goods_id/:store",
    component: CommodityEditor,
    name: "CommodityEditor",
    meta: {
      title: "商品编辑",
      foot: true
    }
  },
  {
    path: "/commodity_release/:store_id/:goods_id?/:store",
    component: CommodityRelease,
    name: "CommodityRelease",
    meta: {
      title: "商品发布",
      foot: true
    }
  },
  {
    path: "/commodity_coupon",
    component: CommodityCoupon,
    name: "CommodityCoupon",
    meta: {
      title: "优惠券管理",
      foot: true
    }
  },
  {
    path: "/commodityCoupon_edit",
    component: CommodityCouponEdit,
    name: "CommodityCouponEdit",
    meta: {
      title: "优惠券编辑",
      foot: true
    }
  },
  {
    path: "/CommodityCoupon_give",
    component: CommodityCouponGive,
    name: "CommodityCouponGive",
    meta: {
      title: "优惠券发放",
      foot: true
    }
  },
  // 商品分类
  {
    path: "/goods_classify/:store_id",
    component: GoodsClassify,
    name: "GoodsClassify",
    meta: {
      title: "商品分类",
      foot: true
    }
  },
  {
    path: "/add_classify/:store_id/:classify_id/:level",
    component: AddClassify,
    name: "AddClassify",
    meta: {
      title: "添加分类",
      foot: true
    }
  },
  {
    path: "/first_edit/:store_id/:classify_id/:level",
    component: FirstEdit,
    name: "FirstEdit",
    meta: {
      title: "一级分类",
      foot: true
    }
  },

  // 供应商--信息管理

  {
    path: "/supplier_info_manage/:member_id",
    component: SupInfoManage,
    name: "SupInfoManage",
    meta: {
      title: "信息管理",
      foot: true
    }
  },

  // 转账
  {
    path: "/transfer_account/:id",
    component: TransferAccount,
    name: "TransferAccount",
    meta: {
      title: "汇款支付",
      foot: true
    }
  },

  // 排队奖励记录
  {
    path: "/reward_record",
    component: QueueRecord,
    name: "QueueRecord",
    meta: {
      title: "奖励记录",
      foot: true
    }
  },
  // 冻结币
  {
    path: "/frozen_coin",
    component: FrozenCoin,
    name: "FrozenCoin",
    meta: {
      title: "冻结币",
      foot: true
    }
  },
  {
    path: "/recharge_coin",
    component: RechargeCoin,
    name: "RechargeCoin",
    meta: {
      title: "充值",
      foot: true
    }
  },
  {
    path: "/look_details_coin",
    component: LookDetailsCoin,
    name: "LookDetailsCoin",
    meta: {
      title: "查看明细",
      foot: true
    }
  },
  {
    path: "/put_forward_coin",
    component: PutForwardCoin,
    name: "PutForwardCoin",
    meta: {
      title: "提现",
      foot: true
    }
  },

  // 登录中转页面

  {
    path: "/login_validate",
    component: LoginValidate,
    name: "LoginValidate",
    meta: {
      title: "登录",
      foot: true
    }
  },

  // 快递单
  {
    path: "/member/courier/courier",
    component: Courier,
    name: "courier",
    meta: {
      title: "快递单上传",
      foot: true
    }
  },
  {
    path: "/member/courier/courier_record",
    component: Courierrecord,
    name: "courierrecord",
    meta: {
      title: "上传记录",
      foot: true
    }
  },
  {
    path: "/member/courier/courier_detail",
    component: Courierdetail,
    name: "courierdetail",
    meta: {
      title: "记录详情",
      foot: true
    }
  },

  // 音频页
  {
    path: "/voiceList",
    component: VoiceList,
    name: "VoiceList",
    meta: { title: " ", foot: true }
  },
  {
    path: "/voiceDetail/:article_id",
    component: VoiceDetail,
    name: "VoiceDetail",
    meta: { title: " ", foot: true }
  },

  // 补货商申请

  {
    path: "/replenish_apply",
    component: ReplenishmentApply,
    name: "ReplenishmentApply",
    meta: { title: "补货商", foot: true }
  },
  // 配送站申请
  //配送站中心
  {
    path: "/delivery_apply",
    component: DeliveryTerminalApply,
    name: "DeliveryTerminalApply",
    meta: { title: "配送站", foot: true }
  },
  //配送站
  {
    path: "/delivery_station",
    component: DeliveryTerminalApply,
    name: "deliveryStation",
    meta: { title: "配送站", foot: true }
  },

  // 我要铺货
  {
    path: "/my_distribution",
    component: MyDistribution,
    name: "MyDistribution",
    meta: { title: "我要铺货", foot: true }
  },

  // 铺货单
  {
    path: "/distribution_order",
    component: DistributionOrderList,
    name: "DistributionOrderList",
    meta: { title: "铺货单", foot: true }
  },

  // 提交订单详情
  {
    path: "/distribution_orderdetail",
    component: DistributionOrderDetail,
    name: "DistributionOrderDetail",
    meta: { title: "提交订单", foot: true }
  },

  // 补货单
  {
    path: "/replenish_order",
    component: ReplenishOrderlist,
    name: "ReplenishOrderlist",
    meta: { title: "补货单", foot: true }
  },

  // 补货商订单--详情
  {
    path: "/replenish_orderdetail",
    component: ReplenishOrderDetail,
    name: "ReplenishOrderDetail",
    meta: { title: "订单详情", foot: true }
  },

  // 返利记录
  {
    path: "/replenish_rebate",
    component: ReplenishRebate,
    name: "ReplenishRebate",
    meta: { title: "返利记录", foot: true }
  },

  // 抢单大厅

  {
    path: "/robbing_center",
    component: RobbingCenter,
    name: "RobbingCenter",
    meta: { title: "抢单大厅", foot: true }
  },

  // 配送订单

  {
    path: "/delivery_order",
    component: DeliveryOrderList,
    name: "distributorOrderList",
    meta: { title: "配送订单", foot: true }
  },

  // 我要补货

  {
    path: "/my_replenishment",
    component: MyReplenishment,
    name: "MyReplenishment",
    meta: { title: "我要补货", foot: true }
  },

  // 补货单

  {
    path: "/replenish_delivery_order",
    component: ReplenishOrder,
    name: "ReplenishOrder",
    meta: { title: "补货单", foot: true }
  },

  // 订单详情 --delivery

  {
    path: "/delivery_order_detail",
    component: DeliveryOrderDetail,
    name: "DeliveryOrderDetail",
    meta: { title: "订单详情", foot: true }
  },

  // 发货

  {
    path: "/send",
    component: Send,
    name: "Send",
    meta: { title: "发货", foot: true }
  },

  // 抢单评价

  {
    path: "/delivery_evaluate",
    component: DeliveryEvaluate,
    name: "DeliveryEvaluate",
    meta: { title: "评价", foot: true }
  },

  // 供应商店铺页面

  {
    path: "/supplier_shop/:id",
    component: SupplierShop,
    name: "SupplierShop",
    meta: { title: "供应商店铺", foot: true }
  },

  // 供应商搜索

  {
    path: "/supplier_goods/:sid",
    component: SupplierSearch,
    name: "SupplierSearch",
    meta: { title: "搜索", foot: true }
  },

  // 共享链
  {
    path: "/extension/reward_queue",
    component: RewardQueue,
    name: "RewardQueue",
    meta: { title: "", foot: true }
  },
  {
    path: "/extension/reward_detail",
    component: RewardDetail,
    name: "RewardDetail",
    meta: { title: "奖励统计", foot: true }
  },
  {
    path: "/extension/reward_process",
    component: RewardProcess,
    name: "RewardProcess",
    meta: { title: "", foot: true }
  },

  // mryt
  {
    path: "/extension/mryt",
    component: MRYT,
    name: "MRYT",
    meta: { title: "", foot: true }
  },
  {
    path: "/extension/sale_commission",
    component: SaleCommission,
    name: "SaleCommission",
    meta: { title: "", foot: true }
  },
  {
    path: "/extension/award_record",
    component: AwardRecord,
    name: "AwardRecord",
    meta: { title: "奖励记录", foot: true }
  },
  {
    path: "/extension/award_detail",
    component: AwardDetail,
    name: "AwardDetail",
    meta: { title: "分红详情", foot: true }
  },
  // 手动分红
  {
    path: "/profit",
    component: Profit,
    name: "profit",
    meta: { title: "", foot: true }
  },

  // 连锁店
  {
    path: "/chain_shop_index",
    component: ChainShopIndex,
    name: "ChainShopIndex",
    meta: { title: "连锁店首页", foot: true }
  },
  {
    path: "/chain_shop_info/:id",
    component: ChainShopInfo,
    name: "ChainShopInfo",
    meta: { title: "门店信息", foot: true }
  },

  // 武昌医院--会务活动
  {
    path: "/meeting_index",
    component: MeetingIndex,
    name: "MeetingIndex",
    meta: { title: "报名记录", foot: true }
  },
  {
    path: "/meeting_index_detail/:id/:member_id",
    component: MeetingIndexDetail,
    name: "MeetingIndexDetail",
    meta: { title: "活动报名信息", foot: true }
  },
  {
    path: "/meeting_extend_list/:id/:member_id",
    component: MeetingExtendList,
    name: "MeetingExtendList",
    meta: { title: "推广报名列表", foot: true }
  },
  {
    path: "/meeting_extend_detail/:id",
    component: MeetingExtendDetail,
    name: "MeetingExtendDetail",
    meta: { title: "推广报名详情", foot: true }
  },

  // 入驻商品
  {
    path: "/enter_shop",
    component: EnterShop,
    name: "EnterShop",
    meta: { title: "入驻商品", foot: true }
  },
  {
    path: "/enter_protocol",
    component: EnterProtocol,
    name: "EnterProtocol",
    meta: { title: "入驻协议", foot: true }
  },
  {
    path: "/ApplyMerchant",
    component: ApplyMerchant,
    name: "ApplyMerchant",
    meta: { title: "申请商家", foot: true }
  },
  {
    path: "/submit_succeed",
    component: SubmitSucceed,
    name: "SubmitSucceed",
    meta: { title: "提交成功", foot: true }
  },
  {
    path: "/truck_list/:order_id",
    component: TruckList,
    name: "TruckList",
    meta: { title: "虚拟卡密", foot: true }
  },

  // 威富通--支付宝支付 Alipay
  {
    path: "/wft_balance_recharge/:url/:code_url",
    component: WftAlipayDetail,
    name: "wft_balance_recharge_copy",
    meta: { title: "支付宝", foot: true }
  },
  {
    path: "/wft_balance_recharge/:status/:url",
    component: Alipay,
    name: "wft_balance_recharge",
    meta: { title: "支付宝", foot: true }
  },
  // 爱心值充值
  {
    path: "/love_recharge",
    component: LoveRecharge,
    name: "LoveRecharge",
    meta: { title: "爱心值充值", foot: true }
  },
  {
    path: "/love_alipay/:status/:pay_id",
    component: Alipay,
    name: "love_alipay",
    meta: { title: "支付宝", foot: true }
  }, // 支付宝爱心值充值
  // 专区商品
  {
    path: "/extension_goods",
    component: ExtensionGoods,
    name: "ExtensionGoods",
    meta: { title: "专区商品", foot: true }
  },
  {
    path: "/salesManagement",
    component: salesManagement,
    name: "salesManagement",
    meta: { title: "团队销量管理", foot: true }
  },
  // 398团队数据统计
  {
    path: "/team_data_count/:type/:level",
    component: TeamDataCount,
    name: "TeamDataCount",
    meta: { title: "团队数据统计", foot: true }
  },
  {
    path: "/new_team_data_count/:team/:direct",
    component: newTeamDataCount,
    name: "newTeamDataCount",
    meta: { title: "团队数据统计", foot: true }
  },
  // 易宝支付 AggregateEntRegEdit
  {
    path: "/aggregate_ind_reg",
    component: AggregateIndReg,
    name: "AggregateIndReg",
    meta: { title: "个人注册", foot: true }
  },
  {
    path: "/aggregate_ind_reg_edit",
    component: AggregateIndRegEdit,
    name: "AggregateIndRegEdit",
    meta: { title: "重新申请个人注册", foot: true }
  },
  {
    path: "/aggregate_me_reg",
    component: AggregateMeReg,
    name: "AggregateMeReg",
    meta: { title: "个体工商户注册", foot: true }
  },
  {
    path: "/aggregate_me_reg_edit",
    component: AggregateMeRegEdit,
    name: "AggregateMeRegEdit",
    meta: { title: "重新申请个体工商户注册", foot: true }
  },
  {
    path: "/aggregate_ent_reg",
    component: AggregateEntReg,
    name: "AggregateEntReg",
    meta: { title: "企业注册 ", foot: true }
  },
  {
    path: "/aggregate_ent_reg_edit",
    component: AggregateEntRegEdit,
    name: "AggregateEntRegEdit",
    meta: { title: "重新申请企业注册 ", foot: true }
  },
  {
    path: "/aggregate_bank_card",
    component: AggregateBankCardSet,
    name: "AggregateBankCardSet",
    meta: { title: "结算银行卡修改 ", foot: true }
  },
  {
    path: "/aggregate_audit_part",
    component: AggregateAuditPart,
    name: "AggregateAuditPart",
    meta: { title: "入网信息", foot: true }
  },
  {
    path: "/company_edit",
    component: CompanyEdit,
    name: "CompanyEdit",
    meta: { title: "企业注册 ", foot: true }
  },
  {
    path: "/individual_edit",
    component: IndividualEdit,
    name: "IndividualEdit",
    meta: { title: "个体工商户注册", foot: true }
  },
  {
    path: "/show_apply",
    component: ShowApply,
    name: "ShowApply",
    meta: { title: "入网信息", foot: true }
  },
  // 邀请页面
  {
    path: "/input_visit",
    component: InputVisit,
    name: "InputVisit",
    meta: { title: "邀请码", foot: true }
  },
  {
    path: "/inviter",
    component: Inviter,
    name: "Inviter",
    meta: { title: "邀请码", foot: true }
  },

  // 消费积分-爱心值
  {
    path: "/member/Integral_love",
    component: Integral_love,
    name: "Integral_love",
    meta: { title: "消费积分-爱心值", foot: true }
  },
  {
    path: "/member/Integral_invest",
    component: Integral_invest,
    name: "Integral_invest",
    meta: { title: "", foot: true }
  },
  {
    path: "/member/Integral_love_detail",
    component: Integral_love_detail,
    name: "Integral_love_detail",
    meta: { title: "查看明细", foot: true }
  },
  {
    path: "/member/Integral_love_transfer",
    component: Integral_love_transfer,
    name: "Integral_love_transfer",
    meta: { title: "转让", foot: true }
  },
  {
    path: "/member/Integral_love_cash",
    component: Integral_love_cash,
    name: "Integral_love_cash",
    meta: { title: "提现", foot: true }
  },

  // 398一卡通
  {
    path: "/o2o/card_index",
    component: CardIndex,
    name: "CardIndex",
    meta: { title: "一卡通", foot: true }
  },
  {
    path: "/o2o/card_open_member",
    component: CardOpenMembership,
    name: "CardOpenMembership",
    meta: { title: "一卡通", foot: true }
  },
  {
    path: "/o2o/choose_member_time/:goods_id/:level_id",
    component: CardChooseMembership,
    name: "CardChooseMembership",
    meta: { title: "一卡通", foot: true }
  },
  {
    path: "/o2o/card_right",
    component: CardRight,
    name: "CardRight",
    meta: { title: "一卡通", foot: true }
  },
  {
    path:"/o2o/new_card",
    component:NewCard,
    name:"NewCard",
    meta:{title:"开通会员",foot:true}
  },
  {
    path:"/o2o/newcard_list",
    component:NewCardList,
    name:"NewCardList",
    meta:{title:"开通会员",foot:true}
  },

  // 门店优惠券
  {
    path: "/o2o/cupcon/:id",
    component: StoreCoupon,
    name: "StoreCoupon",
    meta: { title: "门店优惠券", foot: true }
  },

  // 门店优惠券
  {
    path: "/hotel/cupcon/:id",
    component: hotelCoupon,
    name: "hotelCoupon",
    meta: { title: "酒店优惠券", foot: true }
  },

  // 发票详情
  {
    path: "/invoice/:order_id",
    component: Invoice,
    name: "Invoice",
    meta: { title: "发票详情", foot: true }
  },
  // 供应商提现
  {
    path: "/member/supplier_withdrawals/:supplier/:member_id",
    component: Balance_withdrawals,
    name: "supplier_withdrawals",
    meta: { title: "提现", foot: true }
  },
  //酒店供应链路由
  {
    path: "/hotel_supply/search",
    component: HotelSupplySearch,
    name: "HotelSupplySearch",
    meta: { title: "酒店搜索", foot: true }
  },
  //酒店供应首页
  {
    path: "/hotel_supply/HotelSupplyIndex",
    component: HotelSupplyIndex,
    name: "HotelSupplyIndex",
    meta: { title: "酒店", foot: true }
  },
  //酒店供应酒店主页
  {
    path: "/hotel_supply/home_page/:id",
    component: HotelSupplyHome,
    name: "HotelSupplyHome",
    meta: { title: "酒店主页", foot: true }
  },
  //酒店供应酒店主页
  {
    path: "/hotel_supply/hotelSupplyGoods/:hotel_id/:id",
    component: hotelSupplyGoods,
    name: "hotelSupplyGoods",
    meta: { title: "酒店房型详情", foot: true }
  },
  //酒店供应酒店下单页
  {
    path: "/hotel_supply/HotelSupplyGoodsOrder/:hotel_id/:sid/:date_price/:start/:end",
    component: HotelSupplyGoodsOrder,
    name: "HotelSupplyGoodsOrder",
    meta: { title: "酒店", foot: true }
  },
  //酒店供应酒店下单页
  {
    path: "/hotel_supply/hotel_order/:id",
    component: hotelOrder,
    name: "hotelOrder",
    meta: { title: "酒店详情", foot: true }
  },
  // 酒店路由
  {
    path: "/hotel/index",
    component: HotelIndex,
    name: "HotelIndex",
    meta: { title: "酒店", foot: true }
  },
  {
    path: "/hotel/search",
    component: HotelSearch,
    name: "HotelSearch",
    meta: { title: "酒店搜索", foot: true }
  },
  {
    path: "/hotel/home_page/:id",
    component: HotelHome,
    name: "HotelHome",
    meta: { title: "", foot: true }
  },
  {
    path: "/hotel/choose_room/:id",
    component: HotelChooseRoom,
    name: "HotelChooseRoom",
    meta: { title: "查看房型", foot: true }
  },
  // { path: '/hotel/goods',component: HotelGood,name: 'HotelGood',meta: {title: '商品详情',foot: true}},
  {
    path: "/hotel/goods_order",
    component: HotelGoodsOrder,
    name: "HotelGoodsOrder",
    meta: { title: "酒店", foot: true }
  },
  {
    path: "/hotel/orderdetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "HotelOrderDetail",
    meta: { title: "订单", foot: true }
  },
  {
    path: "/hotel/orderdetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "netCarDetail",
    meta: { title: "订单", foot: true }
  },
  {
    path: "/deliveryStation/deliveryDetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "deliveryStationOrderDetail",
    meta: { title: "订单", foot: true }
  },
  {
    path: "/deliveryStation/DeliveryReplenishDetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "DeliveryReplenishDetail",
    meta: { title: "订单", foot: true }
  },
  {
    path: "/serviceStation/serviceReplenishDetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "serviceReplenishDetail",
    meta: { title: "订单", foot: true }
  },
  {
    path: "/groups/groupDetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "groupDetail",
    meta: { title: "订单", foot: true }
  },
  {
    path: "/hotel/manage",
    component: HotelManage,
    name: "HotelManage",
    meta: { title: "酒店管理", foot: true }
  },
  {
    path: "/hotel/apply",
    component: StoreApply,
    name: "hotelApply",
    meta: { title: "申请", foot: true }
  },
  {
    path: "/hotel/orderdetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "HotelCenterOrderDetail",
    meta: { title: "订单", foot: true }
  },
  // 租凭订单详情
  {
    path: "/lease_toy/orderdetail/:order_id/:orderType",
    component: Goodsinfo,
    name: "LeaseToyOrderDetail",
    meta: { title: "订单", foot: true }
  },

  // { path: '/hotel/location/:tag',component: o2oLocation_loc,name: 'hotel_location',meta: {title: '',foot: true}},
  // { path: '/hotel/city/:tag',component: o2oCity,name: 'hotelCity',meta: {title: '',foot: true}},
  // { path: '/hotel/location/:tag',component: o2oLocation,name: 'hotelLocation',meta: {title: '',foot: false}},

  // 酒店收银台
  {
    path: "/hotel/cashier_pay/:hotel_id",
    component: cashier_pay,
    name: "HotelCashierPay",
    meta: { title: "收银台", foot: true }
  },

  {
    path: "/hotel/cashier",
    component: HotelManage,
    name: "HotelCashier",
    meta: { title: "收银台", foot: true }
  },

  // 营业额
  {
    path: "/extension/performance",
    component: Performance,
    name: "Performance",
    meta: { title: "营业额", foot: true }
  },

  // 合伙人团队
  {
    path: "/extension/partnership_team",
    component: PartnershipTeam,
    name: "PartnershipTeam",
    meta: { title: " ", foot: true }
  },
  {
    path: "/extension/management_record",
    component: ManagementRecord,
    name: "ManagementRecord",
    meta: { title: " ", foot: true }
  },
  {
    path: "/extension/task_list",
    component: TaskList,
    name: "TaskList",
    meta: { title: "任务中心", foot: true }
  },

  {
    path: "/extension/rewards_record",
    component: RewardsRecord,
    name: "RewardsRecord",
    meta: { title: " ", foot: true }
  },
  {
    path: "/extension/rewards_record_detail",
    component: RewardsRecordDetail,
    name: "RewardsRecordDetail",
    meta: { title: " ", foot: true }
  },
  {
    path: "/extension/task_center",
    component: TaskCenter,
    name: "TaskCenter",
    meta: { title: "任务中心", foot: true }
  },
  // 团队管理奖
  {
    path: "/extension/team_manage_reward",
    component: TeamManageReward,
    name: "team_manage_reward",
    meta: { title: "团队管理奖", foot: true }
  },
  // 会员分红
  {
    path: "/member_bonus",
    component: MemberBonusIndex,
    name: "MemberBonusIndex",
    meta: { title: "会员分红", foot: true }
  },
  {
    path: "/member_bonus/record",
    component: MemberBonusRecord,
    name: "MemberBonusRecord",
    meta: { title: "分红记录", foot: true }
  },

  // 挂单
  {
    path: "/entry_orders/coupon_exchange",
    component: EntryExchange,
    name: "EntryExchange",
    meta: { title: "积分兑换", foot: true }
  },
  {
    path: "/entry_orders/entry_record",
    component: CouponExrecord,
    name: "CouponExrecord",
    meta: { title: "获得记录", foot: true }
  },
  {
    path: "/entry_orders/entry_volume",
    component: EntryVolume,
    name: "EntryVolume",
    meta: { title: "商品零售", foot: true }
  },
  {
    path: "/entry_orders/money_detail",
    component: MoneyDetail,
    name: "MoneyDetail",
    meta: { title: "提成明细", foot: true }
  },
  {
    path: "/entry_orders/my_volume",
    component: MyVolume,
    name: "MyVolume",
    meta: { title: "我的零售", foot: true }
  },
  {
    path: "/entry_orders/volume_detail",
    component: VolumeDetail,
    name: "VolumeDetail",
    meta: { title: "批发券明细", foot: true }
  },
  {
    path: "/entry_orders/wholesale_volume",
    component: WholesaleVolume,
    name: "WholesaleVolume",
    meta: { title: "我的批发券", foot: true }
  },
  {
    path: "/entry_orders/home",
    component: paddingOrder_Home,
    name: "paddingOrder_Home",
    meta: { title: "批发区首页", foot: true }
  },

  // 网约车
  {
    path: "/online_car/:id?",
    component: CarIndex,
    name: "online_car",
    meta: { title: "网约车", foot: true }
  },
  {
    path: "/car_sign/:id",
    component: CarSign,
    name: "CarSign",
    meta: { title: "签约汽车", foot: true }
  },

  {
    path: "/city_manager",
    component: cityManager,
    name: "cityManager",
    meta: { title: "城市经理人", foot: true }
  },
  {
    path: "/team_member",
    component: teamMember,
    name: "teamMember",
    meta: { title: "车队成员", foot: true }
  },
  {
    path: "/car_bonus/:id",
    component: CarBonus,
    name: "CarBonus",
    meta: { title: "分红明细", foot: true }
  },

  {
    path: "/driver_apply",
    component: DriverApply,
    name: "DriverApply",
    meta: { title: "司机申请", foot: true }
  },

  {
    path: "/driver_data",
    component: DriverData,
    name: "DriverData",
    meta: { title: "填写资料", foot: true }
  },

  {
    path: "/extension/dividend",
    component: globalDividend,
    name: "globalDividend",
    meta: { title: " ", foot: true }
  },

  {
    path: "/others/material_center",
    component: materialCenter,
    name: "materialCenter",
    meta: { title: "素材中心", foot: true }
  },
  {
    path: "/member/redEnvelope/:aid",
    component: redEnvelope,
    name: "redEnvelope",
    meta: { title: "口令红包", foot: false }
  },
  {
    path: "/member/redEnvelopeRecord/:tag/:aid",
    component: redEnvelopeRecord,
    name: "redEnvelopeRecord",
    meta: { title: "口令红包", foot: true }
  },
  //虚拟币
  {
    path: "/others/address_manage",
    component: addressManage,
    name: "addressManage",
    meta: { title: "提币地址管理", foot: true }
  },
  {
    path: "/others/address_add",
    component: addressAdd,
    name: "addressAdd",
    meta: { title: "新增提币地址", foot: true }
  },
  {
    path: "/others/revise_address/:id",
    component: reviseAddress,
    name: "reviseAddress",
    meta: { title: "修改提币地址", foot: true }
  },
  {
    path: "/others/hand_withdraw",
    component: handWithdraw,
    name: "handWithdraw",
    meta: { title: "手动提现", foot: true }
  },

  // 酒店二维码 cashier_qr
  {
    path: "/extension/dealer_award",
    component: DealerAward,
    name: "DealerAward",
    meta: { title: "经销商奖励", foot: true }
  },

  {
    path: "/extension/dealer_detail",
    component: DriverDetail,
    name: "DriverDetail",
    meta: { title: "奖励详情", foot: true }
  },

  //酒店二维码 cashier_qr
  {
    path: "/cashier_qr/:hotel_id/:tag",
    component: cashier_qr,
    name: "hotel_cashier_qr",
    meta: {
      title: "二维码",
      foot: true,
      notKeepAlive: true
    }
  },
  // 统计结算 cashier_stat
  {
    path: "/cashier_stat/:hotel_id/:tag",
    component: cashier_stat,
    name: "hotel_cashier_stat",
    meta: {
      title: "统计结算",
      foot: true
    }
  },
  {
    path: "/member/orderdetail/:order_id",
    component: Goodsinfo,
    name: "HotelCashierOrderDetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  //会员报单
  {
    path: "/DeclarationApply",
    component: Declaration,
    name: "DeclarationApply",
    meta: {
      title: "会员报单",
      foot: true
    }
  },
  {
    path: "/declaration/recordDeclaration/:id",
    component: RecordDeclaration,
    name: "RecordDeclaration",
    meta: {
      title: "报单记录",
      foot: true
    }
  },
  //服务站
  {
    path: "/member/serviceStation",
    component: ServiceStation,
    name: "serviceStation",
    meta: {
      title: "服务站",
      foot: true
    }
  },
  //提成明细
  {
    path: "/commissionList/:orderType",
    component: CommissionList,
    name: "CommissionList",
    meta: {
      title: "提成明细",
      foot: true
    }
  },
  {
    path: "/member/distribution_orders",
    component: DistributionOrders,
    name: "DistributionOrders",
    meta: {
      title: "",
      foot: true
    }
  },
  //微社区
  {
    path: "/microHome",
    component: MicroHome,
    name: "MicroHome",
    redirect: "/microHome/microIndex",
    meta: {
      title: "微社区首页入口",
      foot: false
    },
    children: [
      // {
      //   path: "/",
      //   redirect: { name: "MicroIndex" }
      // },
      {
        path: "microIndex",
        component: MicroIndex,
        name: "MicroIndex",
        meta: {
          title: "首页",
          foot: true
        }
      },
      {
        path: "microhomepage",
        component: microhomepage,
        name: "microhomepage",
        meta: {
          title: "个人主页",
          foot: true
        }
      },
      {
        path: "microAttention",
        component: microAttention,
        name: "microAttention",
        meta: {
          title: "关注",
          foot: true
        }
      }
    ]
  },
  {
    path: "/microFanlist",
    component: microFanlist,
    name: "microFanlist",
    meta: {
      title: "关注和粉丝",
      foot: true
    }
  },
  // {
  //   path: "/microIndex",
  //   component: MicroIndex,
  //   name: "microIndex",
  //   meta: {
  //     title: "微社区首页",
  //     foot: true
  //   }
  // },
  {
    path: "/microRelease",
    component: MicroRelease,
    name: "microRelease",
    meta: {
      title: "微社区发布",
      foot: true
    }
  },
  {
    path: "/microsearchindex",
    component: Microsearchindex,
    name: "microSearchIndex",
    meta: {
      title: "微社区搜索",
      foot: true
    }
  },
  {
    path: "/microclassification",
    component: Microclassification,
    name: "microClassification",
    meta: {
      title: "微社区分类搜索",
      foot: true
    }
  },
  {
    path: "/microcommentdetails/:stickId",
    component: Microcommentdetails,
    name: "microCommentDetails",
    meta: {
      title: "微社区帖子详情",
      foot: true
    }
  },
  {
    path: "/microhomepage",
    component: microhomepage,
    name: "microhomepage",
    meta: {
      title: "个人主页",
      foot: true
    }
  },
  {
    path: "/microEdit",
    component: MicroEdit,
    name: "microEdit",
    meta: {
      title: "微社区发布编辑",
      foot: true
    }
  },
  //拼团
  {
    path: "/group_detail/:id",
    component: GroupDetail,
    name: "GroupDetail",
    meta: {
      title: "拼团详情",
      foot: true
    }
  },
  {
    path: "/group_list",
    component: GroupList,
    name: "GroupList",
    meta: {
      title: "拼团列表",
      foot: true
    }
  },
  {
    path: "/groups/:id",
    component: GroupGoods,
    name: "GroupGoods",
    meta: {
      title: "拼团活动详情", //商品活动详情页
      foot: true
    }
  },
  {
    path: "/mygroups",
    component: MyGroups,
    name: "MyGroups",
    meta: {
      title: "我的拼团", //我的拼团
      foot: true
    }
  },

  //语音商品，已改为goods/：id
  {
    path: "/voice_good/:id",
    component: VoiceGood,
    name: "VoiceGood",
    meta: { title: "详情", foot: true }
  },
  {
    path: "/my_voices",
    component: MyVoices,
    name: "MyVoices",
    meta: { title: "我的语音", foot: true }
  },

  {
    path: "/lottery",
    component: Lottery,
    name: "Lottery",
    meta: { title: "幸运大抽奖", foot: true }
  },
  {
    path: "/Lottery_record",
    component: LotteryRecord,
    name: "LotteryRecord",
    meta: { title: "中奖列表", foot: true }
  },
  {
    path: "/extension/custom_queue",
    component: CustomQueue,
    name: "CustomQueue",
    meta: {
      title: "",
      foot: true
    }
  },

  //配送站 的 我要补货
  {
    path: "/WantReplenishment",
    component: WantReplenishment,
    name: "WantReplenishment",
    meta: {
      title: "我要补货",
      foot: true
    }
  },
  {
    path: "/videoAgreement",
    component: videoAgreement,
    name: "videoAgreement",
    meta: {
      title: "用户协议",
      foot: true
    }
  },
  {
    path: "/myVideo",
    component: myVideo,
    name: "myVideo",
    meta: {
      title: "我的视频",
      foot: true
    }
  },
  {
    path: "/videoList",
    component: VideoList,
    name: "VideoList",
    meta: {
      title: "小视频",
      foot: true
    }
  },
  {
    path: "/videoDetail",
    component: VideoDetail,
    name: "VideoDetail",
    meta: {
      title: "小视频",
      foot: true
    }
  },
  {
    path: "/releaseVideo",
    component: releaseVideo,
    name: "releaseVideo",
    meta: {
      title: "发布视频",
      foot: true
    }
  },
  {
    path: "/addVideoGood",
    component: addVideoGood,
    name: "addVideoGood",
    meta: {
      title: "添加商品",
      foot: true
    }
  },
  {
    path: "/VideoReward",
    component: VideoReward,
    name: "VideoReward",
    meta: {
      title: "奖励记录",
      foot: true
    }
  },
  {
    path: "/TeamPerformanceAward",
    component: TeamPerformanceAward,
    name: "TeamPerformanceAward",
    meta: {
      title: "",
      foot: true
    }
  },
  //权益值分红
  {
    path: "/EquityBonus",
    component: EquityBonus,
    name: "EquityBonus",
    meta: { title: "", foot: true }
  },
  // 宠物医院调查表
  {
    path: "/others/survey",
    component: survey,
    name: "survey",
    meta: { title: "调差表", foot: true }
  },
  // 分销管理奖励
  {
    path: "/member/income/distributionHome",
    component: DistributionHome,
    name: "DistributionHome",
    meta: {
      title: "分销管理奖励",
      foot: true
    }
  },
  // 分销奖励
  {
    path: "/member/income/distributionDetail",
    component: DistributionDetail,
    name: "DistributionDetail",
    meta: {
      title: "奖励详情",
      foot: true
    }
  },
  //龙存管
  {
    path: "/myWallet",
    component: myWallet,
    name: "myWallet",
    meta: {
      title: "我的钱包",
      foot: true
    }
  },
  {
    path: "/changePwd",
    component: changePwd,
    name: "changePwd",
    meta: {
      title: "修改交易密码",
      foot: true
    }
  },
  {
    path: "/companyLogon",
    component: companyLogon,
    name: "companyLogon",
    meta: {
      title: "企业注册",
      foot: true
    }
  },
  {
    path: "/personLogon",
    component: personLogon,
    name: "personLogon",
    meta: {
      title: "个人注册",
      foot: true
    }
  },
  {
    path: "/walletDetail",
    component: walletDetail,
    name: "walletDetail",
    meta: {
      title: "电子钱包明细",
      foot: true
    }
  },
  {
    path: "/dragonWithdraw",
    component: dragonWithdraw,
    name: "dragonWithdraw",
    meta: {
      title: "提现",
      foot: true
    }
  },
  {
    path: "/chooseStatus",
    component: chooseStatus,
    name: "chooseStatus",
    meta: {
      title: "选择注册角色",
      foot: true
    }
  },
  {
    path: "/personModify",
    component: personModify,
    name: "personModify",
    meta: {
      title: "个人注册信息修改",
      foot: true
    }
  },
  {
    path: "/companyModify",
    component: companyModify,
    name: "companyModify",
    meta: {
      title: "企业注册信息修改",
      foot: true
    }
  },
  {
    path: "/checking",
    component: checking,
    name: "checking",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/dragonDeposit",
    component: dragonDeposit,
    name: "dragonDeposit",
    meta: {
      title: "入金",
      foot: true
    }
  },
  {
    path: "/myBank",
    component: myBank,
    name: "myBank",
    meta: {
      title: "我的银行卡",
      foot: true
    }
  },
  {
    path: "/failApply",
    component: failApply,
    name: "failApply",
    meta: {
      title: "审核失败-重新提交",
      foot: true
    }
  },
  {
    path: "/infoChange",
    component: infoChange,
    name: "infoChange",
    meta: {
      title: "用户信息变更记录",
      foot: true
    }
  },
  // 柯怡 管理奖
  {
    path: "/member/manageAward",
    component: ManageAward,
    name: "ManageAward",
    meta: {
      title: "管理奖",
      foot: true
    }
  },
  // 柯怡 排序共享奖
  {
    path: "/member/shareAward_sort",
    component: ShareAward,
    name: "shareAward_sort",
    meta: {
      title: "排序共享奖",
      foot: true
    }
  },
  // 柯怡 直推共享奖
  {
    path: "/member/shareAward_directly",
    component: ShareAward,
    name: "shareAward_directly",
    meta: {
      title: "直推共享奖",
      foot: true
    }
  },
  // 自提点申请
  {
    path: "/member/selfCarryApply",
    component: SelfCarryApply,
    name: "SelfCarryApply",
    meta: {
      title: "申请",
      foot: true
    }
  },
  // 自提点列表
  {
    path: "/selfCarry_info",
    component: SelfCarry_info,
    name: "SelfCarry_info",
    meta: {
      title: "",
      foot: true
    }
  },
  // 自提点奖励
  {
    path: "/member/selfCarry_reward",
    component: selfCarry_reward,
    name: "selfCarry_reward",
    meta: {
      title: "奖励",
      foot: true
    }
  },
  {
    path: "/member/hireCarManage",
    component: HireCarManage,
    name: "hireCarManage",
    meta: {
      title: "分期购车",
      foot: true
    }
  },
  // 分期购车-服务人员
  {
    path: "/member/serviceStaff",
    component: ServiceStaff,
    name: "serviceStaff",
    meta: {
      title: "服务人员",
      foot: true
    }
  },
  // 分期购车-服务人员
  {
    path: "/member/staffOrderDetail/:order_id",
    component: StaffOrderDetail,
    name: "staffOrderDetail",
    meta: {
      title: "订单详情",
      foot: true
    }
  },
  // 分期购车-分红奖励
  {
    path: "/member/dividend",
    component: Dividend,
    name: "Dividend",
    meta: {
      title: "奖励记录",
      foot: true
    }
  },
  // 分期购车-分红奖励
  {
    path: "/member/dividendDetail/:id",
    component: dividendDetail,
    name: "dividendDetail",
    meta: {
      title: "奖励记录",
      foot: true
    }
  },
  // 平级奖
  {
    path: "/member/peersAward",
    component: PeersAward,
    name: "peersAward",
    meta: {
      title: "平级奖",
      foot: true
    }
  },
  {
    path:'/picture_album',
    component: pictureAlbum,
    name: "pictureAlbum",
    meta:{
      title:"画册",
      foot:true
    }
  },
  // 广告中心
  {
    path: "/member/admarketHome",
    component: admarketHome,
    name: "admarketHome",
    meta: {
      title: "广告中心",
      foot: true
    }
  },
  // 广告中心-我的设备
  {
    path: "/member/myDevice",
    component: MyDevice,
    name: "MyDevice",
    meta: {
      title: "我的设备",
      foot: true
    }
  },
  // 广告中心-广告管理
  {
    path: "/member/DeviceManger",
    component: DeviceManger,
    name: "DeviceManger",
    meta: {
      title: "广告管理",
      foot: true
    }
  },
  // 广告中心-广告主申请
  {
    path: "/member/adApply",
    component: ADApply,
    name: "ADApply",
    meta: {
      title: "广告主申请",
      foot: true
    }
  },
  // 广告中心-我的设备=>设备详情
  {
    path: "/member/deviceDetail/:sn",
    component: DeviceDetail,
    name: "DeviceDetail",
    meta: {
      title: "设备详情",
      foot: true
    }
  },
  // 广告中心-我的设备=>设备详情=>店长提成
  {
    path: "/member/managerCommission",
    component: managerCommission,
    name: "managerCommission",
    meta: {
      title: "设备详情",
      foot: true
    }
  },
  {
    path: "/advertiser",
    component: advertiser,
    name: "advertiser",
    meta: {
      title: "广告主",
      foot: true
    }
  },
  {
    path: "/addAdvertising",
    component: addAdvertising,
    name: "addAdvertising",
    meta: {
      title: "添加广告",
      foot: true
    }
  },
  {
    path: "/editAdvertising/:id",
    component: addAdvertising,
    name: "editAdvertising",
    meta: {
      title: "编辑广告",
      foot: true
    }
  },
  {
    path: "/advertisingFee",
    component: advertisingFee,
    name: "advertisingFee",
    meta: {
      title: "广告费记录",
      foot: true
    }
  },
  {
    path: "/placedAdvertising",
    component: placedAdvertising,
    name: "placedAdvertising",
    meta: {
      title: "投放的广告",
      foot: true
    }
  },
  // 奖金池
  {
    path: "/others/revenus_bonus",
    component: revenus_bonus,
    name: "revenus_bonus",
    meta: {
      title: "收益奖",
      foot: true
    }
  },
  // 新mryt
  {
    path: "/new_mryt",
    component: newMRYT,
    name: "newMRYT",
    meta: { title: "", foot: true }
  },
  {
    path: "/new_sale_commission",
    component: newSaleCommission,
    name: "newSaleCommission",
    meta: { title: "", foot: true }
  },
  {
    path: "/new_award_record",
    component: newAwardRecord,
    name: "newAwardRecord",
    meta: { title: "奖励记录", foot: true }
  },
  {
    path: "/new_award_detail",
    component: newAwardDetail,
    name: "newAwardDetail",
    meta: { title: "分红详情", foot: true }
  },
  // 芸众电子合同
  {
    path: "/signIndex",
    component: signIndex,
    name: "signIndex",
    meta: { title: "个人中心", foot: true }
  },
  {
    path: "/signGuide/:show",
    component: signGuide,
    name: "signGuide",
    meta: { title: "", foot: true }
  },
  {
    path: "/personBank",
    component: personBank,
    name: "personBank",
    meta: { title: "个人认证", foot: true }
  },
  {
    path: "/identifyResult/:show",
    component: identifyResult,
    name: "identifyResult",
    meta: { title: "认证结果", foot: true }
  },
  {
    path: "/signCompany",
    component: signCompany,
    name: "signCompany",
    meta: { title: "企业认证", foot: true }
  },
  {
    path: "/contractBills",
    component: contractBills,
    name: "contractBills",
    meta: { title: "合同账单", foot: true }
  },
  // 奖金池
  {
    path: "/others/bonus",
    component: Bonus,
    name: "Bonus",
    meta: {
      title: "奖金池",
      foot: true
    }
  },
  {
    path: "/appointment/index",
    component: Appointment,
    name: "Appointment",
    meta: {
      title: "预约首页",
      foot: true
    }
  },
  {
    path: "/show_appointment/:worker_id",
    component: showAppointment,
    name: "showAppointment",
    meta: {
      title: "可预约时间",
      foot: true
    }
  },
  {
    path: "/appointment_search",
    component: AppointmentSearch,
    name: "AppointmentSearch",
    meta: {
      title: "搜索项目/技师",
      foot: true
    }
  },
  {
    path: "/project_details/:project_id",
    component: ProjectDetails,
    name: "ProjectDetails",
    meta: {
      title: "项目详情",
      foot: true
    }
  },
  {
    path: "/project_list",
    component: ProjectList,
    name: "ProjectList",
    meta: {
      title: "项目列表",
      foot: true
    }
  },
  {
    path: "/technician_details/:worker_id",
    component: TechnicianDetails,
    name: "TechnicianDetails",
    meta: {
      title: "技师详情",
      foot: true
    }
  },
  {
    path: "/technician_time/:worker_id",
    component: TechnicianTime,
    name: "TechnicianTime",
    meta: {
      title: "添加工作时间",
      foot: true
    }
  },
  {
    path: "/hot_technician",
    component: HotTechnician,
    name: "HotTechnician",
    meta: {
      title: "热门技师",
      foot: true
    }
  },
  {
    path: "/appointment_mine",
    component: AppointmentMine,
    name: "AppointmentMine",
    meta: {
      title: "我的",
      foot: true
    }
  },
  {
    path: "/technician_work",
    component: TechnicianWork,
    name: "TechnicianWork",
    meta: {
      title: "工作时间",
      foot: true
    }
  },
  {
    path: "/appointment_project",
    component: AppointmentProject,
    name: "AppointmentProject",
    meta: {
      title: "已预约项目",
      foot: true
    }
  },
  {
    path: "/add_technician/:store_id",
    component: AddTechnician,
    name: "AddTechnician",
    meta: {
      title: "",
      foot: true
    }
  },
  {
    path: "/stores_technician",
    component: StoresTechnician,
    name: "StoresTechnician",
    meta: {
      title: "门店技师",
      foot: true
    }
  },
  {
    path: "/client_appointment",
    component: ClientAppointment,
    name: "ClientAppointment",
    meta: {
      title: "我的预约",
      foot: true
    }
  },
  {
    path: "/client_evaluate/:service_id",
    component: ClientEvaluate,
    name: "ClientEvaluate",
    meta: {
      title: "评价",
      foot: true
    }
  },
  {
    path: "/client_verification/:service_id",
    component: ClientVerification,
    name: "ClientVerification",
    meta: {
      title: "核销",
      foot: true
    }
  },
  {
    path: "/make_appointment/:id",
    component: MakeAppointment,
    name: "MakeAppointment",
    meta: {
      title: "预约",
      foot: true
    }
  },
  {
    path: "/client_project",
    component: ClientProject,
    name: "ClientProject",
    meta: {
      title: "我的项目",
      foot: true
    }
  },
  {
    // path: "/others/advertisingPage",
    path: "/share_page_detail",
    component: advertisingPage,
    name: "advertisingPage"
    // meta: {
    //   title: "宣传单",
    //   foot: true
    // }
  },
  {
    path: "/introduceNear/:store_id",
    component: introduceNear,
    name: "introduceNear",
    meta: {
      title: "门店附近推荐商品",
      foot: true
    }
  },
  {
    path: "/nearSearch/:store_id",
    component: nearSearch,
    name: "nearSearch",
    meta: {
      title: "推荐商品搜索结果",
      foot: true
    }
  },
  {
    path: "/addNear/:id",
    component: addNear,
    name: "addNear",
    meta: {
      title: "添加推荐商品",
      foot: true
    }
  },
  {
    path: "/qrCoupon",
    component: qrCoupon,
    name: "qrCoupon",
    meta: {
      title: "优惠券二维码",
      foot: true
    }
  }
]
  .concat(BlockChain)
  .map(route => {
    route.path = rootPath + route.path;
    return route;
  });
// 404 页
routes.push({
  path: "*",
  component: NotFound,
  name: "notfound",
  meta: {
    title: "404",
    foot: true
  }
});

export default routes;
