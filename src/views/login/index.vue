<script setup>
import {View, User, Message} from '@element-plus/icons-vue';
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import storage from '@/utils/storage';
import {usersApi} from '@/api'

const router = useRouter();

const isLogin = ref(false);
const userForm = ref();
const user = reactive({
  userName: '',
  userPwd: '',
  userEmail: '',
});

const rules = {
  userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  userPwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 5, message: '长度需大于5个字符', trigger: 'blur'},
  ],
  userEmail: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
};

const login = () => {
  userForm.value.validate(async valid => {
    if (valid) {
      isLogin.value = true;
      const res = await usersApi.login(user);
      if (res) {
        storage.setItem("userInfo", res)
        await router.push('/welcome');
      } else {
        isLogin.value = false;
      }
    }
  });
};

</script>


<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" :rules="rules">
        <h1 class="title">后台管理系统</h1>
        <el-form-item prop="userName">
          <el-input type="" :prefix-icon="User" v-model.trim="user.userName" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" :prefix-icon="View" v-model.trim="user.userPwd" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item prop="userEmail" v-if="isRegistry">
          <el-input type="text" :prefix-icon="Message" v-model.trim="user.userEmail" placeholder="请输入注册邮箱"/>
        </el-form-item>
        <el-form-item>
          <div class="btn-group">
            <el-button type="primary" size="large" :loading="isLogin" @click="login" @keyup.enter="login">
              登录
            </el-button>
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(66, 66, 153, 0.7932422969187676) 0%, rgba(0, 212, 255, 1) 100%);

  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 0.8px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    border-radius: 12px;
    -webkit-border-radius: 12px;
    color: rgba(255, 255, 255, 0.75);

    .title {
      font-size: 2.5rem;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>
