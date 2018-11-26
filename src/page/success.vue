<template>
  <div class="complete">
    <img src="../assets/img/jinj_icon_success.png" alt="" >
    <p class="sub_success">提交成功</p>
    <p class="small_tip">
      请注意查收推送消息跟进审核结果
      <br>
      客服热线：400-18-51518（09:00—21:00）</p>
    <!--企业商户-->
    <!--<div class="business">-->
      <p class="invate">邀请商户下载拉卡拉商户通APP</p>
      <div class="ft30">帮助商户高效管理所有支付机具</div>
      <div class="btns_share boxs">
        <div class=""><img src="../assets/img/jin_down.png" alt=""><p>邀请下载</p></div>
        <p>点击发送链接</p>
      </div>
      <div class="btns_down boxs">
        <div>  <img src="../assets/img/jinj_pic_ewm.png" alt=""></div>
        <p>微信扫码下载</p>
      </div>
  </div>
</template>

<script>
    export default {
        name: "success",
        data(){
          return{
            status:1
          }
        }
    }
</script>

<style scoped>
.complete>img{
  width: 1.22rem;
  margin: 1rem auto .5rem;}
  .complete .sub_success{
    font-size: .36rem;}
  .complete .small_tip{
    color: #999;
    margin-top: .29rem;
    font-size: .26rem;text-align: center}
  .invate{
    color: #5C8EFF;margin-top:.8rem;padding-bottom: .18rem;
    font-size: .4rem;text-align: center;}
.boxs{
  float: left;}
  .boxs>div{
  width: 2.42rem;
    height:2.42rem ;
    margin-top: .44rem;
  }
  .btns_share>div{
    margin-left: 1.06rem;
    background: #5C8EFF;
    color: #fff;
    font-size: .3rem;
    text-align: center;
    margin-right: .58rem;
    overflow: hidden;
    }
  .btns_share img{
    width: .74rem;
    margin: .63rem auto .3rem;}
  .boxs>p{
    color: #999;
    font-size: .28rem;
    margin-top: .24rem;
  text-align: center}
  .btns_down img{
    width: 2.42rem;
   }
</style>
