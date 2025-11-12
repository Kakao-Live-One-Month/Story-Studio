import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';
import { getEnvVar } from '../utils/env';

type SampleStory = {
  title: string;
  summary: string;
  content: string[];
  imageUrls: string[];
  createdAt: number;
};



export const testFirestoreWriteRead = async () => {
    console.log(getEnvVar('VITE_FIREBASE_API_KEY'))
  const sample: SampleStory = {
    title: '테스트 이야기',
    summary: 'Firestore 저장/조회 테스트입니다.',
    content: ['첫 번째 페이지 내용', '두 번째 페이지 내용', '세 번째 페이지 내용'],
    imageUrls: [
      'https://example.com/image1.png',
      'https://example.com/image2.png',
      'https://example.com/image3.png',
    ],
    createdAt: Date.now(),
  };

  const ref = doc(db, 'story-book', 'sample-story');
  try {
    await setDoc(ref, sample);
    console.info('Firestore 저장 성공:', sample);

    const snap = await getDoc(ref);
    if (!snap.exists()) {
      console.warn('Firestore 문서가 존재하지 않습니다.');
      return null;
    }

    const data = snap.data() as SampleStory;
    console.info('Firestore 조회 성공:', data);
    return data;
  } catch (error) {
    console.error('Firestore 테스트 실패:', error);
    throw error;
  }
}

