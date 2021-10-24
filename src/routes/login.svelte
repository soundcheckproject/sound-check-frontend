<script lang="ts">
	import { goto } from '$app/navigation'

	import Header from '../components/Header.svelte'
	import Title from '../components/Title.svelte'
	import SubTitle from '../components/SubTitle.svelte'
	import Button from '../components/Button.svelte'
	import Container from '../components/Container.svelte'
	import Footer from '../components/Footer.svelte'

	import { capitalize } from '../utils/capitalize'
	// import { isNotEmptyValidation } from '../utils/formValidation'
	// import { formError } from '../utils/formValidation'
	// import { formErrors } from '../stores/stores'

	let user = { email: '', password: '' }
	let userRegister = { email: '', password: '' }

	interface formError {
		[key: string]: { display?: boolean; errorName: string; message: string }[]
	}

	let formErrors: formError = {}
	const login = () => {
		// formErrors = [{ type: '', errors: [] }]
		formErrors = { email: [], password: [] }
		// console.log(user)
		isNotEmptyValidation(user, 'email')
		isNotEmptyValidation(user, 'password')
		isNotStrongEnoughValidation(user, 'password')
	}
	const register = () => {
		console.log()
		goto('/register')
	}

	function isNotEmptyValidation(value: any, typeName: string) {
		let errorName = 'isNotEmptyValidation' + typeName
		if (value[typeName].length <= 0) {
			formErrors[typeName] = [
				...formErrors[typeName],
				{ display: true, errorName: errorName, message: `${capitalize(typeName)} cannot be empty.` }
			]
		}
	}
	function isNotStrongEnoughValidation(value: any, typeName: string) {
		let errorName = 'isNotStrongEnoughValidation' + typeName
		if (value[typeName].length < 8) {
			formErrors[typeName] = [
				...formErrors[typeName],
				{
					display: true,
					errorName: errorName,
					message: `${capitalize(typeName)} should maintain more than 8 characters.`
				}
			]
		}
	}
</script>

<Header type="split" />
<Container>
	<section class="">
		<article>
			<Title theme="dark">Portal</Title>
			<div class=" flex lg:space-x-12 justify-between flex-col-reverse lg:flex-row items-center">
				<div class="grid gap-4 py-12 ">
					<SubTitle theme="dark">📝 Create account</SubTitle>
					<label>What's your artistname?<input class="input" placeholder="Email address." /></label>
					<div class="grid sm:grid-cols-2 gap-4">
						<label>First name<input class="input" placeholder="First name.." /></label>
						<label>Last name<input class="input" placeholder="Last name.." /></label>
					</div>
					<div class="grid sm:grid-cols-3 gap-4">
						<label>Country<input class="input" placeholder="Country.." /></label>
						<label>State<input class="input" placeholder="State.." /></label>
						<label>City<input class="input" placeholder="City.." /></label>
					</div>
					<Button onClick={register} rounded="none" color="bg-blue-900" className="justify-self-end"
						>Create account!</Button
					>
				</div>
				<div
					class="grid gap-4 bg-gray-100 -mx-12 p-12 rounded-md sm:w-full lg:w-96 box-content justify-self-end"
				>
					<SubTitle theme="dark">⌛️ Login with account</SubTitle>

					{#each Object.keys(formErrors) as errorKey}
						{#each formErrors[errorKey] as error}
							{#if error.display}
								<SubTitle theme="error">{error.message}</SubTitle>
							{/if}
						{/each}
					{/each}

					<label
						>Email addres<input
							bind:value={user.email}
							class="input"
							placeholder="Email address."
						/></label
					>
					<label
						>Password<input
							bind:value={user.password}
							class="input "
							placeholder="Password.."
						/></label
					>
					<div class="flex justify-between items-center">
						<label class="text-sm grid gap-2 grid-flow-col items-center text-opacity-80"
							><input type="checkbox" />Remember me</label
						>

						<Button onClick={login} rounded="none" color="bg-blue-900" className="justify-self-end"
							>Login</Button
						>
					</div>
				</div>

				<!-- <a
					href="/register"
					class="text-sm text-white text-opacity-50 hover:text-opacity-95 transition-colors"
				>
					Click <u>here</u> to signup
				</a> -->
			</div>
		</article>
	</section>
</Container>

<Footer />
