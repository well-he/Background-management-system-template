<template>
    <div class="student">
        <el-form :inline="true" class="form-inline">
            <!-- <el-form-item label="学生学号">
                <el-input v-model="stuCode" placeholder="学号" />
            </el-form-item> -->
            <el-form-item label="所属班级">
                <el-input v-model="className" placeholder="所属班级" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="stuList" border style="width: 100%" max-height="750" stripe>
            <el-table-column prop="Code" sortable label="学号" />
            <el-table-column prop="RealName" label="姓名" />
            <el-table-column prop="College" label="学院" />
            <el-table-column prop="Major" label="专业" width="180" />
            <el-table-column prop="Class" label="班级" />
            <el-table-column prop="Phone" label="手机号" />
            <el-table-column prop="Email" label="邮箱" />
            <el-table-column prop="StartYear" label="入学年份" />
            <el-table-column prop="DormitoryCode" sortable label="宿舍号" />
            <el-table-column prop="Instructor" label="辅导员" />
            <el-table-column prop="Remark" label="备注" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="Edit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <edit-panel :student="editStudent" :show="showDialog" @close="close" />
    </div>
</template>

<script>
import EditPanel from '../components/EditPanel.vue';
export default {
    components: { EditPanel },
    data() {
        return {
            // stuCode: '',
            className: '22-01',
            stuList: [],
            showDialog: false,
            editStudent: {},
            input: '',
        };
    },
    methods: {
        onSubmit() {
            this.$api.getStudentByClass({ className: this.className }).then(res => {
                this.stuList = JSON.parse(res).sort((a, b) => a.Code - b.Code);
            });
        },
        Edit(index, row) {
            this.editStudent = row;
            this.showDialog = true;
        },
        close() {
            this.showDialog = false;
        },
    },
};
</script>
<style lang="scss">
.student {
    padding: 20px;
    height: 100%;
}
</style>
