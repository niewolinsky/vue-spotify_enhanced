import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
	state() {
		return {
			userInfo: {},

			//? LOOK INTO HTTP AUTOMATIC CACHING WITH FETCH REQUEST, MAYBE YOU DONT NEED TO IMPLEMENT CACHING
			userTopTracksShort: {},
			userTopTracksMedium: {},
			userTopTracksLong: {},
			userTopTracks: {},

			userTopArtistsShort: {},
			userTopArtistsMedium: {},
			userTopArtistsLong: {},
			userTopArtists: {},

			userSavedData: {},

			accessToken: null,
			allowSound: true,
		}
	},
	getters: {
		getUserFavArtist() {
			return this.userTopArtists[0].name
		},
		getUserFavArtistImg() {
			return this.userTopArtists[0].image
		},
		getUserFavTrackImg() {
			return this.userTopTracks[0].image
		},
		getUserFavTrack() {
			return this.userTopTracks[0].title
		},
		getUserTopGenres() {
			//? return only those with occurence higher than 1?
			let retrievedGenres = this.userTopArtists.map((item) => item.genres).flat()

			let mappedGenres = retrievedGenres.reduce(
				(acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
				new Map()
			)

			let sortedMappedGenres = new Map([...mappedGenres].sort((a, b) => b[1] - a[1]))
			return sortedMappedGenres
		},
		getTopTracksUris() {
			return this.userTopTracks.map((item) => item.uri).flat()
		},
		getArtistTopTrackUris() {
			return this.userTopArtists.map((item) => item.uri).flat()
		},
		getUserSavedData() {
			return this.userSavedData
				.slice(0)
				.sort((a, b) => (a.added > b.added ? 1 : b.added > a.added ? -1 : 0))
		},
	},
	actions: {
		checkCache(type, timeRange) {
			if (type === 'tracks') {
				switch (timeRange) {
					case 'short_term':
						if (Object.keys(this.userTopTracksShort).length === 0) {
							//this.userTopTracks = {}
							this.loadUserTopTracks(timeRange)
						} else {
							this.swapWithCache(type, timeRange)
						}
						break
					case 'medium_term':
						if (Object.keys(this.userTopTracksMedium).length === 0) {
							//this.userTopTracks = {}
							this.loadUserTopTracks(timeRange)
						} else {
							this.swapWithCache(type, timeRange)
						}
						break
					case 'long_term':
						if (Object.keys(this.userTopTracksLong).length === 0) {
							//this.userTopTracks = {}
							this.loadUserTopTracks(timeRange)
						} else {
							this.swapWithCache(type, timeRange)
						}
						break
				}
			} else if (type === 'artists') {
				switch (timeRange) {
					case 'short_term':
						if (Object.keys(this.userTopArtistsShort).length === 0) {
							//this.userTopArtists = {}
							this.loadUserTopArtists(timeRange)
						} else {
							this.swapWithCache(type, timeRange)
						}
						break
					case 'medium_term':
						if (Object.keys(this.userTopArtistsMedium).length === 0) {
							//this.userTopArtists = {}
							this.loadUserTopArtists(timeRange)
						} else {
							this.swapWithCache(type, timeRange)
						}
						break
					case 'long_term':
						if (Object.keys(this.userTopArtistsLong).length === 0) {
							//this.userTopArtists = {}
							this.loadUserTopArtists(timeRange)
						} else {
							this.swapWithCache(type, timeRange)
						}
						break
				}
			}
		},
		saveToCache(type, timeRange, data) {
			if (type === 'tracks') {
				switch (timeRange) {
					case 'short_term':
						this.userTopTracksShort = data
						break
					case 'medium_term':
						this.userTopTracksMedium = data
						break
					case 'long_term':
						this.userTopTracksLong = data
						break
				}
			} else if (type === 'artists') {
				switch (timeRange) {
					case 'short_term':
						this.userTopArtistsShort = data
						break
					case 'medium_term':
						this.userTopArtistsMedium = data
						break
					case 'long_term':
						this.userTopArtistsLong = data
						break
				}
			}
		},
		swapWithCache(type, timeRange) {
			if (type === 'tracks') {
				switch (timeRange) {
					case 'short_term':
						this.userTopTracks = this.userTopTracksShort
						break
					case 'medium_term':
						this.userTopTracks = this.userTopTracksMedium
						break
					case 'long_term':
						this.userTopTracks = this.userTopTracksLong
						break
				}
			} else if (type === 'artists') {
				switch (timeRange) {
					case 'short_term':
						this.userTopArtists = this.userTopArtistsShort
						break
					case 'medium_term':
						this.userTopArtists = this.userTopArtistsMedium
						break
					case 'long_term':
						this.userTopArtists = this.userTopArtistsLong
						break
				}
			}
		},
		//TODO: ADD ERROR HANDLING TO FETCH REQUESTS
		async loadUserInfo() {
			const response = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + this.accessToken,
				},
			})

			const data = await response.json()

			this.userInfo = {
				name: data.display_name,
				country: data.country.toLowerCase(),
				followers: data.followers.total,
				id: data.id,
				subscription: data.product,
				image: data.images[0].url,
			}
		},
		async loadUserTopTracks(timeRange) {
			const response = await fetch(
				`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10&offset=0`,
				{
					headers: {
						Authorization: 'Bearer ' + this.accessToken,
					},
				}
			)

			const data = await response.json()

			let trackDataObject = data.items.map((item) => {
				let trackObj = {
					title: item.name,
					preview: item.preview_url,
					artists: item.artists.map((artist) => artist.name),
					album: item.album.name,
					image: item.album.images[1].url,
					id: item.id,
					uri: item.uri,
				}

				return trackObj
			})

			this.saveToCache('tracks', timeRange, trackDataObject)
			this.swapWithCache('tracks', timeRange)
		},
		async loadUserTopArtists(timeRange) {
			const response = await fetch(
				`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10&offset=0`,
				{
					headers: {
						Authorization: 'Bearer ' + this.accessToken,
					},
				}
			)

			const data = await response.json()

			const artistDataObject = await Promise.all(
				data.items.map(async (item) => {
					let artistObj = {
						name: item.name,
						image: item.images[1].url,
						genres: item.genres,
						id: item.id,
						uri_artist: item.uri,
					}

					const response = await fetch(
						`https://api.spotify.com/v1/artists/${item.id}/top-tracks?market=PL`,
						{
							headers: {
								Accept: 'application/json',
								Authorization: 'Bearer ' + this.accessToken,
								'Content-Type': 'application/json',
							},
						}
					)

					const data = await response.json()

					artistObj.preview = data.tracks[0].preview_url
					artistObj.uri = data.tracks[0].uri

					return artistObj
				})
			)

			this.saveToCache('artists', timeRange, artistDataObject)
			this.swapWithCache('artists', timeRange)
		},
		async loadUserSavedData(amount) {
			const [response_tracks, response_albums] = await Promise.all([
				fetch(`https://api.spotify.com/v1/me/tracks?limit=${amount}`, {
					headers: {
						Authorization: 'Bearer ' + this.accessToken,
					},
				}),
				fetch(`https://api.spotify.com/v1/me/albums?limit=${amount}`, {
					headers: {
						Authorization: 'Bearer ' + this.accessToken,
					},
				}),
			])

			const [data_tracks, data_albums] = await Promise.all([
				response_tracks.json(),
				response_albums.json(),
			])

			let savedTrackDataObject = data_tracks.items.map((item) => {
				let trackObj = {
					type: 'track',
					added: item.added_at.slice(0, 10),
					name: item.track.name,
					artist: item.track.artists[0].name,
					id: item.track.id,
					image: item.track.album.images[2].url,
					uri: item.track.uri,
				}

				return trackObj
			})

			let savedAlbumsDataObject = data_albums.items.map((item) => {
				let albumObj = {
					type: 'album',
					added: item.added_at.slice(0, 10),
					name: item.album.name,
					artist: item.album.artists[0].name,
					id: item.album.id,
					image: item.album.images[2].url,
					uri: item.album.uri,
				}

				return albumObj
			})

			let savedDataObject = [...savedTrackDataObject, ...savedAlbumsDataObject]

			this.userSavedData = savedDataObject
		},
		async initializeData() {
			await Promise.all([
				this.loadUserInfo(),
				this.loadUserTopTracks('medium_term'),
				this.loadUserTopArtists('medium_term'),
				this.loadUserSavedData(5),
			])
		},
	},
})
