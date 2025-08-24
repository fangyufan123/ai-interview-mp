<template>
	<view class="common-container">
		<!-- 用户卡片 -->
		<view class="user-card">
			<!-- <template v-if="userDetail">
				<button class="user-avatar" open-type="chooseAvatar" @chooseavatar="chooseavatar">
					<image class="icon" v-if="userDetail.avatar" :src="userDetail.avatar" mode="aspectFit" />
					<image class="icon" v-else src="../../static/myPage/user-avatar.png" mode="aspectFit" />
				</button>
			</template> -->
			<image class="icon" src="../../static/myPage/user-avatar.png" />
			<!-- 	<view class="right" v-if="userDetail">
				<input class="name" v-if="isEditing" type="text" v-model="realName" @blur="submitrealName"
					:focus="isEditing" />
				<view class="name" v-else @click="editrealName">
					{{userDetail.realName ? userDetail.realName : '用户姓名'}}
				</view>
				<view class="phone" v-if="userDetail.phone">
					{{userDetail.phone}}
				</view>
			</view> -->
			<view class="right goto-login-btn">微信用户yffang </view>
		</view>

		<!-- 功能 -->
		<view class="user-func">
			<view class="user-func_item" @click="clickItem('records')" hover-class="hover-view">
				<image class="icon" src="../../static/myPage/interview.png" mode="aspectFit" />
				<text class="txt">面试记录</text>
				<image class="right-icon" src="../../static/myPage/arrow.png" mode="aspectFit" />
			</view>
			<view class="user-func_item" @click="clickItem('about')" hover-class="hover-view">
				<image class="icon" src="../../static/myPage/about.png" mode="aspectFit" />
				<text class="txt">关于</text>
				<image class="right-icon" src="../../static/myPage/arrow.png" mode="aspectFit" />
			</view>

		</view>
		<view>
			<!-- 提示窗示例 -->
			
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="success" cancelText="关闭" confirmText="了解" title="关于">
					<view>
						<view>版本 1.10.0</view>
						<view style="margin-top: 10rpx;">开发者 yffang</view>
						<view style="margin-top: 10rpx;">联系方式 0524-1788899</view>
					</view>
				</uni-popup-dialog>
			</uni-popup>
		</view>

	</view>
</template>
<style lang="scss" scoped>
	.hover-view {
		background-color: gainsboro;
		color: whitesmoke;
	}


	.common-container {
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	// 用户卡片
	.user-card {
		display: flex;
		height: 374rpx;

		box-sizing: border-box;
		padding-top: 40rpx;
		padding-left: 48rpx;
		background: linear-gradient(180deg, #287EFF 44.55%, #94BDFA 100%);

		.icon {
			width: 146rpx;
			height: 146rpx;
			margin-right: 38rpx;
		}

		.user-avatar {
			width: 146rpx;
			height: 146rpx;
			padding: 0;
			margin-right: 38rpx;
			margin-left: 0;
			border-radius: 74rpx;
			background-color: transparent;

			&::after {
				border: none;
			}

			.icon {
				margin-right: 0;
			}
		}

		.right {
			.name {
				font-size: 40rpx;
				height: 1.5em;
				line-height: 1.5em;
				font-weight: 500;
				margin-bottom: 20rpx;
				color: #ffffff;
			}

			.phone {
				font-size: 32rpx;
				color: #ffffff;
			}
		}

		.goto-login-btn {
			display: flex;
			align-items: center;
			height: 150rpx;
			color: #f0f0f0;
		}
	}

	// 功能
	.user-func {
		margin-top: -50rpx;
		border-radius: 32rpx;
		margin-left: 25rpx;
		margin-right: 25rpx;
		background-color: #fff;

		.user-func_item {
			height: 144rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 20rpx;
			box-sizing: border-box;
			border-top: 1px solid #f1f1f1;

			.icon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 16rpx;
				flex-shrink: 0;
			}

			.txt {
				color: #111;
				text-align: left;
				font-size: 34rpx;
				flex-grow: 1;
			}

			.right-icon {
				width: 48rpx;
				height: 48rpx;
				flex-shrink: 0;
			}

			.user-arrow {
				font-size: 32rpx;
				color: #999999;
			}
		}
	}

	.enter-wrap {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		box-sizing: border-box;
		overflow-x: auto;
		padding: 60rpx 48rpx 34rpx 48rpx;

		.enter-item {
			width: 186rpx;
			flex: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 26rpx;
			margin-bottom: 26rpx;

			&:nth-of-type(3n) {
				margin-right: 0;
			}
		}

		.enter-icon {
			width: 86rpx;
			height: 86rpx;
			margin-bottom: 12rpx;
		}

		.enter-name {
			text-align: center;
			font-size: 28rpx;
			font-weight: 500;
			line-height: 48rpx;
			color: #111;
		}
	}
</style>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue';
	const {
		proxy
	} = getCurrentInstance()
	let alertDialog = ref(null)

	function clickItem(item) {
		if (item == 'about') {
			//console.log('111111'+proxy.$refs.alertDialog)
			proxy.$refs.alertDialog.open()
		} else if (item == 'records') {

		}
	}
</script>

