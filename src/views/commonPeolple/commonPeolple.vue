<style>
    .content-main{
        height:100%;
        overflow-x:hidden; 
        overflow-y:visible;
        padding:20px 15px 10px 15px;
    }
    .content-main p {
        font-size: 20px;
        padding-bottom: 10px;
    }
</style>

<template>
    <div class="content-main" style="">
        <p>常用当事人信息</p>
        <Table :columns="columnsUsual" highlight-row :data="usualList"></Table><br/><br/>
        <p>常用代理人信息</p>
        <Table :columns="columnsUsualLaw" highlight-row :data="usualListLaw"></Table><br/><br/>
        <!-- 添加/修改常用当事人 -->
        <Modal
            v-model="proofModal"
            cancel-text=""
            :loading="loading"
            ok-text="提交"
            @on-ok="submit"
            width="560px"
            :mask-closable="false"
            :title="this.litigantId == '' ? '添加常用当事人' : '查看/修改当事人'">
            <div>
                <Form :model="addFormItem" :label-width="100" inline>
                    <FormItem :label="addFormItem.litigantType == '自然人'? '姓名*' : '公司名称*'" style="width: 505px;">
                        <Input v-model="addFormItem.litigantName" placeholder="请输入当事人"></Input>
                    </FormItem>
                    <FormItem label="类型*" style="width: 245px;">
                        <Select v-model="addFormItem.litigantType" transfer placeholder="请选择">
                            <Option value="自然人">自然人</Option>
                            <Option value="法人">法人</Option>
                            <Option value="非法人组织">非法人组织</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="诉讼地位*" style="width: 245px;" v-show="!isUsual">
                        <Select v-model="addFormItem.litigantStatus" transfer placeholder="请选择">
                            <Option value="原告">原告</Option>
                            <Option value="被告">被告</Option>
                            <Option value="第三人">第三人</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '身份证号码*' : '统一信用代码*'" style="width: 505px;">
                        <Input v-model="addFormItem.identityCard" @on-blur="idCardtoBirth" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="出生日期*" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <DatePicker type="date" transfer :value="addFormItem.birthday" @on-change="changeDate"></DatePicker>
                    </FormItem>
                    <FormItem label="性别*" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <Select v-model="addFormItem.litigantSex" transfer placeholder="请选择">
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="国籍" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <Input v-model="addFormItem.nationality" placeholder="请输入国籍"></Input>
                    </FormItem>
                    <FormItem label="民族*" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <!-- <Input v-model="addFormItem.nation" placeholder="请输入民族"></Input> -->
                        <Select v-model="addFormItem.nation" filterable transfer placeholder="请选择">
                            <Option v-for="item in nationList" :value="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="文化程度" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <Select v-model="addFormItem.education" transfer placeholder="请选择">
                            <Option value="小学以下">小学以下</Option>
                            <Option value="小学">小学</Option>
                            <Option value="初中">初中</Option>
                            <Option value="高中">高中</Option>
                            <Option value="大学专科">大学专科</Option>
                            <Option value="本科">本科</Option>
                            <Option value="研究生及以上">研究生及以上</Option>
                        </Select>
                    </FormItem>
                    

                    <FormItem label="当事人关系*" style="width: 245px;display:none">
                        <Select v-model="addFormItem.relationType" transfer placeholder="请选择">
                            <Option value="0">无</Option>
                            <Option value="1">夫妻</Option>
                            <Option value="2">同住成员家属</Option>
                            <Option value="3">其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="当事人*" style="width: 245px;display:none">
                        <Select v-model="addFormItem.relationLitigantId" transfer placeholder="请选择">
                            <Option v-for="item in this.data" :value="item.id" :key="item.litigantName">{{ item.litigantName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号码*" style="width: 245px;" v-show="addFormItem.litigantType != '法人' && addFormItem.litigantType != '非法人组织'">
                        <Input v-model="addFormItem.litigantPhone" placeholder="请输入手机号码"></Input>
                        <div style="color: #ed3f14;position:absolute;top:28px;left:5px;">多个手机号码请用逗号分隔</div>
                    </FormItem>
                    <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '法定代表人*' : '负责人*'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <Input v-model="addFormItem.legalManName" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入法定代表人姓名' : '请输入负责人姓名'" width="100px;"></Input>
                    </FormItem>
                    <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '联系方式*' : '联系方式*'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <Input v-model="addFormItem.legalManPhone"  placeholder="请输入联系方式" width="100px;"></Input>
                    </FormItem>
                    <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '职务*' : '职务*'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <Input v-model="addFormItem.legalManJob" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入职务' : '请输入职务'" width="100px;"></Input>
                    </FormItem>

                    <FormItem label="工作单位*" style="width: 505px;" v-show="addFormItem.litigantType == '自然人'">
                        <Input v-model="addFormItem.employer" placeholder="请输入工作单位"></Input>
                    </FormItem>
                    <FormItem label="电子邮箱*" style="width: 505px" v-show="addFormItem.litigantType == '自然人'">
                        <Input v-model="addFormItem.email" placeholder="请输入电子邮箱"></Input>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '户籍地址*' : '公司注册地址*'" style="width: 505px">
                        <Input v-model="addFormItem.nativePlace" placeholder="请输入户籍地址"></Input>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '经常居住地址*' : '公司经营地址*'" style="width: 505px">
                        <Input v-model="addFormItem.address" placeholder="请输入经常居住地址"></Input>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '确认送达地址*' : '确认送达地址*'" style="width: 505px">
                        <Input v-model="addFormItem.sendAddress" placeholder="请输入送达地址"></Input>
                    </FormItem>
                    <FormItem label="其他送达地址" style="width: 505px" v-for="(item,key) in addFormItem.otherAddressArr">
                        <Input v-model="item.address" placeholder="请输入其他送达地址" style="width:90%"></Input><Icon @click.native='delOtherAddress(key)' style="width:10%;text-align:center;font-size:22px" type="ios-trash" />
                    </FormItem>
                    <Button size="small" type="dashed" @click.native='addOtherAddress' >添加其他地址</Button>
                </Form>
            </div>
        </Modal>
        <!-- 添加/修改常用代理人 -->
        <Modal
            v-model="lawyerModal"
            cancel-text=""
            :loading="loading"
            ok-text="提交"
            @on-ok="submitLawyer"
            width="560px"
            :mask-closable="false"
            :title="this.lawyerId == '' ? '添加常用代理人' : '查看/修改常用代理人'">
            <div>
                <Form :model="addFormItem" :label-width="100" inline>
                    <FormItem label="代理人身份" style="width: 245px;">
                        <Select v-model="addFormItem.lawerType" transfer @on-change="changeType" placeholder="请选择">
                            <Option v-for="item in lawerType" :value="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="当事人" style="width: 245px;" v-show="!isUsual">
                        <Select v-model="addFormItem.onlineLitigantId" transfer placeholder="请选择">
                            <Option v-for="item in linigantList" :value="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="姓名" style="width: 245px;">
                        <!-- <Input v-model="addFormItem.lawerName" placeholder="请输入代理人姓名"  width="100px;"></Input> -->
                        <AutoComplete v-model="addFormItem.lawerName" :data="agentData1" @on-search="actins" @on-select="selectName" placeholder="请输入代理人姓名" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="电话" style="width: 245px;">
                        <!-- <Input v-model="addFormItem.lawermobile"  placeholder="请输入代理人电话" width="100px;"></Input> -->
                        <AutoComplete v-model="addFormItem.lawermobile" :data="phoneData1" @on-search="queryAgent1" placeholder="请输入代理人电话" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="律所*" v-show="!lawyerT1" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawIdentiCard" placeholder="请输入代理人公民身份证号码"  ></Input> -->
                        <AutoComplete v-model="addFormItem.lawyerOfficeName"  placeholder="请输入律师所属事务所" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="公民身份证号码" v-show="lawyerT1" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawIdentiCard" placeholder="请输入代理人公民身份证号码"  ></Input> -->
                        <AutoComplete v-model="addFormItem.lawIdentiCard" :data="numData1"  placeholder="请输入代理人公民身份证号码" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="公民身份证号码" v-show="!lawyerT1" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawIdentiCard" placeholder="请输入代理人公民身份证号码"  ></Input> -->
                        <Input v-model="addFormItem.lawIdentiCard2" placeholder="请输入代理人公民身份证号码"></Input>
                    </FormItem>
                    <FormItem label="工作证件号码*" v-show="!lawyerT1" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawerNum" placeholder="请输入代理人工作证件号码"  ></Input> -->
                        <AutoComplete v-model="addFormItem.lawerNum" :data="lawNumData1" placeholder="请输入代理人工作证件号码" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="电子邮箱" style="width: 505px">
                        <Input v-model="addFormItem.email" placeholder="请输入电子邮箱"></Input>
                    </FormItem>
                    <FormItem label="联系地址"  style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawerNum" placeholder="请输入代理人联系地址"  ></Input> -->
                        <AutoComplete v-model="addFormItem.address"  placeholder="请输入代理人联系地址" transfer></AutoComplete>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import { 
addCommonPerson,
getCmInfo,
optCommonPerson,
updateCPInfo,
deleteCommonPerson,
addCommonLawyer,
getCLInfo,
optCommonLawyer,
updateClInfo,
delCommonLawyer,
} from '@/api/caseInfo.js';
import {
    NetworkKyc,
    findAgent
} from '@/api/case';
export default {
    data(){
        return {
            columnsUsual:[
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: "姓名",
                    key: "litigantName",
                    width: 150,
                    align: "center",
                },
                {
                    title: "当事人类型",
                    key: "liType",
                    width: 120,
                    align: "center",
                },
                {
                    title: "证件号码",
                    key: "identityCard",
                    // width: 170,
                    align: "center",
                },
                {
                    title: "常用地址",
                    key: "address",
                    width: 200,
                    align: "center",
                },
                {
                    title: "联系电话",
                    key: "litigantPhone",
                    width: 170,
                    align: "center",
                },
                {
                title: "操作",
                key: "attachment",
                width: 120,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        style:{
                            marginTop:'10px'
                        },
                        on: {
                            click: () => {
                                console.log(params.row)
                                let tem = params.row;
                                this.litigantId = tem.id;
                                this.addFormItem.nationality=tem.nationality;
                                this.addFormItem.education=tem.education;
                                this.addFormItem.litigantName= tem.litigantName;           
                                this.addFormItem.litigantSex= tem.litigantSex == 0 ? "男" : "女";
                                this.addFormItem.litigantType= tem.litigantType == 0 ? "自然人" : (tem.litigantType == 1 ?  "法人" : "非法人组织");
                                // this.addFormItem.litigantStatus=tem.litigationStatus.name;
                                this.addFormItem.legalManJob = tem.legalManJob ? tem.legalManJob : "";
                                this.addFormItem.employer= tem.employer;
                                this.addFormItem.identityCard= tem.identityCard;
                                this.addFormItem.nation= tem.nation;
                                this.addFormItem.litigantPhone= tem.litigantPhone;
                                this.addFormItem.litigantTelPhone= tem.litigantTelPhone;
                                this.addFormItem.birthday= tem.birthday;
                                this.addFormItem.birthday2= tem.birthday;
                                this.addFormItem.email= tem.email;
                                this.addFormItem.nativePlace= tem.nativePlace;
                                this.addFormItem.address= tem.address;
                                this.addFormItem.legalManName= tem.legalManName;           
                                this.addFormItem.legalManPhone= tem.legalManPhone;
                                this.addFormItem.legalManId= tem.legalManId;
                                this.addFormItem.sendAddress= tem.sendAddress;
                                let otherAddressArr=[]
                                for (let index = 0; index < tem.onlineLitigantAddress.length; index++) {
                                    if (tem.onlineLitigantAddress[index].type==3) {
                                        otherAddressArr.push(tem.onlineLitigantAddress[index])
                                    }
                                    
                                }
                                this.addFormItem.otherAddressArr=otherAddressArr
                                this.proofModal = true;
                            }
                        }
                        },
                        "查看/修改"
                    ),
                    h(
                        "Button",
                        {
                        props: {
                            type: "text",
                            size: "small"
                        },
                        style:{
                            color:'red'
                        },
                        on: {
                            click: () => {
                                this.$Modal.confirm({
                                    title: '提醒',
                                    content: '<p>删除后无法恢复，是否删除？</p>',
                                    loading: true,
                                    onOk: () => {
                                        deleteCommonPerson(params.row.id).then(res => {
                                            this.$Modal.remove();
                                            if(res.data.state == 100){
                                                this.resetLitiList();
                                                this.$Message.success(res.data.message);
                                            }else{
                                                this.$Message.info(res.data.message);
                                            }
                                        })
                                    }
                                });
                            }
                        }
                        },
                        "删除"
                    )
                    ]);
                }
              }
            ],
            usualList:[],
            usualListLaw:[],
            columnsUsualLaw:[
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: "名称",
                    key: "name",
                    width: 150,
                    align: "center",
                },
                {
                    title: "代理人类型",
                    key: "liType",
                    width: 120,
                    align: "center",
                },
                {
                    title: "身份证",
                    key: "identicard",
                    width: 200,
                    align: "center",
                },
                {
                    title: "律师执业证号",
                    key: "lawyerIdcard",
                    // width: 170,
                    align: "center",
                },
                
                {
                    title: "联系电话",
                    key: "phone",
                    width: 170,
                    align: "center",
                },
                {
                title: "操作",
                key: "attachment",
                width: 120,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        style:{
                            marginTop:'10px'
                        },
                        on: {
                            click: () => {
                                let tem = params.row;
                                this.lawyerId = tem.id;
                                this.addFormItem.lawerType= tem.type;
                                this.addFormItem.lawerName= tem.name;
                                this.addFormItem.lawermobile= tem.phone;
                                this.addFormItem.email = tem.email;
                                this.addFormItem.lawIdentiCard= tem.identicard;
                                this.addFormItem.lawyerOfficeName = tem.lawyerOfficeName ? tem.lawyerOfficeName : "";
                                this.addFormItem.lawIdentiCard2= tem.identicard;
                                this.addFormItem.lawerNum = tem.lawyerIdcard;
                                this.addFormItem.address = tem.address;
                                this.lawyerModal = true;
                            }
                        }
                        },
                        "查看/修改"
                    ),
                    h(
                        "Button",
                        {
                        props: {
                            type: "text",
                            size: "small"
                        },
                        style:{
                            color:'red'
                        },
                        on: {
                            click: () => {
                                this.$Modal.confirm({
                                    title: '提醒',
                                    content: '<p>删除后无法恢复，是否删除？</p>',
                                    loading: true,
                                    onOk: () => {
                                        delCommonLawyer(params.row.id).then(res => {
                                            this.$Modal.remove();
                                            if(res.data.state == 100){
                                                this.resetLitiListlAW();
                                                this.$Message.success(res.data.message);
                                            }else{
                                                this.$Message.info(res.data.message);
                                            }
                                        })
                                    }
                                });
                            }
                        }
                        },
                        "删除"
                    ),
                    ]);
                    }
                }
            ],
            lawerType: [
                {
                    value: 1,
                    label: '律师'
                },
                {
                    value: 2,
                    label: '法律工作者'
                },
                {
                    value: 3,
                    label: '单位工作人员'
                },
                {
                    value: 4,
                    label: '近亲属'
                },
                {
                    value: 5,
                    label: '公民'
                }
            ],
            proofModal:false,
            loading:false,
            litigantId:"",  //当前id
            addFormItem: {
                politicalStatus:'',
                nationality:'',
                education:'',
                litigantName: '',
                litigantSex: '',
                onlineLitigantId:'',
                litigantType: '自然人',
                // litigantStatus:'原告',
                employer: '',
                identityCard: '',
                nation: '',
                litigantPhone: '',
                litigantTelPhone: '',
                birthday: '',
                birthday2: '',
                email: '',
                lawIdentiCard2:'',
                nativePlace: '',
                address: '',
                legalManName: '',
                legalManPhone: '',
                legalManId: '',
                sendAddress: '',
                agentId: '',
                lawerType: '',
                lawerName: '',
                lawermobile: '',
                lawIdentiCard: '',
                lawerNum: '',
                lawFirm: '',
                relationType: '',
                relationLitigantId: '',
                agentId1: "",
                lawerType1: "",
                lawerName1: "",
                lawermobile1: "",
                lawIdentiCard1: "",
                lawerNum1: "",
                otherAddressArr:[],
            },
            nationList:["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",
               "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",
               "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",
              "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"],
            data:[],
            lawyerT1: true,
            lawyerModal:false,
            agentData1:[],
            numData1:[],
            phoneData1:[],
            lawNumData1:[],
            lawyerId:""
        }
    },
    mounted () {
        
        getCmInfo().then(res=>{
            if(res.data.state == 100){
                let dt = res.data.cpPage.content;
                dt.map(item => {
                    item.liType = item.litigantType==0 ? "自然人" : (item.litigantType==1 ? "法人" : "非法人组织");
                })
                this.usualList = dt;
            }
            return getCLInfo();
        }).then(res => {
            if(res.data.state == 100){
                let dt = res.data.clPage.content;
                
                dt.map(item => {
                    let str = '';
                    this.lawerType.map(it => {
                            if(it.value == item.type){
                                str =  it.label;
                            }
                    })
                    item.liType = str;
                })
                this.usualListLaw = dt;
            }
        })

    },
    methods:{
        submit(){
            if(this.addFormItem.birthday != ''){
                var birthday = new Date(this.addFormItem.birthday).getTime();
            }else{
                var birthday = '';
            }
            if(this.addFormItem.birthday2 != ''){
                var birthday2 = new Date(this.addFormItem.birthday2).getTime();
            }else{
                var birthday2 = '';
            }
            if(this.addFormItem.litigantType == '自然人'){
                if(this.addFormItem.identityCard == '' ){
                    this.$Message.info("身份证号码不能为空");
                    this.changeLoading();
                    return false;
                }
                let otherAddressStr=''
                if (this.addFormItem.otherAddressArr.length>0) {
                    for (let i = 0; i < this.addFormItem.otherAddressArr.length; i++) {
                        if (i==0) {
                            otherAddressStr=otherAddressStr+this.addFormItem.otherAddressArr[i].id+','+this.addFormItem.otherAddressArr[i].address
                        }else{
                            otherAddressStr=otherAddressStr+','+this.addFormItem.otherAddressArr[i].id+','+this.addFormItem.otherAddressArr[i].address
                        }
                    }
                }
                var params = {
                    onlineLawCaseId:this.caseId,
                    litigantName:this.addFormItem.litigantName,
                    litigantType:0,
                    // litigantStatus:this.addFormItem.litigantStatus,                   
                    litigantSex:this.addFormItem.litigantSex == '男' ? 0 : 1,
                    nativePlace:this.addFormItem.nativePlace,
                    nation:this.addFormItem.nation,
                    identityType:0,
                    identityCard:this.addFormItem.identityCard,
                    litigantPhone:this.addFormItem.litigantPhone,
                    // litigantTelPhone:this.addFormItem.litigantTelPhone,
                    address:this.addFormItem.address,
                    sendAddress:this.addFormItem.sendAddress,
                    birthday:birthday,
                    employer:this.addFormItem.employer,
                    email:this.addFormItem.email,
                    nationality:this.addFormItem.nationality,
                    // politicalStatus:this.addFormItem.politicalStatus,
                    education:this.addFormItem.education,
                    otherAddress:otherAddressStr
                }
            }else{
                if(this.addFormItem.litigantType == '法人'){
                    var liniType = 1;
                }else{
                    var liniType = 2;
                }
                if(this.addFormItem.legalManPhone == '' ){
                    this.$Message.info("法人联系方式不能为空");
                    this.changeLoading();
                    return false;
                }
                var params = {
                    onlineLawCaseId:this.caseId,
                    litigantName:this.addFormItem.litigantName,
                    litigantType:liniType,
                    // litigantStatus:this.addFormItem.litigantStatus,                   
                    identityType:1,
                    birthday:birthday2,
                    litigantPhone:this.addFormItem.litigantPhone,
                    // litigantTelPhone:this.addFormItem.litigantTelPhone,
                    identityCard:this.addFormItem.identityCard,
                    legalManName:this.addFormItem.legalManName,
                    legalManPhone:this.addFormItem.legalManPhone,
                    // legalManId:this.addFormItem.legalManId,
                    nativePlace:this.addFormItem.nativePlace,
                    address:this.addFormItem.address,
                    sendAddress:this.addFormItem.sendAddress,
                    email:this.addFormItem.email,
                    legalManJob:this.addFormItem.legalManJob
                }
            }
            if(this.litigantId != ""){
                params.cpId = this.litigantId;
                updateCPInfo(params).then(res => {
                    this.changeLoading();
                     if(res.data.state == 100){
                         this.$Message.success(res.data.message);
                         this.resetLitiList();
                        this.proofModal = false;
                     }else{
                         this.$Message.info(res.data.message);
                     }
                })
            }

        },
        resetLitiList(){
            getCmInfo().then(res=>{
                if(res.data.state == 100){
                    let dt = res.data.cpPage.content;
                    dt.map(item => {
                        item.liType = item.litigantType==0 ? "自然人" : (item.litigantType==1 ? "法人" : "非法人组织");
                    })
                    this.usualList = dt;
                }
            })
        },
        submitLawyer(){
            var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var regMobile=/^1[3456789]\d{9}$/;
            var regPhone =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
            var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
            var regNum=/(^[A-Za-z0-9]+$)/

            if (this.addFormItem.lawIdentiCard2) {
                if(!regIdNo.test(this.addFormItem.lawIdentiCard2)){
                    this.$Message.warning('身份证格式有误，请检查');
                    this.changeLoading();
                    return false;
                }
            }
            if(!regMobile.test(this.addFormItem.lawermobile)&&!regPhone.test(this.addFormItem.lawermobile)){
                this.$Message.warning('电话格式有误，请检查');
                this.changeLoading();
                return false;
            }
            if(this.addFormItem.lawerType == 1 || this.addFormItem.lawerType == 2){
                if(!regIdNo.test(this.addFormItem.lawIdentiCard2)){
                    this.$Message.warning('身份证格式有误，请检查');
                    this.changeLoading();
                    return false;
                }
                if(!this.addFormItem.lawyerOfficeName){
                    this.$Message.warning('律师事务所不能为空');
                    this.changeLoading();
                    return false;
                }
                var params = {
                    lawyerType:this.addFormItem.lawerType,
                    // onlineLitigantId:this.addFormItem.onlineLitigantId,
                    name:this.addFormItem.lawerName,
                    lawyerIdcard:this.addFormItem.lawerNum,
                    identicard:this.addFormItem.lawIdentiCard2,
                    lawyerOfficeName:this.addFormItem.lawyerOfficeName,
                    email:this.addFormItem.email,
                    phone:this.addFormItem.lawermobile,
                    address:this.addFormItem.address,
                }
            }else{
                if(!regIdNo.test(this.addFormItem.lawIdentiCard)){
                    this.$Message.warning('身份证格式有误，请检查');
                    this.changeLoading();
                    return false;
                }
                var params = {
                    lawyerType:this.addFormItem.lawerType,
                    // onlineLitigantId:this.addFormItem.onlineLitigantId,
                    name:this.addFormItem.lawerName,
                    identicard:this.addFormItem.lawIdentiCard,
                    email:this.addFormItem.email,
                    phone:this.addFormItem.lawermobile,
                    address:this.addFormItem.address,
                }
            }
            if(this.lawyerId != ""){
                params.clId = this.lawyerId;
                updateClInfo(params).then(res => {
                    if(res.data.state == 100){
                         this.$Message.success(res.data.message);
                         this.resetLitiListlAW();
                        this.lawyerModal = false;
                     }else{
                         this.$Message.info(res.data.message);
                     }
                })
            }
            // updateClInfo
        },
        resetLitiListlAW(){
            getCLInfo().then(res => {
                if(res.data.state == 100){
                    let dt = res.data.clPage.content;
                    dt.map(item => {
                        let str = '';
                        this.lawerType.map(it => {
                                if(it.value == item.type){
                                    str =  it.label;
                                }
                        })
                        item.liType = str;
                    })
                    this.usualListLaw = dt;
                }
            })
        },
        changeDate (date) {
            this.addFormItem.birthday = new Date(date).getTime();
        },
        changeDate2(date){
            console.log(date)
            this.addFormItem.birthday2 = new Date(date).getTime();
        },
        idCardtoBirth () {
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(this.addFormItem.identityCard)) {
                this.addFormItem.birthday =
                    this.addFormItem.identityCard.substring(6, 10) +
                    '-' +
                    this.addFormItem.identityCard.substring(10, 12) +
                    '-' +
                    this.addFormItem.identityCard.substring(12, 14);
            }
            let str = this.addFormItem.identityCard.substr(this.addFormItem.identityCard.length-2, 1);
            if(str == 1 || str == 3 || str == 5 || str == 7 || str == 9){
                this.addFormItem.litigantSex = '男';
            }else{
                this.addFormItem.litigantSex = '女';
            }
        },
        delOtherAddress(key){
            this.addFormItem.otherAddressArr.splice(key,1); 
        },
        addOtherAddress(){
            this.addFormItem.otherAddressArr.push({id:'',address:''})
        },
        actins(value){
            clearTimeout(this.queryAgent1.timer);
            var that = this;
            var mustApplyTime = 1000;
            this.queryAgent1._cur=Date.now();  //记录当前时间

            if(!this.queryAgent1._start){      //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
                this.queryAgent1._start=this.queryAgent1._cur;
            }
            if(this.queryAgent1._cur-this.queryAgent1._start>mustApplyTime){ 
            //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
                that.queryAgent1(value);
                that.queryAgent1._start=that.queryAgent1._cur;
            }else{
                this.queryAgent1.timer=setTimeout(function(){
                    that.queryAgent1(value);
                },500);
            }
            // this.queryAgent.timeoutId = setTimeout(function(){
            //     that.queryAgent(value);
            // },500);
        },
        queryAgent1 (value) {
            this.numData1 = !value ? [] : [
                value,
            ];
            var lawyerNam = '';
            var agentIdentiCard = '';
            var lawerNum = "";
            findAgent(lawyerNam, value, lawerNum).then(res => {
                if (res.data.state == 100) {
                    if (res.data.lawyers != []) {
                        var arr1 = [];
                        var ary = res.data.lawyers;

                        for (var i = 0; i < ary.length; i++) {
                            this.numData1.push(ary[i].agentIdentiCard);
                        }
                    }
                }
            })
        },
        selectName (value) {
            console.log(value)
            this.addFormItem.lawerName = "";
            
            var showName = value.split('(')
            console.log(showName)
            this.addFormItem.lawerName = showName[0];
            console.log(this.addFormItem.lawerName)
            var index = this.arr1.indexOf(value);
            this.addFormItem.agentId = this.idData1[index];
            console.log('agentId为' + this.agentId)
            this.addFormItem.lawermobile = this.phoneData1[index];
            this.addFormItem.lawIdentiCard = this.numData1[index];
            console.log('phone为' + this.addFormItem.lawIdentiCard)
        },
        changeType (e) {
            if (e == 1 || e == 2) {
                this.lawyerT1 = false;
            } else {
                this.lawyerT1 = true;
            }
        },
        changeLoading () {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
    }
}
</script>
