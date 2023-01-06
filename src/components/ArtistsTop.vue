<template>
	<div class="container card-level0">
		<div class="radio-group card-level1" @change="fetchNewData">
			<input
				id="short_term_artist"
				type="radio"
				name="artists-time-range"
				value="short_term"
			/>
			<label for="short_term_artist">WEEKLY</label>

			<input
				id="medium_term_artist"
				type="radio"
				name="artists-time-range"
				value="medium_term"
				checked
			/>
			<label for="medium_term_artist">MONTHLY</label>

			<input
				id="long_term_artist"
				type="radio"
				name="artists-time-range"
				value="long_term"
			/>
			<label for="long_term_artist">ALL TIME</label>
		</div>
		<Artist v-for="artist in store.userTopArtists" :key="artist.id" :artist="artist" />
		<button class="card-level2" @click="$emit('showModal', 'artists')">
			CREATE PLAYLIST
		</button>
	</div>
</template>

<script setup>
	import Artist from './Artist.vue'
	import { useStore } from '../store/'

	const store = useStore()

	const emit = defineEmits(['showModal'])

	function fetchNewData(event) {
		store.checkCache('artists', event.target.value)
	}
</script>

<style scoped>
	button {
		height: 42px;
		border-radius: 0 0 6px 6px;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		gap: 10px;
		padding: 16px;
	}

	input[type='radio'] {
		position: absolute;
		visibility: hidden;
		display: none;
	}

	label {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: background 0.5s;
	}

	label:hover {
		background: rgba(255, 255, 255, 0.4);
	}

	input[type='radio']:checked + label {
		color: black;
		background: linear-gradient(
			155deg,
			rgba(255, 255, 255, 0.8),
			rgba(255, 255, 255, 0.7)
		);
	}

	label + input[type='radio'] + label {
		border-left: solid 1px rgba(255, 255, 255, 0.75);
	}

	.radio-group {
		overflow: hidden;
		font-weight: 400;
		border-radius: 6px 6px 0px 0px;
		border: 2px solid rgba(255, 255, 255, 0.75);
		height: 42px;
		display: flex;
	}
</style>
