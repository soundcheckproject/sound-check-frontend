<script lang="ts">
  import type { UserType } from './../types/User.type'
  import { goto } from '$app/navigation'

  import Header from '../components/Header.svelte'
  import Title from '../components/Title.svelte'
  import SubTitle from '../components/SubTitle.svelte'
  import Button from '../components/Button.svelte'
  import Container from '../components/Container.svelte'
  import Footer from '../components/Footer.svelte'

  import authStore from '../stores/authStore'
  import { registerUser } from '../utils/useFirebase'

  let userRegister: UserType = {
    email: 'testEmail' + Math.floor(Math.random() * 9999 + 1) + '@gmail.com',
    password: 'veryStr0ng_',
    nickName: 'testAccount' + Math.floor(Math.random() * 9999 + 1),
    firstName: 'Maxime',
    surName: 'Vermeeren',
    country: 'België',
    state: 'Oost-Vlaanderen',
    city: 'Oudenaarde',
    birthdate: '2000-01-01',
  }

  const register = () => {
    registerUser(userRegister).catch(err => {
      console.log(err)
    })
  }

  authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
    if (isLoggedIn && firebaseControlled) {
      await goto('/portal')
    }
  })
</script>

<Header type="split" />
<Container>
  <section class="">
    <article>
      <Title theme="dark">Register account</Title>

      <div class="flex space-x-12 flex-col sm:flex-row" style="">
        <div
          class="grid gap-4 auto-rows-min bg-gray-100 p-12 rounded-md box-content justify-self-end "
        >
          <SubTitle theme="dark">📝 Create account</SubTitle>
          <label
            >Email adress<input
              bind:value={userRegister.email}
              class="input"
              placeholder="Email adress.."
            /></label
          >
          <label
            >Password<input
              bind:value={userRegister.password}
              class="input"
              type="password"
              placeholder="Password.."
            /></label
          >
          <label
            >Password again<input
              bind:value={userRegister.password}
              class="input"
              type="password"
              placeholder="Password.."
            /></label
          >
          <label
            >Birthdate<input
              bind:value={userRegister.birthdate}
              class="input"
              placeholder="Birthdate.."
              type="date"
            /></label
          >
        </div>
        <div class="grid gap-4 py-12">
          <SubTitle theme="dark">🏡 Additional info</SubTitle>
          <label
            >What's your artistname?<input
              bind:value={userRegister.nickName}
              class="input"
              placeholder="Artist name.."
            /></label
          >
          <div class="grid md:grid-cols-2 gap-4">
            <label
              >First name<input
                bind:value={userRegister.firstName}
                class="input"
                placeholder="First name.."
              /></label
            >
            <label
              >Last name<input
                bind:value={userRegister.surName}
                class="input"
                placeholder="Last name.."
              /></label
            >
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <label
              >Country<input
                bind:value={userRegister.country}
                class="input"
                placeholder="Country.."
              /></label
            >
            <label
              >State<input
                bind:value={userRegister.state}
                class="input"
                placeholder="State.."
              /></label
            >
            <label
              >City<input
                bind:value={userRegister.city}
                class="input"
                placeholder="City.."
              /></label
            >
          </div>
          <Button
            onClick={register}
            rounded="none"
            color="bg-teal-700"
            className="justify-self-end">Create account!</Button
          >
        </div>
      </div>
    </article>
  </section>
</Container>

<Footer />
