import { conf } from "@/conf/conf";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios, { AxiosRequestConfig } from 'axios';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const axiosInstanceForBackend = axios.create({
  withCredentials: true,
  baseURL: conf.serverEndpoint,
})

export async function axiosRequest(config: AxiosRequestConfig) {
  try {

    // Axios request
    const response = await axiosInstanceForBackend(config);

    // Handle successful response
    // console.log('Response:', response.data);
    return { statusCode: response.status, success: true, data: response.data, error: null };

  } catch (error: any) {
    // Handle error
    let statusCode: number;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      statusCode = error.response.status;
      console.error('Server Error:', statusCode);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
      statusCode = 500; // Set a generic status code for request errors
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      statusCode = 500; // Set a generic status code for other errors
    }
    console.error('Config:', error.config);

    return { statusCode, success: false, data: null, error: error.message };
  }
}


export function getGoogleOAuthURL() {

  const scopes = [
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/gmail.addons.current.action.compose'
  ].join(" ");

  const params = {
    response_type: 'code',
    scope: scopes,
    prompt: 'consent',
    access_type: 'offline',
    redirect_uri: conf.oauthRedirectUri,
    client_id: conf.googleClientId,
  };

  const qs = new URLSearchParams(params);

  return `${conf.googleOauthUri}?${qs.toString()}&include_granted_scopes=true`;
}
