<script>
export default {
    name: 'Login',
    methods: {
        goHome() {
            this.$router.push('/welcome');
        },
        login() {
            this.$request.get('/login', { name: '250' }).then(res => {
                console.log(res);
            });
        },
    },
};
</script>

<template>
    <h1>欢迎来到登录页面</h1>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="goHome">回到首页</el-button>
</template>

<style scoped>
a {
    color: #42b983;
}
</style>
