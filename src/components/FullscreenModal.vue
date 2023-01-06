<template>
	<div id="modal" @click.self="$emit('hideModal')">
		<div class="container card-level1">
			<div class="wrap">
				<h2>NAME YOUR PLAYLIST</h2>
				<h3>based on top {{ type }}</h3>
			</div>
			<input
				type="text"
				v-model="playlistName"
				:placeholder="`Your top ${type} playlist`"
			/>
			<button class="card-level2" @click="createPlaylist(type)">CREATE</button>
		</div>
	</div>
</template>

<script setup>
	import { useStore } from '../store/'
	import { ref } from 'vue'

	const store = useStore()
	const playlistName = ref('')

	const props = defineProps({
		type: String,
	})

	const emit = defineEmits(['hideModal'])

	async function createPlaylist(playlistType) {
		let response = await fetch(
			`https://api.spotify.com/v1/users/${store.userInfo.id}/playlists`,
			{
				body: JSON.stringify({
					name:
						playlistName.value === ''
							? `Your Top ${props.type} Playlist`
							: playlistName.value,
					description: 'created by Spotify Enhanced',
					public: false,
				}),
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + store.accessToken,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}
		)
		let data = await response.json()

		//? uri is -> spotify:track:123abc456asd,spotify:track:678cba987dsa...
		if (playlistType === 'tracks') {
			await fetch(
				`https://api.spotify.com/v1/playlists/${data.id}/tracks?uris=${encodeURIComponent(
					store.getTopTracksUris
				)}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: 'Bearer ' + store.accessToken,
						'Content-Type': 'application/json',
					},
					method: 'POST',
				}
			)
		} else if (playlistType === 'artists') {
			await fetch(
				`https://api.spotify.com/v1/playlists/${data.id}/tracks?uris=${encodeURIComponent(
					store.getArtistTopTrackUris
				)}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: 'Bearer ' + store.accessToken,
						'Content-Type': 'application/json',
					},
					method: 'POST',
				}
			)
		}

		emit('hideModal')
	}
</script>

<style scoped>
	#modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		backdrop-filter: saturate(180%) blur(10px);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;

		cursor: not-allowed;
	}

	.container {
		width: 360px;
		height: 180px;
		background: rgba(0, 0, 0, 0.8);

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		padding: 16px;
		cursor: initial;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		font-weight: 500;
	}

	h3 {
		font-weight: 300;
		font-style: italic;
	}

	button {
		border-radius: 6px;
		padding: 4px 12px;
	}

	input {
		padding: 4px;
	}
</style>
