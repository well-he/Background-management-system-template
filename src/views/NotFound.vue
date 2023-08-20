<template>
    <div class="NotFound">
        <el-empty description="404! 这个页面跑丢了~" />
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="scss" scoped>
.NotFound{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
