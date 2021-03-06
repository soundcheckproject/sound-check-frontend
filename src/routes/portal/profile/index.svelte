<script lang="ts">
  import ProfileBanner from '../../../components/ProfileBanner.svelte'
  import Box from '../../../components/Box.svelte'
  import Title from '../../../components/Title.svelte'
  import SubTitle from '../../../components/SubTitle.svelte'
  import Input from '../../../components/Input.svelte'
  import Button from '../../../components/Button.svelte'
  import InputError from '../../../components/InputError.svelte'
  import {
    isNickNameAvailable,
    validateCapital,
    validateEmailValid,
    validateEmpty,
    validateError,
    validateErrors,
    validateErrorTime,
    validateLength,
    validateLower,
    validateNumbers,
    validateOld,
  } from '../../../utils/useValidation'

  import type { Link, UserLink, UserType } from '../../../types/User.type'

  import userStore from '../../../stores/userStore'
  import validationStore from '../../../stores/validationStore'
  import { onMount } from 'svelte'
  import {
    getArtistByUserId,
    getArtists,
    getLinks,
    getRoles,
    getUserViaFirebase,
    query,
    updateUserInfoByUserId,
    updateUserLinksByUserId,
  } from '../../../utils/useGraphQL'
  import {
    updateFirebaseEmail,
    updateFirebasePassword,
  } from '../../../utils/useFirebase'
  import { formatDateToDDMMJJJJ } from '../../../utils/useFormat'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { uploadLogo } from '../../../utils/useRest'
  import { capitalize } from '../../../utils/capitalize'
  import { pageSelectedStore, roleStore } from '../../../stores/stores'
  import type { RoleType } from '../../../types/Role.type'
  import ErrorBanner from '../../../components/error/ErrorBanner.svelte'
  import Skeleton from '../../../components/Skeleton.svelte'
  import FadeBox from '../../../components/portal/FadeBox.svelte'

  let artist: UserType = undefined

  let newArtist: UserType

  let newUserLink: UserLink = {
    link: { type: 'Pick a channel' },
    linkAddress: '',
  }

  let birthdatestring: string
  let logoClick: HTMLInputElement

  let links: Link[] = []
  let errors: string[] = []

  let loadingStatus: { [key: string]: boolean } = {
    logo: false,
    userinfo: false,
    password: false,
    email: false,
    socials: false,
    addLink: false,
    removeLink: false,
  }

  const updateUser = async () => {
    loadingStatus.userinfo = true
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
        'biography',
      ]) {
        if (newArtist[objectKey] != oldUser[objectKey]) {
          updatedUser[objectKey] = newArtist[objectKey]
        }
      }
      updatedUser.birthdate = new Date(birthdatestring)

      if (Object.keys(updatedUser).length > 0) {
        await updateUserInfoByUserId(artist.uuid, updatedUser)
          .then(err => {
            loadingStatus.userinfo = false
          })
          .catch(e => {
            loadingStatus.userinfo = false
            validateErrorTime('connection', 'graphql', errors)
          })
      } else {
        loadingStatus.userinfo = false
        validateErrorTime('general', 'change', errors)
      }
    } else {
      loadingStatus.userinfo = false
      validateErrorTime('general', 'errors', errors)
    }
  }

  const updateLogo = async () => {
    loadingStatus.logo = true

    if (logoBlob) {
      await uploadLogo(
        logoBlob[0],
        artist.nickName + 'logo' + '.jpg',
        artist.uuid,
      )
        .then(res => {
          loadingStatus.logo = false
          logoBlob = null
        })
        .catch(error => {})
    } else {
      loadingStatus.logo = false
      validateErrorTime('logo', 'empty', errors)
    }
  }
  const updateUserEmail = () => {
    loadingStatus.email = true

    if ($validationStore.length == 0) {
      updateFirebaseEmail(newArtist)
        .then(result => {
          loadingStatus.email = false
        })
        .catch(error => {
          loadingStatus.email = false
        })
    } else {
      loadingStatus.email = false
      validateErrorTime('general', 'errors', errors)
    }
  }

  let userPassword = { old: '', new: '' }
  const updateUserPassword = () => {
    loadingStatus.password = true

    if ($validationStore.length == 0 && userPassword.new && userPassword.old) {
      updateFirebasePassword(userPassword.new)
        .then(result => {
          loadingStatus.password = false
        })
        .catch(error => {
          loadingStatus.password = false
          validateErrorTime('connection', 'graphql', errors)
        })
    } else {
      loadingStatus.password = false
      validateErrorTime('general', 'errors', errors)
    }
  }

  let newRole: RoleType

  const updateUserRole = async () => {
    loadingStatus.role = true

    await query(
      `updateUserRole`,
      `mutation UpdateUserRole($updateUserRoleInput: UpdateUserRoleInput!) {
        updateUserRole(updateUserRoleInput: $updateUserRoleInput) {
          uuid
        }
      }`,
      {
        updateUserRoleInput: {
          userId: artist.uuid,
          roleId: newRole.uuid,
        },
      },
    )
      .then(result => {
        getArtist()
        loadingStatus.role = false
      })
      .catch(error => {
        loadingStatus.role = false
      })
  }

  const addUserLink = async () => {
    loadingStatus.addLink = true
    if (newUserLink.linkAddress.length > 0) {
      if (
        newArtist.userLinks.filter(
          link => link.link.uuid == newUserLink.link.uuid,
        ).length == 0
      ) {
        if (newUserLink.link.uuid != 'Pick a channel') {
          await query(
            `createUserLink`,
            `mutation Mutation($createUserLinkInput: CreateUserLinkInput!) {
                  createUserLink(createUserLinkInput: $createUserLinkInput) {
                    linkAddress
                    userId
                    linkId
                  }
                }`,
            {
              createUserLinkInput: {
                userId: artist.uuid,
                linkId: newUserLink.link.uuid,
                linkAddress: newUserLink.linkAddress,
              },
            },
          ).then(() => {
            getArtist().then(() => {
              loadingStatus.addLink = false
            })
          })
        } else {
          loadingStatus.addLink = false
          validateErrorTime('update', 'linktype', errors)
        }
      } else {
        loadingStatus.addLink = false
        validateErrorTime('update', 'linkexcist', errors)
      }
    } else {
      loadingStatus.addLink = false
      validateErrorTime('update', 'linkempty', errors)
    }
  }

  const deleteUserLink = async (linkId: string) => {
    await query(
      `removeUserLink`,
      `mutation RemoveUserLink($linkId: String!, $userId: String!) {
        removeUserLink(linkId: $linkId, userId: $userId) {
          linkId
          userId
        }
      }`,
      {
        linkId: linkId,
        userId: artist.uuid,
      },
    )
      .then(() => {
        getArtist()
      })
      .catch(error => {})
  }

  const updateUserLink = async (linkId: string, linkAddress: string) => {
    await query(
      `updateUserLink`,
      `mutation UpdateUserLink($updateUserLinkInput: UpdateUserLinkInput!, $linkId: String!, $userId: String!) {
        updateUserLink(updateUserLinkInput: $updateUserLinkInput, linkId: $linkId, userId: $userId) {
          userId
          linkId
        }
      }`,
      {
        updateUserLinkInput: {
          linkAddress: linkAddress,
        },
        linkId: linkId,
        userId: artist.uuid,
      },
    )
      .then(() => {
        getArtists()
      })
      .catch(error => {})
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

          validateNumbers(userPassword.new),
          validateCapital(userPassword.new),
          validateLower(userPassword.new),
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
      'biography',
      // 'prefferdReleaseDate',
    ]) {
      if (errorType == type)
        errors = validateErrors([validateEmpty(newArtist[type])], type, errors)
    }
  }
  let logo: File

  let logoPreview: any = ''
  let logoBlob: any = ''
  const previewLogo = (e: any) => {
    logo = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(logo)
    reader.onload = e => {
      logoPreview = e.target.result
    }
  }

  const getArtist = async () => {
    try {
      if ($page.params.userId) {
        artist = await getArtistByUserId($page.params.userId)
        if (artist)
          pageSelectedStore.set({ name: 'users', title: artist.nickName })
      } else {
        artist = await getUserViaFirebase()
      }
      birthdatestring = formatDateToDDMMJJJJ(new Date(artist.birthdate))
    } catch (error) {
      artist = null
    }
  }

  let roles: RoleType[] = []

  pageSelectedStore.set(undefined)
  onMount(async () => {
    links = await getLinks()
    getArtist()
    if ($roleStore == 'label-manager') {
      roles = await getRoles()
    }
  })

  $: {
    newArtist = artist
    validationStore.set(errors)
  }
</script>

<svelte:head>
  <title>{`${artist ? artist.nickName : ''} - Profile`}</title>
</svelte:head>

<FadeBox>
  <div class="grid gap-8">
    {#if artist}
      <ProfileBanner
        artist={newArtist}
        logo={logoPreview.length > 0 ? logoPreview : newArtist.logo}
      />
      <Box>
        <Title>Account</Title>
        <SubTitle>Personal information</SubTitle>
        <InputError errorInput="general" />
        <form class="grid gap-6 ">
          <div class="grid sm:grid-cols-2 gap-4 ">
            <Input
              errorInput="nickname"
              title="Nickname"
              placeholder="Choose a nickname.."
              bind:value={newArtist.nickName}
              on:input={() => checkValidation('nickname')}
            />

            <Input
              title="Birthdate"
              bind:value={birthdatestring}
              type="date"
              errorInput="birthdate"
              placeholder="What's your birthdate?"
              on:input={() => checkValidation('birthdate')}
            />
          </div>
          <div class="grid sm:grid-cols-2 gap-4 ">
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
          <Input
            bind:value={newArtist.biography}
            title="Biography"
            textarea
            rows="5"
          />

          <div class="flex justify-end space-x-2 ">
            <Button
              color="bg-gray-600"
              onClick={() => {
                goto($page.path)
              }}>Cancel changes</Button
            >
            <Button
              color="bg-teal-700"
              loading={loadingStatus.userinfo ? 'Updating userinfo..' : null}
              onClick={() => {
                updateUser()
              }}>Save changes</Button
            >
          </div>
          <SubTitle>🖼 Images</SubTitle>
          <InputError errorInput="logo" />
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="grid gap-6">
              <div class="label portal w-full">
                Upload logo
                <div
                  class="input portal  w-full justify-center items-center cursor-pointer flex space-x-2"
                  on:click={() => logoClick.click()}
                >
                  {#if logoBlob && logo}
                    <img
                      class="w-8 h-8 rounded-sm object-cover -my-2 -ml-3"
                      src={logoPreview}
                      alt="Preview of logo"
                    />
                    <p class="text-teal-700 font-medium">
                      {logo ? logo.name : ''} has been selected.
                      <!-- Logo has been selected. Press update logo to submit! -->
                    </p>
                  {:else}
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
                    <p>Click to upload or drag your logo here..</p>
                  {/if}

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
              <div class="flex justify-end">
                <Button
                  color="bg-teal-700"
                  onClick={() => {
                    updateLogo()
                  }}
                  loading={loadingStatus.logo ? 'Updating logo..' : null}
                  >Update logo</Button
                >
              </div>
            </div>
          </div>
        </form>
      </Box>
      <Box
        ><Title>Socials</Title>
        <SubTitle>Social media channels</SubTitle>
        <div class="grid gap-6">
          <div class="grid lg:grid-cols-2 gap-6">
            <form class="grid gap-4 auto-rows-min items-start">
              <InputError errorInput="update" />
              <label class="portal"
                >Pick a channel

                <select
                  bind:value={newUserLink.link}
                  on:change={e => {}}
                  class="input portal text-red-300 capitalize"
                  placeholder="For example: Instagram, facebook, .."
                >
                  <option selected disabled value="Pick a channel"
                    >Pick a channel</option
                  >
                  {#each links as l}
                    <option value={l}>{l.type}</option>
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
                  loading={loadingStatus.addLink ? 'Adding link..' : null}
                  onClick={() => {
                    addUserLink()
                  }}>Add link</Button
                >
              </div>
            </form>
            <div class="grid auto-rows-min gap-4">
              {#if newArtist.userLinks.length == 0}
                <div class="input portal mt-7">
                  You haven't added any social media channels yet.
                </div>
              {/if}
              {#each newArtist.userLinks as userLink, i}
                <div class="relative group">
                  <Input
                    title={capitalize(newArtist.userLinks[i].link.type)}
                    bind:value={newArtist.userLinks[i].linkAddress}
                    placeholder="Link address.."
                  />
                  <div
                    class="group-hover:opacity-50 absolute flex bottom-3 right-3 opacity-0 hover:opacity-75 "
                  >
                    <svg
                      class="bg-opacity-0 transition-all hover:bg-opacity-100 bg-gray-300 cursor-pointer p-1 rounded-full"
                      on:click={() => deleteUserLink(userLink.link.uuid)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
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
                    <svg
                      class="bg-opacity-0 transition-all hover:bg-opacity-100 bg-gray-300 cursor-pointer p-1 rounded-full"
                      on:click={() =>
                        updateUserLink(
                          userLink.link.uuid,
                          newArtist.userLinks[i].linkAddress,
                        )}
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              {/each}
              <p class="text-xs text-gray-400">
                * Click on the bin to delete and on the check icon to update.
              </p>
            </div>
          </div>
          <!-- <div class="flex justify-end">
          <Button
            color="bg-teal-700"
            loading={loadingStatus.socials ? 'Updating socials..' : null}
            onClick={() => {
              updateUserLinks()
            }}>Update socials</Button
          >
        </div> -->
        </div>
      </Box>
      {#if artist.uuid == $userStore.uuid}
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
                    loading={loadingStatus.email ? 'Updating email..' : null}
                    onClick={() => {
                      updateUserEmail()
                    }}>Update email</Button
                  >
                </div>
              </div>
              <div>
                <div class="grid gap-6">
                  <InputError errorInput="general" />
                  <SubTitle>Change password</SubTitle>
                  <Input
                    title="Old password"
                    type="password"
                    bind:value={userPassword.old}
                    placeholder="Old password.."
                    autocomplete="current-password"
                  />
                  <Input
                    on:input={() => checkValidation('password')}
                    errorInput={'password'}
                    title="New password"
                    type="password"
                    bind:value={userPassword.new}
                    placeholder="New passord.."
                    autocomplete="new-password"
                  />
                  <div class="flex justify-end">
                    <Button
                      color="bg-teal-700"
                      loading={loadingStatus.password
                        ? 'Updating password..'
                        : null}
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
      {:else}
        <!-- <RoleLayer allowedForRoles={['label-manager']}> -->
        <Box
          ><Title>Roles</Title>
          <form class="grid gap-6">
            <div class="grid lg:grid-cols-2 gap-6">
              <div class="grid gap-6 auto-rows-min items-start">
                <SubTitle>Change role</SubTitle>

                {#if roles.length}
                  <select
                    bind:value={newRole}
                    on:change={e => {}}
                    class="input portal text-red-300"
                    placeholder="For example: Instagram, facebook, .."
                  >
                    <option selected disabled>Pick a role</option>
                    {#each roles as role}
                      <option value={role}>{role.name}</option>
                    {/each}</select
                  >
                {/if}
                <div class="flex justify-end">
                  <Button
                    color="bg-teal-700"
                    loading={loadingStatus.role ? 'Updating role..' : null}
                    onClick={() => {
                      updateUserRole()
                    }}>Update role</Button
                  >
                </div>
              </div>
              <div />
            </div>
          </form>
        </Box>
        <!-- </RoleLayer> -->
      {/if}
    {:else if artist === undefined}
      <Skeleton
        theme="light"
        loading={true}
        height="h-[22rem]"
        className="mb-8"
      />
      <Skeleton theme="light" loading={true} height="h-[18rem]" />
    {:else if artist === null}
      <ErrorBanner message="Error while fetching the user data." />
    {/if}
  </div>
</FadeBox>
