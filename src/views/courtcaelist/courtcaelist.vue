<style>
.stepse{
    width: 270px;
    border-right: 1px solid #ccc;
    height: 100%;
    text-align: center;
    display: inline-block;
    /* margin-top: 25px; */
}
.step{
    width: 80%;
    border: 1px solid #ccc;
    height: 65px;
    margin-left: 10%;
    border-radius: 10px;
    cursor: pointer;
}
.ivu-form-item{
    margin-bottom: 15px;
}
.step span{
    color:black;
    line-height: 65px;
    font-size: 14px;
}
.active{
    border: 2px solid #007FD5;
}
.content_main{
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
.ivu-table-cell b{
    background-image:url('../../images/download.png');
    background-size: 100% 100%; 
    display:inline-block;
    cursor: pointer;
    height: 30px;
    width:30px;
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
.ivu-auto-complete.ivu-select-dropdown {
    max-height: 160px;
}
</style>

<template>
    <div style="padding:10px;padding-top:20px;padding-bottom:10px;height:100%">
        <div class="stepse">
            <p slot="title" style="display:inline-block;font-size: 20px;margin-top:20px">
                <Icon type="wrench"></Icon>
                案件搜索
            </p>
            <div style="margin-bottom: 16px;width: 220px;margin-top:20px">
                <Form :label-width="85">
                    <FormItem label="申请人：">
                        <Input v-model="applyPeople" clearable style="width:165px" placeholder="请输入申请人"></Input>
                    </FormItem>
                    <FormItem label="当事人：">
                        <Input v-model="defendantName" clearable style="width:165px" placeholder="请输入当事人"></Input>
                    </FormItem>
                    <FormItem label="类型：">
                        <Select v-model="briefType" clearable style="width:165px">
                            <Option value="0">涉网案件</Option>
                            <Option value="1" >涉金融案件</Option>
                            <Option value="2">其他案件</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="案由：">
                        <Input v-model="brief" clearable style="width:165px" placeholder="请输入案由"></Input>
                    </FormItem>
                    <FormItem label="状态：">
                        <Select v-model="stateData" clearable style="width:165px">
                            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="类别：">
                        <Select v-model="typeData" clearable style="width:165px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="申请时间：">
                        <DatePicker v-model="applyDate" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择日期" style="width: 165px"></DatePicker>
                    </FormItem>
                    <Button @click="searchList"  type="primary" style="width:220px;margin-left:20px">查询</Button>
                </Form>
            
            </div>
        </div>
        <div class="content_main">
            <Input v-model="code" @on-enter="searchList" icon="search" placeholder="回执编号" style="width: 100%"></Input>
            <div style="overflow-y:auto;max-height:85%;">
                <Table ref="selection" :loading="loading"  :columns="connectedCol" :data="connectedData"  style="margin-top: 10px;"></Table>
            </div>
            
            <div style="margin: 10px;overflow: hidden;">
                <div style="float: right;">
                    <Page :total="totalPage" :page-size="1" :current="pageNumber" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <!-- <a href="#" style="float:left;line-height: 40px;padding-left: 30px;position: relative;bottom: 40px;left:270px" @click="backHome">返回主页</a>         -->
         <Modal
            v-model="infoMol"
            cancel-text=""
            :loading="loading"
            ok-text="确定"
            @on-ok="submint"
            width="700px"
            :mask-closable="closeM"
            title="立案办理">
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
                        <h5 style="text-align: center;" v-show="lawyerList.length == 0">暂无代理人信息</h5>
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
                                    <!-- :href="qFileName.path" -->
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;">
                                    身份证明材料：
                                </Col>
                                <Col span="6" style=" padding-right: 5px">
                                    <span v-if="fileName1.name == ''">无</span>
                                    <a v-else  @click="showEvdence(fileName1.path)" download="" style="word-wrap: break-word;">{{ fileName1.name }}</a>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;">
                                    授权委托材料：
                                </Col>
                                <Col span="6" style=" padding-right: 5px">
                                    <span v-if="fileName2.name == ''">无</span>
                                    <a v-else  @click="showEvdence(fileName2.path)" download="" style="word-wrap: break-word;">{{ fileName2.name }}</a>
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
                                    <a v-else  @click="showEvdence(onlineEAIdShen1)" download="" style="word-wrap: break-word;">{{ fileNameShen1 }}</a>
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    调查取证申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen2 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen2)" download="" style="word-wrap: break-word;">{{ fileNameShen2 }}</a>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    证据保全申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen3 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen3)" download="" style="word-wrap: break-word;">{{ fileNameShen3 }}</a>
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    证人出庭申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen4 == ''">无</span>
                                    <a v-else @click="showEvdence(onlineEAIdShen2)" download="" style="word-wrap: break-word;">{{ fileNameShen4 }}</a>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    现场勘验申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen5 == ''">无</span>
                                    <a v-else  @click="showEvdence(onlineEAIdShen5)" download="" style="word-wrap: break-word;">{{ fileNameShen5 }}</a>
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: right;margin-bottom:10px">
                                    鉴定评估申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    <span v-if="fileNameShen6 == ''">无</span>
                                    <a v-else @click="showEvdence(onlineEAIdShen6)" download="" style="word-wrap: break-word;">{{ fileNameShen6 }}</a>
                                </Col>
                            </Row>
                            <div>
                                <p class="sdws">
                                    证据材料：
                                </p>
                                <Table :columns="columnsEvi" :data="EviList"></Table>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="审查意见">
                        <div style="padding:10px;padding-left:20px" v-show="isEdit">
                            <span style="display:inline-block;width:100px;text-align:right">审查意见：</span>   
                            <RadioGroup v-model="auditStatus" @on-change="changestatus">
                                <Radio style="margin-right:20px" label="同意立案"></Radio>
                                <Radio style="margin-right:20px" label="不予受理"></Radio>
                                <Radio v label="退回"></Radio>
                                <Radio style="margin-right:20px" label="补正"></Radio>
                                <Radio label="调解"></Radio>
                                <Radio label="委派调解"></Radio>
                            </RadioGroup>
                            <div style="margin-top:30px;" v-show="agreeDiv">
                                <Form  :label-width="100" inline>
                                    <FormItem label="案件编号:" style="width: 245px;" >
                                        <Input v-model="caseNo" placeholder="请输入案件编号"></Input>
                                    </FormItem>
                                    <FormItem label="案由名称:" style="width: 245px;">
                                        <AutoComplete
                                            v-model="briefId"
                                            placeholder="请选择"
                                            style="width:230px" >
                                            <Option v-for="(item,index) in bridfList" :value="item.name" :key="item.name"></Option>
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
                                        <input type="text" name="je" @input="clearNoNum" style="border: 1px solid #dddee1;border-radius: 5px;padding-left: 5px;"/>元 
                                    </FormItem>
                                    
                                </Form>
                            </div>
                            <Form  :label-width="100" style="margin-top: 20px;" inline v-show="auditStatus == '调解'">
                                <FormItem label="引调号:" style="width: 500px;" >
                                    <Input v-model="mediateNo" placeholder="请输入引调号"></Input>
                                    <Button @click="getMaxCaseNum" :loading="getting">点击重新获取引调号</Button>
                                </FormItem>
                                <FormItem label="案由名称:" style="width: 445px;" >
                                    <AutoComplete
                                        v-model="briefId"
                                        placeholder="请选择"
                                        style="width:230px" >
                                        <Option v-for="(item,index) in bridfList" :value="item.name" :key="item.index"></Option>
                                    </AutoComplete>
                                </FormItem>
                                <FormItem label="文书生成:" style="width: 345px;" >
                                    <span style="line-height:34px;margin-right:20px">诉前调解告知书</span> <Button type="primary" @click='createTJ()'>生成</Button>
                                </FormItem>
                            </Form>
                            <div style="margin-top:10px"  v-show="auditStatus != '委派调解'">
                                <span style="display:inline-block;width:100px;text-align:right">备注：</span>
                                <Input style="margin-left: 30px;width:80%"  v-model="remark" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="备注"></Input>
                            </div>
                            <div style="margin-top:10px;margin-left: 30px;width:80%"   v-show="auditStatus != '委派调解'">
                                <Upload action="/api/online/audit/diploms/uploadFiles.jhtml" :show-upload-list='false' :on-success="uploadSuccess"  >
                                    <Button icon="ios-cloud-upload-outline">上传文书(可多次点击上传)</Button>
                                </Upload>
                                <div style="display:block;text-align:left;padding-right:5px;">
                                    <p style="margin-top:5px" v-for="(item,index) in fileNlist" v-bind:key="index">{{item.name}}<span @click="delUpload(index,item.path)"><Icon type="close-circled"  style="cursor:pointer;margin-left:10px;"></Icon></span></p>
                                </div>
                            </div>
                        
                        <div style="padding:10px;padding-left:20px;"  v-show="auditStatus == '委派调解'">
                            <Form  :label-width="100" style="margin-top: 20px;" inline v-show="auditStatus == '委派调解'">
                                <FormItem label="引调号:" style="width: 500px;" >
                                    <Input v-model="mediateNo" placeholder="请输入引调号"></Input>
                                    <Button @click="getMaxCaseNum" :loading="getting">点击重新获取引调号</Button>
                                </FormItem>
                                <FormItem label="案由名称:" style="width: 500px;" >
                                    <AutoComplete
                                        v-model="briefId"
                                        placeholder="请选择"
                                         >
                                        <Option v-for="(item,index) in bridfList" :value="item.name" :key="item.index"></Option>
                                    </AutoComplete>
                                </FormItem><br/>
                                <FormItem label="承办法官:" style="width: 500px;" >
                                    <Select v-model="judgeId" filterable transfer placeholder="请选择">
                                        <Option v-for="item in judgeList" v-bind:value="item.id">{{item.name}}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="书记员:"  style="width: 500px;" >
                                    <Select v-model="clerkIds" multiple filterable transfer placeholder="请选择">
                                        <Option v-for="item in clerkList" v-bind:value="item.id">{{item.name}}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem  label="行政区域:" style="width: 500px;" >
                                    <Select v-model="MediateSortOneValue" filterable clearable style="width:230px;" >
                                        <Option v-for="item in MediateSortOne" :value="item" :key="item"></Option>
                                    </Select>
                                </FormItem>
                                <FormItem  label="建议调解机构:" style="width: 500px;" >
                                    <Select v-model="MediateSortTwoValue" filterable clearable style="width:230px"  >
                                        <Option v-for="item in MediateSortTwo" :value="item" :key="item"></Option>
                                    </Select>
                                    <!-- @on-change="MediateSortTwoChange()" -->
                                </FormItem>
                                <!-- <div style="margin-top:10px"  v-show="auditStatus == '委派调解'">
                                    <span style="display:inline-block;width:120px;text-align:right">人民调解协议：</span>
                                    <Input style="margin-left: 30px;width:80%"  v-model="mediateContent" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="备注"></Input>
                                </div> -->
                            </Form>
                        </div>
                       </div>
                       <div v-show="!isEdit">
                           <Row  style="margin-bottom:5px">
                               
                               <!-- this.shenchaData.briefNameS=res.data.result.onlineBrief.name
                                                    this.shenchaData.caseNoS=res.data.result.caseNo
                                                    this.shenchaData.remarkContent=res.data.result.mediateContent -->

                                <!-- <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:15px">
                                    引调号：
                                </Col>
                                <Col span="18" style=" padding-right: 5px;margin-bottom:25px">
                                    <span v-if="shenchaData.caseNoS == ''">无</span>
                                    <span v-else>{{shenchaData.caseNoS ? shenchaData.caseNoS : "无" }}</span>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:15px">
                                    案由：
                                </Col>
                                <Col span="18" style=" padding-right: 5px;margin-bottom:25px">
                                    <span v-if="shenchaData.briefNameS == ''">无</span>
                                    <span v-else>{{ shenchaData.briefNameS }}</span>
                                </Col> -->

                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:15px">
                                   审查意见：
                                </Col>
                                <Col span="18" style=" padding-right: 5px;margin-bottom:25px">
                                    <span v-if="!shenchaData.auditStatus">无</span>
                                    <span v-else>{{shenchaData.auditStatus == 1 ? '同意立案' : 
                                        (shenchaData.auditStatus == 2 ? '不予受理' : 
                                        (shenchaData.auditStatus == 3 ? '退回' : 
                                        (shenchaData.auditStatus == 4 ? '补正' : '调解'))) }}</span>
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: right;margin-bottom:15px">
                                    备注：
                                </Col>
                                <Col span="18" style=" padding-right: 5px;margin-bottom:25px">
                                    <span v-if="shenchaData.remark == ''">无</span>
                                    <span v-else>{{ shenchaData.remark }}</span>
                                </Col>


                                <!-- <Col span="6" style=" padding-right: 5px;text-align: right;">
                                    人民调解协议：
                                </Col>
                                <Col span="18" style=" padding-right: 5px;margin-bottom:65px">
                                    <span v-if="shenchaData.remarkContent == ''">无</span>
                                    <span v-else>{{ shenchaData.remarkContent }}</span>
                                </Col> -->
                            </Row>
                            <Row  style="margin-bottom:5px">
                               <Col span="16" push="8" style=" padding-right: 5px;text-align: right;margin-bottom:15px">
                               <div style="display:inline-block" v-show="mediation">
                                   <Button type="primary" v-show="isnoSET != '已办结'" @click='agreeSetCase()'>同意立案</Button>
                                   <Button type="primary" @click='getstep()'>案件时间轴</Button>
                                   <Button type="primary" @click='fileShow()'>案件文书</Button>
                               </div>
                                   
                                   <Button type="primary" @click='generateMediateContent()'>生成</Button>
                                </Col>
                                <!-- <Col span="12" style=" padding-right: 5px;margin-bottom:25px">
                                    <Button type="primary" @click='sendConfirmation()'>发送</Button>
                                </Col> -->
                            </Row>
                       </div>
                    </TabPane>
                </Tabs>
            </div>
            <div slot="footer">
                <Button @click="closeInfo"  type="dashed" size="large">关闭</Button>
                <Button @click="submintCa"  size="large" type="primary" v-show="submbutton">提交</Button>
            </div>
        </Modal>
         <Modal
            v-model="modalWen"
            title="文书预览"
            :mask-closable="false"
            :styles="{top: '20px'}"
            :width="modalWidth2">
            <div>
                <caseAccept ref="dexF"  @model="cloaseModalWen"/>
                <div :style="{marginTop: '10px', textAlign: 'right', marginRight:'50px' }">
                    <Button  @click="produceDip">生成</Button>
                </div>
            </div>
            <div slot="footer"></div>
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
        <!-- 案件时间轴 -->
        <Modal
            v-model="stepShow"
            :loading="loading"
            width="560px"
            :mask-closable="closeM"
            title="案件时间轴">
            <div>
                <mySteps :current="2" direction="vertical" v-show="stepList.length > 0">
                    <myStep v-for="(item, index) in stepList" :icon="index == 0 ? 'compose' : '' " :status="index == 0 ? 'process' : 'finish'" :title="item.createDate | formatStartDate" :content="item.operatorContent" :people="item.operatorName"></myStep>
                </mySteps>
            </div>
            <div slot="footer">
                <Button @click="stepShow = false"  type="dashed" size="large">关闭</Button>
            </div>
        </Modal>
        <!-- 查看案件文书 -->
        <Modal
            v-model="modal1"
            title="查看案件文书"
            :mask-closable="false"
            :styles="{top: '20px'}"
            :width="modalWidth">
            <div class="components-container">
              <dipmosShow :list='dipmosList'  ref="batch" />
            </div>
            <div slot="footer">
                <Button @click="modal1 = false"   type="dashed" size="large">关闭</Button>
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
        <!-- 同意立案 -->
        <Modal
            v-model="modal2"
            title="查看案件文书"
            :mask-closable="false"
            :styles="{top: '20px'}"
            width="660px">
            <div class="components-container">
              <div style="margin-top:30px;" >
                    <Form  :label-width="100" inline>
                        <FormItem label="案件编号:" style="width: 245px;" >
                            <Input v-model="caseNo" placeholder="请输入案件编号"></Input>
                        </FormItem>
                        <FormItem label="案由名称:" style="width: 245px;">
                            <AutoComplete
                                v-model="briefId"
                                placeholder="请选择"
                                style="width:230px" >
                                <Option v-for="(item,index) in bridfList" :value="item.name" :key="item.name"></Option>
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
                            <input type="text" name="je" @input="clearNoNum" style="border: 1px solid #dddee1;border-radius: 5px;padding-left: 5px;"/>元 
                        </FormItem>
                        
                    </Form>
                </div>
                <div style="margin-top:10px" >
                    <span style="display:inline-block;width:100px;text-align:right">备注：</span>
                    <Input style="margin-left: 30px;width:80%"  v-model="remark" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="备注"></Input>
                </div>
                <div style="margin-top:10px;margin-left: 30px;width:80%"   v-show="auditStatus != '委派调解'">
                    <Upload action="/api/online/audit/diploms/uploadFiles.jhtml" :show-upload-list='false' :on-success="uploadSuccess"  >
                        <Button icon="ios-cloud-upload-outline">上传文书(可多次点击上传)</Button>
                    </Upload>
                    <div style="display:block;text-align:left;padding-right:5px;">
                        <p style="margin-top:5px" v-for="(item,index) in fileNlist" v-bind:key="index">{{item.name}}<span @click="delUpload(index,item.path)"><Icon type="close-circled"  style="cursor:pointer;margin-left:10px;"></Icon></span></p>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="changeTerm"  :loading="TermLoading" type="primary" size="large">确认</Button>
                <Button @click="modal2 = false"   type="dashed" size="large">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { caseList, auditOnlineLawCase, getJudgeBriefCourt,uploadFiles,delFiles,getMediateSort,generateMediateContent,sendConfirmation} from '@/api/courtcaselist.js';
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
getTimeline,
getOnlineLawCaseFiles,
getMaxCaseNo//获取引调号的api接口
} from '@/api/caseInfo.js';
import { formatDate } from "@/libs/date";
import myStep from "@/components/step";
import mySteps from "@/components/steps";
import dipmosShow from "@/components/courtHandle/dipmosShow.vue";
import caseAccept from "@/components/diplomas/caseAccept.vue";
import ZhViewer from "@/components/moreFileViewer/moreFileViewer.vue";
export default {
    components: {
        mySteps: mySteps,
        myStep: myStep,
        dipmosShow,
        caseAccept,
        ZhViewer
    },
    data () {
        var width = window.innerWidth - 430;
        var width2 = window.innerWidth - 600;
        var ueWidth = width - 40 + 'px';
        return {
            nowUrlFrist:'',
            nowUrl:"",
            backFill:{},
            viewEvidence:false,
            filePathAry:[],
            TermLoading:false,
            modal1:false,
            modal2:false,
            ueWidth:width - 40 + 'px',
            modalWen:false,
            dipmosList:[],
            mediation:false,
            clerkIds:[],
            modalWidth2:width2,
            modalWidth:width,
            shenchaData:{
                briefNameS:"",
                caseNoS:'',
                remarkContent:'',
                statusType:''
            },
            mediateContent:'',
            applyPeople:"",
            defendantName:"",
            brief:"",
            briefType:"",
            isnoSET:"",
            MediateSortOneshow:false,
            MediateSortOneId:'',
            MediateSortTwoId:'',
            tabSum:'',
            MediateSortOne:['思明区','湖里区','集美区','海沧区','同安区','翔安区'],
            MediateSortTwo:['人民调解','行政调解','行业调解','其他'],
            MediateSortOneValue:'',
            MediateSortTwoValue:'',
          stateList:[
               {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '未办理'
                },
                {
                    value: '2',
                    label: '已办结'
                },
                {
                    value: '3',
                    label: '退回'
                },
          ],
          fileNlist:[],
          stepShow:false,
          stepList:[],
          fileNlistFormData:[],
          file:[],
          caseNo:"",
          mova:'caseIn',
          auditStatusOld:'',
          remarkOld:'',
          briefId:"",
          courtId:'',
          judgeId:'',
          clerkId:'',
          filingDateStr:'',
          litigantContent:'',
          payMoney:'',
          bridfList:[],
          courtList:[],
          judgeList:[],
          clerkList:[],
          shuji:'',
          remark:"",
          mediateNo:"",
          agreeDiv:true,
          submbutton:false,
          infoMol:false,
          loading:true,
          closeM:false,
          caInfo:true,
          fileInfo:true,
          auditStatusSee:"",
          auditStatus:'同意立案',
          audit:'',
          code:"",
          liniList:[],
          lawyerList:[],
          addFormItem:{},
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
          
          caseType:'',
          fileNameShen1:"",
           onlineEAIdShen1:"",
           fileNameShen2:"",
           onlineEAIdShen2:"",
           fileNameShen3:"",
           onlineEAIdShen3:"",
           fileNameShen4:"",
           onlineEAIdShen4:"",
           fileNameShen5:"",
           onlineEAIdShen5:"",
           fileNameShen6:"",
           onlineEAIdShen6:"",
          standardMoney:'',
          factContent:'',
          reasonContent:'',
          totalPage:1,
          pageNumber: 1,
          briefName:'',
          stateData:'全部',
          typeData:"全部",
          applyDate:"",
          startDate: '',
          endDate: '',
          lawcaseId:'',
          completeMol:false,
          lawyerMol:false,
          lawyerT1:false,
          applyPeople2:"",
          isEdit:true,
          getting:false,
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
           EviList:[],
          connectedCol: [
                {
                    title: '回执编号',
                    key: 'code',
                    align: 'center',
                    width: 160,
                },
                // {
                //     title: '申请时间',
                //     key: 'applytime',
                //     align: 'center',
                //     width: 160,
                // },
                {
                    title: '申请人',
                    key: 'applytpeople',
                    align: 'center',
                    width: 160,
                },
                {
                    title: '当前状态',
                    key: 'state',
                    align: 'center',
                    width: 100,
                },
                {
                    title: '案件标题',
                    key: 'briefName',
                    align: 'center',
                    width: 160,
                },
                {
                    title: '案件类别',
                    key: 'caseType',
                    align: 'center',
                    width: 100,
                },
                {
                    title: '操作',
                    key: 'brief',
                    align: 'center',
                    fixed: "right",
                    width: 120,
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
                                            if(params.row.state == "未办理"){
                                                this.isEdit = true;
                                            }else{
                                                this.isEdit = false;
                                                this.auditStatusOld = params.row.auditStatusOld == 1 ? '同意立案' : (
                                                     params.row.auditStatusOld == 2 ? "不予受理" : (
                                                          params.row.auditStatusOld == 3 ? '退回' : (
                                                              params.row.auditStatusOld == 4 ? '补正' : (
                                                                  params.row.auditStatusOld == 5 ? "调解" : ""
                                                              )
                                                          )
                                                     )
                                                ) ;
                                                this.remarkOld = params.row.remark == '' ? "无" : params.row.remark; 
                                            }
                                            this.submbutton = false;
                                            this.liniList = [];
                                            this.lawyerList = [];
                                            this.fileNlist = [];
                                            this.isnoSET = params.row.state;
                                            // this.mova = "caseIn";
                                            this.lawcaseId = params.row.id;
                                            this.applyPeople2 = "";
                                            getOnlineLawCaseEdit(this.lawcaseId).then(res => {
                                                console.log(res.data);
                                                if(res.data.state == 100){
                                                    this.shenchaData.briefNameS=res.data.result.onlineBrief.name
                                                    this.shenchaData.caseNoS=res.data.result.caseNo
                                                    this.shenchaData.remarkContent=res.data.result.mediateContent
                                                    this.shenchaData.remark=res.data.result.remark
                                                    this.shenchaData.auditStatus=res.data.result.auditStatus
                                                    this.nowUrl=res.data.result.confirmationUrl
                                                    this.mediation = res.data.result.mediation
                                                    
                                                    this.caseType =  res.data.result.type == 1 ? "民商案件" : "执行案件";
                                                    this.standardMoney = res.data.result.standardMoney;
                                                    this.briefName =res.data.result.onlineBrief  ? res.data.result.onlineBrief.name : '';
                                                    this.briefId = res.data.result.onlineBrief  ? res.data.result.onlineBrief.id : '';
                                                    this.factContent = res.data.result.factContent;
                                                    this.reasonContent = res.data.result.reasonContent;
                                                    this.infoMol = true;
                                                    this.caInfo = true;
                                                    this.auditStatusSee = res.data.result.auditStatus;
                                                    let plainffStr = '';
                                                    let defgStr = '';
                                                    res.data.result.onlineLitigants.map(item => {
                                                        if(item.litigationStatus.name == '被告'){
                                                            defgStr = defgStr + item.litigantName + '、';
                                                            
                                                        }else if(item.litigationStatus.name == '原告'){
                                                            plainffStr = plainffStr + item.litigantName + '、';
                                                            this.applyPeople2 = this.applyPeople2 + item.litigantName + '、'
                                                        }
                                                    }) 
                                                    this.litigantContent = "原告" + plainffStr.substr(0, plainffStr.length - 1) + '与被告' + defgStr.substr(0, defgStr.length - 1);
                                                }
                                            });
                                            this.getMaxCaseNum();
                                        }
                                    }
                                },
                                params.row.state == "未办理" ? '办理' : "查看案件信息"
                            ),
                            // h(
                            //     'Button',
                            //     {
                            //         props: {
                            //             type: 'text',
                            //             size: 'small'
                            //         },
                            //         on: {
                                        
                            //         }
                            //     },
                            //     "获取案号"
                            // )
                        ]);
                    }
                },
            ],
        
        };
    },
    mounted () {
        // alert(window.location.href.split('/setcase')[0])
        this.nowUrlFrist=window.location.href.split('/setcase')[0]
        this.searchList();
    },
    methods: {
        //案件时间轴
        getstep(){
            this.stepShow = true;
            getTimeline(this.lawcaseId).then(res => {
                if(res.data.state == 100){
                    this.stepList = res.data.judiciaLogs.map(item => {
                        const data = {
                            createDate:item.createDate,
                            operatorContent:item.msgContent,
                            operatorName:item.pushName
                        }
                        return data;
                    })
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
        changeTerm(){
            if(this.payMoney == ""&&this.auditStatus == "同意立案" ){
                this.$Message.info('诉讼费不能为空');
                return false;
            }
            this.TermLoading = true;
            var params ={
                onlineLawCaseId:this.lawcaseId,
                auditStatus:this.audit,
                remark:this.remark,
                mediateNo:this.mediateNo ? this.mediateNo : "",
                briefId:this.briefId,
                files:this.fileNlistFormData
            }
            if(this.audit == 1){
                params.caseNo=this.caseNo;
                params.briefId=this.briefId;
                params.courtId=this.courtId;
                params.judgeId=this.judgeId;
                params.clerkId=this.clerkId;
                params.filingDate=this.filingDateStr;
                params.litigantContent=this.litigantContent;
                params.payMoney=this.payMoney*100
            }
            auditOnlineLawCase(params).then(res => {
                this.TermLoading = false;
                if(res.data.state == 100){
                    this.$Message.success('提交成功');
                    this.modal2 = false;
                    this.getList(this.pageNumber)
                }else{
                    this.$Message.info(res.data.message);
                }
            })
        },
        agreeSetCase(){
            this.audit = 1;
            this.modal2 = true;
        },
        //案件文书
        fileShow(){
            
            this.dipmosList = [];
            getOnlineLawCaseFiles(this.lawcaseId).then(res => {
                if(res.data.state == 100){
                    let f = res.data.data;
                    let ary = [];
                    if(f.agreementUrl && f.agreementUrl != ""){
                        let ob = {
                            url:f.agreementUrl,
                            fileName:'调解协议'
                        }
                        ary.push(ob);
                    
                    }
                    if(f.recordUrl && f.recordUrl != ""){
                        let ob = {
                            url:f.recordUrl,
                            fileName:'调解笔录'
                        }
                        ary.push(ob);
                    }
                    if( f.confirmationUrl && f.confirmationUrl != ""){
                        let ob = {
                            url:f.confirmationUrl,
                            fileName:'民事裁定书'
                        }
                        ary.push(ob);
                    }
                    if(f.proofServiceUrl && f.proofServiceUrl != ""){
                        let ob = {
                            url:f.proofServiceUrl,
                            fileName:'调解协议'
                        }
                        ary.push(ob);
                    }
                    
                    this.dipmosList = ary;
                    this.$refs.batch.getList(this.dipmosList);
                    this.modal1 = true;
                }else{
                    this.$Message.info(res.data.message);
                }
            })
        },
        generateMediateContent(){
            generateMediateContent(this.lawcaseId).then(res=>{
                
                if (res.data.state==100) {
                    window.open(res.data.path);
                }else {
                    this.$Message.info(res.data.message);
                }
                
                // this.nowUrl=res.data.path
            })
        },
        sendConfirmation(){
            if (this.nowUrl) {
                sendConfirmation(this.shenchaData.caseNoS,this.nowUrlFrist+this.nowUrl).then(res=>{
                   
                    if (res.data.state==100) {
                        this.$Message.success('发送成功');
                    }else{
                        this.$Message.info(res.data.message);
                    }
                })
            }else{
                this.$Message.info('缺少路径参数');
            }
            
        },
        MediateSortOneChange(){
            
            let pid=''
            for (let index = 0; index < this.MediateSortOne.length; index++) {
                if (this.MediateSortOneValue==this.MediateSortOne[index].name) {
                    pid=this.MediateSortOne[index].id
                    this.MediateSortOneId=this.MediateSortOne[index].id
                }
                
            }
           
            if (pid!='') {
            }
        },
        MediateSortTwoChange(){
            
            // let pid=''
            for (let index = 0; index < this.MediateSortTwo.length; index++) {
                if (this.MediateSortTwoValue==this.MediateSortTwo[index].name) {
                    // pid=this.MediateSortOne[index].pid
                    this.MediateSortTwoId=this.MediateSortTwo[index].id
                }
                
            }
        },
        delUpload(item,delePath){
           
            this.fileNlist.splice(item,1)
            this.fileNlistFormData.splice(item,1)
            delFiles(delePath).then(res=>{
                
                if (res.data.state==100) {
                    this.$Message.success('删除成功');
                }else{
                    this.$Message.info(res.data.message);
                }
            })

        },
        uploadSuccess(res,file){
           
            if (res.state==100) {
                this.$Message.success('上传成功');
                    var datas = {
                        name:file.name,
                        path:res.filePath
                    }
                    this.fileNlist.push(datas);
                    this.fileNlistFormData.push(res.filePath)
            }else{
                    this.$Message.info(res.data.message);
                }
        },
        cloaseModalWen(path){
            var str1 = path.split('/');
            var datas = {
                name:str1[str1.length-1],
                path:path
            }
            console.log(datas)
            this.modalWen = false;
            this.fileNlist.push(datas);
            this.fileNlistFormData.push(path)
        },
        produceDip(){
            this.$refs.dexF.dipPro()
        },
        createTJ(){
            console.log(this.mediateNo)
            let str = this.applyPeople2;
            
            let reg=/、$/gi;
            str=str.replace(reg,"");
            console.log(str)
            this.backFill.onlineLawCaseId = this.lawcaseId;
            this.backFill.day = 30;
            this.backFill.caseNo = this.mediateNo;
            this.backFill.applyPeople = str;
            console.log(this.backFill)
            this.$refs.dexF.getInfo(this.backFill)
            this.modalWen = true;
        },
        getFile(event){
            this.fileNlist = [];
   
            this.file = event.target.files[0];
            uploadFiles(this.file).then(res => {
                if(res.data.state == 100){
                    this.$Message.success('上传成功');
                    var datas = {
                        name:this.file.name,
                        id:res.data.evident.id
                    }
                    this.fileNlist.push(datas);
                }else{
                    this.$Message.info(res.data.message);
                }
            })
        },
        changeLoading () {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        closeInfo(){
            this.infoMol = false;
        },
        backHome(){
            this.$router.push({
                name: 'home_index'
            });
        },
        hhi(){
            
            this.completeMol = true
        },
        closeLiti(){
            this.completeMol = false;
        },
        cloaselawyer(){
            this.lawyerMol = false;
        },
        submint(){  
             
        },
        changePage(p){ 
            this.getList(p)
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
        changestatus(e){
           
            if(e == "同意立案"){
                this.agreeDiv = true;
            }else{
                this.agreeDiv = false;
            }
            if(e == "同意立案"){
                this.audit = 1;
            }else if(e == "不予受理"){
                this.audit = 2;
            }else if(e == "退回"){
                this.audit = 3;
            }else if(e == "补正"){
                this.audit = 4;
            }else if(e == "调解"){
                this.audit = 5;
            }else if(e == "委派调解"){
                this.audit = 6;
            }
        },
        clearNoNum(e){  
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null


        this.payMoney=e.target.value

        },
        submintCa(){    //提交审核结果
            if (this.tabSum==4) {
                if(this.auditStatus == "同意立案"){
                    this.audit = 1;
                }
                if(this.auditStatus == "调解" && this.mediateNo == ''){
                    this.$Message.info('引调号不能为空');
                    return false;
                }
                if(this.auditStatus == "委派调解" && this.mediateNo == ''){
                    this.$Message.info('引调号不能为空');
                    return false;
                }
                if(this.payMoney == ""&&this.auditStatus == "同意立案" ){
                    this.$Message.info('诉讼费不能为空');
                    return false;
                }
                var params ={
                    onlineLawCaseId:this.lawcaseId,
                    auditStatus:this.audit,
                    remark:this.remark,
                    mediateNo:this.mediateNo,
                    briefId:this.briefId,
                    files:this.fileNlistFormData
                }
                if(this.audit == 1){
                    params.caseNo=this.caseNo;
                    params.briefId=this.briefId;
                    params.courtId=this.courtId;
                    params.judgeId=this.judgeId;
                    params.clerkId=this.clerkId;
                    params.filingDate=this.filingDateStr;
                    params.litigantContent=this.litigantContent;
                    params.payMoney=this.payMoney*100
                }
                if (this.audit == 6) {
                    var params ={
                        onlineLawCaseId:this.lawcaseId,
                        mediateContent:this.mediateContent,
                        mediateNo:this.mediateNo,
                        auditStatus:this.audit,
                        briefId:this.briefId,
                        category_id:this.MediateSortOneValue,
                        dispute_id:this.MediateSortTwoValue,
                        judgeId:this.judgeId,
                        clerkIds:this.clerkIds.join(',')
                    }
                }
                auditOnlineLawCase(params).then(res => {
                    if(res.data.state == 100){
                        this.$Message.success('提交成功');
                        this.infoMol = false;
                        this.getList(this.pageNumber)
                    }else{
                        this.$Message.info(res.data.message);
                        this.changeLoading();
                    }
                })
            }else if (this.tabSum==5) {
                // this.audit == 6
                var params ={
                    onlineLawCaseId:this.lawcaseId,
                    auditStatus:6,
                    category_id:this.MediateSortOneId,
                    dispute_id:this.MediateSortTwoId,
                }
                auditOnlineLawCase(params).then(res => {
                    if(res.data.state == 100){
                        this.$Message.success('提交成功');
                        this.infoMol = false;
                        this.getList(this.pageNumber)
                    }else{
                        this.$Message.info(res.data.message);
                        this.changeLoading();
                    }
                })
            }
         
        },
        changeDate2(date){
            this.filingDateStr = new Date(date).getTime();
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
        searchList(){
            if (this.applyDate.length == 2) {
                if (this.applyDate[0] == '') {
                    this.startDate = this.applyDate[0]
                } else {
                    this.startDate = new Date(this.applyDate[0]).getTime();
                }
                if (this.applyDate[1] == '') {
                    this.endDate = this.applyDate[1]
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
        },
        getList(page){
            
            var params = {
                type:this.typeData,
                applyDateStartStr:this.startDate,
                applyDateEndStr:this.endDate,
                auditStatus:this.stateData,
                applyPeople:this.applyPeople,
                defendantName:this.defendantName,
                briefType:this.briefType,
                brief:this.brief,
                code:this.code,
                pageNumber:page,
                pageSize:6
            }
            this.loading = true;
            this.pageNumber = page;
            caseList(params).then(res => {
                this.loading = false;
                this.connectedData = [];
                if(res.data.state == 100){
                    res.data.result.content.map(item => {
                        var status;
                        if(item.auditStatus == null){
                            status = "未办理"
                        }else if (item.auditStatus == 1 || item.auditStatus == 2 || item.auditStatus == 3 || item.auditStatus == 5  ){
                            status = "已办结"
                        }else if(item.auditStatus == 4){
                            status = "退回"
                        }else if(item.auditStatus == 6){
                            status = "委派调解中"
                        }else if (item.auditStatus == 7){
                            status = "已撤回"
                        }else if (item.auditStatus == 8){
                            status = "撤诉申请中"
                        }
                        let plainTiffs = '';
                        let defendant = '';
                        console.log(item)
                        item.onlineLitigants.map(it => {
                            if(it.litigationStatus.name == '原告'){
                                plainTiffs = plainTiffs + it.litigantName + "、"
                            }else if(it.litigationStatus.name == '被告'){
                                defendant = defendant + it.litigantName + "、"
                            }
                        })
    
                        let atr = '原告' + plainTiffs.slice(0,plainTiffs.length-1) + "与被告" + defendant.slice(0,defendant.length-1) + "纠纷"; 
                        const data = {
                           id:item.id,
                           code:item.code,
                           applytime:formatDate(new Date(item.applyDate), 'yyyy-MM-dd'),
                           applytpeople:item.admin.name ? item.admin.name : "",
                           caseType:item.type == 1 ? "民商" : "执行",
                           state:status,
                           cellClassName: status == "未办理" ? { state: 'table-green-row1' } : (status == "已办结" ? { state: 'table-blue-row1' } : { state: 'table-red-row1' }),
                           remark:item.remark ? item.remark : "",
                           auditStatusOld:item.auditStatus ? item.auditStatus : "",
                           briefName:atr
                        //    briefName:item.onlineBrief ? item.onlineBrief.name : ""

                        }
                        this.connectedData.push(data)
                    })
                    this.totalPage = res.data.result.totalPages;
                }
            })
        },
        changeTab(e){
            if(e == 0){
                if(this.caInfo == false){
                    this.caInfo = true;
                }
                this.submbutton = false;
            }
            else if(e == 1){ //当事人信息
                
                this.caInfo = false;
                this.submbutton = false;
                if(this.liniList.length  != 0){
                    return false;
                }
                this.liniList = [];
                getLitigantInfo(this.lawcaseId).then(res => {
                    if(res.data.state == 100){
                        res.data.result.map(item => {
                            const data={
                                name:item.litigantName,
                                type:item.litigantType==0 ? "原告" : (item.litigantType==1 ? "被告" : "第三人"),
                                typeStatus:item.litigationStatus.name,
                                card:item.identityCard,
                                phone:item.litigantPhone,
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
                if(this.lawyerList.length  != 0){
                    return false;
                }
                this.lawyerList = [];
                getLitigantLawyerList(this.lawcaseId).then( res=>{
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
                        });
                    }
                })
            }else if(e == 3){   //附件信息
                if(this.fileInfo == false){
                    this.fileInfo = true;
                }
                this.caInfo = false;
                this.submbutton = false;
                otherGetFiles(this.lawcaseId).then(res => {
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
                this.tabSum=4
                this.caseNo="";
                this.briefId="";
                this.courtId='';
                this.judgeId='';
                this.clerkId='';
                this.filingDateStr='';
                this.payMoney='';
                // this.litigantContent='';
                this.bridfList=[];
                this.courtList=[];
                this.judgeList=[];
                this.clerkList=[];
                this.caInfo = false;
                this.fileInfo = false;
                if(this.isEdit){
                    this.submbutton = true;
                }
                
                getJudgeBriefCourt().then(res => {
                    if(res.data.state == 100){
                        res.data.briefList.map(item => {
                            let data = {
                                id:item.id,
                                name:item.name,
                            }
                            this.bridfList.push(data);
                            this.briefId = this.briefName;
                        })
                        res.data.clerkList.map(item => {
                            let data1 = {
                                id:item.id,
                                name:item.name,
                            }
                            this.clerkList.push(data1);
                        })
                        res.data.courtList.map(item => {
                            let data2 = {
                                id:item.id,
                                name:item.name,
                            }
                            this.courtList.push(data2);
                        })
                        res.data.judgeList.map(item => {
                            let data3 = {
                                id:item.id,
                                name:item.name,
                            }
                            this.judgeList.push(data3);
                        })
                    }
                })
            }else if (e == 5){  //委托调解
                this.tabSum=5
                this.submbutton = true;
            }
        },
        getMaxCaseNum(){ //获取引调号的方法
            this.getting = true;
            getMaxCaseNo().then(res => {
                this.getting = false;
                if(res.data.state == 100){
                    this.mediateNo = res.data.maxCaseNo;
                }else{
                    this.$Message.info(res.data.message+'，请重新获取引调号！');
                }
            })
            .catch(res => {
                this.getting = false;
                this.$Message.warning('网络错误');
            })   
        }
    },
    filters: {
        formatStartDate(time) {
            if (time == "") {
                return "";
            }
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    }
};
</script>
<style>
.ivu-select-dropdown-list{
    max-height:300px
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
    font-size: 0.2rem;
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
.ivu-table .table-green-row1 span{
    color:green;
}
.ivu-table .table-blue-row1 span{
    color:blue;
    
}
.ivu-table .table-red-row1 span{
    color:red;
}
.a-upload {
    padding: 4px 10px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
}
.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}
.ivu-select-dropdown-list {
    max-height: 120px;
}
</style>
