<template>
  <div class="content" >

    <h1 class="title mtp105">请选择机具类型</h1>
    <ul id="" class="n_list mtp105">
      <li><router-link to="/type/8"><span>收款宝</span><img src="../assets/img/my_icon_lklskb.png" alt=""></router-link></li>
      <li><router-link to="/type/9"><span>智能POS</span><img src="../assets/img/my_icon_lklznpos.png" alt=""></router-link></li>
      <li><router-link to="/type/2"><span>传统POS</span><img src="../assets/img/my_icon_hfctpos.png" alt=""></router-link></li>
      <li><router-link to="/type/4"><span>收钱宝盒</span><img src="../assets/img/jinj_icon_sqbh.png" alt=""></router-link></li>
      <li><router-link to="/type/11"><span>超级收款宝</span><img src="../assets/img/my_icon_hfcsskb.png" alt=""></router-link></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'sltPage',
    data(){
      return{
      agentid:this.$route.params.agentid}
    },
    beforeCreate () {
      document.getElementsByTagName("body")[0].className="bground";
    },
    beforeDestroy () {
      document.getElementsByTagName("body")[0].className="bgcolor";
    },
    created(){
      sessionStorage.setItem("agentid",this.agentid);
    },
    mounted(){

    },
    methods:{




  }
  }
</script>
<style scoped>
</style>


