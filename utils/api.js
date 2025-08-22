

const BASE_URL = 'http://127.0.0.1:8080'
export const request = (options) =>{
	return new Promise((resolve,reject) => {
		let expire_time = uni.getStorageSync('login_expire_time');
		if(expire_time && expire_time < new Date().getTime()){
			handleRequest(options,resolve,reject)
		}else{
			uni.login({
			  provider: 'weixin', //使用微信登录
			  success: function (loginRes) {
			    uni.request({
			        url: BASE_URL+'/mp/login', //仅为示例，并非真实接口地址。
			        data: {
			            code: loginRes.code
			        },
					method:"POST",
			        header: {
			            'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			        },
			        success: (res) => {
			            console.log(res.data);
						uni.setStorage({
							key: 'user_info',
							data: res.data.data,
							success: function () {
								uni.setStorage({
									key:'login_expire_time',
									data: new Date().getTime() + 3600*1000
								})
								handleRequest(options,resolve,reject)
							}
						});
			
			           
			        }
			    });
			
			  }
			});
		}
	
	
	
	})
}

export const handleRequest = (options,resolve,reject) => {
	uni.request({
		url: BASE_URL+options.url, //仅为示例，并非真实接口地址。
		data:options.data,
		method:options.method,
		header: {
			'content-type': 'application/json',
			//自定义请求头信息
			'openid':uni.getStorageSync('user_info').openid,
			'mp_token':uni.getStorageSync('user_info').session_key
		
		},
		success: (res) => {
			return resolve(res.data)
		},
		fail: error => {
			return reject(error)
		},
		complete: () =>{
			uni.hideLoading()
		}
		
	});

}

export const getAllBanners = () => {
    return request({
        url: '/mp/banners',
        method: 'GET'
    });
};

export const getAllCategories = () => {
    return request({
        url: '/mp/categories',
        method: 'GET'
    });
};