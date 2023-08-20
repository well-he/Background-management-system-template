<script setup>
const props = defineProps({
    title: {
        type: String,
        default() {
            return '工作台';
        },
    },
    msg: {
        type: String,
        default() {
            return '';
        },
    },
    height: {
        type: Number,
        default() {
            return 20;
        },
    }
});
</script>

<template>
    <el-card class="box-card" shadow="hover" :body-style="{ height: props.height + 'px' }">
        <template #header>
            <div class="card-header">
                <span>{{ props.title }}</span>
            </div>
        </template>

        <slot name="content">
            <p>{{ props.msg }}</p>
        </slot>
    </el-card>
</template>
