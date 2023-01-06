<template>
	<div @click="redirectToSpotify" class="card card-level1">
		<img :src="saved.image" />
		<section>
			<h4>{{ saved.name }}</h4>
			<h5>{{ saved.type }}</h5>
			<h6>{{ saved.added }}</h6>
		</section>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue'

	let props = defineProps({
		saved: Object,
	})

	function redirectToSpotify() {
		window.location.href = `${props.saved.uri}`
	}
</script>

<style scoped>
	.card {
		display: flex;
		align-items: center;
		justify-content: left;
		min-width: 200px;
		white-space: nowrap;
		padding: 6px;
		cursor: help;
	}

	.card::after {
		content: '|';
		position: absolute;
		left: 50%;
		top: 48px;
		color: black;
		font-size: 46px;
		cursor: grab;
		user-select: none;
	}

	.card:nth-child(odd) {
		align-self: flex-end;
	}

	.card:nth-child(odd)::after {
		content: '|';
		position: absolute;
		left: 50%;
		top: -52px;
		color: black;
		font-size: 48px;
		cursor: grab;
		user-select: none;
	}

	img {
		max-width: 40px;
		height: 100%;
		border-radius: 8px;
		margin-right: 10px;
	}

	section {
		overflow: hidden;
	}
</style>
