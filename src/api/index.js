/**
 * api管理
 */

import request from '../utils/request';
export default {
    tlogin(param) {
        return request({
            url: '/users/tlogin',
            method: 'post',
            data: param,
            mock: false,
        });
    },
    slogin(param) {
        return request({
            url: '/users/slogin',
            method: 'post',
            data: param,
            mock: false,
        });
    },
};
