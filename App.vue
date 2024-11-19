<script setup>
	import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

	import usePhoneInforStore from "./store/phoneInfor";
	const phoneInforStore = usePhoneInforStore();

	// import knowledge from "./store/knowledge";  // BUG 这里直接引用会出问题。
    // const knowledgeStore = knowledge();

	onLaunch(() => {
		console.log('App Launch!')
		const infor = uni.getWindowInfo();
		console.info(infor);
		// console.info(infor.statusBarHeight);
		// console.info(infor.windowWidth);
		phoneInforStore.setPhoneInfor(infor);

		// Knoeledge INIT
		// knowledgeStore.InitKnowledge();

		// Hide Tabbar
		uni.hideTabBar(); // wx 小程序是有效的。
	})
	onShow(() => {
		console.log('App Show!') 
	})
	onHide(() => {
		console.log('App Hide!')
	})

</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uni_modules/uview-plus/index.scss";
	@import "./css/flex.css";
	@import "./css/flexCF.css";
	@import "./css/animation.css";
	@import "./css/text.css";
	@import "./css/position.css";
	@import "./css/margin.css";
	@import "./css/theme/index.module.scss";

	/* font */
	// @import "./static/font/stylesheet.css";
	@font-face {
		font-family: Alimama ShuHeiTi;
		src: url('./static/font/AlimamaShuHeiTi-Bold.woff2');
	}
	
	.top-container {
		padding-top: var(--status-height);
	}

	.top-float-win {
		margin-top: var(--status-height);
	}

	.of-x-hidden {
		overflow-x: hidden;
	}

	.of-y-hidden {
		overflow-y: hidden;
	}

	.bg-img {
		// background-image: url("http://113.44.68.213/img/background/back-5.png");  // INFO 服务器 API
		// background-image: url(http://localhost/background/back-5.png);
		background-image: url(https://971e02z082.goho.co/background/back-5.png);
		
		background-repeat: repeat;
		background-size: 70%;
	}


	page {
    	background-color: $h-bg-light;
	}
</style>
