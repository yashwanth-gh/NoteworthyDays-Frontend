import { conf } from "@/conf/conf";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGoogleOAuthURL() {

  const scopes = [
      'openid',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/gmail.addons.current.action.compose'
  ].join(" ");

  const params = {
      response_type:'code',
      scope: scopes,
      prompt: 'consent',
      access_type: 'offline',
      redirect_uri: conf.oauthRedirectUri,
      client_id: conf.googleClientId,
  };

  const qs = new URLSearchParams(params);
  
  return `${conf.googleOauthUri}?${qs.toString()}`;
}
