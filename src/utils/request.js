/**
 * axios二次封装
 */
import axios from 'axios';
import config from '../config';
import { ElMessage } from 'element-plus';
import router from '../router';
const ERROE_MSG = {
    TOKEN_INVALID: '登录状态超时,请重新登录',
    NETWORK_ERROR: '网络请求异常，请稍后重试',
};

//创建一个axios实例，添加全局配置即defauls
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,
});

//请求拦截
service.interceptors.request.use(request => {
    return request;
});

//响应拦截
service.interceptors.response.use(response => {
    //response.data是请求的返回数据，code是自定义并非statusCode
    const { code, data, msg } = response.data;
    if (code === 200) {
        console.log(200);
        return data;
    } else if (code === 50001) {
        ElMessage.error(ERROE_MSG.TOKEN_INVALID);
        //跳转登录页
        setTimeout(() => {
            router.push('/login');
        }, 2000);
        return Promise.reject(ERROE_MSG.TOKEN_INVALID);
    } else {
        ElMessage.error(msg || ERROE_MSG.NETWORK_ERROR);
        return Promise.reject(msg || ERROE_MSG.NETWORK_ERROR);
    }
});

/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options) {
    options.method = options.method || 'get';
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data; //axios的get和post不同，这里将二者相同
    }
    if (typeof options.mock != 'undefined') {
        config.mock = options.mock;
    }
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi; //防止生产环境的api为mockapi
    } else {
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
    }
    console.log(options);
    return service(options);
}
['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
    request[item] = (url, data, options) => request({ url, data, method: item, ...options });
});

export default request;
