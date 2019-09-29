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
    </div>
</template>

<script>
export default {
    name: 'elementInfo',
    data () {
        return {
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
            creditContract:[
                {name:"授信合同1",id:'1'},
                {name:"授信合同2",id:'2'},
                {name:"授信合同3",id:'3'},
            ],
            loanContract:[
                {name:"借款合同1" ,id:'1'},
                {name:"借款合同2",id:'2'},
                {name:"借款合同3",id:'3'},
            ],
            guaranteeContract:[
                {name:'guaranteeContract1',id:'1'},
                {name:'guaranteeContract2',id:'2'},
                {name:'guaranteeContract3',id:'3'},
            ],
            mortgageContract:[
                {name:'抵押合同1',id:'1'},
                {name:'抵押合同2',id:'2'},
                {name:'抵押合同3',id:'3'},
            ],
            pledgeContract:[
                {name:'质押合同1',id:'1'},
                {name:'质押合同2',id:'2'},
                {name:'质押合同3',id:'3'},
            ],
            isPublic:'no',
        };
    },
    methods: {
        choice(name){
            console.log(name);
        },
    },
    mounted () {
        
    }
};
</script>
    