<template>
	<view>
		<view class="header">
			<uni-card class="picker">
				<picker :range="models" range-key="name" @change="modelChange">
					<view>{{model.name}}</view>
				</picker>
			</uni-card>
			<uni-card class="picker">
				<picker :range="categories" range-key="text" @change="cateChange">
					<view>{{category.text}}</view>
				</picker>
			</uni-card>
		</view>

		/**
		* v-if：动态创建/销毁 DOM，初始渲染开销较高。
		v-show：始终存在 DOM，切换开销低。
		*/
		<scroll-view :scroll-top="0" :scroll-y="true" class="content">
			<uni-card v-if="showContent" title="AI面试" :extra="`${category.text}面试题`">
				<text class="uni-body">{{content}}</text>
			</uni-card>
		</scroll-view>

		<view class="footer">
			<button type="primary" :disabled="startBtn.disable" v-show="startBtn.show" class="startBtn"
				@click="startInterview">{{startBtn.text}}</button>
			<view v-show="!startBtn.show" class="answerBtnView">
				<button @click="handleAnswer('A')" v-show="!startBtn.show" :disabled="!startBtn.disable"
					class="answerBtn" style="background-color: dodgerblue;">A</button>
				<button @click="handleAnswer('B')" v-show="!startBtn.show" :disabled="!startBtn.disable"
					class="answerBtn" style="background-color: olivedrab;">B</button>
				<button @click="handleAnswer('C')" v-show="!startBtn.show" :disabled="!startBtn.disable"
					class="answerBtn" style="background-color: orangered;">C</button>
				<button @click="handleAnswer('D')" v-show="!startBtn.show" :disabled="!startBtn.disable"
					class="answerBtn" style="background-color: orange;">D</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	/** vue3 响应式编程
	 *  ref: 用于单一值或简单数据的响应式管理，返回一个包含 value 属性的对象，适合简单场景。
		reactive: 用于复杂对象的响应式管理，直接返回代理对象，适合管理多个相关属性的状态。
	 */
	import {
		ref,
		reactive
	} from "vue";

	import {
		getAllModels,
		getAllCategoryItems,
		chat
	}
	from "../../utils/api";

	import {
		onLoad
	}
	from '@dcloudio/uni-app';

	import {
		getSessionId
	} from "../../utils/tool";

	let subject = ref('')
	let content = ref('')
	let showContent = ref(false)
	let models = ref([])
	let categories = ref([])

	let model = reactive({
		name: '请选择AI模型',
		charge: undefined
	})

	let category = reactive({
		text: '请选择技术分类',
		value: '请选择技术分类'
	})

	let startBtn = reactive({
		text: '开始面试',
		disable: false,
		show: true
	})



	function modelChange(event) {
		updateStartBtn()
		Object.assign(model, models.value[event.detail.value])
	}

	function cateChange(event) {
		updateStartBtn()
		Object.assign(category, categories.value[event.detail.value])
	}
	
	function updateStartBtn(){
		startBtn.show = true
		//便于回答完 问题后 展示按钮信息
		startBtn.text = '开始面试'
		startBtn.disable = false
		showContent.value = false
		content.value = ''
	}

	
	function startInterview() {
		if (model.name == '请选择AI模型') {
			uni.showToast({
				title: '请选择AI模型',
				icon: 'none'
			})
			return;
		}

		if (category.text === '请选择技术分类') {
			uni.showToast({
				title: '请选择技术分类',
				icon: 'none'
			})
			return;
		}
		//每次点击面试按钮 生成一个新的sessionID,后端 每到题目的回答和问题都公用一个sessionID
		let mpRequest = {
			sessionId: generateSessionID(),
			content: category.value,
			type: 'q',
			subject: subject.value,
			modelName: model.name
		}

		uni.showLoading({
			title: '面试官正在出题'
		})
		//禁用按钮
		startBtn.disable = true
		handleRequest(mpRequest)
	}
	
	function handleAnswer(data){
		let mpRequest = {
			sessionId: uni.getStorageSync('sessionId'),
			content: data,
			type: 'a',
			subject: subject.value,
			modelName: model.name
		}
		
		uni.showLoading({
			title: '面试官正在思考'
		})
		//禁用按钮
		startBtn.disable = false
		handleRequest(mpRequest)
	}
	
	function handleRequest(data){
		chat(data).then(res => {
			startBtn.show = !startBtn.show
			//便于回答完 问题后 展示按钮信息
			startBtn.text = '再来一题'
			showContent.value = true
			content.value = res.content
		})
	}

	function generateSessionID() {
		let sessionId = getSessionId();
		uni.setStorage({
			key: 'sessionId',
			data: sessionId
		})
		return sessionId;
	}
	onLoad((options) => {
		let cate = options.cate
		subject.value = cate
		console.log(cate)
		uni.getStorage({
			key: 'models',
			success: (res) => {
				console.log('本地加载模型数据', res.data)
				models.value = res.data
			},
			fail: (err) => {

				getAllModels().then((res) => {
					console.log('加载网络模型数据', res)
					models.value = res
					uni.setStorage({
						key: 'models',
						data: res
					})
				})
			}
		})
		uni.getStorage({
			key: cate + "_items",
			success(res) {
				console.log('本地加载技术分类数据', res.data)
				categories.value = res.data
			},
			fail(err) {
				getAllCategoryItems(cate).then(res => {
					console.log('加载网络技术分类数据', res)
					categories.value = res
					uni.setStorage({
						key: cate + "_items",
						data: res
					})
				})
			}
		})
	})
</script>

<style>
	.picker {
		width: 49%;
		display: inline-block;
	}

	.header {
		position: fixed;
		width: 100%;
		top: 0px;
		background-color: white;
		opacity: 1;
	}

	.footer {
		position: fixed;
		left: 0;
		width: 100%;
		height: 64px;
		bottom: 0px;
		background-color: white;
		display: flex;
		align-items: center;
		opacity: 1;
		justify-content: center;
	}

	.startBtn {
		width: 90%;
		transform-style: preserve-3d;
	}

	.answerBtnView {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 70%;
	}

	.answerBtn {
		width: 48px;
		height: 48px;
		border-radius: 48px;
	}

	.content {
		position: fixed;
		top: 72px;
		bottom: 64px;
	}
</style>