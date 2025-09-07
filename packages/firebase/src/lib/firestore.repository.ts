import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs
} from 'firebase/firestore';
import { DomainModel, CrudStore } from '@platform-monorepo/core';
import { db } from './firebase.config.ts';

export class FirestoreRepository<T extends DomainModel> implements CrudStore<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...data,
      createdAt: new Date()
    });
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as T;
  }

  async read(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() } as T;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async list(): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }
}