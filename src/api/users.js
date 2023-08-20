import request from '../utils/request';

export default {
    login(param, loading) {
        return request({
            url: '/users/login',
            method: 'post',
            data: param,
            loading: loading
        });
    },
    registry(param) {
        return request({
            url: '/users/registry',
            method: 'post',
            data: param,
            loading: loading
        });
    },
    getMenuList() {
        return request({
            url: '/config/menus',
            method: 'get',
            data: {},
            loading: loading
        });
    },
};
