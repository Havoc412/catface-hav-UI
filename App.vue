<script setup>
	import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

	import usePhoneInforStore from "./store/phoneInfor";
	const phoneInforStore = usePhoneInforStore();

	onLaunch(() => {
		console.log('App Launch!')
		const infor = uni.getWindowInfo();
		console.info(infor);
		// console.info(infor.statusBarHeight);
		// console.info(infor.windowWidth);
		phoneInforStore.setPhoneInfor(infor);
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
	@import "./css/maggin.css";
	@import "./css/theme/index.scss";

	/* font */
	@import "./static/font/stylesheet.css";
	
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
		// background-image: url("http://127.0.0.1:8000/static/images/back-5.png");
		// background-image: url("http://vv9710nr2082.vicp.fun/static/images/back-5.png");
		background-image: url(http://localhost/background/back-5.png);
		background-repeat: repeat;
		background-size: 70%;
	}

	page {
    	background-color: $h-bg-light;
	}
</style>
