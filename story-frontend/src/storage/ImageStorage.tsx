import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface ImageStorageProps {
  imageUrlArray: string[];
  page_id: number;
  checkStoryCall: boolean;
  setImageUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
  storyArray?: string[]; // content 배열
  title?: string; // 제목
  summary?: string; // 요약
}

// Story 타입 정의
interface Story {
  title: string;
  summary: string;
  content: string[];
  imageUrls: string[];
  createdAt: number;
  user_uid: string;
}

// UUID 생성 함수 (브라우저 내장 함수 사용)
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback (crypto.randomUUID가 없는 환경)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const ImageStorage: React.FC<ImageStorageProps> = ({
  imageUrlArray,
  setImageUrlArray,
  checkStoryCall,
  page_id,
  storyArray = [],
  title = '',
  summary = '',
}) => {
  const { user, isAuthenticated } = useAuth();
  const [storyId, setStoryId] = useState<string>('');

  // 스토리 ID 생성 또는 가져오기
  useEffect(() => {
    const getOrCreateStoryId = async () => {
      if (!user || !isAuthenticated) return;

      try {
        // localStorage에서 현재 스토리 ID 가져오기 (또는 새로 생성)
        const savedStoryId = localStorage.getItem('currentStoryId');
        
        if (savedStoryId) {
          // 저장된 스토리 ID 확인
          const storyRef = doc(db, 'story-book', savedStoryId);
          const storyDoc = await getDoc(storyRef);
          
          if (storyDoc.exists()) {
            setStoryId(savedStoryId);
          } else {
            // 저장된 ID가 없으면 새 UUID 생성
            const newStoryId = generateUUID();
            localStorage.setItem('currentStoryId', newStoryId);
            setStoryId(newStoryId);
          }
        } else {
          // 새 UUID 생성
          const newStoryId = generateUUID();
          localStorage.setItem('currentStoryId', newStoryId);
          setStoryId(newStoryId);
        }
      } catch (error) {
        console.error('스토리 ID 가져오기 오류:', error);
      }
    };

    getOrCreateStoryId();
  }, [user, isAuthenticated]);

  // Firestore에 Story 타입 구조로 저장
  useEffect(() => {
    const saveStoryToFirestore = async () => {
      if (!user || !isAuthenticated || !storyId) return;
      
      // content와 imageUrls가 모두 있어야 저장
      if (storyArray.length === 0 && imageUrlArray.length === 0) return;

      try {
        // story-book 컬렉션에 UUID를 문서 ID로 사용
        const storyRef = doc(db, 'story-book', storyId);
        
        // 문서 존재 여부 확인
        const storyDoc = await getDoc(storyRef);

        if (storyDoc.exists()) {
          // 문서가 존재하면 업데이트 (imageUrls와 필요한 필드만)
          const existingData = storyDoc.data();
          
          await updateDoc(storyRef, {
            imageUrls: imageUrlArray.length > 0 ? imageUrlArray : existingData.imageUrls,
            content: storyArray.length > 0 ? storyArray : existingData.content,
            title: title || existingData.title || '',
            summary: summary || existingData.summary || '',
          });
          console.log('Firestore에 Story 업데이트 성공');
        } else {
          // 문서가 없으면 새로 생성 (Story 타입 구조로)
          const storyData: Story = {
            title: title || '제목 없음',
            summary: summary || (storyArray.length > 0 ? storyArray.slice(0, 3).join(' ').substring(0, 100) + '...' : ''),
            content: storyArray.length > 0 ? storyArray : [],
            imageUrls: imageUrlArray.length > 0 ? imageUrlArray : [],
            createdAt: Date.now(),
            user_uid: user.uid,
          };

          await setDoc(storyRef, storyData);
          console.log('Firestore에 Story 생성 성공:', storyData);
        }
      } catch (error) {
        console.error('Firestore 저장 오류:', error);
      }
    };

    saveStoryToFirestore();
  }, [imageUrlArray, storyArray, title, summary, user, isAuthenticated, storyId]);

  // Firestore에서 Story 데이터 로드
  useEffect(() => {
    const loadStoryFromFirestore = async () => {
      if (!user || !isAuthenticated || !storyId) return;

      try {
        const storyRef = doc(db, 'story-book', storyId);
        const storyDoc = await getDoc(storyRef);

        if (storyDoc.exists()) {
          const data = storyDoc.data() as Story;
          
          // imageUrls 로드
          if (data.imageUrls && Array.isArray(data.imageUrls) && data.imageUrls.length > 0) {
            setImageUrlArray(data.imageUrls);
            console.log('Firestore에서 Story 로드:', data);
          }
        }
      } catch (error) {
        console.error('Firestore 로드 오류:', error);
      }
    };

    loadStoryFromFirestore();
  }, [storyId, user, isAuthenticated, setImageUrlArray]);

  // localStorage 백업
  useEffect(() => {
    if (imageUrlArray.length > 0) {
      localStorage.setItem('imageUrlArray', JSON.stringify(imageUrlArray));
    }
    if (storyArray.length > 0) {
      localStorage.setItem('storyArray', JSON.stringify(storyArray));
    }
  }, [imageUrlArray, storyArray]);

  return <></>;
};

export default ImageStorage;