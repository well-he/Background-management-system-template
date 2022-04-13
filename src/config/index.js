/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'; //防止没有定义

const EnvConfig = {
    dev: {
        baseApi: 'http://localhost:8080/api',
        mockApi: 'https://www.fastmock.site/mock/57710510983dcb2e73fa31e2836f4f73/api',
    },
    test: {
        baseApi: '//test.futurefe.com/api',
        mockApi: 'https://www.fastmock.site/mock/57710510983dcb2e73fa31e2836f4f73/api',
    },
    prod: {
        baseApi: '//futurefe.com/api',
        mockApi: 'https://www.fastmock.site/mock/57710510983dcb2e73fa31e2836f4f73/api',
    },
};

export default {
    env,
    namespace: 'attendance',
    mock: true, //全局控制是否mock
    ...EnvConfig[env],
};
