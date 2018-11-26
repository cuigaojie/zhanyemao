<template>
  <div class="content">
    <!--填写流程-->
    <div class="flow"><img src="../assets/img/jinj_pic_qysh_b@2x.png" alt="" class=""></div>
         <ul class="tab_a">
      <li :class="{on:iptInfo2.ison}"  @click="isActive('对私账户')">对私账户</li>
      <li :class="{on:!iptInfo2.ison}"  @click="isActive('对公账户')">对公账户</li>
  </ul>
    <!--拍照获取信息-->
    <div class="image_list">
      <!--借记卡、-->
      <div class="default_img p_r pic5" v-if="iptInfo2.ison" >
        <!--<img :src="iptInfo2.jjk" alt="" id="imgSrc5">-->
        <!--<input type="file" name="image"  capture="camera"  accept="image/*" @change='getImg($event,"5")'   >-->
          <div  @click='getImg("5")' class="boximg">  <img :src="iptInfo2.jjk"  id="imgSrc5"/></div>
          <div class="box"  v-show="iptInfo2.jjk">
            <i class="delect" @click="delImg('5')"></i>
            <i class="look_big" @click="look('5')"></i>
          </div>
      </div>
      <!--开户许可证、-->
      <div class="default_img p_r pic6" v-if="!iptInfo2.ison">
        <!--<img :src="iptInfo2.khxkz" alt="" id="imgSrc6">-->
        <!--<input type="file" name="image"  capture="camera"  accept="image/*" @change='getImg($event,"6")'   >-->
          <div  @click='getImg("6")' class="boximg">  <img :src="iptInfo2.khxkz"  id="imgSrc6"/></div>
          <div class="box"  v-show="iptInfo2.khxkz">
            <i class="delect" @click="delImg('6')"></i>
            <i class="look_big" @click="look('6')"></i>
          </div>
      </div>
    </div>
    <!--显示拍照后的内容-->
    <ul class="mbt160 f_list padding">
      <li class="item bor_bt">
        <label> 入账户名</label>
        <input type="text" placeholder="请输入入账户名" v-model="iptInfo2.accountName" @keyup="getValue"></li>
      <li class="item bor_bt">
        <label>入款账号</label>
        <input type="text" placeholder="请输入入款账号" v-model="iptInfo2.account" @keyup="getValue"/></li>
      <li class="item bor_bt" @click="show">
        <i class="more_slt"></i> <label>开户银行</label>
        <input type="text" placeholder="请选择开户银行" v-model="iptInfo2.bank" @keyup="getValue" readonly/></li>
    </ul>
    <div class="bigImg" v-show="isEnlargeImage==true">
      <!--<img :src="base64Img" alt="">-->
      <img :src="base64Img" alt="">
    </div>
    <div class="mask" v-show="isEnlargeImage==true" @click="isEnlargeImage=false"></div>
    <div :class="{'light': isB}" class="next_btn" @click="nextStep2">下一步</div>
    <awesome-picker
      ref="picker"
      :data="picker.data"
      :anchor="picker.anchor"
      @cancel="handlePickerCancel"
      @confirm="handlePickerConfirm">
    </awesome-picker>
  </div>
</template>

<script>
  import {Actionsheet ,XSwitch} from 'vux'
  import imageUploadMixins from '@/mixins/image-compress'
  export default {
    name: "account",
    mixins: [imageUploadMixins],
    components: {
      Actionsheet,XSwitch
    },
    data(){
      return{
        isB:false,
        base64Img:'',
        isEnlargeImage:false,
        iptInfo2: this.$store.state.ipt_Info2,
        // iptInfo2:{jjk:'',khxkz:'',accountName:'',account:'',bank:'',type:'对私账户'},
        picker:{
          anchor: [],
          data: [],
          swipeTime:1000,
        },
        custid: sessionStorage.getItem('custid'),
        tid:this.$route.params.tid,
        nid:this.$route.params.nid,
      }
    },
    created(){
      //各大银行
      window.getImg=this.getImg;
      window.getPic=this.getPic;
      this.getBank();
    },
    mounted() {
      localStorage.setItem("nid", this.$route.params.nid);
      this.iptInfo2.accountName=sessionStorage.getItem("corporation");
      setTimeout((params,type) => {
        this.getPic(params,type)
      }, 20)},
    methods:{
      getBank(){
        this.$http.post(this.GLOBAL.host+'/enterprise/getBanklist')
          .then( (res)=> {
            var arr=new Array()
            var restxt=res.data.data;
            for(var i=0;i<restxt.length;i++){
              arr.push(restxt[i].bankName)
            }
            this.picker.data.push(arr)
            console.log(this.picker.data)
          })
      },
      isActive(type){
        this.iptInfo2.ison==true?this.iptInfo2.ison=false:this.iptInfo2.ison=true;
       this.iptInfo2.type=type;},
      dataURLtoFile(dataurl, filename) {//将base64转换为文件
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
      },

      getPic(params,type){
        var self=this;
        if (params!=null) {
          var dataurl=decodeURIComponent(params);
          var file=this.dataURLtoFile(decodeURIComponent(params),1);
          // self.checkAndHandleCompression(file).then( fileOptions => {
          //       let {uploadSrc, uploadFile} = fileOptions;
          //        if(type=='5'){//借记卡
          //           self.iptInfo2.jjk=uploadSrc;
          //           var data={"imagebase64": self.iptInfo2.jjk,"custId":self.custid,"fileName":"settlefrontpath"}
          //           self.$http.post(self.GLOBAL.host+'/tpisAuth/scanPhotoInfo',data,{
          //             headers: { 'Content-Type':'application/json;charset=utf-8' }
          //           }).then(res=>{
          //             if(res.data.code==0) {
          //               self.iptInfo2.account = res.data.data.accountNo.number;
          //               self.iptInfo2.jjk = res.data.data.accountNo.settlefrontpath;
          //             }
          //           },err =>{
          //             console.log(err)
          //           })
          //         }else if(type=='6') {//开户许可证
          //           self.iptInfo2.khxkz=uploadSrc;
          //         }
          //
          //     });
          // compress压缩
          let reader = new FileReader();
          //将图片转成base64格式
          reader.readAsDataURL(file);
          //读取成功后的回调
          reader.onloadend = function() {
            let result = this.result;
            let img = new Image();
            img.src = result;
            img.onload = function() {
              let ndata = self.common.compress(img);
              console.log(ndata)
              if(type=='5'){//借记卡
                self.iptInfo2.jjk=ndata;
                var data={"imagebase64": self.iptInfo2.jjk,"custId":self.custid,"fileName":"settlefrontpath"}
                self.$http.post(self.GLOBAL.host+'/tpisAuth/scanPhotoInfo',data,{
                  headers: { 'Content-Type':'application/json;charset=utf-8' }
                }).then(res=>{
                  if(res.data.code==0) {
                    self.iptInfo2.account = res.data.data.accountNo.number;
                    self.iptInfo2.jjk = res.data.data.accountNo.settlefrontpath;
                  }
                },err =>{
                  console.log(err)
                })
              }else if(type=='6') {//开户许可证
                self.iptInfo2.khxkz=ndata;
              }
            }
          }
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
      delImg(type){
        if (type==5) {
          this.iptInfo2.jjk=null
        }else if (type==6) {
          this.iptInfo2.khxkz=null
        }
      },
      look(type){
        this.isEnlargeImage=true;
        if (type==5) {
          this.base64Img = this.iptInfo.jjk
        }else if (type==1) {
          this.base64Img = this.iptInfo.khxkz
        }
      },
      getValue() {
        if (this.iptInfo2.accountName!=''&&this.iptInfo2.account!=''&&this.iptInfo2.bank!='') {
          this.isB = true;
        } else {
          this.isB =false ;
        }
      },
      nextStep2() {
          if(this.iptInfo2.jjk==''&&this.iptInfo2.type=='对私账户'){
            this.$vux.toast.text('请上传图片', 'center');
            return false;
          }else if (this.iptInfo2.khxkz==''&&this.iptInfo2.type=='对公账户') {
            this.$vux.toast.text('请上传图片', 'center');
            return false;
          }
         if (this.iptInfo2.accountName==''||this.iptInfo2.account==''||this.iptInfo2.bank=='') {
            this.$vux.toast.text('请填写所有信息', 'center');
            return false;
          }else {
            var step2 = {
              step: 2,
              custid: this.custid,
              accountNature: this.iptInfo2.type,
              accountName:  this.iptInfo2.accountName,
              bank: this.iptInfo2.bank,
              accountNo:this.iptInfo2.account,
              settlefrontpath:this.iptInfo2.jjk,
              openaccountpath:this.iptInfo2.khxkz,
            }
            this.$http.post(this.GLOBAL.host+'/enterprise/addMerchantInfo', step2)
              .then((res) => {
                console.log(step2)
                if (res.data.code == 0) {
                  this.$store.commit("showInfo2");
                  this.$router.push('/type/' + this.tid + '/' +this.nid + '/business');
                } else {
                  this.$vux.toast.text('提交失败', 'center');
                }
              })
          }
      },
      show() {this.$refs.picker.show();},
      handlePickerConfirm(v){
        this.picker.anchor = v
        this.iptInfo2.bank =  v[0].value ?  v[0].value : null;
      },
      handlePickerCancel(data){
      },
      maskclick(){ },

    },


  }

</script>

<style scoped>
  /*.pic5{*/
    /*background:url('../assets/img/jinj_pic_jjkzm@2x.png') center center;*/
    /*background-size: 4.9rem;*/
  /*}*/
  /*.pic6{*/
    /*background:url('../assets/img/jinj_pic_khxkz@2x.png') center center;*/
    /*background-size: 4.9rem;*/
  /*}*/

</style>
