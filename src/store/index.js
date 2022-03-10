/**
 * vuex 状态管理
 */
import { createStore } from 'vuex';
import mutations from './mutations';
import storage from '../utils/storage';

const state = {
    userinfo: '' || storage.getItem('userinfo'), //获取用户信息
};

export default createStore({
    state,
    mutations,
});
