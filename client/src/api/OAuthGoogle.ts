import { VITE_OAUTH_CLIENT_ID } from '../types/envVariable';
import { axiosInstance } from './axios';

const temp = <T>(object: any, key: string): object is T => {
  return key in object;
};

interface o {
  client_id: string;
  response_type: string;
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
      response_type: 'token',
      scope: 'profile email',
      callback: oauth2SignIn,
    });
  }
};

/**
 * oauth2SignIn
 */
export const oauth2SignIn = () => {
  // 액세스 토큰을 요청하기 위한 Google의 OAuth 2.0 엔드포인트
  /* const oauth2EndPoint =  */ axiosInstance
    .post('https://0f45-222-110-54-74.ngrok-free.app:8080/oauth2/google')
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};
