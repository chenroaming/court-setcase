<style>
.stepse{
    width: 270px;
    border-right: 1px solid #f1f1f1;
    height: 100%;
    text-align: center;
    display: inline-block;
    /* padding-top:35px; */
}
.step{
    width: 80%;
    border: 1px solid #ccc;
    height: 65px;
    margin-left: 10%;
    border-radius: 10px;
    cursor: pointer;
}
.step span{
    color:black;
    line-height: 65px;
    font-size: 14px;
}
.active{
    border: 2px solid #007FD5;
}
.content_main1{
    display: inline-block;
    width: 750px;
    float: right;
    text-align: center;
    min-height: 200px;
    height:100%;
}
.stepse .ivu-icon {
    /* font-size: 40px; */
}
.blackback{
    background-color: black;
    opacity: 0.6;
    position: fixed;
    top:0;
    left: 0;
    width:100%;
    height: 100%;
    z-index: 999;
}
.midleImg{
    width:250px;
    height: 300px;
    position: fixed;
    top:50%;
    left:50%;
    margin-top:-150px;
    margin-left:-125px;
    background: #fff;
    z-index: 1000;
    opacity: 1;
}
.clos{
    z-index: 1000;
    font-size: 50px;
    position: fixed;
    top: 100px;
    right: 450px;
    color: #fff;
    cursor: pointer;
}
.butbo{
    z-index: 1000;
    opacity: 1;
    position: fixed;
    width: 200px;
    bottom: 20%;
    left: 50%;
    margin-left: -100px;
}
.tipsError{
    z-index: 1000;
    opacity: 1;
    position: fixed;
    width: 400px;
    left: 50%;
    margin-left: -200px;
    
}
.tipsError h3{
    text-indent:1.5em;
    margin-bottom:3px;
    color:white;
}
.tipsError p{
    text-indent:1.5em;
    color:white;    
}
.tipsError .ivu-btn-primary{
    margin-top: 20px;
    left: 50%;
    position: relative;
    margin-left: -22px;   
}

.ivu-form .ivu-form-item-label {
    font-size: 12px;
    /* text-align: left; */
    
}
.showPayBtn{
    display: block
}
.hidePayBtn{
    display: none
}
.loan-Box{
    width: 90%;
    margin: 0 auto;
}
</style>

<template>
    <div style="padding:10px;padding-top:20px;padding-bottom:10px;height:100%">
        <div class="blackback" v-show="imgshow1">
            <div v-show="OCRLoading" style="position:absolute;top:0;bottom:0;left:0;right:0;">
              <ClipLoader style="position:absolute;top:50%;left:50%;margin-top:-30px;margin-l eft:-30px;" color="#40a9ff" size="80px"/>
              <div style="position:absolute;bottom: 200px;left:50%;margin-left:-60px;color:#3399ff;font-size:20px">获取支付信息中。。。</div>
            </div>
            <span class="clos" @click="cloaseImg"><Icon type="ios-close" /></span>
            
        </div>
        <div class="midleImg" v-show="imgshow2">
            <p  style="text-align:center;line-height:50px;font-size: 18px;color:#fff;background: #09BB07">微信扫码支付</p>
            <img :src="imgpath" alt="" style="height:250px;width:250px">
        </div>
        <div class="tipsError" v-show="queShow">
            <h3>无法进行支付？</h3>
            <p>当您点击确认支付后，请不要关闭新打开的页面，否则支付将无法完成。</p>
            <h3 style="margin-top:10px">为什么交易付款不成功？</h3>
            <p>可能是由以下原因造成的：</p>
            <p>1）由于银行返回的通知信息比较晚，超过了此次交易的超时时间，交易已关闭，不过请放心，我们会在收到银行的通知后，会更新该案件的支付状态。
           <p> 2）重复付款导致（交易状态已经是已付款状态），可能对同一笔交易重复付款，不过请放心，重复付款的金额会返回您的微信帐户中。</p>
           <Button type="primary" @click="backBt" style="">返回</Button>
        </div>
        <div class="butbo" v-show="imgshow2">
            <Button type="warning" @click="showError"  style="color:#999">遇到问题</Button>
            <Button type="success" @click="cloaseImg" style="float:right;color:#09BB07">支付成功</Button>
        </div>
        
        <div class="stepse">
            <p slot="title" style="display:inline-block;font-size: 20px;">
                <!-- <Icon type="wrench"></Icon> -->
                <Icon type="ios-search" />
                案件搜索
            </p>
            <div style="margin-bottom: 16px;width: 250px;margin-top:20px">
                <Form :label-width="85" label-position="left">
                    <FormItem label="回执编号：" >
                        <Input v-model="code" @on-enter="searchList" icon="" placeholder="请输入回执编号" style="width: 175px"></Input>
                    </FormItem>
                    <FormItem label="当事人：" >
                        <Input v-model="codeDenfent" @on-enter="searchList" icon="" placeholder="请输入被告关键字" style="width: 175px"></Input>
                    </FormItem>
                    <FormItem label="案由：">
                        <Input v-model="brief" clearable style="width:175px" placeholder="请输入案由"></Input>
                    </FormItem>
                    <FormItem label="申请时间：">
                        <DatePicker v-model="applyDate" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择日期" style="width: 175px"></DatePicker>
                    </FormItem>
                    <FormItem label="状态：" >
                        <Select v-model="stateData" style="width:175px">
                            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="类别：">
                        <Select v-model="typeData" style="width:175px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    
                    <Button @click="searchList" :loading="loading1"  type="primary" style="width:220px;margin-left:20px">查询</Button>
                </Form>
            
            </div>
        </div>
        <div class="content_main1" style="width:750px">
            <div style="overflow-y:auto;max-height:92%;">
            <Table ref="selection" width="" :loading="listLoading"  :columns="connectedCol"  :data="connectedData"  style="margin-top: 10px;"></Table>
            </div>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="totalPage" height='410' :page-size="1" :current="pageNumber" @on-change="changePage"></Page>
                </div>
            </div>
            
        </div>
        <!-- <a href="#" style="float:left;line-height: 40px;padding-left: 30px;position: relative;bottom: 35px;left:270px" @click="backHome">返回主页</a> -->
        <Modal
            v-model="suggessMol"
            :loading="loading"
            width="560px"
            title="审核意见">
            <div>
                <p><span style="display:inline-block;width:100px;text-align:right">审查意见：</span>{{Status}}</p>
                <p><span style="display:inline-block;width:100px;text-align:right">备注：</span>{{remark}}</p>
            </div>
            <div slot="footer">
                <Button @click="closeGF"  type="dashed" size="large">关闭</Button>
                <Button @click="gotoContinue"  type="primary" size="large" v-if="isSpecialUser">重新编辑</Button>
            </div>
        </Modal>
        <Modal
            v-model="applyShow"
            :loading="loading"
            width="560px"
            title="撤诉申请">
            <div>
                    <div style="margin-top:10px"  >
                        <span style="display:inline-block;width:100px;text-align:right">撤诉理由：</span>
                        <Input style="margin-left: 30px;width:80%;margin-top:15px;"  v-model="applyContent" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="撤诉理由"></Input>
                    </div>
                    <div style="margin-top:10px;margin-left: 30px;width:90%"  v-show="isShowUpload" >
                        <div style="height:50px">
                            <Upload action="/api/online/lawCase/uploadWithdrawal.jhtml" style="float:left" :show-upload-list='false' :on-success="uploadSuccess"  >
                                <Button icon="ios-cloud-upload-outline">上传撤诉申请书</Button>
                            </Upload>
                            <!-- <Button @click="downApply" style="float:right" type="primary" size="large">撤诉申请书下载</Button> -->
                        </div>
                        
                        <div style="display:block;text-align:left;padding-right:5px;" v-show="isShowUpload">
                            <p style="margin-top:5px" v-for="(item,index) in fileNlist" v-bind:key="index">{{item.name}}</p>
                        </div>
                    </div>
            </div>
            <div slot="footer">
                <Button @click="applyShow = false"  type="dashed" size="large">关闭</Button>
                <Button @click="subApply"  type="primary" size="large">提交</Button>
            </div>
        </Modal>
        <Modal
            v-model="applyShow2"
            :loading="loading"
            width="560px"
            title="查看撤诉申请">
            <div>
                <Form  :label-width="130" inline>
                    <FormItem label="撤诉状态：" style="width: 505px;">
                        <span>{{chesuType}}</span>
                    </FormItem>
                    <FormItem label="处理意见：" v-show="chesuType == '审核不通过'" style="width: 505px;">
                        <span>{{handleSuggess}}</span>
                    </FormItem> 
                    <FormItem label="撤诉裁定书：" v-show="chesuType == '审核通过'" style="width: 505px;">
                        <a href="javascript:;" @click="downChesuy">撤诉裁定书下载</a>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="applyShow2 = false"  type="dashed" size="large">关闭</Button>
            </div>
        </Modal>
        <Modal
            v-model="infoMol"
            cancel-text=""
            :loading="loading"
            ok-text="确定"
            @on-ok="submint"
            width="700px"
            :mask-closable="closeM"
            title="案件信息">
            <div v-if="infoMol">
                <Tabs  @on-click="changeTab" >
                     <TabPane label="案件信息">
                         <div v-show="caInfo">
                         <Row  style="margin-bottom:20px;margin-top:35px">
                            <Col span="6" style=" padding-right: 5px;text-align: right;">
                                案件类别：
                            </Col>
                            <Col span="6" style=" padding-right: 5px">
                                {{caseType == '' ? "无" : caseType}}
                            </Col>
                            <Col span="4" style=" padding-right: 5px">
                                标的金额：
                            </Col>
                            <Col span="6" style=" padding-right: 5px">
                                {{standardMoney == '' ? 0 : standardMoney}}元
                            </Col>
                        </Row>
                        <Row  style="margin-bottom:20px;margin-top:15px">
                            <Col span="6" style=" padding-right: 5px;text-align: right;">
                                案件案由：
                            </Col>
                            <Col span="18" style=" padding-right: 5px">
                                {{briefName == '' ? "无" : briefName}}
                            </Col>
                        </Row>
                        <Row  style="margin-bottom:5px">
                            <Col span="6" style=" padding-right: 5px;text-align: right;">
                                诉讼请求：
                            </Col>
                            <Col span="16" style=" padding-right: 5px">
                                {{factContent == '' ? "无" : factContent}}
                            </Col>
                        </Row>
                        <Row  style="margin-bottom:5px">
                            <Col span="6" style=" padding-right: 5px;text-align: right;">
                                事实和理由：
                            </Col>
                            <Col span="16" style=" padding-right: 5px">
                                {{reasonContent == '' ? "无" : reasonContent}}
                            </Col>
                        </Row>
                        </div>
                    </TabPane>
                    <TabPane label="当事人信息" >
                        <div>
                            <div v-for="item in liniList">
                                <div class="info matr">
                                    <div class="bmbox" @click="getOneLini(item.id)"><span class="title" >查看详情</span></div>
                                    <p>名称：<span>{{item.name}}</span>（{{item.typeStatus}}）</p>
                                    <p>证件号：<span>{{item.card}}</span></p>
                                    <p>手机号码：<span>{{item.phone}}</span></p>
                                    <p>地址：<span>{{item.adress}}</span></p>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane  label="代理人信息"  >
                        <h5 style="text-align: center;" v-if="lawyerList.length == 0">暂无代理人信息</h5>
                        <div v-for="item in lawyerList">
                            <div class="info matr">
                                <div class="bmbox"  @click="getLaw(item.id)"><span class="title">查看详情</span></div>
                                <p>名称：{{item.name}}</p>
                                <p>证件号：{{item.card}}</p>
                                <p>手机号码：{{item.phone}}</p>
                                <p>地址：{{item.adress}}</p>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="附件信息"  >
                         <div style="margin-top:40px" v-show="fileInfo">
                             <Row  style="margin-bottom:5px">
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:15px">
                                    起诉状：
                                </Col>
                                <Col span="18" style=" padding-right: 5px;margin-bottom:15px">
                                    <span v-if="qFileName.name == ''">无</span>
                                    <a v-else  @click="showEvdence(qFileName.path)" download="">{{ qFileName.name }}</a>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;">
                                    身份证明材料：
                                </Col>
                                <Col span="6" style=" padding-right: 5px">
                                    <span v-if="fileName1.name == ''">无</span>
                                    <a v-else  @click="showEvdence(fileName1.path)" download="">{{ fileName1.name }}</a>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;">
                                    授权委托材料：
                                </Col>
                                <Col span="6" style=" padding-right: 5px">
                                    <span v-if="fileName2.name == ''">无</span>
                                    <a v-else  @click="showEvdence(fileName2.path)" download="">{{ fileName2.name }}</a>
                                </Col>
                            </Row>
                            <Row  style="margin-bottom:5px;margin-bottom:10px">
                                <p class="sdws">
                                    申请书：
                                </p>
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    财产保全申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen1 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen1)" download="">{{ fileNameShen1 }}</a>
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    调查取证申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen2 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen2)" download="">{{ fileNameShen2 }}</a>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    证据保全申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen3 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen3)" download="">{{ fileNameShen3 }}</a>
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    证人出庭申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen4 == ''">无</span>
                                    <a v-else   @click="showEvdence(onlineEAIdShen4)" download="">{{ fileNameShen4 }}</a>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    现场勘验申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen5 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen5)" download="">{{ fileNameShen5 }}</a>
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    鉴定评估申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen6 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen6)" download="">{{ fileNameShen6 }}</a>
                                </Col>
                            </Row>
                            <div>
                                <p class="sdws">
                                    证据材料：
                                </p>
                                <Table :columns="columnsEvi" :data="EviList" ></Table>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="要素信息" v-if="element != 0">
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
                            <Form label-position="left">
                                <FormItem label="放款日期:">
                                    {{litigation.loan}}
                                    
                                </FormItem>
                                <FormItem label="实际到期日期:">
                                        {{litigation.maturity}}

                                </FormItem>
                                <FormItem label="逾期还款日期:">
                                    {{litigation.overdue}}
                                    
                                </FormItem>
                                <FormItem label="欠款最新截至时间:">
                                        {{litigation.cutoff}}
                                    
                                </FormItem>
                                <FormItem label="欠款本金:">
                                       {{litigation.arrears}}
                                </FormItem>
                                <FormItem label="利息:">
                                    {{litigation.interest}}
                                </FormItem>
                                <FormItem label="罚息:">
                                    {{litigation.penaltyInterest}}
                                    
                                </FormItem>
                                <FormItem label="复利:">
                                    {{litigation.compoundInterest}}
                                </FormItem>
                                <FormItem label="最新欠款利息:">
                                        {{litigation.nInterest}}
                                   
                                </FormItem>
                                <FormItem label="最新欠款罚息:">
                                    {{litigation.npInterest}}
                                   
                                </FormItem>
                                <FormItem label="最新欠款复利:">
                                    {{litigation.ncdInterest}}
                                    
                                </FormItem>
                                <FormItem label="最新欠款利息等:">
                                    {{litigation.newArrears}}
                                </FormItem>
                                <FormItem label="违约金金额:">
                                    {{litigation.liquidatedDamages}}
                                   
                                </FormItem>
                                <FormItem label="实现债权的费用:">
                                    {{litigation.claim}}
                    
                                </FormItem>
                                <FormItem label="律师费:">
                                    {{litigation.lawyerFee}}
              
                                </FormItem>
                                <FormItem label="保全费:">
                                    {{litigation.securityFee}}
                                    
                                </FormItem>
                                <FormItem label="公告费:">
                                    {{litigation.announcementFee}}
                                    
                                </FormItem>
                                <FormItem label="债权其他费用:">
                                    {{litigation.otherFee}}
                                    
                                </FormItem>
                                <FormItem label="是否支持夫妻共同债:">
                                    <RadioGroup v-model="litigation.isPublic">
                                        <Radio disabled label="yes">
                                            <span>是</span>
                                        </Radio>
                                        <Radio disabled label="no">
                                            <span>否</span>
                                        </Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label="结婚登记时间:">
                                    {{litigation.marryTime}}
                                    
                                </FormItem>
                                <FormItem label="离婚登记时间:">
                                    {{litigation.divorceTime}}
                                    
                                </FormItem>
                                <FormItem label="适用的法律条文:">
                                    {{litigation.legalProvisions}}
                                    
                                </FormItem>
                                <FormItem label="法律法规:">
                                    {{litigation.regulations}}
                                    
                                </FormItem>
                                <FormItem label="诉前保全裁定案号:">
                                    {{litigation.caseNumber}}
                                  
                                </FormItem>
                                <FormItem label="保全被申请人:">
                                    {{litigation.preservationMan}}
                                    
                                </FormItem>
                                <FormItem label="申请保全时间:">
                                        {{litigation.preservationTime}}
                                    
                                </FormItem>
                                <FormItem label="财产保全金额:">
                                    {{litigation.preservationMoney}}
                                    
                                </FormItem>
                                <FormItem label="财产保全费:">
                                       {{ litigation.preservationFee}}
                                    
                                </FormItem>
                                <FormItem label="作出保全裁定时间:">
                                    {{litigation.rulingTime}}
                                   
                                </FormItem>
                                <FormItem label="解除保全申请时间:">
                                    {{litigation.releasePreservation}}
                                    
                                </FormItem>
                                <FormItem label="保全财产情况:">
                                    {{litigation.preservationStatus}}
                                   
                                </FormItem>
                            </Form>
                        </div>
                        <div v-if="element == 2" class="loan-Box">
                            <Form label-position="left" :label-width="170">
                                <FormItem label="合同名称：" prop="name">
                                        {{contract.name}}
                                </FormItem>
                                <FormItem label="合同签订时间：">
                                    {{contract.time}}
                                </FormItem>
                                <FormItem label="信用卡信息：">
                                    <Menu @on-select="creditChoice" style="width: 300px;">
                                        <Submenu name="1">
                                            <template slot="title">
                                                点击展开信用卡信息
                                            </template>
                                            <MenuItem :name="item.id" v-for="(item,index) in creditInfo">{{item.contractName}}</MenuItem>
                                        </Submenu>
                                    </Menu>
                                </FormItem>
                                <FormItem label="是否支持夫妻共同债：">
                                    <RadioGroup v-model="couple.isPublic">
                                        <Radio disabled label="yes">
                                            <span>是</span>
                                        </Radio>
                                        <Radio disabled label="no">
                                            <span>否</span>
                                        </Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label="结婚登记时间：">
                                        {{couple.marry}}
                                    
                                </FormItem>
                                <FormItem label="离婚登记时间：">
                                    {{couple.divorce}}
                                   
                                </FormItem>
                                <FormItem label="请求支付的事实与理由：">
                                    {{pay.reason}}
                                   
                                </FormItem>
                                <FormItem label="申请支付金额（元）：">
                                    {{pay.money}}
                                   
                                </FormItem>
                                <FormItem label="有价证券：">
                                    {{pay.securities}}
                                   
                                </FormItem>
                                <FormItem label="支付令申请费（元）：">
                                    {{pay.applicationFee}}
                                   
                                </FormItem>
                                <FormItem label="申请支付令时：">
                                    {{pay.applyTime}}
                                   
                                </FormItem>
                                <FormItem label="作出支付令时间：">
                                    {{pay.completeTime}}
                                   
                                </FormItem>
                                <FormItem label="终结督促程序申请费（元）：">
                                    {{endProcess.fee}}
                                   
                                </FormItem>
                                <FormItem label="终结督促程序裁定作出时间：">
                                    {{endProcess.time}}
                                   
                                </FormItem>
                                <FormItem label="终结督促程序的原因：">
                                    {{endProcess.reason}}
                                    
                                </FormItem>
                            </Form>
                        </div>
                    </TabPane>
                    <!-- <TabPane label="审查意见">
                        <div style="padding:10px;padding-left:20px" v-show="isEdit">
                            <span style="display:inline-block;width:100px;text-align:right">审查意见：</span>   
                            <RadioGroup v-model="auditStatus" @on-change="changestatus">
                                <Radio style="margin-right:20px" label="同意立案"></Radio>
                                <Radio style="margin-right:20px" label="不予受理"></Radio>
                                <Radio v label="退回"></Radio>
                                <Radio style="margin-right:20px" label="补正"></Radio>
                                <Radio label="调解"></Radio>
                            </RadioGroup>
                            <div style="margin-top:30px;" v-show="agreeDiv">
                                <Form  :label-width="100" inline>
                                    <FormItem label="案件编号:" style="width: 245px;" >
                                        <Input v-model="caseNo" placeholder="请输入案件编号"></Input>
                                    </FormItem>
                                    <FormItem label="案由名称:" style="width: 245px;" >
                                        <AutoComplete
                                            v-model="briefId"
                                            placeholder="请选择"
                                            style="width:230px" >
                                            
                                            <Option v-for="item in bridfList" :value="item.name" :key="item.name"></Option>
                                        </AutoComplete>
                                    </FormItem>
                                    <FormItem label="承办部门:" style="width: 245px;" >
                                        <Select v-model="courtId" filterable transfer placeholder="请选择">
                                            <Option v-for="item in courtList" v-bind:value="item.id">{{item.name}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="承办法官:" style="width: 245px;" >
                                        <Select v-model="judgeId" filterable transfer placeholder="请选择">
                                            <Option v-for="item in judgeList" v-bind:value="item.id">{{item.name}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="书记员:" style="width: 245px;" >
                                        <Select v-model="clerkId" filterable transfer placeholder="请选择">
                                            <Option v-for="item in clerkList" v-bind:value="item.id">{{item.name}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="立案日期:" style="width: 245px;">
                                        <DatePicker type="date" transfer :value="filingDateStr" @on-change="changeDate2"></DatePicker>
                                    </FormItem>
                                    <FormItem label="当事人|事由:" style="width: 505px;" >
                                        <Input v-model="litigantContent" placeholder="请输入当事人|事由"></Input>
                                    </FormItem>
                                    <FormItem label="诉讼费:" style="width: 305px;" >
                                        <input type="text" name="je"   @input="clearNoNum" />元 
                                    </FormItem>
                                </Form>
                            </div>
                            <Form  :label-width="100" style="margin-top: 20px;" inline v-show="auditStatus == '调解'">
                                <FormItem label="引调号:" style="width: 500px;" >
                                    <Input v-model="mediateNo" placeholder="请输入引调号"></Input>
                                </FormItem>
                                <FormItem label="案由名称:" style="width: 245px;" >
                                    <AutoComplete
                                            v-model="briefId"
                                            placeholder="请选择"
                                            style="width:230px" >
                                            
                                            <Option v-for="item in bridfList" :value="item.name" :key="item.name"></Option>
                                        </AutoComplete>
                                </FormItem>`
                            </Form>
                            <div style="margin-top:10px">
                                <span style="display:inline-block;width:100px;text-align:right">备注：</span>
                                <Input style="margin-left: 30px;width:80%"  v-model="remark" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="备注"></Input>
                            </div>
                        </div>
                        <div style="padding:10px;padding-left:20px" v-show="!isEdit">
                            <span style="display:inline-block;width:100px;text-align:right">审查意见：</span>   
                            <span>{{auditStatusOld}}</span>
                            <div style="margin-top:10px">
                                <span style="display:inline-block;width:100px;text-align:right">备注：</span>
                                <span>{{remarkOld}}</span>
                            </div>
                        </div>
                    </TabPane> -->
                </Tabs>
            </div>
            <div slot="footer">
                <Button @click="closeInfo"  type="dashed" size="large">关闭</Button>
                <!-- <Button @click="submintCa"  size="large" type="primary" v-show="submbutton">提交</Button> -->
            </div>
        </Modal>
        <Modal
            v-model="modal5"
            title="查看信用卡信息"
            footer-hide
            width="700px"
            >
            <Form label-position="right" :label-width="315">
                <FormItem label="信用卡卡号" prop="num">
                    {{creditCard.num}}
                    
                </FormItem>
                <FormItem label="信用卡合约名称" prop="name">
                    {{creditCard.name}}
                    
                </FormItem>
                <FormItem label="利息约定" prop="interestAgreement">
                    {{creditCard.interestAgreement}}
                    
                </FormItem>
                <FormItem label="信用卡欠款最新截至时间" prop="deadline">
                    {{creditCard.deadline}}
                </FormItem>
                <FormItem label="信用卡最新欠款本金（元）" prop="principal">
                    {{creditCard.principal}}
                    
                </FormItem>
                <FormItem label="信用卡最新欠款利息（元）" prop="interest">
                    {{creditCard.interest}}
                    
                </FormItem>
                <FormItem label="信用卡最新欠款滞纳金（违约金）（元）" prop="latePayment">
                    {{creditCard.latePayment}}
                    
                </FormItem>
                <FormItem label="信用卡年费（元）" prop="annualFee">
                    {{creditCard.annualFee}}
                    
                </FormItem>
                <FormItem label="信用卡分期手续费（元）" prop="handlingFee">
                    {{creditCard.handlingFee}}
                    
                </FormItem>
                <FormItem label="其他费用项目及金额（元）" prop="otherFee">
                    {{creditCard.otherFee}}
                    
                </FormItem>
                <FormItem label="违约金约定" prop="defaultAgreement">
                    {{creditCard.defaultAgreement}}
                    
                </FormItem>
                <FormItem label="实现债权费用的约定" prop="feeAgreement">
                    {{creditCard.feeAgreement}}
                    
                </FormItem>
                <FormItem label="律师费（元）" prop="lawyerFee">
                    {{creditCard.lawyerFee}}
                    
                </FormItem>
                <FormItem label="保全费（元）" prop="securityFee">
                    {{creditCard.securityFee}}
                    
                </FormItem>
                <FormItem label="公告费（元）" prop="announcementFee">
                    {{creditCard.announcementFee}}
                    
                </FormItem>
                <FormItem label="信用卡取现手续费（元）" prop="cashFee">
                    {{creditCard.cashFee}}
                    
                </FormItem>
                <FormItem label="其他项目费用（年费、取现手续费、分期手续费）的约定" prop="otherProjectFee">
                    {{creditCard.otherProjectFee}}
                    
                </FormItem>
                <FormItem label="最新截止时间后利息计算标准" prop="endStandard">
                    {{creditCard.endStandard}}
                    
                </FormItem>
                <FormItem label="最新截止时间后违约金（滞纳金）计算标准" prop="endFeeStandard">
                    {{creditCard.endFeeStandard}}
                    
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
        </Modal>
        <Modal v-model="modal2"
            title="保证合同信息"
            footer-hide
            width="700px"
        >
            <Form label-position="right" :label-width="155">
                <FormItem label="保证合同名称:" prop="name">
                    {{guaranteeContract2.name}}
                </FormItem>
                <FormItem label="合同签订时间:" prop="time">
                    {{guaranteeContract2.time}}
                </FormItem>
                <FormItem label="保证人:" prop="people">
                    {{guaranteeContract2.people}}
                </FormItem>
                <FormItem label="保证期间:" prop="timeRange">
                    {{guaranteeContract2.timeRange}}
                </FormItem>
                <FormItem label="保证方式:" prop="methods">
                    {{guaranteeContract2.methods}}
                </FormItem>
                <FormItem label="保证范围:" prop="range">
                    {{guaranteeContract2.range}}
                </FormItem>
            </Form>
        </Modal>
        <Modal
            v-model="modal1"
            :title=titleArr[titleIndex]
            footer-hide
            width="700px"
            >
            <Form label-position="left" :label-width="180" v-show="titleIndex == 0">
                <FormItem label="授信合同名称：" prop="name">
                    {{credit.name}}
                </FormItem>
                <FormItem label="是否诉请解除该授信合同：" prop="isRelease">
                    <RadioGroup v-model="credit.isRelease">
                        <Radio disabled label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio disabled label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="授信人：" prop="creditPeople">
                        {{credit.creditPeople}}
                </FormItem>
                <FormItem label="授信合同签订时间：" prop="creditTime">
                        {{credit.creditTime}}
                    
                </FormItem>
                <FormItem label="授信合同期间：" prop="creditRange">
                    {{credit.creditRange}}
                    
                </FormItem>
                <FormItem label="授信金额：" prop="creditMoney">
                    {{credit.creditMoney}}
                </FormItem>
            </Form>
            <Form label-position="left" :label-width="180" v-show="titleIndex == 1">
                <FormItem label="借款合同名称：" prop="name">
                    {{loan.name}}
                </FormItem>
                <FormItem label="借款人：" prop="creditPeople">
                    {{loan.creditPeople}}
                </FormItem>
                <FormItem label="是否诉请解除该借款合同：" prop="isRelease">
                    <RadioGroup v-model="loan.isRelease">
                        <Radio disabled label="yes">
                            <span>是</span>
                        </Radio>
                        <Radio disabled label="no">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="签订借款合同时间：" prop="time">
                    {{loan.time}}
                </FormItem>
                <FormItem label="借款本金：" prop="money">
                    {{loan.money}}
                   
                </FormItem>
                <FormItem label="借款期限：" prop="range">
                    {{loan.range}}
                    
                </FormItem>
                <FormItem label="还款方式：" prop="methods">
                    {{loan.methods}}
                    
                </FormItem>
                <FormItem label="借款利率：" prop="loanRate">
                    {{loan.loanRate}}
                    
                </FormItem>
                <FormItem label="罚息利率：" prop="penaltyInterest">
                    {{loan.penaltyRate}}
                    
                </FormItem>
                <FormItem label="复利利率：" prop="compoundRate">
                    {{loan.compoundRate}}
                    
                </FormItem>
                <FormItem label="罚息/复利约定：" prop="rateAgreement">
                    {{loan.rateAgreement}}
                    
                </FormItem>
                <FormItem label="解除合同或提前收贷约定：" prop="releaseAgreement">
                    {{loan.releaseAgreement}}
                    
                </FormItem>
                <FormItem label="违约金约定：" prop="defaultAgreement">
                    {{loan.defaultAgreement}}
                    
                </FormItem>
                <FormItem label="实现债券费用的约定：" prop="feeAgreement">
                    {{loan.feeAgreement}}
                    
                </FormItem>
                <FormItem label="送达约定：" prop="sendAgreement">
                    {{loan.sendAgreement}}
                    
                </FormItem>
            </Form>
            <Form label-position="left" :label-width="180" v-show="titleIndex == 2">
                <FormItem label="保证合同名称：" prop="name">
                        {{guarantee.name}}
                    
                </FormItem>
                <FormItem label="保证人：" prop="guaranteePeople">
                    {{guarantee.guaranteePeople}}
                    
                </FormItem>
                <FormItem label="保证方式：" prop="methods">
                    {{guarantee.methods}}
                    
                </FormItem>
                <FormItem label="保证期间：" prop="timeRange">
                    {{guarantee.timeRange}}
                    
                </FormItem>
                <FormItem label="保证合同签订时间：" prop="time">
                    {{guarantee.time}}
                    
                </FormItem>
                <FormItem label="保证范围：" prop="guaranteeRange">
                    {{guarantee.guaranteeRange}}
                    
                </FormItem>
            </Form>
            <Form label-position="left" :label-width="180" v-show="titleIndex == 3">
                <FormItem label="抵押合同名称：" prop="name">
                    {{mortgage.name}}
                   
                </FormItem>
                <FormItem label="抵押合同签订时间：" prop="time">
                    {{mortgage.time}}
                    
                </FormItem>
                <FormItem label="抵押物权属：" prop="ownership">
                    {{mortgage.ownership}}
                    
                </FormItem>
                <FormItem label="抵押物名称：" prop="articleName">
                    {{mortgage.articleName}}
                    
                </FormItem>
                <FormItem label="抵押担保范围：" prop="range">
                    {{mortgage.range}}
                    
                </FormItem>
                <FormItem label="办理抵押登记时间：" prop="handletime">
                    {{mortgage.handletime}}
                    
                </FormItem>
            </Form>
            <Form label-position="left" :label-width="180" v-show="titleIndex == 4">
                <FormItem label="质押合同名称：" prop="name">
                    {{pledge.name}}
                   
                </FormItem>
                <FormItem label="质押合同签订时间：" prop="time">
                    {{pledge.time}}
                    
                </FormItem>
                <FormItem label="质押物权属：" prop="ownership">
                    {{pledge.ownership}}
                    
                </FormItem>
                <FormItem label="质押物名称：" prop="articleName">
                    {{pledge.articleName}}
                   
                </FormItem>
                <FormItem label="质押担保范围：" prop="range">
                    {{pledge.range}}
                    
                </FormItem>
                <FormItem label="办理质押登记时间：" prop="handletime">
                    {{pledge.handletime}}
                    
                </FormItem>
            </Form>
        </Modal>
                <!-- 当事人信息 -->
        <Modal
            v-model="completeMol"
            :loading="loading"
            width="560px"
            :mask-closable="closeM"
            title="当事人信息">
            <div>
                <Form :model="addFormItem" :label-width="100" inline>
                    <FormItem :label="addFormItem.litigantType == '自然人'? '姓名:' : '公司名称:'" style="width: 505px;">
                        <span>{{addFormItem.litigantName}}</span>
                    </FormItem>
                    <FormItem label="类型:" style="width: 245px;">
                        <span>{{addFormItem.litigantType}}</span>
                    </FormItem>
                    <FormItem label="诉讼地位:" style="width: 245px;">
                        <span>{{addFormItem.litigantStatus}}</span>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '身份证号码:' : '统一信用代码:'" style="width: 245px;">
                        <span>{{addFormItem.identityCard}}</span>
                    </FormItem>
                    <FormItem label="出生日期:" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.birthday}}</span>
                    </FormItem>
                    <FormItem label="性别:" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.litigantSex}}</span>
                    </FormItem>
                    <FormItem label="国籍:" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.nationality}}</span>
                    </FormItem>
                    <FormItem label="民族:" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.nation}}</span>
                    </FormItem>
                    <!-- <FormItem label="政治面貌:" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.politicalStatus}}</span>
                    </FormItem> -->
                    <FormItem label="文化程度:" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.education}}</span>
                    </FormItem>
                    

                    <FormItem label="当事人关系:" style="width: 245px;display:none">
                        <span>{{addFormItem.relationType}}</span>
                    </FormItem>
                    <FormItem label="当事人:" style="width: 245px;display:none">
                        <span>{{addFormItem.litigantName}}</span>
                    </FormItem>
                    
                    <FormItem label="手机号码:" style="width: 245px;" v-show="addFormItem.litigantType != '法人' && addFormItem.litigantType != '非法人组织'">
                        <span>{{addFormItem.litigantPhone}}</span>
                    </FormItem>
                    <!-- <FormItem label="固定电话:" style="width: 245px;">
                        <span>{{addFormItem.litigantTelPhone}}</span>
                    </FormItem>
                    <FormItem label="成立日期:" style="width: 245px;" v-show="addFormItem.litigantType != '自然人'">
                        <span>{{addFormItem.birthday2}}</span>
                    </FormItem> -->

                    <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '法定代表人:' : '负责人：'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <span>{{addFormItem.legalManName}}</span>
                    </FormItem>
                    <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '职务:' : '职务：'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <span>{{addFormItem.legalManJob}}</span>
                    </FormItem>
                    <!-- <FormItem label="身份证号码：" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <span>{{addFormItem.legalManId}}</span>
                    </FormItem> -->
                    <FormItem label="联系方式：" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <span>{{addFormItem.legalManPhone}}</span>
                    </FormItem>

                    <FormItem label="工作单位：" style="width: 505px;" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.employer}}</span>
                    </FormItem>
                    <FormItem label="电子邮箱：" style="width: 505px" v-show="addFormItem.litigantType == '自然人'">
                        <span>{{addFormItem.email}}</span>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '户籍地址：' : '公司注册地址：'" style="width: 505px">
                        <span>{{addFormItem.nativePlace}}</span>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '经常居住地址：' : '公司经营地址：'" style="width: 505px">
                        <span>{{addFormItem.address}}</span>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '确认送达地址：' : '确认送达地址：'" style="width: 505px">
                        <span>{{addFormItem.sendAddress}}</span>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="closeLiti"  type="dashed" size="large">关闭</Button>
            </div>
        </Modal>
        <!-- 代理人信息 -->
         <Modal
            v-model="lawyerMol"
            :loading="loading"
            width="560px"
            :mask-closable="closeM"
            title="代理人信息">
            <div>
                <Form :model="addFormItem" :label-width="100" inline>
                    <FormItem label="代理人身份:" style="width: 245px;">
                        <span>{{addFormItem.lawerType}}</span>
                    </FormItem>
                    <FormItem label="当事人:" style="width: 245px;">
                        <span>{{addFormItem.name}}</span>
                    </FormItem>
                    <FormItem label="姓名:" style="width: 245px;">
                        <span>{{addFormItem.lawerName}}</span>
                    </FormItem>
                    <FormItem label="电话:" style="width: 245px;">
                        <span>{{addFormItem.lawermobile}}</span>
                    </FormItem>
                     <FormItem label="律所:" v-show="!lawyerT1" style="width: 505px;">
                        <span>{{addFormItem.lawyerOfficeName}}</span>
                    </FormItem>
                    <FormItem label="公民身份证号码:" v-show="lawyerT1" style="width: 505px;">
                        <span>{{addFormItem.lawIdentiCard}}</span>
                    </FormItem>
                    <FormItem label="公民身份证号码:" v-show="!lawyerT1" style="width: 505px;">
                        <span>{{addFormItem.lawIdentiCard2}}</span>
                    </FormItem>
                    <FormItem label="工作证件号码:" v-show="!lawyerT1" style="width: 505px;">
                        <span>{{addFormItem.lawIdentiCard}}</span>
                    </FormItem>
                    <FormItem label="电子邮箱:" style="width: 505px">
                        <span>{{addFormItem.email}}</span>
                    </FormItem>
                    <FormItem label="联系地址:"  style="width: 505px;">
                        <span>{{addFormItem.address}}</span>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="cloaselawyer"  type="dashed" size="large">关闭</Button>
            </div>
        </Modal>
         <!-- 证据文件预览 -->
        <Modal
            v-model="viewEvidence"
            title="查看"
            :mask-closable="false"
            :styles="{top: '20px'}"
            :width="modalWidth">
            <div class="components-container">
              <zh-viewer :viewerId="'1'" :fileUrls="filePathAry"></zh-viewer>
            </div>
            <div slot="footer">
                <Button @click="viewEvidence = false"   type="dashed" size="large">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import { caseList, getPath,downFiles} from '@/api/courtcaselist.js';
import { formatDate } from "@/libs/date";
import { ClipLoader } from 'vue-spinner/dist/vue-spinner.min.js';
import {  
getOnlineLawCaseEdit, 
getLitigantInfo,
getLitigantLawyerList,
getFiles,
otherGetFiles,
getOneLitigant,
getLawyerInfo,
deleteLawyerInfo,
deleteLitigantInfo,
getDiplomsDownloadRecord,
withdrawalApplication,
getWithdrawalInfo,
withdrawalResult
} from '@/api/caseInfo.js';
import {addOrUpdateCtInfo,addOrUpdateLoanCtInfo,addOrUpdateMcInfo,addOrUpdatePcInfo,
        getDelCtInfo,
        updatePLoan
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
import ZhViewer from "@/components/moreFileViewer/moreFileViewer.vue";
export default {
    components: {
        ClipLoader,
        ZhViewer
    },
    data () {
        var width = window.innerWidth - 430;
        return {
            listLoading:false,//表格加载状态
            element:0,
            modal1:false,
            cardId:'',
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


            loading1:false,
            isSpecialUser:true,
            viewEvidence:false,
            filePathAry:[],
            modalWidth:width,
            contentUpload:'',
            filenameUpload:'',
            infoMol:false,
            closeM:false,
            handleSuggess:"",
            caInfo:true,
            caseType:'',
            standardMoney:'',
            briefName:"",
            factContent:'',
            reasonContent:'',
            filePath:"",
            fileInfo:true,
            qFileName:{
                path:"",
                name:"",
            },
            fileName1:{
                path:"",
                name:"",
            },
            fileName2:{
                path:"",
                name:"",
            },
            fileNameShen1:"",
            fileNameShen2:'',
            fileNameShen3:'',
            fileNameShen4:"",
            fileNameShen5:'',
            fileNameShen6:'',
            onlineEAIdShen1:'',
            onlineEAIdShen2:'',
            onlineEAIdShen3:'',
            onlineEAIdShen4:'',
            onlineEAIdShen5:'',
            onlineEAIdShen6:'',
            connectedData:[],
            addFormItem:{},
            lawyerT1:false,
            completeMol:false,
            lawyerMol:false,
            lawyerList:[],
          columnsEvi:[
               {
                title: "证据名称",
                key: "name",
                width: 150,
                align: "center",
              },
              {
                title: "证明对象",
                key: "proves",
                width: 170,
                align: "center",
              },
              {
                title: "证据来源",
                key: "where",
                align: "center",
              },
              {
                title: "附件",
                key: "fileName",
                width: 100,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "p",
                            {
                            props: {
                                type: "p",
                                size: "small"
                            },
                             style:{
                                cursor:"pointer",
                                color:"#2d8cf0"
                            },
                            on: {
                                click: () => {
                                   var fileStr = params.row.filePa;
                                    if(fileStr == null){
                                        this.$Message.info("暂无附件");
                                        return false;
                                    }
                                    this.filePathAry = [];
                                    this.filePathAry.push(fileStr);
                                    this.viewEvidence = true;
                                    return false;
                                    // 创建隐藏的可下载链接
                                    var eleLink = document.createElement("a");
                                    var strs = fileStr.split("/");
                                    for (var i = 0; i < strs.length; i++) {
                                        if (i == strs.length - 1) {
                                        var filename = strs[i];
                                        }
                                    }
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
                            "查看"
                        ),
                    ]);
                }
              },
           ],
           EviList : [],
            liniList:[],
            submbutton:false,

          stateList:[
               {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '审核通过'
                },
                {
                    value: '2',
                    label: '审核未通过'
                },
                {
                    value: '0',
                    label: '审核中'
                },
          ],
          code:"",
            codeDenfent:'',

            brief:"",
          imgpath:"",
          suggessMol:false,
          chesuType:"",
          applyShow:false,
          applyShow2:false,
          isShowUpload:false,
          applyContent:"",
          fileNlist:[],
          OCRLoading:false,
          imgshow1:false,
          imgshow2:false,
          queShow:false,
          totalPage:1,
          pageNumber: 1,
          loading:true,
          Status:'',
          remark:'',
          stateData:'全部',
          typeData:"全部",
          downPath:"",
          applyDate:"",
          startDate: '',
          endDate: '',
          lawCaseId:'',
          lawCaseIdChange:'',

          process:'',
          typeList:[
              {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '民商'
                },
                {
                    value: '2',
                    label: '执行'
                },
          ],
          connectedData:[],
          connectedCol: [
                {
                    title: '回执编号',
                    key: 'code',
                    align: 'center',
                    width: 160,
                    fixed: ''
                },
                {
                    title: '原告',
                    key: 'onlineLitigantsYuan',
                    align: 'center',
                    width: 160,
                    // render: (h, params) => {
                    //         return h('div', [
                    //             h('Icon', {
                    //                 style: {
                    //                     maxHeight: '10px'
                    //                 },
                    //             }),
                    //             h('span', params.row.onlineLitigantsYuan)
                    //         ]);
                    //     }
                },
                {
                    title: '被告',
                    key: 'onlineLitigantsBei',
                    align: 'center',
                    width: 160
                },
                {
                    title: '当前状态',
                    key: 'state',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remark = '';
                                            this.Status = '';
                                            if(params.row.state == "审核不通过"){
                                                this.lawCaseId = params.row.id;
                                                this.process = 3;
                                                this.remark = params.row.remark;
                                                console.log()
                                                if(params.row.status ==1){
                                                    this.Status = '同意立案'
                                                }else if(params.row.status ==2){
                                                    this.Status = '不予受理'
                                                }else if(params.row.status ==3){
                                                    this.Status = '退回'
                                                }else if(params.row.status ==4){
                                                    this.Status = '补正'
                                                }else if(params.row.status ==5){
                                                    this.Status = '调解'
                                                }
                                                this.suggessMol = true;
                                            }
                                        }
                                    }
                                },
                                params.row.state
                            ),
                        ]);
                    }
                },
                {
                    title: '案件类别',
                    key: 'caseType',
                    align: 'center',
                    width: 160
                },
                {
                    title: '案由',
                    key: 'onlineBrief',
                    align: 'center',
                    width: 100
                },
                {
                    title: '标的(元)',
                    key: 'standardMoney',
                    align: 'center',
                    width: 100
                },
                
                {
                    title: '申请时间',
                    key: 'applytime',
                    align: 'center',
                    width: 120
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    fixed: "right",
                    width: 120,
                    render: (h, params) => {
                        return h("div", [
                            
                        h(
                            "Button",
                            {
                                
                            props: {
                                type: "text",
                                size: "small",
                                class:params.row.state == "审核通过" ?  "pay" : "nopay",
                            },
                            style:{
                                padding:'0px 7px',
                                display:params.row.state == "审核通过" ? (params.row.ispay == true ? "none" : "none") : (params.row.state == "审核不通过" ? 'inline-block' : "none"),
                            },
                            on: {
                                click: () => {
                                    
                                    if(params.row.state == "审核不通过"){
                                        this.remark = '';
                                        this.Status = '';
                                        this.lawCaseId = params.row.id;
                                        this.process = 3;
                                        this.remark = params.row.remark;
                                        // if(params.row.status ==1){
                                        //     this.Status = '同意立案'
                                        // }else if(params.row.status ==2){
                                        //     this.Status = '不予受理'
                                        // }else if(params.row.status ==3){
                                        //     this.Status = '退回'
                                        // }else if(params.row.status ==4){
                                        //     this.Status = '补正'
                                        // }else if(params.row.status ==5){
                                        //     this.Status = '调解'
                                        // }
                                        if(params.row.status == null){
                                            this.Status = "审核中"
                                        }else if (params.row.status == 1 && params.row.status == 1){
                                            this.Status = "审核通过"
                                        }else if (params.row.status == 1 && params.row.status == 5){
                                            this.Status = "已转调解"
                                        }else if (params.row.status == 7){
                                            this.Status = "已撤回"
                                        }else if (params.row.status == 8){
                                            this.Status = "撤诉申请"
                                        }else{
                                            this.Status = "审核不通过"
                                        }
                                        this.suggessMol = true;
                                        return false;
                                    }
                                    if(params.row.ispay == true || params.row.state != "审核通过"){
                                        return false;
                                    }
                                    this.OCRLoading=true;  //在线支付暂时隐藏掉。（由于湖里法院未提供实际的支付信息，因此先把支付这块功能隐藏掉）
                                    this.imgshow1=true;
                                    var that = this;
                                    getPath(params.row.id).then(res => {
                                        if(res.data.state == 100){
                                            this.imgpath = res.data.path;
                                            window.setTimeout(function(){
                                                that.OCRLoading = false;
                                                that.imgshow2 = true;
                                                if(that.imgshow1 == false){
                                                    that.imgshow1 = true;
                                                }
                                            },1000)
                                        }else{
                                            this.OCRLoading = false;
                                            this.imgshow1 = false
                                            this.$Message.error(res.data.message);
                                        }
                                    })
                                }
                            }
                            },
                            // params.row.state == "审核通过" ? (params.row.ispay == true ? "已支付" : "立即支付") : (params.row.state == "审核不通过" ? '查看原因' : "")
                            params.row.state == "审核通过" ? (params.row.ispay == true ? "" : "") : (params.row.state == "审核不通过" ? '查看原因' : "")
                        ),
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style:{
                                padding:'0px 7px',
                                display:params.row.state == '已撤回' && this.isSpecialUser == true ? "inline-block" : "none"
                            },
                            on: {
                                click: () => {
                                    this.lawCaseId = params.row.id;
                                    this.process = 3;
                                    this.gotoContinue()
                                }
                            }
                        }, '重新编辑'),
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style:{
                                padding:'0px 7px',
                            },
                            on: {
                                click: () => {
                                    this.submbutton = false;
                                    this.liniList = [];
                                    this.lawyerList = [];
                                    this.lawCaseId = params.row.id;
                                    getOnlineLawCaseEdit(params.row.id).then(res => {
                                        if(res.data.state == 100){
                                            if(res.data.result.onlineBrief.id == 'fa86bd7e1af811e9b39a00163e0af9c6'){
                                                this.element = 1;//修改要素信息
                                            }else if(res.data.result.onlineBrief.id == 'fa86bdfb1af811e9b39a00163e0af9c6'){
                                                this.element = 2;//修改要素信息
                                            }else{
                                                this.element = 0;
                                            }
                                            this.caseType =  res.data.result.type == 1 ? "民商案件" : "执行案件";
                                            this.standardMoney = res.data.result.standardMoney;
                                            this.briefName =res.data.result.onlineBrief  ? res.data.result.onlineBrief.name : '';
                                            this.factContent = res.data.result.factContent;
                                            this.reasonContent = res.data.result.reasonContent;
                                            this.infoMol = true;
                                            this.caInfo = true;
                                            let plainffStr = '';
                                            let defgStr = '';
                                            res.data.result.onlineLitigants.map(item => {
                                                if(item.litigationStatus.name == '被告'){
                                                    defgStr = defgStr + item.litigantName + '、';
                                                }else if(item.litigationStatus.name == '原告'){
                                                    plainffStr = plainffStr + item.litigantName + '、';
                                                }
                                            })
                                            // console.log(plainffStr)
                                            this.litigantContent = "原告" + plainffStr.substr(0, plainffStr.length - 1) + '与被告' + defgStr.substr(0, defgStr.length - 1);
                                            // console.log(this.litigantContent) 
                                        }
                                    })
                                    console.log(this.lawCaseId)
                                }
                            }
                        }, '查看案件信息'),
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style:{
                                padding:'0px 7px',
                            },
                            on: {
                                click: () => {
                                    this.lawCaseId = params.row.id;
                                    downFiles(params.row.id).then(res => {
                                        console.log(res)
                                        if(res.data.state == 100){
                                            if (res.data.data) {
                                                for (let i = 0; i < res.data.data.length; i++) {
                                                    window.open(res.data.data[i].path);
                                                    // this.contentUpload = res.data.data[i].path
                                                    // this.filenameUpload = res.data.data[i].name
                                                    // const blob = new Blob([this.contentUpload])
                                                    // if (window.navigator.msSaveOrOpenBlob) {
                                                    //     navigator.msSaveBlob(blob, this.filenameUpload)
                                                    // } else {
                                                    //     let aTag = document.createElement('a')
                                                    //     aTag.download = this.filenameUpload
                                                    //     aTag.href = URL.createObjectURL(blob)
                                                    //     aTag.click()
                                                    //     URL.revokeObjectURL(aTag.href)
                                                    // }
                                                }
                                            }else{
                                                this.$Message.info('暂无相关文书');
                                            }
                                        }else{
                                            this.$Message.info(res.data.message);
                                        }
                                    })
                                }
                            }
                        }, '下载文书'),
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style:{
                                padding:'0px 7px',
                                display:params.row.state == "审核不通过" || params.row.state == "已撤回"  ? 'none' : 'inline-block',
                            },
                            on: {
                                click: () => {
                                    if(params.row.state != "撤诉申请"){
                                        this.lawCaseId = params.row.id;
                                        this.applyShow = true;
                                        this.fileNlist = [];
                                        if(params.row.state == '审核通过' || params.row.state == '已转调解'){
                                            this.isShowUpload = true;
                                        }else{
                                            this.isShowUpload = false;
                                        }
                                    }
                                    else{
                                        this.downPath = ""
                                        withdrawalResult(params.row.id).then(res => {
                                            if(res.data.state == 100){
                                                if(res.data.type == 1){
                                                    this.chesuType = "审核通过"
                                                }else if(res.data.type == 2){
                                                    this.chesuType = "审核不通过"
                                                }else{
                                                    this.chesuType = "暂无结果"
                                                }
                                                this.handleSuggess = res.data.result;
                                            }
                                            this.downPath = res.data.data;
                                            this.applyShow2 = true;
                                        })
                                       
                                    }
                                }
                            }
                        }, params.row.state == "撤诉申请" ? '查看撤诉' : '撤诉申请'),
                        // h('Button', {
                        //     props: {
                        //         type: 'text',
                        //         size: 'small'
                        //     },
                        //     style:{
                        //         padding:'0px 7px',
                        //     },
                        //     on: {
                        //         click: () => {
                        //             this.lawCaseId = params.row.id;
                        //             getDiplomsDownloadRecord(params.row.id).then(res => {
                        //                 console.log(res)
                        //                 if(res.data.state == 100){
                        //                     if (res.data.data) {
                                                
                        //                     }else{
                        //                         this.$Message.info('暂无相关文书');
                        //                     }
                        //                 }else{
                        //                     this.$Message.info(res.data.message);
                        //                 }
                        //             })
                        //         }
                        //     }
                        // }, '下载记录')
                        ]);
                    }
                }
            ],
            creditContract:[],
            loanContract:[],
            guaranteeContract:[],
            mortgageContract:[],
            pledgeContract:[],
        };
    },
    mounted () {
        this.searchList();
    },
    methods: {
        time(time = +new Date()) {//时间戳转换函数
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ').substring(0,10);
        },
        guaranteeChioce(name){
            this.modal2 = true;
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
            });
            getContractInfo(this.lawcaseId,this.partCardId,'gc',this.cardId).then(res => {
                if(res.data.state == 100){
                    this.guarantee2 = res.data.nameList;
                }
            })
        },




        showEvdence(peth){
            let  ary = [];
            ary.push(peth);
            this.filePathAry = ary;
            console.log(this.filePathAry);
            this.viewEvidence = true;
        },
        backHome(){
            this.$router.push({
                name: 'home_index'
            });
        },
        submint(){  
             
        },
        downChesuy(){
            window.open(this.downPath)
        },
        closeInfo(){
            this.infoMol = false;
        },
                closeLiti(){
            this.completeMol = false;
        },
                 clearAddfortem(){
            this.addFormItem.politicalStatus='';
            this.addFormItem.nationality='';
            this.addFormItem.education='';
            this.addFormItem.litigantName= '';
            this.addFormItem.onlineLitigantId= '';            
            this.addFormItem.litigantSex= '';
            this.addFormItem.litigantType= '自然人';
            this.addFormItem.litigantStatus='原告';
            this.addFormItem.employer= '';
            this.addFormItem.identityCard= '';
            this.addFormItem.nation= '';
            this.addFormItem.litigantPhone= '';
            this.addFormItem.litigantTelPhone= '';
            this.addFormItem.birthday= '';
            this.addFormItem.birthday2= '';
            this.addFormItem.email= '';
            this.addFormItem.nativePlace= '';
            this.addFormItem.address= '';
            this.addFormItem.legalManName= '';
            this.addFormItem.lawIdentiCard2= '';            
            this.addFormItem.legalManPhone= '';
            this.addFormItem.legalManId= '';
            this.addFormItem.sendAddress= '';
            this.addFormItem.agentId= '';
            this.addFormItem.lawerType= '';
            this.addFormItem.lawerName= '';
            this.addFormItem.lawermobile= '';
            this.addFormItem.lawIdentiCard= '';
            this.addFormItem.lawerNum= '';
            this.addFormItem.lawFirm= '';
            this.addFormItem.relationType= '';
            this.addFormItem.relationLitigantId= '';
            this.addFormItem.agentId1= "";
            this.addFormItem.lawerType1= "";
            this.addFormItem.lawerName1= "";
            this.addFormItem.lawermobile1= "";
            this.addFormItem.lawIdentiCard1= "";
            this.addFormItem.lawerNum1= ""
        },
        cloaselawyer(){
            this.lawyerMol = false;
        },
                getOneLini(id){
            this.clearAddfortem();
            // this.litigantId = id;
            getOneLitigant(id).then(res => {
                if(res.data.state == 100){
                    this.addFormItem.politicalStatus=res.data.onlineLitigant.politicalStatus;
                    this.addFormItem.nationality=res.data.onlineLitigant.nationality;
                    this.addFormItem.education=res.data.onlineLitigant.education;
                    this.addFormItem.litigantName= res.data.onlineLitigant.litigantName;           
                    this.addFormItem.litigantSex= res.data.onlineLitigant.litigantSex == 1 ? "女" : "男";
                    this.addFormItem.litigantType= res.data.onlineLitigant.litigantType == 0 ? "自然人" : (res.data.onlineLitigant.litigantType == 1 ?  "法人" : "非法人组织");
                    this.addFormItem.litigantStatus=res.data.onlineLitigant.litigationStatus.name;
                    this.addFormItem.employer= res.data.onlineLitigant.employer;
                    this.addFormItem.identityCard= res.data.onlineLitigant.identityCard;
                    this.addFormItem.nation= res.data.onlineLitigant.nation;
                    this.addFormItem.legalManJob = res.data.onlineLitigant.legalManJob ? res.data.onlineLitigant.legalManJob : "";
                    this.addFormItem.litigantPhone= res.data.onlineLitigant.litigantPhone;
                    this.addFormItem.litigantTelPhone= res.data.onlineLitigant.litigantTelPhone;
                    this.addFormItem.birthday= formatDate(new Date(res.data.onlineLitigant.birthday), 'yyyy-MM-dd');
                    this.addFormItem.birthday2= formatDate(new Date(res.data.onlineLitigant.birthday), 'yyyy-MM-dd');
                    this.addFormItem.email= res.data.onlineLitigant.email;
                    this.addFormItem.nativePlace= res.data.onlineLitigant.nativePlace;
                    this.addFormItem.address= res.data.onlineLitigant.address;
                    this.addFormItem.legalManName= res.data.onlineLitigant.legalManName;           
                    this.addFormItem.legalManPhone= res.data.onlineLitigant.legalManPhone;
                    this.addFormItem.legalManId= res.data.onlineLitigant.legalManId;
                    this.addFormItem.sendAddress= res.data.onlineLitigant.sendAddress;
                    this.completeMol = true;
                }else{
                    this.$Message.info(res.data.message);
                }
            })
        },
        uploadSuccess(res,file){
            console.log(res)
            if (res.state==100) {
                this.$Message.success('上传成功');
                    var datas = {
                        name:file.name,
                        path:res.file
                    }
                    this.fileNlist.push(datas);
            }else{
                    this.$Message.info(res.message);
            }
        },
        delUpload(){

        },
        getLaw(id){
            this.clearAddfortem();
            getLawyerInfo(id).then(res => {
                if(res.data.state == 100){
                    this.addFormItem.name = res.data.onlineLitigant.litigantName;
                    this.addFormItem.lawerType= res.data.onlineLawyer.type;
                    if(res.data.onlineLawyer.type == 1){
                        this.addFormItem.lawerType = "律师";
                        this.lawyerT1 = false;
                    }else if(res.data.onlineLawyer.type == 2){
                        this.addFormItem.lawerType = "法律工作者";
                        this.lawyerT1 = false;
                    }else if(res.data.onlineLawyer.type == 3){
                        this.addFormItem.lawerType = "单位工作人员";
                        this.lawyerT1 = true;
                    }else if(res.data.onlineLawyer.type == 4){
                        this.addFormItem.lawerType = "近亲属";
                        this.lawyerT1 = true;
                    }else if(res.data.onlineLawyer.type == 5){
                        this.addFormItem.lawerType = "公民";
                        this.lawyerT1 = true;
                    }
                    this.addFormItem.lawerName= res.data.onlineLawyer.name;
                    this.addFormItem.lawermobile= res.data.onlineLawyer.phone;
                    this.addFormItem.email = res.data.onlineLawyer.email;
                    this.addFormItem.lawyerOfficeName  = res.data.onlineLawyer.lawyerOfficeName ? res.data.onlineLawyer.lawyerOfficeName : "";
                    this.addFormItem.lawIdentiCard= res.data.onlineLawyer.identicard;
                    this.addFormItem.lawIdentiCard2= res.data.onlineLawyer.identicard;
                    this.addFormItem.lawerNum = res.data.onlineLawyer.lawyerIdcard;
                    this.addFormItem.address = res.data.onlineLawyer.address;
                    this.lawyerMol = true;
                }else{
                    this.$Message.info(res.data.message);
                }
            })
        },
        backBt(){
            this.imgshow2 = true;
            this.queShow = false;
        },
        showError(){
            this.imgshow2 = false;
            this.queShow = true;
        },
        cloaseImg(){
            this.OCRLoading = false;
            this.imgshow1 = false;
            this.imgshow2 = false;
            this.imgpath = "";
            this.getList(this.pageNumber);
        },
        changePage(p){ 
            this.getList(p)
        },
        closeGF(){
            this.suggessMol = false
        },
        gotoContinue(){
            window.localStorage.setItem('lawCaseId',this.lawCaseId);
            window.localStorage.setItem('process','0');
            this.$router.push({
                name: "caseInfoContinue",
                params: { lawCaseId: this.lawCaseId, process:'0'}
            });
        },
        subApply(){
            if(this.isShowUpload){
                if(this.fileNlist.length == 0){
                    this.$Message.info('请上传撤诉申请书');
                    return false;
                }else{
                    this.filePath = this.fileNlist[0].path
                }

            }
            this.loading = true;
            withdrawalApplication(this.lawCaseId,this.applyContent,this.filePath).then(res => {
                this.loading = false;
                if(res.data.state == 100){
                    this.$Message.success(res.data.message);
                    this.applyShow = false;
                    this.getList(this.pageNumber);
                }else{
                    this.$Message.info(res.data.message);
                }
            })
        },
        downApply(){
            getWithdrawalInfo().then(res => {

            })
        },
        searchList(){
            this.loading1 = true;
            if (this.applyDate.length == 2) {
                if (this.applyDate[0] == null) {
                    this.startDate = ''
                } else {
                    this.startDate = new Date(this.applyDate[0]).getTime();
                }
                if (this.applyDate[1] == null) {
                    this.endDate = ''
                } else {
                    this.endDate =
                        new Date(this.applyDate[1]).getTime() +
                        60 * 60 * 23 * 1000 +
                        59 * 60 * 1000 +
                        59 * 1000;
                }
            }
            if(this.stateData == '全部'){
                this.stateData = '';
            }
            if(this.typeData == '全部'){
                this.typeData = "";
            }
            this.getList(1);
            if(Cookies.get('user') == '农商行总帐号' || Cookies.get('user') == '农商金控总账号'){
                this.isSpecialUser = false;
            }
        },
        getList(page){
            this.listLoading = true;
            this.pageNumber = page;
            this.connectedData = [];
            var params = {
                type:this.typeData,
                applyDateStartStr:this.startDate,
                applyDateEndStr:this.endDate,
                auditState:this.stateData,
                code:this.code,
                defendantName:this.codeDenfent,
                pageNumber:page,
                pageSize:6,
                brief:this.brief
            }
            caseList(params).then(res => {
                this.listLoading = false;
                if(res.data.state == 100){
                    res.data.result.content.map(item => {
                        var status;
                        if(item.auditStatus == null){
                            status = "审核中"
                        }else if (item.auditStatus == 1 && item.auditState == 1){
                            status = "审核通过"
                        }else if (item.auditState == 1 && item.auditStatus == 5){
                            status = "已转调解"
                        }else if (item.auditStatus == 7){
                            status = "已撤回"
                        }else if (item.auditStatus == 8){
                            status = "撤诉申请"
                        }else{
                            status = "审核不通过"
                        }
                        
                        let onlineLitigantsYuan=''
                        let onlineLitigantsBei=''
                        let onlineBrief=''
                        for (let i = 0; i < item.onlineLitigants.length; i++) {
                            if (item.onlineLitigants[i].litigationStatus.name=='原告'&&item.onlineLitigants[i].enable==true) {
                                onlineLitigantsYuan=onlineLitigantsYuan+','+item.onlineLitigants[i].litigantName
                            }
                        }
                        for (let j = 0; j < item.onlineLitigants.length; j++) {

                            if (item.onlineLitigants[j].litigationStatus.name=='被告'&&item.onlineLitigants[j].enable==true) {
                                onlineLitigantsBei=onlineLitigantsBei+','+item.onlineLitigants[j].litigantName
                            }
                        }
                        if (item.onlineBrief) {
                            onlineBrief=item.onlineBrief.name
                        }
                        // console.log(onlineLitigantsYuan)
                        // console.log(onlineLitigantsBei)
                        onlineLitigantsYuan=onlineLitigantsYuan.substr(1)
                        onlineLitigantsBei=onlineLitigantsBei.substr(1)
                        const data = {
                           id:item.id,
                           code:item.code,
                           remark:item.remark,
                           status:item.auditStatus,
                           applytime:formatDate(new Date(item.applyDate), 'yyyy-MM-dd'),
                           caseType:item.type == 1 ? "民商" : "执行",
                           onlineLitigantsYuan:onlineLitigantsYuan,
                           onlineLitigantsBei:onlineLitigantsBei,
                           onlineBrief:onlineBrief,
                           standardMoney:item.standardMoney,
                           state:status,
                           cellClassName: status == "审核中" || status == "已撤回" || status == "撤诉申请" ? { state: 'table-blue-row1' } : (status == "审核通过" ? { state: 'table-green-row1' } : { state: 'table-red-row1' }),
                           ispay:item.isPay ? item.isPay : false,
                        }
                        this.connectedData.push(data)
                    })
                    this.totalPage = res.data.result.totalPages;
                    this.loading1 = false;
                }
            })
            .catch(error => {
                this.$Message.warning('网络错误！请刷新重试！');
            })
        },

        changeTab(e){
            console.log(e);
            let that=this
            console.log(this.lawCaseId)
            if(e == 0){
                if(this.caInfo == false){
                    this.caInfo = true;
                }
            }
            else if(e == 1){   //当事人信息
                console.log(this.lawCaseId)
                this.caInfo = false;
                this.submbutton = false;
                if(this.liniList.length  != 0){
                    return false;
                }
                this.liniList = [];
                getLitigantInfo(this.lawCaseId).then(res => {
                    if(res.data.state == 100){
                        res.data.result.map(item => {
                            console.log(item.litigantType)
                            const data={
                                name:item.litigantName,
                                type:item.litigantType==0 ? "原告" : (item.litigantType==1 ? "被告" : "第三人"),
                                typeStatus:item.litigationStatus.name,
                                card:item.identityCard,
                                phone:item.litigantPhone || item.legalManPhone,
                                adress:item.nativePlace,
                                id:item.id,
                            }
                            this.liniList.push(data);
                        }); 
                    }
                })
            }else if (e == 2){  //代理人
                this.caInfo = false;
                this.submbutton = false;
                console.log(this.lawyerList)
                if(this.lawyerList.length  != 0){
                    return false;
                }
                this.lawyerList = [];
                getLitigantLawyerList(this.lawCaseId).then( res=>{
                    if(res.data.state == 100){
                        res.data.result.map(item => {
                            const data={
                                name:item.name,
                                card:item.identicard,
                                phone:item.phone,
                                adress:item.address,
                                id:item.id,
                            }
                            this.lawyerList.push(data);
                            console.log(data)
                            console.log(this.lawyerList)
                        });
                    }
                })
            }else if(e == 3){   //附件信息
                if(this.fileInfo == false){
                    this.fileInfo = true;
                }
                this.caInfo = false;
                this.submbutton = false;
                otherGetFiles(this.lawCaseId).then(res => {
                if(res.data.state == 100){
                    this.EviList = [];
                    this.qFileName = {
                        path:"",
                        name:"",
                    };
                    this.fileName1 = {
                        path:'',
                        name:''
                    };
                    this.fileName2 = {
                        path:'',
                        name:''
                    };
                    this.fileNameShen1="";
                    this.onlineEAIdShen1="";
                    this.fileNameShen2="";
                    this.onlineEAIdShen2="";
                    this.fileNameShen3="";
                    this.onlineEAIdShen3="";
                    this.fileNameShen4="";
                    this.onlineEAIdShen4="";
                    this.fileNameShen5="";
                    this.onlineEAIdShen5="";
                    this.fileNameShen6="";
                    this.onlineEAIdShen6="";
                    res.data.file.map(item => {
                        if(item.type == 1){
                            this.fileName1 = {
                                path:item.path,
                                name:item.name
                            };
                            // this.qisuShow1 = false;
                        }else if(item.type == 2){
                            this.fileName2 = {
                                path:item.path,
                                name:item.name
                            };
                            // this.qisuShow2 = false;
                        }else if(item.type == 3){
                            const data = {
                                name:item.eviName,
                                proves:item.eviProve,
                                where:item.eviSource,
                                filePa:item.path,
                                id:item.id
                            }
                            this.EviList.push(data);
                        }else if(item.type == 4){
                            if(item.applyType == 1){
                                this.fileNameShen1 = item.name;
                                this.qisuShowShen1 = false;
                                this.onlineEAIdShen1 = item.path;
                            }else if(item.applyType == 2){
                                this.fileNameShen2 = item.name;
                                this.qisuShowShen2 = false;
                                this.onlineEAIdShen2 = item.path;
                            }else if(item.applyType == 3){
                                this.fileNameShen3 = item.name;
                                this.qisuShowShen3 = false;
                                this.onlineEAIdShen3 = item.path;
                            }else if(item.applyType == 4){
                                this.fileNameShen4 = item.name;
                                this.qisuShowShen4= false;
                                this.onlineEAIdShen4 = item.path;
                            }else if(item.applyType == 5){
                                this.fileNameShen5 = item.name;
                                this.qisuShowShen5 = false;
                                this.onlineEAIdShen5 = item.path;
                            }else if(item.applyType == 6){
                                this.fileNameShen6 = item.name;
                                this.qisuShowShen6 = false;
                                this.onlineEAIdShen6 = item.path;
                            }
                        }else if(item.type == 5){
                            this.qFileName = {
                                path:item.path,
                                name:item.name
                            };
                            // this.qisuShow1 = false;
                        }
                    });
                }
            })
            }else if(e == 4){
                if(this.element == 1){
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
                
                // this.caseNo="";
                // this.briefId="";
                // this.courtId='';
                // this.judgeId='';
                // this.clerkId='';
                // this.filingDateStr='';
                // this.payMoney='';
                // // this.litigantContent='';
                // this.bridfList=[];
                // this.courtList=[];
                // this.judgeList=[];
                // this.clerkList=[];
                // this.caInfo = false;
                // this.fileInfo = false;
                // if(this.isEdit){
                //     this.submbutton = true;
                // }
                
                // getJudgeBriefCourt().then(res => {
                //     if(res.data.state == 100){
                //         console.log(res.data.briefList)
                //         res.data.briefList.map(item => {
                //             const data = {
                //                 id:item.id,
                //                 name:item.name,
                //             }
                //             this.bridfList.push(data);
                //             this.briefId = this.briefName;
                //         })
                //         res.data.clerkList.map(item => {
                //             const data1 = {
                //                 id:item.id,
                //                 name:item.name,
                //             }
                //             this.clerkList.push(data1);
                //         })
                //         res.data.courtList.map(item => {
                //             const data2 = {
                //                 id:item.id,
                //                 name:item.name,
                //             }
                //             this.courtList.push(data2);
                //         })
                //         res.data.judgeList.map(item => {
                //             const data3 = {
                //                 id:item.id,
                //                 name:item.name,
                //             }
                //             this.judgeList.push(data3);
                //         })
                //     }
                // })
            }
        }
    }
};
</script>
<style>
.ivu-table .table-green-row1 span{
    color:green;
}
.ivu-table .table-blue-row1 span{
    color:blue;
    cursor: pointer;
}
.ivu-table .table-red-row1 span{
    color:red;
    cursor: pointer;
}
.bmbox{
     width: 100%;
    padding: 14px 18px;
    color: #fff;
    position: absolute;
    top: 38%;
    left: 0;
    text-align: center;
    cursor: pointer;
}
.bmbox .title{
    opacity: 0;
}
 .matr {
    width: 135px;
    height: 150px;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 10px;
    margin: 10px;
    float: left;
}
.info{
    font-size: 12px;
    color: #000;
    overflow:hidden; 
    word-wrap:break-word;
    text-align: left;
    position: relative;
    padding: 5px;
}
.info:before{
    content: "";
    width: 0;
    height: 100%;
    background: #000;
    padding: 14px 18px;
    position: absolute;
    top: 0;
    left: 50%;
    opacity: 0;
    transition: all 500ms cubic-bezier(0.47, 0, 0.745, 0.715) 0s;
}
.info:hover:before{
    width: 100%;
    left: 0;
    opacity: 0.5;
}
.bmbox{
     width: 100%;
    padding: 14px 18px;
    color: #fff;
    position: absolute;
    top: 38%;
    left: 0;
    text-align: center;
    cursor: pointer;
}
.bmbox .title{
    opacity: 0;
}
.info:hover .title,
.info:hover .post{
    opacity: 1;
    transition-delay: 0.7s;
}
.sdws{
    display: block;
    text-align: left;
    line-height: 40px;
    padding-left: 10px;
    /* border-top:1px solid #dddee1;
    border-left:1px solid #dddee1;
    border-right:1px solid #dddee1; */
}
.ivu-table-cell b{
    background-image:url('../../images/download.png');
    background-size: 100% 100%; 
    display:inline-block;
    cursor: pointer;
    height: 30px;
    width:30px;
}
.ivu-table-cell {
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    box-sizing: border-box;
    max-height:70px;
}
</style>
