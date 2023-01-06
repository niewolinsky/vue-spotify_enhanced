<template>
	<div id="image-div" class="card-level0">
		<img :src="store.getUserFavTrackImg" alt="Your Favorite Track Cover Image" />
		<div class="wrap">
			<h1>YOUR TOP TRACK:</h1>
			<h2>{{ store.getUserFavTrack }}</h2>
		</div>
	</div>
</template>

<script setup>
	import { useStore } from '../store/'

	const store = useStore()
</script>

<style scoped>
	#image-div {
		display: flex;
		overflow: hidden;
	}

	#image-div > img {
		object-fit: cover;
		width: 600px;
		-webkit-mask-image: linear-gradient(to bottom, #000, transparent 90%);
		mask-image: linear-gradient(to bottom, #000, transparent 90%);
	}
	.wrap {
		position: absolute;
		top: 2%;
		left: 3%;
	}

	.wrap > h1 {
		font-weight: 900;
		font-size: 3.9em;
		color: rgba(255, 255, 255, 0.8);
	}

	.wrap h2 {
		font-weight: 900;
		font-size: 3em;
		color: rgba(255, 255, 255, 0.8);
	}

	@media (max-width: 730px) {
	}
	@media (max-width: 1090px) {
		.wrap {
			margin-left: auto;
			margin-right: auto;
			top: 5%;
			left: 0;
			right: 0;
			text-align: center;
		}

		.wrap > h1 {
			font-weight: 900;
			font-size: 2.2em;
			color: rgba(255, 255, 255, 0.8);
		}

		#image-div > img {
			-webkit-mask-image: linear-gradient(to right, #000, transparent 90%);
			mask-image: linear-gradient(to right, #000, transparent 90%);
		}
	}
</style>
