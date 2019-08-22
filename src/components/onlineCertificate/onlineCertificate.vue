<style scoped>
    .expand-row{
        margin-bottom: 5px;
    }
</style>
<template>
    <div>
        <Card style="margin-bottom:10px">
            <div style="line-height:30px"> <label class="labe" style="width:50%;">{{briefName}} </label> </div>
            <div style="line-height:30px" v-show="stateType">
                 <label class="labe">当前状态：</label> 当事人可在 <span style="color:red">{{date}}</span>  前已提交的证据进行质证或发表补充意见。
                <!-- <Button @click="" type="info" style="margin-left:10px;float:right">质证意见清单</Button> -->
            </div>
            <div style="line-height:30px" v-show="!stateType">
                 <label class="labe">当前状态：</label>  <span style="color:red">已过期</span>  
                <!-- <Button @click="" type="info" style="margin-left:10px;float:right">质证意见清单</Button> -->
            </div>
            
            <div style="line-height:30px"> </div>
        </Card>
        <Card style="margin-bottom:10px">
            <Tabs  :animated="false" @on-click="changeTab">
                <TabPane label="原告">
                    <div style="text-align:center" v-show="plaintiffL"><h3>暂无证据信息</h3></div>
                    <Select v-model="plaintiffName" v-show="!plaintiffL" @on-change="plaintiffSelect" style="width: 200px;vertical-align:middle;position: absolute;right: 15px;">
                        <Option v-for="item in plaintiffList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                    <div style="margin-bottom:10px" v-for="item in plaintiffAry">
                        <div class="titleLini">
                            <span  class="ygBtn" style="margin-left:10px;margin-right:10px">{{item.dsrStatus}}</span> <span>{{item.dsrName}}</span>
                            
                        </div>
                        <Table :columns="columns" :data="item.eviList"></Table>
                    </div>
                </TabPane>
                <TabPane label="被告">
                    <Select v-model="defendantName" v-show="!defenL" @on-change="defendantSelect" style="width: 200px;vertical-align:middle;width: 200px;vertical-align:middle;position: absolute;right: 15px;">
                        <Option v-for="item in defendantList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                    <div style="text-align:center" v-show="defenL"><h3>暂无证据信息</h3></div>
                    <div style="margin-bottom:10px" v-for="item in defendantAry">
                        <div class="titleLini">
                            <span  class="begaBtn" style="margin-left:10px;margin-right:10px">{{item.dsrStatus}}</span> <span>{{item.dsrName}}</span>
                            
                        </div>
                        <Table :columns="columns" :data="item.eviList"></Table>
                    </div>
                </TabPane>
                <TabPane label="第三人">
                    <div style="text-align:center" v-show="thirdL"><h3>暂无证据信息</h3></div>
                    <Select v-model="thirdName" v-show="!thirdL" @on-change="thirdSelect" style="width: 200px;vertical-align:middle;width: 200px;vertical-align:middle;position: absolute;right: 15px;">
                        <Option v-for="item in thirdList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                    <div style="margin-bottom:10px" v-for="item in thirdAry">
                        <!-- <p slot="title">
                            {{item.dsrStatus}}：{{item.dsrName}}
                            
                        </p> -->
                        
                        <div class="titleLini">
                            <span  class="begaBtn" style="margin-left:10px;margin-right:10px">{{item.dsrStatus}}</span> <span>{{item.dsrName}}</span>
                        </div>
                        <Table :columns="columns" :data="item.eviList"></Table>
                    </div>
                </TabPane>
            </Tabs>
           
        </Card>
        <Card style="margin-bottom:10px;display:none">
            <p slot="title">
                dwad：dwda
                
            </p>
        </Card>
        <Modal
            v-model="modalAdd"
            title="添加证据"
            :loading="caseLoading"
            cancel-text=""
            ok-text="提交"
            @on-ok="asyncOK">
            <Form :model="addFormItem" :label-width="85" inline>
                <FormItem label="*证据名称:"  style="width: 435px">
                    <Input v-model="addFormItem.evidenceName" placeholder="请输入证据名称" ></Input>
                </FormItem>
                <FormItem label="页数:"  style="width: 435px">
                    <Input v-model="addFormItem.pageNum" placeholder="请输入页数"></Input>
                </FormItem>
                <FormItem label="*证明对象:" style="width: 435px;">
                    <Input v-model="addFormItem.evidenceObject" placeholder="请输入证明对象"  ></Input>
                </FormItem>
                <FormItem label="*证据来源:"  style="width: 435px">
                    <Input v-model="addFormItem.evidenceWhere" placeholder="请输入证据来源"  ></Input>
                </FormItem>
                <FormItem label="*附件:"  style="width: 435px">
                    <myUpload
                      style="display: inline-block;margin-left:10px;"
                      ref="evidenceUpload"
                      action=""
                      :data="{}"
                      :on-success="uploadSuccess">
                      <Button type="ghost" icon="ios-cloud-upload-outline" style="width: 170px;">上传附件</Button>
                    </myUpload>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            v-model="modalre"
            title="回复"
            :loading="loading"
            cancel-text=""
            width='720'
            ok-text="确认回复"
            @on-ok="asyncOK">
            <Row  style="margin-bottom:5px">
                <Col span="3">
                    <span  :class="dsrStatus != '原告' ? 'begaBtn' : 'ygBtn'">{{dsrStatus}}</span>
                </Col>
                <Col span="3">
                    {{this.dsrN}}
                </Col>
            </Row>
            <Row  style="margin-bottom:5px">
                <Col span="3">
                    
                </Col>
                <Col span="3">
                    真实性
                </Col>
                <Col span="16">
                    <RadioGroup v-model="real" @on-change="showInput">
                        <Radio label="1">
                            <span>认可</span>
                        </Radio>
                        <Radio label="0">
                            <span>不认可</span>
                        </Radio>
                    </RadioGroup>
                </Col>
            </Row>
            <Row  style="margin-bottom:5px">
                <Col span="3">
                    
                </Col>
                <Col span="3">
                    合法性
                </Col>
                <Col span="16">
                    <RadioGroup v-model="legal" @on-change="showInput">
                        <Radio label="1">
                            <span>认可</span>
                        </Radio>
                        <Radio label="0">
                            <span>不认可</span>
                        </Radio>
                    </RadioGroup>
                </Col>
            </Row>
            <Row  style="margin-bottom:5px">
                <Col span="3">
                    
                </Col>
                <Col span="3">
                    关联性
                </Col>
                <Col span="16">
                    <RadioGroup v-model="relative" @on-change="showInput">
                        <Radio label="1">
                            <span>认可</span>
                        </Radio>
                        <Radio label="0">
                            <span>不认可</span>
                        </Radio>
                    </RadioGroup>
                </Col>
            </Row>
            <Row style="min-height:60px" v-show="reasonInput">
                 <Col span="3">
                    
                </Col>
                <Col span="16">
                    <Input v-model="reasonContent"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入证据不认可理由"></Input>
                </Col>
            </Row>
            <Row>
                 <Col span="3">
                    
                </Col>
                <Col span="16">
                    其他意见（可不填）：
                </Col>
            </Row>
            <Row style="min-height:60px;margin-bottom:20px">
                 <Col span="3">
                    
                </Col>
                <Col span="16">
                    <Input v-model="content2" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入其他意见.."></Input>
                </Col>
            </Row>
            <Row style="display:none">
                 <Col span="4">
                    关联证据：
                </Col>
                <Col span="16">
                    <myUpload
                      style="display: inline-block;margin-left:10px;"
                      ref="evidenceUpload"
                      action=""
                      :data="{}"
                      :on-success="uploadSuccess">
                      <Button type="ghost" icon="ios-cloud-upload-outline" style="width: 170px;">上传关联证据：</Button>
                    </myUpload>
                </Col>
            </Row>
        </Modal>
       
    </div>
</template>
<script>
import myUpload from '@/components/upload';
import { delEvidence, addrevert,getReverts } from "@/api/witness/lawcaseInfo.js";
import expandRow from '@/components/tableExpand/tableExpand.vue';
export default {
    components: {
        myUpload,
        expandRow
    },
    created: function() {
    },
    data() {
        return{
            evidenceId:"",
            real:1,
            legal:1,
            relative:1,
            dsrStatus:'',
            dsrN:'',
            reasonInput:false,
            reasonContent:"",
            content2:"",
            caseLoading: false,
            disabled:true,
            plaintiffName:"全部",
            defendantName:"全部",
            thirdName:"全部",
            disabled2:true,
            thirdL:false,
            stateType:true,
            defenL:false,
            plaintiffL:false,
            loading:true,
            suggessContent:[1,2,3],
            modalAdd:false,
            modalre:false,
            value8:'',
            allList:[],
            litigantName:'',
            litigantNameList:[],
            plaintiffList: ["全部"],
            plaintiffAry:[],
            defendantList:["全部"],
            defendantAry:[],
            thirdList:["全部"],
            thirdAry:[],
            addFormItem:{
                evidenceName:'',
                pageNum:'',
                evidenceObject:'',
                evidenceWhere:''
            },
            columns: [
                {
                    type: 'expand',
                    align: "center",
                    width: 50,
                    _expanded:true,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row.reverts,
                                row2: params.row.reverts2
                            }
                        })
                    }
                },
                {
                title: "证据名称",
                key: "name",
                width: 220,
                align: "center",
              },
              {
                title: "证明对象",
                key: "prove",
                width: 280,
                align: "center"
              },
              {
                title: "证据来源",
                key: "where",
                align: "center"
              },
              {
                title: "提交时间",
                key: "proveTime",
                width: 190,
                align: "center"
              },
            //   {
            //     title: "页数",
            //     key: "pageNum",
            //     width: 80,
            //     align: "center"
            //   },
              {
                title: "附件",
                key: "fileName",
                width: 60,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "b",
                            {
                            props: {
                                type: "img",
                                size: "small",
                            },
                            on: {
                                click: () => {
                                    var fileStr = params.row.fileAddr;
                                    if(fileStr == null){
                                        this.$Message.info("暂无附件");
                                        return false;
                                    }
                                    // 创建隐藏的可下载链接
                                    var eleLink = document.createElement("a");
                                    var strs = fileStr.split("/");
                                    for (var i = 0; i < strs.length; i++) {
                                        if (i == strs.length - 1) {
                                        var filename = strs[i];
                                        }
                                    }
                                    console.log(filename);
                                    eleLink.download = filename;
                                    eleLink.style.display = "none";
                                    // 字符内容转变成blob地址
                                    eleLink.href = fileStr;
                                    // 触发点击
                                    document.body.appendChild(eleLink);
                                    eleLink.click();
                                    // 然后移除
                                    document.body.removeChild(eleLink);
                                }
                            }
                            },
                            ""
                        ),
                    ]);
                }
              },
              {
                title: "操作",
                key: "attachment",
                width: 200,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                    h(
                        "Button",
                        {
                        props: {
                            type: "text",
                            size: "small"
                        },
                        on: {
                            click: () => {
                                // if(params.row.isSameSite == false){
                                //     this.$Message.info("只能对");
                                // }
                                this.dsrN =  params.row.dsrName;
                                this.dsrStatus =  params.row.dsrStatus;
                                this.real = 1;
                                this.legal = 1;
                                this.relative = 1;
                                this.reasonContent = '';
                                this.content2 = '';
                                this.reasonInput = false;
                                this.evidenceId = params.row.id;
                                this.modalre = true;
                            }
                        }
                        },
                        params.row.isSameSite != false ? "" : "发表质证意见"
                    ),
                    h(
                        "Button",
                        {
                        props: {
                            type: "text",
                            size: "small"
                        },
                        on: {
                            click: () => {
                            
                            }
                        }
                        },
                        params.row.peopleNum + "人已回复"
                    )
                    ]);
                }
              }
            ],
            title:""
        }       
    },
    props: {
      lowCaseId:[Number, String],
      briefName:String,
      revertsList:Array,
      date: [String, Number]
    },
    methods:{
        changeLoading () {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        plaintiffSelect(value){
            this.plaintiffAry = [];
            if(value == "全部"){
                this.plaintiffAry = this.allList.plaintiff;
            }else{
                for(var i=0;i<this.allList.plaintiff.length;i++){
                    if(this.allList.plaintiff[i].dsrName == value){
                        this.plaintiffAry.push(this.allList.plaintiff[i])
                    }
                }
            }
        },
        defendantSelect(value){
            this.defendantAry = [];
            if(value == "全部"){
                this.defendantAry = this.allList.defendant;
            }else{
                for(var i=0;i<this.allList.defendant.length;i++){
                    if(this.allList.defendant[i].dsrName == value){
                        this.defendantAry.push(this.allList.defendant[i])
                    }
                }
            }
        },
        thirdSelect(value){
            this.thirdAry = [];
            if(value == "全部"){
                this.thirdAry = this.allList.third;
            }else{
                for(var i=0;i<this.allList.third.length;i++){
                    if(this.allList.third[i].dsrName == value){
                        this.thirdAry.push(this.allList.third[i])
                    }
                }
            }
        },
        changeTab(e){
            if(e==2){
                console.log(this.allList.third)
            }
        },
        showInput(e){
            if(this.real == 0 || this.legal == 0 || this.relative == 0){
                this.reasonInput = true;
            }else{
                this.reasonInput = false;
            }
        },
        getRevertsList(val){    //获取父组件传递过来的值
            console.log(val.plaintiff);
            this.plaintiffList = [];
            this.plaintiffAry = []; //证据列表
            this.defendantList = [];
            this.defendantAry = [];
            this.thirdList = [];
            this.thirdAry = [];
            this.plaintiffList.push('全部');
            this.defendantList.push('全部');
            this.thirdList.push('全部');
            this.allList = val;
            if(this.date == 0){
                console.log(this.date)
                this.stateType = false;
            }else{
                console.log(this.date)
                this.stateType = true;
            }
            if(val.third.length == 0){
                this.thirdL = true;
            }else{
                for(var i=0;i<val.third.length;i++){
                    this.thirdList.push(val.third[i].dsrName)
                    this.thirdAry = val.third;
                }
            }
            if(val.defendant.length == 0){
                this.defenL = true;
            }else{
                for(var i=0;i<val.defendant.length;i++){
                    this.defendantList.push(val.defendant[i].dsrName)
                    this.defendantAry = val.defendant;
                }
            }
            if(val.plaintiff.length == 0){
                this.plaintiffL = true;
            }else{
                for(var i=0;i<val.plaintiff.length;i++){
                    this.plaintiffList.push(val.plaintiff[i].dsrName)
                    this.plaintiffAry = val.plaintiff;
                }
            }


        },
      edite(){
        if(this.disabled==true){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
        
      },
      reply(){
          this.modalre = true;
      },
      edite2(){
        if(this.disabled2==true){
          this.disabled2 = false;
        }else{
          this.disabled2 = true;
        }
        
      },
      uploadSuccess (response) {
            if (response.state == 100) {
                this.evidenceInfo.evidenceId = response.result.evidenceId
            } else {
                this.$Message.error(response.message);
            }
        },
        getR(){
             getReverts(this.lowCaseId).then(res => {
                if(res.data.state == 100){
                    var arr = [];
                    res.data.result.map((item, index) => {
                        const ss = {};
                        ss.dsrName = item.dsrName;
                        ss.dsrStatus = item.dsrStatus;
                        arr.push(ss);
                    });
                    for(var i = 0; i < arr.length-1; i++){
                       for(var j = i+1; j < arr.length; j++){
                            if(arr[i].dsrName==arr[j].dsrName){
                                arr.splice(j,1);
                                j--;
                            }
                        }
                    }
                    var newArr = arr;
                    for(var i=0;i<newArr.length;i++){
                        var arySmall = [];
                        res.data.result.map((item, index) => {
                            
                            if(item.dsrName==newArr[i].dsrName){
                                for(var t=0;t<item.reverts.length;t++){
                                    item.reverts[t].zhen = item.reverts[t].result.substr(0,1);
                                    item.reverts[t].he = 0;
                                    item.reverts[t].guan = 0;
                                }
                                for(var t=0;t<item.reverts2.length;t++){
                                    var str1 = item.reverts2[t].result.substr(0,1) == 1 ? "真实性" : "";
                                    var str2 = item.reverts2[t].result.substr(1,1) ==1 ? "合法性" : "";
                                    var str3 = item.reverts2[t].result.substr(2,1) ==1 ? "关联性" : "";
                                    item.reverts2[t].ary = [];
                                    if(str1 != ""){
                                        item.reverts2[t].ary.push(str1);
                                    }
                                    if(str2 != ""){
                                        item.reverts2[t].ary.push(str2);
                                    }
                                    if(str3 != ""){
                                        item.reverts2[t].ary.push(str3);
                                    }
                                }
                                const data2 = {};
                                data2.id = item.evidenceId;
                                data2.prove = item.prove;
                                data2.name = item.name;
                                data2.fileAddr = item.fileAddr;
                                data2.fileName = item.fileName;
                                data2.proveTime = item.time;
                                data2.reverts = item.reverts;
                                data2.reverts2 = item.reverts2;
                                data2.where = item.source;
                                data2.dsrStatus = newArr[i].dsrStatus;
                                data2.dsrName = newArr[i].dsrName;
                                data2.isSameSite = item.isSameSite;
                                data2.peopleNum = item.reverts.length;
                                arySmall.push(data2);
                            }
                        });
                        newArr[i].eviList = arySmall;
                    }
                    console.log(newArr)
                    var plaintiff = [];
                    var defendant = [];
                    var third = [];
                    var allNewArr = [];
                    for(var i=0;i<newArr.length;i++){
                        if(newArr[i].dsrStatus == '原告'){
                            plaintiff.push(newArr[i]);
                        }else if(newArr[i].dsrStatus == '被告'){
                            defendant.push(newArr[i]);
                        }else if(newArr[i].dsrStatus == '第三人'){
                            third.push(newArr[i])
                        }
                    }
                    allNewArr = {
                        plaintiff:plaintiff,
                        defendant:defendant,
                        third:third
                    }
                    console.log(allNewArr)
                    this.allList = allNewArr;
                    this.getRevertsList(this.allList);
                }else{
                    this.$Message.error(res.data.message);
                }
            })
        },
      asyncOK(){
        if(this.reasonInput == true && this.reasonContent == ""){
            this.$Message.info('请输入不认可理由');
            this.changeLoading();
            return false;
        }
        
        var str = this.real + this.legal + this.relative;
        addrevert(this.evidenceId, str, this.reasonContent, this.content2).then(res => {
            console.log(res.data.state)
            if(res.data.state == 100){
                this.$Message.success(res.data.message);
                this.changeLoading();
                this.modalre = false;
                this.getR();
            }else{
                this.$Message.error(res.data.message);
                this.changeLoading();
            }
        })
      }
    }
};
</script>
<style>
.labe{
    /* width: 120px; */
    display: inline-block;
    /* text-align: left; */
    margin-left:80px;
}
.ivu-col{
    min-height: 30px;
}
.begaBtn{
    display: inline-block;
    padding: 0px 8px;
    line-height: 20px;
    border: 2px solid #38B3FF;
    color: #38B3FF;
    font-size: 12px;
}
.ygBtn{
    display: inline-block;
    padding: 0px 8px;
    line-height: 20px;
    border: 2px solid #38B3FF;
    background-color:#38B3FF;
    color: white;
    font-size: 12px;
}
td.ivu-table-expanded-cell {
    padding: 10px 20px;
    background: #f8f8f9;
}
.ivu-table-cell b{
        background-image:url('../../images/download.png');
        background-size: 100% 100%; 
        display:inline-block;
        cursor: pointer;
        height: 30px;
        width:30px;
}
.titleLini{
    margin-bottom: 10px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
}
</style>
