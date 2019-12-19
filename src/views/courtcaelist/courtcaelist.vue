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
.loan-Box{
    width: 90%;
    margin: 0 auto;
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
                        <Input v-model="applyPeople" clearable style="width:175px" placeholder="请输入申请人"></Input>
                    </FormItem>
                    <FormItem label="当事人：">
                        <Input v-model="defendantName" clearable style="width:175px" placeholder="请输入当事人"></Input>
                    </FormItem>
                    <FormItem label="类型：">
                        <Select v-model="briefType" clearable style="width:175px">
                            <Option value="0">涉网案件</Option>
                            <Option value="1" >涉金融案件</Option>
                            <Option value="2">其他案件</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="案由：">
                        <Input v-model="brief" clearable style="width:175px" placeholder="请输入案由"></Input>
                    </FormItem>
                    <FormItem label="状态：">
                        <Select v-model="stateData" clearable style="width:175px">
                            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="类别：">
                        <Select v-model="typeData" clearable style="width:175px">
                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="申请时间：">
                        <DatePicker v-model="applyDate" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择日期" style="width: 175px"></DatePicker>
                    </FormItem>
                    <Button @click="searchList" :loading="loading" type="primary" style="width:220px;margin-left:20px">查询</Button>
                </Form>
            </div>
        </div>
        <div class="content_main">
            <Input v-model="code" search @on-search="searchList" icon="ios-search" @on-click="searchList" @on-enter="searchList" placeholder="回执编号" style="width: 100%"></Input>
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
                                <Radio label="案件移送"></Radio>
                            </RadioGroup>
                            <div style="margin-top:30px;" v-show="agreeDiv">
                                <Form  :label-width="100" inline>
                                    <FormItem label="案件编号:" style="width: 245px;" >
                                        <Input v-model="caseNo" placeholder="请输入案件编号"></Input>
                                    </FormItem>
                                    <FormItem label="案由名称:" style="width: 245px;">
                                        <Select
                                            v-model="briefId"
                                            placeholder="请选择"
                                            style="width:230px"
                                            @on-change="selectBrief">
                                            <!-- 修复key值不唯一的报错 -->
                                            <Option v-for="(item,index) in bridfList" :value="item.name" :key="index"></Option>
                                        </Select>
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
                                    <FormItem label="案件适用程序:" style="width: 245px;" >
                                        <Select v-model="procedureId" filterable transfer placeholder="请选择">
                                            <Option v-for="item in procedure" v-bind:value="item.id">{{item.name}}</Option>
                                        </Select>
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
                            <div style="margin-top:10px"  v-show="auditStatus != '委派调解' && audit != 7">
                                <span style="display:inline-block;width:100px;text-align:right">备注：</span>
                                <Input style="margin-left: 30px;width:80%"  v-model="remark" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="备注"></Input>
                            </div>
                            <div style="margin-top:10px;height: 100px;padding-left: 33px;"  v-show="audit == 7">
                                <Select v-model="departmentId" style="width:200px">
                                    <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                            <div style="margin-top:10px;margin-left: 30px;width:80%"   v-show="auditStatus != '委派调解' && audit != 7">
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



                    <TabPane label="要素信息" v-if="element != 0">
                        <div v-if="element == 1 && elementSw" class="loan-Box">
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
                            <Form>
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
                                <FormItem label="实现债权其他费用:">
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
                                <FormItem label="核对状态:">
                                    <Button type="primary" :loading="confirmLoading" @click="checkLawCase">{{lawCaseChecked ? '未核对' : '已核对'}}</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div v-if="element == 2 && elementSw" class="loan-Box">
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
                                            <MenuItem :name="item.id" v-for="(item,index) in creditInfo">{{'信用卡（' + item.cardNo + '）'}}</MenuItem>
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
                                <FormItem label="核对状态：">
                                    <Button type="primary" :loading="confirmLoading" @click="checkLawCase">{{lawCaseChecked ? '未核对' : '已核对'}}</Button>
                                </FormItem>
                            </Form>
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
            title="当事人信息"
            >
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

        <Modal
            v-model="modal5"
            title="查看信用卡信息"
            footer-hide
            width="700px"
            >
            <div class="loan-box">
                <Form label-position="right" :label-width="150">
                    <FormItem label="信用卡卡号：" prop="num">
                        {{creditCard.num}}
                        
                    </FormItem>
                    <FormItem label="信用卡种类：" prop="type">
                        {{creditCard.type}}
                        <!-- <Input v-model="creditCard.type" :row="5" placeholder="请输入信用卡种类" style="width: 300px" /> -->
                    </FormItem>
                    <FormItem label="信用卡申请时间：" prop="applyTime">
                        {{creditCard.applyTime}}
                        <!-- <DatePicker type="date" v-model="creditCard.applyTime" placeholder="请选择时间" style="width: 300px"></DatePicker> -->
                    </FormItem>
                    <FormItem label="信用卡核准发卡时间：" prop="issueTime">
                        {{creditCard.issueTime}}
                        <!-- <DatePicker type="date" v-model="creditCard.issueTime" placeholder="请选择时间" style="width: 300px"></DatePicker> -->
                    </FormItem>
                    <FormItem label="信用额度（元）：" prop="quota">
                        {{creditCard.quota}}
                        <!-- <Input v-model="creditCard.quota" :row="5" placeholder="请输入信用额度，例如：1000.00" style="width: 300px" /> -->
                    </FormItem>
                    <FormItem label="透支利率：" prop="overRate">
                        {{creditCard.overRate}}
                        <!-- <Input v-model="creditCard.overRate" :row="5" placeholder="请输入透支利率，例如：0.005" style="width: 300px" /> -->
                    </FormItem>
                    <FormItem label="信用卡合约名称：" prop="name">
                        {{creditCard.name}}
                        
                    </FormItem>
                    <FormItem label="利息约定：" prop="interestAgreement">
                        {{creditCard.interestAgreement}}
                        
                    </FormItem>
                    <FormItem label="信用卡欠款最新截至时间：" prop="deadline">
                        {{creditCard.deadline}}
                    </FormItem>
                    <FormItem label="信用卡最新欠款本金（元）：" prop="principal">
                        {{creditCard.principal}}
                        
                    </FormItem>
                    <FormItem label="信用卡最新欠款利息（元）：" prop="interest">
                        {{creditCard.interest}}
                        
                    </FormItem>
                    <FormItem label="信用卡最新欠款滞纳金（违约金）（元）：" prop="latePayment">
                        {{creditCard.latePayment}}
                        
                    </FormItem>
                    <FormItem label="信用卡年费（元）：" prop="annualFee">
                        {{creditCard.annualFee}}
                        
                    </FormItem>
                    <FormItem label="信用卡分期手续费（元）：" prop="handlingFee">
                        {{creditCard.handlingFee}}
                        
                    </FormItem>
                    <FormItem label="其他费用项目及金额（元）：" prop="otherFee">
                        {{creditCard.otherFee}}
                        
                    </FormItem>
                    <FormItem label="违约金约定：" prop="defaultAgreement">
                        {{creditCard.defaultAgreement}}
                        
                    </FormItem>
                    <FormItem label="实现债权的费用：" prop="agreementFee">
                        {{creditCard.agreementFee}}

                    </FormItem>
                    <FormItem label="实现债权费用的约定：" prop="feeAgreement">
                        {{creditCard.feeAgreement}}
                        
                    </FormItem>
                    <FormItem label="律师费（元）：" prop="lawyerFee">
                        {{creditCard.lawyerFee}}
                        
                    </FormItem>
                    <FormItem label="保全费（元）：" prop="securityFee">
                        {{creditCard.securityFee}}
                        
                    </FormItem>
                    <FormItem label="公告费（元）：" prop="announcementFee">
                        {{creditCard.announcementFee}}
                        
                    </FormItem>
                    <FormItem label="信用卡取现手续费（元）：" prop="cashFee">
                        {{creditCard.cashFee}}
                        
                    </FormItem>
                    <FormItem label="其他项目费用（年费、取现手续费、分期手续费）的约定：" prop="otherProjectFee">
                        {{creditCard.otherProjectFee}}
                        
                    </FormItem>
                    <FormItem label="最新截止时间后利息计算标准：" prop="endStandard">
                        {{creditCard.endStandard}}
                        
                    </FormItem>
                    <FormItem label="最新截止时间后违约金（滞纳金）计算标准：" prop="endFeeStandard">
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
            </div>
            
        </Modal>
        <Modal v-model="modal7"
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
            v-model="modal6"
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
                <FormItem label="实现债权费用的约定：" prop="feeAgreement">
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
                <Button @click="checkEvidenceMethod" type="primary" size="large" v-if="isChecked == true">点击确认审核</Button>
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
                                <!-- 修复key值不唯一的报错 -->
                                <Option v-for="(item,index) in bridfList" :value="item.name" :key="index"></Option>
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
                <div style="margin-top:10px" v-show="audit != 7">
                    <span style="display:inline-block;width:100px;text-align:right">备注：</span>
                    <Input style="margin-left: 30px;width:80%"  v-model="remark" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="备注"></Input>
                </div>
                <div style="margin-top:10px;margin-left: 30px;width:80%"   v-show="auditStatus != '委派调解' && audit != 7">
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
        <Modal
            v-model="filesModal"
            width="560px"
            :mask-closable="false"
            
            title="有无原件审核">
            <div >
                <Form  :label-width="160" inline >
                    <FormItem label="有无原件：" style="width: 505px;">
                        <RadioGroup v-model="originalSh" >
                            <Radio label="0">
                                <span>无原件</span>
                            </Radio>
                            <Radio label="1">
                                <span>有原件</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer"> 
                <Button @click="filesModal = false"  type="dashed" size="large">关闭</Button>
                <Button @click="subOri" :loading="filaeLoading"  type="primary" size="large">提交</Button>
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
getMaxCaseNo,//获取引调号的api接口
checkEvidence,//审核案件证据的接口
changeOriginal,//修改是否有原件接口
transferOnlineLawCase,//案件移送接口
} from '@/api/caseInfo.js';
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
            filesModal:false,
            originalSh:'',
            fileStatus:true,
            filaeLoading:false,//原件审核相关data
            lawCaseChecked:false,//要素信息是否已核对
            confirmLoading:false,//核对按钮加载状态
            firstWord:'',
            element:0,
            elementSw:false,//要素信息显示开关，避免要素信息过长影响布局
            titleArr:['查看授信合同信息','查看借款合同信息','查看保证合同信息','查看抵押合同信息','查看质押合同信息'],
            cardId:'',
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
            guaranteeContract2:{
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
            guarantee2:[],
            couple:{
                isPublic:'',
                marry:'',
                divorce:''
            },
            creditContract:[],
            loanContract:[],
            guaranteeContract:[],
            mortgageContract:[],
            pledgeContract:[],
            procedure:[
                {name:'简易程序',id:'简易程序'},
                {name:'普通程序',id:'普通程序'}
            ],
            procedureId:'',//案件适用程序
            eviId:'',
            isChecked:false,
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
                title: "是否有原件",
                key: "isOrigin",
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
                            style: {
                                color:'#10ADF5'
                            },
                            on: {
                                click: () => {//查看并审核证据
                                    console.log(params.row);
                                    this.eviId = params.row.id;
                                    this.fileStatus = params.row.isOrigin == '有' ? true : false;
                                    this.filesModal = true;
                                    this.originalSh = params.row.isOrigin == '有' ? '1' : '0';
                                }
                            }
                            },
                            params.row.isOrigin
                        )
                    ]);
                }
              },
              {
                title: "是否已核对",
                key: "checkParam",
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
                                   this.eviId = params.row.id;
                                    if(fileStr == null){
                                        this.$Message.info("暂无附件");
                                        return false;
                                    }
                                    this.isChecked = params.row.checkParam == "已核对" ? false : true;//改变审核按钮状态
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
           departmentId:'',
           departmentList:[
               {value:'1',label:'殿前法庭'},
               {value:'2',label:'立案庭'}
           ],
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

                                                    if(res.data.result.onlineBrief.id == 'fa86bd7e1af811e9b39a00163e0af9c6'){
                                                        this.element = 1;//修改要素信息
                                                    }else if(res.data.result.onlineBrief.id == 'fa86bdfb1af811e9b39a00163e0af9c6'){
                                                        this.element = 2;//修改要素信息
                                                    }else{
                                                        this.element = 0;
                                                    }

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
                                                    this.firstWord = "原告" + plainffStr.substr(0, plainffStr.length - 1) + '与被告' + defgStr.substr(0, defgStr.length - 1);
                                                    this.litigantContent = "原告" + plainffStr.substr(0, plainffStr.length - 1) + '与被告' + defgStr.substr(0, defgStr.length - 1) + this.briefName;
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
        selectBrief(){
            this.litigantContent = this.firstWord + this.briefId;
        },
        subOri(){//有无原件状态变更
            const newStatus = this.originalSh == '1' ? true : false;
            this.filaeLoading = true;
            changeOriginal(this.eviId,this.fileStatus,newStatus).then(res => {
                this.filaeLoading = false;
                this.filesModal = false;
                if(res.data.state == 100){
                    this.$Message.success(res.data.message);
                    otherGetFiles(this.lawcaseId).then(res => {
                        if(res.data.state == 100){
                            this.EviList = [];
                            res.data.file.map(item => {
                                if(item.type == 3){
                                    const data = {
                                        name:item.eviName,
                                        proves:item.eviProve,
                                        where:item.eviSource,
                                        filePa:item.path,
                                        id:item.id,
                                        checkParam:item.checked == true ? '已核对' : '未核对',
                                        isOrigin:item.original == true ? '有' : '无'
                                    }
                                    this.EviList.push(data);
                                }
                            })
                        }
                    })
                }else{
                    this.$Message.warning(res.data.message);
                }
            }).catch(error => {
                this.$Message.warning('网络错误，请刷新重试！');
            })
        },
        time(time = +new Date()) {//时间戳转换函数
            var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
            return date.toJSON().substr(0, 19).replace('T', ' ').substring(0,10);
        },
        guaranteeChioce(name){
            this.modal7 = true;
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
            this.modal6 = true;
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
            getContractInfo(this.lawcaseId,this.partCardId,'gc',this.cardId).then(res => {
                if(res.data.state == 100){
                    this.guarantee2 = res.data.nameList;
                }
            })
        },


        checkLawCase(){
            this.confirmLoading = true;
            confirmOnLawCase(this.lawcaseId,this.lawCaseChecked).then(res => {
                this.confirmLoading = false;
                if(res.data.state == 100){
                    this.$Message.success(res.data.message);
                    this.lawCaseChecked = !this.lawCaseChecked;
                }else if(res.data.state == 101){
                    this.$Message.error(res.data.message);
                }
            })
        },

        checkEvidenceMethod(){
            this.$Modal.confirm({
                title: '提示',
                content: '是否确认审核？',
                okText: '是',
                closable:true,
                cancelText: '否',
                onOk: () => {
                    checkEvidence(this.eviId).then(res => {
                        if(res.data.state == 100){
                            this.$Message.success(res.data.message);
                            this.isChecked = false;
                            setTimeout(() => {//延迟一秒后再调用重新渲染PDF文件
                                this.filePathAry = [];
                                this.filePathAry.push(res.data.address);
                            },1000)
                            otherGetFiles(this.lawcaseId).then(res => {
                                if(res.data.state == 100){
                                    this.EviList = [];
                                    res.data.file.map(item => {
                                        if(item.type == 3){
                                            const data = {
                                                name:item.eviName,
                                                proves:item.eviProve,
                                                where:item.eviSource,
                                                filePa:item.path,
                                                id:item.id,
                                                checkParam:item.checked == true ? '已核对' : '未核对',
                                                isOrigin:item.original == true ? '有' : '无'
                                            }
                                            this.EviList.push(data);
                                        }
                                    })
                                }
                            })
                        }else{
                            this.$Message.warning(res.data.message);
                        }
                    }).catch(error => {
                        this.$Message.warning('网络错误，请刷新重试！');
                    })
                },
                onCancel: () => {
                    
                }
            });
        },
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
                files:this.fileNlistFormData,
                procedure:this.procedureId
            }
            if(this.audit == 1){
                params.caseNo=this.caseNo;
                params.briefId=this.briefId;
                params.courtId=this.courtId;
                params.judgeId=this.judgeId;
                params.clerkId=this.clerkId;
                params.filingDate=this.filingDateStr;
                params.litigantContent=this.litigantContent;
                params.payMoney=this.payMoney*100;
                params.procedure = this.procedureId;
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
            }else if(e == '案件移送'){
                this.audit = 7;
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
                    files:this.fileNlistFormData,
                    procedure:this.procedureId
                }
                if(this.audit == 1){
                    params.caseNo=this.caseNo;
                    params.briefId=this.briefId;
                    params.courtId=this.courtId;
                    params.judgeId=this.judgeId;
                    params.clerkId=this.clerkId;
                    params.filingDate=this.filingDateStr;
                    params.litigantContent=this.litigantContent;
                    params.payMoney=this.payMoney*100;
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
                if (this.audit == 7){
                    const params = {
                        onLawcaseId:this.lawcaseId,
                        place:this.departmentId 
                    }
                    this.$Spin.show();
                    transferOnlineLawCase(params).then(res => {
                        this.$Spin.hide();
                        if(res.data.state == 100){
                            this.$Message.success('提交成功');
                            this.infoMol = false;
                            this.getList(this.pageNumber);
                        }else if(res.data.state == 101){
                            this.$Message.info(res.data.message);
                        }
                    })
                    return;
                }
                this.$Spin.show();
                auditOnlineLawCase(params).then(res => {
                    this.$Spin.hide();
                    if(res.data.state == 100){
                        this.$Message.success('提交成功');
                        this.infoMol = false;
                        this.getList(this.pageNumber)
                    }else{
                        this.$Message.info(res.data.message);
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
                this.$Spin.show();
                auditOnlineLawCase(params).then(res => {
                    this.$Spin.hide();
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
                            if(it.litigationStatus.name == '原告' && it.enable){
                                plainTiffs = plainTiffs + it.litigantName + "、"
                            }else if(it.litigationStatus.name == '被告' && it.enable){
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
            this.elementSw = false;
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
                                id:item.id,
                                checkParam:item.checked == true ? '已核对' : '未核对',
                                isOrigin:item.original == true ? '有' : '无'
                            }
                            // this.eviId = item.id;
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
            }else if(e == 4){//审查意见
                this.remark = '',
                this.tabSum=4;
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
            }else if (e == 5){  //查看要素
                this.elementSw = true;
                getEdit(this.lawcaseId).then(res => {
                    if(res.data.state == 100){
                        this.lawCaseChecked = res.data.flag;
                    }
                })
                if(this.element == 1){
                    getPart(this.lawcaseId).then(res => {
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
                    getPart(this.lawcaseId).then(res => {
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
