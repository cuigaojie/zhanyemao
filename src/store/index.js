import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
	// 导出store 数据仓库
export default new Vuex.Store({
				// 5. 数据仓库
		state:{
        ipt_Info:{name:'',endTime:'',licenceId:'',licenceName:'',licenceAddress:'',  endDate:'2999-12-30', startDate:'',
            mbank:'',mcardNum:'',mName:'',imgsrc0:"" ,cardId:'',imgsrc1:'',imgsrc2:'',imgsrc3:'',imgsrc4:''},
        ipt_Info2:{jjk:'',khxkz:'',accountName:'',account:'',bank:'',type:'对私账户',ison:true,},
        ipt_Info3:{orderName:'',linkName:'',email:'',work:[],address:[],autoAdress:'',detailAddress:'',phone:'',provid:'',cityid:'',districtid:''},
        ipt_Info4:{saomashoufee:0.10, debitRate:0.5,scavenging:0.38,creditRate:0.68,shuakafee:3,name: sessionStorage.getItem('mName'),
          cardid:sessionStorage.getItem('cardId'),phone:'',account:'',macNum:'', isD0:'0',off:false},
        ipt_Info5:{storephotopath:''},
		},
		mutations:{//同步的methods
      showInfo1(state){
        console.log(state.ipt_Info)
      },
      showInfo2(state){
        console.log(state.ipt_Info2)
      },
      showInfo3(state){
        console.log(state.ipt_Info3)
      },
      showInfo4(state){
        console.log(state.ipt_Info4)
      },
      showInfo5(state){
        console.log(state.ipt_Info5)
      },

		  },
    actions:{//相当于异步的mutations

    },
		getters:{//相当于computed

		}
})
