<script lang="ts">
  import ProfileBanner from '../../components/ProfileBanner.svelte'
  import Box from '../../components/Box.svelte'
  import Title from '../../components/Title.svelte'
  import SubTitle from '../../components/SubTitle.svelte'
  import Input from '../../components/Input.svelte'
  import Button from '../../components/Button.svelte'
  import InputError from '../../components/InputError.svelte'
  import {
    isEmailAvailable,
    isNickNameAvailable,
    validateError,
    validateErrors,
    validateLength,
    validateMatch,
    validateOld,
  } from '../../utils/useValidation'

  import type { Link, UserLink, UserType } from '../../types/User.type'
  import type ErrorType from '../../types/Error.type'
  import userStore from '../../stores/userStore'
  import validationStore from '../../stores/validationStore'
  import { onMount } from 'svelte'
  import { getLinks, updateUserInfoByUserId } from '../../utils/useGraphQL'
  import { getAuth } from '@firebase/auth'
  import {
    updateFirebaseEmail,
    updateFirebasePassword,
  } from '../../utils/useFirebase'

  let artist: UserType

  // let artist: UserType = {
  //   email: $userStore.email ?? 'example@of.mail',
  //   birthdate: $userStore.birthdate ?? '2020-01-01',
  //   nickName: $userStore.nickName ?? 'Nickname',
  //   logo: $userStore.logo ?? 'avatarimguel',
  //   firstName: $userStore.firstName ?? 'Firstname',
  //   surName: $userStore.surName ?? 'Surname',
  //   country: $userStore.country ?? 'Country',
  //   city: $userStore.city ?? 'City',
  //   bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est',
  //   userLinks: $userStore.userLinks ?? [],
  //   role: { name: 'user' },
  // }
  let newArtist: UserType 

  let newUserLink: UserLink = { link: { type: '' }, linkAddress: '' }
  
  let links: Link[] = []
  let errors: string[] = []
  
  onMount(async () => {
    links = await getLinks()
    artist = $userStore
  })

  const updateUser = async () => {
    console.log(newArtist)

    await updateUserInfoByUserId($userStore.uuid, newArtist)
  }
  const updateUserEmail = () => {
    console.log(newArtist.email)
    // Todo: update email in database => email toevoegen aan graphql
    // updateFirebaseEmail(newArtist)
    //   .then(result => {
    //     console.log(result)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  let userPassword = { old: '', new: '' }
  const updateUserPassword = () => {
    console.log(newArtist.password)
    // Todo: functie nog niet getest
    updateFirebasePassword(userPassword.new)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const updateUserUserLinks = () => {
    console.log(newArtist.userLinks)
  }

  const addUserLink = () => {
    newArtist.userLinks = [
      ...newArtist.userLinks,
      {
        link: { type: newUserLink.link.type },
        linkAddress: newUserLink.linkAddress,
      },
    ]
  }

  const deleteUserLink = (linkAddress: string) => {
    newArtist.userLinks = newArtist.userLinks.filter(
      userLink => userLink.linkAddress != linkAddress,
    )
  }

  const checkNickNameAvailability = () => {}

  const checkValidation = (type: string) => {
    if (type == 'nickname') {
      isNickNameAvailable(newArtist.nickName, $userStore.nickName).then(
        result => {
          errors = validateError('nickname', 'available', result, errors)
        },
      )
    }
    if (type == 'password') {
      errors = validateErrors(
        [
          // validateMatch(userPassword.new, userPassword.old),
          // todo: make work
          validateOld(userPassword.new, userPassword.old),
          validateLength(userPassword.new, 8),
          // Todo: .Match in usevalidation not working
          // validateNumbers(user.password),
          // validateCapital(user.password),
          // validateLower(user.password),
        ],
        type,
        errors,
      )
    }
  }

  const checkIfEmailIsAvailable = () => {
    if (isEmailAvailable(artist, newArtist.email)) {
    }
  }
  $: {
    newArtist = artist
    validationStore.set(errors)
  }
</script>

<div class="grid gap-8">
  {#if artist}
    <ProfileBanner artist={newArtist} />
    <Box
      ><Title>Account</Title>
      <SubTitle>Personal information</SubTitle>
      <form class="grid gap-6">
        <div class="grid grid-cols-2 gap-4">
          <!-- <InputError errorInput={'nickname'} /> -->
          <Input
            errorInput={'nickname'}
            title="Nickname"
            bind:value={newArtist.nickName}
            on:input={() => checkValidation('nickname')}
            placeholder="Choose a nickname.."
          />
          <Input
            title="Birthdate"
            type="date"
            bind:value={newArtist.birthdate}
            placeholder="What's your birthdate?"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Input
            title="First name"
            bind:value={newArtist.firstName}
            placeholder="What's your first name?"
          />
          <Input
            title="Surname"
            bind:value={newArtist.surName}
            placeholder="What's your surname?"
          />
        </div>
        <SubTitle>Address</SubTitle>
        <div class="grid lg:grid-cols-3 gap-4">
          <Input
            title="Country"
            bind:value={newArtist.country}
            placeholder="What's your country?"
          />
          <Input
            title="State"
            bind:value={newArtist.state}
            placeholder="What's your state?"
          />
          <Input
            title="City"
            bind:value={newArtist.city}
            placeholder="What's your city?"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Input
            title="First name"
            bind:value={newArtist.firstName}
            placeholder="Choose a nickname"
          />
          <Input
            title="Surname"
            bind:value={newArtist.surName}
            placeholder="Choose a nickname"
          />
        </div>
        <div class="flex justify-end">
          <Button
            color="bg-teal-700"
            onClick={() => {
              updateUser()
            }}>Save changes</Button
          >
        </div>
      </form>
    </Box>
    <Box
      ><Title>Socials</Title>
      <SubTitle>Social media channels</SubTitle>
      <form class="grid gap-6">
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="grid gap-6 auto-rows-min items-start">
            <label class="portal mt-1"
              >Pick a channel

              <select
                bind:value={newUserLink.link.type}
                class="input portal text-red-300"
                placeholder="For example: Instagram, facebook, .."
              >
                <option selected disabled>Pick a channel</option>
                {#each links as link}
                  <option value={link.type}>{link.type}</option>
                {/each}</select
              >
            </label>
            <Input
              title="Address link"
              bind:value={newUserLink.linkAddress}
              placeholder="New link address.."
            />
            <div class="flex justify-end">
              <Button
                color="bg-gray-400"
                onClick={() => {
                  addUserLink()
                }}>Add link</Button
              >
            </div>
          </div>
          <div class="grid auto-rows-min gap-4">
            {#each newArtist.userLinks as userLink, i}
              <div class="relative">
                <Input
                  title={newArtist.userLinks[i].link.type}
                  bind:group={newArtist.userLinks[i].linkAddress}
                  placeholder="Link address.."
                />
                <div
                  class="absolute bottom-3 right-3 opacity-50 hover:opacity-75 bg-opacity-0 transition-all hover:bg-opacity-100 bg-gray-300 cursor-pointer p-1 rounded-full"
                  on:click={() => deleteUserLink(userLink.linkAddress)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path
                      d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                    />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </div>
              </div>
            {/each}
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            color="bg-teal-700"
            onClick={() => {
              updateUserUserLinks()
            }}>Update socials</Button
          >
        </div>
      </form>
    </Box>
    <Box
      ><Title>Login credentials</Title>
      <form class="grid gap-6">
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="grid gap-6 auto-rows-min items-start">
            <SubTitle>Change email</SubTitle>

            <Input
              title="Email address"
              bind:value={newArtist.email}
              on:input={() => checkIfEmailIsAvailable()}
              placeholder="Email address.."
            />

            <div class="flex justify-end">
              <Button
                color="bg-teal-700"
                onClick={() => {
                  updateUserEmail()
                }}>Update email</Button
              >
            </div>
          </div>
          <div>
            <div class="grid gap-6">
              <SubTitle>Change password</SubTitle>
              <Input
                errorInput={'password'}
                title="Old password"
                type="password"
                on:input={() => checkValidation('password')}
                bind:value={userPassword.old}
                placeholder="Old password.."
                autocomplete="current-password"
              />
              <Input
                on:input={() => checkValidation('password')}
                title="New password"
                type="password"
                bind:value={userPassword.new}
                placeholder="New passord.."
                autocomplete="new-password"
              />
              <div class="flex justify-end">
                <Button
                  color="bg-teal-700"
                  onClick={() => {
                    updateUserPassword()
                  }}>Update password</Button
                >
              </div>
            </div>
          </div>
        </div>
      </form>
    </Box>
  {/if}
</div>
