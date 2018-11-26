
<template>
    <div class="content">
      <div class="flow" v-if="nid==22"><img src="../assets/img/jinj_pic_qysh_d.png" alt="" class=""></div>
      <div class="flow_micro" v-if="nid==11"><img src="../assets/img/jinj_pic_xwsh_c.png" alt="" class=""></div>
      <div  v-if="tid==8" class="toolNo bor_bt">
        <label>机具编号</label><input type="text" placeholder="请输入机具编号" v-model="iptInfo4.macNum" @keyup="getValue">
        <span @click="getImg('8')">  <img  src="../assets/img/list_icon_sys.png" alt=""></span></div>
      <div class="swith clearfix bor_bt" >
        <div class="frt">
          <input type="checkbox" name="switch" id="switch" class="chooseBtn"
                  v-model="iptInfo4.off" @click="getStatus(!iptInfo4.off)"/>
          <!--{{iptInfo4.off}}-->
          <label for="switch" class="choose-label" ></label>
        </div>
        <div class="flt">开通即刷即到</div>
      </div>
        <!--小微商户填写信息-->
      <div v-if="iptInfo4.off==true&&nid==11">
        <ul class=" f_list padding">
          <li class="item bor_bt">
            <label> 姓名</label>
            <input type="text" placeholder="请输入用户名" v-model="iptInfo4.name" @keyup="getValue"></li>
          <li class="item bor_bt">
            <label>身份证号</label>
            <input type="text" placeholder="请输入身份证号" v-model="iptInfo4.cardid" @keyup="getValue"/></li>
          <li class="item bor_bt">
            <label> 信用卡卡号</label>
            <input type="text" placeholder="请输入信用卡卡号" v-model="iptInfo4.account" @keyup="getValue">
            <span class="photo"  @click="getImg('9')"><img src="../assets/img/list_icon_paizhao.png" alt=""></span></li>
          <li class="item bor_bt">
            <label>银行预留手机号</label>
            <input type="text" placeholder="13783623247" v-model="iptInfo4.phone" @keyup="getValue"/></li>
        </ul>
      </div>

      <div class=" number" ><!-- v-if="tid==2||tid==3||tid==5"-->
          <div v-if="iptInfo4.off==true">
            <div class="num_tit"><span>秒到手续费</span><span>金额（元/笔）</span><span>封顶</span></div>
            <div class="num_type padding">
              <div class="clearfix" v-if="tid==2||tid==8||tid==9||tid==11">
                <div  class="leftPre"><x-number title="刷卡秒到手续费" v-model="iptInfo4.shuakafee" :max="5" :min="0"></x-number> </div>
                <div class="topNum">0~5</div>
              </div>
              <div class="clearfix" v-if="tid==4||tid==9||tid==11">
                <div  class="leftPre"><x-number title="扫码秒到手续费" v-model="iptInfo4.saomashoufee" :max="0.10" :min="0.10"></x-number> </div>
                <div class="topNum">%</div>
              </div>
            </div>
          </div>
          <div class="num_tit"><span>支持卡类</span><span>费率(%)</span><span>封顶</span></div>
          <div class="num_type padding" style="margin-bottom:.8rem">
            <div class="clearfix" v-if="tid==8||tid==9||tid==2||tid==11">
              <div  class="leftPre"><x-number title="借记卡" v-model="iptInfo4.debitRate" :max="0.5" :min="0.5"></x-number> </div>
              <div class="topNum">20元</div>
            </div>
            <div class="clearfix" v-if="tid==8||tid==9||tid==2||tid==11">
              <div class="leftPre" > <x-number title="贷记卡" v-model="iptInfo4.creditRate" :step=".01" :max="0.70" :min="0.55"></x-number></div>
              <div class="topNum">0.55~0.70</div>
            </div>
            <div class="clearfix" v-if="tid==4||tid==2||tid==9||tid==11">
              <div class="leftPre">
                <x-number title="扫码" v-model="iptInfo4.scavenging" :step=".01" :max="0.60" :min="0.30"></x-number>
              </div>
              <div class="topNum">0.30~0.60</div>
            </div>
          </div>
        </div>
      <div :class="{'light': isB}" class="next_btn" @click="nextStep">下一步</div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { Toast,ToastPlugin,XNumber,Group,XSwitch } from 'vux'
  Vue.use(ToastPlugin)
  export default {
    name:'endInfo',
    components: {
      XNumber,Group,XSwitch
    },
    data(){
      return {
        iptInfo4: this.$store.state.ipt_Info4,
        // iptInfo4:{saomashoufee:0.10, debitRate:0.5,scavenging:0.38,creditRate:0.68,
        //   shuakafee:3,name: sessionStorage.getItem('mName'),cardid:sessionStorage.getItem('cardId'),phone:'',account:'',macNum:'', isD0:'0',off:false},
        isB:false,
        custid: sessionStorage.getItem('custid'),
        tid:this.$route.params.tid,
        nid:this.$route.params.nid,
        agentid: sessionStorage.getItem('agentid'),
      }
    },
    created(){
      window.getImg=this.getImg;
      window.getPic=this.getPic;

      if(this.nid==11){
        this.iptInfo4.phone=  sessionStorage.getItem('phone')
        this.iptInfo4.name= sessionStorage.getItem('mName');
        this.iptInfo4.cardid= sessionStorage.getItem('cardId');
      }
      if(this.tid==8){
        this.$vux.toast.text('收款宝必须开通D0到账', 'center');
        this.iptInfo4.off=true;
        this.iptInfo4.isD0=1;
        return false
      }
    },
    mounted() {
      localStorage.setItem("nid", this.$route.params.nid);
      setTimeout((params,type) => {
        this.getPic(params,type)
      }, 20)},
    methods:{
      getStatus(status){
        if (status==true){
          this.iptInfo4.isD0=1;
          console.log(this.iptInfo4.isD0);
        }else{
          this.iptInfo4.isD0=0;
          console.log(this.iptInfo4.isD0);
        }
      },
      nextStep(){
        if(this.nid==22) {
          if (this.tid == 8&&this.iptInfo4.macNum == '') {
              this.$vux.toast.text('机具编号不能为空', 'center');
            }
            if (this.iptInfo4.isD0==0){
              console.log(this.iptInfo4.isD0)
            } else{
              console.log(this.iptInfo4.isD0)
            }
              let step4 = {
                "step": 4,
                "custid": this.custid,
                "agentid": this.agentid,
                "macType": this.tid,
                "isD0": this.iptInfo4.isD0,
                "debitRate": this.iptInfo4.debitRate,//jiejika
                "creditRate": this.iptInfo4.creditRate,//daijika
                "scavenging": this.iptInfo4.scavenging,//smfl
                "saomashoufee": this.iptInfo4.saomashoufee,
                "shuakafee": this.iptInfo4.shuakafee,
                "macserial": this.iptInfo4.macNum
              }
              this.$http.post(this.GLOBAL.host + '/enterprise/addMerchantInfo', step4)
                .then((res) => {
                  console.log(res)
                  console.log(step4)
                  this.$store.commit("showInfo4");
                  this.$router.push('/type/' + this.tid + '/' + this.nid + '/img');
                })
            }
          else if (this.nid == 11) {
              let step4 = {
                step:3,
                custid:this.custid,
                agentid: this.agentid,
                macType: this.tid,
                isD0: this.iptInfo4.isD0,
                debitRate: this.iptInfo4.debitRate,
                creditRate: this.iptInfo4.creditRate,
                scavenging: this.iptInfo4.scavenging,
                saomashoufee: this.iptInfo4.saomashoufee,
                shuakafee: this.iptInfo4.shuakafee,
                macserial:this.iptInfo4.macNum
              }
          if(this.iptInfo4.isD0==1){
            let  verify={ custid: this.custid,
              mobile:this.iptInfo4.phone,
              cardno:this.iptInfo4.account,}
            this.$http.post(this.GLOBAL.host + '/tpisAuth/verifyBankCard', verify)
              .then((res) => {
                if (res.data.code==0) {// 手机号与银行卡号匹配
                  this.$http.post(this.GLOBAL.host + '/smallMicro/addMerchantInfo', step4)
                    .then((res) => {
                      console.log(step4)
                      if (res.data.code==0) {
                        this.$store.commit("showInfo4");
                        this.$router.push('/type/' + this.tid + '/' + this.nid + '/all');
                      }else{
                        this.$vux.toast.text(res.data.data, 'center');
                      }
                    })
                }else{
                  this.$vux.toast.text(res.data.data, 'center');
                }
              })
          }else if(this.iptInfo4.isD0==0){
            console.log(this.iptInfo4.isD0);
            this.$http.post(this.GLOBAL.host + '/smallMicro/addMerchantInfo', step4)
              .then((res) => {
                console.log(step4)
               if (res.data.code==0) {
                 this.$store.commit("showInfo4");
                 this.$router.push('/type/' + this.tid + '/' + this.nid + '/all');
               }else{
                 this.$vux.toast.text(res.data.data, 'center');
               }
              })
          }
          }
      },
      getValue(){
        if(this.nid==22){
            if(this.iptInfo4.macNum!=''){
              this.isB = true;
            } else {
              this.isB =false ;
            }
        }else{
          if(this.tid==8){
            if (this.iptInfo4.macNum!=''&&this.iptInfo4.name!=''&&this.iptInfo4.cardid!=''&&this.iptInfo4.phone!=''&&this.iptInfo4.account!='') {
              this.isB = true;
            } else {
              this.isB =false ;
            }
          }else{
            if (this.iptInfo4.name!=''&&this.iptInfo4.cardid!=''&&this.iptInfo4.phone!=''&&this.iptInfo4.account!='') {
              this.isB = true;
            } else {
              this.isB =false ;
            }
          }
        }
      },
      getPic(params,type){
        if(type=='8'){//机具编号
          this.iptInfo4.macNum=params;
        }else if(type=='9') {//信用卡
          this.iptInfo4.account=decodeURIComponent(params);
          var data={"imagebase64":this.iptInfo4.account,"custId":this.custid,"fileName":"settlefrontpath"}
          this.$http.post(this.GLOBAL.host+'/tpisAuth/scanPhotoInfo',data,{
            headers: { 'Content-Type':'application/json;charset=utf-8' }
          }).then(res=>{
            console.log(res.data.data);
            this.iptInfo4.account=res.data.data.accountNo.number;
          },err =>{
            console.log(err)
          })

        }
      },
      getImg(arg){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        // console.log(arg)
        if (isAndroid) {
          window.android.getPicture(arg); // Android
        }
        if (isIOS) {
          window.webkit.messageHandlers.getPicture.postMessage(arg);   // ios
        }
      },
    },

  }
</script>
<style>
.f_list input{
  width: 4.2rem;
  text-indent: .2rem;}

</style>
