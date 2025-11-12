// src/utils/env.ts

// Vite 환경변수 접근을 위한 유틸 함수들
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`환경변수 ${key}를 불러올 수 없습니다.`);
    return defaultValue || '';
  }
  console.log(`Env Var - ${key}: ${value}`);
  return value;
};
  
  // 각 환경변수별 getter 함수들
  export const getApiBaseUrl = (): string => {
    return getEnvVar('VITE_API_BASE_URL');
  };
  
  export const getOpenAIKey = (): string => {
    return getEnvVar('VITE_OPENAI_API_KEY');
  };
  
  export const getOpenAIModel = (): string => {
    return getEnvVar('VITE_OPENAI_API_MODEL');
  };


  export const getFirebaseApiKey = (): string  => {
    return getEnvVar('VITE_FIREBASE_API_KEY');
  };

  export const getFirebaseAuthDomain = (): string  => {
    return getEnvVar('VITE_FIREBASE_AUTH_DOMAIN');
  }

  export const getFirebaseProjectId = (): string  => {
    return getEnvVar('VITE_FIREBASE_PROJECT_ID');
  };
  export const getFirebaseStorageBucket = (): string  => {
    return getEnvVar('VITE_FIREBASE_STORAGE_BUCKET');
  };
  export const getFirebaseMessagingSenderId = (): string  => {
    return getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID');
  };
  export const getFirebaseAppId = (): string  => {
    return getEnvVar('VITE_FIREBASE_APP_ID');
  };
  export const getFirebaseMeasurementId = (): string  => {
    return getEnvVar('VITE_FIREBASE_MEASUREMENT_ID');
  };
  
  // 개발 환경 체크
  export const isDevelopment = (): boolean => {
    return getEnvVar('MODE') === 'development';
  };
  
  export const isProduction = (): boolean => {
    return getEnvVar('MODE') === 'production';
  };

