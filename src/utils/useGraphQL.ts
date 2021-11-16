import { getAuth } from 'firebase/auth'
import type { TrackType } from '../types/Track.type'
import type { Link, UserType, ArtistType } from '../types/User.type'

export const query = async (
  name: string,
  query: string,
  variables?: Object,
) => {
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
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res.data[name]
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
        type
      }
    }`,
  )
  return response
}
export const getArtistsByNickName = async (
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
      }
    }`,
    { artistId: artistId },
  )
  return response
}

export const getAllTracks = async (): Promise<TrackType[]> => {
  const response = await query(
    `getTracksReleased`,
    `query GetTracks {
      getTracksReleased {
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
        artwork {
          resource
        }
        genre {
          name
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
          resource
          designer
        }
        genre {
          name
        }
        title
        description
        lyrics
        uuid
        contractFile
        resource
        previewStart
        previewStop
        isSigned
        prefferdReleaseDate
      }
    }`,
    { trackId: trackId },
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
  userData: UserType,
): Promise<UserType> => {
  return query(
    `updateUserByUserId`,
    `mutation UpdateUserByUserId($userId: String!, $data: UpdateUserInput!) {
      updateUserByUserId(userId: $userId, data: $data) {
        nickName
        firstName
        surName
        birthdate
        country
        state
        city
        logo
        userLinks {
          link {
            type
          }
          linkAddress
        }
      }
    }`,
    { userId: userId, data: userData },
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
