import preprocess from 'svelte-preprocess'
// import adapter from '@sveltejs/adapter-node'
// import adapter from '@sveltejs/adapter-static'
import vercel from '@sveltejs/adapter-vercel'
// import pkg from './package.json'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // ! vercel setup
    adapter: vercel(),
    // ! node setup for docker
    // adapter: adapter({
    //   out: 'build',
    //   precompress: false,
    //   env: {
    //     host: 'NODE_HOST',
    //     port: 'NODE_PORT',
    //   },
    // }),
    // ! static files setup
    // adapter: adapter({

    //   pages: 'build',
    //   assets: 'build',
    //   fallback: null,
    //   ssr: false,
    // }),
    // prerender: {
    //   enabled: false,
    // },
  },
}

export default config
