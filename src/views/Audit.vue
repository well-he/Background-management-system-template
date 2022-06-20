<template>
    <div class="audit">
        <!-- <el-button type="primary" @click="getAllLeaveRecords">查看学生请假记录</el-button> -->

        <el-table :data="records" border style="width: 100%" max-height="750" stripe>
            <el-table-column label="当前状态">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span
                            :class="[scope.row.LeaveResult == 2 ? 'reject' : 'agree']"
                            style="margin-left: 10px"
                        >
                            {{ LeaveStatus(scope.row.LeaveStatus) }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="ID" sortable label="请假记录" />
            <el-table-column prop="Scode" label="学号" />
            <el-table-column prop="Name" label="请假人姓名" />
            <el-table-column prop="LeaveType" label="请假类型" />
            <el-table-column prop="LeaveReason" label="请假原因" />
            <el-table-column prop="LeaveStartTime" label="开始时间" />
            <el-table-column prop="LeaveEndTime" label="结束时间" />
            <el-table-column prop="Phone" label="联系方式" />
            <el-table-column prop="Address" label="去往地点" />
            <el-table-column prop="LeaveResult" sortable label="是否同意">
                <template #default="scope">
                    <div style="display: flex; align-items: center; color: green">
                        <span
                            :class="[scope.row.LeaveResult == 2 ? 'reject' : '']"
                            style="margin-left: 10px"
                        >
                            {{ LeaveResult(scope.row.LeaveResult) }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                        type="primary"
                        size="small"
                        :disabled="scope.row.LeaveResult != 0"
                        @click="Agree(scope.$index, scope.row)"
                    >
                        同意
                    </el-button>
                    <br>
                    <el-button
                        type="primary"
                        :disabled="scope.row.LeaveResult != 0"
                        size="small"
                        @click="Reject(scope.$index, scope.row)"
                    >
                        拒绝
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            records: [],
            rejected: false,
            agreed: false,
        };
    },
    computed: {
        LeaveStatus: function () {
            return statusCode => {
                let res = '';
                switch (statusCode) {
                    case 0:
                        res = '未审批';
                        break;
                    case 1:
                        res = '已审批';
                        break;
                    default:
                        break;
                }
                return res;
            };
        },
        LeaveResult: function (resultCode) {
            return resultCode => {
                let res = '';
                switch (resultCode) {
                    case 0:
                        res = '未通过';
                        break;
                    case 1:
                        res = '已通过';
                        break;
                    case 2:
                        res = '已拒绝';
                        break;
                    default:
                        break;
                }
                return res;
            };
        },
    },
    methods: {
        async getAllLeaveRecords() {
            const res = await this.$api.getAllLeaveRecords();
            this.records = JSON.parse(res);
        },
        async Agree(index, row) {
            row.LeaveStatus = 1;
            row.LeaveResult = 1;
            this.agreed = true;
            this.$api.auditLeave({
                ID: row.ID,
                LeaveStatus: 1,
                LeaveResult: 1,
                Name: row.Name,
                Scode: row.Scode,
                Phone: row.Phone,
                Address: row.Address,
                LeaveReason: row.LeaveReason,
                LeaveType: row.LeaveType,
            });
        },
        Reject(index, row) {
            row.LeaveStatus = 1;
            row.LeaveResult = 2;
            this.rejected = true;
            this.$api.auditLeave({
                ID: row.ID,
                LeaveStatus: 1,
                LeaveResult: 2,
                Name: row.Name,
                Scode: row.Scode,
                Phone: row.Phone,
                Address: row.Address,
                LeaveReason: row.LeaveReason,
                LeaveType: row.LeaveType,
            });
        },
    },
    mounted() {
        this.getAllLeaveRecords();
    },
};
</script>

<style lang="scss" scoped>
.audit {
    padding: 20px;
    .reject {
        color: red;
    }

    .agree {
        color: green;
    }
}
</style>
