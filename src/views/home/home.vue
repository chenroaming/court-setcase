<style>
/* .icoDs{
width: 450px;
height: 200px;
left: 50%;
position: relative;
margin-left: -225px;
top: 20%;
} */

.icoDs-box {
    display: flex;
    padding: 20px 10px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}
.icoDs{
    display: flex;
    width: 525px;
    height: 200px;
    margin: 0 auto;
    text-align: center;
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
.page-box {
    margin-top: 20px;
}
</style>

<template>
<div class="icoDs-box">
    <Spin fix v-if="isLoading"></Spin>
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
        <Modal
            v-model="modal1"
            title="继续填写案件信息"
            ok-text="关闭"
            cancel-text="立新案件"
            :closable="false"
            :mask-closable="false"
            @on-ok="close"
            @on-cancel="newCase">
            <Table border :loading="loading1" :columns="columns1" :data="data1"></Table>
            <div class="page-box">
                <Page :total="total" :page-size='pageSize' @on-change="pageChange"/>
            </div> 
        </Modal>
    </div>
</div>
</template>
<script>
import Cookies from 'js-cookie';
import { getCaesState} from '@/api/caseInfo.js';
import { getUserInfo } from '@/api/user';
export default {
data () {
    return {
        isLoading:true,
        loading1:false,
        modal1:false,
        access:false,
        access2:false,
        show:false,
        court:false,
        total:0,
        pageSize:5,
        columns1: [
            {
                title: '案由',
                key: 'onlineBriefName',
                align:'center'
            },
            {
                title: '原告',
                key: 'plaintiffName',
                align:'center',
            //     render:(h,params) => {
            //         return h('div', [
            //     　　　　h('Tooltip', {
            //     　　　　props: { placement: 'top' }
            //     　　　　}, [
            //     　　　　h('span', {style:{display: 'inline-block',width: params.column._width*0.9+'px',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap',}}, params.row.plaintiffName),
            // 　　　　　　h('span', {
            // 　　　　　　　　slot: 'content',
            // 　　　　　　　　style: { whiteSpace: 'normal'}
            // 　　　　　　},params.row.plaintiffName)
            //     　　　　])
            //     　　])
            //     }
            },
            {
                title: '被告',
                key: 'defendantName',
                align:'center',
            //     render:(h,params) => {
            //         return h('div', [
            //     　　　　h('Tooltip', {
            //     　　　　props: { placement: 'top' }
            //     　　　　}, [
            //     　　　　h('span', {style:{display: 'inline-block',width: params.column._width*0.9+'px',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap',}}, params.row.defendantName),
            // 　　　　　　h('span', {
            // 　　　　　　　　slot: 'content',
            // 　　　　　　　　style: { whiteSpace: 'normal'}
            // 　　　　　　},params.row.defendantName)
            //     　　　　])
            //     　　])
            //     }
            },
            {
                title: '操作',
                key: 'action',
                align:'center',
                render:(h,params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    
                                    window.localStorage.setItem('lawCaseId',params.row.lawCaseId);
                                    window.localStorage.setItem('process',params.row.process);
                                    window.localStorage.setItem('continueIsRight',params.row.briefId);
                                    this.$router.push({
                                        name: "caseInfoContinue",
                                        params: { lawCaseId: params.row.lawCaseId, process: params.row.process, briefId:params.row.briefId}
                                    });
                                }
                            }
                        }, '继续填写'),
                    ]);
                }
            }
        ],
        data1:[],
    };
},
mounted () {
    setTimeout( ()=>{
        getUserInfo().then(response => {
            this.isLoading = false;
            const data = response.data;
            if(data.state == 100) {
                let ary = this.$store.state.app.menuList;
                
                if((data.roleName == '当事人' || data.roleName == '代理人') && (data.result.name != '农商行总账号' || data.result.name != '农商金控总账号')){
                    this.access = true;
                    this.access2 = true;
                    this.court = false;
                }else if(ary[0].title == '案件信息'){
                    this.access = false;
                    this.access2 = false;
                    this.court = true;
                }
                if(data.result.name == '农商行总账号' || data.result.name == '农商金控总账号'){
                    this.access2 = true;
                    this.court = false;
                    this.access = false;
                }
                this.show = true;
            } else {
                Cookies.set('user', '');
            }
        })
    }, 2.5 * 1000 );//延迟2500毫秒
        
},
methods: {
    pageChange(current){
        this.loading1 = true;
        getCaesState(current).then(res => {
            this.total = res.data.total;
            this.data1 = [];
            this.modal1 = true;
            for (const item of res.data.onlineLawCase){
                const obj = {
                    onlineBriefName:item.onlineBrief.name,
                    plaintiffName: '',
                    defendantName: '',
                    lawCaseId:item.id,
                    process:item.process,
                    briefId:item.onlineBrief.id
                };
                const plaintiffName = item.onlineLitigants.map(member=>{
                    return member.litigationStatus.name == '原告' && member.enable ? obj.plaintiffName = obj.plaintiffName+member.litigantName+'  ' : (member.litigationStatus.name == '被告' && member.enable ? obj.defendantName = obj.defendantName+member.litigantName+'  ' : false);
                })
                this.data1.push(obj);
            }
            this.loading1 = false;
        })
        .catch(error => {
            this.$Message.warning('网络错误！请刷新重试！');
        })
    },
    gotoSetCase(){
        this.isLoading = true;
        getCaesState().then(res => {
            this.isLoading = false;
            if(res.data.total == 1){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>当前有未完成提交案件，是否继续？</p>',
                    okText: '继续填写',
                    closable:true,
                    cancelText: '立新案件',
                    onOk: () => {
                        const process = res.data.onlineLawCase[0].process;
                        window.localStorage.setItem('lawCaseId',res.data.onlineLawCase[0].id);
                        window.localStorage.setItem('process',process);
                        this.$router.push({
                            name: "caseInfoContinue",
                            params: { lawCaseId: res.data.onlineLawCase[0].id, process:process}
                        });
                    },
                    onCancel: () => {
                        window.localStorage.removeItem('newCaseId');
                        window.localStorage.removeItem('newItemStep');
                        window.localStorage.removeItem('isRight');
                        window.localStorage.removeItem('continueIsRight');
                        this.$router.push({
                            name: 'caseInfo_index'
                        });
                    }
                });
            }else if(res.data.total == 0){
                this.$router.push({
                    name: 'caseInfo_index'
                });
            }else{
                this.loading1 = true;
                this.total = res.data.total;
                this.data1 = [];
                this.modal1 = true;
                for (const item of res.data.onlineLawCase){
                    const obj = {
                        onlineBriefName:item.onlineBrief.name,
                        plaintiffName: '',
                        defendantName: '',
                        lawCaseId:item.id,
                        process:item.process,
                        briefId:item.onlineBrief.id
                    };
                    const plaintiffName = item.onlineLitigants.map(member=>{
                        return member.litigationStatus.name == '原告' && member.enable ? obj.plaintiffName = obj.plaintiffName+member.litigantName+'  ' : (member.litigationStatus.name == '被告' && member.enable ? obj.defendantName = obj.defendantName+member.litigantName+'  ' : false);
                    })
                    this.data1.push(obj);
                }
                this.loading1 = false;
            }
        })
        .catch(error => {
            console.log(error);
            this.$Message.warning('网络错误！请刷新重试！');
        })
    },
    close (){

    },
    newCase (){
        window.localStorage.removeItem('newCaseId');
        this.$router.push({
            name: 'caseInfo_index'
        });
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
        