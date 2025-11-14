// js/main.js
import { initAuth, getCurrentUserProfile } from "./auth.js";
import { initRouter, navigateTo } from "./router.js";

const appContainer = document.getElementById("app");

// Şu anki kullanıcı profilini hafızada tutalım
let currentProfile = null;

function getUser() {
  return currentProfile;
}

// Auth state değiştiğinde çalışacak callback
initAuth((profile) => {
  currentProfile = profile;

  if (profile) {
    // Login olmuş kullanıcı varsa dashboard'a
    navigateTo("dashboard");
  } else {
    // Kullanıcı yoksa login'e
    navigateTo("login");
  }
});

// Router'ı başlat
initRouter(appContainer, getUser);
