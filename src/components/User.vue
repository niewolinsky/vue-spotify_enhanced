<template>
	<div class="container card-level0">
		<h1>ACCOUNT INFO</h1>
		<div class="wrap">
			<div class="wrap-row username section">
				<img :src="store.userInfo.image" alt="User Profile Image" />
				<h2>{{ store.userInfo.name }}</h2>
			</div>
			<div class="wrap-col country section">
				<h2>COUNTRY:</h2>
				<img src="../assets/flag.svg" alt="Country Flag" />
			</div>
			<div class="wrap-col followers section">
				<h2>FOLLOWERS:</h2>
				<h2>{{ store.userInfo.followers }}</h2>
			</div>
			<!--<div class="wrap-col subscription">
				<p>SUBSCRIPTION:</p>
				<p id="followers">{{ store.userInfo.subscription }}</p>
			</div>-->
		</div>
	</div>
</template>

<script setup>
	import { useStore } from '../store/'

	const store = useStore()
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 16px;
	}

	.wrap-row {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrap-col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.wrap {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	.username > img {
		height: auto;
		width: auto;
		max-height: 64px;
		border-radius: 100%;
		margin-right: 20px;
	}
	.country > img {
		height: auto;
		width: auto;
		max-height: 32px;
		opacity: 85%;
		margin-top: 4px;
	}
</style>
