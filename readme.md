# Spotify Enhanced - Front-end user's statistics application consuming Spotify API.
Single page application making use of Spotify data to present user's listening habits and statistics (similar Spotify Wrapped event) in a appealing and readable manner.

![Application Interface](https://i.imgur.com/YdN1GuG.png)

Application created while learning front-end development for thesis project.

## Features:
- Implemented PKCE authorization code flow
- Browsing of user's statistics and listening habits in various time intervals
- Completely unique look & feel thanks to custom CSS library
- Fully responsive, mobile-ready interface
- Listetning to snippets of songs on click or hover
- Spotify activity timeline
- Various quality of life improvements (webp assets, independent lazy loading, dynamic cursor, site-wide mute and volume controls)

## Running:
Register app at https://developer.spotify.com/my-applications/ for secret token, then pass it to the application as a environment variable. Change redirect URL at Authentication.vue view to either localhost or your host IP/domain.

Application is powered by Vite so use npm install (only once) and npm run dev to run the application.

## Todo:
- Middleware for access token protection
- Server-side rendering
- Shareable profile link

## Stack:
- JavaScript + [Vue3](https://github.com/vuejs/core) + [Pinia](https://github.com/vuejs/pinia) + [Vue Router](https://github.com/vuejs/router) + [Apex Charts](https://github.com/apexcharts/vue-apexcharts)
- [Vite](https://github.com/vitejs/vite)

## Credits:
- Development was made easy thanks to great [Vue](https://vuejs.org/guide/introduction.html) and [Spotify](https://developer.spotify.com/documentation/) docs.