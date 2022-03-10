<script>
import { View, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
export default {
    name: 'Login',
    data: () => {
        return {
            View,
            User,
            user: {
                userName: '',
                userPwd: '',
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                userPwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        login() {
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    this.$api.login(this.user).then(res => {
                        ElMessage({
                            message: `用户${this.user.userName}登陆成功`,
                            type: 'success',
                        });
                        this.$store.commit('saveUserInfo', res);
                        this.$router.push('/');
                    });
                }
            });
        },
    },
};
</script>

<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form ref="userForm" :model="user" :rules="rules">
                <div class="title">校园考勤系统</div>
                <el-form-item prop="userName">
                    <el-input type="text" :prefix-icon="User" v-model="user.userName" />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" :prefix-icon="View" v-model="user.userPwd" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn-login" @click="login">登录</el-button>
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
    .modal {
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        .title {
            font-size: 50px;
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
