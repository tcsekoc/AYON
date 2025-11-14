// js/views/dashboardView.js
import { renderLayout } from "../ui/layout.js";

/**
 * Dashboard (gösterge paneli) ekranı.
 * @param {HTMLElement} container
 * @param {Object} userProfile
 */
export function renderDashboardView(container, userProfile) {
  const innerHtml = `
    <h1>Merhaba, ${userProfile?.fullName || userProfile?.email || "Sakin"} 👋</h1>
    <p>Bu, AYON platformunun ilk iskelet ekranıdır.</p>

    <div style="margin-top:16px;">
      <h2>Profil Bilgilerin:</h2>
      <ul style="margin-top:8px; list-style: disc; margin-left:20px;">
        <li><strong>E-posta:</strong> ${userProfile?.email || "-"}</li>
        <li><strong>Rol:</strong> ${userProfile?.role || "-"}</li>
        <li><strong>Kullanıcı Türü:</strong> ${userProfile?.userType || "-"}</li>
        <li><strong>Site ID:</strong> ${userProfile?.siteId || "(henüz atanmadı)"}</li>
        <li><strong>Durum:</strong> ${userProfile?.status || "-"}</li>
      </ul>

      <p style="margin-top:16px; font-size:0.9rem; color:#6b7280;">
        Bir sonraki adımda: Site Yönetimi, Kullanıcı Yönetimi, Daireler, Kalemler vb. menüleri
        bu layout içine ekleyip ekranda detaylandıracağız.
      </p>
    </div>
  `;

  renderLayout(container, userProfile, innerHtml);
}
