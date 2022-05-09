<template>
    <div class="qrcode">
        <div class="courses" v-if="courseList.length != 0">
            <div v-for="(course, index) in courseList" :key="course.ID" class="course">
                <el-descriptions
                    class="margin-top"
                    title="课程信息"
                    :column="5"
                    border
                    direction="vertical"
                >
                    <template #extra>
                        <el-button size="large" type="success" @click="SetQrcode(course, index)">
                            生成签到二维码
                        </el-button>
                    </template>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <user />
                                </el-icon>
                                教师名字
                            </div>
                        </template>
                        {{ course.teacherName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <iphone />
                                </el-icon>
                                课程名称
                            </div>
                        </template>
                        {{ course.SubjectName }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <location />
                                </el-icon>
                                上课地点
                            </div>
                        </template>
                        {{ course.ClassRoom }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <tickets />
                                </el-icon>
                                上课班级
                            </div>
                        </template>
                        {{ course.Class }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <timer />
                                </el-icon>
                                上课时间
                            </div>
                        </template>
                        {{ courseTime(course.StartTime, course.EndTime) }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <tickets />
                                </el-icon>
                                uid
                            </div>
                        </template>
                        {{ course.uid }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
        <div class="no-content" v-else>
            <el-empty description="暂无课程信息" />
        </div>
        <div :class="[qrShow ? 'qr-show' : 'qr-hide']">
            <qrcode-vue
                :value="qrValue"
                :size="size"
                level="H"
                margin="2"
                class="sign-qrcode"
                @click="scale"
            />
        </div>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
export default {
    components: { QrcodeVue },
    data() {
        return {
            qrcode: '',
            courseList: [],
            qrValue: '',
            size: 200,
            qrShow: false,
            uid: '',
        };
    },
    computed: {
        courseTime(st, et) {
            return (st, et) => {
                return st + '--' + et;
            };
        },
    },
    methods: {
        async getCourse() {
            this.courseList = this.$store.state.courseinfo;
        },
        SetQrcode(course, index) {
            const timeSpan = Date.parse(new Date());
            this.courseList[index].uid = timeSpan;
            this.qrShow = true;
            const startTime = new Date();
            const endTime = new Date(startTime.setMinutes(startTime.getMinutes() + 2));
            console.log(endTime);
            this.qrValue = `?uid=${timeSpan}&courseId=${course.ID}&courseName=${
                course.SubjectName
            }&teacherName=${course.teacherName}&class=${course.Class}&startTime=${
                course.StartTime
            }&classRoom=${course.ClassRoom}&endTime=${endTime.toString()}`;
        },
        scale() {
            this.size = this.size === 200 ? 700 : 200;
        },
    },
    mounted() {
        this.getCourse();
    },
};
</script>

<style lang="scss">
.qrcode {
    height: 100%;
    padding: 20px;
    display: flex;
    .courses {
        display: flex;
        flex-direction: column;
        width: 50%;
        .course {
            margin-top: 20px;
        }
    }
    .sign-qrcode {
        margin-left: 50px;
    }
    .qr-hide {
        display: none;
    }
    .qr-show {
        display: block;
    }
    .no-content {
        width: 100%;
        height: 100%;
    }
}
</style>
