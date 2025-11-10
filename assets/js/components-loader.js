/**
 * ========================================
 * COMPONENT LOADER - Spotify Clone
 * ========================================
 *
 * Questo file carica automaticamente i componenti comuni (sidebar e player)
 * in tutte le pagine del sito, evitando di duplicare codice HTML.
 *
 * COSA FA:
 * 1. Carica sidebar-left.html nella pagina
 * 2. Carica sidebar-right.html nella pagina
 * 3. Carica player.html nella pagina
 * 4. Evidenzia automaticamente il link della pagina corrente nel menu
 *
 * COME USARLO:
 * Aggiungi questo script in OGNI pagina HTML prima del tag </body>:
 * <script src="assets/js/components-loader.js"></script>
 *
 * REQUISITI:
 * - Ogni pagina deve avere questi 3 div vuoti:
 *   <div id="sidebar-left-container"></div>
 *   <div id="sidebar-right-container"></div>
 *   <div id="player-container"></div>
 *
 * - Devi usare Live Server o un server locale (fetch non funziona senza server)
 */

// ========================================
// FUNZIONE 1: Carica un componente HTML
// ========================================
/**
 * Questa funzione prende un file HTML e lo inserisce dentro un elemento della pagina
 *
 * @param {string} componentPath - Percorso del file da caricare (es: "components/sidebar-left.html")
 * @param {string} targetId - ID dell'elemento dove inserire il contenuto (es: "sidebar-left-container")
 */
async function loadComponent(componentPath, targetId) {
  try {
    // 1. Scarica il file HTML dal server
    const response = await fetch(componentPath);

    // 2. Controlla se il file è stato trovato
    if (!response.ok) {
      throw new Error(`Errore HTTP! status: ${response.status}`);
    }

    // 3. Leggi il contenuto HTML del file
    const html = await response.text();

    // 4. Trova l'elemento nella pagina dove inserire il contenuto
    const targetElement = document.getElementById(targetId);

    // 5. Se l'elemento esiste, inserisci il contenuto HTML
    if (targetElement) {
      targetElement.innerHTML = html;
      console.log(`✅ Caricato: ${componentPath}`);
    } else {
      console.warn(`⚠️ Elemento #${targetId} non trovato nella pagina!`);
    }
  } catch (error) {
    // Se c'è un errore, mostralo nella console
    console.error(`❌ Errore nel caricamento di ${componentPath}:`, error);
    console.error(
      `💡 Suggerimento: Stai usando Live Server o un server locale?`
    );
  }
}

// ========================================
// FUNZIONE 2: Evidenzia pagina attiva
// ========================================
/**
 * Questa funzione trova la pagina corrente e evidenzia il link corrispondente
 * nel menu della sidebar sinistra aggiungendo la classe "active"
 */
function setActivePage() {
  // 1. Ottieni il nome del file della pagina corrente (es: "homepage.html")
  const currentPage =
    window.location.pathname.split("/").pop() || "homepage.html";

  // 2. Mappa i nomi file agli ID delle pagine nel menu
  // IMPORTANTE: Se aggiungi nuove pagine, aggiungile qui!
  const pageMap = {
    "homepage.html": "home",
    "homepage-modular.html": "home",
    "album.html": "album",
    "artist.html": "artist",
    "search.html": "search",
    "library.html": "library",
  };

  // 3. Trova l'ID della pagina corrente (default: "home")
  const currentPageId = pageMap[currentPage] || "home";

  console.log(`📄 Pagina corrente: ${currentPage} (ID: ${currentPageId})`);

  // 4. Aspetta 100ms che la sidebar sia caricata, poi evidenzia il link
  setTimeout(() => {
    // Trova tutti i link del menu nella sidebar sinistra
    const navLinks = document.querySelectorAll(".sidebar-left .nav-link");

    // Per ogni link del menu
    navLinks.forEach((link) => {
      // Rimuovi la classe "active" da tutti i link
      link.classList.remove("active");

      // Se il link corrisponde alla pagina corrente, aggiungi "active"
      if (link.getAttribute("data-page") === currentPageId) {
        link.classList.add("active");
        console.log(`✅ Link evidenziato: ${link.textContent.trim()}`);
      }
    });
  }, 100);
}

// ========================================
// AVVIO AUTOMATICO AL CARICAMENTO PAGINA
// ========================================
/**
 * Quando la pagina è completamente caricata (DOM ready),
 * esegui automaticamente il caricamento dei componenti
 */
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Avvio Component Loader...");

  // 1. Carica TUTTI i componenti in parallelo (più veloce!)
  //    Promise.all aspetta che tutti e 3 i componenti siano caricati
  await Promise.all([
    loadComponent("components/sidebar-left.html", "sidebar-left-container"),
    loadComponent("components/sidebar-right.html", "sidebar-right-container"),
    loadComponent("components/player.html", "player-container"),
  ]);

  // 2. Dopo che i componenti sono caricati, evidenzia la pagina attiva
  setActivePage();

  console.log("✅ Tutti i componenti sono stati caricati con successo!");
  console.log("📖 Per maggiori informazioni, leggi COMPONENTS-README.md");
});

// ========================================
// NOTE PER IL TEAM
// ========================================
/**
 * COME AGGIUNGERE UNA NUOVA PAGINA:
 *
 * 1. Crea il file HTML (es: search.html)
 * 2. Copia la struttura da homepage-modular.html
 * 3. Assicurati di avere questi 3 div:
 *    <div id="sidebar-left-container"></div>
 *    <div id="sidebar-right-container"></div>
 *    <div id="player-container"></div>
 *
 * 4. Includi questo script prima di </body>:
 *    <script src="assets/js/components-loader.js"></script>
 *
 * 5. Se vuoi che il link nel menu si evidenzi automaticamente:
 *    - Aggiungi la pagina in "pageMap" sopra (riga 72-79)
 *    - Assicurati che il link in sidebar-left.html abbia data-page="id-pagina"
 *
 * ESEMPIO:
 * Se crei "playlist.html" e vuoi evidenziare il link:
 * 1. Aggiungi in pageMap: "playlist.html": "playlist"
 * 2. Nel link della sidebar: <a data-page="playlist" href="playlist.html">
 *
 * TROUBLESHOOTING:
 * - "Componenti non si caricano?" → Usa Live Server!
 * - "Link non si evidenzia?" → Controlla pageMap e data-page
 * - "Console mostra errori?" → Controlla i percorsi dei file
 */
