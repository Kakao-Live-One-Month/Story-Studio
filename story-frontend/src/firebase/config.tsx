import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFirebaseApiKey, getFirebaseAppId, getFirebaseAuthDomain, getFirebaseMeasurementId, getFirebaseStorageBucket, getFirebaseProjectId, getFirebaseMessagingSenderId, getOpenAIModel, getOpenAIKey } from '../utils/env';

const apiKey = getFirebaseApiKey();
const appId = getFirebaseAppId();
const authDomain = getFirebaseAuthDomain();
const projectId = getFirebaseProjectId();
const storageBucket = getFirebaseStorageBucket();
const measurementId = getFirebaseMeasurementId();
const messagingSenderId = getFirebaseMessagingSenderId();
const isApiKeyValid = apiKey && apiKey.length > 0;
const isAppIdValid = appId && appId.length > 0;
const isMeasurementIdValid = measurementId && measurementId.length > 0;
if (!isApiKeyValid) {
  console.warn('Firebase API 키가 설정되지 않았습니다.');
}
if (!isAppIdValid) {
  console.warn('Firebase App ID가 설정되지 않았습니다.');
}
const openAIKey = getOpenAIKey();
const openAIModel = getOpenAIModel();
console.log((import.meta as any)?.env)


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: isMeasurementIdValid ? measurementId : undefined,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch((error) => {
    console.error('Analytics 지원 확인 실패:', error);
  });

export { app, auth, db, storage, analytics };