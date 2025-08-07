// config/config.ts or src/config.ts
interface Config {
  apiUrl: string;
  environment: 'development' | 'production' | 'staging';
}

const getConfig = (): Config => {
  // Check if we're in development (localhost)
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('localhost');

  // You can also check for staging environment
  const isStaging = window.location.hostname.includes('staging') ||
                   window.location.hostname.includes('dev');

  if (isDevelopment) {
    return {
      apiUrl: 'http://localhost:8080/api',
      environment: 'development'
    };
  }

  if (isStaging) {
    return {
      apiUrl: 'https://your-staging-api.com/api', // Replace with your staging URL
      environment: 'staging'
    };
  }

  // Production
  return {
    apiUrl: 'https://your-production-api.com/api', // Replace with your production URL
    environment: 'production'
  };
};

export const config = getConfig();