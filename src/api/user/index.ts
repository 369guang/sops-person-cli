import request from "/@/utils/request";

/**
 * 用户API接口集合
 * @method getUserInfo 获取用户信息
 */
export function usersApi() {
    return {
        getInfo: (params: object) => {
            return request({
                url: "/api/user/info/",
                method: "get"
            });
        },
        getAuthToTp: () => {
            return request({
                url: "/api/user/authtotp/",
                method: "get"
            });
        },
        updateSettings: (params: object) => {
            return request({
                url: "/api/user/settings/",
                method: "post",
                data: params
            });
        }
    };
}