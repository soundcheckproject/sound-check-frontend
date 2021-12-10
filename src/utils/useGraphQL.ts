/* eslint-disable @typescript-eslint/ban-types */
import { getAuth } from 'firebase/auth'
import type { RoleType } from '../types/Role.type'
import type FeedbackType from '../types/Feedback.type'
import type { TrackInputType, TrackType } from '../types/Track.type'
import type { Link, UserType, ArtistType, UserLink } from '../types/User.type'
import log, { logGraphQLError, LogType } from './logger'
import type { GenreType } from 'src/types/Genre.type'
import type Uuid from '../types/Uuid'

export const query = async (
  name: string,
  query: string,
  variables?: Object,
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
      logGraphQLError(name, gqlReqponse.errors)
      throw `Could not ${name}`
    } else {
      return gqlReqponse.data[name]
    }
  } catch (error) {
    log(LogType.ERROR, 'query', error)
    throw error
  }
}

export const getGenres = async (): Promise<GenreType[]> => {
  return await query(
    `getGenres`,
    `query Query {
        getGenres {
          uuid
          name
          description
        }
      }`,
  )
}

export const getLinks = async (): Promise<Link[]> => {
  return await query(
    `getLinks`,
    `query GetLinks {
      getLinks {
        uuid
        type
      }
    }`,
  )
}
export const getUsersByNickname = async (
  nickname: string,
): Promise<UserType[]> => {
  return await query(
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
}

export const getArtistsByNickName = async (
  nickname: string,
): Promise<UserType[]> => {
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
  return await query(
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
          uuid
          name
          slug
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
}

export const createTrack = async (track: TrackInputType): Promise<Uuid> => {
  return await query(
    'createTrack',
    `mutation createTrack($data: CreateTrackInput!) {
        createTrack(data: $data) {
          uuid
        }
      }`,
    { data: track },
  )
}

export const getTracksByArtistId = async (
  artistId: string,
): Promise<TrackType[]> => {
  return await query(
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
}
export const getTracksReleasedByUserId = async (
  artistId: string,
): Promise<TrackType[]> => {
  return await query(
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
}

export const getAllTracks = async (): Promise<TrackType[]> => {
  return await query(
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
}

export const getTrackById = async (trackId: string): Promise<TrackType> => {
  return await query(
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
export const addFeedbackToTrack = async (
  feedback: FeedbackType,
): Promise<Uuid> => {
  return await query(
    'createFeedback',
    `mutation Mutation($createFeedbackInput: CreateFeedbackInput!) {
        createFeedback(createFeedbackInput: $createFeedbackInput) {
          uuid
        }
      }
    `,
    { createFeedbackInput: feedback },
  )
}

export const getUserViaFirebase = async (): Promise<UserType> => {
  return await query(
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
}

export const updateUserInfoByUserId = async (
  userId: string,
  data: UserType,
): Promise<Uuid> => {
  return await query(
    `updateUser`,
    `mutation UpdateUser($data: UpdateUserInput!, $userId: String!) {
      updateUser(data: $data, userId: $userId) {
        uuid
      }
    }`,
    { data: data, userId: userId },
  )
}

export const updateUserLinksByUserId = async (
  userId: string,
  linkData: UserLink,
): Promise<UserType> => {
  return await query(
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
  return await query(
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
}

export const updateTrack = async (
  trackId: string,
  data: TrackType,
): Promise<TrackType> => {
  return await query(
    'updateTrack',
    `mutation UpdateTrack($data: UpdateTrackInput!, $trackId: String!) {
      updateTrack(data: $data, trackId: $trackId) {
        uuid
      }
    }`,
    { data: data, trackId: trackId },
  )
}

export const toggleSigned = async (
  isSigned: boolean | null,
  trackId: string,
): Promise<Uuid> => {
  return await query(
    'toggleSigned',
    `mutation toggleSigned($isSigned: Boolean!, $trackId: String!) {
      toggleSigned(isSigned: $isSigned, trackId: $trackId) {
        uuid
      }
    }`,
    { isSigned: isSigned, trackId: trackId },
  )
}

export const toggleSignedPending = async (trackId: string): Promise<Uuid> => {
  return await query(
    'toggleSigned',
    `mutation toggleSigned($trackId: String!) {
      toggleSigned(trackId: $trackId) {
        uuid
      }
    }`,
    { trackId: trackId },
  )
}

export const getRoles = async (): Promise<RoleType[]> => {
  return await query(
    `getRoles`,
    `query Query {
        getRoles {
          uuid
          name
          slug
          description
        }
      }
  `,
  )
}
