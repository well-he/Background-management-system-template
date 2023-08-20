/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'; //防止没有定义
const EnvConfig = {
    dev: {
        baseApi: 'http://localhost:3001/api',
        mockApi: 'https://www.fastmock.site/mock/acc4ca41a75df77da17a3b160379f6b6/api',
    },
    prod: {
        baseApi: 'https://api.wellcoding.cn/api',
        mockApi: 'https://www.fastmock.site/mock/acc4ca41a75df77da17a3b160379f6b6/api',
    },
};

export default {
    env,
    namespace: 'attendance',
    mock: true, //全局控制是否mock
    loading: true,
    ...EnvConfig[env],
};
