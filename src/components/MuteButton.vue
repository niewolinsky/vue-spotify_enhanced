<template>
	<div class="wrap card-level2">
		<label class="volume">
			<input @change="allowSound" type="checkbox" />
			<svg viewBox="0 0 108 96">
				<path
					d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"
				></path>
				<path
					d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"
				></path>
				<path
					d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"
				></path>
			</svg>
		</label>
	</div>
</template>

<script setup>
	import { useStore } from '../store/'

	const store = useStore()

	function allowSound() {
		store.allowSound = !store.allowSound
		console.log(store.allowSound)
	}
</script>

<style scoped>
	.wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		padding: 40px;
		border-radius: 100%;
		transform: scale(0.3);
		border: 8px solid white;
	}
	.volume {
		position: relative;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
	.volume input {
		display: none;
	}
	.volume input + svg {
		display: block;
		fill: none;
		stroke: #fff;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 6px;
		width: 108px;
		height: 96px;
	}
	.volume input + svg path {
		animation: small 0.5s ease forwards;
	}
	.volume input + svg path:nth-child(2) {
		stroke-dashoffset: 1px;
	}
	.volume input + svg path:nth-child(3) {
		stroke-dashoffset: 1px;
	}
	.volume input:checked + svg path:nth-child(1) {
		animation-name: shape;
	}
	.volume input:checked + svg path:nth-child(2) {
		animation-name: small;
	}
	.volume input:checked + svg path:nth-child(3) {
		animation-name: large;
	}
	.volume input:not(:checked) + svg path:nth-child(1) {
		animation-name: shape-r;
	}
	.volume input:not(:checked) + svg path:nth-child(2) {
		animation-name: small-r;
	}
	.volume input:not(:checked) + svg path:nth-child(3) {
		animation-name: large-r;
	}
	@keyframes small {
		0%,
		30% {
			stroke-dasharray: 0 0 30px 64px;
		}
		40% {
			stroke-dashoffset: 16px;
		}
		80%,
		100% {
			stroke-dashoffset: 1px;
		}
		70% {
			stroke-dasharray: 0 43px 30px 64px;
		}
		100% {
			stroke-dasharray: 0 39px 30px 64px;
		}
	}
	@keyframes small-r {
		0% {
			stroke-dasharray: 0 39px 30px 64px;
		}
		0%,
		40% {
			stroke-dashoffset: 1px;
		}
		70% {
			stroke-dashoffset: 16px;
		}
		70%,
		100% {
			stroke-dasharray: 0 0 30px 64px;
		}
	}
	@keyframes large {
		0%,
		30% {
			stroke-dasharray: 0 0 50px 84px;
		}
		40% {
			stroke-dashoffset: 16px;
		}
		80%,
		100% {
			stroke-dashoffset: 1px;
		}
		70% {
			stroke-dasharray: 0 82px 32px 84px;
		}
		100% {
			stroke-dasharray: 0 78px 32px 84px;
		}
	}
	@keyframes large-r {
		0% {
			stroke-dasharray: 0 78px 32px 84px;
		}
		0%,
		40% {
			stroke-dashoffset: 1px;
		}
		70% {
			stroke-dashoffset: 16px;
		}
		70%,
		100% {
			stroke-dasharray: 0 0 50px 84px;
		}
	}
	@keyframes shape {
		0% {
			stroke-dasharray: 60px 0 184px;
			stroke-dashoffset: 0;
		}
		70% {
			stroke-dasharray: 63px 51px 184px;
			stroke-dashoffset: 21px;
		}
		100% {
			stroke-dasharray: 59px 47px 184px;
			stroke-dashoffset: 17px;
		}
	}
	@keyframes shape-r {
		0% {
			stroke-dasharray: 59px 47px 184px;
			stroke-dashoffset: 17px;
		}
		100% {
			stroke-dasharray: 60px 0 184px;
			stroke-dashoffset: 0;
		}
	}
</style>
