<style lang="less">
    .elementInfo-box {
        width: 50%;
        /* text-align: center; */
        margin: 0 auto;
    }
</style>


<template>
    <div class="elementInfo-box">
        <Form label-position="right" :label-width="130"> 
            <!-- <FormItem label="诉讼金额">
                <Input v-model="litigation.amount" placeholder="请输入诉讼标的金额" style="width: 300px" />
            </FormItem>
            <FormItem label="诉讼请求">
                <Input type="textarea" v-model="litigation.request" :row="5" placeholder="请输入诉讼理由" style="width: 300px" />
            </FormItem>
            <FormItem label="请上传起诉状扫描件">
                <Upload action="/api/online/evidenceAttachment/uploadEvidenceList.jhtml">
                    <Button icon="ios-cloud-upload-outline">点击选择文件上传</Button>
                </Upload>
            </FormItem> -->
            <FormItem>
                <Menu @on-select="choice" style="width: 300px;">
                    <Submenu name="1">
                        <template slot="title">
                            授信合同信息
                        </template>
                        <MenuItem name="合0"">
                            添加新的合同信息
                        </MenuItem>
                        <MenuItem :name="'c0'+item.id" v-for="(item,index) in creditContract">{{item.name}}
                            <span @click.stop="del(choice,'cc',item.id)">
                                <Icon title="删除该合同信息" type="ios-close" />
                            </span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            借款合同信息
                        </template>
                        <MenuItem name="合1"">
                            添加新的合同信息
                        </MenuItem>
                        <MenuItem :name="'l1'+item.id" v-for="(item,index) in loanContract">{{item.name}}
                            <span @click.stop="del(choice,'lc',item.id)">
                                <Icon title="删除该合同信息" type="ios-close" />
                            </span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            保证合同信息
                        </template>
                        <MenuItem name="合2"">
                            添加新的合同信息
                        </MenuItem>
                        <MenuItem :name="'g2'+item.id" v-for="(item,index) in guaranteeContract">{{item.name}}
                            <span @click.stop="del(choice,'gc',item.id)">
                                <Icon title="删除该合同信息" type="ios-close" />
                            </span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            抵押合同信息
                        </template>
                        <MenuItem name="合3"">
                            添加新的合同信息
                        </MenuItem>
                        <MenuItem :name="'m3'+item.id" v-for="(item,index) in mortgageContract">{{item.name}}
                            <span @click.stop="del(choice,'mc',item.id)">
                                <Icon title="删除该合同信息" type="ios-close" />
                            </span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            质押合同信息
                        </template>
                        <MenuItem name="合4"">
                            添加新的合同信息
                        </MenuItem>
                        <MenuItem :name="'p4'+item.id" v-for="(item,index) in pledgeContract">{{item.name}}
                            <span @click.stop="del(choice,'pc',item.id)">
                                <Icon title="删除该合同信息" type="ios-close" />
                            </span>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </FormItem>
            <FormItem label="放款日期">
                <DatePicker type="date" v-model="litigation.loan" placeholder="请选择放款日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="实际到期日期">
                <DatePicker type="date" v-model="litigation.maturity" placeholder="请选择到期日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="逾期还款日期">
                <DatePicker type="date" v-model="litigation.overdue" placeholder="请选择还款日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="欠款最新截至时间">
                <DatePicker type="date" v-model="litigation.cutoff" placeholder="请选择截至日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="欠款本金">
                <Input v-model="litigation.arrears" placeholder="请输入欠款本金" style="width: 300px" />
            </FormItem>
            <FormItem label="利息">
                <Input v-model="litigation.interest" placeholder="请输入利息" style="width: 300px" />
            </FormItem>
            <FormItem label="罚息">
                <Input v-model="litigation.penaltyInterest" placeholder="请输入罚息" style="width: 300px" />
            </FormItem>
            <FormItem label="复利">
                <Input v-model="litigation.compoundInterest" placeholder="请输入复利" style="width: 300px" />
            </FormItem>
            <FormItem label="最新欠款利息">
                <Input v-model="litigation.nInterest" placeholder="请输入最新的利息" style="width: 300px" />
            </FormItem>
            <FormItem label="最新欠款罚息">
                <Input v-model="litigation.npInterest" placeholder="请输入最新的利息" style="width: 300px" />
            </FormItem>
            <FormItem label="最新欠款复利">
                <Input v-model="litigation.ncdInterest" placeholder="请输入最新的利息" style="width: 300px" />
            </FormItem>
            <FormItem label="最新欠款利息等">
                <Input v-model="litigation.newArrears" placeholder="请输入最新欠款利息" style="width: 300px" />
            </FormItem>
            <FormItem label="违约金金额">
                <Input v-model="litigation.liquidatedDamages" placeholder="请输入违约金额" style="width: 300px" />
            </FormItem>
            <FormItem label="实现债权的费用">
                <Input v-model="litigation.claim" placeholder="请输入债权费用" style="width: 300px" />
            </FormItem>
            <FormItem label="律师费">
                <Input v-model="litigation.lawyerFee" placeholder="请输入律师费" style="width: 300px" />
            </FormItem>
            <FormItem label="保全费">
                <Input v-model="litigation.securityFee" placeholder="请输入保全费" style="width: 300px" />
            </FormItem>
            <FormItem label="公告费">
                <Input v-model="litigation.announcementFee" placeholder="请输入公告费" style="width: 300px" />
            </FormItem>
            <FormItem label="债权其他费用">
                <Input v-model="litigation.otherFee" placeholder="请输入其他费用" style="width: 300px" />
            </FormItem>
            <FormItem label="是否支持夫妻共同债">
                <RadioGroup v-model="isPublic">
                    <Radio label="yes">
                        <span>是</span>
                    </Radio>
                    <Radio label="no">
                        <span>否</span>
                    </Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="结婚登记时间" v-show="isPublic == 'yes'">
                <DatePicker type="date" v-model="litigation.marryTime" placeholder="请选择结婚时间" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="离婚登记时间" v-show="isPublic == 'yes'">
                <DatePicker type="date" v-model="litigation.divorceTime" placeholder="请选择离婚时间" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="适用的法律条文">
                <Input type="textarea" v-model="litigation.legalProvisions" :row="5" placeholder="请输入法律条文" style="width: 300px" />
            </FormItem>
            <FormItem label="法律法规">
                <Input type="textarea" v-model="litigation.regulations" :row="5" placeholder="请输入法律法规" style="width: 300px" />
            </FormItem>
            <FormItem label="诉前保全裁定案号">
                <Input v-model="litigation.caseNumber" placeholder="请输入案号" style="width: 300px" />
            </FormItem>
            <FormItem label="保全被申请人">
                <Input v-model="litigation.preservationMan" placeholder="请输入保全被申请人" style="width: 300px" />
            </FormItem>
            <FormItem label="申请保全时间">
                <DatePicker type="date" v-model="litigation.preservationTime" placeholder="请选择保全日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="财产保全金额">
                <Input v-model="litigation.preservationMoney" placeholder="请输入财产保全金额" style="width: 300px" />
            </FormItem>
            <FormItem label="财产保全费">
                <Input v-model="litigation.preservationFee" placeholder="请输入财产保全费" style="width: 300px" />
            </FormItem>
            <FormItem label="作出保全裁定时间">
                <DatePicker type="date" v-model="litigation.rulingTime" placeholder="请选择裁定时间" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="解除保全申请时间">
                <DatePicker type="date" v-model="litigation.releasePreservation" placeholder="请选择申请日期" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="保全财产情况">
                <Input type="textarea" v-model="litigation.preservationStatus" :row="5" placeholder="请输入保全财产情况" style="width: 300px" />
            </FormItem>
        </Form>
        <Modal
            v-model="modal1"
            :title=titleArr[titleIndex]
            @on-ok="ok"
            :mask-closable="false"
            :loading="isAdd">
            <Form ref="credit" :model="credit" label-position="right" :label-width="155" v-show="titleIndex == 0">
                <FormItem label="授信合同名称" prop="name">
                    <Input v-model="credit.name" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="是否诉请解除该授信合同" prop="isRelease">
                    <RadioGroup v-model="credit.isRelease">
                        <Radio label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="授信人" prop="creditPeople">
                    <Input v-model="credit.creditPeople" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="授信合同签订时间" prop="creditTime">
                    <DatePicker type="date" v-model="credit.creditTime" placeholder="请选择授信合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="授信合同期间" prop="creditRange">
                    <DatePicker type="daterange" v-model="credit.creditRange" placeholder="请选择授信合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="授信金额" prop="creditMoney">
                    <Input v-model="credit.creditMoney" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
            </Form>
            <Form ref="loan" :model="loan" label-position="right" :label-width="155" v-show="titleIndex == 1">
                <FormItem label="借款合同名称" prop="name">
                    <Input v-model="loan.name" :row="5" placeholder="请输入借款合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="借款人" prop="creditPeople">
                    <Input v-model="loan.creditPeople" :row="5" placeholder="请输入借款人" style="width: 300px" />
                </FormItem>
                <FormItem label="是否诉请解除该借款合同" prop="isRelease">
                    <RadioGroup v-model="loan.isRelease">
                        <Radio label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="签订借款合同时间" prop="time">
                    <DatePicker type="date" v-model="loan.time" placeholder="请选择借款合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="借款本金" prop="money">
                    <Input v-model="loan.money" :row="5" placeholder="请输入借款本金" style="width: 300px" />
                </FormItem>
                <FormItem label="借款期限" prop="range">
                    <DatePicker v-model="loan.range" type="daterange" placement="bottom-end" placeholder="请选择借款期限" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="还款方式" prop="methods">
                    <Input v-model="loan.methods" :row="5" placeholder="请输入还款方式" style="width: 300px" />
                </FormItem>
                <FormItem label="借款利率" prop="loanRate">
                    <Input v-model="loan.loanRate" :row="5" placeholder="请输入借款利率" style="width: 300px" />
                </FormItem>
                <FormItem label="罚息利率" prop="penaltyInterest">
                    <Input v-model="loan.penaltyRate" :row="5" placeholder="请输入罚息利率" style="width: 300px" />
                </FormItem>
                <FormItem label="复利利率" prop="compoundRate">
                    <Input v-model="loan.compoundRate" :row="5" placeholder="请输入复利利率" style="width: 300px" />
                </FormItem>
                <FormItem label="罚息/复利约定" prop="rateAgreement">
                    <Input v-model="loan.rateAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="解除合同或提前收贷约定" prop="releaseAgreement">
                    <Input v-model="loan.releaseAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="违约金约定" prop="defaultAgreement">
                    <Input v-model="loan.defaultAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债券费用的约定" prop="feeAgreement">
                    <Input v-model="loan.feeAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="送达约定" prop="sendAgreement">
                    <Input v-model="loan.sendAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
            </Form>
            <Form ref="guarantee" :model="guarantee" label-position="right" :label-width="155" v-show="titleIndex == 2">
                <FormItem label="保证合同名称" prop="name">
                    <Input v-model="guarantee.name" :row="5" placeholder="请输入保证合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="保证人" prop="guaranteePeople">
                    <Input v-model="guarantee.guaranteePeople" :row="5" placeholder="请输入保证人" style="width: 300px" />
                </FormItem>
                <FormItem label="保证方式" prop="methods">
                    <Input v-model="guarantee.methods" :row="5" placeholder="请输入保证方式" style="width: 300px" />
                </FormItem>
                <FormItem label="保证期间" prop="timeRange">
                    <DatePicker v-model="guarantee.timeRange" type="daterange" placement="bottom-end" placeholder="请选择保证期间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="保证合同签订时间" prop="time">
                    <DatePicker v-model="guarantee.time" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="保证范围" prop="guaranteeRange">
                    <Input v-model="guarantee.guaranteeRange" :row="5" placeholder="请输入保证范围" style="width: 300px" />
                </FormItem>
            </Form>
            <Form ref="mortgage" :model="mortgage" label-position="right" :label-width="155" v-show="titleIndex == 3">
                <FormItem label="抵押合同名称" prop="name">
                    <Input v-model="mortgage.name" :row="5" placeholder="请输入抵押合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押合同签订时间" prop="time">
                    <DatePicker v-model="mortgage.time" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="抵押物权属" prop="ownership">
                    <Input v-model="mortgage.ownership" :row="5" placeholder="请输入抵押物权属" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押物名称" prop="articleName">
                    <Input v-model="mortgage.articleName" :row="5" placeholder="请输入抵押物名称" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押担保范围" prop="range">
                    <Input v-model="mortgage.range" :row="5" placeholder="请输入担保范围" style="width: 300px" />
                </FormItem>
                <FormItem label="办理抵押登记时间" prop="handletime">
                    <DatePicker v-model="mortgage.handletime" type="date" placement="bottom-end" placeholder="请选择登记时间" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
            <Form ref="pledge" :model="pledge" label-position="right" :label-width="155" v-show="titleIndex == 4">
                <FormItem label="质押合同名称" prop="name">
                    <Input v-model="pledge.name" :row="5" placeholder="请输入质押合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="质押合同签订时间" prop="time">
                    <DatePicker v-model="pledge.time" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="质押物权属" prop="ownership">
                    <Input v-model="pledge.ownership" :row="5" placeholder="请输入质押物权属" style="width: 300px" />
                </FormItem>
                <FormItem label="质押物名称" prop="articleName">
                    <Input v-model="pledge.articleName" :row="5" placeholder="请输入质押物名称" style="width: 300px" />
                </FormItem>
                <FormItem label="质押担保范围" prop="range">
                    <Input v-model="pledge.range" :row="5" placeholder="请输入质押担保范围" style="width: 300px" />
                </FormItem>
                <FormItem label="办理质押登记时间" prop="handletime">
                    <DatePicker v-model="pledge.handletime" type="date" placement="bottom-end" placeholder="请选择质押登记时间" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
        </Modal>
        <Button type="primary" @click="submit">提交</Button>
    </div>
</template>

<script>
    import {addOrUpdateCtInfo,addOrUpdateLoanCtInfo,addOrUpdateGcInfo,addOrUpdateMcInfo,addOrUpdatePcInfo,getContractInfo,getCtInfo,
        delCtInfo,
        getDelCtInfo,
        addUpdateCardInfo,
        getPartId,
        getPart,
        updatePLoan
    } from '@/api/contract.js';
export default {
    name: 'elementInfo',
    props:['lawCaseId','partId'],
    data () {
        return {
            isAdd:true,
            modal1:false,
            titleIndex:0,
            litigation:{
                amount:'',
                request:'',
                loan:'',
                maturity:'',
                overdue:'',
                cutoff:'',
                arrears:'',
                interest:'',
                penaltyInterest:'',
                compoundInterest:'',
                nInterest:'',
                npInterest:'',
                ncdInterest:'',
                newArrears:'',
                liquidatedDamages:'',
                claim:'',
                lawyerFee:'',
                securityFee:'',
                announcementFee:'',
                otherFee:'',
                marryTime:'',
                divorceTime:'',
                legalProvisions:'',
                regulations:'',
                caseNumber:'',
                preservationMan:'',
                preservationTime:'',
                preservationMoney:'',
                preservationFee:'',
                rulingTime:'',
                releasePreservation:'',
                preservationStatus:'',
            },
            titleArr:['添加授信合同信息','添加借款合同信息','添加保证合同信息','添加抵押合同信息','添加质押合同信息'],
            creditContract:[],
            loanContract:[],
            guaranteeContract:[],
            mortgageContract:[],
            pledgeContract:[],
            credit:{
                name:'',
                isRelease:'',
                creditPeople:'',
                creditTime:'',
                creditRange:'',
                creditMoney:''
            },
            loan:{
                name:'',
                creditPeople:'',
                isRelease:'',
                time:'',
                money:'',
                range:'',
                methods:'',
                loanRate:'',
                penaltyRate:'',
                compoundRate:'',
                rateAgreement:'',
                releaseAgreement:'',
                defaultAgreement:'',
                feeAgreement:'',
                sendAgreement:''
            },
            guarantee:{
                name:'',
                guaranteePeople:'',
                methods:'',
                timeRange:'',
                time:'',
                guaranteeRange:''
            },
            mortgage:{
                name:'',
                time:'',
                ownership:'',
                articleName:'',
                range:'',
                handletime:''
            },
            pledge:{
                name:'',
                time:'',
                ownership:'',
                articleName:'',
                range:'',
                handletime:''
            },
            isPublic:'no',
            isRelease:'',
            myPartId:this.partId,
            infoId:'',
        };
    },
    methods: {
        time(time = +new Date()) {//时间戳转换函数
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ').substring(0,10);
        },
        choice(name){
            if(name[0] == '合'){
                this.infoId = '';
                this.handleReset('credit');
                this.handleReset('loan');
                this.handleReset('guarantee');
                this.handleReset('mortgage');
                this.handleReset('pledge');
                this.titleIndex = name[1];
                this.modal1 = true;
            }else{
                this.titleIndex = name[1];
                this.modal1 = true;
                switch(name.substring(0,2)){
                    case 'c0':
                        this.infoId = name.substring(2);
                        getCtInfo('cc',this.infoId).then(res => {
                            this.credit.name = res.data.data.name;
                            this.credit.isRelease = res.data.data.relieve == true ? 'yes' : 'no';
                            this.credit.creditPeople = res.data.data.creditGrantor;
                            this.credit.creditTime = this.time(res.data.data.sign);
                            this.credit.creditRange = res.data.data.periodRange.replace('至',' - ');
                            this.credit.creditMoney = res.data.data.amount;
                        })
                    break;
                    case 'l1':
                        this.infoId = name.substring(2);
                        getCtInfo('lc',this.infoId).then(res => {
                            console.log(res.data.data);
                            this.loan.name = res.data.data.name;
                            this.loan.creditPeople = res.data.data.borrower;
                            this.loan.isRelease = res.data.data.isRelieve == true ? 'yes' : 'no';
                            this.loan.time = this.time(res.data.data.signTime);
                            this.loan.money = res.data.data.amount;
                            this.loan.range = res.data.data.askTime.replace('至',' - ');
                            this.loan.methods = res.data.data.repaymentMethod;
                            this.loan.loanRate = res.data.data.borrowingRate;
                            this.loan.penaltyRate = res.data.data.penaltyRate;
                            this.loan.compoundRate = res.data.data.compoundRate;
                            this.loan.rateAgreement = res.data.data.penaltyAndCompoundAppointment;
                            this.loan.releaseAgreement = res.data.data.relieveAndPayLoanAppointment;
                            this.loan.defaultAgreement = res.data.data.violationFundAppointment;
                            this.loan.feeAgreement = res.data.data.bondFeeAppointment;
                            this.loan.sendAgreement = res.data.data.sendAppointment;
                        })
                    break;
                    case 'g2':
                        this.infoId = name.substring(2);
                        getCtInfo('gc',this.infoId).then(res => {
                            this.guarantee.name = res.data.data.name;
                            this.guarantee.guaranteePeople = res.data.data.guarantor;
                            this.guarantee.methods = res.data.data.guarantorMethod;
                            this.guarantee.timeRange = res.data.data.guarantorDate.replace('至',' - ');
                            this.guarantee.time = res.data.data.signTime;
                            this.guarantee.guaranteeRange = res.data.data.guaranteeScope;
                        })
                    break;
                    case 'm3':
                        this.infoId = name.substring(2);
                        getCtInfo('mc',this.infoId).then(res => {
                                this.mortgage.name = res.data.data.name;
                                this.mortgage.time = this.time(res.data.data.signTime);
                                this.mortgage.ownership = res.data.data.ownership;
                                this.mortgage.articleName = res.data.data.collateral;
                                this.mortgage.range = res.data.data.mortgageRange;
                                this.mortgage.handletime = this.time(res.data.data.mortgageTime);
                            })
                    break;
                    case 'p4':
                        this.infoId = name.substring(2);
                        getCtInfo('pc',this.infoId).then(res => {
                            console.log(res.data.data);
                            this.pledge.name = res.data.data.name;
                            this.pledge.time = res.data.data.signTime;
                            this.pledge.ownership = res.data.data.ownership;
                            this.pledge.articleName = res.data.data.pledge;
                            this.pledge.range = res.data.data.pledgeRange;
                            this.pledge.handletime = res.data.data.pledgeTime;
                        })
                    break;
                }
            }
        },
        ok (){
            this.isAdd = false;
            switch(this.titleIndex){
                case '0':
                    addOrUpdateCtInfo(this.credit.name,
                    this.credit.isRelease == 'yes' ? true : false,
                    this.credit.creditPeople,
                    typeof(this.credit.creditTime) == 'number' ? this.time(this.credit.creditTime) : this.credit.creditTime.getFullYear()+'-'+(this.credit.creditTime.getMonth()+1)+'-'+this.credit.creditTime.getDate(),
                    this.credit.creditRange[0].getFullYear()+'-'+(this.credit.creditRange[0].getMonth()+1)+'-'+this.credit.creditRange[0].getDate()+'至'+this.credit.creditRange[1].getFullYear()+'-'+(this.credit.creditRange[1].getMonth()+1)+'-'+this.credit.creditRange[1].getDate(),
                    this.credit.creditMoney,
                    this.infoId,
                    this.lawCaseId,
                    this.myPartId).then(res => {
                        this.isAdd = true;
                        if(res.data.state == 100){
                            this.handleReset('credit');
                            this.$Message.success(res.data.message);
                            this.modal1 = false;
                            getContractInfo(this.lawCaseId,this.myPartId,'cc').then(res => {
                                this.creditContract = res.data.nameList;
                            })
                        }else{
                            this.$Message.warning(res.data.message);
                        }
                    });
                break;
                case '1':
                    addOrUpdateLoanCtInfo(this.infoId,
                    this.loan.name,
                    this.loan.creditPeople,
                    this.loan.isRelease == 'yes' ? true : false,
                    typeof(this.loan.time) == 'number' ? this.time(this.loan.time) : this.loan.time.getFullYear()+'-'+(this.loan.time.getMonth()+1)+'-'+this.loan.time.getDate(),
                    this.loan.money,
                    this.loan.range[0].getFullYear()+'-'+(this.loan.range[0].getMonth()+1)+'-'+this.loan.range[0].getDate()+'至'+this.loan.range[1].getFullYear()+'-'+(this.loan.range[1].getMonth()+1)+'-'+this.loan.range[1].getDate(),
                    this.loan.methods,
                    this.loan.loanRate,
                    this.loan.penaltyRate,
                    this.loan.compoundRate,
                    this.loan.rateAgreement,
                    this.loan.releaseAgreement,
                    this.loan.defaultAgreement,
                    this.loan.feeAgreement,
                    this.loan.sendAgreement,
                    this.lawCaseId,
                    this.myPartId,
                    ).then(res => {
                        this.isAdd = true;
                        if(res.data.state == 100){
                            this.handleReset('loan');
                            this.$Message.success(res.data.message);
                            this.modal1 = false;
                            getContractInfo(this.lawCaseId,this.myPartId,'lc').then(res => {
                                this.loanContract = res.data.nameList;
                            })
                        }else{
                            this.$Message.warning(res.data.message);
                        }
                    })
                break;
                case '2':
                    console.log(this.guarantee.timeRange);
                    addOrUpdateGcInfo(this.infoId,
                    this.guarantee.name,
                    this.guarantee.guaranteePeople,
                    this.guarantee.methods,
                    this.guarantee.timeRange[0].getFullYear()+'-'+(this.guarantee.timeRange[0].getMonth()+1)+'-'+this.guarantee.timeRange[0].getDate()+'至'+this.guarantee.timeRange[1].getFullYear()+'-'+(this.guarantee.timeRange[1].getMonth()+1)+'-'+this.guarantee.timeRange[1].getDate(),
                    typeof(this.guarantee.time) == 'number' ? this.time(this.guarantee.time) : this.guarantee.time.getFullYear()+'-'+(this.guarantee.time.getMonth()+1)+'-'+this.guarantee.time.getDate(),
                    this.guarantee.guaranteeRange,
                    this.lawCaseId,
                    this.myPartId).then(res => {
                        this.isAdd = true;
                        if(res.data.state == 100){
                            this.handleReset('guarantee');
                            this.$Message.success(res.data.message);
                            this.modal1 = false;
                            getContractInfo(this.lawCaseId,this.myPartId,'gc').then(res => {
                                this.guaranteeContract = res.data.nameList;
                            })
                        }else{
                            this.$Message.warning(res.data.message);
                        }
                    })
                break;
                case '3':
                    addOrUpdateMcInfo(this.infoId,
                    this.mortgage.name,
                    typeof(this.mortgage.time) == 'number' ? this.time(this.mortgage.time) : this.mortgage.time.getFullYear()+'-'+(this.mortgage.time.getMonth()+1)+'-'+this.mortgage.time.getDate(),
                    this.mortgage.ownership,
                    this.mortgage.articleName,
                    this.mortgage.range,
                    typeof(this.mortgage.handletime) == 'number' ? this.time(this.mortgage.handletime) : this.mortgage.handletime.getFullYear()+'-'+(this.mortgage.handletime.getMonth()+1)+'-'+this.mortgage.handletime.getDate(),
                    this.lawCaseId,
                    this.myPartId).then(res => {
                        this.isAdd = true;
                        if(res.data.state == 100){
                            this.handleReset('mortgage');
                            this.$Message.success(res.data.message);
                            this.modal1 = false;
                            getContractInfo(this.lawCaseId,this.myPartId,'mc').then(res => {
                                this.mortgageContract = res.data.nameList;
                            })
                        }else{
                            this.$Message.warning(res.data.message);
                        }
                    })
                break;
                case '4':
                    addOrUpdatePcInfo(this.infoId,
                    this.pledge.name,
                    typeof(this.pledge.time) == 'number' ? this.time(this.pledge.time) : this.pledge.time.getFullYear()+'-'+(this.pledge.time.getMonth()+1)+'-'+this.pledge.time.getDate(),
                    this.pledge.ownership,
                    this.pledge.articleName,
                    this.pledge.range,
                    typeof(this.pledge.handletime) == 'number' ? this.time(this.pledge.handletime) : this.pledge.handletime.getFullYear()+'-'+(this.pledge.handletime.getMonth()+1)+'-'+this.pledge.handletime.getDate(),
                    this.lawCaseId,
                    this.myPartId
                    ).then(res => {
                        this.isAdd = true;
                        if(res.data.state == 100){
                            this.handleReset('pledge');
                            this.$Message.success(res.data.message);
                            this.modal1 = false;
                            getContractInfo(this.lawCaseId,this.myPartId,'pc').then(res => {
                                this.pledgeContract = res.data.nameList;
                            })
                        }else{
                            this.$Message.warning(res.data.message);
                        }  
                    })
                break;
            }
        },
        handleReset(name){
            this.$refs[name].resetFields();
        },
        del($event,infoType,infoId){
            this.$Modal.confirm({
                title: '提示',
                content: '是否确认删除该合同信息？',
                loading: true,
                onOk: () => {
                    delCtInfo(infoType,infoId).then(res => {
                        if(res.data.state == 100){
                            this.refreshContract(infoType);
                            this.$Modal.remove();
                            this.$Message.success(res.data.message);
                        }
                    })
                },
                onCancel: () => {}
            });
        },
        refreshContract(infoType){
            getContractInfo(this.lawCaseId,this.myPartId,infoType).then(res => {
                this.creditContract = {'cc':res.data.nameList}[infoType] || this.creditContract;
                this.loanContract = {'lc':res.data.nameList}[infoType] || this.loanContract;
                this.guaranteeContract = {'gc':res.data.nameList}[infoType] || this.guaranteeContract;
                this.mortgageContract = {'mc':res.data.nameList}[infoType] || this.mortgageContract;
                this.pledgeContract = {'pc':res.data.nameList}[infoType] || this.pledgeContract;
            })
        },
        submit(){
            updatePLoan(this.myPartId,
            this.litigation.loan,
            this.litigation.maturity,
            this.litigation.overdue,
            this.litigation.cutoff,
            this.litigation.arrears,
            this.litigation.interest,
            this.litigation.penaltyInterest,
            this.litigation.compoundInterest,
            this.litigation.nInterest,
            this.litigation.npInterest,
            this.litigation.ncdInterest,
            this.litigation.newArrears,
            this.litigation.liquidatedDamages,
            this.litigation.claim,
            this.litigation.lawyerFee,
            this.litigation.securityFee,
            this.litigation.announcementFee,
            this.litigation.otherFee,
            this.isPublic,
            this.litigation.marryTime,
            this.litigation.divorceTime,
            this.litigation.legalProvisions,
            this.litigation.regulations,
            this.litigation.caseNumber,
            this.litigation.preservationMan,
            this.litigation.preservationTime,
            this.litigation.preservationMoney,
            this.litigation.preservationFee,
            this.litigation.rulingTime,
            this.litigation.releasePreservation,
            this.litigation.preservationStatus
            ).then(res => {
                console.log(res.data);
            })
            // return false;
        }
    },
    mounted () {
        if(this.myPartId == ''){
            getPartId(this.lawCaseId).then(res => {
                this.myPartId = res.data.partId;
            })
        }
        getPart(this.lawCaseId).then(res => {
            res.data.loan.creditContractInformationSet.map(item => {
                return item.enable == true ? this.creditContract.push(item) : false;
            });
            res.data.loan.loanContractInformations.map(item => {
                return item.enable == true ? this.loanContract.push(item) : false;
            });
            res.data.loan.guaranteeContractInformations.map(item => {
                return item.enable == true ? this.guaranteeContract.push(item) : false;
            });
            res.data.loan.mortgageContractInformations.map(item => {
                return item.enable == true ? this.mortgageContract.push(item) : false;
            });
            res.data.loan.pledgeContractInformations.map(item => {
                return item.enable == true ? this.pledgeContract.push(item) : false;
            });
        })
    }
};
</script>
    