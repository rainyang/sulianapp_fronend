<template>
  <div>
    <div id="incomedetailed">
      <div v-for="(item,i) in info" :key='i'>
        <div class="times"></div>
        <router-link :to="fun.getUrl('messageInfo', { id: item.id })">
          <div class="tbs">
            <div class="item1">
              {{ item.created_at }}
              <br />
            </div>
            <div class="item2">
              {{ item.title }}
              <br />
            </div>
            <div class="item3">
              <span class="add">{{ item.read_status }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <mt-popup
      v-model="popupSpecs"
      position="bottom"
      class="mint-popup-4"
      closeOnClickModal="true"
    >
      <div class="screen" v-for="(item,i) in typeData" :key='i'>
        <ul>
          <li @click="screenType(item.type)">
            <a>{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import message_list_controller from "./message_list_controller";
export default message_list_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#incomedetailed{
    padding-bottom: 6.25rem;
}
.times {
  height: 0.0625rem;
}

.tbs {
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.625rem 0;
  line-height: 1.5rem;
  .item1 {
    margin-bottom: 0.3125rem;
    color: #888;
    flex: 25%;
    text-align: left;
    padding-left: 0.9375rem;
    box-sizing: border-box;
  }
  .item2 {
    flex: 60%;
    text-align: left;
    color: #000;
    font-size: 16px;
    margin-bottom: 0.3125rem;
    .reg {
      color: #259b24;
    }
  }
  .item3 {
    text-align: right;
    color: #000;
    padding-right: 0.9375rem;
    margin-bottom: 0.3125rem;
    .reg {
      color: #259b24;
    }
  }
}
</style>
