<template>
	<div
		class="card card-level1"
		@mouseenter="playPreview"
		@mouseleave="stopPreview"
		@click="redirectToSpotify"
		:class="{ gradientBorder: isHovering }"
	>
		<img :src="artist.image" alt="Artist Cover Image" />
		<section>
			<h3>{{ artist.name }}</h3>
		</section>
	</div>
</template>

<script setup>
	import { defineProps, ref } from 'vue'
	import { useStore } from '../store/'

	const store = useStore()

	const isHovering = ref(false)

	let props = defineProps({
		artist: Object,
	})

	function redirectToSpotify() {
		window.location.href = `${props.artist.uri_artist}`
	}

	let previewTrack = new Audio(props.artist.preview)
	previewTrack.loop = true

	let fadeInVolume
	function playPreview() {
		if (store.allowSound) {
			previewTrack.play()
			previewTrack.volume = parseFloat((0.01).toFixed(2))

			fadeInVolume = setInterval(() => {
				previewTrack.volume = parseFloat((previewTrack.volume + 0.01).toFixed(2))
				if (previewTrack.volume === parseFloat((0.5).toFixed(2))) {
					clearInterval(fadeInVolume)
				}
			}, 100)
		}

		isHovering.value = true
	}

	function stopPreview() {
		previewTrack.pause()
		previewTrack.currentTime = 0
		clearInterval(fadeInVolume)

		isHovering.value = false
	}
</script>

<style scoped>
	.card {
		height: 74px;
		display: flex;
		align-items: center;
		padding: 6px;
		cursor: url('../assets/musical-note.png'), auto;
	}

	.card img {
		height: 100%;
		border-radius: 8px;
	}

	section {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		margin-left: 16px;
		font-size: 1.15rem;
		overflow: hidden;
		white-space: nowrap;
	}

	.gradientBorder::after {
		position: absolute;
		content: '';
		top: calc(-1 * 3px);
		left: calc(-1 * 3px);
		z-index: -1;
		width: calc(100% + 3px * 2);
		height: calc(100% + 3px * 2);
		background: url('../assets/test.webp');
		background-size: 300% 300%;
		background-position: 0 50%;
		opacity: 0.5;
		border-radius: 14px;
		animation: moveGradient 8s alternate infinite;
	}

	@keyframes moveGradient {
		50% {
			background-position: 100% 10%;
		}
	}
	/*.gradientBorder::after {
		position: absolute;
		content: '';
		top: 35%;
		left: 10%;
		z-index: -1;
		height: 30%;
		width: 85%;
		filter: blur(16px);
		background: linear-gradient(
			to left,
			#ff5770,
			#e4428d,
			#c42da8,
			#9e16c3,
			#6501de,
			#9e16c3,
			#c42da8,
			#e4428d,
			#ff5770
		);
		background-size: 200% 200%;
		animation: animateGlow 2s linear infinite;
	}

	@keyframes animateGlow {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 200% 50%;
		}
	}*/
</style>
