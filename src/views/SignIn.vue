<template>
    <div class="attendance-records">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="班级">
                <el-input v-model.trim="queryForm.className" placeholder="通过班级查询"></el-input>
            </el-form-item>
            <el-form-item label="记录uid">
                <el-input v-model.trim="queryForm.uid" placeholder="记录UID"></el-input>
            </el-form-item>
            <!-- <el-form-item label="学生姓名">
                <el-input
                    v-model.trim="queryForm.stuName"
                    placeholder="查询单个学生签到记录"
                ></el-input>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="Query">查询</el-button>
                <el-button type="primary" @click="ExportCsv">导出为CSV</el-button>
                <!-- <el-button
                    type="warning"
                    @click="GetAbsent"
                    :class="[queryForm.uid == '' ? 'hide' : 'show']"
                >
                    查看本次未签到学生
                </el-button> -->
            </el-form-item>
        </el-form>
        <el-table
            :data="attendances"
            border
            max-height="750"
            style="width: 100%"
            empty-text="没有签到记录"
            stripe
        >
            <el-table-column prop="ID" label="记录号" width="80" />
            <el-table-column label="签到时间">
                <template #default="scope">
                    {{ timeFormat(scope.row.UnionID) }}
                </template>
            </el-table-column>
            <el-table-column prop="ClassName" label="班级" />
            <el-table-column prop="SubjectName" label="课程名称" />
            <el-table-column prop="StudentCode" label="学生学号" />
            <el-table-column prop="studentName" label="学生姓名" />
            <el-table-column prop="PublishTeacher" label="发布教师" />
            <el-table-column label="签到结果" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span
                            style="margin-left: 10px"
                            :class="[scope.row.AttendanceResult === 0 ? 'absent' : '']"
                        >
                            {{ scope.row.AttendanceResult === 0 ? '未签到' : '已签到' }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="UnionID" label="签到UID" sortable />
        </el-table>
        <div v-if="attendances.length === 0"></div>
        <div v-else></div>
    </div>
</template>

<script>
import { formatUnionID } from '../utils/time';
export default {
    data() {
        return {
            attendances: [],
            queryForm: {
                className: '',
                uid: '',
                // stuName: '',
            },
            SavePath: '',
        };
    },
    computed: {
        timeFormat(time) {
            return function (time) {
                return formatUnionID(time);
            };
        },
    },
    methods: {
        async Query() {
            this.attendances = await this.findRecords(this.queryForm);
        },
        async findRecords(queryForm) {
            const res = await this.$api.getAttendanceRecords({
                className: queryForm.className,
                uid: queryForm.uid,
                // stuName: queryForm.stuName,
            });
            return JSON.parse(res);
        },
        ExportCsv() {
            const csv = this.Array2Table(this.attendances);
            let a = document.createElement('a');
            a.href = 'data:text/txt;charset=utf-8,\ufeff' + encodeURIComponent(csv);
            a.download = '考勤记录.csv';
            a.click(); // 这里偷个懒，直接用click模拟
        },
        Array2Table(arr) {
            //save arr to csv
            let csv = '';
            const titles =
                '学生姓名,记录号,课程名称,学生学号,发布教师,签到结果,签到UID,班级,' + '\n';

            csv += titles;
            // const values = Object.values(arr[0]).toString() + '\n';
            arr.map(item => {
                csv += Object.values(item).join(',\t') + '\n';
            });
            csv += '\n';
            return csv;
        },
        // async GetAbsent() {
        //     const res = await this.$api.getAbsentStus({
        //         className: this.queryForm.className,
        //         uuid: this.queryForm.uid,
        //     });
        //     const absentStus = JSON.parse(res);
        //     absentStus.map(item=>item.RealName)
        // },
    },
};
</script>

<style lang="scss">
.attendance-records {
    padding: 20px;
}
.absent {
    color: red;
}
</style>
