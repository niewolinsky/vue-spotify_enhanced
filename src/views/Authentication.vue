<template>
	<div class="wrapper">
		<div class="card-level0 outer-div">
			<img src="../assets/logo-3.png" alt="Application Logo" />
			<div class="card-level1 inner-div">
				<p>
					Spotify Enhanced is your music taste discovery hub. See your Spotify data on
					demand. No more waiting for Spotify Wrapped!
				</p>
				<i
					>Clicking button below will redirect you to official Spotify authorization site
					where you can agree on reading your data by this application.</i
				>
				<button class="card-level2" @click="redirectToSpotify()">REDIRECT</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	//IMPORTS
	import { getRandomId, getRandomInt } from '../utils.js'
	import { create } from 'pkce'
	//REFS
	//FUNCTIONS
	function redirectToSpotify() {
		const codePair = create()
		let codeVerifier = codePair.codeVerifier
		let urlCodeChallenge = codePair.codeChallenge
		//URL CONSTRUCT
		const urlResponseType = 'code'
		//! NETLIFY
		//const urlRedirect = 'http://localhost:3000/me/'
		const urlRedirect = 'https://hardcore-kilby-8639b6.netlify.app/me'
		const scopes = [
			'user-read-email',
			'user-read-private',
			'user-top-read',
			'playlist-modify-public',
			'playlist-modify-private',
			'user-library-read',
			'user-follow-read',
		]
		const urlScopes = encodeURIComponent(scopes.join(' '))
		const urlChallengeMethod = 'S256'
		const urlState = getRandomId(getRandomInt(43, 128))
		//STORAGE IN LOCALSTORAGE
		localStorage.setItem('spotify-code-verifier', codeVerifier)
		localStorage.setItem('spotify-code-challenge', urlCodeChallenge)
		localStorage.setItem('spotify-state', urlState)
		//GENERATED LINK
		//! NETLIFY
		//const generatedLink = `https://accounts.spotify.com/authorize?response_type=${urlResponseType}&client_id=${
		//	import.meta.env.VITE_VUE_APP_CLIENT_ID
		//}&redirect_uri=${urlRedirect}&scope=${urlScopes}&state=${urlState}&code_challenge=${urlCodeChallenge}&code_challenge_method=${urlChallengeMethod}`
		//window.location.replace(generatedLink)
		const generatedLink = `https://accounts.spotify.com/authorize?response_type=${urlResponseType}&client_id=2cef5c8d5a5746429824d926a26556db&redirect_uri=${urlRedirect}&scope=${urlScopes}&state=${urlState}&code_challenge=${urlCodeChallenge}&code_challenge_method=${urlChallengeMethod}`
		window.location.replace(generatedLink)
	}
</script>

<style scoped>
	p {
		margin: 0;
		margin-bottom: 8px;
		font-size: 20px;
	}
	.wrapper {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.outer-div {
		width: 360px;
		display: flex;
		flex-direction: column;
		padding: 16px;
	}
	.inner-div {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		border-radius: 6px;
	}

	button {
		margin-top: 10px;
		width: 200px;
		height: 50px;
		font-size: 26px;
		border: 2px solid white;
	}

	img {
		height: auto;
		width: auto;
		max-height: 96px;
		margin-bottom: 16px;
	}

	i {
		font-size: 12px;
		/*text-align: justify;*/
	}
</style>
