<style>
        .steps{
            width: 200px;
            border-right: 1px solid #ccc;
            height: 100%;
            text-align: center;
            display: inline-block;
            padding-top: 20px;
        }
        .brief-box {
            text-align: left;
            overflow:scroll;
            margin-left: 15px;
            height: 300px;
            position: relative;
        }
        .steps .ivu-icon{
            font-size: 40px;
        }
        .step{
            width: 80%;
            border: 1px solid #ccc;
            height: 65px;
            margin-left: 10%;
            border-radius: 10px;
            cursor: pointer;
            margin-bottom:10px;
        }
        .ivu-table-row-highlight td{
            background-color: #007FD5;
            color: #fff;
        }
        .step span{
            color:black;
            line-height: 65px;
            font-size: 14px;
        }
        .active{
            border: 2px solid #007FD5;
        }
        .active span{
            color: #007FD5;
        }
        .content_main{
            display: inline-block;
            width: 860px;
            float: right;
                text-align: center;
                padding: 20px;
        }
        .over_flo{
            width: 860px;
            height:400px;
            overflow-y: scroll;
            overflow-x: none;
                /* padding: 20px; */
        }
        .boxContent{
            float: left;
            height: 160px;
            width: 105px;
            overflow:hidden; 
            word-wrap:break-word;
        }
        .over_flo .matr{
            width: 135px;
            height: 150px;
            border: 1px solid #ccc;
            display: inline-block;
            border-radius: 10px;
            margin: 10px;
            float: left;
        }
        .cansal{
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background: #ccc;
            color: white;
            line-height: 20px;
            font-size: 12px;
            cursor: pointer;
        }
        .over_flo .matrFile{
            width: 85px;
            height: 120px;
            border: 1px solid #ccc;
            display: inline-block;
            border-radius: 10px;
            margin: 10px;
            float: left;
            margin-top: 0px;
        }
        
        .over_flo .matrFile .ivu-icon{
            margin-top: 30px;
        }
        .add{
            cursor: pointer;
        }
        .add .ivu-icon{
            color:#ccc;
            font-size: 40px;
            margin-top: 50px;
        }
        
        .info{
            font-size: 12px;
            color: #000;
            overflow:hidden; 
            word-wrap:break-word;
            text-align: left;
            position: relative;
            padding: 5px;
        }x
        .info:before{
            content: "";
            width: 0;
            height: 100%;
            background: #999;
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
            /* top: 38%; */
            left: 0;
            text-align: center;
            cursor: pointer;
        }
        .bmbox .title{
            opacity: 0;
            /* padding-top: 40px; */
            display: inline-block;
            /* padding-bottom: 20px; */
        }
        .bmbox .ivu-icon{
            font-size: 18px;
            margin-top: 20px;
            opacity: 0;
        }
        .bmbox .ivu-icon,
        .info:hover .title,
        .info:hover .clico,
        .info:hover .post{
            opacity: 1;
            transition-delay: 0.7s;
        }
        .labelNmae{
            display: block;
            height: 30px;
            text-align: left;
            padding-left: 15px;
        }
        .maininfo-col{
            /* border-bottom: 1px solid #e9eaec;
            border-right: 1px solid #e9eaec; */
            line-height: 20px;
        }
        .content-col{
            padding:10px;
        }
        .top-col{
            text-align: center;
        }
        .top-col span{
            line-height: 50px;
        }
        .top-col p{
             line-height: 35px;
        }
        .matrFile p{
            color: #ccc;
        }
        .over_flo .matrFileShen{
            width: 130px;
            height: 58px;
            border: 1px solid #ccc;
            display: inline-block;
            border-radius: 10px;
            /* margin: 5px; */
            float: left;
            margin-top: 0px;
        }
        .over_flo .matrShen{
            float: left;
             width: 130px;
            height: 58px;
            margin: 5px;
            margin-top:0px;
        }
        .matrFileShen .ivu-icon{
            color: #ccc;
            font-size: 20px;
            margin-top: 5px;
        }
        .matrFileShen p{
            color: #ccc;
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
        .ivu-table-cell b{
            background-image:url('../../images/download.png');
            background-size: 100% 100%; 
            display:inline-block;
            cursor: pointer;
            height: 30px;
            width:30px;
        }
        .setStep{
            color:#ccc;
        }
        .setActive{
            color:#007FD5;
        }
        .demo-spin-container{
            display: inline-block;
            width: 200px;
            height: 100px;
            position: relative;
            border: 1px solid #eee;
        }
        .demo-spin-container{
            display: inline-block;
            width: 100%;
            height: 100%;
            position: relative;
        }
        .ivu-spin-fix {
            background-color: rgba(255, 255, 255, 0);
        }
        .ivu-spin-show-text .ivu-spin-dot, .ivu-spin-text {
            display: inline-block;
        }
        .ivu-form .ivu-form-item-label {
            font-size: 13px;
        }
        .ivu-form-inline .ivu-form-item {
            /* display: inline-block; */
            /* margin-right: 30px; */
            /* vertical-align: top; */
        }
        .steps .ivu-icon {
            font-size: 27px;
        }
        .setActive {
            color: #40A9FF;
        }
        .active {
            border: 2px solid #40A9FF;
        }
        .over_flo .matr {
            width: 185px;
            height: 85px;
            border: 1px solid #ccc;
            display: inline-block;
            border-radius: 10px;
            margin: 10px;
            float: left;
        }
        .add .ivu-icon {
            color: #ccc;
            font-size: 40px;
            margin-top: 10px;
        }
        .add .ivu-icon {
            color: #ccc;
            font-size: 20px;
            margin-top: 10px;
        }
        .maininfo-col {
            /* border-bottom: 1px solid #e9eaec;
            border-right: 1px solid #e9eaec; */
            line-height: 20px;
            border: none;
        }
        .vertical-center-modal{
            display: flex;
            align-items: center;
            justify-content: center;
            height:800px;
        }
        .vertical-center-modal .ivu-modal{
            top: 0;  
        }
        .ivu-modal .ivu-select-dropdown {
            position: fixed!important;
        }
        .overHides{
            display:-webkit-box;
            -webkit-box-orient: vertical; 
            -webkit-line-clamp: 2;
            overflow:hidden;
        }
        .btxa{
            display: block;
            margin-top: 0px;
            margin-right: auto;
            margin-left: auto;
            padding: 15px 30px;
            font-size: 18px;
            width: 300px;
        }
        .middleType{
            padding: 70px 70px 40px 70px;
        }
        .itemsd{
            min-height: 120px;
            display: block;
            width:100%;
            clear: both;
            margin-bottom: 10px;
            /* border-bottom: 1px solid #ccc; */
        }
        .left-namsa{
            width: 80px;
            display: inline-block;
            float: left;
            padding-top: 10px;
            margin-right:20px;
            height: 120px;
        
        }
        .handelBtns{
            width: 185px;
            height: 85px;
            /* border: 1px solid #ccc; */
            border-radius: 10px;
            margin: 10px;
            float: left;
        }
        .handelBtns button{
            margin-top: 7px;
        }
        
        .Introduction {
            font-size: 12px;
        }
        </style>
        
        <template>
        <div>
            <div style="padding:10px;padding-top:20px;padding-bottom:20px;height:100%" v-if="caseId == '' && nexts == true ">
                <!-- <h1 style="text-align:center">请选择法庭</h1>
                <div class="middleType">
                    <Button :type="noewTYpe == '0' ? 'primary' : 'dashed'" class="btxa"  shape="circle"   @click="selType(0)">涉网案件</Button><br/><br/>
                    <Button :type="noewTYpe == '1' ? 'primary' : 'dashed'" class="btxa" shape="circle" @click="selType(1)">
                        殿前法庭审判事物服务中心
                        <br/>
                        <span class="Introduction">金融，互联网，互联网知识产权</span>
                    </Button><br/><br/>
                    <Button :type="noewTYpe == '2' ? 'primary' : 'dashed'" class="btxa" shape="circle" @click="selType(2)">
                        立案庭诉讼服务中心
                        <br/>
                        <span class="Introduction">其他民商事案件</span>
                    </Button>
                </div>
                <div style="padding-right:50px;">
                    <Button @click="startAdd"  type="primary" style="width:100px;float:right;margin-right:20px">下一步</Button>
                </div> -->
                <h1 style="text-align:center">请选择案件类型</h1>
                <div class="middleType">
                    <Button :type="noewTYpe == '0' ? 'primary' : 'dashed'" class="btxa"  shape="circle"   @click="selType(0)">涉网案件</Button><br/><br/>
                    <Button :type="noewTYpe == '1' ? 'primary' : 'dashed'" class="btxa" shape="circle" @click="selType(1)">涉金融案件</Button><br/><br/>
                    <Button :type="noewTYpe == '2' ? 'primary' : 'dashed'" class="btxa" shape="circle" @click="selType(2)">其他案件</Button>
                </div>
                <div style="padding-right:50px;">
                    <Button @click="startAdd"  type="primary" style="width:100px;float:right;margin-right:20px">下一步</Button>
                </div>
            </div>
        
            <div v-show="nexts==false " style="padding:10px;padding-top:20px;padding-bottom:20px;height:100%">
                <div class="steps">
                    <div class="step active" @click="goStep(1)">
                        <span>案件信息</span>    
                    </div>
                    <Icon type="chevron-down" class="setStep"></Icon>

                    <div class="step"  @click="goStep(2)">
                        <span>当事人信息</span>
                    </div>
                    <Icon type="chevron-down" class="setStep"></Icon>

                    <div class="step"  @click="goStep(3)">
                        <span>代理人信息</span>
                    </div>
                    <Icon type="chevron-down" class="setStep"></Icon> 

                    <!--要素信息注释 <div class="step"  @click="goStep(4)" v-show="isRight === true">
                        <span>要素信息</span>
                    </div>
                    <Icon type="chevron-down" class="setStep" v-show="isRight === true"></Icon> -->

                    <div class="step"  @click="goStep(5)">
                        <span>附件与确认</span>
                    </div>
                </div>
                <div class="content_main">
                     <Form :model="addFormItem" :label-width="100" inline v-show="success">
                        <FormItem label="案件类别" style="width: 405px;">
                            <Select v-model="caseType" transfer placeholder="请选择">
                                    <Option value="1">民商案件</Option>
                                    <Option value="2">执行案件</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="标的金额" style="width: 405px;position: relative;" >
                            <input type="text" name="je"   @input="clearNoNum"  style="width: 100%;border: 1px solid #dddee1;border-radius: 5px;padding-left: 5px;" v-model="standardMoney"/><span style="color:#495060;position: absolute;top: 2px;right: 10px;">元</span>
                            <!-- <Input oninput='standardMoney=standardMoney.replace(/[^\d]/g,'')' v-model="standardMoney" placeholder="标的金额"></Input>  -->
                        </FormItem>
                        <FormItem label="案件案由" style="width: 405px;">
                            <Select v-model="onlineBriefId" filterable transfer placeholder="请选择">
                                <Option v-for="item in bridfList" v-bind:value="item.id">{{item.name}}</Option>
                            </Select>
                            <!-- <Dropdown trigger="custom" :visible="onlineBriefListShow" on-clickoutside="clickOutsideClose" style="width: 100%;">
                                <a href="javascript:void(0)" @click="handleOpen">
                                    <Input v-model="selectTitle" placeholder="请选择案件案由" clearable @on-change="remoteMethod" style="width: 100%;"/>
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <div class="brief-box">
                                        <Tree :data="onlineBriefList" :load-data="loadData" @on-select-change="onSelect"></Tree>
                                        <Spin size="large" fix v-if="loading1"></Spin>
                                    </div>
                                </DropdownMenu>
                            </Dropdown> -->
                        </FormItem>
                        <FormItem label="诉讼请求" style="width: 405px;">
                            <Input v-model="factContent" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="诉讼请求"></Input>
                        </FormItem>
                        <FormItem label="事实和理由" style="width: 405px;">
                            <Input v-model="reasonContent" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="事实和理由"></Input>
                        </FormItem>
                        <div>
                            <Button :loading="nextLoading" @click="nextStep(1)"  type="primary" style="width:100px;float:right;margin-right:20px">下一步</Button>
                        </div>
                        
                    </Form>
                    <!-- 当事人信息 -->
                    <div class="over_flo" v-show="liniAdd" style="height:450px">
                        <div class="itemsd">
                            <Icon type="contact-outline" ></Icon>
                            <div class="left-namsa">
                                <Icon type="ios-contact-outline" style="font-size:50px;display: block;"/>
                                <span style="font-size:24px;">原告</span>
                            </div>
                            <div v-for="item in liniList" v-if="item.typeStatus == '原告'" style="float:left">
                                <div class="info matr">
                                    <div class="bmbox">
                                        <span class="title" @click="getOneLini(item.id)">查看详情/修改</span>
                                        <p @click="deleLiti(item.id)"><Icon type="close-circled" ></Icon></p>
                                    </div>
                                    <p>名称：<span>{{item.name}}</span>（{{item.type}}）</p>
                                    <p>证件号：<span>{{item.card}}</span></p>
                                    <p>手机号码：<span>{{item.phone}}</span></p>
                                    <p>地址：<span>{{item.adress}}</span></p>
                                </div>
                            </div>
                            <div class="add matr" @click="openAddLini('原告')">
                                <Icon type="plus-round"></Icon>
                                <p>添加当事人信息</p>
                            </div>
                           <div class="handelBtns">
                                <Button type="primary" shape="circle" @click="gerUsualPeople('原告')"  >选择常用当事人</Button>
                                <Button type="dashed" style="border-color:#19be6b;color:#19be6b" shape="circle" @click="addUsualPeople" >添加常用当事人</Button>
                            </div>
                        </div>
                        <div class="itemsd">
                            <Icon type="contact-outline" ></Icon>
                            <div class="left-namsa">
                                <Icon type="ios-contact-outline" style="font-size:50px;display: block;"/>
                                <span style="font-size:24px;">被告</span>
                            </div>
                            <div v-for="item in liniList" v-if="item.typeStatus == '被告'" style="float:left">
                                <div class="info matr">
                                    <div class="bmbox">
                                        <span class="title" @click="getOneLini(item.id)">查看详情/修改</span>
                                        <p @click="deleLiti(item.id)"><Icon type="close-circled" ></Icon></p>
                                    </div>
                                    <p>名称：<span>{{item.name}}</span>（{{item.type}}）</p>
                                    <p>证件号：<span>{{item.card}}</span></p>
                                    <p>手机号码：<span>{{item.phone}}</span></p>
                                    <p>地址：<span>{{item.adress}}</span></p>
                                </div>
                            </div>
                            <div class="add matr" @click="openAddLini('被告')">
                                <Icon type="plus-round"></Icon>
                                <p>添加当事人信息</p>
                            </div>
                            <div class="handelBtns">
                                <Button type="primary" shape="circle" @click="gerUsualPeople('被告')"  >选择常用当事人</Button>
                            </div>
                            
                        </div>
                        <div class="itemsd">
                            <Icon type="contact-outline" ></Icon>
                            <div class="left-namsa">
                                <Icon type="ios-contact-outline" style="font-size:50px;display: block;"/>
                                <span style="font-size:24px;">第三人</span>
                            </div>
                            <div v-for="item in liniList" v-if="item.typeStatus == '第三人'" style="float:left">
                                <div class="info matr">
                                    <div class="bmbox">
                                        <span class="title" @click="getOneLini(item.id)">查看详情/修改</span>
                                        <p @click="deleLiti(item.id)"><Icon type="close-circled" ></Icon></p>
                                    </div>
                                    <p>名称：<span>{{item.name}}</span>（{{item.type}}）</p>
                                    <p>证件号：<span>{{item.card}}</span></p>
                                    <p>手机号码：<span>{{item.phone}}</span></p>
                                    <p>地址：<span>{{item.adress}}</span></p>
                                </div>
                            </div>
                            <div class="add matr" @click="openAddLini('第三人')">
                                <Icon type="plus-round"></Icon>
                                <p>添加当事人信息</p>
                            </div>
                            <div class="handelBtns">
                                <Button type="primary" shape="circle" @click="gerUsualPeople('第三人')"  >选择常用当事人</Button>
                            </div>
                        </div>
                        <!-- <div v-for="item in liniList">
                            <div class="info matr">
                                <div class="bmbox" >
                                    <span class="title" @click="getOneLini(item.id)">查看详情/修改</span>
                                    <p class="clico" @click="deleLiti(item.id)"><Icon type="close-circled" ></Icon></p>
                                </div>
                                <p>名称：<span>{{item.name}}</span>（{{item.type}}、{{item.typeStatus}}）</p>
                                <p>证件号：<span>{{item.card}}</span></p>
                                <p>手机号码：<span>{{item.phone}}</span></p>
                                <p>地址：<span>{{item.adress}}</span></p>
                            </div>
                        </div>
                        <div class="add matr" @click="openAddLini">
                            <Icon type="plus-round"></Icon>
                            <p>添加当事人信息</p>
                        </div> -->
                    </div>
                    <div v-show="liniAdd">
                        <Button @click="nextStep(2)" :loading="nextLoading" type="primary" style="width:100px;float:right;margin-right:20px">下一步</Button>
                        <Button @click="upstep(1)"   style="width:100px;float:right;margin-right:20px">上一步</Button>
                    </div>
        
                    <!-- 代理人信息 -->
                    <div class="over_flo" v-show="dailiAdd">
                        <div v-for="item in lawyerList">
                            <div class="info matr">
                                <div class="bmbox"  >
                                    <span class="title" @click="getLaw(item.id)">查看详情/修改</span>
                                    <p @click="deleLawyer(item.id)"><Icon type="close-circled" ></Icon></p>
                                </div>
                                <p>名称：{{item.name}}</p>
                                <p>证件号：{{item.card}}</p>
                                <p>手机号码：{{item.phone}}</p>
                                <p>地址：{{item.adress}}</p>
                            </div>
                        </div>
                        <div class="add matr"  @click="openAddlawyer">
                            <Icon type="plus-round"></Icon>
                            <p>添加代理人信息</p>
                        </div>
                        <div class="handelBtns">
                            <Button type="primary" shape="circle" @click="gerUsualLawyer"  >选择常用代理人</Button>
                            <Button type="dashed" style="border-color:#19be6b;color:#19be6b" shape="circle" @click="addUsualLawyer" >添加常用代理人</Button>
                        </div>
                    </div>
                    <div v-show="dailiAdd">
                        <Button @click="nextStep(3)" :loading="nextLoading" type="primary" style="width:100px;float:right;margin-right:20px">下一步</Button>
                        <Button @click="upstep(2)"   style="width:100px;float:right;margin-right:20px">上一步</Button>
                    </div>

                    <!-- 要素信息 -->
                    <!-- <div class="over_flo" v-show="elementAdd">
                        <elementInfo ref="element" v-if="isElement == 1" :lawCaseId="caseId" :partId="partId" v-on:listenToChildEvent="receive"></elementInfo>
                        <elementInfo2 ref="element2" v-if="isElement == 2" :lawCaseId="caseId" :partId="partId" v-on:listenToChildEvent="receive"></elementInfo2>
                    </div>
                    <div v-show="elementAdd">
                        <Button @click="nextStep(4)" :loading="nextLoading" type="primary" style="width:100px;float:right;margin-right:20px">下一步</Button>
                        <Button @click="upstep(3)"   style="width:100px;float:right;margin-right:20px">上一步</Button>
                    </div>      -->
                    <!-- 附件信息 -->
                    <div class="over_flo" v-show="fileAdd">
                        <div style="height:170px;">
                        <div class="boxContent">
                            <p class="labelNmae">起诉书：</p>
                            <div class="add matrFile" @click="upFile(3)" v-show="qisuSh">
                                <div class="demo-spin-container" v-show='uploadIngSpinchangeFile3'>
                                    <Spin fix>上传中..</Spin>
                                </div>
                                <div v-show='!uploadIngSpinchangeFile3'>
                                    <Icon type="plus-round"></Icon>
                                    <p>起诉书</p>
                                    <input type="file" style="display:none"  name="" @change="changeFile3($event)" id="qisu">
                                </div>
                            </div>
                            <p style="margin-top:10px;color:black">{{qfileName}}<span v-show="fileName1 != ''" class="cansal" @click="cancelFile(3)">X</span></p>
                        </div>
                        <div class="boxContent" style="width: 165px;">
                            <p class="labelNmae" style="padding-left: 0px;">身份证明及授权委托材料：</p>
        
                            <div class="add matrShen">
                                <div v-show="qisuShow1" class="add matrFileShen"  @click="upFile(1)">
                                    <div class="demo-spin-container" v-show='uploadIngSpinchangeFile1'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFile1'>
                                        <Icon type="plus-round"></Icon>
                                        <p>身份证明材料</p>
                                        <input type="file" style="display:none"  name="" @change="changeFile1($event)" id="qisu1">
                                    </div>
                                </div>
                                <p class="overHides" style="margin-top:10px;color:black">{{fileName1}}</p>
                                <span v-show="fileName1 != ''" class="cansal" @click="cancelFile(1)">X</span>
                            </div>
        
                            <div class="add matrShen">
                                <div  v-show="qisuShow2" class="add matrFileShen"  @click="upFile(2)">
                                    <div class="demo-spin-container" v-show='uploadIngSpinchangeFile2'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFile2'>
                                        <Icon type="plus-round"></Icon>
                                        <p>授权委托材料</p>
                                        <input type="file" style="display:none"  name="" @change="changeFile2($event)" id="qisu2">
                                    </div>
                                </div>
                                <p class="overHides" style="margin-top:10px;color:black">{{fileName2}}</p>           
                                <span v-show="fileName2 != ''" class="cansal" @click="cancelFile(2)">X</span>             
                            </div>
        
                            <!-- <div class="add matrFile" @click="upFile(2)" v-show="qisuShow2">
                                <Icon type="plus-round"></Icon>
                                <p>添加委托书</p>
                                <input type="file" style="display:none"  name="" @change="changeFile2($event)" id="qisu2">
                            </div>
                            <p style="margin-top:10px;color:black">{{fileName2}}<span class="cansal" @click="cancelFile(2)">X</span></p> -->
                        </div>
                        <div class="boxContent" style="width:420px">
                            <p class="labelNmae">申请书：</p>
                            <div class="add matrShen">
                                <div v-show="qisuShowShen1" class="add matrFileShen"  @click="upFileShen(1)">
                                    <div class="demo-spin-container" v-show='uploadIngSpinchangeFileShen1'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFileShen1'>
                                        <Icon type="plus-round"></Icon>
                                        <p>财产保全申请书</p>
                                        <input type="file" style="display:none"  name="" @change="changeFileShen1($event)" id="qisuShen1">
                                    </div>
                                </div>
                                <p class="overHides" style="margin-top:10px;color:black">{{fileNameShen1}}</p>
                                <span v-show="fileNameShen1 != ''" class="cansal" @click="cancelFileShen(1)">X</span>
                            </div>
                            <div class="add matrShen">
                                <div  v-show="qisuShowShen2" class="add matrFileShen"  @click="upFileShen(2)">
                                    <div class="demo-spin-container" v-show='uploadIngSpinchangeFileShen2'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFileShen2'>
                                        <Icon type="plus-round"></Icon>
                                        <p>调查取证申请书</p>
                                        <input type="file" style="display:none"  name="" @change="changeFileShen2($event)" id="qisuShen2">
                                    </div>
                                </div>
                                <p class="overHides" style="margin-top:10px;color:black">{{fileNameShen2}}</p>                        
                                <span v-show="fileNameShen2 != ''" class="cansal" @click="cancelFileShen(2)">X</span>
                            </div>
                            <div class="add matrShen">
                                <div  v-show="qisuShowShen3" class="add matrFileShen"  @click="upFileShen(3)">
                                   <div class="demo-spin-container" v-show='uploadIngSpinchangeFileShen3'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFileShen3'>
                                        <Icon type="plus-round"></Icon>
                                        <p>证据保全申请书</p>
                                        <input type="file" style="display:none"  name="" @change="changeFileShen3($event)" id="qisuShen3">
                                    </div>
                                </div>
                                <p class="overHides" style="margin-top:10px;color:black">{{fileNameShen3}}</p>             
                                <span v-show="fileNameShen3 != ''" class="cansal" @click="cancelFileShen(3)">X</span>           
                            </div>
                            <div class="add matrShen">
                                <div  v-show="qisuShowShen4" class="add matrFileShen"  @click="upFileShen(4)">
                                    <div class="demo-spin-container" v-show='uploadIngSpinchangeFileShen4'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFileShen4'>
                                        <Icon type="plus-round"></Icon>
                                        <p>证人出庭申请书</p>
                                        <input type="file" style="display:none"  name="" @change="changeFileShen4($event)" id="qisuShen4">
                                    </div>
                                </div>
                                <p class="overHides" style="margin-top:10px;color:black">{{fileNameShen4}}</p>                        
                                <span v-show="fileNameShen4 != ''" class="cansal" @click="cancelFileShen(4)">X</span>
                            </div>
                            <div class="add matrShen">
                                <div  v-show="qisuShowShen5" class="add matrFileShen"  @click="upFileShen(5)">
                                    <div class="demo-spin-container" v-show='uploadIngSpinchangeFileShen5'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFileShen5'>
                                        <Icon type="plus-round"></Icon>
                                        <p>现场勘验申请书</p>
                                        <input type="file" style="display:none"  name="" @change="changeFileShen5($event)" id="qisuShen5">
                                    </div>
                                </div>
                                <p class="overHides" style="margin-top:10px;color:black">{{fileNameShen5}}</p>                    
                                <span v-show="fileNameShen5 != ''" class="cansal" @click="cancelFileShen(5)">X</span>    
                            </div>
                            <div class="add matrShen">
                                <div  v-show="qisuShowShen6" class="add matrFileShen"  @click="upFileShen(6)">
                                    <div class="demo-spin-container" v-show='uploadIngSpinchangeFileShen6'>
                                        <Spin fix>上传中..</Spin>
                                    </div>
                                    <div v-show='!uploadIngSpinchangeFileShen6'>
                                        <Icon type="plus-round"></Icon>
                                        <p>鉴定评估申请书</p>
                                        <input type="file" style="display:none"  name="" @change="changeFileShen6($event)" id="qisuShen6">
                                    </div>
                                </div>
                                <p  class="overHides" style="margin-top:10px;color:black">{{fileNameShen6}}</p>                 
                                <span v-show="fileNameShen6 != ''" class="cansal" @click="cancelFileShen(6)">X</span>       
                            </div>
                        </div>
                        </div>
                        <div>
                            <p class="sdw">
                                证据材料：
                                 <span @click="dowmModel" style="float:right;margin-right:10px;cursor:pointer"><Icon type="md-arrow-down" />下载模板</span>
                                <span @click="showAddModel" style="float:right;margin-right:10px;cursor:pointer">+添加</span>
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
                    </div>
                    <div v-show="fileAdd" style="margin-top: 10px;">
                        <!-- <span style="float:left;padding-left: 30px;line-height: 40px;">
                            <a href="#" @click="downLoadF" style="font-size:14px;font-weight:600">点击此处</a>
                            <span  style="font-size:14px;font-weight:600;color:black">，下载文书参考模板</span>
                        </span> -->
                        <Button @click="completeCase"  type="primary" style="width:100px;float:right;margin-right:20px">完成</Button>
                        <Button @click="upstep(4)"   style="width:100px;float:right;margin-right:20px">上一步</Button>
                    </div>
                <!-- 添加/修改当事人 -->
                <Modal
                    v-model="proofModal"
                    cancel-text=""
                    :loading="loading"
                    ok-text="提交"
                    @on-ok="submit('addFormItem')"
                    width="560px"
                    :mask-closable="false"
                    :title="this.litigantId == '' ? '添加当事人' : '查看/修改当事人'">
                    <div>
                        <Form  :model="addFormItem" :label-width="100" inline :rules="ruleValidate">
                            <FormItem :label="addFormItem.litigantType == '自然人'? '姓名*' : '公司名称*'" style="width: 505px;">
                                <Input v-model="addFormItem.litigantName" placeholder="请输入当事人"></Input>
                            </FormItem>
                            <FormItem label="类型*" style="width: 245px;">
                                <Select v-model="addFormItem.litigantType" transfer placeholder="请选择">
                                    <Option value="自然人">自然人</Option>
                                    <Option value="法人">法人</Option>
                                    <Option value="非法人组织">非法人组织</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="诉讼地位*" style="width: 245px;" v-show="!isUsual">
                                <Select v-model="addFormItem.litigantStatus" transfer placeholder="请选择">
                                    <Option value="原告">原告</Option>
                                    <Option value="被告">被告</Option>
                                    <Option value="第三人">第三人</Option>
                                </Select>
                            </FormItem>
                            <FormItem :label="addFormItem.litigantType == '自然人' ? '身份证号码*' : '统一信用代码*'" style="width: 505px;" >
                                <Input v-model="addFormItem.identityCard" @on-blur="idCardtoBirth" placeholder="请输入"></Input>
                            </FormItem>
                            <FormItem label="出生日期*" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'" >
                                <DatePicker type="date" transfer :value="addFormItem.birthday" @on-change="changeDate"></DatePicker>
                            </FormItem>
                            <FormItem label="性别*" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                                <Select v-model="addFormItem.litigantSex" transfer placeholder="请选择">
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="国籍" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'" >
                                <Input v-model="addFormItem.nationality" placeholder="请输入国籍"></Input>
                            </FormItem>
                            <FormItem label="民族*" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'"   >
                                <Select v-model="addFormItem.nation" filterable transfer placeholder="请选择">
                                    <Option v-for="item in nationList" :value="item">{{item}}</Option>
                                </Select>
                                <!-- <Input v-model="addFormItem.nation" placeholder="请输入民族"></Input> -->
                            </FormItem>
                            <!-- <FormItem label="政治面貌" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                                <Select v-model="addFormItem.politicalStatus" transfer placeholder="请选择">
                                    <Option value="4">其他</Option>
                                    <Option value="3">共青团员</Option>
                                    <Option value="2">群众</Option>
                                    <Option value="1">党员</Option>
                                </Select>
                            </FormItem> -->
                            <FormItem label="文化程度" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                                <Select v-model="addFormItem.education" transfer placeholder="请选择">
                                    <Option value="小学以下">小学以下</Option>
                                    <Option value="小学">小学</Option>
                                    <Option value="初中">初中</Option>
                                    <Option value="高中">高中</Option>
                                    <Option value="大学专科">大学专科</Option>
                                    <Option value="本科">本科</Option>
                                    <Option value="研究生及以上">研究生及以上</Option>
                                </Select>
                            </FormItem>
                            
        
                            <FormItem label="当事人关系*" style="width: 245px;display:none">
                                <Select v-model="addFormItem.relationType" transfer placeholder="请选择">
                                    <Option value="0">无</Option>
                                    <Option value="1">夫妻</Option>
                                    <Option value="2">同住成员家属</Option>
                                    <Option value="3">其他</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="当事人*" style="width: 245px;display:none">
                                <Select v-model="addFormItem.relationLitigantId" transfer placeholder="请选择">
                                    <Option v-for="item in this.data" :value="item.id" :key="item.litigantName">{{ item.litigantName }}</Option>
                                </Select>
                            </FormItem>
                            
        
                            <FormItem label="手机号码*" style="width: 245px;" v-show="addFormItem.litigantType != '法人' && addFormItem.litigantType != '非法人组织'" >
                                <!-- <Input v-model="addFormItem.litigantPhone" placeholder="请输入手机号码"></Input>
                                <div style="color: #ed3f14;position:absolute;top:28px;left:5px;">多个手机号码请用逗号分隔</div> -->
                                <Dropdown @on-click="changePhone" v-if="this.litigantId != ''">
                                    <Input v-model="litigantPhoneSelect" :disabled="isDisabled" placeholder="请选择手机号" @on-change></Input>
                                    <DropdownMenu slot="list">
                                        <DropdownItem v-for="(item,index) in addFormItem.litigantPhone" :name="index">{{item}}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Input v-model="addNewPhone" placeholder="请输入手机号" v-if="this.litigantId == ''"></Input>
                                <div style="color: #ed3f14;position:absolute;top:28px;" v-if="this.litigantId == ''">多个手机号码请用逗号分隔</div>
                            </FormItem>
                            
                            <!-- <FormItem :label="addFormItem.litigantType == '自然人' ?'固定电话' : '固定电话*'" style="width: 245px;">
                                <Input v-model="addFormItem.litigantTelPhone" placeholder="请输入固定电话"></Input>
                            </FormItem> -->
                            <!-- <FormItem label="成立日期*" style="width: 245px;" v-show="addFormItem.litigantType != '自然人' && addFormItem.litigantType != '法人'">
                                <DatePicker type="date" transfer :value="addFormItem.birthday2" @on-change="changeDate2"></DatePicker>
                            </FormItem> -->
        
                            <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '法定代表人*' : '负责人*'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                                <Input v-model="addFormItem.legalManName" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入法定代表人姓名' : '请输入负责人姓名'" width="100px;"></Input>
                            </FormItem>
                            <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '联系方式*' : '联系方式*'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                                <Input v-model="addFormItem.legalManPhone"  placeholder="请输入联系方式" width="100px;"></Input>
                            </FormItem>
                            <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '职务*' : '职务*'" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                                <Input v-model="addFormItem.legalManJob" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入职务' : '请输入职务'" width="100px;"></Input>
                            </FormItem>
                            <!-- <FormItem label="身份证号码*" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                                <Input v-model="addFormItem.legalManId" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入法定代表人身份证号码' : '请输入负责人身份证号码'" width="100px;"></Input>
                            </FormItem>
                            <FormItem label="手机号码*" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                                <Input v-model="addFormItem.legalManPhone" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入法定代表人手机号码' : '请输入负责人手机号码'"></Input>
                            </FormItem> -->
        
                            <FormItem label="工作单位" style="width: 505px;" v-show="addFormItem.litigantType == '自然人'">
                                <Input v-model="addFormItem.employer" placeholder="请输入工作单位"></Input>
                            </FormItem>
                            <FormItem label="电子邮箱*" style="width: 505px" v-show="addFormItem.litigantType == '自然人'">
                                <Input v-model="addFormItem.email" placeholder="请输入电子邮箱"></Input>
                            </FormItem>
                            <FormItem :label="addFormItem.litigantType == '自然人' ? '户籍地址*' : '公司注册地址*'" style="width: 505px">
                                <Input v-model="addFormItem.nativePlace" :placeholder="addFormItem.litigantType == '自然人' ? '请输入居住地址' : '请输入公司注册地址'"></Input>
                            </FormItem>
                            <FormItem :label="addFormItem.litigantType == '自然人' ? '经常居住地址*' : '公司经营地址*'" style="width: 505px">
                                <Input v-model="addFormItem.address" :placeholder="addFormItem.litigantType == '自然人' ? '请输入经常居住地址' : '请输入公司经营地址'"></Input>
                            </FormItem>
                            <FormItem :label="addFormItem.litigantType == '自然人' ? '确认送达地址*' : '确认送达地址*'" style="width: 505px">
                                <Input v-model="addFormItem.sendAddress" placeholder="请输入送达地址"></Input>
                            </FormItem>
                            <!-- <FormItem v-show="addFormItem.litigantType == '自然人'" label="个人证明" style="width: 505px">
                                <Upload
                                 :before-upload="upLoadPf"
                                 action="/online/litigant/saveLitigantInfo.jhtml">
                                 <Button icon="ios-cloud-upload-outline">选择上传个人证明</Button>
                                </Upload>
                            </FormItem> -->
                            <FormItem label="其他送达地址" style="width: 505px" v-for="(item,key) in addFormItem.otherAddressArr">
                                <Input v-model="item.otherAddress" placeholder="请输入其他送达地址" style="width:90%"></Input><Icon @click.native='delOtherAddress(key)' style="width:10%;text-align:center;font-size:22px" type="ios-trash" />
                            </FormItem>
                            <Button size="small" type="dashed" @click.native='addOtherAddress'>添加其他地址</Button>
                        </Form>
                    </div>
                </Modal>
                <!-- 添加/修改律师 -->
                <Modal
                    v-model="lawyerModal"
                    cancel-text=""
                    :loading="loading"
                    ok-text="提交"
                    @on-ok="submitLawyer"
                    width="560px"
                    :mask-closable="false"
                    :title="this.lawyerId == '' ? '添加代理人' : '查看/修改代理人'">
                    <div>
                        <Form :model="addFormItem" :label-width="100" inline>
                            <FormItem label="代理人身份" style="width: 245px;">
                                <Select v-model="addFormItem.lawerType" transfer @on-change="changeType" placeholder="请选择">
                                    <Option v-for="item in lawerType" :value="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="当事人" style="width: 245px;" v-show="!isUsual">
                                <Select v-model="addFormItem.onlineLitigantId" transfer placeholder="请选择" >
                                    <Option v-for="item in linigantList" :value="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="姓名" style="width: 245px;">
                                <!-- <Input v-model="addFormItem.lawerName" placeholder="请输入代理人姓名"  width="100px;"></Input> -->
                                <AutoComplete v-model="addFormItem.lawerName" :data="agentData1" @on-search="actins" @on-select="selectName" placeholder="请输入代理人姓名" transfer></AutoComplete>
                            </FormItem>
                            <FormItem label="电话" style="width: 245px;">
                                <!-- <Input v-model="addFormItem.lawermobile"  placeholder="请输入代理人电话" width="100px;"></Input> -->
                                <AutoComplete v-model="addFormItem.lawermobile" :data="phoneData1" @on-search="queryAgent1" placeholder="请输入代理人电话" transfer></AutoComplete>
                            </FormItem>
                            <FormItem label="律所*" v-show="!lawyerT1" style="width: 505px;">
                                <!-- <Input v-model="addFormItem.lawIdentiCard" placeholder="请输入代理人公民身份证号码"  ></Input> -->
                                <AutoComplete v-model="addFormItem.lawyerOfficeName"  placeholder="请输入律师所属事务所" transfer></AutoComplete>
                            </FormItem>
                            <FormItem label="公民身份证号码" v-show="lawyerT1" style="width: 505px;">
                                <!-- <Input v-model="addFormItem.lawIdentiCard" placeholder="请输入代理人公民身份证号码"  ></Input> -->
                                <AutoComplete v-model="addFormItem.lawIdentiCard" :data="numData1" @on-search="queryAgent1" placeholder="请输入代理人公民身份证号码" transfer></AutoComplete>
                            </FormItem>
                            <FormItem label="公民身份证号码" v-show="!lawyerT1" style="width: 505px;">
                                <!-- <Input v-model="addFormItem.lawIdentiCard" placeholder="请输入代理人公民身份证号码"  ></Input> -->
                                <Input v-model="addFormItem.lawIdentiCard2" placeholder="请输入代理人公民身份证号码"></Input>
                            </FormItem>
                            <FormItem label="工作证件号码*" v-show="!lawyerT1" style="width: 505px;">
                                <!-- <Input v-model="addFormItem.lawerNum" placeholder="请输入代理人工作证件号码"  ></Input> -->
                                <AutoComplete v-model="addFormItem.lawIdentiCard" :data="lawNumData1" @on-search="queryAgent1" placeholder="请输入代理人工作证件号码" transfer></AutoComplete>
                            </FormItem>
                            <FormItem label="电子邮箱" style="width: 505px">
                                <Input v-model="addFormItem.email" placeholder="请输入电子邮箱"></Input>
                            </FormItem>
                            <FormItem label="联系地址"  style="width: 505px;">
                                <!-- <Input v-model="addFormItem.lawerNum" placeholder="请输入代理人联系地址"  ></Input> -->
                                <AutoComplete v-model="addFormItem.address"  placeholder="请输入代理人联系地址" transfer></AutoComplete>
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
                <!-- 立案信息确认 -->
                <Modal
                    v-model="caseSure"
                    width="750px"
                    :mask-closable="false"
                    title="立案信息确认">
                    <div>
                        <!-- <div style="width:100%;text-align:center"><span style="display:inline-block;height:15px;float:left;border-bottom:2px solid #000;width:40%;"></span><h3 style="display:inline-block">案件信息</h3><span style="display:inline-block;height:15px;float:right;border-bottom:2px solid #000;width:40%;"></span></div> -->
                        <p class="sdw" style="text-align:center;font-weight:600">
                                案件信息
                        </p>
                        <div style="margin-top:10px;margin-bottom:10px">
                            <Row  style="margin-bottom:5px">
                                <Col span="6" style=" padding-right: 5px;text-align: right;">
                                    案件类别：
                                </Col>
                                <Col span="6" style=" padding-right: 5px">
                                    {{caseTypes == '' ? "无" : caseTypes}}
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
                         <!-- <div style="width:100%;text-align:center;margin-bottom:10px"><span style="display:inline-block;height:15px;float:left;border-bottom:2px solid #000;width:40%;"></span><h3 style="display:inline-block">当事人信息</h3><span style="display:inline-block;height:15px;float:right;border-bottom:2px solid #000;width:40%;"></span></div> -->
                        <p class="sdw" style="text-align:center;font-weight:600">
                                当事人信息
                        </p>
                        <div>
                            <div  style="margin-bottom:10px">
                                <p class="sdws">
                                    <Icon type="person"></Icon>
                                    原告信息
                                </p>
                                <!-- <div  style="position:absolute;top:0;bottom:0;left:0;right:0;z-index: 99;background: rgba(255,255,255,0.5)">
                                  <ClipLoader style="position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-30px" color="#40a9ff" size="60px"/>
                                </div> -->
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
                            <div  style="margin-bottom:10px">
                                <p class="sdws">
                                    <Icon type="person"></Icon>
                                    第三人信息
                                </p>
                                <!-- <div  style="position:absolute;top:0;bottom:0;left:0;right:0;z-index: 99;background: rgba(255,255,255,0.5)">
                                  <ClipLoader style="position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-30px" color="#40a9ff" size="60px"/>
                                </div> -->
                                <Table :columns="columns" :data="thirdList"></Table>
                            </div>
                        </div>
                        <!-- <div style="width:100%;text-align:center;margin-bottom:10px"><span style="display:inline-block;height:15px;float:left;border-bottom:2px solid #000;width:40%;"></span><h3 style="display:inline-block">代理人信息</h3><span style="display:inline-block;height:15px;float:right;border-bottom:2px solid #000;width:40%;"></span></div> -->
                        <p class="sdw" style="text-align:center;font-weight:600">
                                代理人信息
                        </p>
                        <div style="margin-bottom:10px;">
                            <Table :columns="columnsLawyer" :data="lawyerListSure"></Table>
                        </div>
                        <!-- <div style="width:100%;text-align:center;margin-bottom:10px"><span style="display:inline-block;height:15px;float:left;border-bottom:2px solid #000;width:40%;"></span><h3 style="display:inline-block">已上传附件</h3><span style="display:inline-block;height:15px;float:right;border-bottom:2px solid #000;width:40%;"></span></div> -->
                        <p class="sdw" style="text-align:center;font-weight:600">
                                附件信息
                        </p>
                        <div style="margin-top:10px">
                            <Row  style="margin-bottom:5px">
                                <Col span="6" style=" padding-right: 5px;text-align: left;;margin-bottom:15px">
                                    起诉状：
                                </Col>
                                <Col span="18" style=" padding-right: 5px;margin-bottom:15px">
                                    {{qfileName == '' ? "无" : qfileName}}
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: left;">
                                    身份证明材料：
                                </Col>
                                <Col span="6" style=" padding-right: 5px">
                                    {{fileName1 == '' ? "无" : fileName1}}
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: left;">
                                    授权委托材料：
                                </Col>
                                <Col span="7" style=" padding-right: 5px">
                                    {{fileName2 == '' ? "无" : fileName2}}
                                </Col>
                            </Row>
                        
                            <Row  style="margin-bottom:5px;margin-bottom:10px">
                                <p class="sdws">
                                    申请书：
                                </p>
                                <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                                    财产保全申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                   {{fileNameShen1 == '' ? "无" : fileNameShen1}}
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                                    调查取证申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    {{fileNameShen2 == '' ? "无" : fileNameShen2}}
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                                    证据保全申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                   {{fileNameShen3 == '' ? "无" : fileNameShen3}}
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                                    证人出庭申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    {{fileNameShen4 == '' ? "无" : fileNameShen4}}
                                </Col>
                                <Col span="6" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                                    现场勘验申请书：
                                </Col>
                                <Col span="6" style=" padding-right: 5px;margin-bottom:10px">
                                   {{fileNameShen5 == '' ? "无" : fileNameShen5}}
                                </Col>
                                <Col span="5" style=" padding-right: 5px;text-align: left;margin-bottom:10px">
                                    鉴定评估申请书：
                                </Col>
                                <Col span="7" style=" padding-right: 5px;margin-bottom:10px">
                                    {{fileNameShen6 == '' ? "无" : fileNameShen6}}
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
                                <RadioGroup @on-change="changeno" v-model="mediate">
                                    <Radio label="是"></Radio>
                                    <Radio label="否"></Radio>
                                </RadioGroup>
                                <div style="margin-top:10px" v-if="mediate=='是'">
                                    *原告方联系人：
                                    <AutoComplete
                                        v-model="mediatePeople"
                                        placeholder="请输入原告方联系人"
                                        style="width:230px" @on-change="mediatePeopleChange(mediatePeople)">
                                        
                                        <Option v-for="item in mediatePeopleArr" :value="item.name" :key="item.name"></Option>
                                    </AutoComplete>
                                    <!-- <Input v-model="mediatePeople" placeholder="请输入起诉方联系人" style="width: 230px;margin-right:20px" /> -->
                                    *电话：<Input v-model="meidatePhone" placeholder="请输入电话" style="width: 230px" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; " slot="footer">
                                
                                <p style="text-align: center;"><Button type="info" :disabled="mediate == '否'"   @click="submitCase" >确认提交</Button></p>
                                
                            </div>
                </Modal>
                <Modal
                    v-model="completeMol"
                    cancel-text=""
                    :loading="loading"
                    ok-text="确定"
                    @on-ok="gotoHome"
                    width="560px"
                    :mask-closable="closeM"
                    title="立案信息确认" class-name="vertical-center-modal">
                    <div>
                        <div style="width:100%;text-align:center;margin-bottom:10px;margin-top: 60px;"><h2>提交成功！</h2></div>
                        <div style="width:100%;text-align:center;margin-bottom: 60px;">
                            <p style="margin-bottom:5px">您的回执编号是：<span style="font-weight:600">{{code}}</span><Icon type="ios-copy" v-clipboard:copy="code"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError" style="    font-size: 18px;
            margin-left: 10px;cursor: pointer;"/></p>
                            <p>可在“已申请案件”中查看审核进度和结果。</p>
                        </div>
                    </div>
                </Modal>
                <Modal
                    v-model="sureMol"
                    :loading="loading"
                    width="720px"
                    :mask-closable="false"
                    @on-cancel="submitCasecancel"
                    title="送达地址确认书">
                    <div style="height:500px;overflow-x:hidden; overflow-y:visible">
                        <div style="border-top:1px solid #e9eaec;border-left:1px solid #e9eaec;">
                            <Row>
                                <Col span="2" class="maininfo-col top-col" style="min-height: 50px;background-color: #f7f7f7;">
                                    <span>案号</span>
                                </Col>
                                <Col span="10" class="maininfo-col" style="min-height: 50px;">
                                    
                                </Col>
                                <Col span="2" class="maininfo-col  top-col" style="min-height: 50px;background-color: #f7f7f7;">
                                    <span>案由</span>
                                </Col>
                                <Col span="10" class="maininfo-col" style="min-height: 50px;"> 
                                </Col>
                            </Row>
                            <Row>
                                <Col span="2" class="maininfo-col top-col" style="min-height: 200px;background-color: #f7f7f7;">
                                    <p>告</p>
                                    <p>知</p>
                                    <p>事</p>
                                    <p>项</p>
                                </Col>
                                <Col span="22" class="maininfo-col content-col" style="min-height: 200px;">
                                    <p style="text-indent:2em">根据最高人民法院《关于以法院专递方式邮寄送达民事诉讼文书的若干规定》第一条、第三条、第四条、第五条和第十一条的规定，告知如下：</p>
                                    <p style="text-indent:2em">一、为便于当事人及时收到人民法院诉讼文书，保证诉讼程序顺利进行，当事人应当如实提供确切的送达地址；</p>
                                    <p style="text-indent:2em">二、当事人拒绝提供自己的送达地址的，自然人依其户籍登记中的住所地或者经常居住地为送达地址；法人或者其他组织以其工商登记或者其他依法登记、备案中的住所地为送达地址；</p>
                                    <p style="text-indent:2em">三、因受送达人自己提供或者确认的送达地址不准确、拒不提供送达地址、送达地址变更未及时告知人民法院、受送达人本人或者受送达人的委托代理人、指定的代收人拒绝签收，导致诉讼文书未能被受送达人实际接收的，文书退回之日视为送达之日。</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="2" class="maininfo-col top-col" style="min-height: 265px;background-color: #f7f7f7;">
                                    <p>送</p>
                                    <p>达</p>
                                    <p>地</p>
                                    <p>址</p>
                                    <p>与</p>
                                    <p>方</p>
                                    <p>式</p>
                                </Col>
                                <Col span="22" class="maininfo-col content-col" style="min-height: 265px;">
                                    <p style="text-indent:2em">当事人：{{sureMoInfo.litigantName}}</p>
                                    <p style="text-indent:2em">文书送达地址及邮政编码：{{sureMoInfo.sendAddress}}</p>
                                    <p style="text-indent:2em">收件人（如系他人，请注明与当事人关系）：{{sureMoInfo.acceptPeople}}</p>
                                    <p style="text-indent:2em">联系电话：{{sureMoInfo.litigantPhone}}</p>
                                    <p style="text-indent:2em">电子送达地址（包括传真、电子邮件等）：{{sureMoInfo.email}}</p>                            
                                    <p style="text-indent:2em;font-weight:600">本人同意人民法院可以采用传真、电子邮件等电子送达方式送达除判决书、裁定书、调解书、以外的诉讼文书，并以传真、电子邮件等送达到本人特定系统的日期为送达日期。</p>                            
                                </Col>
                            </Row>
                            <Row>
                                <Col span="2" class="maininfo-col top-col" style="min-height: 285px;background-color: #f7f7f7;">
                                    <p>当</p>
                                    <p>事</p>
                                    <p>人</p>
                                    <p>确</p>
                                    <p>认</p>
                                </Col>
                                <Col span="22" class="maininfo-col content-col" style="min-height: 285px;">
                                    <p style="text-indent:2em;font-weight:600">一、本人已阅读人民法院对当事人填写送达地址确认书的告知事项并清楚了解其内容及法律意义；</p>                                                       
                                    <p style="text-indent:2em;font-weight:600">二、本人承诺基于诚信原则进行所有诉讼活动，保证上述送达地址是准确、有效的，如无法送达，将承担相应法律责任；</p>                                                       
                                    <p style="text-indent:2em;font-weight:600">三、本人承诺，诉讼过程中，本人送达地址、联系方式（包括手机号码、传真号码、电子邮箱等）若有变更，或者中途撤销委托代理、委托新的代理人，需要变更送达地址的，将以书面形式告知人民法院，确认新的送达地址，否则，人民法院可以上述地址为送达地址；</p>                                                       
                                    <p style="text-indent:2em;font-weight:600">四、本人确认以上地址为本案一审、二审、执行、再审等程序的送达地址；</p>                                                       
                                    <p style="text-indent:2em;font-weight:600">五、若本人上诉状中地址与送达地址确定书中确认的送达地址不一致的，视为本人向人民法院提供变更后的送达地址，变更后的地址相应为本案二审、执行、再审等程序的送达地址。</p>                                                        
                                    <p style="text-align:right">{{sureMoInfo.year}}  年  {{sureMoInfo.month}}  月  {{sureMoInfo.date}}  日</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="2" class="maininfo-col top-col" style="min-height: 60px;background-color: #f7f7f7;">
                                    <span>备注</span>
                                </Col>
                                <Col span="22" class="maininfo-col content-col" style="min-height: 60px;">
                                    <p style="text-indent:2em">当事人授权委托代理人代为签收法律文书的，代理人应当同时提交当事人签名确认的本人送达地址。</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                     <div style="margin-top: 10px; " slot="footer">
                        <p style="float:left"><Checkbox @click.native="selectSure" v-model="single">我已阅读并同意以上内容</Checkbox></p><br/>
                        <p style="text-align: center;"><Button type="info" :disabled="disabled"  @click="nextStepSure"  >{{buttonStr}}</Button></p>
                        
                    </div>
                </Modal>
                <Modal
                    v-model="evidenceMol"
                    :loading="loading"
                    width="720px"
                    :mask-closable="false"
                    @on-cancel="submitCasecancel"
                    title="当事人提交电子诉讼材料技术规范">
                    <div style="height:550px;overflow-x:hidden; overflow-y:visible">
                        <tecShow />
                    </div>
                     <div style="margin-top: 10px; " slot="footer">
                        <!-- <p style="float:left"><Checkbox @click.native="selectSure" v-model="single">我已阅读并同意以上内容</Checkbox></p><br/> -->
                        <p style="text-align: center;"><Button type="info" :disabled="disabled"  @click="nextStepSure2"  >{{buttonStr}}</Button></p>
                        
                    </div>
                </Modal>
                <Modal
                    v-model="sqKnow"
                    :loading="loading"
                    width="520px"
                    :mask-closable="false"
                    @on-cancel="submitCasecancel"
                    title="诉前调解须知">
                    <div style="height:450px;overflow-x:hidden; overflow-y:visible">
                        <div style="">
                            <Row>
                                <!-- <Col span="2" class="maininfo-col top-col" style="min-height: 200px;background-color: #f7f7f7;">
                                    <p>告</p>
                                    <p>知</p>
                                    <p>事</p>
                                    <p>项</p>
                                </Col> -->
                                <Col span="24" class="maininfo-col content-col" style="min-height: 400px;">
                                    <p style="text-indent:2em;margin-bottom: 10px;">为贯彻落实多元纠纷解决机制，便捷、经济解决各类民商事纠纷，切实维护当事人合法权益，本平台将对受理的立案申请材料进行诉前登记，交调解人员先行调解和诉前送达。现将有关事项告知如下：</p>
                                    <p style="text-indent:2em;margin-bottom: 10px;">一、当事人（代理人）承诺在诉前调解阶段，配合法院的调解工作，履行相应义务，调解期限不计入案件审理期限；</p>
                                    <p style="text-indent:2em;margin-bottom: 10px;">二、双方当事人在调解期限内达成调解协议或履行义务的，应及时报告本院并办理撤案手续；</p>
                                    <p style="text-indent:2em;margin-bottom: 10px;">三、如在调解过程中发现调解人员有不当言行，应及时告知本院工作人员；</p>
                                    <p style="text-indent:2em;margin-bottom: 10px;">四、如在调解过程中发现对方有转移财产等行为可能影响到债权人权利实现的，建议您申请诉前财产保全。</p>
                                </Col>
                            </Row>
                            
                        </div>
                    </div>
                     <div style="margin-top: 10px; " slot="footer">
                        <p style="float:left"><Checkbox @click.native="selectSure2" v-model="single2"> 本人已阅读《诉前调解需知》</Checkbox></p><br/>
                        <p style="text-align: center;"><Button type="info" :disabled="disabled1"  @click="lastSubmit"  >{{buttonStrs}}</Button></p>
                        
                    </div>
                </Modal>
                <Modal
                    v-model="modalAdd"
                    title="添加证据"
                    :loading="loading"
                    cancel-text=""
                    ok-text="提交"
                    :mask-closable="false"
                    @on-ok="submitEvi"
                    class="dadd"
                    style="z-index:9999999">
                    <Form :model="addFormItemEvi" :label-width="85" inline>
                        <FormItem label="*证据名称:"  style="width: 435px">
                            <Input v-model="addFormItemEvi.evidenceName" placeholder="请输入证据名称" ></Input>
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
                <Modal
                    v-model="selUsualPeo"
                    :loading="loading"
                    width="420px"
                    :mask-closable="false"
                    title="选择常用当事人">
                    <div style="height:350px;overflow-x:hidden; overflow-y:visible">
                        <Table :columns="columnsUsual" highlight-row @on-current-change="temSel"   :data="usualList"></Table>
                    </div>
                     <div style="margin-top: 10px; " slot="footer">
                        <Button type="info"  @click="optUsual"  >确定</Button>
                    </div>
                </Modal>
                <Modal
                    v-model="selUsualLaw"
                    :loading="loading"
                    width="520px"
                    :mask-closable="false"
                    title="选择常用代理人">
                    <div style="height:350px;overflow-x:hidden; overflow-y:visible">
                        <Table :columns="columnsUsualLaw" highlight-row @on-current-change="temSel" :data="usualList"></Table>
                    </div>
                    <div>
                        <span>请选择当事人：</span>
                        <Select v-model="usualLitiId" transfer placeholder="请选择">
                            <Option v-for="item in linigantList" :value="item.id">{{ item.name }}</Option>
                        </Select>
                    </div>
                     <div style="margin-top: 10px; " slot="footer">
                        <Button type="info"  @click="optUsualLaw"  >确定</Button>
                    </div>
                </Modal>
                </div>
            </div>
        </div>
        </template>
        <script>
        import { saveLawCaseInfo, 
        saveLitigantInfo, 
        saveLawyerInfo, 
        upFiles, 
        downFiles, 
        saveFiles,
        getOneLitigant,
        updateLitigantInfo,
        addCommonPerson,
        getCmInfo,
        optCommonPerson,
        addCommonLawyer,
        getCLInfo,
        uploadEvidenceSingle,
        optCommonLawyer,
        getLawyerInfo,
        updateLawyerInfo,
        commitCae,
        userlitigant,
        getOnlineLitigantInfo,
        updateLawCaseInfo,
        deleteLitigantInfo,
        deleteLawyerInfo,
        delFiles,
        delEvidence,
        briefMenu,
        saveEvidence,
        getContacts,
        // getOnlineBrief,
        getMateBrief,
        findLitigantEvidence,
        getLitigantInfo,
        getLitigantLawyerList,
        getFiles,
        getOnlineLawCaseEdit,
        saveOrUpdateProof} from '@/api/caseInfo.js';
        import { formatDate } from '@/libs/date';
        import {
            NetworkKyc,
            findAgent
        } from '@/api/case';
        import tecShow from '@/components/diplomas/tecShow.vue';
        import elementInfo from '@/components/elementInfo/elementInfo.vue';
        import elementInfo2 from '@/components/elementInfo/elementInfo2.vue';
        export default {
            components: {
                tecShow,
                elementInfo,
                elementInfo2
            },
            data () {
                return {
                    partId:'',
                    isElement:0,
                    nextLoading:false,
                    isRight:false,
                    elementAdd:false,
                    addNewPhone:'',
                    isDisabled:true,
                    litigantPhoneSelect:'',
                    phoneIndex:0,
                    loading1:false,
                    onlineBriefList:[],
                    onlineBriefListShow:false,
                    selectTitle:'',
                    selUsualPeo:false,
                    isUsual:false,
                    usualList:[],
                    columnsUsual:[
                        {
                            title: "姓名",
                            key: "litigantName",
                            width: 150,
                            align: "center",
                        },
                        {
                            title: "证件号码",
                            key: "identityCard",
                            // width: 170,
                            align: "center",
                        },
                    ],
                    statusNow:"",
                    usualId:"",
                    selUsualLaw:false,
                    columnsUsualLaw:[
                        {
                            title: "姓名",
                            key: "litigantName",
                            width: 150,
                            align: "center",
                        },
                        {
                            title: "身份",
                            key: "type",
                            width: 100,
                            align: "center",
                        },
                        {
                            title: "证件号码",
                            key: "identityCard",
                            // width: 170,
                            align: "center",
                        },
                    ],
                    usualLitiId:"",
        
                    ten:10,
                    fileNlistEvi:false,
                    nexts:true,
                    noewTYpe:1,
                    evidenceMol:false,
                    isOpenevidenceMol:false,
                    otherAddressArr:[],
                    mediatePeople:'',
                    meidatePhone:'',
                    mediatePeopleArr:[],
                   ruleValidate: {
                        litigantName: [
                            { required: true}
                        ],
                        litigantType:[
                            { required: true}
                        ],
                        litigantStatus:[
                            { required: true}
                        ],
                        identityCard:[
                            { required: true}
                        ],
                        birthday:[
                            { required: true}
                        ],
                        litigantSex:[
                            { required: true}
                        ],
                        nationality:[
                            { required: true}
                        ],
                        nation:[
                            { required: true}
                        ],
                        litigantPhone:[
                            { required: true}
                        ],
                        nation:[
                            { required: true}
                        ],
                        nation:[
                            { required: true}
                        ],
                        nation:[
                            { required: true}
                        ],
                    },
                   onlineBriefId:"",
                   bridfList:[],
                   caseType:"",
                   noFALES:false,
                   caseTypes:'',
                   caseId:window.localStorage.getItem('newCaseId') || '',
                   standardMoney:"",
                   closeM:false,
                   single:false,
                   single2:false,
                   sureMol:false,
                   modalAdd:false,
                   showSureMo:0,
                   file:"",
                   disabled:true,
                   disabled1:true,
                   caseSure:false,
                   sqKnow:false,
                   buttonStr:"同意并继续（10）",
                   buttonStrs:'（10秒）后提交申请',
                   litigantId:"",
                   factContent:"",
                   reasonContent:"",
                   liniList:[],
                   lawyerList:[],
                   success:true, 
                   liniAdd:false,
                   dailiAdd:false,
                   fileAdd:false,
                   proofModal:false,
                   plaintiffList:[],
                   defendantList:[],
                   thirdList:[],
                   completeMol:false,
                   lawyerListSure:[],
                   stepNum:0,
                   sureMoInfo:{
        
                   },
                   EviList:[],
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
                        width: 80,
                        align: "center",
                        render: (h, params) => {
                            if(params.row.filePa == ''){
                                return h("div", [
                                h(
                                    "p",
                                    {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style:{
                                        cursor:"pointer",
                                        color:"#2d8cf0"
                                    },
                                    on: {
                                        click: () => {
                                            let that = this;
                                            let uploads = document.createElement("input");
                                            uploads.type = "file";
                                            uploads.click();
                                            console.log(this.caseId)
                                            
                                            uploads.onchange = function(){
                                                var file = uploads.files[0];
                                                const msg = that.$Message.loading({
                                                    content: '上传中...',
                                                    duration: 0
                                                });
                                                 uploadEvidenceSingle(file,that.caseId,params.row.id).then(res => {
                                                    setTimeout(msg, 500);
                                                    if(res.data.state == 100){
                                                       that.EviList.map(item => {
                                                            if(item.id == params.row.id){
                                                                item.filePa = res.data.evident.path;
                                                            }
                                                        })
                                                        that.EviList = JSON.parse(JSON.stringify(that.EviList))
                                                    }
                                                 }).catch(error => {
                                                    setTimeout(msg, 500);
                                                 })
                                            }
                                        }
                                    }
                                    },
                                    "请上传"
                                ),
                            ]);
        
                            }else{
                                return h("div", [
                                    h(
                                        "b",
                                        {
                                        props: {
                                            type: "img",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                            var fileStr = params.row.filePa;
                                                if(fileStr == null){
                                                    this.$Message.info("暂无附件");
                                                    return false;
                                                }
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
                                        ""
                                    ),
                                ]);
                            }
                            
                        }
                      },
                      {
                        title: "操作",
                        key: "attachment",
                        width: 100,
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
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "",
                                            content: "<p>确定要删除该证据吗？</p>",
                                            okText: "确定",
                                            cancelText: "取消",
                                            onOk: () => {
                                               delEvidence(params.row.id).then(res => {
                                                   if(res.data.state == 100){
                                                       this.$Message.success(res.data.message);
                                                    for(let i=0;i<this.EviList.length;i++){
                                                        if(params.row.id == this.EviList[i].id){
                                                            this.EviList.splice(i,1);
                                                        }
                                                    }
                                                   }else{
                                                      this.$Message.info(res.data.message); 
                                                   }
                                               })
                                            },
                                            onCancel: () => {
                                            
                                            }
                                        });
                                    }
                                }
                                },
                                "删除"
                            )
                            ]);
                        }
                      }
                   ],
                   columns: [
                      {
                        title: "当事人",
                        key: "litigantName",
                        width: "180px",
                        align: "center"
                      },
                      {
                        title: "身份证号/统一信用码",
                        key: "identityCard",
                        align: "center"
                      },
                      {
                        title: "手机号码",
                        key: "litigantPhone",
                        align: "center"
                      },
                      {
                        title: "地址",
                        key: "address",
                        align: "center"
                      }
                    ],
                    columnsLawyer:[
                        {
                        title: "代理人",
                        key: "litigantName",
                        width: "180px",
                        align: "center"
                      },
                      {
                        title: "身份证号/证件号码",
                        key: "identityCard",
                        align: "center"
                      },
                      {
                        title: "手机号码",
                        key: "litigantPhone",
                        align: "center"
                      },
                      {
                        title: "地址",
                        key: "address",
                        align: "center"
                      }
                    ],
                   lawyerModal:false,
                   loading:true,
                   model1:[],
                   data:[],
                   agentData1:[],
                   phoneData1:[],
                   numData1:[],
                   lawNumData1:[],
                   phone:'',
                   fileName1:"",
                   fileName2:"",
                   qfileName:"",
                   fileName3:"",
                   code:"",
                   fileName4:"",
                   fileName5:"",
                   fileName6:"",
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
                   lawyerId:'',
                   qisuShow1:true,
                   
                   onlineEAId1:"",
                   qisuShow2:true,
                   onlineEAId2:"",
                   qisuSh:true,
                   nationList:["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",
                       "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",
                       "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",
                      "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"],
                   onlineEAId3:"",
                   qisuShowShen1:true,
                   qisuShowShen2:true,
                   qisuShowShen3:true,
                   qisuShowShen4:true,
                   qisuShowShen5:true,
                   qisuShowShen6:true,
                   mediate:"是",
                   mediateState:1,
                   lawyerT1: true,
                   addFormItemEvi:{
                        evidenceName:'',
                        pageNum:'',
                        evidenceObject:'',
                        evidenceWhere:'',
                        original:''
                    },
                    fileNlist:[],
                    files:[],
                    fileN:"",
                    file:"",
                    evidenceId:"",
                   addFormItem: {
                        politicalStatus:'',
                        nationality:'',
                        education:'',
                        litigantName: '',
                        litigantSex: '',
                        onlineLitigantId:'',
                        litigantType: '自然人',
                        litigantStatus:'原告',
                        employer: '',
                        identityCard: '',
                        nation: '',
                        litigantPhone: '',
                        litigantTelPhone: '',
                        birthday: '',
                        birthday2: '',
                        email: '',
                        lawIdentiCard2:'',
                        nativePlace: '',
                        address: '',
                        legalManName: '',
                        legalManPhone: '',
                        legalManId: '',
                        sendAddress: '',
                        agentId: '',
                        lawerType: '',
                        lawerName: '',
                        lawermobile: '',
                        lawIdentiCard: '',
                        lawerNum: '',
                        lawFirm: '',
                        relationType: '',
                        relationLitigantId: '',
                        agentId1: "",
                        lawerType1: "",
                        lawerName1: "",
                        lawermobile1: "",
                        lawIdentiCard1: "",
                        lawerNum1: "",
                        otherAddressArr:[]
                    },
                    linigantList:[],
                    pathList:[],
                    typeList:[],
                    lawerType: [
                        {
                            value: 1,
                            label: '律师'
                        },
                        {
                            value: 2,
                            label: '法律工作者'
                        },
                        {
                            value: 3,
                            label: '单位工作人员'
                        },
                        {
                            value: 4,
                            label: '近亲属'
                        },
                        {
                            value: 5,
                            label: '公民'
                        }
                    ],
                    uploadIngSpinchangeFile2:false,
                    uploadIngSpinchangeFile3:false,
                    uploadIngSpinchangeFile1:false,
                    uploadIngSpinchangeFileShen1:false,
                    uploadIngSpinchangeFileShen2:false,
                    uploadIngSpinchangeFileShen6:false,
                    uploadIngSpinchangeFileShen5:false,
                    uploadIngSpinchangeFileShen4:false,
                    uploadIngSpinchangeFileShen3:false,
                    pf:null,
                };
            },
            mounted () {
                this.caseId = window.localStorage.getItem('newCaseId') || '';
                this.stepNum = window.localStorage.getItem('newItemStep') || 0;
                this.isRight = window.localStorage.getItem('isRight') == 'true' ? true : false;
                let sted = document.getElementsByClassName("step");
                let setStep = document.getElementsByClassName("setStep");
                getOnlineLawCaseEdit(this.caseId).then(res => {
                    if(res.data.state == 100){
                        this.onlineBriefId = res.data.result.onlineBrief.id;
                        if(this.onlineBriefId == 'fa86bd7e1af811e9b39a00163e0af9c6'){
                            this.isElement = 1;
                            this.isRight = true;
                            this.partId = res.data.partId;
                            window.localStorage.setItem('isRight',true);
                        }else if(this.onlineBriefId == 'fa86bdfb1af811e9b39a00163e0af9c6'){
                            this.isElement = 2;
                            this.isRight = true;
                            this.partId = res.data.partId;
                            window.localStorage.setItem('isRight',true);
                        }else{
                            this.isRight = false;
                            window.localStorage.setItem('isRight',false);
                        }
                    }
                })
                if (this.caseId != ''){ 
                    console.log(setStep,sted);
                    this.nexts = false;
                    sted[0].classList.remove('active');
                    sted[this.stepNum].classList.add('active');
                    if(this.stepNum == 1){
                        this.getLiniList();
                        this.success = false;
                        this.liniAdd = true;
                        this.stepNum = 2;
                        setStep[0].classList.add('setActive');
                    }else if(this.stepNum == 2){
                        this.getlawyerLis();
                        this.getLiniList();
                        this.success = false;
                        this.dailiAdd = true;
                        this.stepNum = 3; 
                        setStep[0].classList.add('setActive');
                        setStep[1].classList.add('setActive');                      
                    }else if(this.stepNum == 3){
                        this.getFilesL();
                        this.getLiniList();
                        this.success = false;
                        this.elementAdd = true;
                        this.stepNum = 4;
                        setStep[0].classList.add('setActive');
                        setStep[1].classList.add('setActive');
                        setStep[2].classList.add('setActive');
                    }else if(this.stepNum == 4){
                        this.getLiniList();
                        this.success = false;
                        this.fileAdd = true;
                        this.stepNum = 5;
                        setStep[0].classList.add('setActive');
                        setStep[1].classList.add('setActive');
                        setStep[2].classList.add('setActive');
                        setStep[3].classList.add('setActive');
                    }
                }
                getContacts(this.caseId).then(res=>{
                    if (res.data.state==100) {
                        this.mediatePeopleArr=res.data.data
                    }
                })
        
                // getOnlineBrief().then(res => {
                //     const data = res.data.briefList.map(item => {
                //        return {title:item.name,loading:false,children:[],id:item.id,type:item.type};
                //     })
                //     this.onlineBriefList = data;
                // })
        
            },
            watch: {
                mediatePeople(curVal,oldVal){
            　　　　console.log(curVal,oldVal);
                    for (let index = 0; index < this.mediatePeopleArr.length; index++) {
                        if (this.mediatePeopleArr[index].name==curVal) {
                            this.meidatePhone=this.mediatePeopleArr[index].phone
                        }  
                    }
            　　　},
        // standardMoney(curVal,oldVal){
        // 　　　　　　console.log(curVal,oldVal);
        //             for (let index = 0; index < this.mediatePeopleArr.length; index++) {
        //                 if (this.mediatePeopleArr[index].name==curVal) {
        //                     this.meidatePhone=this.mediatePeopleArr[index].phone
        //                 }  
        //             }
        // 　　　　},
            },
            methods: {
                receive:function(data){
                    const sted = document.getElementsByClassName("step");
                    const setStep = document.getElementsByClassName("setStep");
                    if(data == '1'){//根据要素信息或者信用卡信息从而进行是否下一步的判断
                        window.localStorage.setItem('newItemStep',4);
                        sted[3].classList.remove('active');
                        sted[4].classList.add('active');
                        setStep[3].classList.add('setActive');
                        this.stepNum = 5;
                        this.fileAdd = true;
                        this.elementAdd = false;
                    }
                    this.nextLoading = false;
                },
                upLoadPf(file){
                    this.pf = file;
                    return false;
                },
                changePhone (index){
                    this.litigantPhoneSelect = this.addFormItem.litigantPhone[index];
                    this.phoneIndex = index;
                    this.isDisabled = false;
                },
                // loadData (item, callback) {//给案由信息添加子节点
                //     getOnlineBrief(item.id).then(res => {
                //         let data = [];
                //         for (const item of res.data.briefList){
                //             if(item.type == 0){
                //                 data.push({title:item.name,id:item.id,type:item.type});
                //             }else{
                //                 data.push({title:item.name,loading:false,children:[],id:item.id,type:item.type});
                //             }
                //         }
                //         callback(data);
                //     })
                // },
                // onSelect(item, callback){//选择节点时触发
                //     console.log(item[0].title);
                //     this.onlineBriefListShow = !this.onlineBriefListShow;
                //     this.selectTitle = item[0].title;
                //     this.onlineBriefId = item[0].id;
                //     if(item[0].type == 0){
                        
                //     }else{
                //         this.$Message.warning('请选择具体的案由信息！');
                //     }
                // },
                // handleOpen (){//收缩下拉菜单
                //     this.onlineBriefListShow = !this.onlineBriefListShow;
                // },
                // remoteMethod (){//输入时动态改变树形菜单
                //     this.loading1 = true;
                //     if (this.selectTitle !== '') {
                //         this.onlineBriefListShow = true;
                //         getMateBrief(this.selectTitle).then((res)=>{
                //             let data = [];
                //             const data2 = res.data.result.map(item => {
                //                 return item.type == 0 ? data.push({title:item.name,id:item.id,type:item.type}) : data.push({title:item.name,loading:false,children:[],id:item.id,type:item.type});
                //             })
                //             this.onlineBriefList = data;
                //             this.loading1 = false;
                //         })
                //     }else{
                //         getOnlineBrief().then(res => {
                //             const data = res.data.briefList.map(item => {
                //                 return {title:item.name,loading:false,children:[],id:item.id,type:item.type};
                //             })
                //             this.onlineBriefList = data;
                //             this.loading1 = false;
                //         })
                //     }
                // },
                getLiniList(){
                    getLitigantInfo(this.caseId).then(res => {
                        if(res.data.state == 100){
                            res.data.result.map(item => {
                                const data={
                                    name:item.litigantName,
                                    type:item.litigantType==0 ? "自然人" : (item.litigantType==1 ? "法人" : "非法人组织"),
                                    typeStatus:item.litigationStatus.name,
                                    card:item.identityCard,
                                    phone:item.litigantPhone,
                                    adress:item.nativePlace,
                                    id:item.id,
                                }
                                console.log(data.phone);
                                this.liniList.push(data);
                                const data2 = {
                                    name:item.litigantName,
                                    id:item.id,
                                }
                                this.linigantList.push(data2);
                            }); 
                        }
                    })
                },
                getlawyerLis(){
                    getLitigantLawyerList(this.caseId).then( res=>{
                        if(res.data.state == 100){
                            this.lawyerList = [];
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
                },
                getFilesL(){
                    this.EviList = [];
                    getFiles(this.caseId).then(res => {
                        if(res.data.state == 100){
                            res.data.file.map(item => {
                                if(item.type == 1){
                                    this.fileName1 = item.name;
                                    this.onlineEAId1 = item.id;
                                    this.qisuShow1 = false;
                                }else if(item.type == 2){
                                    this.fileName2 = item.name;
                                    this.onlineEAId2 = item.id;
                                    this.qisuShow2 = false;
                                }else if(item.type == 3){
                                    const data = {
                                        name:item.eviName,
                                        proves:item.eviProve,
                                        where:item.eviSource,
                                        filePa:item.path ? item.path : "",
                                        id:item.id
                                    }
                                    this.EviList.push(data);
                                }else if(item.type == 4){
                                    if(item.applyType == 1){
                                        this.fileNameShen1 = item.name;
                                        this.qisuShowShen1 = false;
                                        this.onlineEAIdShen1 = item.id;
                                    }else if(item.applyType == 2){
                                        this.fileNameShen2 = item.name;
                                        this.qisuShowShen2 = false;
                                        this.onlineEAIdShen2 = item.id;
                                    }else if(item.applyType == 3){
                                        this.fileNameShen3 = item.name;
                                        this.qisuShowShen3 = false;
                                        this.onlineEAIdShen3 = item.id;
                                    }else if(item.applyType == 4){
                                        this.fileNameShen4 = item.name;
                                        this.qisuShowShen4= false;
                                        this.onlineEAIdShen4 = item.id;
                                    }else if(item.applyType == 5){
                                        this.fileNameShen5 = item.name;
                                        this.qisuShowShen5 = false;
                                        this.onlineEAIdShen5 = item.id;
                                    }else if(item.applyType == 6){
                                        this.fileNameShen6 = item.name;
                                        this.qisuShowShen6 = false;
                                        this.onlineEAIdShen6 = item.id;
                                    }
                                }else if(item.type == 5){
                                    this.qfileName = item.name;
                                    this.onlineEAId3 = item.id;
                                    this.qisuSh = false;
                                }
                            });
                        }else{
                            this.$Message.warning(res.data.message);
                            return false;
                        }
                    })
                },
                clearNoNum(e){  
                // 通过正则过滤小数点后两位
              e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        
                console.log('e',e.target.value)
                this.standardMoney=e.target.value
        
                },
                        onCopy(e){
                    console.log(e)
                    this.$Message.info('回执编号复制成功！');
        
                },
                onError(e){
                    console.log(e)
                },
                delOtherAddress(key){
                    this.addFormItem.otherAddressArr.splice(key,1); 
                },
                addOtherAddress(){
                    this.addFormItem.otherAddressArr.push({id:'',otherAddress:''})
                },
                changeLoading () {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                },
                changeno(){
                    if(this.mediate == '否'){
                        this.$Modal.info({
                            title: '提示！',
                            content: '建议您选择诉前调解，本院将竭诚为您提供诉前调解诉讼服务。如您不同意诉前调解，请到本院立案诉讼服务大厅现场办理立案手续。联系电话：0592-5308539。'
                        });
                    }
                },
                selectSure(){
                    if(this.buttonStr != "同意并继续"){
                        return false;
                    } 
                    if(this.single == false){
                        this.disabled = false;
                    }else{
                        this.disabled = true;
                    }
                },
                selectSure2(){
                    if(this.buttonStrs != "提交申请"){
                        return false;
                    } 
                    if(this.single2 == false){
                        this.disabled1 = false;
                    }else{
                        this.disabled1 = true;
                    }
                },
                showAddModel(){
                    this.addFormItemEvi = {
                        evidenceName:'',
                        pageNum:'',
                        evidenceObject:'',
                        evidenceWhere:''
                  };
                document.getElementById("upfil").value = "";
                  this.evidenceId = "";
                  this.fileN = "";
                  this.file = "";
                  this.files = [];
                  this.fileNlist = [];
                  this.modalAdd = true;
                },
                delFile(name,id){
                    delFiles(id, this.caseId).then(res => {
                        if(res.data.state == 100){
                            this.$Message.success("删除成功");
                            for(var i=0;i<this.fileNlist.length;i++){
                                if(id==this.fileNlist[i].id){
                                    this.fileNlist.splice(i,1)
                                }
                            }
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })  
                },
                getFile(event){
                    this.fileNlistEvi=true
                    this.fileNlist = [];
                    this.file = event.target.files[0];
                    let applyType = "";
                    upFiles(this.file,3,this.caseId, applyType).then(res => {
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
                        this.fileNlistEvi=false
                    })
                },
                submitEvi(){
                    if(this.addFormItemEvi.evidenceName == ""){
                      this.$Message.info('证据名称不能为空');
                      this.changeLoading();
                      return false;
                  }
                  if(this.addFormItemEvi.evidenceObject == ""){
                      this.$Message.info('证据对象不能为空');
                      this.changeLoading();
                      return false;
                  }
                  if(this.addFormItemEvi.evidenceWhere == ""){
                      this.$Message.info('证据来源不能为空');
                      this.changeLoading();
                      return false;
                  }
                  if(this.fileNlist.length == 0){
                      this.$Message.info('请上传证据文件');
                      this.changeLoading();
                      return false;
                  }
                  this.loading = true;
                  saveEvidence(
                      this.addFormItemEvi.evidenceName,
                      this.addFormItemEvi.pageNum,
                      this.addFormItemEvi.evidenceObject,
                      this.addFormItemEvi.evidenceWhere,
                      this.addFormItemEvi.original,
                      this.fileNlist[0].id).then(res => {
                          if(res.data.state == 100){
                              const data = {
                                  name:res.data.evidence.eviName,
                                  proves:this.addFormItemEvi.evidenceObject,
                                  where:this.addFormItemEvi.evidenceWhere,
                                  filePa:res.data.evidence.path ? res.data.evidence.path : "",
                                  id:res.data.evidence.id
                              }
                              this.EviList.push(data);
                              const datas = {
                                path:this.fileNlist[0].name,
                                id:this.fileNlist[0].id
                            }
                            this.pathList.push(datas);
                              this.modalAdd = false;
                              this.changeLoading();
                          }else{
                              this.$Message.info(res.data.message);
                              this.changeLoading();
                          }
                  })
                },
                dowmModel(){
                    window.open('https://court1.ptnetwork001.com/' + '/upload/evidenceAttachment/model/证据材料模板.xlsx')
                },
                handleSuccess2(res, file){
                    console.log(res)
                    console.log(file)
                    if(res.state == 100){
                        res.onlineEvidenceAttachmentList.map(item => {
                            const data = {
                                name:item.eviName,
                                proves:item.eviProve,
                                where:item.eviSource,
                                filePa:'',
                                id:item.id
                            }
                            this.EviList.push(data)
                        })
                        
                    }
                },
                handleUpload(){
        
                },
                deleLiti(id){   //删除当事人
                    findLitigantEvidence(id).then(res => {
                        if(res.data.haveEvidence == 1){
                            this.$Modal.confirm({
                                title: '提示',
                                content: '<p>确定删除当前当事人吗？</p>',
                                onOk: () => {
                                deleteLitigantInfo(id).then(res => {
                                    if(res.data.state == 100){
                                            this.$Message.success('删除成功');
                                            for(var i=0;i<this.liniList.length;i++){
                                                if(this.liniList[i].id == id){
                                                    this.liniList.splice(i,1);
                                                }
                                            }
                                            for(var i=0;i<this.linigantList.length;i++){
                                                if(this.linigantList[i].id == id){
                                                    this.linigantList.splice(i,1);
                                                }
                                            }
                                        }else{
                                            this.$Message.info(res.data.message);
                                        }
                                    })
                                },
                                onCancel: () => {}
                            });
                        }else{
                            deleteLitigantInfo(id).then(res => {
                                if(res.data.state == 100){
                                    this.$Message.success('删除成功');
                                    for(var i=0;i<this.liniList.length;i++){
                                        if(this.liniList[i].id == id){
                                            this.liniList.splice(i,1);
                                        }
                                    }
                                    for(var i=0;i<this.linigantList.length;i++){
                                        if(this.linigantList[i].id == id){
                                            this.linigantList.splice(i,1);
                                        }
                                    }
                                }else{
                                    this.$Message.info(res.data.message);
                                }
                            })
                        }
                    }); 
                },
                deleLawyer(id){   //删除代理人
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确定删除当前代理人吗？</p>',
                        onOk: () => {
                            deleteLawyerInfo(id).then(res => {
                                if(res.data.state == 100){
                                    this.$Message.success('删除成功');
                                    for(var i=0;i<this.lawyerList.length;i++){
                                        if(this.lawyerList[i].id == id){
        
                                            this.lawyerList.splice(i,1);
                                        }
                                    }
                                }else{
                                    this.$Message.info(res.data.message);
                                }
                            })
                        },
                        onCancel: () => {
                            
                        }
                    });
                },
                completeCase(){
                    this.plaintiffList=[];
                    this.defendantList=[];
                    this.thirdList=[];
                    this.lawyerListSure = [];
                    if(this.caseType == 1){
                        this.caseTypes = '民商案件';
                    }else{
                        this.caseTypes = '执行案件';
                    }
                    for(var i=0;i<this.liniList.length;i++){
                        if(this.liniList[i].typeStatus == "原告"){
                            const das = {
                                litigantName:this.liniList[i].name,
                                identityCard:this.liniList[i].card,
                                litigantPhone:this.liniList[i].phone,
                                address:this.liniList[i].adress,
                            }
                            this.plaintiffList.push(das);
                        }else if(this.liniList[i].typeStatus == "被告"){
                            const das = {
                                litigantName:this.liniList[i].name,
                                identityCard:this.liniList[i].card,
                                litigantPhone:this.liniList[i].phone,
                                address:this.liniList[i].adress,
                            }
                            this.defendantList.push(das);
                        }else if(this.liniList[i].typeStatus == "第三人"){
                            const das = {
                                litigantName:this.liniList[i].name,
                                identityCard:this.liniList[i].card,
                                litigantPhone:this.liniList[i].phone,
                                address:this.liniList[i].adress,
                            }
                            this.thirdList.push(das);
                        }
                    }
                    for(var n=0;n<this.lawyerList.length;n++){
                        const das = {
                            litigantName:this.lawyerList[n].name,
                            identityCard:this.lawyerList[n].card,
                            litigantPhone:this.lawyerList[n].phone,
                            address:this.lawyerList[n].address,
                        }
                        this.lawyerListSure.push(das);
                    }
                    this.caseSure = true;
                }, 
                lastSubmit(){
                    var filess = [];
                    for(var i=0;i<this.pathList.length;i++){
                        filess.push(this.pathList[i].path);
                    }
                    if(this.mediate == '是'){
                        this.mediateState = 1;
                        if (this.mediatePeople!=''&&this.meidatePhone!='') {
                            commitCae(this.caseId, this.mediateState, this.mediatePeople,this.meidatePhone).then(res => {
                                if(res.data.state == 100){
                                    this.code = res.data.code;
                                    this.caseSure = false;
                                    this.sqKnow = false;
                                    this.completeMol = true;
                                }else{
                                    this.$Modal.warning({
                                        title: '提示',
                                        content: res.data.message
                                    });
                                    this.changeLoading();
                                }
                            })
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: '原告联系人及电话不能为空'
                            });
                        }
                    }else{
                        this.mediateState = 0;
                        this.mediatePeople=''
                        this.meidatePhone=''
                        commitCae(this.caseId, this.mediateState, this.mediatePeople,this.meidatePhone).then(res => {
                            if(res.data.state == 100){
                                this.code = res.data.code;
                                this.caseSure = false;
                                this.sqKnow = false;
                                this.completeMol = true;
                            }else{
                                this.$Modal.warning({
                                    title: '提示',
                                    content: res.data.message
                                });
                                this.changeLoading();
                            }
                        })
                    }
                    
                },
                submitCasecancel(){
                    // alert(1)
                    this.ten= 0;
                    this.nextLoading = false;
                },
                submitCase(){
                    if (this.mediate == '是') {
                        this.mediateState = 1;
                        if (this.mediatePeople!=''&&this.meidatePhone!='') {
                            let re = /^[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
                            // alert(1)
                            if (!re.test(this.meidatePhone)) {
                        　　　　this.$Modal.warning({
                                title: '提示',
                                content: '电话必须为数字'
                            });
                        // 　　　　document.getElementById(input).value = "";
                        　　　　return false;
                        　　}
                            this.changeLoading();
                            this.sqKnow = true;
                            this.disabled1 = true;
                            if(this.ten == 10) {
                             let timer = setInterval(()=>{
                                    this.disabled1 = true;
                                    this.buttonStrs ='（'+this.ten+'秒）后提交申请';
                                    
                                    if(this.ten ===0) {
                                        clearInterval(timer);
                                        if(this.single2 == true){
                                            this.disabled1 = false;
                                        }
                                        this.buttonStrs = `提交申请`;
                                    }else{this.ten = this.ten - 1;}
                                },1000)
                            }else if(this.ten === 0) {
                                this.ten=10
                                let timer = setInterval(()=>{
                                    this.disabled1 = true;
                                    this.buttonStrs ='（'+this.ten+'秒）后提交申请';
                                    
                                    if(this.ten ===0) {
                                        clearInterval(timer);
                                        if(this.single2 == true){
                                            this.disabled1 = false;
                                        }
                                        this.buttonStrs = `提交申请`;
                                    }else{this.ten = this.ten - 1;}
                                },1000)
                            }
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: '原告人及电话不能为空'
                            })
                            
                        }
                    }else{
                        this.changeLoading();
                        this.sqKnow = true;
                        this.disabled1 = true;
                        if(this.ten == 10) {
                            let timer = setInterval(()=>{
                                this.disabled1 = true;
                                this.buttonStrs ='（'+this.ten+'秒）后提交申请';
                                
                                if(this.ten ===0) {
                                    clearInterval(timer);
                                    if(this.single2 == true){
                                        this.disabled1 = false;
                                    }
                                    this.buttonStrs = `提交申请`;
                                }else{this.ten = this.ten - 1;}
                            },1000)
                        }else if(this.ten === 0) {
                            this.ten=10
                            let timer = setInterval(()=>{
                                this.disabled1 = true;
                                this.buttonStrs ='（'+this.ten+'秒）后提交申请';
                                
                                if(this.ten ===0) {
                                    clearInterval(timer);
                                    if(this.single2 == true){
                                        this.disabled1 = false;
                                    }
                                    this.buttonStrs = `提交申请`;
                                }else{this.ten = this.ten - 1;}
                            },1000)
                        }
                    }
                    
                },
                submit(name){   //添加当事人
                    const phoneReg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if(this.addFormItem.birthday != ''){
                        var birthday = new Date(this.addFormItem.birthday).getTime();
                    }else{
                        var birthday = '';
                    }
                    if(this.addFormItem.birthday2 != ''){
                        var birthday2 = new Date(this.addFormItem.birthday2).getTime();
                    }else{
                        var birthday2 = '';
                    }
                    if(this.addFormItem.litigantType == '自然人'){
                        if(this.addFormItem.identityCard == '' && this.addFormItem.litigantStatus == "原告"){
                            this.$Message.info("原告身份证号码不能为空");
                            this.changeLoading();
                            return false;
                        }
                        let otherAddressStr=''
                        if (this.addFormItem.otherAddressArr.length>0) {
                            for (let i = 0; i < this.addFormItem.otherAddressArr.length; i++) {
                                if (i==0) {
                                    otherAddressStr=otherAddressStr+this.addFormItem.otherAddressArr[i].id+','+this.addFormItem.otherAddressArr[i].otherAddress
                                }else{
                                    otherAddressStr=otherAddressStr+','+this.addFormItem.otherAddressArr[i].id+','+this.addFormItem.otherAddressArr[i].otherAddress
                                }
                            }
                        }
                        var params = {
                            onlineLawCaseId:this.caseId,
                            litigantName:this.addFormItem.litigantName,
                            litigantType:0,
                            litigantStatus:this.addFormItem.litigantStatus,                   
                            litigantSex:this.addFormItem.litigantSex == '男' ? 0 : 1,
                            nativePlace:this.addFormItem.nativePlace,
                            nation:this.addFormItem.nation,
                            identityType:0,
                            identityCard:this.addFormItem.identityCard,
                            litigantPhone:'',
                            // litigantTelPhone:this.addFormItem.litigantTelPhone,
                            address:this.addFormItem.address,
                            sendAddress:this.addFormItem.sendAddress,
                            birthday:birthday,
                            employer:this.addFormItem.employer,
                            email:this.addFormItem.email,
                            nationality:this.addFormItem.nationality,
                            // politicalStatus:this.addFormItem.politicalStatus,
                            education:this.addFormItem.education,
                            otherAddress:otherAddressStr
                        }
                    }else{
                        if(this.addFormItem.litigantType == '法人'){
                            var liniType = 1;
                        }else{
                            var liniType = 2;
                        }
                        if(this.addFormItem.legalManPhone == '' ){
                            this.$Message.info("法人联系方式不能为空");
                            this.changeLoading();
                            return false;
                        }
                        let otherAddressStr=''
                        if (this.addFormItem.otherAddressArr.length>0) {
                            for (let i = 0; i < this.addFormItem.otherAddressArr.length; i++) {
                                const element = array[i];
                                if (i===0) {
                                    otherAddressStr=otherAddressStr+this.addFormItem.otherAddressArr[i].id+','+this.addFormItem.otherAddressArr[i].otherAddress
                                }else{
                                    otherAddressStr=otherAddressStr+','+this.addFormItem.otherAddressArr[i].id+','+this.addFormItem.otherAddressArr[i].otherAddress
                                }
                            }
                        }
                        console.log(otherAddressStr)
                        var params = {
                            onlineLawCaseId:this.caseId,
                            litigantName:this.addFormItem.litigantName,
                            litigantType:liniType,
                            litigantStatus:this.addFormItem.litigantStatus,                   
                            identityType:1,
                            // birthday:birthday2,
                            litigantPhone:'',
                            // litigantTelPhone:this.addFormItem.litigantTelPhone,
                            identityCard:this.addFormItem.identityCard,
                            legalManName:this.addFormItem.legalManName,
                            legalManPhone:this.addFormItem.legalManPhone,
                            // legalManId:this.addFormItem.legalManId,
                            nativePlace:this.addFormItem.nativePlace,
                            address:this.addFormItem.address,
                            sendAddress:this.addFormItem.sendAddress,
                            email:this.addFormItem.email,
                            legalManJob:this.addFormItem.legalManJob,
                            otherAddress:otherAddressStr
                        }
                    }
                    console.log(this.litigantId)
                    if(this.isUsual){   //添加常用当事人
                        params.litigantStatus = undefined;
                        const checkPhone = this.addNewPhone.split(',').every((item) => {
                            return phoneReg.test(item);
                        })
                        if(!checkPhone && this.addFormItem.litigantType == '自然人'){
                            this.changeLoading();
                            return this.$Message.warning('手机号码格式不正确！');
                        }
                        params.litigantPhone = this.addNewPhone;
                        addCommonPerson(params).then(res => {
                            if(res.data.state == 100){
                                this.$Message.success('添加成功');
                                this.isUsual = false;
                                this.proofModal = false;
                            }else{
                                this.$Message.info(res.data.message);
                                this.changeLoading();
                            }
                        })
                    }else{
                         if(this.litigantId != ""){  //修改当事人
                            params.onlineLitigantId = this.litigantId;
                            if (!phoneReg.test(this.litigantPhoneSelect) && this.addFormItem.litigantType == '自然人'){
                                this.changeLoading();
                                return this.$Message.warning('手机号码格式不正确！');
                            }
                            this.addFormItem.litigantPhone[this.phoneIndex] = this.litigantPhoneSelect;
                            const newlitigantPhone = this.addFormItem.litigantPhone.join(',');
                            params.litigantPhone = newlitigantPhone;
                            updateLitigantInfo(params).then(res => {
                                if(res.data.state == 100){
                                    this.$Message.success('修改成功');
                                    for(var i=0;i<this.liniList.length;i++){
                                        if(this.liniList[i].id == this.litigantId){
                                            this.liniList[i].name = this.addFormItem.litigantName;
                                            this.liniList[i].type = this.addFormItem.litigantType;
                                            this.liniList[i].typeStatus = this.addFormItem.litigantStatus;
                                            this.liniList[i].card = this.addFormItem.identityCard;
                                            this.liniList[i].phone = newlitigantPhone;
                                            this.liniList[i].adress = this.addFormItem.nativePlace;
                                        }
                                    }
                                    for(let i = 0;i < this.linigantList.length;i++){
                                        if(this.linigantList[i].id == res.data.onlineLitigant.id){
                                            this.linigantList[i].name = res.data.onlineLitigant.litigantName;
                                        }
                                    }
                                    this.proofModal = false;
                                }else{
                                    this.$Message.info(res.data.message);
                                    this.changeLoading();
                                }
                            })
                            return false;
                        }
                        const checkPhone = this.addNewPhone.split(',').every((item) => {
                            return phoneReg.test(item);
                        })
                        if(!checkPhone && this.addFormItem.litigantType == '自然人'){
                            this.changeLoading();
                            return this.$Message.warning('手机号码格式不正确！');
                        }
                        params.litigantPhone = this.addNewPhone;
                        saveLitigantInfo(params).then(res => {
                            if(res.data.state == 100){
                                this.$Message.success('添加成功');
                                const data={
                                    name:this.addFormItem.litigantName,
                                    type:this.addFormItem.litigantType,
                                    typeStatus:this.addFormItem.litigantStatus,
                                    card:this.addFormItem.identityCard,
                                    phone:this.addNewPhone,
                                    adress:this.addFormItem.nativePlace,
                                    id:res.data.onlineLitigant.id,
                                }
                                this.liniList.push(data);
                                const data2 = {
                                    name:this.addFormItem.litigantName,
                                    id:res.data.onlineLitigant.id,
                                }
                                this.linigantList.push(data2);
                                this.proofModal = false;
                            }else{
                                this.$Message.info(res.data.message);
                                this.changeLoading();
                            }
                        })
                    }
                },
                getOneLini(id){ //获取当事人信息
                    this.clearAddfortem();
                    this.litigantId=id
                    getOneLitigant(id).then(res => {
                        if(res.data.state == 100){
                            // this.addFormItem.politicalStatus=res.data.onlineLitigant.politicalStatus;
                            this.addFormItem.nationality=res.data.onlineLitigant.nationality;
                            this.addFormItem.education=res.data.onlineLitigant.education;
                            this.addFormItem.litigantName= res.data.onlineLitigant.litigantName;           
                            this.addFormItem.litigantSex= res.data.onlineLitigant.litigantSex == 0 ? "男" : "女";
                            this.addFormItem.litigantType= res.data.onlineLitigant.litigantType == 0 ? "自然人" : (res.data.onlineLitigant.litigantType == 1 ?  "法人" : "非法人组织");
                            this.addFormItem.litigantStatus=res.data.onlineLitigant.litigationStatus.name;
                            this.addFormItem.employer= res.data.onlineLitigant.employer;
                            this.addFormItem.identityCard= res.data.onlineLitigant.identityCard;
                            this.addFormItem.legalManJob = res.data.onlineLitigant.legalManJob ? res.data.onlineLitigant.legalManJob : "";
                            this.addFormItem.nation= res.data.onlineLitigant.nation;
                            this.addFormItem.litigantPhone= res.data.onlineLitigant.litigantPhone.split(',');
                            this.addFormItem.litigantTelPhone= res.data.onlineLitigant.litigantTelPhone;
                            this.addFormItem.birthday= res.data.onlineLitigant.birthday;
                            this.addFormItem.birthday2= res.data.onlineLitigant.birthday;
                            this.addFormItem.email= res.data.onlineLitigant.email;
                            this.addFormItem.nativePlace= res.data.onlineLitigant.nativePlace;
                            this.addFormItem.address= res.data.onlineLitigant.address;
                            this.addFormItem.legalManName= res.data.onlineLitigant.legalManName;           
                            this.addFormItem.legalManPhone= res.data.onlineLitigant.legalManPhone;
                            this.addFormItem.legalManId= res.data.onlineLitigant.legalManId;
                            this.addFormItem.sendAddress= res.data.onlineLitigant.sendAddress;
                            let otherAddressArr=[]
                            for (let index = 0; index < res.data.onlineLitigant.onlineLitigantAddresses.length; index++) {
                                if (res.data.onlineLitigant.onlineLitigantAddresses[index].type==3) {
                                    otherAddressArr.push(res.data.onlineLitigant.onlineLitigantAddresses[index])
                                }
                                
                            }
                            otherAddressArr.map((item, index) => {
                                const datar = {};
                                datar.otherAddress = item.address;
                                datar.id = item.id;
                                this.addFormItem.otherAddressArr.push(datar)
                            })
                                this.isUsual = false;
                                this.proofModal = true;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                },
                gotoHome(){
                    this.$router.push({
                        name: "home_index"
                    });
                },
                submitLawyer(){ //添加律师
                 var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    var regMobile=/^1[3456789]\d{9}$/;
                    var regPhone =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
                    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
                    var regNum=/(^[A-Za-z0-9]+$)/
                    console.log(this.addFormItem.email)
                    // if(!reg.test(this.addFormItem.email)){
                    //     this.$Message.warning('邮箱格式有误，请检查');
                    //     this.changeLoading();
                    //     return false;
                    // }
                    
                    if (this.addFormItem.lawIdentiCard2) {
                        if(!regIdNo.test(this.addFormItem.lawIdentiCard2)){
                            this.$Message.warning('身份证格式有误，请检查');
                            this.changeLoading();
                            return false;
                        }
                    }
                    if(!regMobile.test(this.addFormItem.lawermobile)&&!regPhone.test(this.addFormItem.lawermobile)){
                        this.$Message.warning('手机格式有误，请检查');
                        this.changeLoading();
                        return false;
                    }
                    if(this.addFormItem.lawerType == 1 || this.addFormItem.lawerType == 2){
                        if(!regIdNo.test(this.addFormItem.lawIdentiCard2)){
                            this.$Message.warning('身份证格式有误，请检查');
                            this.changeLoading();
                            return false;
                        }
                        if(!this.addFormItem.lawyerOfficeName){
                            this.$Message.warning('律师事务所不能为空');
                            this.changeLoading();
                            return false;
                        }
                        var params = {
                            lawyerType:this.addFormItem.lawerType,
                            onlineLitigantId:this.addFormItem.onlineLitigantId,
                            name:this.addFormItem.lawerName,
                            lawyerIdcard:this.addFormItem.lawIdentiCard,
                            identicard:this.addFormItem.lawIdentiCard2,
                            lawyerOfficeName:this.addFormItem.lawyerOfficeName,
                            email:this.addFormItem.email,
                            phone:this.addFormItem.lawermobile,
                            address:this.addFormItem.address,
                        }
                        var cards = this.addFormItem.lawIdentiCard2;
                    }else{
                         if(!regIdNo.test(this.addFormItem.lawIdentiCard)){
                            this.$Message.warning('身份证格式有误，请检查');
                            this.changeLoading();
                            return false;
                        }
                        var cards = this.addFormItem.lawIdentiCard;
                        var params = {
                            lawyerType:this.addFormItem.lawerType,
                            onlineLitigantId:this.addFormItem.onlineLitigantId,
                            name:this.addFormItem.lawerName,
                            identicard:this.addFormItem.lawIdentiCard,
                            email:this.addFormItem.email,
                            phone:this.addFormItem.lawermobile,
                            address:this.addFormItem.address,
                        }
                    }
                    if(this.isUsual){   //添加常用代理人
                        params.onlineLitigantId = undefined;
                        addCommonLawyer(params).then(res => {
                            if(res.data.state == 100){
                                this.$Message.success('添加成功');
                                this.isUsual = false;
                                this.lawyerModal = false;
                            }else{
                                this.$Message.info(res.data.message);
                                this.changeLoading();
                            }
                        })
                    }else{
                        if(this.lawyerId != ""){
                            params.onlineLawyerId = this.lawyerId;
                            updateLawyerInfo(params).then(res => {
                                if(res.data.state == 100){
                                    this.$Message.success('修改成功');
                                        for(var i=0;i<this.lawyerList.length;i++){
                                            if(this.lawyerList[i].id == this.lawyerId){
                                                this.lawyerList[i].name = this.addFormItem.lawerName;
                                                this.lawyerList[i].card = cards;
                                                this.lawyerList[i].phone = this.addFormItem.lawermobile;
                                                this.lawyerList[i].adress = this.addFormItem.address;
                                            }
                                        }
                                        this.lawyerModal = false;
                                    }else{
                                        this.$Message.info(res.data.message);
                                        this.changeLoading();
                                    }
                            })
                            return false;
                        }
                        saveLawyerInfo(params).then(res => {
                            if(res.data.state == 100){
                                this.$Message.success('添加成功');
                                const data={
                                    name:this.addFormItem.lawerName,
                                    card:this.addFormItem.lawIdentiCard,
                                    phone:this.addFormItem.lawermobile,
                                    adress:this.addFormItem.address,
                                    id:res.data.onlineLawyer.id,
                                }
                                this.lawyerList.push(data);
                                this.lawyerModal = false;
                            }else{
                                this.$Message.info(res.data.message);
                                this.changeLoading();
                            }
                        })
                    }
                    
                },
                getLaw(id){   //获取代理人信息
                    this.clearAddfortem();
                    this.lawyerId = id;
                    getLawyerInfo(id).then(res => {
                        if(res.data.state == 100){
                            this.addFormItem.onlineLitigantId = res.data.onlineLitigant.id;
                            this.addFormItem.lawerType= res.data.onlineLawyer.type;
                            this.addFormItem.lawerName= res.data.onlineLawyer.name;
                            this.addFormItem.lawermobile= res.data.onlineLawyer.phone;
                            this.addFormItem.email = res.data.onlineLawyer.email;
                            this.addFormItem.lawyerOfficeName = res.data.onlineLawyer.lawyerOfficeName ? res.data.onlineLawyer.lawyerOfficeName : "";
                            this.addFormItem.lawIdentiCard= res.data.onlineLawyer.lawyerIdcard;
                            this.addFormItem.lawIdentiCard2= res.data.onlineLawyer.identicard;
                            this.addFormItem.lawerNum = res.data.onlineLawyer.lawyerIdcard;
                            this.addFormItem.address = res.data.onlineLawyer.address;
                            this.isUsual = false;
                            this.lawyerModal = true;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                },
                changeType (e) {
                    if (e == 1 || e == 2) {
                        this.lawyerT1 = false;
                    } else {
                        this.lawyerT1 = true;
                    }
                },
                changeType1 (e) {
                    if (e == 1 || e == 2) {
                        this.lawyerT2 = false;
                    } else {
                        this.lawyerT2 = true;
                    }
                },
                downLoadF(){
                    // window.open("api/online/evidenceAttachment/downFiles.jhtml")
                    // try{ 
                    //     console.log(111)
                    //     var elemIF = document.createElement("iframe");   
                    //     elemIF.src = "https://court1.ptnetwork001.com/api/online/evidenceAttachment/downFiles.jhtml";   
                    //     elemIF.style.display = "none";   
                    //     document.body.appendChild(elemIF);   
                    // }catch(e){ 
                    //     zzrw.alert("下载异常！");
                    // } 
                },
                selectName (value) {
                    console.log(value)
                    this.addFormItem.lawerName = "";
                    
                    var showName = value.split('(')
                    console.log(showName)
                    this.addFormItem.lawerName = showName[0];
                    console.log(this.addFormItem.lawerName)
                    var index = this.arr1.indexOf(value);
                    this.addFormItem.agentId = this.idData1[index];
                    console.log('agentId为' + this.agentId)
                    this.addFormItem.lawermobile = this.phoneData1[index];
                    this.addFormItem.lawIdentiCard = this.numData1[index];
                    console.log('phone为' + this.addFormItem.lawIdentiCard)
                },
                actins(value){
                    clearTimeout(this.queryAgent1.timer);
                    var that = this;
                    var mustApplyTime = 1000;
                    this.queryAgent1._cur=Date.now();  //记录当前时间
        
                    if(!this.queryAgent1._start){      //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
                        this.queryAgent1._start=this.queryAgent1._cur;
                    }
                    if(this.queryAgent1._cur-this.queryAgent1._start>mustApplyTime){ 
                    //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
                        that.queryAgent1(value);
                        that.queryAgent1._start=that.queryAgent1._cur;
                    }else{
                        this.queryAgent1.timer=setTimeout(function(){
                            that.queryAgent1(value);
                        },500);
                    }
                    // this.queryAgent.timeoutId = setTimeout(function(){
                    //     that.queryAgent(value);
                    // },500);
                },
                queryAgent1 (value) {
                    this.numData1 = !value ? [] : [
                        value,
                    ];
                    var lawyerNam = '';
                    var agentIdentiCard = '';
                    var lawerNum = "";
                    findAgent(value,lawyerNam,  lawerNum).then(res => {
                        if (res.data.state == 100) {
                            if (res.data.lawyers != []) {
                                var arr1 = [];
                                var ary = res.data.lawyers;
        
                                for (var i = 0; i < ary.length; i++) {
                                    this.numData1.push(ary[i].agentIdentiCard);
                                }
                            }
                        }
                    })
                },
                idCardtoBirth () {
                    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    if (reg.test(this.addFormItem.identityCard)) {
                        this.addFormItem.birthday =
                            this.addFormItem.identityCard.substring(6, 10) +
                            '-' +
                            this.addFormItem.identityCard.substring(10, 12) +
                            '-' +
                            this.addFormItem.identityCard.substring(12, 14);
                    }
                    let str = this.addFormItem.identityCard.substr(this.addFormItem.identityCard.length-2, 1);
                    console.log(str)
                    if(str == 1 || str == 3 || str == 5 || str == 7 || str == 9){
                        this.addFormItem.litigantSex = '男';
                    }else{
                        this.addFormItem.litigantSex = '女';
                    }
                },
                changeDate (date) {
                    this.addFormItem.birthday = new Date(date).getTime();
                },
                changeDate2(date){
                    console.log(date)
                    this.addFormItem.birthday2 = new Date(date).getTime();
                },
                goStep(num){
                    if(this.stepNum == 0){
                        return false;
                    }
                    let nextN = false;
                    if(num <= this.stepNum){
                        nextN = true;
                    }
                    if(nextN){
                        let sted = document.getElementsByClassName("step");
                        this.changeStep();
                        this.upstep(num);
                    }else{
                        return false;
                    }
                },
                selType(t){
                    this.noewTYpe = t;
                },
                startAdd(){
                    briefMenu(this.noewTYpe).then(res => {
                        if(res.data.state == 100){
                            this.bridfList = res.data.result;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                    this.nexts = false;
                    window.localStorage.removeItem('newCaseId');
                    window.localStorage.setItem('newItemStep',0);
                },
                nextStepSure(){
                    var sted = document.getElementsByClassName("step");
                    this.liniAdd = false;
                    this.dailiAdd = true;
                    var setStep = document.getElementsByClassName("setStep");
                    setStep[1].classList.add('setActive');
                    sted[1].classList.remove('active');
                    sted[2].classList.add('active');
                    this.stepNum = 3;
                    this.showSureMo = 1;
                    this.sureMol = false;
                    this.nextLoading = false;
                },
                nextStep(dex){
                    this.nextLoading = true;
                    var sted = document.getElementsByClassName("step");
                    var setStep = document.getElementsByClassName("setStep");            
                    if(dex == 1){
                        if(this.caseId != ""){
                            const params = {
                                // param:JSON.stringify(huif)
                                onlineLawCaseId:this.caseId,
                                type:this.caseType,
                                onlineBriefId:this.onlineBriefId,
                                standardMoney:this.standardMoney,
                                factContent:this.factContent,
                                reasonContent:this.reasonContent,
                            }
                            updateLawCaseInfo(params).then(res => {
                                this.nextLoading = false;
                                if(res.data.state == 100){
                                    this.$Message.success('修改成功');
                                    this.caseId = res.data.onlineLawCase.id;
                                    this.success = false;
                                    this.liniAdd = true;
                                    sted[0].classList.remove('active');
                                    sted[1].classList.add('active');
                                    setStep[0].classList.add('setActive');
                                    window.localStorage.setItem('newItemStep',dex);
                                    if(this.onlineBriefId == 'fa86bd7e1af811e9b39a00163e0af9c6' || this.onlineBriefId == 'fa86bdfb1af811e9b39a00163e0af9c6'){
                                        this.isRight = true;
                                        window.localStorage.setItem('isRight',true);
                                    }else{
                                        this.elementAdd = false;
                                        this.isRight = false;
                                        window.localStorage.setItem('isRight',false);
                                    }
                                }else{
                                    this.$Message.info(res.data.message);
                                }
                            })
                            return false;  
                        }
                        const params = {
                            // param:JSON.stringify(huif)
                            type:this.caseType,
                            onlineBriefId:this.onlineBriefId,
                            standardMoney:this.standardMoney,
                            factContent:this.factContent,
                            reasonContent:this.reasonContent,
                            // place:this.noewTYpe
                        }
        
                        saveLawCaseInfo(params).then(res => {
                            this.nextLoading = false;
                            if(res.data.state == 100){
                                this.$Message.success(res.data.message);
                                this.caseId = res.data.onlineLawCase.id;
                                this.success = false;
                                this.liniAdd = true;
                                sted[0].classList.remove('active');
                                sted[1].classList.add('active');
                                this.stepNum = 2;
                                setStep[0].classList.add('setActive');
                                window.localStorage.setItem('newCaseId',this.caseId);
                                window.localStorage.setItem('newItemStep',dex);
                                if(this.onlineBriefId == 'fa86bd7e1af811e9b39a00163e0af9c6'){
                                    this.isElement = 1;
                                    this.isRight = true;
                                    window.localStorage.setItem('isRight',true);
                                }else if(this.onlineBriefId == 'fa86bdfb1af811e9b39a00163e0af9c6'){
                                    this.isElement = 2;
                                    this.isRight = true;
                                    window.localStorage.setItem('isRight',true);
                                }else{
                                    this.elementAdd = false;
                                    this.isRight = false;
                                    window.localStorage.setItem('isRight',false);
                                }
                            }else{
                                this.$Message.info(res.data.message);
                            }
                        })    
                    }else if(dex == 2){
                        if(this.showSureMo == 1){
                            this.nextStepSure();
                            return false;
                        }
                        this.disabled = true;
                        this.single = false;
                        var that = this;
                        userlitigant(this.caseId).then(res => {
                            this.nextLoading = false;
                            if(res.data.state == 100){
                                getOnlineLitigantInfo(this.caseId).then(ress => {
                                    if(ress.data.state == 100){
                                        this.sureMol = true;
                                        if(ress.data.onlineLitigant != null){
                                            if(ress.data.onlineLitigant.litigantType == 0){
                                                that.sureMoInfo.litigantName = ress.data.onlineLitigant.litigantName; 
                                                that.sureMoInfo.acceptPeople = ress.data.onlineLitigant.litigantName;
                                            }else{
                                                that.sureMoInfo.litigantName = ress.data.onlineLitigant.litigantName;
                                                that.sureMoInfo.acceptPeople = ress.data.onlineLitigant.legalManName;
                                            }
                                            that.sureMoInfo.sendAddress = ress.data.onlineLitigant.sendAddress;
                                            
                                            that.sureMoInfo.litigantPhone = ress.data.onlineLitigant.litigantPhone;
                                            that.sureMoInfo.email = ress.data.onlineLitigant.email;
                                        }
                                        that.sureMoInfo.year = new Date().getFullYear();
                                        that.sureMoInfo.month = new Date().getMonth() + 1;
                                        that.sureMoInfo.date = new Date().getDate();
                                        if (that.ten == 10) {
                                            let timer = setInterval(()=>{
                                                this.disabled = true;
                                                this.buttonStr ="同意并继续（" +  this.ten +"）";
                                                
                                                if(this.ten ===0) {
                                                    clearInterval(timer);
                                                    if(this.single == true){
                                                        this.disabled = false;
                                                    }
                                                    this.buttonStr = `同意并继续`;
                                                }else{this.ten = this.ten - 1;}
                                            },1000)
                                        }else{
                                            that.ten = 10;
                                            let timer = setInterval(()=>{
                                                this.disabled = true;
                                                this.buttonStr ="同意并继续（" +  this.ten +"）";
                                                
                                                if(this.ten ===0) {
                                                    clearInterval(timer);
                                                    if(this.single == true){
                                                        this.disabled = false;
                                                    }
                                                    this.buttonStr = `同意并继续`;
                                                }else{this.ten = this.ten - 1;}
                                            },1000)
                                        }
                                        window.localStorage.setItem('newItemStep',dex);
                                    }else{
                                        this.$Modal.warning({
                                            title: "提示",
                                            content: ress.data.message
                                        });
                                    }
                                })
                            }else{
                                this.$Modal.warning({
                                    title: "提示",
                                    content: res.data.message
                                });
                            }
                        }) 
                    }else if(dex == 3){
                        if(!this.isOpenevidenceMol){
                            this.evidenceMol = true;
                            this.ten = 10;
                            let timer = setInterval(()=>{
                                this.disabled = true;
                                this.buttonStr ="已经阅读（" +  this.ten +"）";
                                if(this.ten ===0) {
                                    clearInterval(timer);
                                    this.disabled = false;
                                    this.buttonStr = `已经阅读`;
                                }else{this.ten = this.ten - 1;}
                            },1000)
                        }else{
                            // 要素信息注释if(this.isRight){
                            //     this.elementAdd = true;
                            //     this.dailiAdd = false;
                            //     sted[3].classList.add('active');
                            //     sted[2].classList.remove('active');
                            // }else{
                            //     this.nextStepSure2();
                            // }
                            this.nextStepSure2();
                            this.nextLoading = false;
                        }
                        window.localStorage.setItem('newItemStep',dex);
                    }else if(dex == 4){
                        this.isElement == 1 ? this.$refs.element.submit() : this.$refs.element2.submitLoan();
                    }
                },
                nextStepSure2(){
                    var sted = document.getElementsByClassName("step");
                    var setStep = document.getElementsByClassName("setStep");  
                    getContacts(this.caseId).then(res=>{
                        if (res.data.state==100) {
                            this.mediatePeopleArr=res.data.data
                        }
                    })
                    setStep[2].classList.add('setActive');
                    this.dailiAdd = false;
                    //要素信息注释 if(this.isRight){
                    //     this.elementAdd = true;
                    //     sted[3].classList.add('active');
                    //     sted[2].classList.remove('active');
                    // }else{
                    //     this.fileAdd = true;
                    //     sted[4].classList.add('active');
                    //     sted[2].classList.remove('active');
                    // }
                    this.fileAdd = true;
                    sted[3].classList.add('active');
                    sted[2].classList.remove('active');//要素信息注释后

                    this.isOpenevidenceMol = true;
                    this.evidenceMol = false;
                    this.stepNum = 4;
                    this.nextLoading = false;
                },
                changeStep(){
                    this.success = false;
                    this.liniAdd = false;
                    this.dailiAdd =false;
                    this.fileAdd = false;
                    this.elementAdd = false;
                    let sted = document.getElementsByClassName("step");
                    for( let i=0;i<sted.length;i++){
                        sted[i].classList.remove('active');
                    }
                },
                upstep(dex){
                    var sted = document.getElementsByClassName("step");
                    if(dex == 1){
                        this.getCaseInfo();
                        this.changeStep();
                        this.success =true;
                        sted[1].classList.remove('active');
                        sted[0].classList.add('active');
                    }else if(dex == 2){
                        this.changeStep();
                        // this.getLiniList();
                        this.liniAdd = true ;
                        sted[2].classList.remove('active');
                        sted[1].classList.add('active');
                    }else if(dex == 3){
                        this.changeStep();
                        this.getlawyerLis();
                        this.dailiAdd = true ;
                        sted[3].classList.remove('active');
                        sted[2].classList.add('active');
                    }else if(dex == 4){
                        this.changeStep();
                        if(this.isRight == true){
                            this.elementAdd = true;
                            sted[4].classList.remove('active');
                            sted[3].classList.add('active');
                        }else{
                            this.dailiAdd = true;
                            sted[4].classList.remove('active');
                            sted[2].classList.add('active');
                        }
                    }else if(dex == 5){
                        this.changeStep();
                        this.fileAdd = true;
                        sted[4].classList.add('active');
                    }
                },
                getCaseInfo(){
                    briefMenu(this.noewTYpe).then(res => {
                        if(res.data.state == 100){
                            this.bridfList = res.data.result;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    });
                    getOnlineLawCaseEdit(this.caseId).then(res => {
                        if(res.data.state == 100){
                            if(res.data.result.type == 1){
                                this.caseType = "1";
                            }else{
                                this.caseType = "2";
                            }
                            console.log(this.caseType)
                            this.standardMoney = res.data.result.standardMoney;
                            this.factContent = res.data.result.factContent;
                            this.reasonContent = res.data.result.reasonContent;
                            this.onlineBriefId = res.data.result.onlineBrief.id;
                            this.selectTitle = res.data.result.onlineBrief.name;
                        }
                    })
                },
                clearAddfortem(){
                    // this.addFormItem.politicalStatus='';
                    this.addFormItem.nationality='';
                    this.addFormItem.education='';
                    this.addFormItem.litigantName= '';
                    this.addFormItem.onlineLitigantId= '';    
                    this.addFormItem.legalManJob = "";        
                    this.addFormItem.lawyerOfficeName = "";        
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
                    this.addFormItem.lawerNum1= "";
                    this.addFormItem.otherAddressArr= [];
                    this.isDisabled = true;
                    this.litigantPhoneSelect = '';
                    this.addNewPhone = '';
                },
                //8-12--新增
                addUsualLawyer(){   //增加常用律师
                    this.clearAddfortem();
                    this.litigantId = "";
                    this.isUsual = true;
                    this.lawyerModal = true;
                },
                gerUsualLawyer(){ 
                    this.usualId = "";
                    this.usualList = [];
                    this.usualLitiId = "";
                    getCLInfo().then(res => {
                        if(res.data.state == 100){
                            let arr = [];
                            res.data.clPage.content.map(item => {
                                let str = '';
                                this.lawerType.map(it => {
                                        if(it.value == item.type){
                                            str =  it.label;
                                        }
                                })
                                let data = {
                                    litigantName:item.name,
                                    identityCard:item.identicard,
                                    id:item.id,
                                    type:str
                                    
                                }
                                arr.push(data)
                                
                            })
                            this.usualList = arr;
                            console.log(this.usualList)
                            this.selUsualLaw = true;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                },
                optUsualLaw(){
                    if(this.usualId == ""){
                        this.$Message.info('请选中代理人！');
                        return false;
                    }
                    if(this.usualLitiId == ''){
                         this.$Message.info('请选择当事人！');
                        return false;
                    }
                    optCommonLawyer(this.usualLitiId,this.usualId).then(res => {
                        if(res.data.state == 100){
                            let tem = res.data.onlineLawyer
                            this.$Message.success('添加成功');
                            const data={
                                name:tem.name,
                                card:tem.identicard,
                                phone:tem.phone,
                                adress:tem.address,
                                id:tem.id,
                            }
                            this.lawyerList.push(data);
                            this.selUsualLaw = false;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                },
                addUsualPeople(){
                    this.clearAddfortem();
                    this.litigantId = "";
                    this.isUsual = true;
                    this.proofModal = true;
                },
                gerUsualPeople(str){
                    this.statusNow = str;
                    this.usualId = "";
                    getCmInfo().then(res => {
                        if(res.data.state == 100){
                            let arr = [];
                            res.data.cpPage.content.map(item => {
                                let data = {
                                    litigantName:item.litigantName,
                                    identityCard:item.identityCard,
                                    id:item.id,
                                }
                                arr.push(data)
                                this.selUsualPeo = true;
                            })
                            this.usualList = arr;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                },
                temSel(v,o){
                    console.log(v)
                    console.log(o)
                    this.usualId = v.id;
                    
                },
                optUsual(){
                    if(this.usualId == ""){
                        this.$Message.info('请选中当事人！');
                        return false;
                    }
                    optCommonPerson(this.usualId,this.caseId,this.statusNow).then(res => {
                        if(res.data.state == 100){
                            // this.goStep(2)
                            let tem = res.data.onlineLitigant;
                            this.$Message.success('添加成功');
                            console.log(tem);
                            const data={
                                name:tem.litigantName,
                                type:tem.litigantType==0 ? "自然人" : (tem.litigantType==1 ? "法人" : "非法人组织"),
                                typeStatus:tem.litigationStatus.name,
                                card:tem.identityCard,
                                phone:tem.litigantPhone,
                                adress:tem.nativePlace,
                                id:tem.id,
                            }
                            this.liniList.push(data);
                            if(this.statusNow == '原告'){
                                const data2 = {
                                    name:tem.litigantName,
                                    id:tem.id,
                                }
                                this.linigantList.push(data2);
                            }
                            this.selUsualPeo = false;
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                },
                openAddLini(){
                    this.isUsual = false;
                    this.litigantId = "";
                    this.clearAddfortem();
                    this.proofModal = true;
                },
                openAddlawyer(){
                    this.isUsual = false;
                    this.lawyerId = '';
                    this.clearAddfortem();
                    this.lawyerModal = true;
                },
                upFile(dex){
                    if(dex == 1){
                        document.getElementById("qisu1").click();
                    }else if(dex == 2){
                        document.getElementById("qisu2").click();
                    }else if(dex == 3){
                        document.getElementById("qisu").click();
                    }
                },
                upFileShen(dex){
                    if(dex == 1){
                        document.getElementById("qisuShen1").click();
                    }else if(dex == 2){
                        document.getElementById("qisuShen2").click();
                    }else if(dex == 3){
                        document.getElementById("qisuShen3").click();
                    }else if(dex == 4){
                        document.getElementById("qisuShen4").click();
                    }else if(dex == 5){
                        document.getElementById("qisuShen5").click();
                    }else if(dex == 6){
                        document.getElementById("qisuShen6").click();
                    }
                },
                cancelFile(dex){
                   if(dex == 1){
                       delFiles(this.onlineEAId1, this.caseId).then(res => {
                           if(res.data.state == 100){
                               this.$Message.success("删除成功");
                               this.fileName1 = "";
                                this.qisuShow1 = true;
                                document.getElementById("qisu1").value = "";
                                for(let i=0;i<this.pathList.length;i++){
                                    if(this.onlineEAId1 == this.pathList[i].id){
                                        this.pathList.splice(i, 1);
                                    }
                                }
                           }else{
                               this.$Message.info(res.data.message);
                           }
                       })
                        
                    }else if(dex == 2){
                        delFiles(this.onlineEAId2, this.caseId).then(res => {
                           if(res.data.state == 100){
                               this.$Message.success("删除成功");
                               this.fileName2 = "";
                                this.qisuShow2 = true;
                                document.getElementById("qisu2").value = "";
                                for(let i=0;i<this.pathList.length;i++){
                                    if(this.onlineEAId2 == this.pathList[i].id){
                                        this.pathList.splice(i, 1);
                                    }
                                }
                           }else{
                               this.$Message.info(res.data.message);
                           }
                       })
                    }else if(dex == 3){
                        delFiles(this.onlineEAId3, this.caseId).then(res => {
                           if(res.data.state == 100){
                               this.$Message.success("删除成功");
                               this.qfileName = "";
                                this.qisuSh = true;
                                document.getElementById("qisu").value = "";
                                for(let i=0;i<this.pathList.length;i++){
                                    if(this.onlineEAId3 == this.pathList[i].id){
                                        this.pathList.splice(i, 1);
                                    }
                                }
                           }else{
                               this.$Message.info(res.data.message);
                           }
                       })
                    }
                },
                cancelFileShen(dex){
                    let sId = "";
                    if(dex == 1){
                        sId = this.onlineEAIdShen1
                    }else if(dex == 2){
                        sId = this.onlineEAIdShen2
                    }else if(dex == 3){
                        sId = this.onlineEAIdShen3
                    }else if(dex == 4){
                        sId = this.onlineEAIdShen4
                    }else if(dex == 5){
                        sId = this.onlineEAIdShen5
                    }else if(dex == 6){
                        sId = this.onlineEAIdShen6
                    }
                    delFiles(sId, this.caseId).then(res => {
                        if(res.data.state == 100){
                            this.$Message.success("删除成功");
                            if(dex == 1){
                                this.fileNameShen1 = "";
                                this.qisuShowShen1 = true;
                                document.getElementById("qisuShen1").value = "";
                            }else if(dex == 2){
                                this.fileNameShen2 = "";
                                this.qisuShowShen2 = true;
                                document.getElementById("qisuShen2").value = "";
                            }else if(dex == 3){
                                this.fileNameShen3 = "";
                                this.qisuShowShen3 = true;
                                document.getElementById("qisuShen3").value = "";
                            }else if(dex == 4){
                                this.fileNameShen4 = "";
                                this.qisuShowShen4 = true;
                                document.getElementById("qisuShen4").value = "";
                            }else if(dex == 5){
                                this.fileNameShen5 = "";
                                this.qisuShowShen5 = true;
                                document.getElementById("qisuShen5").value = "";
                            }else if(dex == 6){
                                this.fileNameShen6 = "";
                                this.qisuShowShen6 = true;
                                document.getElementById("qisuShen6").value = "";
                            }
                            for(let i=0;i<this.pathList.length;i++){
                                if(sId == this.pathList[i].id){
                                    this.pathList.splice(i, 1);
                                }
                            }
                        }else{
                            this.$Message.info(res.data.message);
                        }
                    })
                },
                changeFile1(event){
                    this.file = event.target.files[0];
                    let applyType = "";
                    this.uploadIngSpinchangeFile1=true
                    upFiles(this.file,1,this.caseId, applyType).then(res => {
                        this.uploadIngSpinchangeFile1=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileName1 = this.file.name;
                            this.onlineEAId1 = res.data.evident.id;
                            this.qisuShow1 = false;
                            const data = {
                                path:res.data.result,
                                type:res.data.evident.id
                            }
                            this.pathList.push(data);
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFile2(event){
                    this.file = event.target.files[0];
                    let applyType = "";
                    this.uploadIngSpinchangeFile2=true
                    upFiles(this.file,2,this.caseId,applyType).then(res => {
                        this.uploadIngSpinchangeFile2=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileName2 = this.file.name;
                            this.onlineEAId2 = res.data.evident.id;
                            const data = {
                                path:res.data.result,
                                id:res.data.evident.id
                            }
                            this.pathList.push(data);
                            this.qisuShow2 = false;
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFile3(event){
                    this.file = event.target.files[0];
                    let applyType = "";
                    this.uploadIngSpinchangeFile3=true
                    upFiles(this.file,5,this.caseId, applyType).then(res => {
                        this.uploadIngSpinchangeFile3=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.qfileName = this.file.name;
                            this.onlineEAId3 = res.data.evident.id;
                            this.qisuSh = false;
                            const data = {
                                path:res.data.result,
                                type:res.data.evident.id
                            }
                            this.pathList.push(data);
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFileShen1(event){
                    this.file = event.target.files[0];
                    let applyType = 1;
                    this.uploadIngSpinchangeFileShen1=true
                    upFiles(this.file,4,this.caseId,applyType).then(res => {
                        this.uploadIngSpinchangeFileShen1=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileNameShen1 = this.file.name;
                            this.onlineEAIdShen1 = res.data.evident.id;
                            const data = {
                                path:res.data.result,
                                id:res.data.evident.id
                            }
                            this.pathList.push(data);
                            this.qisuShowShen1 = false;
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFileShen2(event){
                    this.file = event.target.files[0];
                    let applyType = 2;
                    this.uploadIngSpinchangeFileShen2=true
                    upFiles(this.file,4,this.caseId,applyType).then(res => {
                        this.uploadIngSpinchangeFileShen2=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileNameShen2 = this.file.name;
                            this.onlineEAIdShen2 = res.data.evident.id;
                            const data = {
                                path:res.data.result,
                                id:res.data.evident.id
                            }
                            this.pathList.push(data);
                            this.qisuShowShen2 = false;
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFileShen3(event){
                    this.file = event.target.files[0];
                    let applyType = 3;
                    this.uploadIngSpinchangeFileShen3=true
                    upFiles(this.file,4,this.caseId,applyType).then(res => {
                        this.uploadIngSpinchangeFileShen3=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileNameShen3 = this.file.name;
                            this.onlineEAIdShen3 = res.data.evident.id;
                            const data = {
                                path:res.data.result,
                                id:res.data.evident.id
                            }
                            this.pathList.push(data);
                            this.qisuShowShen3 = false;
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFileShen4(event){
                    this.file = event.target.files[0];
                    let applyType = 4;
                    this.uploadIngSpinchangeFileShen4=true
                    upFiles(this.file,4,this.caseId,applyType).then(res => {
                        this.uploadIngSpinchangeFileShen4=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileNameShen4 = this.file.name;
                            this.onlineEAIdShen4 = res.data.evident.id;
                            const data = {
                                path:res.data.result,
                                id:res.data.evident.id
                            }
                            this.pathList.push(data);
                            this.qisuShowShen4 = false;
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFileShen5(event){
                    this.file = event.target.files[0];
                    let applyType = 5;
                    this.uploadIngSpinchangeFileShen5=true
                    upFiles(this.file,4,this.caseId,applyType).then(res => {
                        this.uploadIngSpinchangeFileShen5=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileNameShen5 = this.file.name;
                            this.onlineEAIdShen5 = res.data.evident.id;
                            const data = {
                                path:res.data.result,
                                id:res.data.evident.id
                            }
                            this.pathList.push(data);
                            this.qisuShowShen5 = false;
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                changeFileShen6(event){
                    this.file = event.target.files[0];
                    let applyType = 6;
                    this.uploadIngSpinchangeFileShen6=true
                    upFiles(this.file,4,this.caseId,applyType).then(res => {
                        this.uploadIngSpinchangeFileShen6=false
                        if(res.data.state == 100){
                            this.$Message.success('上传成功');
                            this.fileNameShen6 = this.file.name;
                            this.onlineEAIdShen6 = res.data.evident.id;
                            const data = {
                                path:res.data.result,
                                id:res.data.evident.id
                            }
                            this.pathList.push(data);
                            this.qisuShowShen6 = false;
                        }else{
                            this.$Modal.warning({
                                title: '提示',
                                content: res.data.message
                            });
                        }
                    })
                },
                backHome(){
                    this.$router.push({
                        name: 'home_index'
                    });
                }
            }
        };
        </script>
        