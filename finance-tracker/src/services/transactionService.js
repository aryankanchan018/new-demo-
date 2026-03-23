import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, getDocs, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'transactions';

export const transactionService = {
  async getAll() {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async create(data) {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...data };
  },

  async update(id, data) {
    await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: serverTimestamp() });
    return { id, ...data };
  },

  async delete(id) {
    await deleteDoc(doc(db, COLLECTION, id));
    return id;
  },
};
