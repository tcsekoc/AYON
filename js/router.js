// js/router.js
import { renderLoginView } from "./views/loginView.js";
import { renderDashboardView } from "./views/dashboardView.js";

let appContainer = null;
let getUserFn = null;

/**
 * Router'ı başlat.
 * @param {HTMLElement} container
 * @param {Function} getCurrentUserFn
 */
export function initRouter(container, getCurrentUserFn) {
  appContainer = container;
  getUserFn = getCurrentUserFn;

  window.addEventListener("hashchange", handleRouteChange);
  handleRouteChange(); // ilk yüklemede
}

/**
 * Programatik olarak route değiştir.
 */
export function navigateTo(route) {
  window.location.hash = `#${route}`;
}

/**
 * Hash'e göre ilgili view'i render et.
 */
function handleRouteChange() {
  if (!appContainer) return;

  const hash = window.location.hash.replace("#", "") || "login";
  const user = getUserFn ? getUserFn() : null;

  // Login değilse ve user yoksa login'e zorla
  if (!user && hash !== "login") {
    renderLoginView(appContainer);
    return;
  }

  switch (hash) {
    case "login":
      renderLoginView(appContainer);
      break;
    case "dashboard":
    default:
      renderDashboardView(appContainer, user);
      break;
  }
}
