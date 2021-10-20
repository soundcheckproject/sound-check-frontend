<script>
	import Navigation from '../components/Navigation.svelte';
	import Header from '../components/Header.svelte';
	import Title from '../components/Title.svelte';
	import SubTitle from '../components/SubTitle.svelte';
	import Button from '../components/Button.svelte';

	let count = 1;
</script>

<Header>
	<Navigation />
	<div class="flex mx-auto justify-center items-center mb-24 flex-col max-w-96">
		<div class="grid gap-4 bg-gray-50 bg-opacity-10 p-12 rounded-sm">
			<Title theme="light">Login</Title>
			<label>Email addres<input class="input glass" placeholder="PPPP" /></label>
			<label>Password<input class="input glass" placeholder="PPPP" /></label>
			<div class="flex justify-between items-center">
				<label class="text-sm grid gap-2 grid-flow-col items-center text-white text-opacity-80"
					><input type="checkbox" />Remember me</label
				>

				<Button rounded="none" type="glass" className="justify-self-end">Login</Button>
			</div>
			<SubTitle theme="light">🔫 Create account</SubTitle>
			<a
				href="/register"
				class="text-sm text-white text-opacity-50 hover:text-opacity-95 transition-colors"
				>Click <u>here</u> to signup</a
			>
		</div>
	</div>
</Header>
