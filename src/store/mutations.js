/**
 * mutations 业务层数据提交
 */

import storage from '../utils/storage';

export default {
    saveUserInfo(state, userinfo) {
        state.userinfo = userinfo;
        storage.setItem('userinfo', userinfo);
    },

    saveCourseInfo(state, courseinfo) {
        state.courseinfo = courseinfo;
        storage.setItem('courseinfo', courseinfo);
    },
};
