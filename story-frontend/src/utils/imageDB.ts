// src/utils/imageDB.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ImageDB extends DBSchema {
  images: {
    key: string;
    value: Blob;
  };
}

const DB_NAME = 'story-images';
const STORE_NAME = 'images';

let dbInstance: IDBPDatabase<ImageDB> | null = null;

export const getDB = async () => {
  if (dbInstance) return dbInstance;
  
  dbInstance = await openDB<ImageDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
  return dbInstance;
};

// 이미지 저장 (URL → Blob)
export const saveImageToDB = async (key: string, imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const db = await getDB();
    await db.put(STORE_NAME, blob, key);
    console.log(`IndexedDB 저장: ${key}`);
  } catch (error) {
    console.error('IndexedDB 저장 실패:', error);
  }
};

// 이미지 불러오기 (Blob → URL)
export const getImageFromDB = async (key: string): Promise<string | null> => {
  try {
    const db = await getDB();
    const blob = await db.get(STORE_NAME, key);
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return null;
  } catch (error) {
    console.error('IndexedDB 로드 실패:', error);
    return null;
  }
};

// 이미지 삭제
export const deleteImageFromDB = async (key: string) => {
  const db = await getDB();
  await db.delete(STORE_NAME, key);
};