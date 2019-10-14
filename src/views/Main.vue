<style lang="less">
    @import "./main.less";
</style>
<style>
@-webkit-keyframes sky_background {
  0% {
	background: #007fd5;
	color: #007fd5
  }
  50% {
	background: #007fd5;
	color: #a3d9ff
  }
  100% {
	background: #007fd5;
	color: #007fd5
  }
}
@-moz-keyframes sky_background {
  0% {
	background: #007fd5;
	color: #007fd5
  }
  50% {
	background: #007fd5;
	color: #a3d9ff
  }
  100% {
	background: #007fd5;
	color: #007fd5
  }
}
@keyframes sky_background {
  0% {
	background: #007fd5;
	color: #007fd5
  }
  50% {
	background: #007fd5;
	color: #a3d9ff
  }
  100% {
	background: #007fd5;
	color: #007fd5
  }
}
</style>

<template>
<div>
    <div class="clouds_one"></div>
        <div class="clouds_two"></div>
        <div class="clouds_three"></div>
    <div class="main" :class="{'main-hide-text': shrink}" style="height:560px;width:1100px;position: relative;top:12%;margin-top:100px;left:50%;margin-left:-550px;">
        <div class="" style="width:1100px;border-top-left-radius:10px;border-top-right-radius:10px">
            <div class="main-header" style="border-top-left-radius:10px;border-top-right-radius:10px">
                <div class="navicon-con">
                    <div slot="top" class="logo-con" style="cursor: pointer;padding-left: 20px;" @click="goMainH">
                        <img src="../images/logo.gif" key="max-logo" />
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown" style="    position: absolute;
    left: -30px;">
                                <a href="javascript:void(0)" style="">
                                    <span class="main-user-name" style="font-size:16px">{{ userName }}</span>
                                    <Icon type="arrow-down-b" style=""></Icon>
                                </a>
                                <DropdownMenu slot="list">   
                                    <DropdownItem name="ownSpace">常用当事人/代理人管理</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <!-- <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar> -->
                            <!-- <span style="margin-left: 10px;font-size:14px;" @click.native="backHome">返回主页</span> -->
                            <a href="#" style="float:left;line-height: 40px;font-size:14px;padding-left: 30px;color:#fff" @click="backHome">返回主页</a>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="" style="width:100%;height:100%;background: white;border-bottom-left-radius:10px;border-bottom-right-radius:10px">
            <div class="" style="padding:10px;width:100%;height:100%">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import shrinkableMenu from '../components/main/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from '../components/main/tags-page-opened.vue';
    import breadcrumbNav from '../components/main/breadcrumb-nav.vue';
    import fullScreen from '../components/main/fullscreen.vue';
    import messageTip from '../components/main/message-tip.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import store from '@/store';
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            messageTip
        },
        data () {
            return {
                websock: null,
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.getters.new.length;
            }
        },
        methods: {
            audio () {
                var audio = new Audio('https://court.ptnetwork001.com/dist/static/3424.mp3');
                audio.play();
            },
            goMainH(){
                this.$router.push({
                    name: 'home_index'
                });
            },
            initWebSocket () {
                let path = window.location.host
                const wsuri = 'wss://' + path + '/api/web/webSocket.jhtml';
                this.websock = new WebSocket(wsuri);
                this.websock.onopen = function (event) {
            			console.log('WebSocket:已连接');
            			console.log(event);
            		};
                // this.websock.onmessage = this.websocketonmessage;
                this.websock.onerror = function (event) {
            			console.log('WebSocket:发生错误 ');
            			console.log(event);
            		};
            		this.websock.onclose = function (event) {
            			console.log('WebSocket:已关闭');
            			console.log(event);
            		}
            },
            websocketonmessage () {
                var data = JSON.parse(event.data);
                let newList = [];
                let readList = [];
                data.map(item => {
                    if (item.isRead == 0) {
                        newList.push(item)
                    } else {
                        readList.push(item)
                    }
                    this.$store.commit('SET_NEW', newList);
                    this.$store.commit('SET_READ', readList);
                })
                if (newList.length != 0) {
                    this.$Notice.info({
                        title: '你有新消息，请注意查收',
                        desc: '信箱中共有' + newList.length + '条未读消息'
                    });
                    this.audio();
                }
            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                // this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
                // store.dispatch('ShowNotice');
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    // util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'commonPeolple_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$store.dispatch('Logout').then(res => {
                        this.$router.push({
                            name: 'login'
                        });
                    })
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            backHome(){
                window.localStorage.removeItem('lawCaseId');
                window.localStorage.removeItem('process');
                window.localStorage.removeItem('newCaseId');
                window.localStorage.removeItem('newItemStep');
                window.localStorage.removeItem('isRight');
                window.localStorage.removeItem('continueIsRight');
                this.$router.push({
                    name: 'home_index'
                });
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.init();
            // this.backHome()
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.initWebSocket();
        },
        
    };
    
</script>
