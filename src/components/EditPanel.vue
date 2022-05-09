<script setup>
import { ref, reactive, getCurrentInstance, watch } from 'vue';
import { ElNotification } from 'element-plus';
const { appContext } = getCurrentInstance();
const { modifyStudent } = appContext.config.globalProperties.$api;

const emits = defineEmits(['close']);

const props = defineProps({
    student: {
        type: Object,
        default: {},
    },
    show: {
        type: Boolean,
        default: false,
    },
});

let FormModel = reactive({ students: props.student });
let Scores = reactive({
    UsualScore: '',
    ExamScore: '',
    TotalSCore: '',
});
watch(
    () => props.student,
    val => {
        FormModel.students = val;
    }
);

const onClose = () => {
    //向父组件发消息
    emits('close');
};
const EditStudent = () => {
    modifyStudent(FormModel.students).then(res => {
        if (res) {
            ElNotification({
                title: '提示',
                message: '修改成功！',
            });
        }
    });
};

const resetForm = () => {
    FormModel.students = {};
};

const activeName = ref('first');

const handleClick = (tab, event) => {
    console.log(tab, event);
};
</script>

<template>
    <el-drawer
        ref="drawerRef"
        v-model="show"
        title="学生信息"
        direction="rtl"
        size="40%"
        @close="onClose"
        close-on-press-escape
    >
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="编辑信息" name="first">
                <div v-if="props.student">
                    <div class="demo-drawer__content">
                        <el-form
                            ref="studentRef"
                            model="FormModel.students"
                            label-position="left"
                            label-width="80px"
                        >
                            <el-form-item label="学号" prop="Code">
                                <el-input v-model="FormModel.students.Code" disabled />
                            </el-form-item>
                            <el-form-item label="姓名" prop="RealName">
                                <el-input v-model="FormModel.students.RealName" disabled />
                            </el-form-item>
                            <el-form-item label="登录密码" prop="Password">
                                <el-input v-model="FormModel.students.Password" />
                            </el-form-item>
                            <el-form-item label="学院" prop="College">
                                <el-input v-model="FormModel.students.College" />
                            </el-form-item>
                            <el-form-item label="专业" prop="Major">
                                <el-input v-model="FormModel.students.Major" />
                            </el-form-item>
                            <el-form-item label="所在宿舍" prop="DormitoryCode">
                                <el-input v-model="FormModel.students.DormitoryCode" />
                            </el-form-item>
                            <el-form-item label="联系方式" prop="Phone">
                                <el-input v-model="FormModel.students.Phone" />
                            </el-form-item>
                            <el-form-item label="备注" prop="Remark">
                                <el-input v-model="FormModel.students.Remark" />
                            </el-form-item>
                        </el-form>
                        <div class="demo-drawer__footer">
                            <el-button type="primary" @click="EditStudent">确认</el-button>
                            <el-button @click="resetForm(studentRef)">重置</el-button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h1>none</h1>
                </div>
            </el-tab-pane>
            <el-tab-pane label="学生成绩" name="second">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>考试成绩</span>
                        </div>
                    </template>
                    <el-form model="Scores" label-position="left" label-width="80px">
                        <el-form-item label="平时成绩" prop="Code">
                            <el-input v-model="Scores.UsualScore" />
                        </el-form-item>
                        <el-form-item label="考试成绩" prop="RealName">
                            <el-input v-model="Scores.ExamScore" />
                        </el-form-item>
                        <el-form-item label="总成绩" prop="Password">
                            <el-input v-model="Scores.TotalScore" />
                        </el-form-item>
                        <el-button type="primary">提交</el-button>
                    </el-form>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </el-drawer>
</template>
