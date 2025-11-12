function loadCSS(cssPath, id) {
  if (document.getElementById(id)) {
<<<<<<< HEAD
    console.log(`⚠️ CSS già caricato: ${cssPath}`)
    return
  }

  // Crea un nuovo elemento <link>
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = cssPath

  // Aggiungi il <link> al <head>
  document.head.appendChild(link)
  console.log(`✅ CSS caricato: ${cssPath}`)
=======
    return;
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = cssPath;

  document.head.appendChild(link);
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12
}

async function loadComponent(componentPath, targetId) {
  try {
<<<<<<< HEAD
    // 1. Scarica il file HTML dal server
    const response = await fetch(componentPath)
=======
    const response = await fetch(componentPath);
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12

    if (!response.ok) {
      throw new Error(`Errore HTTP! status: ${response.status}`)
    }

<<<<<<< HEAD
    // 3. Leggi il contenuto HTML del file
    const html = await response.text()

    // 4. Trova l'elemento nella pagina dove inserire il contenuto
    const targetElement = document.getElementById(targetId)
=======
    const html = await response.text();

    const targetElement = document.getElementById(targetId);
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12

    if (targetElement) {
<<<<<<< HEAD
      targetElement.innerHTML = html
      console.log(`✅ Caricato: ${componentPath}`)
    } else {
      console.warn(`⚠️ Elemento #${targetId} non trovato nella pagina!`)
    }
  } catch (error) {
    // Se c'è un errore, mostralo nella console
    console.error(`❌ Errore nel caricamento di ${componentPath}:`, error)
    console.error(
      `💡 Suggerimento: Stai usando Live Server o un server locale?`
    )
=======
      targetElement.innerHTML = html;
    } else {
    }
  } catch (error) {
    console.error(` Errore nel caricamento di ${componentPath}:`, error);
    console.error(`Suggerimento: Stai usando Live Server o un server locale?`);
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12
  }
}

function setActivePage() {
  const currentPage =
    window.location.pathname.split("/").pop() || "homepage.html"

  const pageMap = {
    "homepage.html": "home",
    "album.html": "album",
    "artist.html": "artist",
    "search.html": "search",
  }

<<<<<<< HEAD
  // 3. Trova l'ID della pagina corrente (default: "home")
  const currentPageId = pageMap[currentPage] || "home"

  console.log(`📄 Pagina corrente: ${currentPage} (ID: ${currentPageId})`)
=======
  const currentPageId = pageMap[currentPage] || "home";

  console.log(`Pagina corrente: ${currentPage} (ID: ${currentPageId})`);
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12

  setTimeout(() => {
<<<<<<< HEAD
    // Trova tutti i link del menu nella sidebar sinistra
    const navLinks = document.querySelectorAll(".sidebar-left .nav-link")
=======
    const navLinks = document.querySelectorAll(".sidebar-left .nav-link");
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12

    navLinks.forEach((link) => {
<<<<<<< HEAD
      // Rimuovi la classe "active" da tutti i link
      link.classList.remove("active")
=======
      link.classList.remove("active");
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12

      if (link.getAttribute("data-page") === currentPageId) {
<<<<<<< HEAD
        link.classList.add("active")
        console.log(`✅ Link evidenziato: ${link.textContent.trim()}`)
=======
        link.classList.add("active");
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12
      }
    })
  }, 100)
}

document.addEventListener("DOMContentLoaded", async () => {
<<<<<<< HEAD
  console.log("🚀 Avvio Component Loader...")

  // 1. Carica i CSS dei componenti PRIMA dell'HTML
  loadCSS("assets/css/sidebar-left.css", "sidebar-left-css")
  loadCSS("assets/css/sidebar-right.css", "sidebar-right-css")
  loadCSS("assets/css/player.css", "player-css")
=======
  console.log(" Avvio Component Loader...");

  loadCSS("assets/css/sidebar-left.css", "sidebar-left-css");
  loadCSS("assets/css/sidebar-right.css", "sidebar-right-css");
  loadCSS("assets/css/player.css", "player-css");
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12

  await Promise.all([
    loadComponent("components/sidebar-left.html", "sidebar-left-container"),
    loadComponent("components/sidebar-right.html", "sidebar-right-container"),
    loadComponent("components/player.html", "player-container"),
  ])

<<<<<<< HEAD
  // 3. Dopo che i componenti sono caricati, evidenzia la pagina attiva
  setActivePage()

  console.log("✅ Tutti i componenti sono stati caricati con successo!")
  console.log("📖 Per maggiori informazioni, leggi COMPONENTS-README.md")
})

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
=======
  setActivePage();
});
>>>>>>> 6c3063e4914efc2a1074451796d116bc622acf12
