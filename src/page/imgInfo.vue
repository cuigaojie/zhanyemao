<template>
    <div class="content">
      <div class="flow"><img src="../assets/img/jinj_pic_qysh_e.png" alt="" class=""></div>
      <div class="image_list">
        <!--门面照、-->
        <div class="default_img p_r pic7">
          <!--<img :src="iptInfo5.storephotopath"  id="imgSrc7"/>-->
          <!--<input type="file" accept="image/*" capture="camera"  @keyup="getValue" @change='getImg($event,"7")'>-->

            <div  @click='getImg("7")' class="boximg">
              <img :src="iptInfo5.storephotopath"  id="imgSrc7"/>
            </div>
            <div class="box"  v-show="iptInfo5.storephotopath">
              <i class="delect" @click="delImg('7')"></i>
              <i class="look_big" @click="look('7')"></i>
            </div>

        </div>
        <!--收银台照-->
        <!--<div class="default_img p_r pic8">-->
          <!--<img :src="" />-->
          <!--<input type="file" accept="image/*" capture="camera"  @keyup="getValue">-->
        <!--</div>-->
        <!--&lt;!&ndash;店铺内部照、&ndash;&gt;-->
        <!--<div class="default_img p_r pic9">-->
          <!--<img :src="" />-->
          <!--<input type="file" accept="image/*" capture="camera"  @keyup="getValue">-->
        <!--</div>-->

      </div>
      <!--查看大图-->
      <div class="bigImg" v-show="isEnlargeImage==true">
        <!--<img :src="base64Img" alt="">-->
        <img :src="base64Img" alt="">
      </div>
      <div class="mask" v-show="isEnlargeImage==true" @click="isEnlargeImage=false"></div>
      <div :class="{'light': isB}" class="next_btn" @click="nextStep">下一步</div>
    </div>
</template>

<script>
  import imageUploadMixins from '@/mixins/image-compress'
    export default {
        name: "imgInfo",
      mixins: [imageUploadMixins],
      data(){
      return{
        isB:false,
        base64Img:'',
        isEnlargeImage:false,
        custid: sessionStorage.getItem('custid'),
        // iptInfo5:{"storephotopath":''},
        iptInfo5: this.$store.state.ipt_Info5,
        tid:this.$route.params.tid,
        nid:this.$route.params.nid,
      }
      },
      created(){
        window.getImg=this.getImg;
        window.getPic=this.getPic;
      },
      mounted() {
        localStorage.setItem("nid", this.$route.params.nid);
        setTimeout((params,type) => {
          this.getPic(params,type)
        }, 20)},
      methods:{
        getValue(){},
        dataURLtoFile(dataurl, filename) {//将base64转换为文件
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, {type:mime});
        },
        compress(img) {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          let initSize = img.src.length;
          let width = img.width;
          let height = img.height;
          canvas.width = width;
          canvas.height = height;
          // 铺底色
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
          //进行最小压缩
          let ndata = canvas.toDataURL("image/jpeg", 0.5);
          console.log("*******压缩后的图片大小*******");
          console.log(ndata.length);
          return ndata;
        },
        getPic(params,type){
          var self=this;
          // var dataurl=decodeURIComponent(params);
          if (params!=null) {
            var file=self.dataURLtoFile(decodeURIComponent(params),1);

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
                if(type=='7') {//开户许可证
                  self.iptInfo5.storephotopath=ndata;
                }
              }
            }
          }

        },
        getImg(arg){
          var u = navigator.userAgent, app = navigator.appVersion;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          if (isAndroid) {
            window.android.getPicture(arg); // Android
          }
          if (isIOS) {
            window.webkit.messageHandlers.getPicture.postMessage(arg);   // ios
          }
        },
        delImg(type){
          if(type==7){
            this.iptInfo5.storephotopath=null
          }
        },
        look(type){
          this.isEnlargeImage=true;
          if(type==7){
            this.base64Img=this.iptInfo5.storephotopath
          }
          },
        nextStep(){
          if(this.iptInfo5.storephotopath==''){
            this.$vux.toast.text('请上传图片', 'center');
          }else{
          let step5={step:5,storephotopath:this.iptInfo5.storephotopath,custid: this.custid}
          this.$http.post(this.GLOBAL.host+'/enterprise/addMerchantInfo', step5)
            .then((res) => {
              console.log(res)
              if (res.data.code == 0) {
                this.$store.commit("showInfo5");
                this.$router.push('/type/' + this.tid + '/' +this.nid + '/all');
              } else {
                this.$vux.toast.text('上传失败', 'center');
              }
            })
          }

        }
      }
    }
</script>

<style scoped>
  /*.pic7{*/
    /*background:url('../assets/img/jinj_pic_mmzp.png') center center;*/
    /*background-size: 4.9rem;*/
  /*}*/
  /*!*.pic8{*!*/
    /*background:url('../assets/img/jinj_pic_syt.png') center center;*/
    /*background-size: 4.9rem;*/
  /*}*/
  /*.pic9{*/
    /*background:url('../assets/img/jinj_pic_dpnb.png') center center;*/
    /*background-size: 4.9rem;*/
  /*}*/

</style>
