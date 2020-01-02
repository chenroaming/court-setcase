<style lang="less">
    
</style>


<template>
    <div>
        <div v-if="element == 1" class="loan-Box">
            <Menu @on-select="choice" style="width: 300px;">
                <Submenu name="1">
                    <template slot="title">
                        授信合同信息
                    </template>
                    <MenuItem :name="'c0'+item.id" v-for="(item,index) in creditContract">{{item.name}}
                    </MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        借款合同信息
                    </template>
                    <MenuItem :name="'l1'+item.id" v-for="(item,index) in loanContract">{{item.name}}
                    </MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        保证合同信息
                    </template>
                    <MenuItem :name="'g2'+item.id" v-for="(item,index) in guaranteeContract">{{item.name}}
                    </MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        抵押合同信息
                    </template>
                    <MenuItem :name="'m3'+item.id" v-for="(item,index) in mortgageContract">{{item.name}}
                    </MenuItem>
                </Submenu>
                <Submenu name="5">
                    <template slot="title">
                        质押合同信息
                    </template>
                    <MenuItem :name="'p4'+item.id" v-for="(item,index) in pledgeContract">{{item.name}}
                    </MenuItem>
                </Submenu>
            </Menu>
            <Form label-position="left" :label-width="130" ref="litigation" :model="litigation" :rules="litigationCheck">
                <FormItem label="放款日期:">
                    <DatePicker type="date" :disabled="isChecked" v-model="litigation.loan" placeholder="请选择放款日期" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="实际到期日期:">
                    <DatePicker type="date" :disabled="isChecked" v-model="litigation.maturity" placeholder="请选择到期日期" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="逾期还款日期:">
                    <DatePicker type="date" :disabled="isChecked" v-model="litigation.overdue" placeholder="请选择还款日期" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="欠款最新截至时间:">
                    <DatePicker type="date" :disabled="isChecked" v-model="litigation.cutoff" placeholder="请选择截至日期" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="欠款本金（元）:" prop="arrears">
                    <Input v-model="litigation.arrears" :disabled="isChecked" placeholder="请输入欠款本金，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="利息（元）:" prop="interest">
                    <Input v-model="litigation.interest" :disabled="isChecked" placeholder="请输入利息，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="罚息（元）:" prop="penaltyInterest">
                    <Input v-model="litigation.penaltyInterest" :disabled="isChecked" placeholder="请输入罚息，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="复利（元）:" prop="compoundInterest">
                    <Input v-model="litigation.compoundInterest" :disabled="isChecked" placeholder="请输入复利，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="最新欠款利息（元）:" prop="nInterest">
                    <Input v-model="litigation.nInterest" :disabled="isChecked" placeholder="请输入最新的利息，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="最新欠款罚息（元）:" prop="npInterest">
                    <Input v-model="litigation.npInterest" :disabled="isChecked" placeholder="请输入最新的利息，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="最新欠款复利（元）:" prop="ncdInterest">
                    <Input v-model="litigation.ncdInterest" :disabled="isChecked" placeholder="请输入最新的利息，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="最新欠款利息等（元）:" prop="newArrears">
                    <Input v-model="litigation.newArrears" :disabled="isChecked" placeholder="请输入最新欠款利息，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="违约金金额（元）:" prop="liquidatedDamages">
                    <Input v-model="litigation.liquidatedDamages" :disabled="isChecked" placeholder="请输入违约金额，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债权的费用（元）:" prop="claim">
                    <Input v-model="litigation.claim" :disabled="isChecked" placeholder="请输入债权费用，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="律师费（元）:" prop="lawyerFee">
                    <Input v-model="litigation.lawyerFee" :disabled="isChecked" placeholder="请输入律师费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="保全费（元）:" prop="securityFee">
                    <Input v-model="litigation.securityFee" :disabled="isChecked" placeholder="请输入保全费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="公告费（元）:" prop="announcementFee">
                    <Input v-model="litigation.announcementFee" :disabled="isChecked" placeholder="请输入公告费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债权的其他费用（元）:" prop="otherFee">
                    <Input v-model="litigation.otherFee" :disabled="isChecked" placeholder="请输入其他费用，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="是否支持夫妻共同债:">
                    <RadioGroup v-model="litigation.isPublic">
                        <Radio :disabled="isChecked" label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio :disabled="isChecked" label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="结婚登记时间:">
                    <DatePicker :disabled="isChecked" type="date" v-model="litigation.marryTime" placeholder="请选择结婚时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="离婚登记时间:">
                    <DatePicker :disabled="isChecked" type="date" v-model="litigation.divorceTime" placeholder="请选择离婚时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="适用的法律条文:">
                    <Input type="textarea" :disabled="isChecked" v-model="litigation.legalProvisions" :row="5" placeholder="请输入法律条文" style="width: 300px" />
                </FormItem>
                <FormItem label="法律法规:">
                    <Input type="textarea" :disabled="isChecked" v-model="litigation.regulations" :row="5" placeholder="请输入法律法规" style="width: 300px" />
                </FormItem>
                <FormItem label="诉前保全裁定案号:">
                    <Input v-model="litigation.caseNumber" :disabled="isChecked" placeholder="请输入案号" style="width: 300px" />
                </FormItem>
                <FormItem label="保全被申请人:">
                    <Input v-model="litigation.preservationMan" :disabled="isChecked" placeholder="请输入保全被申请人" style="width: 300px" />
                </FormItem>
                <FormItem label="申请保全时间:">
                    <DatePicker transfer type="date" :disabled="isChecked" v-model="litigation.preservationTime" placeholder="请选择保全日期" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="财产保全金额（元）:" prop="preservationMoney">
                    <Input v-model="litigation.preservationMoney" :disabled="isChecked" placeholder="请输入财产保全金额，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="财产保全费（元）:" prop="preservationFee">
                    <Input v-model="litigation.preservationFee" :disabled="isChecked" placeholder="请输入财产保全费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="作出保全裁定时间:">
                    <DatePicker transfer type="date" :disabled="isChecked" v-model="litigation.rulingTime" placeholder="请选择裁定时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="解除保全申请时间:">
                    <DatePicker transfer type="date" :disabled="isChecked" v-model="litigation.releasePreservation" placeholder="请选择申请日期" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="保全财产情况:">
                    <Input type="textarea" :disabled="isChecked" v-model="litigation.preservationStatus" :row="5" placeholder="请输入保全财产情况" style="width: 300px" />
                </FormItem>
                <FormItem>
                    <Button type="success" @click="changeLoanInfo" :loading="submitLoading" v-show="!isChecked">提交</Button>
                </FormItem>
            </Form>
        </div>
        <div v-if="element == 2" class="loan-Box">
            <Form label-position="left" ref="pay" :model="pay" :rules="ruleValid2" :label-width="170">
                <FormItem label="合同名称：" prop="name">
                    <Input v-model="contract.name" :disabled="isChecked" placeholder="请输入合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="合同签订时间：">
                    <DatePicker type="date" :disabled="isChecked" v-model="contract.time" placeholder="请选择日期" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="信用卡信息：">
                    <Menu @on-select="creditChoice" style="width: 300px;">
                        <Submenu name="1">
                            <template slot="title">
                                点击展开信用卡信息
                            </template>
                            <MenuItem :name="item.id" v-for="(item,index) in creditInfo">{{'信用卡（' + item.cardNo + '）'}}</MenuItem>
                        </Submenu>
                    </Menu>
                </FormItem>
                <FormItem label="是否支持夫妻共同债：">
                    <RadioGroup v-model="couple.isPublic">
                        <Radio :disabled="isChecked" label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio :disabled="isChecked" label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="结婚登记时间：">
                    <DatePicker :disabled="isChecked" type="date" v-model="couple.marry" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="离婚登记时间：">
                    <DatePicker :disabled="isChecked" type="date" v-model="couple.divorce" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="请求支付的事实与理由：">
                    <Input v-model="pay.reason" :disabled="isChecked" :row="5" placeholder="请输入理由" style="width: 300px" />
                </FormItem>
                <FormItem label="申请支付金额（元）：" prop="money">
                    <Input v-model="pay.money" :disabled="isChecked" :row="5" placeholder="请输入金额，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="有价证券（元）：" prop="securities">
                    <Input v-model="pay.securities" :disabled="isChecked" :row="5" placeholder="请输入金额，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="支付令申请费（元）：" prop="applicationFee">
                    <Input v-model="pay.applicationFee" :disabled="isChecked" :row="5" placeholder="请输入金额，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="申请支付令时：">
                    <DatePicker type="date" v-model="pay.applyTime" :disabled="isChecked" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="作出支付令时间：">
                    <DatePicker type="date" v-model="pay.completeTime" :disabled="isChecked" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="终结督促程序裁定作出时间：">
                    <DatePicker transfer type="date" :disabled="isChecked" v-model="endProcess.time" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <Form label-position="left" ref="endProcess" :model="endProcess" :rules="ruleValid3" :label-width="170">
                    <FormItem label="终结督促程序申请费（元）：" prop="fee">
                        <Input v-model="endProcess.fee" :row="5" :disabled="isChecked" placeholder="请输入金额，例如：1000.00" style="width: 300px" />
                    </FormItem>
                </Form>
                <FormItem label="终结督促程序的原因：">
                    <Input v-model="endProcess.reason" :disabled="isChecked" :row="5" placeholder="请输入原因" style="width: 300px" />
                </FormItem>
                <FormItem>
                    <Button type="success" @click="changeCardInfo" v-show="!isChecked" :loading="submitLoading">提交</Button>
                </FormItem>
            </Form>
        </div>
        <Modal
            v-model="modal5"
            title="查看信用卡信息"
            :mask-closable="false"
            width="700px"
            >
            <Form label-position="right" :label-width="315" ref="creditCard" :model="creditCard" :rules="ruleValid">
                <FormItem label="信用卡卡号" prop="num">
                    <Input v-model="creditCard.num" :disabled="isChecked" :row="5" placeholder="请输入信用卡卡号" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡种类" prop="type">
                    <Input v-model="creditCard.type" :disabled="isChecked" :row="5" placeholder="请输入信用卡种类" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡申请时间" prop="applyTime">
                    <DatePicker type="date" :disabled="isChecked" v-model="creditCard.applyTime" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="信用卡核准发卡时间" prop="issueTime">
                    <DatePicker type="date" :disabled="isChecked" v-model="creditCard.issueTime" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="信用额度" prop="quota">
                    <Input v-model="creditCard.quota" :disabled="isChecked" :row="5" placeholder="请输入信用额度，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="透支利率" prop="overRate">
                    <Input v-model="creditCard.overRate" :disabled="isChecked" :row="5" placeholder="请输入透支利率，例如：0.0005" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡合约名称" prop="name">
                    <Input v-model="creditCard.name" :disabled="isChecked" :row="5" placeholder="请输入合约名称" style="width: 300px" />
                </FormItem>
                <FormItem label="利息约定" prop="interestAgreement">
                    <Input type="textarea" v-model="creditCard.interestAgreement" :disabled="isChecked" :row="5" placeholder="请输入利息约定" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡欠款最新截至时间" prop="deadline">
                    <DatePicker type="date" :disabled="isChecked" v-model="creditCard.deadline" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="信用卡最新欠款本金（元）" prop="principal">
                    <Input v-model="creditCard.principal" :disabled="isChecked" :row="5" placeholder="请输入本金，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡最新欠款利息（元）" prop="interest">
                    <Input v-model="creditCard.interest" :disabled="isChecked" :row="5" placeholder="请输入利息，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡最新欠款滞纳金（违约金）（元）" prop="latePayment">
                    <Input v-model="creditCard.latePayment" :disabled="isChecked" :row="5" placeholder="请输入滞纳金，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡年费（元）" prop="annualFee">
                    <Input v-model="creditCard.annualFee" :disabled="isChecked" :row="5" placeholder="请输入年费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡分期手续费（元）" prop="handlingFee">
                    <Input v-model="creditCard.handlingFee" :disabled="isChecked" :row="5" placeholder="请输入手续费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="其他费用项目及金额（元）" prop="otherFee">
                    <Input v-model="creditCard.otherFee" :disabled="isChecked" :row="5" placeholder="请输入其他费用，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="违约金约定" prop="defaultAgreement">
                    <Input type="textarea"  v-model="creditCard.defaultAgreement" :disabled="isChecked" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债权的费用" prop="agreementFee">
                    <Input v-model="creditCard.agreementFee" :disabled="isChecked" :row="5" placeholder="请输入债权费用，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债权费用的约定" prop="feeAgreement">
                    <Input type="textarea" v-model="creditCard.feeAgreement" :disabled="isChecked" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="律师费（元）" prop="lawyerFee">
                    <Input v-model="creditCard.lawyerFee" :disabled="isChecked" :row="5" placeholder="请输入律师费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="保全费（元）" prop="securityFee">
                    <Input v-model="creditCard.securityFee" :disabled="isChecked" :row="5" placeholder="请输入保全费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="公告费（元）" prop="announcementFee">
                    <Input v-model="creditCard.announcementFee" :disabled="isChecked" :row="5" placeholder="请输入公告费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="信用卡取现手续费（元）" prop="cashFee">
                    <Input v-model="creditCard.cashFee" :disabled="isChecked" :row="5" placeholder="请输入手续费，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="其他项目费用（年费、取现手续费、分期手续费）的约定" prop="otherProjectFee">
                    <Input type="textarea" v-model="creditCard.otherProjectFee" :disabled="isChecked" :row="5" placeholder="请输入其他项目约定" style="width: 300px" />
                </FormItem>
                <FormItem label="最新截止时间后利息计算标准" prop="endStandard">
                    <Input type="textarea" v-model="creditCard.endStandard" :disabled="isChecked" :row="5" placeholder="请输入计算标准" style="width: 300px" />
                </FormItem>
                <FormItem label="最新截止时间后违约金（滞纳金）计算标准" prop="endFeeStandard">
                    <Input type="textarea" v-model="creditCard.endFeeStandard" :disabled="isChecked" :row="5" placeholder="请输入计算标准" style="width: 300px" />
                </FormItem>
                <FormItem>
                    <Menu @on-select="guaranteeChioce" style="width: 300px;">
                        <Submenu name="1">
                            <template slot="title">
                                保证合同信息
                            </template>
                            <MenuItem :name="item.id" v-for="(item,index) in guarantee2">{{item.name}}
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="dashed" @click="modal5 = false">关闭</Button>
                <Button type="primary" @click="submitCard" :loading="isAdd2" v-if="!isChecked">确定</Button>
            </div>
        </Modal>
        <Modal v-model="modal2"
            title="保证合同信息"
            :mask-closable="false"
            width="700px"
        >
            <Form label-position="right" :label-width="155">
                <FormItem label="保证合同名称:" prop="name">
                    <Input v-model="guaranteeContract2.name" :disabled="isChecked" :row="5" placeholder="请输入合同名称" style="width: 300px" /> 
                </FormItem>
                <FormItem label="合同签订时间:" prop="time">
                    <DatePicker type="date" :disabled="isChecked" v-model="guaranteeContract2.time" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="保证人:" prop="people">
                    <Input v-model="guaranteeContract2.people" :disabled="isChecked" :row="5" placeholder="请输入保证人" style="width: 300px" />
                </FormItem>
                <FormItem label="保证期间:" prop="timeRange">
                    <DatePicker type="daterange" :disabled="isChecked" v-model="guaranteeContract2.timeRange" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="保证方式:" prop="methods">
                    <Input v-model="guaranteeContract2.methods" :disabled="isChecked" :row="5" placeholder="请输入方式" style="width: 300px" />
                </FormItem>
                <FormItem label="保证范围:" prop="range">
                    <Input v-model="guaranteeContract2.range" :disabled="isChecked" :row="5" placeholder="请输入范围" style="width: 300px" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="dashed" @click="modal2 = false">关闭</Button>
                <Button type="primary" @click="submitCardContract" :loading="isAdd" v-if="!isChecked">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="modal1"
            :title=titleArr[titleIndex]
            :mask-closable="false"
            width="700px"
            >
            <Form ref="credit" :model="credit" :rules="creditCheck" label-position="left" :label-width="180" v-show="titleIndex == 0">
                <FormItem label="授信合同名称：" prop="name">
                    <Input v-model="credit.name" :disabled="isChecked" :row="5" placeholder="请输入授信合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="是否诉请解除该授信合同：" prop="isRelease">
                    <RadioGroup v-model="credit.isRelease">
                        <Radio :disabled="isChecked" label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio :disabled="isChecked" label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="授信人：" prop="creditPeople">
                    <Input v-model="credit.creditPeople" :disabled="isChecked" :row="5" placeholder="请输入授信人" style="width: 300px" />
                </FormItem>
                <FormItem label="授信合同签订时间：" prop="creditTime">
                    <DatePicker type="date" :disabled="isChecked" v-model="credit.creditTime" placeholder="请选择授信合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="授信合同期间：" prop="creditRange">
                    <DatePicker type="daterange" :disabled="isChecked" v-model="credit.creditRange" placeholder="请选择授信合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="授信金额（元）：" prop="creditMoney">
                    <Input v-model="credit.creditMoney" :disabled="isChecked" :row="5" placeholder="请输入授信金额，例如：1000.00" style="width: 300px" />
                </FormItem>
            </Form>
            <Form ref="loan" :rules="loanCheck" :model="loan" label-position="left" :label-width="180" v-show="titleIndex == 1">
                <FormItem label="借款合同名称：" prop="name">
                    <Input v-model="loan.name" :row="5" :disabled="isChecked" placeholder="请输入借款合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="借款人：" prop="creditPeople">
                    <Input v-model="loan.creditPeople" :disabled="isChecked" :row="5" placeholder="请输入借款人" style="width: 300px" />
                </FormItem>
                <FormItem label="是否诉请解除该借款合同：" prop="isRelease">
                    <RadioGroup v-model="loan.isRelease">
                        <Radio :disabled="isChecked" label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio :disabled="isChecked" label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="签订借款合同时间：" prop="time">
                    <DatePicker type="date" :disabled="isChecked" v-model="loan.time" placeholder="请选择借款合同时间" style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="借款本金（元）：" prop="money">
                    <Input v-model="loan.money" :disabled="isChecked" :row="5" placeholder="请输入借款本金，例如：1000.00" style="width: 300px" />
                </FormItem>
                <FormItem label="借款期限：" prop="range">
                    <DatePicker v-model="loan.range" :disabled="isChecked" type="daterange" placement="bottom-end" placeholder="请选择借款期限" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="还款方式：" prop="methods">
                    <Input v-model="loan.methods" :disabled="isChecked" :row="5" placeholder="请输入还款方式" style="width: 300px" />
                </FormItem>
                <FormItem label="借款利率：" prop="loanRate">
                    <Input v-model="loan.loanRate" :disabled="isChecked" :row="5" placeholder="请输入借款利率，例如：0.0005" style="width: 300px" />
                </FormItem>
                <FormItem label="罚息利率：" prop="penaltyRate">
                    <Input v-model="loan.penaltyRate" :disabled="isChecked" :row="5" placeholder="请输入罚息利率，例如：0.0005" style="width: 300px" />
                </FormItem>
                <FormItem label="复利利率：" prop="compoundRate">
                    <Input v-model="loan.compoundRate" :disabled="isChecked" :row="5" placeholder="请输入复利利率，例如：0.0005" style="width: 300px" />
                </FormItem>
                <FormItem label="罚息/复利约定：" prop="rateAgreement">
                    <Input type="textarea" v-model="loan.rateAgreement" :disabled="isChecked" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="解除合同或提前收贷约定：" prop="releaseAgreement">
                    <Input type="textarea" v-model="loan.releaseAgreement" :disabled="isChecked" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="违约金约定：" prop="defaultAgreement">
                    <Input type="textarea" v-model="loan.defaultAgreement" :disabled="isChecked" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="实现债权费用的约定：" prop="feeAgreement">
                    <Input type="textarea" v-model="loan.feeAgreement" :disabled="isChecked" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
                <FormItem label="送达约定：" prop="sendAgreement">
                    <Input type="textarea" v-model="loan.sendAgreement" :disabled="isChecked" :row="5" placeholder="请输入约定" style="width: 300px" />
                </FormItem>
            </Form>
            <Form ref="guarantee" :rules="guaranteeCheck" :model="guarantee" label-position="left" :label-width="180" v-show="titleIndex == 2">
                <FormItem label="保证合同名称：" prop="name">
                    <Input v-model="guarantee.name" :row="5" :disabled="isChecked" placeholder="请输入保证合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="保证人：" prop="guaranteePeople">
                    <Input v-model="guarantee.guaranteePeople" :disabled="isChecked" :row="5" placeholder="请输入保证人" style="width: 300px" />
                </FormItem>
                <FormItem label="保证方式：" prop="methods">
                    <Input v-model="guarantee.methods" :disabled="isChecked" :row="5" placeholder="请输入保证方式" style="width: 300px" />
                </FormItem>
                <FormItem label="保证期间：" prop="timeRange">
                    <DatePicker v-model="guarantee.timeRange" :disabled="isChecked" type="daterange" placement="bottom-end" placeholder="请选择保证期间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="保证合同签订时间：" prop="time">
                    <DatePicker v-model="guarantee.time" :disabled="isChecked" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="保证范围：" prop="guaranteeRange">
                    <Input v-model="guarantee.guaranteeRange" :disabled="isChecked" :row="5" placeholder="请输入保证范围" style="width: 300px" />
                </FormItem>
            </Form>
            <Form ref="mortgage" :rules="mortgageCheck" :model="mortgage" label-position="left" :label-width="180" v-show="titleIndex == 3">
                <FormItem label="抵押合同名称：" prop="name">
                    <Input v-model="mortgage.name" :row="5" :disabled="isChecked" placeholder="请输入抵押合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押合同签订时间：" prop="time">
                    <DatePicker v-model="mortgage.time" :disabled="isChecked" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="抵押物权属：" prop="ownership">
                    <Input v-model="mortgage.ownership" :disabled="isChecked" :row="5" placeholder="请输入抵押物权属" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押物名称：" prop="articleName">
                    <Input v-model="mortgage.articleName" :disabled="isChecked" :row="5" placeholder="请输入抵押物名称" style="width: 300px" />
                </FormItem>
                <FormItem label="抵押担保范围：" prop="range">
                    <Input v-model="mortgage.range" :disabled="isChecked" :row="5" placeholder="请输入担保范围" style="width: 300px" />
                </FormItem>
                <FormItem label="办理抵押登记时间：" prop="handletime">
                    <DatePicker v-model="mortgage.handletime" :disabled="isChecked" type="date" placement="bottom-end" placeholder="请选择登记时间" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
            <Form ref="pledge" :rules="pledgeCheck" :model="pledge" label-position="left" :label-width="180" v-show="titleIndex == 4">
                <FormItem label="质押合同名称：" prop="name">
                    <Input v-model="pledge.name" :row="5" :disabled="isChecked" placeholder="请输入质押合同名称" style="width: 300px" />
                </FormItem>
                <FormItem label="质押合同签订时间：" prop="time">
                    <DatePicker v-model="pledge.time" :disabled="isChecked" type="date" placement="bottom-end" placeholder="请选择签订时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="质押物权属：" prop="ownership">
                    <Input v-model="pledge.ownership" :disabled="isChecked" :row="5" placeholder="请输入质押物权属" style="width: 300px" />
                </FormItem>
                <FormItem label="质押物名称：" prop="articleName">
                    <Input v-model="pledge.articleName" :disabled="isChecked" :row="5" placeholder="请输入质押物名称" style="width: 300px" />
                </FormItem>
                <FormItem label="质押担保范围：" prop="range">
                    <Input v-model="pledge.range" :disabled="isChecked" :row="5" placeholder="请输入质押担保范围" style="width: 300px" />
                </FormItem>
                <FormItem label="办理质押登记时间：" prop="handletime">
                    <DatePicker v-model="pledge.handletime" :disabled="isChecked" type="date" placement="bottom-end" placeholder="请选择质押登记时间" style="width: 200px"></DatePicker>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="dashed" @click="modal1 = false">关闭</Button>
                <Button type="primary" @click="submitContract" :loading="isAdd" v-if="!isChecked">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {addOrUpdateCtInfo,addOrUpdateLoanCtInfo,addOrUpdateMcInfo,addOrUpdatePcInfo,
        getDelCtInfo,
        updatePLoan,
        getEdit,
        editInfo,
        confirmOnLawCase
    } from '@/api/contract.js';
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
    name: 'editElement',
    props:['lawCaseId','element'],
    data () {
        const validNumber = (rule, value, callback) => {//表单验证
            if (isNaN(value)) {
                return callback(new Error('请输入数字'));
            }
            callback();
        };
        return {
            isAdd:false,
            submitLoading:false,//要素信息修改按钮状态
            isChecked:true,//要素信息是否已核对
            partCardId:'',//信用卡要素Id
            partId:'',//金融借款合同要素Id
            modal1:false,
            cardId:'',
            contractType:'',//合同类型
            titleArr:['查看授信合同信息','查看借款合同信息','查看保证合同信息','查看抵押合同信息','查看质押合同信息'],
            titleIndex:0,
            litigation:{//金融要素信息查看列表
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
                isPublic:'',
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
            credit:{//授信合同
                name:'',
                isRelease:'',
                creditPeople:'',
                creditTime:'',
                creditRange:'',
                creditMoney:''
            },
            loan:{//借款合同
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
            guarantee:{//保证合同
                name:'',
                guaranteePeople:'',
                methods:'',
                timeRange:'',
                time:'',
                guaranteeRange:''
            },
            mortgage:{//抵押合同
                name:'',
                time:'',
                ownership:'',
                articleName:'',
                range:'',
                handletime:''
            },
            pledge:{//质押合同
                name:'',
                time:'',
                ownership:'',
                articleName:'',
                range:'',
                handletime:''
            },
            isAdd2:false,
            modal2:false,
            modal3:false,
            modal5:false,//信用卡弹窗
            modal6:false,
            modal7:false,
            creditInfo:[],
            contract:{
                name:'',
                time:''
            },
            endProcess:{
                fee:'',
                time:'',
                reason:''
            },
            creditCard:{//信用卡信息
                num:'',
                name:'',
                type:'',
                applyTime:'',
                issueTime:'',
                quota:'',
                overRate:'',
                agreementFee:'',
                acceptanceFee:'',
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
            ruleValid:{//信用卡验证规则
                quota:[
                    {validator:validNumber,trigger:'change'}
                ],
                principal:[
                    {validator:validNumber,trigger:'change'}
                ],
                overRate:[
                    {validator:validNumber,trigger:'change'}
                ],
                interest:[
                    {validator:validNumber,trigger:'change'}
                ],
                latePayment:[
                    {validator:validNumber,trigger:'change'}
                ],
                annualFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                agreementFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                handlingFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                otherFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                lawyerFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                securityFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                announcementFee:[
                    {validator:validNumber,trigger:'change'} 
                ],
                cashFee:[
                    {validator:validNumber,trigger:'change'} 
                ]
            },
            ruleValid2:{//信用卡验证规则
                money:[
                    {validator:validNumber,trigger:'change'}
                ],
                securities:[
                    {validator:validNumber,trigger:'change'}
                ],
                applicationFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                fee:[
                    {validator:validNumber,trigger:'change'}
                ]
            },
            ruleValid3:{//信用卡验证规则
                fee:[
                    {validator:validNumber,trigger:'change'}
                ]
            },
            //金融合同验证规则
            creditCheck:{
                name:[
                    {required: true, message: '请输入合同名称', trigger: 'change'}
                ],
                creditMoney:[
                    {validator:validNumber,trigger:'change'}
                ]   
            },
            loanCheck:{
                name:[
                    {required: true, message: '请输入合同名称', trigger: 'change'}
                ],
                money:[
                    {validator:validNumber,trigger:'change'}
                ],
                loanRate:[
                    {validator:validNumber,trigger:'change'}
                ],
                penaltyRate:[
                    {validator:validNumber,trigger:'change'}
                ],
                compoundRate:[
                    {validator:validNumber,trigger:'change'}
                ]
            },
            guaranteeCheck:{
                name:[
                    {required: true, message: '请输入合同名称', trigger: 'change'}
                ]    
            },
            mortgageCheck:{
                name:[
                    {required: true, message: '请输入合同名称', trigger: 'change'}
                ]    
            },
            pledgeCheck:{
                name:[
                    {required: true, message: '请输入合同名称', trigger: 'change'}
                ]    
            },
            litigationCheck:{//金融要素验证规则
                arrears:[
                    {validator:validNumber,trigger:'change'}
                ],
                interest:[
                    {validator:validNumber,trigger:'change'}
                ],
                penaltyInterest:[
                    {validator:validNumber,trigger:'change'}
                ],
                compoundInterest:[
                    {validator:validNumber,trigger:'change'}
                ],
                nInterest:[
                    {validator:validNumber,trigger:'change'}
                ],
                npInterest:[
                    {validator:validNumber,trigger:'change'}
                ],
                ncdInterest:[
                    {validator:validNumber,trigger:'change'}
                ],
                newArrears:[
                    {validator:validNumber,trigger:'change'}
                ],
                liquidatedDamages:[
                    {validator:validNumber,trigger:'change'}
                ],
                claim:[
                    {validator:validNumber,trigger:'change'}
                ],
                lawyerFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                securityFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                announcementFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                otherFee:[
                    {validator:validNumber,trigger:'change'}
                ],
                preservationMoney:[
                    {validator:validNumber,trigger:'change'}
                ],
                preservationFee:[
                    {validator:validNumber,trigger:'change'}
                ],
            },
            guaranteeContract2:{//信用卡保证合同信息
                name:'',
                time:'',
                people:'',
                timeRange:'',
                methods:'',
                range:''
            },
            pay:{//支付信息
                reason:'',
                money:'',
                securities:'',
                applicationFee:'',
                applyTime:'',
                completeTime:'' 
            },
            guarantee2:[],
            couple:{//是否夫妻共同债信息
                isPublic:'',
                marry:'',
                divorce:''
            },
            creditContract:[],
            loanContract:[],
            guaranteeContract:[],
            mortgageContract:[],
            pledgeContract:[],
        };
    },
    methods: {
        time(time = +new Date()) {//时间戳转换函数
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ').substring(0,10);
        },
        guaranteeChioce(name){
            this.modal2 = true;
            this.infoId = name;
            getCtInfo('gc',name).then(res => {
                this.guaranteeContract2.name = res.data.data.name;
                this.guaranteeContract2.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                this.guaranteeContract2.people = res.data.data.guarantor;
                this.guaranteeContract2.timeRange = res.data.data.guarantorDate == null ? '' : res.data.data.guarantorDate.replace('至',' - ');
                this.guaranteeContract2.methods = res.data.data.guarantorMethod;
                this.guaranteeContract2.range = res.data.data.guaranteeScope;
            })
        },
        choice(name){
            this.titleIndex = name[1];
            this.modal1 = true;
            this.contractType = name.substring(0,2);
            switch(name.substring(0,2)){
                case 'c0':
                    this.infoId = name.substring(2);
                    getCtInfo('cc',this.infoId).then(res => {
                        this.credit.name = res.data.data.name;
                        this.credit.isRelease = res.data.data.relieve == true ? 'yes' : 'no';
                        this.credit.creditPeople = res.data.data.creditGrantor;
                        this.credit.creditTime = res.data.data.sign == null ? '' : this.time(res.data.data.sign);
                        this.credit.creditRange = res.data.data.periodRange == null ? '' :res.data.data.periodRange.replace('至',' - ');
                        this.credit.creditMoney = res.data.data.amount;
                    })
                break;
                case 'l1':
                    this.infoId = name.substring(2);
                    getCtInfo('lc',this.infoId).then(res => {
                        console.log(res.data.data);
                        this.loan.name = res.data.data.name;
                        this.loan.creditPeople = res.data.data.borrower;
                        this.loan.isRelease = res.data.data.relieve == true ? 'yes' : 'no';
                        this.loan.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                        this.loan.money = res.data.data.amount;
                        this.loan.range = res.data.data.askTime == null ? '' : res.data.data.askTime.replace('至',' - ');
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
                        this.guarantee.timeRange = res.data.data.guarantorDate == null ? '' : res.data.data.guarantorDate.replace('至',' - ');
                        this.guarantee.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                        this.guarantee.guaranteeRange = res.data.data.guaranteeScope;
                    })
                break;
                case 'm3':
                    this.infoId = name.substring(2);
                    getCtInfo('mc',this.infoId).then(res => {
                            this.mortgage.name = res.data.data.name;
                            this.mortgage.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                            this.mortgage.ownership = res.data.data.ownership;
                            this.mortgage.articleName = res.data.data.collateral;
                            this.mortgage.range = res.data.data.mortgageRange;
                            this.mortgage.handletime = res.data.data.mortgageTime == null ? '' : this.time(res.data.data.mortgageTime);
                        })
                break;
                case 'p4':
                    this.infoId = name.substring(2);
                    getCtInfo('pc',this.infoId).then(res => {
                        console.log(res.data.data);
                        this.pledge.name = res.data.data.name;
                        this.pledge.time = res.data.data.signTime == null ? '' : this.time(res.data.data.signTime);
                        this.pledge.ownership = res.data.data.ownership;
                        this.pledge.articleName = res.data.data.pledge;
                        this.pledge.range = res.data.data.pledgeRange;
                        this.pledge.handletime = res.data.data.pledgeTime == null ? '' : this.time(res.data.data.pledgeTime);
                    })
                break;
            }
        },
        creditChoice(name){
            this.modal5 = true;
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
                this.creditCard.type = res.data.data.cardType;
                this.creditCard.applyTime = res.data.data.applyCardDate == null ? '' : this.time(res.data.data.applyCardDate);
                this.creditCard.issueTime = res.data.data.auditDate == null ? '' : this.time(res.data.data.auditDate);
                this.creditCard.overRate = res.data.data.overdrawRate;
                this.creditCard.agreementFee = res.data.data.bondFee;
                this.creditCard.quota = res.data.data.lineOfCredit;
            });
            getContractInfo(this.lawCaseId,this.partCardId,'gc',this.cardId).then(res => {
                if(res.data.state == 100){
                    this.guarantee2 = res.data.nameList;
                }
            })
        },

        changeCardInfo(){
            this.$refs['pay'].validate((valid) => {
                if(!valid){
                    this.$emit('listenToChildEvent','0');
                    return this.$Message.error('格式错误！请检查！');
                }
                this.$refs['endProcess'].validate((valid) => {
                    if(!valid){
                        this.$emit('listenToChildEvent','0');
                        return this.$Message.error('格式错误！请检查！');
                    }
                    this.submitLoading = true;
                    const obj = {
                        onlineLawCaseId:this.lawCaseId,
                        partCardId:this.partCardId,
                        contractName:this.contract.name,
                        signTime:this.contract.time == '' ? this.contract.time : typeof(this.contract.time) == 'number' ? this.time(this.contract.time) : this.contract.time.getFullYear()+'-'+(this.contract.time.getMonth()+1)+'-'+this.contract.time.getDate(),
                        joint:this.couple.isPublic == 'yes' ? true : false,
                        mgTime:this.couple.marry == '' ? this.couple.marry : typeof(this.couple.marry) == 'number' ? this.time(this.couple.marry) : this.couple.marry.getFullYear()+'-'+(this.couple.marry.getMonth()+1)+'-'+this.couple.marry.getDate(),
                        dvTime:this.couple.divorce == '' ? this.couple.divorce : typeof(this.couple.divorce) == 'number' ? this.time(this.couple.divorce) : this.couple.divorce.getFullYear()+'-'+(this.couple.divorce.getMonth()+1)+'-'+this.couple.divorce.getDate(),
                        reasonContent:this.pay.reason,
                        ayAmount:this.pay.money,
                        securities:this.pay.securities,
                        ayFee:this.pay.applicationFee,
                        ayTime:this.pay.applyTime == '' ? this.pay.applyTime : typeof(this.pay.applyTime) == 'number' ? this.time(this.pay.applyTime) : this.pay.applyTime.getFullYear()+'-'+(this.pay.applyTime.getMonth()+1)+'-'+this.pay.applyTime.getDate(),
                        mayTime:this.pay.completeTime == '' ? this.pay.completeTime : typeof(this.pay.completeTime) == 'number' ? this.time(this.pay.completeTime) : this.pay.completeTime.getFullYear()+'-'+(this.pay.completeTime.getMonth()+1)+'-'+this.pay.completeTime.getDate(),
                        eayFee:this.endProcess.fee,
                        emkTime:this.endProcess.time == '' ? this.endProcess.time : typeof(this.endProcess.time) == 'number' ? this.time(this.endProcess.time) : this.endProcess.time.getFullYear()+'-'+(this.endProcess.time.getMonth()+1)+'-'+this.endProcess.time.getDate(),
                        endReason:this.endProcess.reason
                    }
                    editInfo(obj).then(res => {
                        this.submitLoading = false;
                        if(res.data.state == 100){
                            this.$Message.success(res.data.message);
                        }else if(res.data.state == 101){
                            this.$Message.error(res.data.message);
                        }
                    })
                })
            })
        },


        submitCard(){
            this.$refs['creditCard'].validate((valid) => {
                if(!valid){
                    return this.$Message.error('格式错误！请检查！');
                }
                if(this.isChecked){
                    return this.modal5 = false;
                }
                this.isAdd2 = true;
                const obj = {
                    onlineLawCaseId:this.lawCaseId,
                    cardId:this.cardId,
                    partCardId:this.partCardId,
                    cardNo:this.creditCard.num,
                    contractName:this.creditCard.name,
                    interestAgreement:this.creditCard.interestAgreement,
                    ldlTime:this.creditCard.deadline == '' ? this.creditCard.deadline : typeof(this.creditCard.deadline) == 'number' ? this.time(this.creditCard.deadline) : this.creditCard.deadline.getFullYear()+'-'+(this.creditCard.deadline.getMonth()+1)+'-'+this.creditCard.deadline.getDate(),
                    nowAmount:this.creditCard.principal,
                    nowInterest:this.creditCard.interest,
                    nowLFee:this.creditCard.latePayment,
                    annualFeeStr:this.creditCard.annualFee,
                    byStagesFeeStr:this.creditCard.handlingFee,
                    proAndFee:this.creditCard.otherFee,
                    lateFeeAppointment:this.creditCard.defaultAgreement,
                    bondFeeAppointment:this.creditCard.feeAgreement,
                    lawyerFeeStr:this.creditCard.lawyerFee,
                    pFee:this.creditCard.securityFee,
                    annouFee:this.creditCard.announcementFee,
                    enFee:this.creditCard.cashFee,
                    anotherApponintment:this.creditCard.otherProjectFee,
                    nowInterestStandard:this.creditCard.endStandard,
                    nowLateFeeStandard:this.creditCard.endFeeStandard,
                    cardType:this.creditCard.type,
                    applyCardTime:this.creditCard.applyTime == '' ? this.creditCard.applyTime : typeof(this.creditCard.applyTime) == 'number' ? this.time(this.creditCard.applyTime) : this.creditCard.applyTime.getFullYear()+'-'+(this.creditCard.applyTime.getMonth()+1)+'-'+this.creditCard.applyTime.getDate(),
                    auditTime:this.creditCard.issueTime == '' ? this.creditCard.issueTime : typeof(this.creditCard.issueTime) == 'number' ? this.time(this.creditCard.issueTime) : this.creditCard.issueTime.getFullYear()+'-'+(this.creditCard.issueTime.getMonth()+1)+'-'+this.creditCard.issueTime.getDate(),
                    overdrawRateStr:this.creditCard.overRate,
                    bondFeeStr:this.creditCard.agreementFee,
                    lineOfCreditStr:this.creditCard.quota
                }
                editInfo(obj).then(res => {
                    this.isAdd2 = false;
                    if(res.data.state == 100){
                        this.modal5 = false;
                        this.$Message.success(res.data.message);
                        getPart(this.lawCaseId).then(res => {
                            this.creditInfo = [];
                            res.data.creditCard.creditCardInformations.map(item => {
                                return item.enable == true ? this.creditInfo.push(item) : false;
                            });
                        })
                    }else if(res.data.state == 101){
                        this.$Message.error(res.data.message);
                    }
                })
            })
        },

        changeLoanInfo(){
            this.$refs['litigation'].validate((valid) => {
                if(!valid){
                    return this.$Message.error('格式错误！请检查！');
                }
                this.submitLoading = true;
                const obj = {
                    onlineLawCaseId:this.lawCaseId,
                    partOfLoanId:this.partId,
                    loanTime:this.litigation.loan == '' ? this.litigation.loan : typeof(this.litigation.loan) == 'number' ? this.time(this.litigation.loan) : this.litigation.loan.getFullYear()+'-'+(this.litigation.loan.getMonth()+1)+'-'+this.litigation.loan.getDate(),
                    paymentTime:this.litigation.maturity == '' ? this.litigation.maturity : typeof(this.litigation.maturity) == 'number' ? this.time(this.litigation.maturity) : this.litigation.maturity.getFullYear()+'-'+(this.litigation.maturity.getMonth()+1)+'-'+this.litigation.maturity.getDate(),
                    overdueRepaymentTime:this.litigation.overdue == '' ? this.litigation.overdue : typeof(this.litigation.overdue) == 'number' ? this.time(this.litigation.overdue) : this.litigation.overdue.getFullYear()+'-'+(this.litigation.overdue.getMonth()+1)+'-'+this.litigation.overdue.getDate(),
                    ldlfTime:this.litigation.cutoff == '' ? this.litigation.cutoff : typeof(this.litigation.cutoff) == 'number' ? this.time(this.litigation.cutoff) : this.litigation.cutoff.getFullYear()+'-'+(this.litigation.cutoff.getMonth()+1)+'-'+this.litigation.cutoff.getDate(),
                    ppArrears:this.litigation.arrears,
                    interestParam:this.litigation.interest,
                    plInterest:this.litigation.penaltyInterest,
                    cInterest:this.litigation.compoundInterest,
                    nInterest:this.litigation.nInterest,
                    npInterest:this.litigation.npInterest,
                    ncdInterest:this.litigation.ncdInterest,
                    cioArrears:this.litigation.newArrears,
                    ldDamages:this.litigation.liquidatedDamages,
                    dExpense:this.litigation.claim,
                    lyFees:this.litigation.lawyerFee,
                    ptFee:this.litigation.securityFee,
                    acFee:this.litigation.announcementFee,
                    adExpense:this.litigation.otherFee,
                    joint:this.isPublic == 'yes' ? true : false,
                    marriageTime:this.litigation.marryTime == '' ? this.litigation.marryTime : typeof(this.litigation.marryTime) == 'number' ? this.time(this.litigation.marryTime) : this.litigation.marryTime.getFullYear()+'-'+(this.litigation.marryTime.getMonth()+1)+'-'+this.litigation.marryTime.getDate(),
                    divorceTime:this.litigation.divorceTime == '' ? this.litigation.divorceTime : typeof(this.litigation.divorceTime) == 'number' ? this.time(this.litigation.divorceTime) : this.litigation.divorceTime.getFullYear()+'-'+(this.litigation.divorceTime.getMonth()+1)+'-'+this.litigation.divorceTime.getDate(),
                    legalProvisions:this.litigation.legalProvisions,
                    lawAndRegulations:this.litigation.regulations,
                    preservationCaseNo:this.litigation.caseNumber,
                    preservationRespondent:this.litigation.preservationMan,
                    afpTime:this.litigation.preservationTime == '' ? this.litigation.preservationTime : typeof(this.litigation.preservationTime) == 'number' ? this.time(this.litigation.preservationTime) : this.litigation.preservationTime.getFullYear()+'-'+(this.litigation.preservationTime.getMonth()+1)+'-'+this.litigation.preservationTime.getDate(),
                    pstAmount:this.litigation.preservationMoney,
                    pvtAmountFee:this.litigation.preservationFee,
                    pvtTime:this.litigation.rulingTime == '' ? this.litigation.rulingTime : typeof(this.litigation.rulingTime) == 'number' ? this.time(this.litigation.rulingTime) : this.litigation.rulingTime.getFullYear()+'-'+(this.litigation.rulingTime.getMonth()+1)+'-'+this.litigation.rulingTime.getDate(),
                    frvTime:this.litigation.releasePreservation == '' ? this.litigation.releasePreservation : typeof(this.litigation.releasePreservation) == 'number' ? this.time(this.litigation.releasePreservation) : this.litigation.releasePreservation.getFullYear()+'-'+(this.litigation.releasePreservation.getMonth()+1)+'-'+this.litigation.releasePreservation.getDate(),
                    preservationSituation:this.litigation.preservationStatus
                }
                editInfo(obj).then(res => {
                    this.submitLoading = false;
                    if(res.data.state == 100){
                        this.$Message.success(res.data.message);
                    }else if(res.data.state == 101){
                        this.$Message.error(res.data.message);
                    }
                })
            })
        },


        submitContract(){
            if(this.isChecked){
                return this.modal1 = false;
            }
            let obj = {};
            this.isAdd = true;
            switch(this.contractType){
                case 'c0':
                    this.$refs['credit'].validateField('creditMoney',valid => {
                        if(valid){
                            this.isAdd = false;
                            return this.$Message.error('授信金额格式错误！');
                        }
                        this.$refs['credit'].validate((valid) => {
                            if(!valid){
                                this.isAdd = false;
                                return this.$Message.error('合同名不能为空！');
                            }
                            obj = {
                                onlineLawCaseId:this.lawCaseId,
                                creditContractId:this.infoId,
                                partId:this.partId,
                                name:this.credit.name,
                                isRelieve:this.credit.isRelease == 'yes' ? true : false,
                                creditGrantor:this.credit.creditPeople,
                                signTime:this.credit.creditTime == '' ? this.credit.creditTime : typeof(this.credit.creditTime) == 'number' ? this.time(this.credit.creditTime) : this.credit.creditTime.getFullYear()+'-'+(this.credit.creditTime.getMonth()+1)+'-'+this.credit.creditTime.getDate(),
                                periodRange:this.credit.creditRange[0] == null || this.credit.creditRange.length == 0 ? '' : this.credit.creditRange[0].getFullYear()+'-'+(this.credit.creditRange[0].getMonth()+1)+'-'+this.credit.creditRange[0].getDate()+'至'+this.credit.creditRange[1].getFullYear()+'-'+(this.credit.creditRange[1].getMonth()+1)+'-'+this.credit.creditRange[1].getDate(),
                                amount:this.credit.creditMoney
                            }
                            this.editInformation(obj);
                        })
                    })
                break;
                case 'l1':
                    this.$refs['loan'].validateField('name',valid => {
                        if(valid){
                            this.isAdd = false;
                            return this.$Message.error(valid);
                        }
                        this.$refs['loan'].validate((valid) => {
                            if(!valid){
                                this.isAdd = false;
                                return this.$Message.error('格式错误！请检查');
                            }
                            obj = {
                                onlineLawCaseId:this.lawCaseId,
                                loanCtId:this.infoId,
                                partId:this.partId,
                                name:this.loan.name,
                                borrower:this.loan.creditPeople,
                                isRelieve:this.loan.isRelease == 'yes' ? true : false,
                                signTime:this.loan.time == '' ? this.loan.time : typeof(this.loan.time) == 'number' ? this.time(this.loan.time) : this.loan.time.getFullYear()+'-'+(this.loan.time.getMonth()+1)+'-'+this.loan.time.getDate(),
                                amount:this.loan.money,
                                askTime:this.loan.range[0] == null || this.loan.range.length == 0 ? '' : this.loan.range[0].getFullYear()+'-'+(this.loan.range[0].getMonth()+1)+'-'+this.loan.range[0].getDate()+'至'+this.loan.range[1].getFullYear()+'-'+(this.loan.range[1].getMonth()+1)+'-'+this.loan.range[1].getDate(),
                                repaymentMethod:this.loan.methods,
                                borrowingRate:this.loan.loanRate,
                                penaltyRate:this.loan.penaltyRate,
                                compoundRate:this.loan.compoundRate,
                                pcAppointment:this.loan.rateAgreement,
                                rpAppointment:this.loan.releaseAgreement,
                                vfAppointment:this.loan.defaultAgreement,
                                bfAppointment:this.loan.feeAgreement,
                                sendAppointment:this.loan.sendAgreement
                            }
                            this.editInformation(obj);
                        })
                    })
                break;
                case 'g2':
                    this.$refs['guarantee'].validate((valid) => {
                        if(!valid){
                            this.isAdd = false;
                            return this.$Message.error('合同名不能为空！');
                        }
                        obj = {
                            onlineLawCaseId:this.lawCaseId,
                            gcInfoId:this.infoId,
                            partId:this.partId,
                            name:this.guarantee.name,
                            guarantor:this.guarantee.guaranteePeople,
                            method:this.guarantee.methods,
                            guarantorDate:this.guarantee.timeRange[0] == null || this.guarantee.timeRange.length == 0 ? '' : this.guarantee.timeRange[0].getFullYear()+'-'+(this.guarantee.timeRange[0].getMonth()+1)+'-'+this.guarantee.timeRange[0].getDate()+'至'+this.guarantee.timeRange[1].getFullYear()+'-'+(this.guarantee.timeRange[1].getMonth()+1)+'-'+this.guarantee.timeRange[1].getDate(),
                            signTime:this.guarantee.time == '' ? this.guarantee.time : typeof(this.guarantee.time) == 'number' ? this.time(this.guarantee.time) : this.guarantee.time.getFullYear()+'-'+(this.guarantee.time.getMonth()+1)+'-'+this.guarantee.time.getDate(),
                            scope:this.guarantee.guaranteeRange,
                        }
                        this.editInformation(obj);
                    })
                break;
                case 'm3':
                    this.$refs['mortgage'].validate((valid) => {
                        if(!valid){
                            this.isAdd = false;
                            return this.$Message.error('合同名不能为空！');
                        }
                        obj = {
                            onlineLawCaseId:this.lawCaseId,
                            mcInfoId:this.infoId,
                            partId:this.partId,
                            name:this.mortgage.name,
                            signTime:this.mortgage.time == '' ? this.mortgage.time : typeof(this.mortgage.time) == 'number' ? this.time(this.mortgage.time) : this.mortgage.time.getFullYear()+'-'+(this.mortgage.time.getMonth()+1)+'-'+this.mortgage.time.getDate(),
                            ownership:this.mortgage.ownership,
                            collateral:this.mortgage.articleName,
                            mortgageRange:this.mortgage.range,
                            mortgageTime:this.mortgage.handletime == '' ? this.mortgage.handletime : typeof(this.mortgage.handletime) == 'number' ? this.time(this.mortgage.handletime) : this.mortgage.handletime.getFullYear()+'-'+(this.mortgage.handletime.getMonth()+1)+'-'+this.mortgage.handletime.getDate(),
                        }
                        this.editInformation(obj);
                    })
                break;
                case 'p4':
                    this.$refs['pledge'].validate((valid) => {
                        if(!valid){
                            this.isAdd = false;
                            return this.$Message.error('合同名不能为空！');
                        }
                        obj = {
                            onlineLawCaseId:this.lawCaseId,
                            pcInfoId:this.infoId,
                            partId:this.partId,
                            name:this.pledge.name,
                            signTime:this.pledge.time == '' ? this.pledge.time : typeof(this.pledge.time) == 'number' ? this.time(this.pledge.time) : this.pledge.time.getFullYear()+'-'+(this.pledge.time.getMonth()+1)+'-'+this.pledge.time.getDate(),
                            ownership:this.pledge.ownership,
                            pledge:this.pledge.articleName,
                            pledgeRange:this.pledge.range,
                            pledgeTime:this.pledge.handletime == '' ? this.pledge.handletime : typeof(this.pledge.handletime) == 'number' ? this.time(this.pledge.handletime) : this.pledge.handletime.getFullYear()+'-'+(this.pledge.handletime.getMonth()+1)+'-'+this.pledge.handletime.getDate()
                        }
                        this.editInformation(obj);
                    })
                break;
            }
        },

        editInformation(obj){
            editInfo(obj).then(res => {
                this.isAdd = false;
                if(res.data.state == 100){
                    this.$Message.success(res.data.message);
                    this.modal1 = false;
                    getPart(this.lawCaseId).then(res => {
                        this.creditContract = [];
                        this.loanContract = [];
                        this.guaranteeContract = [];
                        this.mortgageContract = [];
                        this.pledgeContract = [];
                        res.data.loan.creditContractInformationSet == '' ? [] : res.data.loan.creditContractInformationSet.map(item => {
                            return item.enable == true ? this.creditContract.push(item) : false;
                        });
                        res.data.loan.loanContractInformations == '' ? [] : res.data.loan.loanContractInformations.map(item => {
                            return item.enable == true ? this.loanContract.push(item) : false;
                        });
                        res.data.loan.guaranteeContractInformations == '' ? [] : res.data.loan.guaranteeContractInformations.map(item => {
                            return item.enable == true ? this.guaranteeContract.push(item) : false;
                        });
                        res.data.loan.mortgageContractInformations == '' ? [] : res.data.loan.mortgageContractInformations.map(item => {
                            return item.enable == true ? this.mortgageContract.push(item) : false;
                        });
                        res.data.loan.pledgeContractInformations == '' ? [] : res.data.loan.pledgeContractInformations.map(item => {
                            return item.enable == true ? this.pledgeContract.push(item) : false;
                        });
                    })
                }else if(res.data.state == 101){
                    this.$Message.error(res.data.message);
                }
            })
            .catch(err => {
                this.isAdd = false;
                this.$Message.error('网络错误！');
            })
        },

        submitCardContract(){
            if(this.isChecked){
                return this.modal2 = false;
            }
            this.isAdd = true;
            const obj = {
                onlineLawCaseId:this.lawCaseId,
                gcInfoId:this.infoId,
                partId:this.partCardId,
                name:this.guaranteeContract2.name,
                guarantor:this.guaranteeContract2.people,
                method:this.guaranteeContract2.methods,
                guarantorDate:!this.guaranteeContract2.timeRange[0] ? '' : this.guaranteeContract2.timeRange[0].getFullYear()+'-'+(this.guaranteeContract2.timeRange[0].getMonth()+1)+'-'+this.guaranteeContract2.timeRange[0].getDate()+'至'+this.guaranteeContract2.timeRange[1].getFullYear()+'-'+(this.guaranteeContract2.timeRange[1].getMonth()+1)+'-'+this.guaranteeContract2.timeRange[1].getDate(),
                signTime:this.guaranteeContract2.time == '' ? this.guaranteeContract2.time : typeof(this.guaranteeContract2.time) == 'number' ? this.time(this.guaranteeContract2.time) : this.guaranteeContract2.time.getFullYear()+'-'+(this.guaranteeContract2.time.getMonth()+1)+'-'+this.guaranteeContract2.time.getDate(),
                scope:this.guaranteeContract2.range,
                cdInfoId:this.cardId,
            }
            editInfo(obj).then(res => {
                if(res.data.state == 100){
                    this.$Message.success(res.data.message);
                    this.modal2 = false;
                    this.isAdd = false;
                    getContractInfo(this.lawCaseId,this.partCardId,'gc',this.cardId).then(res => {
                        if(res.data.state == 100){
                            this.guarantee2 = res.data.nameList;
                        }
                    })
                }else if(res.data.state == 101){
                    this.isAdd = false;
                    this.$Message.error(res.data.message);
                }else{
                    this.isAdd = false;
                    this.$Message.error('未知错误！');
                }
            })
            .catch(err => {
                this.isAdd = false;
                this.$Message.error('网络错误！请刷新重试！');
            })
        },
    },
    mounted () {
        getEdit(this.lawCaseId).then(res => {
            if(res.data.state == 100){
                this.isChecked = !res.data.flag;
            }
        })
        console.log(this.isChecked);
        if(this.element == 1){
            getPart(this.lawCaseId).then(res => {
                this.creditContract = [];
                this.loanContract = [];
                this.guaranteeContract = [];
                this.mortgageContract = [];
                this.pledgeContract = [];
                this.partId = res.data.loan.id;
                res.data.loan.creditContractInformationSet == '' ? [] : res.data.loan.creditContractInformationSet.map(item => {
                    return item.enable == true ? this.creditContract.push(item) : false;
                });
                res.data.loan.loanContractInformations == '' ? [] : res.data.loan.loanContractInformations.map(item => {
                    return item.enable == true ? this.loanContract.push(item) : false;
                });
                res.data.loan.guaranteeContractInformations == '' ? [] : res.data.loan.guaranteeContractInformations.map(item => {
                    return item.enable == true ? this.guaranteeContract.push(item) : false;
                });
                res.data.loan.mortgageContractInformations == '' ? [] : res.data.loan.mortgageContractInformations.map(item => {
                    return item.enable == true ? this.mortgageContract.push(item) : false;
                });
                res.data.loan.pledgeContractInformations == '' ? [] : res.data.loan.pledgeContractInformations.map(item => {
                    return item.enable == true ? this.pledgeContract.push(item) : false;
                });
                this.litigation.loan = res.data.loan.loan == null ? '' : this.time(res.data.loan.loan);
                this.litigation.maturity = res.data.loan.payment == null ? '' : this.time(res.data.loan.payment);
                this.litigation.overdue = res.data.loan.overdueRepayment == null ? '' : this.time(res.data.loan.overdueRepayment);
                this.litigation.cutoff = res.data.loan.latestDeadLineForArrears == null ? '' : this.time(res.data.loan.latestDeadLineForArrears);
                this.litigation.arrears = res.data.loan.principalArrears;
                this.litigation.interest = res.data.loan.interest;
                this.litigation.penaltyInterest = res.data.loan.penaltyInterest;
                this.litigation.compoundInterest = res.data.loan.compoundInterest;
                this.litigation.nInterest = res.data.loan.nowInterest;
                this.litigation.npInterest = res.data.loan.nowPenaltyInterest;
                this.litigation.ncdInterest = res.data.loan.nowCompoundInterest;
                this.litigation.newArrears = res.data.loan.nowInterestOnArrears;
                this.litigation.liquidatedDamages = res.data.loan.liquidatedDamages;
                this.litigation.claim = res.data.loan.debtExpense;
                this.litigation.lawyerFee = res.data.loan.lawyerFees;
                this.litigation.securityFee = res.data.loan.preservationFee;
                this.litigation.announcementFee = res.data.loan.announcementFee;
                this.litigation.otherFee = res.data.loan.anotherDebtExpense;
                this.litigation.isPublic = res.data.loan.jointDebts == true ? 'yes' : 'no';
                this.litigation.marryTime = res.data.loan.marriage == null ? '' : this.time(res.data.loan.marriage);
                this.litigation.divorceTime = res.data.loan.divorce == null ? '' : this.time(res.data.loan.divorce);
                this.litigation.legalProvisions = res.data.loan.legalProvisions;
                this.litigation.regulations = res.data.loan.lawAndRegulations;
                this.litigation.caseNumber = res.data.loan.preservationCaseNo;
                this.litigation.preservationMan = res.data.loan.preservationRespondent;
                this.litigation.preservationTime = res.data.loan.applyForPreservation == null ? '' : this.time(res.data.loan.applyForPreservation);
                this.litigation.preservationMoney = res.data.loan.preservationAmount;
                this.litigation.preservationFee = res.data.loan.preservationAmountFee;
                this.litigation.rulingTime = res.data.loan.preservationTime == null ? '' : this.time(res.data.loan.preservationTime);
                this.litigation.releasePreservation = res.data.loan.firePreservationTime == null ? '' : this.time(res.data.loan.firePreservationTime);
                this.litigation.preservationStatus = res.data.loan.preservationSituation;
            })
        }else{
            getPart(this.lawCaseId).then(res => {
                this.partCardId = res.data.creditCard.id;
                this.creditInfo = [];
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
    }
};
</script>