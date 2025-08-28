<template>
	<view v-if="record">
	  <uni-card v-if="record.question">
	    <view>
	      <uni-tag text="面试题" type="primary"></uni-tag>
	      <view class="content">{{record.question.content}}</view>
	    </view>
	  </uni-card>
	  <uni-card v-if="record.answer">
	    <view>
	      <uni-tag text="你的答案" type="success"></uni-tag>
	      <view class="content">{{record.answer.category}}</view>
	    </view>
	  </uni-card>
	  <uni-card v-if="record.answer">
	    <view>
	      <uni-tag text="面试" type="warning"></uni-tag>
	      <view class="content">{{record.answer.content}}</view>
	    </view>
	  </uni-card>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	import {
		onLoad
	} from '@dcloudio/uni-app';


	let record = ref(null)
	
	onLoad(() =>{
		uni.getStorage({
			key:'record_item',
			success: res =>{
				record.value = res.data
			}
		})
	})
</script>

<style>
.content{
	margin-top: 8px;
}
</style>