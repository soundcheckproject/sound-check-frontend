<script>
	import { page } from '$app/stores'
	import RoleLayer from '../../../components/RoleLayer.svelte'
	import AuthLayer from '../../../components/AuthLayer.svelte'
	// console.log($page.path);
</script>

<AuthLayer>
	<RoleLayer allowedFromRole={2}>
		<h1>Staff pages</h1>
		<p>Current path: {$page.path}</p>

		<slot />
	</RoleLayer>
</AuthLayer>
