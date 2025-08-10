// config/config.ts
interface Config {
  apiUrl: string;
  environment: 'development' | 'production' | 'staging';
  googleClientId: string;
}

const getConfig = (): Config => {
  const hostname = window.location.hostname;

  const isDevelopment = hostname === 'localhost' || hostname === '127.0.0.1';
  const isStaging =
    !isDevelopment &&
    (hostname.includes('staging') || hostname.includes('dev'));

  const apiUrl = 'https://jobluubackend.onrender.com/api';
  const googleClientId =
    '415838507936-um9s5pbvbubp1hs2k84lvjmsph4e38m3.apps.googleusercontent.com';

  if (isDevelopment) {
    return {
      apiUrl,
      environment: 'development',
      googleClientId,
    };
  }

  if (isStaging) {
    return {
      apiUrl,
      environment: 'staging',
      googleClientId,
    };
  }

  return {
    apiUrl,
    environment: 'production',
    googleClientId,
  };
};

export const config = getConfig();

