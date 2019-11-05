<style lang="less">
    .elementInfo-box {
        width: 70%;
        /* text-align: center; */
        margin: 0 auto;
    }
    .ivu-select-dropdown {
        z-index: 9999;
    }
</style>


<template>
    <div class="elementInfo-box">
        <Form ref="contract" :model="contract" label-position="right" :label-width="130">
            <FormItem label="合同名称" prop="name">
                <Input v-model="contract.name" placeholder="请输入合同名称" style="width: 300px" />
            </FormItem>
            <FormItem label="合同签订时间">
                <DatePicker type="date" v-model="contract.time" placeholder="请选择截至日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem>
                <Menu @on-select="choice" style="width: 300px;">
                    <Submenu name="1">
                        <template slot="title">
                            信用卡信息
                        </template>
                        <MenuItem name="合0">添加新的信用卡信息</MenuItem>
                        <MenuItem :name="item.id" v-for="(item,index) in creditInfo">{{item.contractName}}
                            <span @click.stop="delCreditCard(choice,'cdInfo',item.id)">
                                <Icon title="删除该信用卡信息" type="ios-close" />
                            </span>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </FormItem>
            <Collapse v-model="collapseBox">
                <Panel name="1">
                    夫妻共同债务
                    <FormItem slot="content" label="是否支持夫妻共同债">
                        <RadioGroup v-model="couple.isPublic">
                            <Radio label="yes">
                                <span>是</span>
                            </Radio>
                            <Radio label="no">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem slot="content" label="结婚登记时间">
                            <DatePicker type="date" v-model="couple.marry" placeholder="请选择时间" style="width: 300px"></DatePicker>
                    </FormItem>
                    <FormItem slot="content" label="离婚登记时间">
                        <DatePicker type="date" v-model="couple.divorce" placeholder="请选择时间" style="width: 300px"></DatePicker>
                    </FormItem>
                </Panel>
                <Panel name="2">
                    支付令
                    <FormItem slot="content" label="请求支付的事实与理由">
                        <Input v-model="pay.reason" :row="5" placeholder="请输入理由" style="width: 300px" />
                    </FormItem>
                    <FormItem slot="content" label="申请支付金额（元）">
                        <Input v-model="pay.money" :row="5" placeholder="请输入金额" style="width: 300px" />
                    </FormItem>
                    <FormItem slot="content" label="有价证券">
                        <Input v-model="pay.securities" :row="5" placeholder="请输入金额" style="width: 300px" />
                    </FormItem>
                    <FormItem slot="content" label="支付令申请费（元）">
                        <Input v-model="pay.applicationFee" :row="5" placeholder="请输入金额" style="width: 300px" />
                    </FormItem>
                    <FormItem slot="content" label="申请支付令时">
                        <DatePicker type="date" v-model="pay.applyTime" placeholder="请选择时间" style="width: 300px"></DatePicker>
                    </FormItem>
                    <FormItem slot="content" label="作出支付令时间">
                        <DatePicker type="date" v-model="pay.completeTime" placeholder="请选择时间" style="width: 300px"></DatePicker>
                    </FormItem>
                </Panel>
                <Panel name="3">
                    终结督促程序
                    <FormItem slot="content" label="终结督促程序申请费（元）">
                        <Input v-model="endProcess.fee" :row="5" placeholder="请输入金额" style="width: 300px" />
                    </FormItem>
                    <FormItem slot="content" label="终结督促程序裁定作出时间">
                        <DatePicker type="date" v-model="endProcess.time" placeholder="请选择时间" style="width: 300px"></DatePicker>
                    </FormItem>
                    <FormItem slot="content" label="终结督促程序的原因">
                        <Input v-model="endProcess.reason" :row="5" placeholder="请输入原因" style="width: 300px" />
                    </FormItem>
                </Panel>
            </Collapse>
        </Form>
        <Modal
            v-model="modal1"
            :title=titleArr[titleIndex]
            :mask-closable="false"
            :loading="isAdd"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form label-position="right" ref="creditCard" :model="creditCard" :label-width="155" v-show="titleIndex == 0">
                <FormItem label="信用卡卡号" prop="num">
                    <Input v-model="creditCard.num" :row="5" placeholder="请输入信用卡卡号" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡合约名称" prop="name">
                    <Input v-model="creditCard.name" :row="5" placeholder="请输入合约名称" style="width: 300px" />
                </FormItem>
                <FormItem label="利息约定" prop="interestAgreement">
                    <Input v-model="creditCard.interestAgreement" :row="5" placeholder="请输入利息约定" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡欠款最新截至时间" prop="deadline">
                    <DatePicker type="date" v-model="creditCard.deadline" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="信用卡最新欠款本金（元）" prop="principal">
                    <Input v-model="creditCard.principal" :row="5" placeholder="请输入本金" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡最新欠款利息（元）" prop="interest">
                    <Input v-model="creditCard.interest" :row="5" placeholder="请输入利息" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡最新欠款滞纳金（违约金）（元）" prop="latePayment">
                    <Input v-model="creditCard.latePayment" :row="5" placeholder="请输入滞纳金" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡年费（元）" prop="annualFee">
                    <Input v-model="creditCard.annualFee" :row="5" placeholder="请输入年费" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡分期手续费（元）" prop="handlingFee">
                    <Input v-model="creditCard.handlingFee" :row="5" placeholder="请输入手续费" style="width: 300px" />
                </FormItem>
                <FormItem label="其他费用项目及金额（元）" prop="otherFee">
                    <Input v-model="creditCard.otherFee" :row="5" placeholder="请输入其他费用" style="width: 300px" />
                </FormItem>
                <FormItem label="违约金约定" prop="defaultAgreement">
                    <Input v-model="creditCard.defaultAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债权费用的约定" prop="feeAgreement">
                    <Input v-model="creditCard.feeAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="律师费（元）" prop="lawyerFee">
                    <Input v-model="creditCard.lawyerFee" :row="5" placeholder="请输入律师费" style="width: 300px" />
                </FormItem>
                <FormItem label="保全费（元）" prop="securityFee">
                    <Input v-model="creditCard.securityFee" :row="5" placeholder="请输入保全费" style="width: 300px" />
                </FormItem>
                <FormItem label="公告费（元）" prop="announcementFee">
                    <Input v-model="creditCard.announcementFee" :row="5" placeholder="请输入公告费" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡取现手续费（元）" prop="cashFee">
                    <Input v-model="creditCard.cashFee" :row="5" placeholder="请输入手续费" style="width: 300px" />
                </FormItem>
                <FormItem label="其他项目费用（年费、取现手续费、分期手续费）的约定" prop="otherProjectFee">
                    <Input v-model="creditCard.otherProjectFee" :row="5" placeholder="请输入其他项目约定" style="width: 300px" />
                </FormItem>
                <FormItem label="最新截止时间后利息计算标准" prop="endStandard">
                    <Input v-model="creditCard.endStandard" :row="5" placeholder="请输入计算标准" style="width: 300px" />
                </FormItem>
                <FormItem label="最新截止时间后违约金（滞纳金）计算标准" prop="endFeeStandard">
                    <Input v-model="creditCard.endFeeStandard" :row="5" placeholder="请输入计算标准" style="width: 300px" />
                </FormItem>
                <FormItem>
                    <Menu @on-select="guaranteeChioce" style="width: 300px;">
                        <Submenu name="1">
                            <template slot="title">
                                保证合同信息
                            </template>
                            <MenuItem :name="'保1'">请添加保证合同信息</MenuItem>
                            <MenuItem :name="item.id" v-for="(item,index) in guarantee">{{item.name}}
                                <span @click.stop="delGcInfo(guaranteeChioce,'gc',item.id)">
                                    <Icon title="删除该合同信息" type="ios-close" />
                                </span>
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal2"
            title="保证合同信息"
            @on-ok="submitContract"
            :mask-closable="false"
            :loading="isAdd2"
            @on-cancel="cancel">
            <Form ref="guaranteeContract" :model="guaranteeContract" label-position="right" :label-width="155">
                <FormItem label="保证合同名称" prop="name">
                    <Input v-model="guaranteeContract.name" :row="5" placeholder="请输入合同名称" style="width: 300px" /> 
                </FormItem>
                <FormItem label="合同签订时间" prop="time">
                    <DatePicker type="date" v-model="guaranteeContract.time" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="保证人" prop="people">
                    <Input v-model="guaranteeContract.people" :row="5" placeholder="请输入保证人" style="width: 300px" /> 
                </FormItem>
                <FormItem label="保证期间" prop="timeRange">
                    <DatePicker type="daterange" v-model="guaranteeContract.timeRange" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="保证方式" prop="methods">
                    <Input v-model="guaranteeContract.methods" :row="5" placeholder="请输入方式" style="width: 300px" /> 
                </FormItem>
                <FormItem label="保证范围" prop="range">
                    <Input v-model="guaranteeContract.range" :row="5" placeholder="请输入范围" style="width: 300px" /> 
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import {
        addUpdateCardInfo,
        upPartOfCard,
        getContractInfo,
        getPartId,
        getPart,
        delCtInfo,
        getCtInfo,
        addOrUpdateGcInfo
    } from '@/api/creditCard.js';
export default {
    name: 'elementInfo2',
    props:['lawCaseId','partId'],
    data () {
        return {
            collapseBox:'',
            gcId:'',
            cardId:'',
            isAdd:true,
            isAdd2:true,
            partCardId:this.partId,
            modal1:false,
            modal2:false,
            titleIndex:0,
            titleArr:['添加信用卡信息'],
            contract:{
                name:'',
                time:''
            },
            endProcess:{
                fee:'',
                time:'',
                reason:''
            },
            creditCard:{
                num:'',
                name:'',
                interestAgreement:'',
                deadline:'',
                principal:'',
                interest:'',
                latePayment:'',
                annualFee:'',
                handlingFee:'',
                otherFee:'',
                defaultAgreement:'',
                feeAgreement:'',
                lawyerFee:'',
                securityFee:'',
                announcementFee:'',
                cashFee:'',
                otherProjectFee:'',
                endStandard:'',
                endFeeStandard:''  
            },
            guaranteeContract:{
                name:'',
                time:'',
                people:'',
                timeRange:'',
                methods:'',
                range:''
            },
            pay:{
                reason:'',
                money:'',
                securities:'',
                applicationFee:'',
                applyTime:'',
                completeTime:'' 
            },
            creditInfo:[],
            gcIdList:'',
            guarantee:[],
            couple:{
                isPublic:'',
                marry:'',
                divorce:''
            },
        };
    },
    methods: {
        time(time = +new Date()) {//时间戳转换函数
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ').substring(0,10);
        },
        handleReset2(name){
            this.$refs[name].resetFields();
        },
        choice(name){
            this.modal1 = true;
            this.guarantee = [];
            if(name[0] == '合'){
                this.handleReset2('creditCard');
                this.cardId = '';
                getContractInfo(this.lawCaseId,this.partCardId,'gc',this.cardId,this.gcIdList).then(res => {
                    if(res.data.state == 100){
                        this.guarantee = res.data.nameList;
                    }
                })
            }else{
                this.cardId = name;
                getCtInfo('cdInfo',name).then(res =>{
                    console.log(res.data.data);
                    this.creditCard.num = res.data.data.cardNo;
                    this.creditCard.name = res.data.data.contractName;
                    this.creditCard.interestAgreement = res.data.data.interestAgreement;
                    this.creditCard.deadline = res.data.data.latestDeadLineForArrears == null ? '' : this.time(res.data.data.latestDeadLineForArrears);
                    this.creditCard.principal = res.data.data.nowArrearsAmount;
                    this.creditCard.interest = res.data.data.nowArrearsInterest;
                    this.creditCard.latePayment = res.data.data.nowLateFee;
                    this.creditCard.annualFee = res.data.data.annualFee;
                    this.creditCard.handlingFee = res.data.data.byStagesFee;
                    this.creditCard.otherFee = res.data.data.proAndFee;
                    this.creditCard.defaultAgreement = res.data.data.lateFeeAppointment;
                    this.creditCard.feeAgreement = res.data.data.bondFeeAppointment;
                    this.creditCard.lawyerFee = res.data.data.lawyerFee;
                    this.creditCard.securityFee = res.data.data.preservationFee;
                    this.creditCard.announcementFee = res.data.data.announcementFee;
                    this.creditCard.cashFee = res.data.data.enchashmentFee;
                    this.creditCard.otherProjectFee = res.data.data.anotherApponintment;
                    this.creditCard.endStandard = res.data.data.nowInterestStandard;
                    this.creditCard.endFeeStandard = res.data.data.nowLateFeeStandard;
                });
                getContractInfo(this.lawCaseId,this.partCardId,'gc',this.cardId).then(res => {
                    this.guarantee = res.data.nameList;
                })
            }
        },
        guaranteeChioce(name){
            this.modal2 = true;
            if(name[0] == '保'){
                this.handleReset2('guaranteeContract');
                this.gcId = '';
            }else{
                this.gcId = name;
                getCtInfo('gc',name).then(res => {
                    this.guaranteeContract.name = res.data.data.name;
                    this.guaranteeContract.time = res.data.data.signTime;
                    this.guaranteeContract.people = res.data.data.guarantor;
                    this.guaranteeContract.timeRange = res.data.data.guarantorDate == null ? '' : res.data.data.guarantorDate.replace('至',' - ');
                    this.guaranteeContract.methods = res.data.data.guarantorMethod;
                    this.guaranteeContract.range = res.data.data.guaranteeScope;
                })
            }
        },
        ok (){
            this.isAdd = false;
            addUpdateCardInfo(this.cardId,
                this.partCardId,
                this.creditCard.num,
                this.creditCard.name,
                this.creditCard.interestAgreement,
                this.creditCard.deadline == '' ? this.creditCard.deadline : typeof(this.creditCard.deadline) == 'number' ? this.time(this.creditCard.deadline) : this.creditCard.deadline.getFullYear()+'-'+(this.creditCard.deadline.getMonth()+1)+'-'+this.creditCard.deadline.getDate(),
                this.creditCard.principal,
                this.creditCard.interest,
                this.creditCard.latePayment,
                this.creditCard.annualFee,
                this.creditCard.handlingFee,
                this.creditCard.otherFee,
                this.creditCard.defaultAgreement,
                this.creditCard.feeAgreement,
                this.creditCard.lawyerFee,
                this.creditCard.securityFee,
                this.creditCard.announcementFee,
                this.creditCard.cashFee,
                this.creditCard.otherProjectFee,
                this.creditCard.endStandard,
                this.creditCard.endFeeStandard,
                this.gcIdList
            ).then(res => {
                this.isAdd = true;
                if(res.data.state = 100){
                    this.handleReset2('creditCard');
                    this.modal1 = false;
                    this.$Message.success(res.data.message);
                    this.gcIdList = '';
                    getPart(this.lawCaseId).then(res => {
                        this.creditInfo = [];
                        res.data.creditCard.creditCardInformations.map(item => {
                            return item.enable == true ? this.creditInfo.push(item) : false;
                        });
                    })
                    return;
                }else{
                    this.$Message.warning(res.data.message);
                }
                this.$Message.warning(res.data.message);
            })
        },
        cancel (){

        },
        submitContract(){
            this.isAdd2 = false;
            addOrUpdateGcInfo(this.gcId,
            this.guaranteeContract.name,
            this.guaranteeContract.people,
            this.guaranteeContract.methods,
            this.guaranteeContract.timeRange[0] == null || this.guaranteeContract.timeRange.length == 0 ? '' : this.guaranteeContract.timeRange[0].getFullYear()+'-'+(this.guaranteeContract.timeRange[0].getMonth()+1)+'-'+this.guaranteeContract.timeRange[0].getDate()+'至'+this.guaranteeContract.timeRange[1].getFullYear()+'-'+(this.guaranteeContract.timeRange[1].getMonth()+1)+'-'+this.guaranteeContract.timeRange[1].getDate(),
            this.guaranteeContract.time == '' ? this.guaranteeContract.time : typeof(this.guaranteeContract.time) == 'number' ? this.time(this.guaranteeContract.time) : this.guaranteeContract.time.getFullYear()+'-'+(this.guaranteeContract.time.getMonth()+1)+'-'+this.guaranteeContract.time.getDate(),
            this.guaranteeContract.range,
            this.lawCaseId,
            this.partCardId,
            this.cardId
            ).then(res => {
                this.isAdd2 = true;
                if(res.data.state == 100){
                    this.gcIdList = this.gcIdList == '' ? this.gcIdList + res.data.gcId : this.gcIdList + ',' + res.data.gcId;
                    this.gcIdList = this.cardId != '' ? this.gcIdList = '' : this.gcIdList;
                    getContractInfo(this.lawCaseId,this.partCardId,'gc',this.cardId,this.gcIdList).then(res => {
                        this.guarantee = res.data.nameList;
                    })
                    this.modal2 = false;
                    this.$Message.success(res.data.message);
                    return; 
                }
                this.$Message.warning(res.data.message);
            })
        }, 
        submitLoan(){
            let res = null;
            const request = upPartOfCard(this.partCardId,
            this.contract.name,
            this.contract.time == '' ? this.contract.time : typeof(this.contract.time) == 'number' ? this.time(this.contract.time) : this.contract.time.getFullYear()+'-'+(this.contract.time.getMonth()+1)+'-'+this.contract.time.getDate(),
            this.couple.isPublic == 'yes' ? true : false,
            this.couple.marry == '' ? this.couple.marry : typeof(this.couple.marry) == 'number' ? this.time(this.couple.marry) : this.couple.marry.getFullYear()+'-'+(this.couple.marry.getMonth()+1)+'-'+this.couple.marry.getDate(),
            this.couple.divorce == '' ? this.couple.divorce : typeof(this.couple.divorce) == 'number' ? this.time(this.couple.divorce) : this.couple.divorce.getFullYear()+'-'+(this.couple.divorce.getMonth()+1)+'-'+this.couple.divorce.getDate(),
            this.pay.reason,
            this.pay.money,
            this.pay.securities,
            this.pay.applicationFee,
            this.pay.applyTime == '' ? this.pay.applyTime : typeof(this.pay.applyTime) == 'number' ? this.time(this.pay.applyTime) : this.pay.applyTime.getFullYear()+'-'+(this.pay.applyTime.getMonth()+1)+'-'+this.pay.applyTime.getDate(),
            this.pay.completeTime == '' ? this.pay.completeTime : typeof(this.pay.completeTime) == 'number' ? this.time(this.pay.completeTime) : this.pay.completeTime.getFullYear()+'-'+(this.pay.completeTime.getMonth()+1)+'-'+this.pay.completeTime.getDate(),
            this.endProcess.fee,
            this.endProcess.time == '' ? this.endProcess.time : typeof(this.endProcess.time) == 'number' ? this.time(this.endProcess.time) : this.endProcess.time.getFullYear()+'-'+(this.endProcess.time.getMonth()+1)+'-'+this.endProcess.time.getDate(),
            this.endProcess.reason
            ).then(res2 => {
                if(res2.data.state == 100){
                    this.$Message.success(res2.data.message);
                    this.$emit('listenToChildEvent','1');
                }else{
                    this.$Message.warning(res2.data.message);
                    this.$emit('listenToChildEvent','0');
                }
            })
        },
        delCreditCard($event,infoType,infoId){
            this.$Modal.confirm({
                title: '提示',
                content: '是否确认删除该信用卡信息？',
                loading: true,
                onOk: () => {
                    delCtInfo(infoType,infoId).then(res => {
                        if(res.data.state == 100){
                            getPart(this.lawCaseId).then(res => {
                                this.creditInfo = [];
                                res.data.creditCard.creditCardInformations.map(item => {
                                    return item.enable == true ? this.creditInfo.push(item) : false;
                                });
                            })
                            this.$Modal.remove();
                            this.$Message.success(res.data.message);
                        }
                    })
                },
                onCancel: () => {}
            });
        },
        delGcInfo($event,infoType,infoId){
            this.$Modal.confirm({
                title: '提示',
                content: '是否确认删除该合同信息？',
                loading: true,
                onOk: () => {
                    delCtInfo(infoType,infoId).then(res => {
                        if(res.data.state == 100){
                            getContractInfo(this.lawCaseId,this.partCardId,'gc',this.cardId,this.gcIdList).then(res => {
                                this.guarantee = res.data.nameList;
                            })
                            this.$Modal.remove();
                            this.$Message.success(res.data.message);
                        }
                    })
                },
                onCancel: () => {}
            });
        }
    },
    mounted () {
        
        if(this.partCardId == undefined || this.partCardId == ''){
            getPartId(this.lawCaseId).then(res => {
                this.partCardId = res.data.partId;
            })
        }
        getPart(this.lawCaseId).then(res => {
            res.data.creditCard.creditCardInformations.map(item => {
                return item.enable == true ? this.creditInfo.push(item) : false;
            });
            this.contract.name = res.data.creditCard.contractName;
            this.contract.time = res.data.creditCard.signContractTime == null ? '' : this.time(res.data.creditCard.signContractTime);
            this.couple.isPublic = res.data.creditCard.jointdebts == null ? '' : (res.data.creditCard.jointdebts == true ? 'yes' : 'no');
            this.couple.marry = res.data.creditCard.marriageTime == null ? '' : this.time(res.data.creditCard.marriageTime);
            this.couple.divorce = res.data.creditCard.divorceTime == null ? '' : this.time(res.data.creditCard.divorceTime);
            this.pay.reason = res.data.creditCard.reasonContent;
            this.pay.money = res.data.creditCard.applyAmount;
            this.pay.securities = res.data.creditCard.securities;
            this.pay.applicationFee = res.data.creditCard.applyFee;
            this.pay.applyTime = res.data.creditCard.applyTime == null ? '' : this.time(res.data.creditCard.applyTime);
            this.pay.completeTime = res.data.creditCard.makeApplyTime == null ? '' : this.time(res.data.creditCard.makeApplyTime);
            this.endProcess.fee = res.data.creditCard.endApplyFee;
            this.endProcess.time = res.data.creditCard.endMakeTime == null ? '' : this.time(res.data.creditCard.endMakeTime);
            this.endProcess.reason = res.data.creditCard.endReason;
        })
    }
};
</script>
    