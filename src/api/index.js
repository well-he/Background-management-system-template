/**
 * api管理
 */

import request from '../utils/request';
export default {
    login(param) {
        console.log(param)
        return request({
            url: '/users/login',
            method: 'post',
            data: param,
            mock: false,
        });
    },
};
