<template>
  <div id="footprint">
    <c-title :hide="false"
             text='我的收藏'></c-title>
    <div style="height: 40px;margin-bottom:0.375rem"></div>
    <div class="tbs"
         v-for="(item,index) in datas"
		 :key='index'
         v-if="item.goods"
         @click="toItem(item.goods)">
      <mt-cell-swipe :right="[{content: '删除', style: {  color: '#fff' },
	      handler: () => {delteteItem(item,index)}
	    }]"
                     id="one">
        <div class="li2"
             v-if='item.goods.thumb'><img :src="item.goods.thumb" /></div>
        <div class="li2"
             v-if='!item.goods.thumb'><img src="../../../assets/images/img_default.png" /></div>
        <div class="li3">
          <div class="product-name">{{item.goods.title|escapeTitle}}</div>
          <p class="product-price">
            ￥
            <span v-if="item.vip_level_status&&item.vip_level_status.status==1" class="product-price-span">{{item.vip_level_status.word}}</span>
            <span v-else>{{item.goods.price}}</span>
          </p>
        </div>
      </mt-cell-swipe>
    </div>

  </div>

  <!--<div id="footprint">
	    	<c-title :hide="false" text='我的收藏'></c-title>
	    	<div style="height: 40px;"></div>
			<el-checkbox-group v-model="checkList">
				<div class="tbs" v-for="item in datasoruce">
					<div class="li1">
						<el-checkbox :label=item  @change="handleCheckedChange">""</el-checkbox>
					</div>
					<div class="li2"><img src="https://m.360buyimg.com/mobilecms/jfs/t4210/92/1988384105/28689/4d53c00e/58c9f630N84d4d1a6.png!q70.jpg"/></div>
					<div class="li3">
						<div class="product-name">小米（MI）小米AIR 13.3英寸全金属超轻薄笔记本（I5-6200U 8G 256G PCIE SSD 940MX 独显 FHD）银色</div>
						<font class="product-price">￥954.45</font>
					</div>
					<div class="li4"><i class="fa fa-trash-o" @click="delteteItem(item)"></i></div>
				</div>
			</el-checkbox-group>
			<div id="foota">
				<el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				<span class="dels" @click="delteteAll">删除</span>
			</div>
	    </div>-->
</template>
<script>
import collectioncontroller from "./collectioncontroller";
export default collectioncontroller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#footprint {
  .mint-cell.mint-cell-swipe,
  .mint-cell-value {
    width: 100%;
  }
  .mint-cell-value,
  .tbs {
    display: flex;
    align-items: center;
    background: #fff;
    flex-flow: row wrap;
    border-bottom: #f5f5f5 0.0625rem solid;
    margin-bottom: 0.375rem;
    .li1 {
      flex: 10%;
    }
    .li2 {
      flex: 20%;
      img {
        width: 5.86rem;
        height: 5.86rem;
        border-radius: 10px;
      }
    }
    .li3 {
      flex: 60%;
      display: flex;
      flex-direction: column;
      text-align: justify;
      margin-left: 0.625rem;
      box-sizing: border-box;
      .product-name {
        flex: 5;
        font-size: 14px;
        font-weight: bold;
        color: #666;
        text-align: justify;
        line-height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin-bottom: 1.125rem;
      }
      .product-price {
        flex: 1;
        color: #f15353;
        text-align: left;
        margin: 0;
        font-size: 14px;
        span {
          font-size: 18px;
        }
        .product-price-span{
          font-size:0.75rem;background:#f15353;
          color:white;
          padding: .2rem .5rem;
          border-top-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      }
    }
    .li4 {
      flex: 10%;
    }
  }
  #foota {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    .el-checkbox {
      flex: 5;
      text-align: left;
      padding-left: 0.9375rem;
    }
    .dels {
      flex: 3;
      border-radius: 0.25rem;
      border: solid 0.0625rem red;
      background: red;
      color: #fff;
      padding: 0.625rem;
    }
  }
}
</style>
