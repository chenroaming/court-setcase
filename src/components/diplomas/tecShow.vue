<template>
   <div class="box">
       <div class="header">
             <!-- <h2>福建省厦门市湖里区人民法院</h2> -->
             <h2>当事人提交电子诉讼材料技术规范</h2>
       </div>
    <div>
     <Form>

         <div class="main" style="font-size: 18px;letter-spacing: 5px;margin-top:25px;">
            
                <div class="lineHeight">
                     &emsp;&emsp;
                   1.电子诉讼材料提交应当根据材料内容按件区分，如起诉状、身份证明材料、委托材料、证据材料等，并根据上述内容对该电子文件规范命名，同一案件内的材料命名不得重复，单个电子诉讼材料大小不超过100MB；
                </div>
                <div class="lineHeight">
                     &emsp;&emsp;
                   2.电子诉讼材料应当以PDF格式提交，同一内容中的所有材料应当合并为同一个PDF文件；
                </div>
                <div class="lineHeight">
                     &emsp;&emsp;
                   3.电子诉讼材料如系通过纸质材料扫描形成，扫描模式应为24位或以上彩色扫描，扫描分辨率应当不小于300DPI，如文字偏小、密集、清晰度较差时，建议扫描分辨率不小于400DPI；
                </div>
                <div class="lineHeight">
                     &emsp;&emsp;
                   4.电子诉讼材料应当符合使用者阅读习惯，不得出现方向旋转、明显偏斜等现象，对具有较为明显、影响使用效果的污点、黑边等应去除后再行上传；
                </div>
                <div class="lineHeight">
                     &emsp;&emsp;
                   5.同一件内的诉讼材料必须按照实际内容有序排列，扫描前应当在原材料右下角编写页码后再行扫描处理。材料原先具备连续页码的无需另编页码；
                </div>

                <div class="lineHeight">
                     &emsp;&emsp;
                   6.作为证据材料提交的数码照片应当通过JPG、JPEG、BMP、PNG格式上传，上传数码照片时应当根据内容规范命名，同时标注相应文字说明。
                </div>
                <!-- <Row>
                    <Col span="8" push="18" class="maininfo-col headerCase" style="margin-top:36px;">
                        <p>{{backFill.noticeTime}}</p>
                        <p>（院印）</p>
                    </Col>
                </Row> -->
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
            this.backFill = ob
            console.log(this.backFill.caseNo)
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
    //   width: 700px;
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
    margin-top:15px;
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