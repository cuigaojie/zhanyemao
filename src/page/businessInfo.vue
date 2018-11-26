<template>
  <div class="content">
    <div class="flow" v-if="nid==22"><img src="../assets/img/jinj_pic_qysh_b.png" alt="" class=""></div>
    <div class="flow_micro" v-if="nid==11"><img src="../assets/img/jinj_pic_xwsh_b.png" alt="" class=""></div>
    <ul class="mbt160 f_list padding">
      <li class="item bor_bt">
      <label> 签购单名称</label>
      <input type="text" placeholder="上海秉垚网络信息服务有限公司" class="longIpt"
             v-if="nid==22" v-model="iptInfo3.orderName" @keyup="getValue" style="width: 4.5rem;" >
        <input type="text" placeholder="上海秉垚网络信息服务有限公司" v-if="nid==11"
               v-model="iptInfo3.orderName" @keyup="getValue" style="width: 4.5rem;">
      </li>
      <li class="item bor_bt">
      <label>联系人</label>
      <input type="text" placeholder="请输入联系人" v-model="iptInfo3.linkName" @keyup="getValue" /></li>
      <li class="item bor_bt">
        <label>手机号</label>
        <input type="text" placeholder="请输入手机号" v-model="iptInfo3.phone" @keyup="getValue"/></li>
      <li class="item bor_bt">
        <label>对账单邮箱</label>
        <input type="text" placeholder="请输入邮箱地址" v-model="iptInfo3.email" @keyup="getValue"/></li>
      <!--<li class="item bor_bt" @click="getWork">-->
        <!--<i class="more_slt"></i><label>主营业务</label>-->
        <!--<input type="text" placeholder="请选择主营业务" v-model="iptInfo3.work" @keyup="getValue" readonly/></li>-->
      <li class="item bor_bt p_r" >
        <input class="p_abs" type="text" placeholder="请选择主营业务" v-show="!this.iptInfo3.work.length" @keyup="getValue" readonly/>
        <group>
          <popup-picker  :title="title1" :data="list2" :columns="2"  v-model="iptInfo3.work" show-name @on-change="getWork"></popup-picker>
        </group>
        <!--<i class="more_slt"></i><label>主营业务</label>-->
        <!---->
      </li>
      <li class="item bor_bt p_r" >
        <input class="p_abs" type="text" placeholder="请选择地区"
               v-model='iptInfo3.autoAddress' v-show="!this.iptInfo3.address.length" @keyup="getValue" readonly
        id="autoAddress"/>
        <group>
          <popup-picker  :title="title2" :data="list3" :columns="3" v-model="iptInfo3.address" show-name @on-change="getAddress"></popup-picker>
        </group>
      </li>
      <li class="item bor_bt">
        <label>详细地址</label>
        <input type="text" placeholder="请输入详细地址" v-model="iptInfo3.detailAddress" @keyup="getValue" style="width: 4.5rem;"/></li>
      <!--<awesome-picker-->
        <!--ref="picker"-->
        <!--:data="picker.data"-->
        <!--:anchor="picker.anchor"-->
        <!--@cancel="handlePickerCancel"-->
        <!--@confirm="handlePickerConfirm">-->
      <!--</awesome-picker>-->
    </ul>
    {{location}}
    <div :class="{'light': isB}" class="next_btn" @click="nextStep3">下一步</div>
  </div>
</template>
<script>
  import AMap from 'AMap'
  import { PopupPicker,Group } from 'vux'
    export default {
        name: "businessInfo",
       components: {
        PopupPicker,Group
      },

      data(){
          return{
            location: null,
            value4:[],
            title1:'主营业务',
            title2:'商户地址',
            custid:sessionStorage.getItem('custid'),
            agentid:sessionStorage.getItem('agentid'),
            iptInfo3: this.$store.state.ipt_Info3,
              // iptInfo3:{orderName:'',linkName:'',email:'',work:[],address:[],detailAddress:'',phone:'',provid:'',cityid:'',districtid:''},
              isB:false,
              tid:this.$route.params.tid,
              nid:this.$route.params.nid,
              list3:[],
            list2:[],
            picker:{
              anchor: [],
              data: [],
              swipeTime:1000,
            },
          }
      },
      created(){
      // 小微/企业商户
        this.$http.get('http://10.33.250.156:8080/static/allcity.json')
          .then( (res)=> {
            this.list3=res.data.result;
            // console.log(res.data)
          })
        // console.log(this.list4)
        this.$http.get('http://10.33.250.156:8080/static/work.json')
          .then( (res)=> {
            this.list2=res.data.result;
            // console.log(res.data)
          })
      },
      mounted(){
         this.initData();
        this.loadmap();     //加载地图和相关组件

      },

      methods:{
        loadmap(){
          var map = new AMap.Map('container', {
            resizeEnable: true
          });
          AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：5s
              buttonPosition:'RB',    //定位按钮的停靠位置
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
              if(status=='complete'){
                // console.log(result)
                let strings=result.formattedAddress;
                let index=strings.indexOf('区');
                let resultVal= strings.substring(0,index+1);
                document.getElementById('autoAddress').value=resultVal;
                sessionStorage.setItem('autoAddress',resultVal);
              }else{
                // let resultVal='上海市徐汇区';
                // sessionStorage.setItem('autoAddress',resultVal);
                // console.log(result)
              }
            });
          });
        },
          initData(){
          if (sessionStorage.getItem('autoAddress')!=''){
            this.iptInfo3.autoAddress= sessionStorage.getItem('autoAddress');
          }else{
          }

            if(this.nid==22){
              this.iptInfo3.orderName= sessionStorage.getItem('licenceName');
              this.iptInfo3.linkName= sessionStorage.getItem('corporation')
            }else if(this.nid==11) {
              this.iptInfo3.linkName = sessionStorage.getItem('mName')
            }
          },
        getValue(){
          if (this.iptInfo3.orderName!=''&&this.iptInfo3.linkName!=''&&this.iptInfo3.phone!=''&&this.iptInfo3.email!=''&&
            this.iptInfo3.work!=''&&this.iptInfo3.address!=''&&this.iptInfo3.detailAddress!=''){
            this.isB = true;
          } else {
            this.isB =false ;
          }
        },
        validphone(phone){
          let reg = /^1[34578]\d{9}$/;
          return reg.test(phone);
        },
        validpemail(email){
          let reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/;
          return reg.test(email);
        },
        nextStep3(){
          if (this.iptInfo3.orderName==''||this.iptInfo3.linkName==''||this.iptInfo3.phone==''||this.iptInfo3.email==''
            ||this.iptInfo3.work==''||this.iptInfo3.detailAddress=='') {
          // ||this.iptInfo3.address==''
            this.$vux.toast.text('请填写所有信息', 'center');
          }else if(!this.validphone(this.iptInfo3.phone)){
            this.$vux.toast.text('请填写正确手机号', 'center');
          }else if(!this.validpemail(this.iptInfo3.email)){
            this.$vux.toast.text('请填写正确邮箱', 'center');
          }else {
            if (this.nid==22){
              var step3 = {
                step: 3,
                custid: this.custid,
                agentid:this.agentid,
                custname:this.iptInfo3.orderName,
                shortName:this.iptInfo3.linkName,
                email:this.iptInfo3.email,
                mccNo:this.iptInfo3.work,
                telePhone:this.iptInfo3.phone,
                address:this.iptInfo3.detailAddress,
                pcd:this.iptInfo3.address,
                autoAdress:this.iptInfo3.autoAdress
                // provid:this.iptInfo3.provid,
                // cityid:this.iptInfo3.districtid,
                // districtid:this.iptInfo3.districtid
              }
              this.$http.post(this.GLOBAL.host+'/enterprise/addMerchantInfo', step3)
                .then((res) => {
                  if (res.data.code == 0) {
                    this.$store.commit("showInfo3");
                    this.$router.push('/type/' + this.tid + '/' +this.nid + '/end');
                  } else {
                    this.$vux.toast.text(res.data.data, 'center');
                  }
                })
            }else if (this.nid==11){
              var step3 = {
                step: 2,
                custid: this.custid,
                agentid:this.agentid,
                macType:this.tid,
                custname:this.iptInfo3.orderName,
                shortName:this.iptInfo3.linkName,
                email:this.iptInfo3.email,
                mccNo:this.iptInfo3.work,
                telePhone:this.iptInfo3.phone,
                address:this.iptInfo3.detailAddress,
                pcd:this.iptInfo3.address,
                autoAdress:this.iptInfo3.autoAddress
              }
              this.$http.post(this.GLOBAL.host+'/smallMicro/addMerchantInfo', step3)
                .then((res) => {
                console.log(res)
                  console.log(step3)
                  if (res.data.code == 0) {
                    this.$store.commit("showInfo3");
                    sessionStorage.setItem('phone',this.iptInfo3.phone)
                    this.$router.push('/type/' + this.tid + '/' +this.nid + '/end');
                  } else {
                    this.$vux.toast.text('提交失败', 'center');
                  }
                })

            }

          }

        },
        getAddress(v){
            this.iptInfo3.provid=v[0];
            this.iptInfo3.districtid=v[1];
            this.iptInfo3.districtid=v[2];
        },
        getWork(v){
          console.log(v)
          // this.$refs.picker.show();
        },
        // handlePickerCancel(){},
        // handlePickerConfirm(v){
        //   this.picker.anchor = v
        //   this.iptInfo.work =  v[0].value ?  v[0].value : null;
        //   console.log( v[0].value)
        // },
      }
    }
</script>

<style scoped>
  .p_abs{
    position: absolute;
    top: 0;
    left:1.7rem;}
</style>
