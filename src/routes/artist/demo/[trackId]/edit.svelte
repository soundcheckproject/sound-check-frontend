<script context="module">
	export async function load({ page, fetch, session, stuff }) {
		let trackId = page.params.trackId;
		return { props: { slug: trackId } };
	}
</script>

<script lang="ts">
	export let slug: { trackId: any };
</script>

<h2>Demo: {slug}</h2>
