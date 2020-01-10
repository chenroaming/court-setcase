<style>
    .boxContent{
        float: left;
        height: 205px;
        width: 45%;
        margin-right: 25px;
        overflow:hidden; 
        word-wrap:break-word;
    }
    .labelNmae{
        display: block;
        height: 30px;
        text-align: left;
        padding-left: 15px;
        margin-bottom: 5px;
    }
    .sdw{
        display: block;
        text-align: left;
        line-height: 40px;
        padding-left: 10px;
        background: #38B3FF;
        color: white;
    }
    .sdws{
        display: block;
        text-align: left;
        line-height: 40px;
        /* padding-left: 10px; */
        /* border-top:1px solid #dddee1;
        border-left:1px solid #dddee1;
        border-right:1px solid #dddee1; */
    }
    .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>


<template>
    <div>
        <div style="height:1060px;">
            <div class="boxContent">
                <p class="labelNmae">起诉书：
                    <Button type="primary" @click="upFile(3)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="qfileName"></Table>
                <input type="file" style="display:none"  name="" @change="changeFile3($event)" id="qisu">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">身份证明：
                    <Button type="primary" @click="upFile(1)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileName1"></Table>
                <input type="file" style="display:none"  name="" @change="changeFile1($event)" id="qisu1">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">授权委托材料：
                    <Button type="primary" @click="upFile(2)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileName2"></Table>
                <input type="file" style="display:none"  name="" @change="changeFile2($event)" id="qisu2">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">财产保全申请书：
                    <Button type="primary" @click="upFileShen(1)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileNameShen1"></Table>
                <input type="file" style="display:none"  name="" @change="changeFileShen1($event)" id="qisuShen1">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">调查取证申请书：
                    <Button type="primary" @click="upFileShen(2)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileNameShen2"></Table>
                <input type="file" style="display:none"  name="" @change="changeFileShen2($event)" id="qisuShen2">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">证据保全申请书：
                    <Button type="primary" @click="upFileShen(3)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileNameShen3"></Table>
                <input type="file" style="display:none"  name="" @change="changeFileShen3($event)" id="qisuShen3">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">证人出庭申请书：
                    <Button type="primary" @click="upFileShen(4)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileNameShen4"></Table>
                <input type="file" style="display:none"  name="" @change="changeFileShen4($event)" id="qisuShen4">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">现场勘验申请书：
                    <Button type="primary" @click="upFileShen(5)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileNameShen5"></Table>
                <input type="file" style="display:none"  name="" @change="changeFileShen5($event)" id="qisuShen5">
            </div>
            <div class="boxContent" style="height: 210px;">
                <p class="labelNmae">鉴定评估申请书：
                    <Button type="primary" @click="upFileShen(6)">添加</Button>
                </p>
                <Table height="168" :columns="columns1" :data="fileNameShen6"></Table>
                <input type="file" style="display:none"  name="" @change="changeFileShen6($event)" id="qisuShen6">
            </div>
        </div>
        <div style="width:100%">
            <p class="sdw">
                证据材料：
                <span @click="dowmModel" style="float:right;margin-right:10px;cursor:pointer"><Icon type="md-arrow-down" />下载模板</span>
                <span @click="showAddModel" style="float:right;margin-right:10px;cursor:pointer;margin-right:20px">+添加</span>
                
            </p>
            <Table :columns="columnsEvi" :data="EviList"></Table>
            <div style="padding-top: 10px;">
                <Upload
                    multiple
                    type="drag"
                    :on-success="handleSuccess2"
                    :show-upload-list='noFALES'
                    :before-upload="handleUpload"
                    :data="{onlineLawCaseId:this.caseId}"
                    action="/api/online/evidenceAttachment/uploadEvidenceList.jhtml">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或拖拽文件上传</p>
                    </div>
                </Upload>
            </div>
        </div>
        <!-- 立案信息确认 -->
        <Modal
        v-model="caseSure"
        width="750px"
        :mask-closable="false"
        title="立案信息确认">
            <div>
                <p class="sdw" style="text-align:center;font-weight:600">
                        案件信息
                </p>
                <div style="margin-top:10px;margin-bottom:10px">
                    <Row  style="margin-bottom:5px">
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
                    <Row  style="margin-bottom:5px">
                        <Col span="6" style=" padding-right: 5px;text-align: right;">
                            诉讼请求：
                        </Col>
                        <Col span="6" style=" padding-right: 5px">
                            {{factContent == '' ? "无" : factContent}}
                        </Col>
                        <Col span="4" style=" padding-right: 5px">
                            事实和理由：
                        </Col>
                        <Col span="6" style=" padding-right: 5px">
                            {{reasonContent == '' ? "无" : reasonContent}}
                        </Col>
                    </Row>
                </div>
                <p class="sdw" style="text-align:center;font-weight:600">
                        当事人信息
                </p>
                <div>
                    <div  style="margin-bottom:10px">
                        <p class="sdws">
                            <Icon type="person"></Icon>
                            原告信息
                        </p>
                        <Table :columns="columns" :data="plaintiffList"></Table>
                    </div>
                    <div  style="margin-bottom:10px">
                        <p class="sdws">
                            <Icon type="person"></Icon>
                            被告信息
                        </p>
                        <!-- <div  style="position:absolute;top:0;bottom:0;left:0;right:0;z-index: 99;background: rgba(255,255,255,0.5)">
                            <ClipLoader style="position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-30px" color="#40a9ff" size="60px"/>
                        </div> -->
                        <Table :columns="columns" :data="defendantList"></Table>
                    </div>
                    <!-- <Card  style="margin-bottom:10px">
                        <p slot="title">
                            <Icon type="person"></Icon>
                            第三人信息
                        </p> -->
                        <!-- <div  style="position:absolute;top:0;bottom:0;left:0;right:0;z-index: 99;background: rgba(255,255,255,0.5)">
                            <ClipLoader style="position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-30px" color="#40a9ff" size="60px"/>
                        </div> -->
                        <!-- <Table :columns="columns" :data="thirdList"></Table>
                    </Card> -->
                </div>
                <p class="sdw" style="text-align:center;font-weight:600">
                        代理人信息
                </p>
                <div style="margin-bottom:10px;">
                    <Table :columns="columnsLawyer" :data="lawyerListSure"></Table>
                </div>
                <p class="sdw" style="text-align:center;font-weight:600">
                        附件信息
                </p>
                <div style="margin-top:10px">
                    <Row  style="margin-bottom:5px">
                        <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:15px">
                            起诉状：
                        </Col>
                        <Col span="18" style=" padding-right: 5px;margin-bottom:15px">
                            <!-- {{qfileName == '' ? "无" : qfileName}} -->
                            <span v-if="qfileName.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in qfileName">{{item.name}}</p>
                        </Col>
                        <Col span="6" style=" padding-right: 5px;text-align: left;">
                            身份证明材料：
                        </Col>
                        <Col span="6" style=" padding-right: 5px">
                            <!-- {{fileName1 == '' ? "无" : fileName1}} -->
                            <span v-if="fileName1.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileName1">{{item.name}}</p>
                        </Col>
                        <Col span="5" style=" padding-right: 5px;text-align: left;">
                            授权委托材料：
                        </Col>
                        <Col span="7" style=" padding-right: 5px">
                            <!-- {{fileName2 == '' ? "无" : fileName2}} -->
                            <span v-if="fileName2.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileName2">{{item.name}}</p>
                        </Col>
                    </Row>

                    <p class="sdws">
                        申请书：
                    </p>
                    <Row :gutter="16" style="margin-bottom:5px;margin-bottom:10px">
                        <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                            财产保全申请书：
                        </Col>
                        <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                            <!-- {{fileNameShen1 == '' ? "无" : fileNameShen1}} -->
                            <span v-if="fileNameShen1.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileNameShen1">{{item.name}}</p c>
                        </Col>
                        <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                            调查取证申请书：
                        </Col>
                        <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                            <!-- {{fileNameShen2 == '' ? "无" : fileNameShen2}} -->
                            <span v-if="fileNameShen2.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileNameShen2">{{item.name}}</p>
                        </Col>
                    </Row>
                    <Row :gutter="16" style="margin-bottom:5px;margin-bottom:10px">
                        <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                            证据保全申请书：
                        </Col>
                        <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                            <!-- {{fileNameShen3 == '' ? "无" : fileNameShen3}} -->
                            <span v-if="fileNameShen3.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileNameShen3">{{item.name}}</p>
                        </Col>
                        <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                            证人出庭申请书：
                        </Col>
                        <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                            <!-- {{fileNameShen4 == '' ? "无" : fileNameShen4}} -->
                            <span v-if="fileNameShen4.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileNameShen4">{{item.name}}</p>
                        </Col>
                    </Row>
                    <Row :gutter="16" style="margin-bottom:5px;margin-bottom:10px">
                        <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                            现场勘验申请书：
                        </Col>
                        <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                            <!-- {{fileNameShen5 == '' ? "无" : fileNameShen5}} -->
                            <span v-if="fileNameShen5.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileNameShen5">{{item.name}}</p>
                        </Col>
                        <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                            鉴定评估申请书：
                        </Col>
                        <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                            <!-- {{fileNameShen6 == '' ? "无" : fileNameShen6}} -->
                            <span v-if="fileNameShen6.length == 0">无</span>
                            <p :title="item.name" class="overflow" v-for="(item,index) in fileNameShen6">{{item.name}}</p>
                        </Col>
                    </Row>
                    <div>
                        <p class="sdws">
                            证据材料：
                        </p>
                        <Table :columns="columnsEvi" :data="EviList"></Table>
                    </div>
                    <div style="color:black;text-align:left;padding-left:20px;margin-top:30px">
                        <span>是否同意诉前调解：</span>
                        <RadioGroup v-model="mediate" @on-change="changeno">
                            <Radio label="是"></Radio>
                            <Radio label="否"></Radio>
                        </RadioGroup>
                        <div style="margin-top:10px" v-if="mediate=='是'">
                            *原告方联系人：
                            <!-- <AutoComplete
                                v-model="mediatePeople"
                                placeholder="请输入原告方联系人"
                                placement="top-end"
                                transfer
                                style="width:230px" @on-change="mediatePeopleChange(mediatePeople)"> -->
                                <!-- 修改key不为唯一值的报错 -->
                                <!-- <Option v-for="(item,index) in mediatePeopleArr" :value="item.name" :key="index"></Option>
                            </AutoComplete> -->
                            <Select v-model="mediatePeople"
                            placement="top"
                            transfer
                            style="width:230px"
                            @on-change="mediatePeopleChange(mediatePeople)">
                                <Option v-for="(item,index) in mediatePeopleArr" :value="item.name" :key="index">{{ item.name }}</Option>
                            </Select>
                            <!-- <Input v-model="mediatePeople" placeholder="请输入起诉方联系人" style="width: 230px;margin-right:20px" /> -->
                            *电话：<Input v-model="meidatePhone" placeholder="请输入电话" style="width: 230px" />
                        </div>
                    </div>
                    
                    <!-- <div slot="footer">
                    </div> -->
                </div>
            </div>
            <div style="margin-top: 10px; " slot="footer">   
                <p style="text-align: center;"><Button type="info" :disabled="mediate == '否'"  @click="submitCase" >确认提交</Button></p>
            </div>
        </Modal>
        <Modal
            v-model="modalAdd"
            title="添加证据"
            :loading="loading"
            cancel-text=""
            ok-text="提交"
            @on-ok="submitEvi"
            class="dadd"
            :mask-closable="false"
            style="z-index:9999999">
            <Form :model="addFormItemEvi" :label-width="85" inline>
                <FormItem label="*证据名称:"  style="width: 435px">
                    <Input v-model="addFormItemEvi.evidenceName" :maxlength="wordLength" placeholder="请输入证据名称(限制60字)" ></Input>
                </FormItem>
                <FormItem label="页数:"  style="width: 435px">
                    <Input v-model="addFormItemEvi.pageNum" placeholder="请输入页数"></Input>
                </FormItem>
                <FormItem label="*证明对象:" style="width: 435px;">
                    <Input v-model="addFormItemEvi.evidenceObject" placeholder="请输入证明对象"  ></Input>
                </FormItem>
                <FormItem label="*证据来源:"  style="width: 435px">
                    <Input v-model="addFormItemEvi.evidenceWhere" placeholder="请输入证据来源"  ></Input>
                </FormItem>
                <FormItem label="*有无原件:"  style="width: 435px">
                    <RadioGroup v-model="addFormItemEvi.original">
                        <Radio label="1">
                            <span>有</span>
                        </Radio>
                        <Radio label="0">
                            <span>无</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="*附件:"  style="width: 435px">
                    <a href="javascript:;" class="a-upload">
                        <input type="file"  name="" @change="getFile($event)" id="upfil">点击这里上传文件
                    </a>
                    <span style='
                        padding: 4px 10px;
                        line-height: 20px;
                        position: relative;
                        color: #888;
                        background: #fafafa;
                        overflow: hidden;
                        display: inline-block;'>文件最大支持30M</span>
                    <div class="demo-spin-container" v-show='fileNlistEvi'>
                        <Spin fix>上传中..</Spin>
                    </div>
                    <div style="padding: 4px 10px;display:block;position: relative;top:-10px">
                        <p v-for="item in fileNlist">{{item.name}}<span @click="delFile(item.name,item.id)"><Icon type="close-circled"  style="cursor:pointer;margin-left:10px;"></Icon></span></p>
                    </div>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    
    export default {
        name: 'fileAdd',
        props:['lawCaseId','element'],
        data () {
            return {
                
            };
        },
        methods: {
            
        },
        mounted () {
            
        }
    };
</script>