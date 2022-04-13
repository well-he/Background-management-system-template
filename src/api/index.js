/**
 * api管理
 */

import request from '../utils/request';
export default {
    login(param) {
        return request({
            url: '/teacher/login',
            method: 'post',
            data: param,
            mock: false,
        });
    },
    getMenuList() {
        return request({
            url: '/config/menus',
            method: 'get',
            data: {},
            mock: false,
        });
    },
    getStudentByClass(param) {
        return request({
            url: '/teacher/myclass',
            method: 'get',
            data: param,
            mock: false,
        });
    },
    modifyStudent(param) {
        return request({
            url: 'student/modify',
            method: 'put',
            data: param,
            mock: false,
        });
    },
};
