import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import storage from '../utils/storage';
const routes = [
    {
        name: 'system',
        path: '/',
        // redirect: '/system',
        meta: {
            title: '首页',
        },
        beforeEnter: (to, from, next) => {
            if (storage.getItem('userinfo')) {
                next();
            } else {
                next('/login');
            }
        },
        component: Home,
        children: [
            {
                name: 'welcome',
                path: '/system',
                component: () => import('../views/Welcome.vue'),
                meta: {
                    title: '欢迎页',
                },
            },
            {
                name: 'students',
                path: '/manager',
                component: () => import('../views/Student.vue'),
                meta: {
                    title: '学生信息',
                },
            },
            {
                name: 'qrcode',
                path: '/qrcode',
                component: () => import('../views/Qrcode.vue'),
                meta: {
                    title: '签到二维码',
                },
            },
            {
                name: 'sign-in',
                path: '/sign-in',
                component: () => import('../views/SignIn.vue'),
                meta: {
                    title: '签到管理',
                },
            },
            {
                name: 'leave',
                path: '/leave',
                component: () => import('../views/Leave.vue'),
                meta: {
                    title: '请假申请',
                },
            },
            {
                name: 'audit',
                path: '/audit',
                component: () => import('../views/Audit.vue'),
                meta: {
                    title: '审批系统',
                },
            },
            {
                path: '/404',
                name: 'NotFound',
                meta: {
                    title: 'Page not found',
                    isLogin: false,
                },
                component: () => import('../views/NotFound.vue'),
            },
        ],
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录',
        },
        component: () => import('../views/Login.vue'),
    },
    // 所有未定义路由，全部重定向到404页
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// router.beforeResolve((to, from, next) => {
//     if (to.path = "/" || storage.getItem('userinfo')) {
//         next();
//     } else {
//         next('/login');
//     }
// });

export default router;
