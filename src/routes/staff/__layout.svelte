<script>
	import { page } from '$app/stores';
	console.log($page.path);
</script>

<h1>Staff pages</h1>
<p>Current path: {$page.path}</p>

<slot />
