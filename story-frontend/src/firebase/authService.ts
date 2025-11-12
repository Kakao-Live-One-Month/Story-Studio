import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();

// Google 소셜 로그인
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Google 로그인 성공:', user);
    return user;
  } catch (error: any) {
    console.error('Google 로그인 실패:', error);
    throw new Error(error.message || 'Google 로그인에 실패했습니다.');
  }
};

// 로그아웃
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('로그아웃 성공');
  } catch (error: any) {
    console.error('로그아웃 실패:', error);
    throw new Error(error.message || '로그아웃에 실패했습니다.');
  }
};

// 인증 상태 변경 리스너
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// 현재 사용자 가져오기
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
