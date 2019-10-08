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
                        <MenuItem :name="item.id" v-for="(item,index) in creditContract">{{item.name}}</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            借款合同信息
                        </template>
                        <MenuItem :name="item.id" v-for="(item,index) in loanContract">{{item.name}}</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            保证合同信息
                        </template>
                        <MenuItem :name="item.id" v-for="(item,index) in guaranteeContract">{{item.name}}</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            抵押合同信息
                        </template>
                        <MenuItem :name="item.id" v-for="(item,index) in mortgageContract">{{item.name}}</MenuItem>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            质押合同信息
                        </template>
                        <MenuItem :name="item.id" v-for="(item,index) in pledgeContract">{{item.name}}</MenuItem>
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
            <FormItem label="最新欠款利息、罚息、复利">
                <Input v-model="litigation.newInterest" placeholder="请输入最新的利息" style="width: 300px" />
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
            @on-cancel="cancel">
            <Form label-position="right" :label-width="155" v-show="titleIndex == 0">
                <FormItem label="授信合同名称">
                    <Input v-model="credit.name" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="是否诉请解除该授信合同">
                    <RadioGroup v-model="credit.isRelease">
                        <Radio label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="授信人">
                    <Input v-model="credit.creditPeople" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="授信合同签订时间">
                    <DatePicker type="date" v-model="credit.creditTime" placeholder="请选择授信合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="授信合同期间">
                    <Input v-model="credit.creditRange" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="授信金额">
                    <Input v-model="credit.creditMoney" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="155" v-show="titleIndex == 1">
                <FormItem label="借款合同名称">
                    <Input v-model="loan.name" :row="5" placeholder="请输入借款合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="借款人">
                    <Input v-model="loan.creditPeople" :row="5" placeholder="请输入借款人" style="width: 300px" />
                </FormItem>
                <FormItem label="是否诉请解除该借款合同">
                    <RadioGroup v-model="loan.isRelease">
                        <Radio label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="签订借款合同时间">
                    <DatePicker type="date" v-model="loan.time" placeholder="请选择借款合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="借款本金">
                    <Input v-model="loan.money" :row="5" placeholder="请输入借款本金" style="width: 300px" />
                </FormItem>
                <FormItem label="借款期限">
                    <DatePicker v-model="loan.range" type="daterange" placement="bottom-end" placeholder="请选择借款期限" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="还款方式">
                    <Input v-model="loan.methods" :row="5" placeholder="请输入还款方式" style="width: 300px" />
                </FormItem>
                <FormItem label="借款利率">
                    <Input v-model="loan.loanRate" :row="5" placeholder="请输入借款利率" style="width: 300px" />
                </FormItem>
                <FormItem label="罚息利率">
                    <Input v-model="loan.penaltyRate" :row="5" placeholder="请输入罚息利率" style="width: 300px" />
                </FormItem>
                <FormItem label="复利利率">
                    <Input v-model="loan.compoundRate" :row="5" placeholder="请输入复利利率" style="width: 300px" />
                </FormItem>
                <FormItem label="罚息/复利约定">
                    <Input v-model="loan.rateAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="解除合同或提前收贷约定">
                    <Input v-model="loan.releaseAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="违约金约定">
                    <Input v-model="loan.defaultAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债券费用的约定">
                    <Input v-model="loan.feeAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="送达约定">
                    <Input v-model="loan.sendAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="155" v-show="titleIndex == 2">
                <FormItem label="保证合同名称">
                    <Input v-model="guarantee.name" :row="5" placeholder="请输入保证合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="保证人">
                    <Input v-model="guarantee.guaranteePeople" :row="5" placeholder="请输入保证人" style="width: 300px" />
                </FormItem>
                <FormItem label="保证方式">
                    <Input v-model="guarantee.methods" :row="5" placeholder="请输入保证方式" style="width: 300px" />
                </FormItem>
                <FormItem label="保证期间">
                    <DatePicker v-model="guarantee.timeRange" type="daterange" placement="bottom-end" placeholder="请选择保证期间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="保证合同签订时间">
                    <DatePicker v-model="guarantee.time" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="保证范围">
                    <Input v-model="guarantee.guaranteeRange" :row="5" placeholder="请输入保证范围" style="width: 300px" />
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="155" v-show="titleIndex == 3">
                <FormItem label="抵押合同名称">
                    <Input v-model="mortgage.name" :row="5" placeholder="请输入保证合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押合同签订时间">
                    <DatePicker v-model="mortgage.time" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="抵押物权属">
                    <Input v-model="mortgage.ownership" :row="5" placeholder="请输入抵押物权属" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押物名称">
                    <Input v-model="mortgage.articleName" :row="5" placeholder="请输入抵押物名称" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押担保范围">
                    <Input v-model="mortgage.range" :row="5" placeholder="请输入担保范围" style="width: 300px" />
                </FormItem>
                <FormItem label="办理抵押登记时间">
                    <DatePicker v-model="mortgage.handletime" type="date" placement="bottom-end" placeholder="请选择登记时间" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="155" v-show="titleIndex == 4">
                <FormItem label="质押合同名称">
                    <Input v-model="pledge.name" :row="5" placeholder="请输入质押合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="质押合同签订时间">
                    <DatePicker v-model="pledge.time" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="质押物权属">
                    <Input v-model="pledge.ownership" :row="5" placeholder="请输入质押物权属" style="width: 300px" />
                </FormItem>
                <FormItem label="质押物名称">
                    <Input v-model="pledge.articleName" :row="5" placeholder="请输入质押物名称" style="width: 300px" />
                </FormItem>
                <FormItem label="质押担保范围">
                    <Input v-model="pledge.range" :row="5" placeholder="请输入质押担保范围" style="width: 300px" />
                </FormItem>
                <FormItem label="办理质押登记时间">
                    <DatePicker v-model="pledge.handletime" type="date" placement="bottom-end" placeholder="请选择质押登记时间" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'elementInfo',
    data () {
        return {
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
                newInterest:'',
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
            creditContract:[
                {name:'添加新的合同信息',id:'合0'},
                {name:"授信合同0",id:'1'},
                {name:"授信合同2",id:'2'},
                {name:"授信合同3",id:'3'},
            ],
            loanContract:[
                {name:'添加新的合同信息',id:'合1'},
                {name:"借款合同1" ,id:'1'},
                {name:"借款合同2",id:'2'},
                {name:"借款合同3",id:'3'},
            ],
            guaranteeContract:[
                {name:'添加新的合同信息',id:'合2'},
                {name:'guaranteeContract1',id:'1'},
                {name:'guaranteeContract2',id:'2'},
                {name:'guaranteeContract3',id:'3'},
            ],
            mortgageContract:[
                {name:'添加新的合同信息',id:'合3'},
                {name:'抵押合同1',id:'1'},
                {name:'抵押合同2',id:'2'},
                {name:'抵押合同3',id:'3'},
            ],
            pledgeContract:[
                {name:'添加新的合同信息',id:'合4'},
                {name:'质押合同1',id:'1'},
                {name:'质押合同2',id:'2'},
                {name:'质押合同3',id:'3'},
            ],
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
        };
    },
    methods: {
        choice(name){
            if(name[0] == '合'){
                this.titleIndex = name[1];
                this.modal1 = true;
            }
        },
        ok (){

        },
        cancel (){

        }
    },
    mounted () {
        
    }
};
</script>
    