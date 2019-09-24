<style>
.icoDs{
    display: flex;
    width: 525px;
    height: 200px;
    margin: 0 auto;
    text-align: center;
}

.icoDs-box {
    display: flex;
    padding: 20px 10px;
    height: 100%;
    display: flex;
    align-items: center;
}

.icoDs .ivu-icon{
    color:black;
    font-size: 160px;
    display: block;
}
.icoDs span{
    color: black;
    font-size: 20px;
    font-weight: 600;
}
.icoDs .leftIcon{
    text-align: center;
    width: 50%;
    cursor: pointer;
    display: inline-block;
    margin: 0 auto;
}
.icoDs .rightIcon{
    text-align: center;
    width: 50%;
    cursor: pointer;
    display: inline-block;
    margin: 0 auto;
}
.icoDs .centerIcon{
    width: 50%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    margin: 0 auto;
}
</style>

<template>
    <div class="icoDs-box">
        <div class="icoDs" v-show="show">
            <div class="leftIcon" @click="gotoSetCase" v-if="access">
                <Icon  style="color:#40A9FF" type="ios-monitor-outline"></Icon>
                <span style="color:#40A9FF">在线立案</span>
            </div>
             <div class="rightIcon" @click="gotoCaseList" v-if="access2">
                 <Icon  style="color:#40A9FF" type="ios-briefcase"></Icon>
                 <span  style="color:#40A9FF">已申请案件</span>
            </div>
            <div class="centerIcon" @click="gotoList" v-if='court'>
                 <Icon  style="color:#40A9FF" type="ios-briefcase"></Icon>
                 <span  style="color:#40A9FF">已申请案件处理</span>
            </div>  
        </div>
    </div>
</template>
<script>
import { getCaesState} from '@/api/caseInfo.js';
import { getUserInfo } from '@/api/user';
export default {
    data () {
        return {
            access:false,
            access2:false,
            show:false,
            court:false,
        };
    },
    mounted () {
        var that=this
        setTimeout( () => {
            getUserInfo().then(response => {
                console.log(565356262)
                const data = response.data;
                console.log(that.$store.state.app.menuList)
                if(data.state == 100) {
                    console.log(that.$store.state.app.menuList);
                    let ary = this.$store.state.app.menuList;
                    if((data.roleName == '当事人' || data.roleName == '代理人') && data.result.name != '厦门农商总账号'){
                        this.access = true;
                        this.access2 = true;
                        this.court = false;
                    }else if(ary[0].title == '案件信息'){
                        this.access = false;
                        this.access2 = false;
                        this.court = true;
                    }
                    if(data.result.name == '厦门农商总账号'){
                        this.access2 = true;
                        this.court = false;
                        this.access = false;
                    }
                    // else if(ary[0].title == '案件信息'){
                    //     this.access = false;
                    //     this.court = true;
                    // }
                    this.show = true;
                } else {
                    Cookies.set('user', '');
                }
            })
        }, 2.5 * 1000 );//延迟1000毫秒
         
    },
    methods: {
        gotoSetCase(){
            // this.$Message.info({
            //     content:'立案功能维护中...',
            //     duration:5
            // });
            // return false
            getCaesState().then(res => {
                if(res.data.state == 100){
                    if(res.data.onlineLawCase != null){
                        console.log(111)
                        if(res.data.onlineLawCase.process != 4){
                            this.$Modal.confirm({
                                title: '提示',
                                content: '<p>当前有未完成提交案件，是否继续？</p>',
                                okText: '继续填写',
                                cancelText: '立新案件',
                                onOk: () => {
                                    this.$router.push({
                                        name: "caseInfoContinue",
                                        params: { lawCaseId: res.data.onlineLawCase.id, process:res.data.onlineLawCase.process}
                                    });
                                },
                                onCancel: () => {
                                    this.$router.push({
                                        name: 'caseInfo_index'
                                    });
                                }
                            });
                        }else{
                            this.$router.push({
                                name: 'caseInfo_index'
                            });
                        }
                    }else{
                         this.$router.push({
                            name: 'caseInfo_index'
                        });
                    }
                    
                }else{
                    this.$router.push({
                        name: 'caseInfo_index'
                    });
                }
            })
            
        },
        gotoCaseList(){
            this.$router.push({
                name: 'caseList_index'
            });
        },
        gotoList(){
            this.$router.push({
                name: 'handleCase_index'
            });
        }
    }
};
</script>
