import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			title: 'Awesome File Sharing',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
			script: [],
			link: [],
			style: []
		}
	}
})
