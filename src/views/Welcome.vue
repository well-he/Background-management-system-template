<script setup>
import { ref, getCurrentInstance, computed, onMounted } from 'vue';
defineProps({
    content: {
        type: String,
        default: '',
    },
});

const { proxy } = getCurrentInstance();

const { $store, $api, $storage } = proxy;
const user = ref([]);

const tips = computed({
    get() {
        return '';
    },
});
console.log($store);
</script>

<template>
    <div class="welcome">
        <el-row>
            <el-col :span="8">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>工作台</span>
                        </div>
                    </template>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>今日事项</span>
                        </div>
                    </template>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">今天有4项工作任务!</div>
                    </template>
                    <div class="card-body">
                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.welcome {
    width: 100%;
    height: 100%;
    padding: 15px;
    .box-card {
        padding: 15px;
        margin: 0 10px;
    }
    .card-body {
        font-size: 14px;
        line-height: 1rem;
    }
}
</style>
