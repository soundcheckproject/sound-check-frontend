const variables = {
  labelId: import.meta.env['VITE_LABEL_ID'],
  name: import.meta.env['VITE_LABEL_NAME'],
  shortName: import.meta.env['VITE_LABEL_SHORTNAME'],
  description: import.meta.env['VITE_LABEL_DESCRIPTION'],
  founded: import.meta.env['VITE_LABEL_FOUNDED'],
  logo: import.meta.env['VITE_LABEL_LOGO'],
  apiKey: import.meta.env['VITE_FIREBASE_APIKEY'],
  authDomain: import.meta.env['VITE_FIREBASE_AUTHDOMAIN'],
  projectId: import.meta.env['VITE_FIREBASE_PROJECTID'],
  storageBucket: import.meta.env['VITE_FIREBASE_STORAGEBUCKET'],
  messagingSenderId: import.meta.env['VITE_FIREBASE_MESSENGERID'],
  appId: import.meta.env['VITE_FIREBASE_APPID'],
  measurementId: import.meta.env['VITE_FIREBASE_MEASUREMENTID'],
}

export default variables
