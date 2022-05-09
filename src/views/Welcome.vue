<script>
export default {
    name: 'Welcome',
    props: {
        content: {
            type: String,
            default: '',
        },
    },
    data: () => {
        return {
            user: {},
            courses: [],
        };
    },
    methods: {
        async getCourse() {
            const userinfo = this.$storage.getItem('userinfo');
            const courses = await this.$api.getCourse({
                tcode: userinfo.Code,
            });
            this.courses = JSON.parse(courses);
            this.$store.commit('saveCourseInfo', JSON.parse(courses));
        },
    },
    computed: {
        tips() {
            return this.courses.length === 0
                ? '今天没有课，可以休息了！'
                : `今天有${this.courses.length}节课哦！不要迟到哦！`;
        },
    },
    mounted() {
        this.user = this.$store.state.userinfo;
        this.getCourse();
    },
};
</script>

<template>
    <div class="welcome">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>工作台</span>
                </div>
            </template>
            {{ tips }}
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.welcome {
    width: 100%;
    height: 100%;
    background: url(../assets/images/welcome.png) no-repeat center;
    padding: 15px;
    .box-card {
        width: 50%;
        padding: 15px;
    }
}
</style>
