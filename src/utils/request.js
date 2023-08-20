/**
 * axios二次封装
 */
import axios from "axios";
import config from "../config";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()

const ERROR_MSG = {
    TOKEN_INVALID: "登录状态超时,请重新登录",
    NETWORK_ERROR: "网络请求异常，请稍后重试",
};

const url = config.mock ? config.mockApi : config.baseApi;
//创建一个axios实例，添加全局配置即defaults
const service = axios.create({
    baseURL: url,
    timeout: 8000
});

//请求拦截
service.interceptors.request.use(
    (request) => {
        if(config.loading){
            //TODO: do loading
        }
        return request;
    },
    (err) => {
        if (err) {
            ElMessage.error(err);
        }
    }
);

//响应拦截
service.interceptors.response.use(async (response) => {
    //response.data是请求的返回数据，code是自定义并非statusCode
    const {code, data, msg} = response.data;
    //TODO: 统一处理loading
    if (code === 200) {
        ElMessage.success(msg);
        return data;
    } else if (code === 50001) {
        ElMessage.error(ERROR_MSG.TOKEN_INVALID);
        //跳转登录页
        await router.push("/login")
        return Promise.reject(ERROR_MSG.TOKEN_INVALID);
    } else {
        ElMessage.error(msg || ERROR_MSG.NETWORK_ERROR);
        return Promise.reject({msg, code} || ERROR_MSG.NETWORK_ERROR);
    }
});

/**
 * 请求核心函数
 * @param {*} options 请求配置
 * @param {String} options.url 请求地址
 * @param {String} options.method 请求方法
 * @param {String} options.params 请求负载
 * @param {boolean} options.mock 是否启用mock
 * @param {object} options.loading 是否启用Loading
 * @param {selector} options.loading.dom 是否启用Loading
 */
function request(options) {
    options.method = options.method || "get";
    if (options.method.toLowerCase() === "get") {
        options.params = options.data; //axios的get和post不同，这里将二者相同
    }
    options.mock = config.mock;
    return service(options);
}

["get", "post", "put", "delete", "patch"].forEach((item) => {
    request[item] = (url, data, options) =>
        request({url, data, method: item, ...options});
});


export default request;
