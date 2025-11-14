// js/views/loginView.js
import { login, register } from "../auth.js";

let isLoginMode = true;

/**
 * Login / Register ekranını render eder.
 */
export function renderLoginView(container) {
  container.innerHTML = `
    <div class="auth-container">
      <div class="card">
        <div class="auth-title">
          ${isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
        </div>

        <form id="authForm">
          ${isLoginMode ? "" : `
            <div class="form-group">
              <label for="fullName">Ad Soyad</label>
              <input type="text" id="fullName" name="fullName" required />
            </div>
          `}

          <div class="form-group">
            <label for="email">E-posta</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div class="form-group">
            <label for="password">Şifre</label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit" id="submitBtn">
            ${isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <div class="auth-toggle">
          ${isLoginMode ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}
          <button id="toggleModeBtn" type="button">
            ${isLoginMode ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  `;

  const authForm = document.getElementById("authForm");
  const toggleModeBtn = document.getElementById("toggleModeBtn");
  const submitBtn = document.getElementById("submitBtn");

  toggleModeBtn.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    renderLoginView(container); // ekranı yeniden çiz
  });

  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;

    const email = authForm.email.value.trim();
    const password = authForm.password.value.trim();

    try {
      if (isLoginMode) {
        await login(email, password);
        // Başarılı girişte router ve auth state bizi dashboard'a götürecek.
      } else {
        const fullName = authForm.fullName.value.trim();
        await register({ fullName, email, password });
        alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        isLoginMode = true;
        renderLoginView(container);
      }
    } catch (err) {
      console.error(err);
      alert("İşlem sırasında hata oluştu: " + err.message);
    } finally {
      submitBtn.disabled = false;
    }
  });
}
