// js/auth.js
import { auth, db } from "./firebaseConfig.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

let currentUserProfile = null;
let profileChangeCallback = null;

/**
 * Auth sistemini başlat ve değişiklikleri dinle.
 * @param {Function} onProfileChanged - Kullanıcı profili değişince çağrılır.
 */
export function initAuth(onProfileChanged) {
  profileChangeCallback = onProfileChanged;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await ensureUserProfile(user);
      currentUserProfile = profile;
    } else {
      currentUserProfile = null;
    }

    if (profileChangeCallback) {
      profileChangeCallback(currentUserProfile);
    }
  });
}

/**
 * Eğer Firestore'da kullanıcı profili yoksa oluştur,
 * varsa oku ve geri döndür.
 */
async function ensureUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    return {
      id: snap.id,
      ...snap.data()
    };
  }

  // İlk kez giriş yapan kullanıcı için varsayılan profil
  const now = Date.now();
  const defaultProfile = {
    email: user.email,
    fullName: user.displayName || user.email,
    role: "resident",      // şimdilik hepsi sakin
    status: "active",      // ileride pending yapacağız
    userType: "owner",     // Mülk sahibi varsayalım
    siteId: null,          // daha sonra atanacak
    createdAt: now
  };

  await setDoc(userRef, defaultProfile);

  return {
    id: user.uid,
    ...defaultProfile
  };
}

/**
 * Şu anki kullanıcı profilini döndür.
 */
export function getCurrentUserProfile() {
  return currentUserProfile;
}

/**
 * E-posta & şifre ile login.
 */
export async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Yeni kullanıcı kaydı.
 * @param {{ fullName: string, email: string, password: string }} data
 */
export async function register({ fullName, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  const userRef = doc(db, "users", cred.user.uid);
  const now = Date.now();

  const profile = {
    email,
    fullName,
    role: "resident",
    status: "active",
    userType: "owner",
    siteId: null,
    createdAt: now
  };

  await setDoc(userRef, profile);
}

/**
 * Çıkış yap.
 */
export async function logout() {
  await signOut(auth);
}
