/**
 * api管理
 */

import request from '../utils/request';
export default {
    login(param) {
        return request({
            url: '/login',
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
