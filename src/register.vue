<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login">
       <div class="login-con">
            <div class="login-title">
              <img src="../images/lo-logo.png" width="384px" style="margin: 0 auto">
            </div>

              <Card :bordered="false" style="background: rgba(255,255,255,.6);box-shadow: 0 1px 6px rgba(0,0,0,.2);">
                <h3 class="" style="text-align:center;font-size:24px;color:#007fd5">
                        <span>创建账号</span>
                </h3>  
                <div class="form-con" style="width:80%;margin-left: 10%;">
                    <Form :model="userInfo" :rules="rules" v-show="!nextInfo">
                      <FormItem style="margin-bottom:10px">
                          <Input v-model="userInfo.phone" class="input" placeholder="姓氏" style="width:49%"></Input>
                          <Input v-model="userInfo.phone" placeholder="名字" style="width:49%"></Input>
                      </FormItem>
                      <FormItem prop="phone" style="margin-bottom:10px">
                          <Select v-model="model1" style="width:98%">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                      </FormItem>
                      <FormItem prop="phone" style="margin-bottom:10px">
                          <DatePicker v-model="birthDate" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="出生日期" style="width: 98%"></DatePicker>
                      </FormItem>
                      <FormItem prop="phone" style="margin-bottom:10px">
                         <Select v-model="model2" style="width:30%">
                                <Option v-for="item in idCarType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input type="text"  placeholder="证件号码" style="width:68%"></Input>
                      </FormItem>
                      <!-- <FormItem style="margin-bottom:10px">
                          <Input v-model="userInfo.authCode" placeholder="请输入验证码" style="width:292px;" />
                          <span class="code-wrapper ivu-btn ivu-btn-primary" :style="canGetCode ? '':'background: #999;border-color:#999;width:92px;'" @click="ckickGetCode">
                              {{ getCodeText }}
                          </span>
                      </FormItem> -->
                       <FormItem style="margin-bottom:10px">
                           <Button @click="loginPage"  style="width:49%" long>取消</Button>
                          <Button @click="phoneSubmit"  type="primary"  style="width:49%" long>下一步</Button>
                      </FormItem>
                       <div style="height:30px;text-align:center">
                          <span style="color:black">已有账号？</span>  <a href="" style="" @click="loginPage">登录</a>
                          <!-- <a href="#" @click="register"  style="float:right">创建新账号</a> -->
                      </div>
                      </Form>
                      
                      <Form :model="userInfo1" :rules="rules"  ref="userInfo" v-show="nextInfo">
                      <FormItem prop="phone" style="margin-bottom:0px">
                          <Input v-model="userInfo1.idCard" placeholder="用户名">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                          </Input>
                          <div style="color:black">您将用用户名或手机号登陆在线取号平台</div>
                      </FormItem>
                       <FormItem prop="password">
                            <Input type="password" v-model="userInfo1.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="rePassword">
                            <Input type="password" v-model="userInfo1.surePassword" placeholder="确认密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="phone">
                          <Input v-model="userInfo.phone" placeholder="请输入手机号码">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                          </Input>
                      </FormItem>
                      <FormItem>
                          <Input v-model="userInfo.authCode" placeholder="请输入验证码" style="width:292px;" />
                          <span class="code-wrapper ivu-btn ivu-btn-primary" :style="canGetCode ? '':'background: #999;border-color:#999;width:92px;'" @click="ckickGetCode">
                              {{ getCodeText }}
                          </span>
                      </FormItem>
                      <FormItem>
                           <Button @click="loginPage"  style="width:49%" long>取消</Button>
                          <Button @click="userinfoSubmit"  type="primary"  style="width:49%" long>提交</Button>
                          <!-- <Button @click="userinfoSubmit"  type="primary" long>提交</Button> -->
                      </FormItem>
                      <div style="height:30px;text-align:center">
                          <span style="color:black">已有账号？</span>  <a href="" style="" @click="loginPage">登录</a>
                      </div>
                  </Form>
                  <p class="login-tip">本网站只支持IE9+等现代浏览器</p>
                </div>
              </Card>
        
       </div>
    
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import store from '@/store';
import { getCode,registerPhone,registerAdmin} from '@/api/user.js';
var path = window.location.host;
export default {
    data () {
        const validatePassCheck = (rule, value, callback) => {
            if (this.userInfo1.surePassword === '') {
                callback(new Error('密码不能为空！'));
            } else if (this.userInfo1.surePassword != this.userInfo1.password) {
                console.log(this.userInfo1.surePassword);
                console.log(this.userInfo1.password)
                callback(new Error('两次密码输入不一致!'));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (this.userInfo1.password === '') {
                callback(new Error('密码不能为空'));
            } else {
                if (this.userInfo1.surePassword !== '') {
                    // 对第二个密码框单独验证
                    console.log(5858)
                    this.$refs.userInfo.validateField('rePassword');
                }
                callback();
            }
        };
        return {
            
            userInfo: {
                phone: "",
                authCode: ""
            },
            model2: '身份证',
            idCarType:[
                {
                    value: '身份证',
                    label: '身份证'
                },
            ],
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: '中国',
                    label: '中国'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            birthDate:"",
            model1: '中国',
             userInfo1: {
                idCard: "",
                password: "",
                surePassword:'',
                email:'',
                trueAddress:''

            },
            
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [{ validator: validatePass, trigger: 'blur' }],
                rePassword:[{validator: validatePassCheck, trigger: 'change'}]
            },
            courtLogin: false,
            getCodeText: '获取验证码',
            canGetCode: true,
            userType: 'litigant',
            success:true,
            nextInfo:false
        };
       
    },
    methods: {
      ckickGetCode() {
      if (this.canGetCode) {
        getCode(this.userInfo.phone).then(res => {
          if (res.data.state == 100) {
            this.$Message.success(res.data.message);
            this.getCodeText = 59;
            this.canGetCode = false;
            var that = this;
            console.log(res.data)
            var timmer = setInterval(function() {
              that.getCodeText -= 1;
              if (that.getCodeText == 0) {
                that.getCodeText = "获取验证码";
                that.canGetCode = true;
                clearInterval(timmer);
              }
            }, 1000);
          } else {
            this.$Message.error(res.data.message);
          }
        });
      }
    },
    loginPage(){
        this.$router.push({
            name: 'login'
        }); 
    },
    phoneSubmit() {
      registerPhone(this.userInfo.phone, this.userInfo.authCode).then(res => {
        if (res.data.state == 100) {
            console.log(res.data.admin)
            if(res.data.admin.idCard){
                this.userInfo1.idCard = res.data.admin.idCard
            }
        this.success = false;
        this.nextInfo = true;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    userinfoSubmit(){
     registerAdmin(this.userInfo1.idCard,this.userInfo1.password, this.userInfo1.email, this.userInfo1.trueAddress).then(res => {
        //  console.log(res)
        //  console.log(this.userInfo1.idCard)
        if (res.data.state == 100) {
            this.$Message.info('注册成功')
             this.$router.push({
                    name: 'login'
                }); 
        } else {
            console.log(222)
          this.$Message.error(res.data.message);
        }
      });  
    }
    }
};
</script>

<style>
.code-wrapper {
  cursor: pointer;
}
.entrance {
  color: #40a9ff;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
}
.tabs {
  overflow: hidden;
}
.tabs * {
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

.tabs h3 {
  float: left;
  width: 50%;
  cursor: pointer;
}
.tabs h3 a {
  padding: 0.5em 0;
  text-align: center;
  font-weight: 400;
  display: block;
  color: #666;
  border: 0;
}
.tabs h3 a.active {
  color: #000;
}
.tabs h3 a.active span {
  padding-bottom: 4px;
  border-bottom: 1px solid #40a9ff;
}
.tabs-content {
  padding: 1.5em 3em;
  text-align: left;
  width: auto;
}
</style>
