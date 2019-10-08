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
        <Form label-position="right" :label-width="130">
            <FormItem label="合同名称">
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
                        <MenuItem :name="item.id" v-for="(item,index) in creditInfo">{{item.name}}</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            夫妻共同债务
                        </template>
                        <MenuItem :name="item.id" v-for="(item,index) in commonDebt">{{item.name}}</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            支付令
                        </template>
                        <MenuItem :name="item.id" v-for="(item,index) in paymentOrder">{{item.name}}</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            终结督促程序
                        </template>
                        <MenuItem :name="item.id" v-for="(item,index) in finalProcedure">{{item.name}}</MenuItem>
                    </Submenu>
                </Menu>
            </FormItem>
        </Form>
        <Modal
            v-model="modal1"
            :title=titleArr[titleIndex]
            @on-ok="ok"
            @on-cancel="cancel">
            <Form label-position="right" :label-width="155" v-show="titleIndex == 0">
                <FormItem label="信用卡卡号">
                    <Input v-model="creditCard.num" :row="5" placeholder="请输入信用卡卡号" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡合约名称">
                    <Input v-model="creditCard.name" :row="5" placeholder="请输入合约名称" style="width: 300px" />
                </FormItem>
                <FormItem label="利息约定">
                    <Input v-model="creditCard.interestAgreement" :row="5" placeholder="请输入利息约定" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡欠款最新截至时间">
                    <DatePicker type="date" v-model="creditCard.deadline" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="信用卡最新欠款本金（元）">
                    <Input v-model="creditCard.principal" :row="5" placeholder="请输入本金" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡最新欠款利息（元）">
                    <Input v-model="creditCard.interest" :row="5" placeholder="请输入利息" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡最新欠款滞纳金（违约金）（元）">
                    <Input v-model="creditCard.latePayment" :row="5" placeholder="请输入滞纳金" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡年费（元）">
                    <Input v-model="creditCard.annualFee" :row="5" placeholder="请输入年费" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡分期手续费（元）">
                    <Input v-model="creditCard.handlingFee" :row="5" placeholder="请输入手续费" style="width: 300px" />
                </FormItem>
                <FormItem label="其他费用项目及金额（元）">
                    <Input v-model="creditCard.otherFee" :row="5" placeholder="请输入其他费用" style="width: 300px" />
                </FormItem>
                <FormItem label="违约金约定">
                    <Input v-model="creditCard.defaultAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债权费用的约定">
                    <Input v-model="creditCard.feeAgreement" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="律师费（元）">
                    <Input v-model="creditCard.lawyerFee" :row="5" placeholder="请输入律师费" style="width: 300px" />
                </FormItem>
                <FormItem label="保全费（元）">
                    <Input v-model="creditCard.securityFee" :row="5" placeholder="请输入保全费" style="width: 300px" />
                </FormItem>
                <FormItem label="公告费（元）">
                    <Input v-model="creditCard.announcementFee" :row="5" placeholder="请输入公告费" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡取现手续费（元）">
                    <Input v-model="creditCard.cashFee" :row="5" placeholder="请输入手续费" style="width: 300px" />
                </FormItem>
                <FormItem label="其他项目费用（年费、取现手续费、分期手续费）的约定">
                    <Input v-model="creditCard.otherProjectFee" :row="5" placeholder="请输入其他项目约定" style="width: 300px" />
                </FormItem>
                <FormItem label="最新截止时间后利息计算标准">
                    <Input v-model="creditCard.endStandard" :row="5" placeholder="请输入计算标准" style="width: 300px" />
                </FormItem>
                <FormItem label="最新截止时间后违约金（滞纳金）计算标准">
                    <Input v-model="creditCard.endFeeStandard" :row="5" placeholder="请输入计算标准" style="width: 300px" />
                </FormItem>
                <FormItem>
                    <Menu @on-select="guaranteeChioce" style="width: 300px;">
                        <Submenu name="1">
                            <template slot="title">
                                保证合同信息
                            </template>
                            <MenuItem :name="item.id" v-for="(item,index) in guarantee">{{item.name}}</MenuItem>
                        </Submenu>
                    </Menu>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="155" v-show="titleIndex == 1">
                <FormItem>
                    <FormItem label="是否支持夫妻共同债">
                        <RadioGroup v-model="couple.isPublic">
                            <Radio label="yes">
                                <span>是</span>
                            </Radio>
                            <Radio label="no">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </FormItem>
                <FormItem label="结婚登记时间">
                    <DatePicker type="date" v-model="couple.marry" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="离婚登记时间">
                    <DatePicker type="date" v-model="couple.divorce" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="155" v-show="titleIndex == 2">
                <FormItem label="请求支付的事实与理由">
                    <Input v-model="pay.reason" :row="5" placeholder="请输入理由" style="width: 300px" />
                </FormItem>
                <FormItem label="申请支付金额（元）">
                    <Input v-model="pay.money" :row="5" placeholder="请输入金额" style="width: 300px" />
                </FormItem>
                <FormItem label="有价证券">
                    <Input v-model="pay.securities" :row="5" placeholder="请输入金额" style="width: 300px" />
                </FormItem>
                <FormItem label="支付令申请费（元）">
                    <Input v-model="pay.applicationFee" :row="5" placeholder="请输入金额" style="width: 300px" />
                </FormItem>
                <FormItem label="申请支付令时">
                    <DatePicker type="date" v-model="pay.applyTime" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="作出支付令时间">
                    <DatePicker type="date" v-model="pay.completeTime" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
            </Form>
            <Form label-position="right" :label-width="155" v-show="titleIndex == 3">
                <FormItem label="终结督促程序申请费（元）">
                    <Input v-model="endProcess.fee" :row="5" placeholder="请输入金额" style="width: 300px" />
                </FormItem>
                <FormItem label="终结督促程序裁定作出时间">
                    <DatePicker type="date" v-model="endProcess.time" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="终结督促程序的原因">
                    <Input v-model="endProcess.reason" :row="5" placeholder="请输入原因" style="width: 300px" />
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal2"
        title="保证合同信息"
        @on-ok="ok"
        @on-cancel="cancel">
            <Form label-position="right" :label-width="155">
                <FormItem label="保证合同名称">
                    <Input v-model="guaranteeContract.name" :row="5" placeholder="请输入合同名称" style="width: 300px" /> 
                </FormItem>
                <FormItem label="合同签订时间">
                    <DatePicker type="date" v-model="guaranteeContract.time" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="保证人">
                    <Input v-model="guaranteeContract.people" :row="5" placeholder="请输入保证人" style="width: 300px" /> 
                </FormItem>
                <FormItem label="保证期间">
                    <DatePicker type="daterange" v-model="guaranteeContract.timeRange" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="保证方式">
                    <Input v-model="guaranteeContract.methods" :row="5" placeholder="请输入方式" style="width: 300px" /> 
                </FormItem>
                <FormItem label="保证范围">
                    <Input v-model="guaranteeContract.range" :row="5" placeholder="请输入范围" style="width: 300px" /> 
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'elementInfo2',
    data () {
        return {
            modal1:false,
            modal2:false,
            titleIndex:0,
            titleArr:['添加信用卡信息','添加夫妻共同债务','添加支付令','添加终结督促程序'],
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
            creditInfo:[
                {name:'添加新的信用卡信息',id:'合0'},
                {name:"信用卡信息0",id:'1'},
                {name:"信用卡信息2",id:'2'},
                {name:"信用卡信息3",id:'3'},
            ],
            commonDebt:[
                {name:'添加新的夫妻共同债务信息',id:'合1'},
                {name:"共同债务0",id:'1'},
                {name:"共同债务2",id:'2'},
                {name:"共同债务3",id:'3'},
            ],
            paymentOrder:[
                {name:'添加新的支付令信息',id:'合2'},
                {name:'支付令信息',id:'1'},
                {name:'支付令信息',id:'2'},
                {name:'支付令信息',id:'3'},
            ],
            finalProcedure:[
                {name:'添加新的终结督促程序',id:'合3'},
                {name:'终结督促程序',id:'1'},
                {name:'终结督促程序',id:'2'},
                {name:'终结督促程序',id:'3'},
            ],
            guarantee:[
                {name:'请添加新的保证合同信息',id:'保1'},
                {name:'保证合同信息1',id:'1'},
                {name:'保证合同信息2',id:'2'},
                {name:'保证合同信息3',id:'3'}
            ],
            couple:{
                isPublic:'',
                marry:'',
                divorce:''
            },
        };
    },
    methods: {
        choice(name){
            if(name[0] == '合'){
                this.titleIndex = name[1];
                this.modal1 = true;
            }
        },
        guaranteeChioce(name){
            this.modal2 = true;
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
    