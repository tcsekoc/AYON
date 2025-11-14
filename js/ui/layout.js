// js/ui/layout.js
import { navigateTo } from "../router.js";
import { logout } from "../auth.js";

/**
 * Basit uygulama layout'u:
 * - Header (kullanıcı bilgisi + logout)
 * - Sidebar (şimdilik sadece dashboard linki)
 * - Content alanı (innerHtml ile dolduruluyor)
 */
export function renderLayout(container, user, innerHtml) {
  const fullName = user?.fullName || user?.email || "Kullanıcı";

  container.innerHTML = `
    <div class="app-layout">
      <header class="app-header">
        <div class="app-header-title">
          AYON - Site Yönetim Platformu
        </div>
        <div class="app-header-user">
          ${fullName}
          <button id="logoutBtn">Çıkış Yap</button>
        </div>
      </header>

      <div class="app-body">
        <aside class="app-sidebar">
          <h2>Menü</h2>
          <a href="#dashboard">Gösterge Paneli</a>
          <!-- İleride:
               <a href="#sites">Siteler</a>
               <a href="#users">Kullanıcılar</a>
               <a href="#apartments">Daireler</a>
               vs...
          -->
        </aside>

        <main class="app-content">
          ${innerHtml}
        </main>
      </div>
    </div>
  `;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await logout();
        navigateTo("login");
      } catch (err) {
        alert("Çıkış yapılırken hata oluştu: " + err.message);
      }
    });
  }
}
