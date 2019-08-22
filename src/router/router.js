import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/setcase/login',
    name: 'login',
    meta: {
        title: '湖里区人民法院 - 登录'
    },
    component: () => import('@/views/login.vue')
};
export const registerRouter = {
    path: '/setcase/register',
    name: 'register',
    meta: {
        title: '湖里区人民法院 - 注册'
    },
    component: () => import('@/views/register.vue')
};
export const page404 = {
    path: '/setcase/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/setcase/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/setcase/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/setcase/',
    name: 'otherRouter',
    redirect: '/setcase/home',
    component: Main,
    children: [
        {
            path: '/setcase/home',
            title: '主页',
            name: 'home_index',
            component: () => import('@/views/home/home.vue')
        },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/setcase/caseInfo',
        name: 'caseInfo',
        title: '案件信息',
        access: ['litigant'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '案件信息',
                name: 'caseInfo_index',
                component: () => import('@/views/caseInfo/caseInfo.vue')
            },
            {
                path: 'caseInfoContinue',
                title: '案件信息',
                name: 'caseInfoContinue',
                component: () => import('@/views/caseInfo/caseInfoContinue.vue')
            }
        ]
    },
    {
        path: '/setcase/caseList',
        name: 'caseList',
        title: '已申请案件',
        access: ['litigant'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '已申请案件',
                name: 'caseList_index',
                component: () => import('@/views/caseList/caseList.vue')
            }
        ]
    },
    {
        path: '/setcase/handleCase',
        name: 'handleCase',
        title: '案件处理',
        access: ['litigant'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '案件处理',
                name: 'handleCase_index',
                component: () => import('@/views/courtcaelist/courtcaelist.vue')
            }
        ]
    },
    {
        path: '/setcase/commonPeolple',
        name: 'commonPeolple',
        title: '常用当事人管理',
        access: ['litigant'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '常用当事人管理',
                name: 'commonPeolple_index',
                component: () => import('@/views/commonPeolple/commonPeolple.vue')
            }
        ]
    },

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    registerRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
