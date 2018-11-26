<template>

<div class="content">
  <div v-show="false">{{tid}}</div>
<h1 class="mtp105 title">请选择商户性质</h1>
  <ul class="mtp295 n_list">
    <li @click="jump(tid,'11')"><a href="javascript:;"><span>小微商户进件</span><img src="../assets/img/jinj_icon_xwsh.png" alt=""></a></li>
    <li @click="jump(tid,'22')"><a href="javascript:;"><span>企业商户进件</span><img src="../assets/img/jinj_icon_qysh.png" alt=""></a></li>
  </ul>
</div>
</template>

<script>
    export default {
        name: "typePage",
      beforeCreate () {
        document.getElementsByTagName("body")[0].className="bground";
      },
      beforeDestroy () {
        document.getElementsByTagName("body")[0].className="bgcolor";
      },
      data(){
        return {
          tid:''
        }
      },
      methods:{
        jump(tid,nid){
          var  tid = this.$route.params.tid;
          this.tid=tid,
          this.$router.push('/type/'+tid+'/'+nid);
        }
      },
      mounted:function(){
        localStorage.setItem("tid", this.$route.params.tid);
      }

      }
</script>
<style scoped>
  body{
    /*position: fixed;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*top: 0px;*/
    /*background-image:url('../assets/img/jinj_bg_indexbg@2x.png');*/
    /*background-size:cover;*/
    /*background-position: center center;*/
    /*background-repeat: no-repeat;*/
    /*background-attachment: fixed;*/
    /*background-color: #F3F5F9;*/
    /*min-height:100%*/
  }
</style>

