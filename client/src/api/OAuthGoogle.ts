import axios from 'axios';
import { VITE_OAUTH_CLIENT_ID, VITE_OAUTH_GOOGLE_REDIRECT_URL } from '../types/envVariable';
import { axiosInstance } from './axios';

const temp = <T>(object: any, key: string): object is T => {
  return key in object;
};

interface o {
  client_id: string;
  scope: string;
  callback: () => void;
}

interface c {
  google: {
    accounts: {
      oauth2: {
        initTokenClient: (data: o) => { requestAccessToken: () => void };
      };
    };
  };
}

/**
 * Token Client Initialize
 */
export const client = () => {
  if (temp<c>(window, 'google')) {
    return window.google.accounts.oauth2.initTokenClient({
      client_id: VITE_OAUTH_CLIENT_ID,
      scope:
        'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      callback: oauth2SignIn,
    });
  }
};
// https://www.googleapis.com/auth/contacts.readonly

/**
 * oauth2SignIn
 */
// https://c68b-222-110-54-74.ngrok-free.app/login/oauth2/code/google
export const oauth2SignIn = () => {
  // 액세스 토큰을 요청하기 위한 Google의 OAuth 2.0 엔드포인트
  /* const oauth2EndPoint =  */ axiosInstance
    .post('https://c68b-222-110-54-74.ngrok-free.app/oauth2/authorization/google')
    .then((response) => response)
    .then((re) => console.log(re))
    .catch((err) => console.log(err));
};
