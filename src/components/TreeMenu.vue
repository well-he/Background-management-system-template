<!-- 需要根据菜单栏的数据进行调整， 暂无很好的解决方式 -->
<template>
    <template v-for="menu in userMenus" :key="menu.id">
        <el-sub-menu v-if="menu.child" :index="menu.title">
            <template #title>
                <el-icon>
                    <component :is="menu.icon" />
                </el-icon>
                <span>{{ menu.title }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="cmenu in menu.child" :key="cmenu.id" :index="cmenu.to">
                    <el-icon>
                        <component :is="cmenu.icon" />
                    </el-icon>
                    <span>{{ cmenu.title }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.to">
            <el-icon>
                <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.title }}</span>
        </el-menu-item>
    </template>
</template>

<script setup>
const props = defineProps({
    userMenus: Array
})
</script>

<style lang="scss" scoped></style>
