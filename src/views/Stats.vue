<template>
	<nav>
		<img src="../assets/logo-3.png" alt="Application Logo" />
		<button class="card-level2" @click="logout()">LOGOUT</button>
	</nav>
	<main>
		<Component
			:is="Object.keys(store.userTopTracks).length === 0 ? Loading : TracksTop"
			class="top-tracks"
			@showModal="showModal"
			data-tilt
		/>
		<Component
			:is="Object.keys(store.userTopArtists).length === 0 ? Loading : ArtistFav"
			class="fav-artist"
		/>
		<Component
			:is="Object.keys(store.userTopArtists).length === 0 ? Loading : ArtistsTop"
			class="top-artists"
			@showModal="showModal"
		/>
		<Component
			:is="Object.keys(store.userTopTracks).length === 0 ? Loading : TrackFav"
			class="fav-track"
		/>
		<Component
			:is="Object.keys(store.userInfo).length === 0 ? Loading : User"
			class="user-info"
		/>
		<Component
			:is="Object.keys(store.userTopArtists).length === 0 ? Loading : Genres"
			class="genres"
		/>
		<Component
			:is="Object.keys(store.userSavedData).length === 0 ? Loading : Timeline"
			class="timeline"
		/>
	</main>
	<MuteButton class="mute-button" />
	<FullscreenModal v-if="isModalVisible" @hideModal="hideModal" :type="playlistType" />
</template>

<script setup>
	import { useStore } from '../store/'
	import { onMounted, ref } from 'vue'
	import { getUrlParams } from '../utils.js'
	import { useRouter } from 'vue-router'

	import ArtistFav from '../components/ArtistFav.vue'
	import ArtistsTop from '../components/ArtistsTop.vue'
	import TrackFav from '../components/TrackFav.vue'
	import TracksTop from '../components/TracksTop.vue'
	import Timeline from '../components/Timeline.vue'
	import Loading from '../components/Loading.vue'
	import Genres from '../components/Genres.vue'
	import User from '../components/User.vue'
	import FullscreenModal from '../components/FullscreenModal.vue'
	import MuteButton from '../components/MuteButton.vue'

	const store = useStore()
	const router = useRouter()
	let isModalVisible = ref(false)
	let playlistType = ref('tracks')

	onMounted(async () => {
		//! this is kinda bad idea, find different, more elegant solution
		const params = getUrlParams(window.location.href)
		const code = params.code
		const state = params.state
		//! NETLIFY
		//const nextURL = 'http://localhost:3000/me/'
		const nextURL = 'https://hardcore-kilby-8639b6.netlify.app/me/'
		const nextTitle = 'My new page title'
		const nextState = { additionalInformation: 'Updated the URL with JS' }
		window.history.replaceState(nextState, nextTitle, nextURL)

		//check token
		if (!localStorage.getItem('spotify-refresh-token')) {
			// check state
			if (state !== localStorage.getItem('spotify-state')) {
				console.log('state not found in local storage')
				return undefined
			}

			const body = {
				client_id: '2cef5c8d5a5746429824d926a26556db',
				grant_type: 'authorization_code',
				code: code,
				//! NETLIFY
				//redirect_uri: 'http://localhost:3000/me/',
				redirect_uri: 'https://hardcore-kilby-8639b6.netlify.app/me',
				code_verifier: localStorage.getItem('spotify-code-verifier'),
			}

			let getAccessTokenFetchBody = new URLSearchParams(Object.entries(body)).toString()

			const getToken = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
				body: getAccessTokenFetchBody,
			})
			const convertResponse = await getToken.json()
			store.accessToken = convertResponse.access_token
			localStorage.setItem('spotify-refresh-token', convertResponse.refresh_token)
		} else {
			const body = {
				grant_type: 'refresh_token',
				refresh_token: localStorage.getItem('spotify-refresh-token'),
				client_id: '2cef5c8d5a5746429824d926a26556db',
			}

			let getRefreshTokenFetchBody = new URLSearchParams(Object.entries(body)).toString()

			const getToken = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
				body: getRefreshTokenFetchBody,
			})
			const convertResponse = await getToken.json()
			store.accessToken = convertResponse.access_token
			localStorage.setItem('spotify-refresh-token', convertResponse.refresh_token)
		}

		await store.initializeData()
	})

	//! PROBABLY NOT IMPLEMENTED CORRECTLY
	function logout() {
		store.$reset()
		localStorage.clear()
		router.replace({ path: '/' })
	}

	function showModal(e) {
		if (e === 'tracks') playlistType.value = 'tracks'
		else if (e === 'artists') playlistType.value = 'artists'
		isModalVisible.value = true
	}

	function hideModal() {
		isModalVisible.value = false
	}
</script>

<style scoped>
	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	nav > img {
		height: auto;
		width: auto;
		max-height: 96px;
	}

	nav > button {
		padding: 16px 40px;
	}

	main {
		width: 100%;
		max-width: 1366px;
		min-height: 1363px;
		padding: 2em 2.5em 6em;
		margin: 0 auto;

		display: grid;
		/*//! without minmax there will be unequal distribution of column width*/
		/*//? i temporarily changed minmax values here */
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 0.85fr) minmax(0, 0.85fr) minmax(
				0,
				1fr
			);
		grid-template-rows: minmax(0, 300px) repeat(2, 1fr) minmax(0, 300px);
		grid-template-areas:
			'fav-artist fav-artist fav-artist top-tracks'
			'top-artists user-info fav-track top-tracks'
			'top-artists genres fav-track top-tracks'
			'top-artists timeline timeline timeline';
		gap: 1em;
	}

	.top-tracks {
		grid-area: top-tracks;
	}

	.fav-artist {
		grid-area: fav-artist;
	}

	.top-artists {
		grid-area: top-artists;
	}

	.fav-track {
		grid-area: fav-track;
	}

	.user-info {
		grid-area: user-info;
	}

	.genres {
		grid-area: genres;
	}

	.timeline {
		grid-area: timeline;
		min-height: 299px;
	}

	.mute-button {
		position: fixed;
		right: 0.1%;
		bottom: 0.1%;
	}

	/*//! FIX ROWS BEING TOO LONG ON LOWER MAX-WIDTH*/
	@media (max-width: 1300px) {
		main {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			grid-template-rows: minmax(0, 300px) repeat(3, 1fr) minmax(0, 300px);
			grid-template-areas:
				'fav-artist fav-artist top-tracks'
				'top-artists fav-track top-tracks'
				'top-artists fav-track top-tracks'
				'top-artists user-info genres'
				'timeline timeline timeline';
		}

		.mute-button {
			right: -1%;
			bottom: -2%;
		}
	}

	@media (max-width: 1090px) {
		main {
			padding: 1.5em 2em 5.5em;
			gap: 0.9em;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-rows: minmax(0, 300px) minmax(0, 300px) repeat(3, 1fr) minmax(
					0,
					300px
				);
			grid-template-areas:
				'user-info genres'
				'fav-track fav-artist'
				'top-tracks top-artists'
				'top-tracks top-artists'
				'top-tracks top-artists'
				'timeline timeline';
		}

		nav > img {
			height: auto;
			width: auto;
			max-height: 82px;
		}

		nav > button {
			padding: 14px 32px;
		}

		.mute-button {
			right: -4%;
			bottom: -3%;
		}
	}

	@media (max-width: 730px) {
		main {
			padding: 1em 1.25em 3em;
			max-width: 564px;
			gap: 0.75em;
			grid-template-columns: repeat(1, minmax(0, 1fr));
			grid-template-areas:
				'user-info'
				'fav-track'
				'top-tracks'
				'top-tracks'
				'top-tracks'
				'fav-artist'
				'top-artists'
				'genres'
				'timeline';
		}

		nav > img {
			height: auto;
			width: auto;
			max-height: 64px;
		}

		nav > button {
			padding: 10px 28px;
		}

		.mute-button {
			right: -7%;
			bottom: -5%;
		}
	}
</style>
