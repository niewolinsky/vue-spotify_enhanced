<template>
	<div class="container card-level0">
		<h1>RECENTLY SAVED ITEMS</h1>
		<div class="item-container" id="asd">
			<SavedItem v-for="saved in store.getUserSavedData" :key="saved.id" :saved="saved" />
		</div>
		<hr />
	</div>
</template>

<script setup>
	import SavedItem from './SavedItem.vue'
	import { useStore } from '../store/'
	import { onMounted } from 'vue'
	//? MAYBE FIND BETTER HORIZONTAL SCROLL PACKAGE?
	import mouseCase from 'mousecase'

	onMounted(() => {
		const mousecase = mouseCase('#asd')
		mousecase.init()
	})

	const store = useStore()
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		padding-top: 16px;
		/*-webkit-mask: linear-gradient(90deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 50%)
			linear-gradient(-90deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 50%);*/
		/*background: linear-gradient(to right, white, transparent 90%);*/
		/*box-shadow: 0px 0px -25px -25px rgba(55, 54, 51, 1);*/
	}

	.item-container {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		align-items: flex-start;

		height: 100%;
		width: 100%;
		padding: 20px;

		-webkit-overflow-scrolling: touch;
		cursor: grab;
		user-select: none;
	}

	.item-container::-webkit-scrollbar {
		display: none;
	}

	hr {
		width: 95%;
		position: absolute;
		top: 55%;
		background-color: black;
		color: black;
		border-style: solid;
		cursor: grab;
		user-select: none;
	}
</style>
