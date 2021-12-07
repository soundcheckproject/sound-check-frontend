import { getAuth } from 'firebase/auth'
import type { RoleType } from '../types/Role.type'
import type FeedbackType from '../types/Feedback.type'
import type { TrackType } from '../types/Track.type'
import type { Link, UserType, ArtistType } from '../types/User.type'

export const query = async (
  name: string,
  query: string,
  variables?: any,
): Promise<any> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const gqlReqponse = await res.json()

    if (gqlReqponse.errors) {
      throw gqlReqponse.errors;
    }

    return gqlReqponse.data[name]
  } catch (err) {
    console.log({ err })
    throw err
  }
}

export const uploadQuery = async (
  name: string,
  query: string,
  variables?: Object,
) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))
  return res.data[name]
}
export const getGenres = async (): Promise<
  { uuid: string; name: string; description: string }[]
> => {
  const response = await query(
    `getGenres`,
    `query Query {
        getGenres {
          uuid
          name
          description
        }
      }`,
  )
  return response
}
export const getLinks = async (): Promise<Link[]> => {
  const response = await query(
    `getLinks`,
    `query GetLinks {
      getLinks {
        uuid
        type
      }
    }`,
  )
  return response
}
export const getUsersByNickname = async (
  nickname: string,
): Promise<{ uuid: string; nickName: string; logo: string }[]> => {
  const response = await query(
    `getUsersByNickname`,
    `query getUsersByNicknameQuery($nickname: String!) {
      getUsersByNickname(nickname: $nickname) {
        uuid
        nickName
        logo
      }
    }`,
    { nickname: nickname },
  )
  return response
}

export const getArtistsByNickName = async (
  nickname: string,
): Promise<{ uuid: string; nickName: string; logo: string }[]> => {
  const response = await query(
    `getArtistsByNickname`,
    `query getArtistsByNickname($nickname: String!) {
  getArtistsByNickname(nickname: $nickname) {
  uuid
  nickName
  logo  
  }
}`,
    { nickname: nickname },
  )
  return response
}

export const getArtistByUserId = async (userId: string): Promise<UserType> => {
  const response = await query(
    `getUser`,
    `query GetUser($userId: String!) {
      getUser(userId: $userId) {
        biography
        nickName
        uid
        uuid
        firstName
        surName
        birthdate
        email
        country
        city
        state
        logo
        role {
          name
        }
        userLinks {

          linkAddress
          link {
            uuid
            type
          }
        }
      }
    }`,
    { userId: userId },
  )
  return response
}
export const createTrack = async (track: any): Promise<{ uuid: string }> => {
  const response = await query(
    'createTrack',
    `mutation createTrack($data: CreateTrackInput!) {
        createTrack(data: $data) {
          uuid
        }
      }`,
    { data: track },
  )
  return response
}

export const getTracksByArtistId = async (artistId: string): Promise<any[]> => {
  const response = await query(
    `getTracksByArtist`,
    `query GetTracksByArtist($artistId: String!) {
      getTracksByArtist(artistId: $artistId) {
        uuid
        title
        description
        lyrics
        isSigned
        prefferdReleaseDate
        genre {
          name
        }
        artwork{
          designer
          resource
        }
      }
    }`,
    { artistId: artistId },
  )
  return response
}
export const getTracksReleasedByUserId = async (
  artistId: string,
): Promise<any[]> => {
  const response = await query(
    `getTracksByArtist`,
    `query GetTracksByArtist($artistId: String!) {
      getTracksByArtist(artistId: $artistId) {
        uuid
        title
        description
        lyrics
        isSigned
        prefferdReleaseDate
        genre {
          name
        }
        artwork{
          designer
          resource
        }
      }
    }`,
    { artistId: artistId },
  )
  return response
}

export const getAllTracks = async (): Promise<TrackType[]> => {
  const response = await query(
    `getTracks`,
    `query GetTracks {
      getTracks {
        uuid
        title
        description
        lyrics
        contractFile
        resource
        previewStart
        previewStop
        isSigned
        prefferdReleaseDate
        genreId
        genre {
          name
        }
        artwork {
          designer
          resource
        }
        artistTracks {
          user {
            nickName
            userLinks {
              linkAddress
              link {
                type
              }
            }
          }
        }
      }
    }`,
  )
  return response
}

export const getTrackById = async (trackId: string): Promise<any> => {
  const response = await query(
    'getTrackById',
    `query GetTrackById($trackId: String!) {
      getTrackById(trackId: $trackId) {
        artwork {
          uuid
          resource
          designer
        }
        genreId
        genre {
          name
        }
        title
        description
        lyrics
        uuid
        contractFile
        encodedFile
        previewStart
        previewStop
        isSigned
        prefferdReleaseDate
   
        artistTracks {
          royaltySplit
          isApproved
          user {
            uuid
            surName
            firstName
            nickName
            logo
            userLinks {
              linkAddress
              link {
                type
              }
            }
          }
        }
      }
    }`,
    { trackId: trackId },
  )
  return response
}

// Todo: role {name} toevoegen
export const getTrackFeedbacksByTrackId = async (
  trackId: string,
): Promise<FeedbackType[]> => {
  const response = await query(
    'getTrackById',
    `query Feedbacks($trackId: String!) {
      getTrackById(trackId: $trackId) {
        feedbacks {
          trackId
          userId
          description
          timeStampSong
          date
          user {
            nickName
            logo
           
          }
        }
      }
    }
    `,
    { trackId: trackId },
  )
  return response['feedbacks']
}

// todo: post to database
export const addFeedbackToTrack = async (feedback: FeedbackType) => {
  const response = await query(
    'createFeedback',
    `mutation Mutation($createFeedbackInput: CreateFeedbackInput!) {
        createFeedback(createFeedbackInput: $createFeedbackInput) {
          uuid
        }
      }
    `,
    { createFeedbackInput: feedback },
  )
  return response
}

export const getUserViaFirebase = async (): Promise<UserType> => {
  const response = await query(
    `getUserViaFirebase`,
    `query GetUserViaFirebase {
      getUserViaFirebase {
        uuid
        uid
        nickName
        biography
        firstName
        surName
        birthdate
        email
        country
        state
        city
        logo
        role {
          name
          slug
        }
        userLinks {

          link {
            uuid
            type
          }
          linkAddress
        }
      }
    }`,
  )
  return response
}
export const updateUserInfoByUserId = (
  userId: string,
  data: UserType,
): Promise<UserType> => {
  return query(
    `updateUser`,
    `mutation UpdateUser($data: UpdateUserInput!, $userId: String!) {
      updateUser(data: $data, userId: $userId) {
        uuid
      }
    }`,
    { data: data, userId: userId },
  )
}
export const updateUserLinksByUserId = (
  userId: string,
  linkData: any,
): Promise<UserType> => {
  return query(
    `updateUserLinksByUserId`,
    `mutation CreateUserLink($createUserLinkInput: CreateUserLinkInput!, $data: CreateUserInput!) {
      createUserLink(createUserLinkInput: $createUserLinkInput) {
        userId
      }
    }`,
    { userId: userId, data: linkData },
  )
}
export const getArtists = async (): Promise<ArtistType[]> => {
  const response = await query(
    `getArtists`,
    `query GetArtists{
      getArtists {
        uuid
        nickName
        firstName
        surName
        email
        country
        logo
        role {
          name
          slug
        }
      }
    }`,
  )
  return response
}

export const updateTrack = async (
  trackId: string,
  data: TrackType,
): Promise<TrackType> => {
  const response = await query(
    'updateTrack',
    `mutation UpdateTrack($data: UpdateTrackInput!, $trackId: String!) {
      updateTrack(data: $data, trackId: $trackId) {
        uuid
      }
    }`,
    { data: data, trackId: trackId },
  )
  return response
}

export const toggleSigned = async (
  isSigned: boolean | null,
  trackId: string,
): Promise<string> => {
  const response = await query(
    'toggleSigned',
    `mutation toggleSigned($isSigned: Boolean!, $trackId: String!) {
      toggleSigned(isSigned: $isSigned, trackId: $trackId) {
        uuid
      }
    }`,
    { isSigned: isSigned, trackId: trackId },
  )
  return response
}

export const getRoles = async (): Promise<RoleType[]> => {
  const response = await query(``, ``)
  return response
}
