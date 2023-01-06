<template>
	<!--ELEMENTY HTML MIESZANE Z ELEMENTAMI I DYREKTYWAMI VUE NP. V-MODEL-->
	<div>PRZYKLADOWY KOMPONENT</div>
	{{ y }}
</template>

<script>
	//FRAGMENT TRADYCYJNEJ EGZEKUCJI KODU JAVASCRIPT W OBRĘBIE DANEGO KOMPONENTU
	let x = 1
	x += 2
	console.log(x)
</script>

<script setup>
	//FRAGMENT KODU WYKONUJĄCEGO SIĘ PO ZAŁADOWANIU KOMPONENTU PRZEZ VUE
	import { ref, onUnmounted } from 'vue'

	onUnmounted(() => {
		console.log('UNMOUNTED')
	})

	const y = ref(10)
	y.value = 11
</script>

<style scoped>
	div {
		background-color: red;
	}
</style>
