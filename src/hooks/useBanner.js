import { useEffect, useState } from "react";
import { db, app } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
export default function useBanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  async function getDetails() {
    setLoading(true);
    const tx = [];
    setLoading(true);
    const q = query(collection(db, "banner"));
    let docSnapshot = await getDocs(q);
    docSnapshot.forEach((doc) => {
      tx.push({ ...doc.data(), id: doc.id });
    });
    setResult(tx);
    setLoading(false);
  }
  useEffect(() => {
    getDetails();
  }, []);
  return { result, loading };
}
