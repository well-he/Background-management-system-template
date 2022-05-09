<script>
import { View, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
export default {
    name: 'Login',
    data: () => {
        return {
            View,
            User,
            role: '教师',
            options: [
                {
                    value: 'teacher',
                    label: '教师',
                },
                {
                    value: 'admin',
                    label: '管理员',
                },
            ],
            user: {
                Code: '',
                Password: '',
            },
            rules: {
                Code: [{ required: true, message: '请输入职工号', trigger: 'blur' }],
                Password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
                ],
            },
            logined: false,
        };
    },
    methods: {
        successTip() {
            ElMessage({
                message: `登陆成功`,
                type: 'success',
            });
        },
        login() {
            this.logined = true;
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    switch (this.role) {
                        case '教师':
                            this.teacherLogin();
                            break;
                        // case '管理员':
                        //     this.adminLogin();
                        //     break;
                        default:
                            break;
                    }
                }
            });
        },

        teacherLogin() {
            this.logined = true;
            this.$api.login(this.user).then(res => {
                this.successTip();
                this.logined = false;
                setTimeout(() => {
                    this.$store.commit('saveUserInfo', res);
                    this.$router.push('/system');
                }, 800);
            });
        },
    },
    mounted() {},
};
</script>

<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form ref="userForm" :model="user" :rules="rules">
                <div class="title">校园考勤系统-管理端</div>
                <el-form-item prop="userName">
                    <el-input
                        type="text"
                        :prefix-icon="User"
                        v-model="user.Code"
                        placeholder="请输入用户名"
                    />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input
                        type="password"
                        :prefix-icon="View"
                        v-model="user.Password"
                        placeholder="请输入密码"
                    />
                </el-form-item>

                <!-- <el-form-item>
                    <span>登录用户：</span>
                    <el-radio-group v-model="role" size="large" class="role">
                        <el-radio-button v-for="item in options" :label="item.label" />
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" class="btn-login" :loading="loaded" @click="login">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss">
.login-wrapper {
    width: 100vw;
    height: 100vh;
    background: #64a5e2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/images/loginbg.jpg');
    .modal {
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        .title {
            font-size: 2.5rem;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
        }
        .btn-login {
            width: 100%;
        }
    }
}
</style>
