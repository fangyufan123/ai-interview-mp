"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://127.0.0.1:8080";
const request = (options) => {
  return new Promise((resolve, reject) => {
    let expire_time = common_vendor.index.getStorageSync("login_expire_time");
    if (expire_time && expire_time < (/* @__PURE__ */ new Date()).getTime()) {
      handleRequest(options, resolve, reject);
    } else {
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        success: function(loginRes) {
          common_vendor.index.request({
            url: BASE_URL + "/mp/login",
            //仅为示例，并非真实接口地址。
            data: {
              code: loginRes.code
            },
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
              //自定义请求头信息
            },
            success: (res) => {
              common_vendor.index.__f__("log", "at utils/api.js:23", res.data);
              common_vendor.index.setStorage({
                key: "user_info",
                data: res.data.data,
                success: function() {
                  common_vendor.index.setStorage({
                    key: "login_expire_time",
                    data: (/* @__PURE__ */ new Date()).getTime() + 3600 * 1e3
                  });
                  handleRequest(options, resolve, reject);
                }
              });
            }
          });
        }
      });
    }
  });
};
const handleRequest = (options, resolve, reject) => {
  common_vendor.index.request({
    url: BASE_URL + options.url,
    //仅为示例，并非真实接口地址。
    data: options.data,
    method: options.method,
    header: {
      "content-type": "application/json",
      //自定义请求头信息
      "openid": common_vendor.index.getStorageSync("user_info").openid,
      "mp_token": common_vendor.index.getStorageSync("user_info").session_key
    },
    success: (res) => {
      return resolve(res.data);
    },
    fail: (error) => {
      return reject(error);
    },
    complete: () => {
      common_vendor.index.hideLoading();
    }
  });
};
const getAllBanners = () => {
  return request({
    url: "/mp/banners",
    method: "GET"
  });
};
const getAllCategories = () => {
  return request({
    url: "/mp/categories",
    method: "GET"
  });
};
exports.getAllBanners = getAllBanners;
exports.getAllCategories = getAllCategories;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/api.js.map
