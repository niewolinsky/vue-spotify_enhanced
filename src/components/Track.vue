<template>
	<div
		class="card card-level1"
		@mouseenter="playPreview"
		@mouseleave="stopPreview"
		@click="redirectToSpotify"
		:class="{ gradientBorder: isHovering }"
	>
		<img :src="track.image" alt="Track Cover Image" />
		<section>
			<h3>{{ track.title }}</h3>
			<h5>{{ track.artists[0] }}</h5>
			<h6>{{ track.album }}</h6>
		</section>
	</div>
</template>

<script setup>
	import { defineProps, ref } from 'vue'
	import { useStore } from '../store/'

	const store = useStore()

	const isHovering = ref(false)

	let props = defineProps({
		track: Object,
	})

	function redirectToSpotify() {
		window.location.href = `${props.track.uri}`
	}

	//? ADD FADE OUT VOLUME, JUST LIKE FADE IN? SINCE ITS A LOOPED AUDIO
	let previewTrack = new Audio(props.track.preview)
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

	h5 {
		font-size: 0.85em;
	}

	h6 {
		font-size: 0.75em;
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
</style>
