<script>
import logo from '../assets/logo.png';
import TreeMenu from './TreeMenu.vue';
export default {
    name: 'Home',
    components: { TreeMenu },
    data() {
        return {
            logo,
            isCollapse: false,
            activeMenu: location.hash.replace('#', ''),
            userInfo: this.$storage.getItem('userinfo'),
            menus: [],
        };
    },
    methods: {
        toggle() {
            this.isCollapse = !this.isCollapse;
        },
        goWelcome() {
            this.$router.push('/system');
        },
        handleLogout(e) {
            if (e === 'logout') {
                this.$storage.removeItem('userinfo');
                this.$router.push('/login');
            }
        },
        async getLeftMenu() {
            const list = await this.$api.getMenuList(this.userInfo.Role);
            this.menus = list;
        },
        logined() {
            if (!this.$storage.getItem('userinfo')) {
                this.$router.push('/login');
            }
        },
    },
    mounted() {
        //根据用户权限生成菜单
        this.getLeftMenu();
    },
    created() {
        this.logined();
    },
    computed: {
        panelName() {
            const userinfo = this.$storage.getItem('userinfo');
            return userinfo.RealName == null ? userinfo.Name : userinfo.RealName;
        },
        bread() {
            return `${this.$route.meta.title}`;
        },
    },
};
</script>

<template>
    <div class="layout">
        <div :class="['nav-site', isCollapse ? 'fold' : 'unfold']">
            <!-- 系统LOGO -->
            <div class="logo" @click="goWelcome">
                <img src="./../assets/logo.png" alt="" />
                <div class="sys-title">校园考勤后台</div>
            </div>

            <el-menu
                :default-active="activeMenu"
                background-color="#001529"
                text-color="#fff"
                :collapse="isCollapse"
                class="nav-menu"
                router
            >
                <tree-menu :userMenus="menus" />
            </el-menu>
        </div>
        <div :class="['content-right', isCollapse ? 'fold' : 'unflod']">
            <div class="nav-top">
                <div class="nav-left">
                    <div class="menu-fold" @click="toggle">
                        <el-button type="info">
                            <el-icon>
                                <expand />
                            </el-icon>
                        </el-button>
                    </div>
                    <div class="bread">{{ bread }}</div>
                </div>
                <div class="user-info">
                    <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice" type="danger">
                        <el-icon>
                            <bell />
                        </el-icon>
                    </el-badge>
                    <el-dropdown @command="handleLogout">
                        <span class="user-link">{{ userInfo.RealName }}</span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="email">
                                    邮箱：{{ userInfo.Email }}
                                </el-dropdown-item>
                                <el-dropdown-item command="myself">个人信息修改</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
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
    .nav-site {
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: #001529;
        color: #fff;
        overflow: hidden;
        transition: width 0.5s;
        .logo {
            display: flex;
            align-items: center;
            height: 50px;
            cursor: pointer;
            img {
                margin: 0 16px;
                width: 32px;
                height: 32px;
            }
            .sys-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .nav-menu {
            height: calc(100vh - 50px);
            border-right: none;
        }
        // 合并
        &.fold {
            width: 64px;
        }
        // 展开
        &.unfold {
            width: 200px;
        }
    }
    .content-right {
        margin-left: 200px;
        // 合并
        &.fold {
            margin-left: 64px;
        }
        // 展开
        &.unfold {
            margin-left: 200px;
        }
        .nav-top {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 0 20px;
            .nav-left {
                display: flex;
                align-items: center;
                .menu-fold {
                    margin-right: 15px;
                    font-size: 18px;
                }
            }
            .user-info {
                .notice {
                    line-height: 30px;
                    margin-right: 15px;
                }
                .user-link {
                    cursor: pointer;
                    color: #409eff;
                    line-height: 50px;
                }
            }
        }
        .wrapper {
            background: #eef0f3;
            padding: 20px;
            height: calc(100vh - 50px);
            transition: width 0.5s;
            .main-page {
                background: #fff;
                height: 100%;
                transition: width 0.5s;
            }
        }
    }
}
</style>
