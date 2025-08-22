"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let indicatorDots = common_vendor.ref(true);
    let autoplay = common_vendor.ref(true);
    let interval = common_vendor.ref(5e3);
    let duration = common_vendor.ref(1e3);
    let banners = common_vendor.ref([]);
    let categories = common_vendor.ref([]);
    function gridItemClick(event) {
      let cate = categories.value[event.detail.index];
      if (cate.enable) {
        common_vendor.index.navigateTo({
          url: "/pages/interview/interview?cate=" + cate.name
        });
      } else {
        common_vendor.index.showToast({
          title: "快马加鞭制作中",
          duration: 2e3,
          icon: "none"
        });
      }
    }
    function bannerClick(data) {
      common_vendor.index.setStorage({
        key: "wvUrl",
        data: data.url,
        success() {
          common_vendor.index.navigateTo({
            url: "/pages/webview/webview"
          });
        }
      });
    }
    common_vendor.onLoad(() => {
      common_vendor.index.getStorage({
        key: "banners",
        success: (res) => {
          banners.value = res.data;
        },
        fail: (err) => {
          common_vendor.index.showLoading({
            title: "数据加载中..."
          });
          utils_api.getAllBanners().then((res) => {
            banners.value = res;
            common_vendor.index.setStorage({
              key: "banners",
              data: res
            });
          }).catch((err2) => {
            common_vendor.index.__f__("log", "at pages/index/index.vue:109", err2);
          });
        }
      });
      common_vendor.index.getStorage({
        key: "cates",
        success: (res) => {
          categories.value = res.data;
        },
        fail: (err) => {
          common_vendor.index.showLoading({
            title: "数据加载中..."
          });
          utils_api.getAllCategories().then((res) => {
            categories.value = res;
            common_vendor.index.setStorage({
              key: "cates",
              data: res
            });
          }).catch((err2) => {
            common_vendor.index.__f__("log", "at pages/index/index.vue:130", err2);
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(banners), (banner, index, i0) => {
          return {
            a: banner.image,
            b: common_vendor.o(($event) => bannerClick(banner), index),
            c: index
          };
        }),
        b: common_vendor.unref(indicatorDots),
        c: common_vendor.unref(autoplay),
        d: common_vendor.unref(interval),
        e: common_vendor.unref(duration),
        f: common_vendor.f(common_vendor.unref(categories), (cate, index, i0) => {
          return {
            a: cate.src,
            b: common_vendor.t(cate.text),
            c: index,
            d: "c84a7b60-1-" + i0 + ",c84a7b60-0",
            e: common_vendor.p({
              index
            })
          };
        }),
        g: common_vendor.o(gridItemClick),
        h: common_vendor.p({
          column: 3,
          ["show-border"]: true,
          square: false
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
