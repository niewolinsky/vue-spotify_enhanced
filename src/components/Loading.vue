<template>
	<div class="card-level0 wrap">
		<div class="lds-dual-ring"></div>
	</div>
</template>

<script setup></script>

<style scoped>
	.wrap {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.lds-dual-ring {
		display: inline-block;
		width: 80px;
		height: 80px;
	}
	.lds-dual-ring:after {
		content: ' ';
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid rgba(255, 255, 255, 0.75);
		border-color: rgba(255, 255, 255, 0.75) transparent rgba(255, 255, 255, 0.75)
			transparent;
		animation: lds-dual-ring 1.6s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
