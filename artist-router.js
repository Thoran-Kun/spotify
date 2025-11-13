// ===========================
// ARTIST PAGE ROUTER
// ===========================
// Gestisce il reindirizzamento automatico tra versione mobile e desktop
// basato sulla larghezza della finestra

const MOBILE_BREAKPOINT = 780;

/**
 * Controlla se siamo sulla pagina corretta in base alla larghezza dello schermo
 * e reindirizza se necessario
 */
function checkAndRedirect() {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const currentPage = window.location.pathname.split("/").pop();
  const urlParams = window.location.search;

  // Se siamo su desktop ma lo schermo è mobile
  if (currentPage === "artist-desktop.html" && isMobile) {
    window.location.replace("artist-mobile.html" + urlParams);
  }

  // Se siamo su mobile ma lo schermo è desktop
  if (currentPage === "artist-mobile.html" && !isMobile) {
    window.location.replace("artist-desktop.html" + urlParams);
  }
}

// Controlla al ridimensionamento della finestra
window.addEventListener("resize", checkAndRedirect);

// Controlla anche al caricamento (come sicurezza aggiuntiva)
window.addEventListener("DOMContentLoaded", checkAndRedirect);
