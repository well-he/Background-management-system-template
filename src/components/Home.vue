<script>
import logo from '../assets/logo.png';
export default {
    name: 'Home',
    data: () => {
        return {
            logo,
        };
    },
};
</script>

<template>
    <div class="layout">
        <div class="aside">
            <div class="logo">
                <img :src="logo" alt="logo" />
                <span>校园考勤系统</span>
            </div>

            <el-menu
                active-text-color="#ffd04b"
                background-color="#001529"
                class="el-menu-vertical-demo"
                default-active="0"
                text-color="#fff"
            >
                <el-menu-item index="0">
                    <el-icon><document /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>校园管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">专业管理</el-menu-item>
                        <el-menu-item index="1-2">学院管理</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><user /></el-icon>
                        <span>学生管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">学生管理</el-menu-item>
                        <el-menu-item index="2-2">班级管理</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                <el-sub-menu index="3">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>考勤管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">签到管理</el-menu-item>
                        <el-menu-item index="3-2">请假管理</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="content-right">
            <div class="nav-top">
                <div class="bread">面包屑</div>
                <div class="user-">admin</div>
            </div>
            <el-main class="wrapper">
                <div class="main-page">
                    <router-view></router-view>
                </div>
            </el-main>
        </div>
    </div>
</template>

<style lang="scss">
.layout {
    position: relative;
    .aside {
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: var(--menu-color);
        color: #fff;
        overflow-y: auto;
        transition: width 0.5s;
        .logo {
            width: 100%;
            padding: 10px;
            color: var(--text-color);
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            img {
                height: 50px;
            }
            span {
                text-align: center;
                flex-grow: 2;
            }
        }
        .list {
            display: flex;
            flex-direction: column;
            padding-top: 30px;
            text-align: center;
            font-size: 1.25rem;
            .item {
                padding: 10px;
                border-bottom: 1px solid var(--border-color);
                &.active {
                    color: var(--menu-active-color);
                }
            }
        }
    }
    .content-right {
        margin-left: 200px;
        .nav-top {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 0 20px;
        }
        .wrapper {
            background: var(--content-bgc);
            padding: 20px;
            height: calc(100vh - 50px);
            .main-page {
                height: 100%;
                background-color: #fff;
            }
        }
    }
}
</style>
