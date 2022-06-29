import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { UserInfosStates } from './interface';
import { Session } from '/@/utils/storage';
import { usersApi } from "/@/api/user";

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosStates => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
			const userName = Cookies.get('userName');
			// 模拟数据
			let defaultRoles: Array<string> = [];
			let defaultAuthBtnList: Array<string> = [];
			// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let adminRoles: Array<string> = ['admin'];
			// admin 按钮权限标识
			let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
			// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let testRoles: Array<string> = ['common'];
			// test 按钮权限标识
			let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
			// 不同用户模拟不同的用户权限
			// if (userName === 'admin') {
			// 	defaultRoles = adminRoles;
			// 	defaultAuthBtnList = adminAuthBtnList;
			// } else {
			// 	defaultRoles = testRoles;
			// 	defaultAuthBtnList = testAuthBtnList;
			// }
			// 管理员
			defaultRoles = adminRoles;
			defaultAuthBtnList = adminAuthBtnList;
			const res = usersApi().getInfo({});
			let id = 0;
			res.then((data: any) => {
				id = data.data.id
			}).catch((err: any) => {
				// console.log("ddd")
				console.log(err);
			})
			// 用户信息模拟数据
			const userInfos = {
				id: id,
				username: userName,
				photo: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
				time: new Date().getTime(),
				roles: defaultRoles,
				authBtnList: defaultAuthBtnList,
			};
			// 存储用户信息到浏览器缓存
			Session.set('userInfo', userInfos);

			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				this.userInfos = userInfos;
			}
		},
	},
});
