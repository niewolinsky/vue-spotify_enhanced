<template>
	<div class="container card-level0">
		<h1>YOUR TOP GENRES</h1>
		<apexchart
			ref="demoChart"
			type="polarArea"
			:series="[...store.getUserTopGenres.values()].slice(0, 5)"
			:options="chartOptions"
		></apexchart>
	</div>
</template>

<script>
	import VueApexCharts from 'vue3-apexcharts'

	export default {
		components: {
			apexchart: VueApexCharts,
		},
	}
</script>

<script setup>
	import { useStore } from '../store/'
	import { onUpdated, ref } from 'vue'

	const store = useStore()

	const demoChart = ref(null)
	const chartOptions = ref({})
	chartOptions.value = {
		chart: {
			width: '100%',
			type: 'polarArea',
		},
		labels: [...store.getUserTopGenres.keys()].slice(0, 5),
		fill: {
			opacity: 1,
		},
		stroke: {
			width: 1,
			colors: undefined,
		},
		yaxis: {
			show: false,
		},
		legend: {
			show: false,
		},
		plotOptions: {
			polarArea: {
				rings: {
					strokeWidth: 0,
				},
				spokes: {
					strokeWidth: 0,
				},
			},
		},
		theme: {
			monochrome: {
				enabled: true,
				color: '#3c3c3c',
				shadeTo: 'dark',
				shadeIntensity: 0.85,
			},
		},
		dataLabels: {
			enabled: true,
			formatter: function (value, { seriesIndex, w }) {
				//return w.config.labels[seriesIndex] + ':  ' + w.config.series[seriesIndex]
				return w.config.labels[seriesIndex]
			},
			style: {
				fontSize: '16px',
				fontFamily: 'Urbanist, sans-serif',
				fontWeight: 'light',
			},
			background: {
				enabled: true,
				foreColor: '#fff',
				padding: 8,
				borderRadius: 6,
				borderWidth: 1,
				borderColor: '#fff',
				opacity: 0.8,
				dropShadow: {
					enabled: true,
					top: 5,
					left: 5,
					blur: 0.9,
					color: '#000',
					opacity: 0.2,
				},
			},
		},
		tooltip: {
			//enabled: true,
			enabled: false,
			style: {
				fontSize: '12px',
				fontFamily: 'Urbanist, sans-serif',
			},
			y: {
				formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
					return value
				},
				title: {
					formatter: (seriesName) => 'TRACKS:',
				},
			},
		},
		states: {
			normal: {
				filter: {
					type: 'none',
					value: 0,
				},
			},
			hover: {
				filter: {
					type: 'lighten',
					value: 0.15,
				},
			},
			active: {
				allowMultipleDataPointsSelection: false,
				filter: {
					type: 'darken',
					value: 0.01,
				},
			},
		},
	}

	onUpdated(() => {
		demoChart.value.updateOptions({
			labels: [...store.getUserTopGenres.keys()].slice(0, 5),
		})
	})
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;

		padding-top: 16px;
	}

	h1 {
		margin-bottom: 18px;
	}
</style>
