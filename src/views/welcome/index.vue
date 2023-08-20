<script setup>
import { ref, computed, onMounted } from 'vue';
import timeUtil from '@/utils/time';
import Card from '@/views/welcome/components/Card.vue';


const dynamicTime = ref(timeUtil.currentTime());

onMounted(() => {
    setInterval(() => {
        dynamicTime.value = timeUtil.currentTime();
    }, 1000);
});


</script>

<template>
    <div class="welcome">
        <div class="title">
            <p class="time">{{ dynamicTime }}</p>
        </div>
        <el-row :gutter="10">
            <el-col :span="8">
                <Card title="个人中心" msg="ToDo" :height=200 />
            </el-col>
            <el-col :span="8">
                <Card msg="welcome" />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.welcome {
    width: 100%;
    height: 100%;
    padding: 15px;

    .title {
        height: 55px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 15px;
        overflow: hidden;
        position: relative;

        .time {
            position: absolute;
        }
    }
}
</style>
