import request from '../utils/request';
export default {
    login(param) {
        return request({
            url: '/users/login',
            method: 'post',
            data: param,
        });
    },
    registry(param) {
        return request({
            url: '/users/registry',
            method: 'post',
            data: param,
        });
    },
    getMenuList() {
        return request({
            url: '/config/menus',
            method: 'get',
            data: {},
        });
    },
};
