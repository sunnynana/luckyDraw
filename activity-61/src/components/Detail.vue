<template>
  <div class="detail">
    <div class="back_home" @click="backHome">

    </div>
    <div class="serial">
      {{registrate.formatId}}号
    </div>
    <div class="ticket_number">
    票数:
       {{registrate.votes}}
    </div>
    <div class="detail_pic">
        <img :src="image.picUrl" v-for="image in registrate.activeUserPicDtos"/>
        <img src="../assets/photo.jpg" alt="">
    </div>
    <div class="btn_box">
      <div class="detail_btn1" @click="vote">

      </div>
      <router-link to="/Join">
        <div class="detail_btn2"/>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        registrateId: this.$route.params.registrateId,
        registrate:{}
    }
  },
  methods:{
    /*back(){
      location.hash = '/join';

    },*/
    backHome(){
       location.hash = '/home';
    },
    vote(){
      this.$http.post("/game-app/registrate/votes",{
          "activeId":"1",
          "activeRegistrateId":this.registrateId,
          "sourceUser":window.$sourceUserToken, // TODO
          "voteUser":window.$userToken, //TODO
      }).then((res)=>{
          if(res.data.code=='000000'){
            alert("投票成功，你已为你喜欢的萌宝投上了一票！");
            this.registrate.votes++;
          }else if(res.data.code=='100063'){
            alert("你今天的投票次数用完了，请明天再来投票吧！");
          }else if(res.data.code=='100083'){
            alert(res.data.message);
          }else{
            alert("你今天已经为该萌宝投过票！");
          }
      })
    }

  },
  mounted:function(){
        this.$http.post("/game-app/queryRegistrateDetail",{id:this.registrateId}).then(function(res){
            if(res.data.code != '000000'){
              alert(this.registrateId + "不存在")
            } else {
              this.registrate = res.data.data;
            }
        })
        window.$detailId=this.registrateId;
        window.getWxJsToken();
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  $font-size-base:75px;
  @function pxTorem($px) {
      @return $px / $font-size-base * 1rem;
  }
  .detail{
    background:  url("../assets/detail_bg.jpg") no-repeat center;
    height:pxTorem(1323px) ;
    width:pxTorem(750px) ;
    background-size: 100%;
    color: #ffffff;
    font-size: pxTorem(42px) ;
    .back_home{
      background:  url("../assets/canvassing2.png") no-repeat center;
      height:pxTorem(60px) ;
      width:pxTorem(240px) ;
      background-size: 100%;
      position: absolute;
      left:50%;
      margin-left:  pxTorem(-120px) ;
      top: pxTorem(1230px) ;
    }
    .serial{
      float: left;
      margin-top:  pxTorem(91px) ;
      margin-left: pxTorem(60px) ;
    }
    .ticket_number{
      float: right;
      margin-top:  pxTorem(93px) ;
      margin-right: pxTorem(65px) ;
    }
    .detail_pic{
      position: absolute;
      width: pxTorem(630px);
      height:pxTorem(840px);
      margin-left: pxTorem(-315px);
      top:  pxTorem(190px);
      left: 50%;
      overflow: hidden;
      background: #cacaca;
      img{
        width: 100%;
      }
    }
    .detail_pic img{
      width:100%;
      height:100%;
    }
    .btn_box{
      position: absolute;
      height:pxTorem(160px) ;
      width:pxTorem(633px) ;
      margin-left: pxTorem(-316.5px);
      left: 50%;
      top: pxTorem(1050px);
    }
    .detail_btn1,.detail_btn2{
      background:  url("../assets/detail_2.png") no-repeat center;
      height:pxTorem(70px) ;
      width:pxTorem(633px) ;
      background-size: 100%;
      margin-bottom: pxTorem(10px) ;
    }
    .detail_btn2{
      background:  url("../assets/detail_1.png") no-repeat center;
       background-size: 100%;
    }
  }
</style>
