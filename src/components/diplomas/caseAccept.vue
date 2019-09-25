<template>
        <div class="box">
            <div class="header">
                  <!-- <h2>福建省厦门市湖里区人民法院</h2> -->
                  <h2>诉前调解告知书</h2>
            </div>
         <div>
          <Form>
               <Row>
                     <Col span="8" push="14"  class="maininfo-col headerCase">
                        <input type="text" v-model="backFill.caseNo">
                     </Col>
                    
              </Row>
              <div class="main" style="font-size: 18px;letter-spacing: 5px;">
                 <Row>
                     <!-- <Col span="8" class="maininfo-col headerCase"> -->
                         <div style="width: 30%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.applyPeople"></div>：
                     <!-- </Col> -->
                </Row>
                 
                     <div class="lineHeight">
                          &emsp;&emsp;
                        你（司）通过全在线诉讼平台向本院提交的起诉状及相关电子材料收悉，并已登记收件号为<div style="width: 30%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.caseNo"></div>
                        。本院先指派调解工作人员组织双方当事人进行诉前调解，期限为<div style="width: 8%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.day"></Input></div>
                        天。双方当事人如有调解意向或达成调解协议的，请与我院工作人员<div style="width: 10%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.judge"></div>联系，联系电话：<div style="width: 20%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.judgePhone"></div>。若调解不成，请来院办理立案手续，联系电话<div style="width: 20%; display:inline-block;border-bottom:1px solid black;"><input type="text" v-model="backFill.courtPhone"></div>。
                     </div>
      
                     <Row>
                         <Col span="8" push="18" class="maininfo-col headerCase" style="margin-top:36px;">
                             <p>{{backFill.noticeTime}}</p>
                             <p>（院印）</p>
                         </Col>
                     </Row>
              </div>
              
            </Form>
          
          </div> 
        </div>
     
     </template>
     
     <script type="text/javascript">
     import { createMediationNotice } from '@/api/diplomas.js';
     export default {
         data(){
             return{
             //   backFill:{
             //         caseNo:'',
             //         briefName:'',
             //         litiganName:'',
             //         startTime:'',
             //         tribunalAddress:''
     
             //     }
             modelHid:true,
             title:'受理案件通知书',
             backFill:{}
             }
         },
          props: {
             // backFill:[Array,Object]
         },
         methods: {
             getInfo(ob){
                 this.backFill = JSON.parse(JSON.stringify(ob));
                 this.backFill.judge = '沈春福';
                 this.backFill.judgePhone = '0592-2621015';
                 this.backFill.courtPhone = '0592-2612690';
             },
             dipPro(){
                 // var _this = this;
                 // console.log(panelList);
                 // console.log('组件调用') 
                 let data = {
                         applyPeople:this.backFill.applyPeople,
                         caseNo:this.backFill.caseNo,
                         day:this.backFill.day,
                         onlineLawCaseId:this.backFill.onlineLawCaseId,
                         member:this.backFill.judge,
                         workerPhone:this.backFill.judgePhone,
                         courtPhone:this.backFill.courtPhone
                     }  
                   createMediationNotice(
                      data
                   ).then(res=>{
                    if(res.data.state == 100){
                         this.modelHid = false;
                         this.$emit('model',res.data.filePath);
                    }
               }).catch(() => {
                     this.$Message.error('网络错误，生成失败。');  
                 });
             }
             
         }
     }
     
     </script>
     <style lang="less" scoped>
       .box{
           margin: 0 auto;
           width: 700px;
           height: 100%;
           display: block;
         font-size: 15px;
       }
       .header{
           width:100%;
           text-align: center;
       }
       .main{
           width: 100%;
           height: 100%;
       }
     .headerCase{
         border:none !important;
         background-color: white !important;
     }
      .textIndent{
           text-indent:2em;  
       }
     .lineHeight{
         line-height: 26px;
     }
     .ivu-form-item{
         margin-bottom:11px;
     }
       .underline100{
         border-bottom: 1px solid black; 
         display: inline-block;
         width: 5%;
       }
        input{
           width: 100%;
           height: 30px;
           border: none;
           font-size: 15px;
           text-align: center;
       }
     </style>