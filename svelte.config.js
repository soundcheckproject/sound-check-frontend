import preprocess from 'svelte-preprocess'
// import adapter from '@sveltejs/adapter-node'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // adapter: adapter({
    //   out: 'build',
    //   precompress: false,
    //   env: {
    //     host: 'NODE_HOST',
    //     port: 'NODE_PORT',
    //   },
    // }),
        adapter: adapter({
          // default options are shown
          pages: 'build',
          assets: 'build',
          fallback: null,
          ssr: false,
        }),
        prerender: {
          enabled: false,
        },
  },
}

export default config
