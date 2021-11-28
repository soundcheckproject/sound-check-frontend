<script lang="ts">
  import ProfileBanner from '../../../components/ProfileBanner.svelte'
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Input from '../../../components/Input.svelte'
  import Button from '../../../components/Button.svelte'
  import InputError from '../../../components/InputError.svelte'
  import {
    isEmailAvailable,
    isNickNameAvailable,
    validateEmailValid,
    validateEmpty,
    validateError,
    validateErrors,
    validateErrorTime,
    validateLength,
    validateMatch,
    validateOld,
  } from '../../../utils/useValidation'

  import type { Link, UserLink, UserType } from '../../../types/User.type'

  import userStore from '../../../stores/userStore'
  import validationStore from '../../../stores/validationStore'
  import { onMount } from 'svelte'
  import {
    getLinks,
    getUserViaFirebase,
    updateUserInfoByUserId,
    updateUserLinksByUserId,
  } from '../../../utils/useGraphQL'
  import {
    updateFirebaseEmail,
    updateFirebasePassword,
  } from '../../../utils/useFirebase'
  import { formatDate } from '../../../utils/useFormat'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { uploadLogo } from '../../../utils/useRest'

  let artist: UserType = $userStore

  let newArtist: UserType

  let newUserLink: UserLink = {
    link: { type: 'Pick a channel' },
    linkAddress: '',
  }

  let logoClick: HTMLInputElement

  let links: Link[] = []
  let errors: string[] = []

  onMount(async () => {
    links = await getLinks()
    // artist
  })

  const updateUser = async () => {
    if ($validationStore.length == 0) {
      let updatedUser: UserType = {}

      const oldUser = await getUserViaFirebase()

      for (const objectKey of [
        'nickName',
        'surName',
        'firstName',
        'country',
        'city',
        'state',
        'birthdate',
      ]) {
        if (newArtist[objectKey] != oldUser[objectKey]) {
          updatedUser[objectKey] = newArtist[objectKey]
        }
      }

      if (Object.keys(updatedUser).length > 0) {
        await updateUserInfoByUserId(artist.uuid, updatedUser)
          .then(err => {
            // console.log({data})
            // if (err) {
            //   console.log(err)
            //   if (err[0].extensions.response.statusCode == 403) {
            //     errors = validateError('update', '403', false, errors)
            //   }
            // } else {
            //   errors = validateError('update', '403', true, errors)

            // }
            console.log('User has been updated!', updatedUser)
            goto($page.path)
          })
          .catch(e => {
            validateErrorTime('connection', 'graphql', errors)
          })
      } else {
        validateErrorTime('general', 'change', errors)
      }
    } else {
      validateErrorTime('general', 'errors', errors)
    }
  }

  const updateLogo = async () => {
    if (previewLogo.length > 0) {
      console.log(artist.uuid)
      await uploadLogo(logoBlob[0], artist.nickName + 'logo'+'.jpg', artist.uuid).then(
        res => console.log(res),
      ).catch(error => console.log(error))
    }
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
  // update userlinks Query
  // als er een link anders is dan een vorige link, moet deze worden gewijzigd in de database
  // als er een niet meer is, dan moet deze worden verwijdert in de database
  // als er een nieuwe link is, dan moet deze worden toegevoegd in de database

  const updateUserLinks = async () => {
    //todo send new userlinks to database
    console.log(newArtist.userLinks)
    for (let userLink of newArtist.userLinks) {
      let newUserLink = {
        userId: artist.uuid,
        linkId: userLink.link.uuid,
        linkAddress: userLink.linkAddress,
      }

      console.log(userLink)
    }
    // await updateUserLinksByUserId(artist.uuid, newArtist.userLinks)
  }

  const addUserLink = () => {
    if (newUserLink.linkAddress.length > 0) {
      if (
        newArtist.userLinks.filter(
          link => link.link.type == newUserLink.link.type,
        ).length == 0
      ) {
        if (newUserLink.link.type != 'Pick a channel') {
          newArtist.userLinks = [
            ...newArtist.userLinks,
            {
              link: { type: newUserLink.link.type },
              linkAddress: newUserLink.linkAddress,
            },
          ]
        } else {
          validateErrorTime('update', 'linktype', errors)
        }
      } else {
        validateErrorTime('update', 'linkexcist', errors)
      }
    } else {
      validateErrorTime('update', 'linkempty', errors)
    }
  }

  const deleteUserLink = (linkAddress: string) => {
    newArtist.userLinks = newArtist.userLinks.filter(
      userLink => userLink.linkAddress != linkAddress,
    )
  }

  const checkNickNameAvailability = () => {}

  const checkValidation = async (type: string) => {
    if (type == 'email') {
      errors = validateErrors(
        [validateEmailValid(newArtist.email)],
        type,
        errors,
      )
    }
    if (type == 'nickname') {
      // Todo: work without query to get old data
      const oldUser = await getUserViaFirebase()
      isNickNameAvailable(newArtist.nickName, oldUser.nickName).then(result => {
        errors = validateError('nickname', 'available', result, errors)
      })
    }
    if (type == 'password') {
      errors = validateErrors(
        [
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
    for (const errorType of [
      'nickName',
      'birthdate',
      'firstName',
      'surName',
      'country',
      'state',
      'city',
      // 'prefferdReleaseDate',
    ]) {
      if (errorType == type)
        errors = validateErrors([validateEmpty(newArtist[type])], type, errors)
    }
  }

  const checkIfEmailIsAvailable = () => {
    if (isEmailAvailable(artist, newArtist.email)) {
    }
  }

  let logoPreview: any = ''
  let logoBlob: any = ''
  const previewLogo = (e: any) => {
    let image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      logoPreview = e.target.result
    }
  }

  $: {
    newArtist = artist
    validationStore.set(errors)
  }
</script>

<div class="grid gap-8">
  {#if artist}
    <ProfileBanner
      artist={newArtist}
      logo={logoPreview.length > 0 ? logoPreview : newArtist.logo}
    />
    <Box>
      {artist.uuid}<Title>Account</Title>
      <SubTitle>Personal information</SubTitle>
      <InputError errorInput="general" />
      <form class="grid gap-6">
        <div class="grid grid-cols-2 gap-4">
          <!-- <InputError errorInput={'nickname'} /> -->
          <Input
            errorInput="nickname"
            title="Nickname"
            placeholder="Choose a nickname.."
            bind:value={newArtist.nickName}
            on:input={() => checkValidation('nickname')}
          />
          <!-- // Todo make birthdate work -->
          <Input
            title="Birthdate"
            type="date"
            errorInput="birthdate"
            placeholder="What's your birthdate?"
            bind:value={newArtist.birthdate}
            on:input={() => checkValidation('birthdate')}
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Input
            title="First name"
            errorInput={'firstName'}
            placeholder="What's your first name?"
            bind:value={newArtist.firstName}
            on:input={() => checkValidation('firstName')}
          />
          <Input
            title="Last name"
            errorInput={'surName'}
            placeholder="What's your last name?"
            bind:value={newArtist.surName}
            on:input={() => checkValidation('surName')}
          />
        </div>
        <SubTitle>Address</SubTitle>
        <div class="grid lg:grid-cols-3 gap-4">
          <Input
            title="Country"
            errorInput={'country'}
            placeholder="What's your country?"
            bind:value={newArtist.country}
            on:input={() => checkValidation('country')}
          />
          <Input
            title="State"
            errorInput={'state'}
            placeholder="What's your state?"
            bind:value={newArtist.state}
            on:input={() => checkValidation('state')}
          />
          <Input
            title="City"
            bind:value={newArtist.city}
            errorInput={'city'}
            on:input={() => checkValidation('city')}
            placeholder="What's your city?"
          />
        </div>
        <Input bind:value={newArtist.bio} title="Biography" textarea rows="5" />

        <div class="flex justify-end space-x-2">
          <Button
            color="bg-gray-600"
            onClick={() => {
              goto($page.path)
            }}>Cancel changes</Button
          >
          <Button
            color="bg-teal-700"
            onClick={() => {
              updateUser()
            }}>Save changes</Button
          >
        </div>
        <SubTitle>Profile picture</SubTitle>
        <div class="flex">
          <div class="label portal">
            Upload logo
            <div
              class="input portal w-full justify-center items-center cursor-pointer flex space-x-2"
              on:click={() => logoClick.click()}
            >
              <svg
                class="-mt-px"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p>Click to upload or drag your artwork here..</p>

              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                bind:this={logoClick}
                bind:files={logoBlob}
                on:change={e => previewLogo(e)}
                class="hidden"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            color="bg-teal-700"
            onClick={() => {
              updateLogo()
            }}>Update logo</Button
          >
        </div>
      </form>
    </Box>
    <Box
      ><Title>Socials</Title>
      <SubTitle>Social media channels</SubTitle>
      <form class="grid gap-6">
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="grid gap-4 auto-rows-min items-start">
            <InputError errorInput="update" />
            <label class="portal"
              >Pick a channel

              <select
                bind:value={newUserLink.link.type}
                class="input portal text-red-300 capitalize"
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
                  bind:value={newArtist.userLinks[i].linkAddress}
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
              updateUserLinks()
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
              errorInput="email"
              bind:value={newArtist.email}
              on:input={() => checkValidation('email')}
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
