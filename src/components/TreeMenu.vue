<template>
    <template v-for="menu in userMenu" :key="menu.Title">
        <el-sub-menu v-if="menu.Child" :index="menu.Title">
            <template #title>
                <el-icon><component :is="menu.Icon" /></el-icon>
                <span>{{ menu.Title }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="cmenu in menu.Child" :index="cmenu.To">
                    <el-icon><component :is="cmenu.Icon" /></el-icon>
                    <span>{{ cmenu.Title }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.To">
            <el-icon><component :is="menu.Icon" /></el-icon>
            <span>{{ menu.Title }}</span>
        </el-menu-item>
    </template>
</template>

<script>
export default {
    name: 'TreeMenu',
    props: {
        userMenu: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped></style>
