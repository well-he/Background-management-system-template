<script>
import { View, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
export default {
    name: 'Login',
    data: () => {
        return {
            View,
            User,
            role: '',
            options: [
                {
                    value: 'teacher',
                    label: '教师',
                },
                {
                    value: 'student',
                    label: '学生',
                },
                {
                    value: 'admin',
                    label: '管理员',
                },
            ],
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
        successTip() {
            ElMessage({
                message: `登陆成功`,
                type: 'success',
            });
        },
        login() {
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    switch (this.role) {
                        case 'teacher':
                            this.teacherLogin();
                            break;
                        case 'student':
                            this.stuLogin();
                            break;
                        default:
                            break;
                    }
                }
            });
        },

        teacherLogin() {
            this.$api.tlogin(this.user).then(res => {
                this.successTip();
                setTimeout(() => {
                    this.$store.commit('saveUserInfo', JSON.parse(res));
                    this.$router.push('/');
                }, 800);
            });
        },
        stuLogin() {
            this.$api.slogin(this.user).then(res => {
                this.successTip();
                setTimeout(() => {
                    this.$store.commit('saveUserInfo', JSON.parse(res));
                    this.$router.push('/');
                }, 800);
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
                    <el-input
                        type="text"
                        :prefix-icon="User"
                        v-model="user.userName"
                        placeholder="请输入用户名"
                    />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input
                        type="password"
                        :prefix-icon="View"
                        v-model="user.userPwd"
                        placeholder="请输入密码"
                    />
                </el-form-item>
                <el-form-item>
                    <el-select v-model="role" class="m-2" placeholder="选择权限">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
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
