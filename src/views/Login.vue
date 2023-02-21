<script setup>
import { View, User, Message } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, getCurrentInstance, ref } from 'vue';

const { proxy } = getCurrentInstance();
const { $api, $store, $router } = proxy;

const logined = ref(false);
const isRegistry = ref(false);
const userForm = ref();
const user = reactive({
    userName: '',
    userPwd: '',
    userEmail: '',
});

const rules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    userPwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
    ],
    userEmail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
};
const successTip = () => {
    ElMessage({
        message: `登录成功`,
        type: 'success',
    });
};

const login = () => {
    userForm.value.validate(valid => {
        if (valid) {
            logined.value = true;
            $api.users
                .login(user)
                .then(res => {
                    successTip();
                    setTimeout(() => {
                        $store.commit('saveUserInfo', res);
                        $router.push('/system');
                    }, 800);
                })
                .catch(e => {
                    logined.value = false;
                });
        }
    });
};

function createAccount() {
    userForm.value.validate(valid => {
        if (valid) {
            $api.users.registry(user).then(res => $store.commit('saveUserInfo', res));
        }
    });
}

const registry = () => {
    isRegistry.value = true;
    createAccount();
};
</script>

<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form ref="userForm" :model="user" :rules="rules">
                <h1 class="title">后台管理系统</h1>
                <el-form-item prop="userName">
                    <el-input
                        type=""
                        :prefix-icon="User"
                        v-model.trim="user.userName"
                        placeholder="请输入用户名"
                    />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input
                        type="password"
                        :prefix-icon="View"
                        v-model.trim="user.userPwd"
                        placeholder="请输入密码"
                    />
                </el-form-item>
                <el-form-item prop="userEmail" v-if="isRegistry">
                    <el-input
                        type="text"
                        :prefix-icon="Message"
                        v-model.trim="user.userEmail"
                        placeholder="请输入注册邮箱"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="isRegistry" @click="createAccount">
                        确认注册
                    </el-button>
                    <div class="btn-group" v-else>
                        <el-button type="primary" size="large" :loading="logined" @click="login">
                            登录
                        </el-button>
                        <el-button type="success" size="large" @click="registry">注册</el-button>
                    </div>
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
    // background-image: url('../assets/images/loginbg.jpg');
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
    }
}
</style>
