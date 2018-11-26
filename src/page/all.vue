<template>
    <div class="content ">
     <div class="tip"> 请对进件信息进行核查，确认无误后点击提交！  </div>
      <!--营业执照信息/结算信息 第一步-->
      <div class="mtp20 padding infoList">
        <div class="left_mark" v-if="nid==22"> 执照信息</div>
        <div class="left_mark" v-if="nid==11"> 结算信息</div>
        <div class="img_infos clearfix" v-if="nid==22">
         <div class="info_tit"> 营业执照</div>
         <div class="img_pub"><img :src="iptInfo.licensePath" alt=""> </div>
       </div>
        <div class="img_infos clearfix">
          <div class="info_tit">身份证正面</div>
          <div class="img_pub"><img :src="iptInfo.cardfrontpath" alt=""> </div>
        </div>
        <div class="img_infos clearfix">
          <div class="info_tit"> 身份证反面</div>
          <div class="img_pub"><img :src="iptInfo.cardbackpath" alt=""> </div>
        </div>
        <div class="img_infos clearfix" v-if="nid==11">
          <div class="info_tit"> 结算卡照片</div>
          <div class="img_pub"><img :src="iptInfo.settlefrontpath" alt=""> </div>
        </div>
        <div class="img_infos clearfix"  v-if="nid==11&&(tid==4||tid==11)">
          <div class="info_tit"> 门面照片</div>
          <div class="img_pub"><img :src="iptInfo.storephotopath" alt=""> </div>
        </div>
        <ul class="f_list" v-if="nid==22" >
          <li class="item bor_bt">
            <label> 法人姓名</label>
            <input type="text" placeholder="张三" v-model="iptInfo.corporation" readonly></li>
          <li class="item bor_bt">
            <label>法人身份证号</label>
            <input type="text" placeholder="" v-model="iptInfo.idCard"/></li>
          <li class="item bor_bt">
            <label>身份证有效期</label>
            <input type="text" placeholder="" v-model="iptInfo.expiryTime" /></li>
          <li class="item bor_bt">
            <label>营业执照号</label>
            <input type="text" placeholder="营业执照号" v-model="iptInfo.licenseNumber" /></li>
          <li class="item bor_bt">
            <label>营业执照地址</label>
            <input type="text" placeholder="营业执照地址" v-model="iptInfo.licenseName" /></li>
          <li class="item bor_bt">
            <label>营业执照地址</label>
            <input type="text" placeholder="营业执照地址" v-model="iptInfo.licenseAddress" /></li>
        </ul>
        <!--结算信息 第yibu-->
        <ul class=" f_list" v-if="nid==11">
          <li class="item bor_bt">
            <label> 入账户名</label>
            <input type="text" placeholder="张三" v-model="iptInfo.accountName" readonly></li>
          <li class="item bor_bt">
            <label>入账款号</label>
            <input type="text" placeholder="" v-model="iptInfo.accountNo" /></li>
          <li class="item bor_bt">
            <label>身份证号</label>
            <input type="text" placeholder="" v-model="iptInfo.idCard"/></li>
          <li class="item bor_bt">
            <label>身份证有效期</label>
            <input type="text" placeholder="" v-model="iptInfo.expiryTime"/></li>
          <li class="item bor_bt">
            <label>开户银行</label>
            <input type="text" placeholder="" v-model="iptInfo.bank" /></li>
        </ul>
      </div>
      <div class="mtp20 padding infoList" v-if="nid==22">
        <div class="left_mark"> 结算信息</div>
        <div class="img_infos clearfix"  v-if="iptInfo2.accountNature=='对私账户'">
          <div class="info_tit"> 结算卡照片</div>
          <div class="img_pub"><img :src="iptInfo2.settlefrontpath" alt=""> </div>
        </div>
        <div class="img_infos clearfix" v-if="iptInfo2.accountNature=='对公账户'">
          <div class="info_tit"> 开户许可证</div>
          <div class="img_pub"><img :src="iptInfo2.openaccountpath" alt=""> </div>
        </div>
        <ul class=" f_list" >
          <li class="item bor_bt">
            <label> 账户性质</label>
            <input type="text" placeholder="" v-model="iptInfo2.accountNature" readonly></li>
          <li class="item bor_bt">
            <label>入账户名</label>
            <input type="text" placeholder="" v-model="iptInfo2. accountName"/></li>
          <li class="item bor_bt">
            <label>入账款号</label>
            <input type="text" placeholder="" v-model="iptInfo2.accountNo" /></li>
          <li class="item bor_bt">
            <label>开户银行</label>
            <input type="text" placeholder="" v-model="iptInfo2.bank" /></li>
        </ul>
      </div>

      <!--商户信息 第三步，小微商户第二步-->
      <div class="mtp20 padding infoList">
        <div class="left_mark"> 商户信息</div>
        <ul class=" f_list">
          <li class="item bor_bt">
            <label> 签购单名称</label>
            <input type="text" placeholder="" v-model="iptInfo3.custName" readonly></li>
          <li class="item bor_bt">
            <label>联系人</label>
            <input type="text" placeholder="" v-model="iptInfo3.shortName"/></li>
          <li class="item bor_bt">
            <label>手机号</label>
            <input type="text" placeholder="" v-model="iptInfo3.telephone" /></li>
          <li class="item bor_bt">
            <label>对账单邮箱</label>
            <input type="text" placeholder="" v-model="iptInfo3.email" /></li>
          <li class="item bor_bt">
            <label>主营业务</label>
            <input type="text" placeholder="" v-model="iptInfo3.mainBusiness"/></li>
          <li class="item bor_bt">
            <label>商户地区</label>
            <input type="text" placeholder="" v-model="iptInfo3.macAddress" /></li>
          <li class="item bor_bt">
            <label>详细地址</label>
            <input type="text" placeholder="" v-model="iptInfo3.adress" /></li>
        </ul>
      </div>
      <!--终端信息 小微商户第三步 企业第四部-->
      <div class="mtp20 padding infoList">
        <div class="left_mark"> 终端信息</div>
        <ul class=" f_list">
          <li class="item bor_bt" v-if="tid==8">
            <label> 机具编号</label>
            <input type="text" placeholder="" v-model="iptInfo4.macserial" readonly></li>
          <li class="item bor_bt">
            <label>开通即刷即到</label>
            <input type="text" placeholder="" v-model="iptInfo4.isNo" readonly style="text-align: center"/></li>
          <li class="item bor_bt" v-if="nid==11&&iptInfo4.isNo=='是'">
            <label> 姓名</label>
            <input type="text" placeholder="" v-model="iptInfo4.name" readonly></li>
          <li class="item bor_bt" v-if="nid==11&&iptInfo4.isNo=='是'">
            <label> 身份证号</label>
            <input type="text" placeholder="" v-model="iptInfo4.isCard" readonly></li>
          <li class="item bor_bt" v-if="nid==11&&iptInfo4.isNo=='是'">
            <label> 信用卡卡号</label>
            <input type="text" placeholder="" v-model="iptInfo4.accNo" readonly></li>
          <li class="item bor_bt" v-if="nid==11&&iptInfo4.isNo=='是'">
            <label> 银行预留手机号</label>
            <input type="text" placeholder="" v-model="iptInfo4.phoneNo" readonly></li>
          <li class="clearfix bor_bt padbt20" v-if="iptInfo4.isNo=='是'">
            <div class="md33 tit_end_info clearfix"><span>D0手续费</span><span>金额（%）</span></div>
            <div class="md33 clearfix"  v-if="tid==2||tid==8||tid==9||tid==11">
              <span>D0刷卡</span><span>{{iptInfo4.shuakafee}}</span>
            </div>
            <div class="md33 clearfix"  v-if="tid==4||tid==9||tid==11">
              <span>D0扫描</span><span>{{iptInfo4.saomashoufee}}</span>
            </div>
          </li>
          <li class=" bor_bt clearfix padbt20">
            <div class="md33 tit_end_info clearfix"><span>支持卡类</span><span>费率（%）</span><span>封顶</span></div>
            <div class="md33 clearfix"  v-if="tid==8||tid==9||tid==2||tid==11">
              <span>借记卡</span><span>{{iptInfo4.baseRate}}</span><span>20元</span>
            </div>
            <div class="md33 clearfix"  v-if="tid==8||tid==9||tid==2||tid==11">
              <span>贷记卡</span><span>{{iptInfo4.creditRate}}</span><span></span>
            </div>
            <div class="md33 clearfix"  v-if="tid==4||tid==9||tid==2||tid==11">
              <span>扫描</span><span>{{iptInfo4.scavenging}}</span><span></span>
            </div>
            <div class="marbt80" v-if="nid==11"></div>
          </li>
        </ul>
      </div>
      <!--图片资料 第五步-->
      <div class="mtp20 padding padbt100 infoList" v-if="nid==22">
        <div class="left_mark"> 图片资料</div>
        <div class="img_infos clearfix">
          <div class="info_tit"> 门头照照片</div>
          <div class="img_pub"><img :src="iptInfo5.storephotopath" alt=""></div>
        </div>
      </div>
      <div  class="next_btn light" @click="nextStep">确认提交</div>
    </div>
</template>

<script>
    export default {
        name: "all",
        data(){
          return{
            // iptInfo:this.$store.state.ipt_Info,
            iptInfo:{cardfrontpath:'',licensePath:'',cardbackpath:'',storephotopath:'',settlefrontpath:'',corporation:'', idCard:"",licenseNumber:"",licenseName:'',licenseAddress:"",expiryTime:'', accountName:'',accountNo:'',bank:''},
            iptInfo2:{settlefrontpath:'', accountNature:'',accountName:'',accountNo:'',bank:'',openaccountpath:''},
            iptInfo3:{adress:'',macAddress:'',mainBusiness:'',email:'',telephone:'',shortName:"",custName:"",},
            iptInfo4:{macserial:'',isNo:'', saomashoufee:'',shuakafee:'',baseRate:'',capValue:"",creditRate:"",
              accNo:'',phoneNo:'',isCard:''},
            iptInfo5:{storephotopath:""},
            tid:this.$route.params.tid,
            nid:this.$route.params.nid,
            custid: sessionStorage.getItem('custid')
          }
        },
      created(){
          this.getStep1Data();
          this.getStep2Data();
          this.getStep3Data();
          this.getStep4Data();
          this.getStep0Data()
      },
      methods:{
        getStep0Data(){
          let step0={step:0,custid: this.custid
          }
          if (this.nid==22){
            this.$http.post(this.GLOBAL.host+'/enterprise/getMerchatInfo',step0)
              .then( (res)=> {
                console.log(res.data.data)
                this.iptInfo.licensePath=res.data.data.licensePath;
                this.iptInfo.cardfrontpath=res.data.data.cardfrontpath;
                this.iptInfo.cardbackpath=res.data.data.cardbackpath;
                this.iptInfo.corporation= res.data.data.corporation;
                this.iptInfo.idCard=res.data.data.idCardNo;
                this.iptInfo.expiryTime=res.data.data.expiryTime;
                this.iptInfo.licenseNumber=res.data.data.licenseNumber;
                this.iptInfo.licenseName=res.data.data.licenseName;
                this.iptInfo.licenseAddress= res.data.data.licenseAddress;
              })
          }else if (this.nid==11) {
            this.$http.post(this.GLOBAL.host+'/smallMicro/getMerchatInfo',step0)
              .then( (res)=> {
                console.log(res.data.data)
                this.iptInfo.cardfrontpath=res.data.data.cardfrontpath;
                this.iptInfo.cardbackpath=res.data.data.cardbackpath;
                this.iptInfo.settlefrontpath=res.data.data.settlefrontpath;
                this.iptInfo.storephotopath=res.data.data.storephotopath;
                this.iptInfo.accountNo= res.data.data.accountNo;
                this.iptInfo.idCard=res.data.data.idCard;
                this.iptInfo.expiryTime=res.data.data.expiryTime;
                this.iptInfo.bank=res.data.data.bank;
                this.iptInfo.accountName= res.data.data.accountName;
              })
          }

        },
        getStep1Data(){
          let step1={step:1,custid:this.custid }
          if (this.nid==22){
            this.$http.post(this.GLOBAL.host+'/enterprise/getMerchatInfo',step1)
              .then( (res)=> {
                console.log(res.data.data)
                this.iptInfo2.settlefrontpath=res.data.data.settlefrontpath;
                this.iptInfo2.openaccountpath=res.data.data.openaccountpath;
                this.iptInfo2.accountName=res.data.data.accountName;
                this.iptInfo2.accountNo=res.data.data.accountNo;
                this.iptInfo2.bank=res.data.data.bank;
                this.iptInfo2.accountNature=res.data.data.accountNature;
              })
          }else if (this.nid==11) {
            this.$http.post(this.GLOBAL.host+'/smallMicro/getMerchatInfo',step1)
              .then( (res)=> {
                console.log(res.data.data)
                var address=res.data.data.pcd;
                if(res.data.data.pcd.length==0){
                  this.iptInfo3.macAddress=res.data.data.autoAdress
                }else{
                  this.iptInfo3.macAddress=address[0]+address[1]+address[2]
                }
                this.iptInfo3.mainBusiness=res.data.data.mainBusiness;
                this.iptInfo3.custName=res.data.data.custName;
                this.iptInfo3.shortName=res.data.data.shortName;
                this.iptInfo3.telephone=res.data.data.telephone;
                this.iptInfo3.custName=res.data.data.custName;
                this.iptInfo3.email=res.data.data.email;
                this.iptInfo3.adress=res.data.data.adress;
              })
          }
        },
        getStep2Data(){
          //商户信息
          let step2={step:2,custid:this.custid }
          if (this.nid==22){
            this.$http.post(this.GLOBAL.host+'/enterprise/getMerchatInfo',step2)
              .then((res)=> {
                var address=res.data.data.pcd;
                if(res.data.data.pcd.length==0){
                  this.iptInfo3.macAddress=res.data.data.autoAdress
                }else{
                  this.iptInfo3.macAddress=address[0]+address[1]+address[2]
                }
                this.iptInfo3.mainBusiness=res.data.data.mccNo;
                this.iptInfo3.custName=res.data.data.custName;
                this.iptInfo3.shortName=res.data.data.shortName;
                this.iptInfo3.macAddress=address[0]+address[1]+address[2]
                this.iptInfo3.telephone=res.data.data.telephone;
                this.iptInfo3.custName=res.data.data.custName;
                this.iptInfo3.email=res.data.data.email;
                this.iptInfo3.adress=res.data.data.adress;
              })
          }else if (this.nid==11) {
            // 终端信息 小微
            this.$http.post(this.GLOBAL.host+'/smallMicro/getMerchatInfo',step2)
              .then( (res)=> {
                console.log(res.data.data);
                if ( res.data.data.isD0==0){
                  this.iptInfo4.isNo='否'
                }else if(res.data.data.isD0==1){
                  this.iptInfo4.isNo='是'
                }
                this.iptInfo4.macserial=res.data.data.macserial;//机具编号
                this.iptInfo4.name=res.data.data.name;//
                this.iptInfo4.isCard=res.data.data.idCard;//
                this.iptInfo4.accNo=res.data.data.accNo;//
                this.iptInfo4.phoneNo=res.data.data.phoneNo;//
                this.iptInfo4.saomashoufee=res.data.data.saomashoufee;//扫码
                this.iptInfo4.shuakafee=res.data.data.shuakafee;//刷卡
                this.iptInfo4.baseRate=res.data.data.baseRate;//借记卡费率
                this.iptInfo4.creditRate=res.data.data.creditRate;//贷记卡费率
                this.iptInfo4.scavenging=res.data.data.scavenging;//扫码手续费
              })
          }
        },
        getStep3Data(){
          //企业商户终端信息
          if (this.nid==22){
            this.$http.post("http://10.33.250.49:3333/enterprise/getMerchatInfo",{ "custid":this.custid, "step":3})
              .then((res)=> {
                console.log(res.data.data);
                if ( res.data.data.isD0==0){
                  this.iptInfo4.isNo='否'
                }else if(res.data.data.isD0==1){
                  this.iptInfo4.isNo='是'
                }
                this.iptInfo4.macserial=res.data.data.macserial;//机具编号
                this.iptInfo4.saomashoufee=res.data.data.saomashoufee;//扫码
                this.iptInfo4.shuakafee=res.data.data.shuakafee;//刷卡
                this.iptInfo4.baseRate=res.data.data.debitRate;//借记卡费率
                this.iptInfo4.creditRate=res.data.data.creditRate;//贷记卡费率
                this.iptInfo4.scavenging=res.data.data.scavenging;//shaomiao
              })
          }
        },
        getStep4Data(){
          //商户信息

          if (this.nid==22){
            this.$http.post(this.GLOBAL.host+'/enterprise/getMerchatInfo',{ "custid":this.custid, "step":4})
              .then((res)=> {
                console.log(res.data.data)
                this.iptInfo5.storephotopath=res.data.data.storephotopath;

              })
          }
        },
        nextStep(){
          this.$router.push('/type/' + this.tid + '/' +this.nid + '/success');
          }
      },

    }
</script>
<style scoped>
  .img_pub{
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;}
.img_pub img{
  width: auto;
  max-width: 3rem;}
</style>
