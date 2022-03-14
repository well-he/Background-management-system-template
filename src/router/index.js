import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
const routes = [
    {
        name: 'system',
        path: '/',
        meta: {
            title: '首页',
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
                path: '/students',
                component: () => import('../views/Student.vue'),
                meta: {
                    title: '学生管理',
                },
            },
            {
                name: 'teachers',
                path: '/teachers',
                component: () => import('../views/Teachers.vue'),
                meta: {
                    title: '教师管理',
                },
            },
            {
                name: 'curriculum',
                path: '/curriculum',
                component: () => import('../views/Curriculum.vue'),
                meta: {
                    title: '课程表管理',
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
                name: 'qrcode',
                path: '/qrcode',
                component: () => import('../views/Qrcode.vue'),
                meta: {
                    title: '签到二维码',
                },
            },
            {
                name: 'attendance',
                path: '/attendance',
                component: () => import('../views/Attendance.vue'),
                meta: {
                    title: '考勤签到',
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

export default router;
