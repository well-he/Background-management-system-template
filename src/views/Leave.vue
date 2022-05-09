<template>
    <div class="leave">
        <el-form
            class="leave-form"
            ref="form"
            :model="sizeForm"
            label-width="auto"
            label-position="top"
        >
            <el-form-item label="请假人信息">
                <el-col :span="6">
                    <el-input v-model="sizeForm.name">
                        <template #prepend>职工号</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">
                    <span class="text-gray-500"></span>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="sizeForm.code">
                        <template #prepend>姓名</template>
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-col :span="6">
                    <el-input v-model="sizeForm.college">
                        <template #prepend>所在学院</template>
                    </el-input>
                </el-col>
                <el-col :span="1" class="text-center">
                    <span class="text-gray-500"></span>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="sizeForm.college">
                        <template #prepend>联系方式</template>
                    </el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="请假类型" hide-required-asterisk>
                <el-select v-model="sizeForm.Type" placeholder="选择请假类型">
                    <el-option label="事假" value="sj" />
                    <el-option label="病假" value="bj" />
                    <el-option label="公假" value="gj" />
                    <el-option label="年假" value="nj" />
                    <el-option label="调休" value="tx" />
                </el-select>
            </el-form-item>
            <el-form-item label="请假时间">
                <el-col :span="5">
                    <el-date-picker
                        v-model="sizeForm.startTime"
                        type="date"
                        placeholder="开始时间"
                        style="width: 100%"
                    />
                </el-col>
                <el-col :span="1" class="text-center">
                    <span class="text-gray-500">——</span>
                </el-col>
                <el-col :span="5">
                    <el-date-picker
                        v-model="sizeForm.endTime"
                        placeholder="结束时间"
                        style="width: 100%"
                    />
                </el-col>
            </el-form-item>
            <el-form-item label="请假原因" class="reason">
                <el-input
                    v-model="sizeForm.reason"
                    :rows="4"
                    resize="none"
                    type="textarea"
                    placeholder="请写出您的具体请假原因"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="open1">提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElNotification } from 'element-plus';

const sizeForm = reactive({
    name: '',
    code: '',
    college: '',
    Type: '',
    startTime: '',
    endTime: '',
    reason: '',
});

const open1 = () => {
    ElNotification({
        title: '提示',
        message: '您的请假申请已提交，请耐心等待审核！',
    });
};
</script>

<style lang="scss">
.el-radio-group {
    margin-right: 12px;
}
.leave {
    padding: 20px;
}
.leave-form {
    // width: 60%;
    padding: 20px;
    .reason {
        width: 70%;
    }
}
</style>
