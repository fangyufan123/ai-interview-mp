<template>
	<view>
		/**
		 * v-model 是一个指令，用于实现双向数据绑定。
		 */
		<z-paging ref="paging" v-model="records" @query="queryList">
			<!-- z-paging默认铺满全屏，此时页面所有view都应放在z-paging标签内，否则会被盖住 -->
			<!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
			<uni-card v-for="(item,index) in records" :key="index" @click="recordDetail(item)">
				<text >{{item.question.content}}</text>
				<view style="margin-top: 8px;">
					<uni-tag :text="item.question.subject" type="warning"></uni-tag>
					<uni-tag :text="item.question.category" type="success" style="margin-left: 8px;"></uni-tag>
				</view>
			</uni-card>
		</z-paging>
	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue';

	import {
		getAllRecords
	} from '../../utils/api';
	
	let paging = ref(null)
	// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
	let records = ref([])
	const {
		proxy
	} = getCurrentInstance()
	
	function recordDetail(data){
		uni.setStorage({
			key: 'record_item',
			data: data,
			success() {
				uni.navigateTo({
					url:'/pages/record_details/record_details'
				})
			}
		})
	}
	
	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
	function queryList(pageNo, pageSize){
		uni.showToast({
			title: '正在加载历史数据',
			icon: 'none'
		})
		
		getAllRecords(pageNo).then(res =>{
			proxy.$refs.paging.complete(res);
		}).catch(err =>{
			proxy.$refs.paging.complete(false);
		})
	}
</script>

<style>

</style>